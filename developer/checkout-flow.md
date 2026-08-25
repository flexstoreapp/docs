---
title: Checkout Flow
description: How the checkout process works from cart to order.
---

# Checkout Flow

Checkout is a multi-step process managed through the `CheckoutSession` model. Payment state lives in a separate `PaymentSession`, which decouples payment handling from checkout and lets the same infrastructure serve post-order payment requests.

## Steps

### 1. Initiate

`InitiateCheckoutSessionAction` creates or reuses a pending `CheckoutSession` for the cart. An existing incomplete session is reused rather than duplicated.

It snapshots the cart's items (thumbnails, titles, prices), subtotal, applied coupon, discount, currency code, and customer details onto the session, so the abandoned-checkout admin view has full context even before the customer reaches step 2.

Applying or removing a coupon on the cart also copies the discount onto the pending session. Admins can apply or remove a coupon from a pending abandoned checkout; that writes the same fields on the session and the cart so recovery still has the discount.

The recovery email uses the built-in heading and body. When an admin applied the coupon (`coupon_applied_by_admin`), it also includes a discount line with the code and formatted savings. A coupon the customer applied themselves is still shown in the totals, but not as that extra offer line.

### 1b. Progressive snapshotting

As the customer fills in the form, the React page writes their selections back to the same session so the snapshot stays current:

- **Address, billing toggle, and notes** go through a debounced PATCH to `/checkout/{cartId}/draft`, handled by `CheckoutDraftController` and `UpdatePendingCheckoutSessionAction`.
- **Shipping rate and payment gateway selection** POST to `/checkout/{cartId}/options/select`, where `CheckoutOptionController::store` updates the cart and the session in one `DB::transaction`.

`UpdatePendingCheckoutSessionAction` self-heals: with no pending session yet but a customer email or id passed by the controller (a logged-in customer, for instance), it calls `InitiateCheckoutSessionAction` first. That avoids a race where progressive saves arrive before the initial session creation finishes.

### 2. Store

`StoreCheckoutSessionAction` is the core of checkout. It:

- Validates cart items are still available and in stock
- Syncs flash sale prices
- Validates the coupon, if applied
- Resolves eligible shipping rates and payment gateways for the address
- Calculates taxes with currency conversion
- Reserves stock with a 10-minute expiry
- Creates a `PaymentSession` (purpose `Checkout`, owned by the `CheckoutSession`)
- Calls `PaymentManager::driver()->createSession()` with a `CreateSession` DTO built from it

The `PaymentSession` is created before the driver call so signed return, cancel, and webhook URLs can be generated up front. Once the driver responds, the session records the `gatewayReference` and `payload` from the `SessionResult`.

The driver returns a `SessionResult` with a `redirectUrl`, either an external gateway URL or an internal success URL for COD.

### 3. Payment

The customer is redirected to the `redirectUrl`: a signed internal success route for COD, or the gateway's hosted checkout page otherwise.

### 4. Confirmation

`ConfirmCheckoutSessionAction` runs when payment succeeds, via return URL callback or webhook. It:

- Creates the `Order` and `OrderItem` records
- Decrements stock permanently and releases the reservations
- Increments coupon usage and flash sale counters
- Stores tax details
- Creates the initial "Order placed" activity
- Records a payment transaction (Sale or Authorization) for non-manual gateways
- Transitions payment status
- Reconciles order financials (`paid_total`, `net_paid_total`, `balance_due_total`, `credit_due_total`)
- Marks the `PaymentSession` completed

### 5. Webhooks

`PaymentWebhookController` verifies the signature and parses the notification into a `WebhookEvent`. Payment confirmations (where `shouldConfirmPaymentSession()` is true) are looked up by `paymentSessionId` and routed by purpose: `Checkout` to `ConfirmCheckoutSessionAction`, `PaymentRequest` to `ConfirmPaymentRequestAction`. Refund events go to `HandleExternalRefundAction`.

## Idempotency

Checkout is idempotent. A completed session receiving another confirmation, such as a duplicate webhook, returns the existing order instead of creating a second one, and already-completed `PaymentSession` records are skipped during webhook processing.

## Stock Reservations

Stock is reserved during checkout with a 10-minute TTL. Reservations expire and release the stock if payment never completes, and convert to permanent decrements when it does.

## Abandoned Checkouts & Recovery

A `CheckoutSession` that never reaches `Completed` counts as abandoned once it has been pending longer than `abandoned_checkout_delay_minutes` (default 60). The admin view at `/admin/abandoned-checkouts` lists Pending or Canceled sessions with at least one snapshotted item.

`SendAbandonedCheckoutRecoveryCommand` runs every 15 minutes via `Schedule::command('checkouts:send-recovery-emails')->everyFifteenMinutes()`. It picks Pending sessions with a stale `created_at`, no `recovery_email_sent_at`, a captured email, and at least one item, then dispatches the queued `CustomerAbandonedCheckoutNotification`.

The email carries a 30-day signed URL to `CheckoutRecoveryController`, which stamps `recovery_clicked_at` on first click, sets the `cart_id` cookie to restore the cart, and redirects to `/checkout/{cartId}`.

Completing the order reuses the same `CheckoutSession` row via `cart_id` and transitions it to `Completed`. A session counts as recovered when:

```php
recovery_email_sent_at IS NOT NULL
AND status = Completed
AND order_id IS NOT NULL
```

That's exposed as the `was_recovered` accessor on `CheckoutSession`. `AbandonedCartsReportQuery` adds a second stats row (`recovery_emails_sent`, `recovery_rate`, `recovered_revenue`) computed against `recovery_email_sent_at` inside the report period.
