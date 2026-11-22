---
title: Checkout
description: Shipping and payment options, coupons, and placing an order.
outline: 2
---

# Checkout

Shipping and payment options, coupons, and placing an order.

## Placing an order

| Step | Call | Result |
| --- | --- | --- |
| 1 | `POST /checkout/shipping-options` | The shipping methods for that address |
| 2 | `POST /checkout/payment-options` | The gateways the buyer can pay with |
| 3 | `POST /checkout` | A `redirect_url` to open |
| 4 | Open `redirect_url` in a web view | The buyer pays |
| 5 | `GET /checkout/sessions/{session}` | The order, once payment settles |

Steps 1 and 2 both take the destination address and return what the buyer can choose there, plus an estimated tax total. Live carrier quotes appear here when the merchant has a carrier connected; pass the option's `quote_reference` back in step 3.

Step 3 reserves stock, creates the checkout session, and returns a `redirect_url`.

Step 5 is what turns a paid session into an order. It verifies the payment with the gateway and returns the order once it settles. Call it when the web view closes rather than trusting the exit itself.

If the buyer abandons the payment step, `DELETE /checkout/sessions/{session}` releases the reserved stock immediately instead of waiting for the hold to lapse. A session waiting on a shared payment is left running, because someone else may still be paying it.

Steps 1 and 2 use `POST` but change nothing. What they return depends on the destination address, a nested object that does not belong in a query string, and neither creates a record, so calling one twice is harmless.

Build the address form itself from the [address rules](/developer/api/reference/address-rules) rather than a fixed set of inputs.

### Native payment sheets

Gateways that run in-app rather than in a hosted page expose their public key on the payment option. Collect the card in the SDK and pass the resulting `card_token` to `POST /checkout`.

To skip the native form and send the buyer to the gateway's hosted page instead, send `hosted_checkout: true` on `POST /checkout`, even when the gateway is set to embedded. The response then carries a `redirect_url` and no native payment details. The Expo app sends this on every checkout, so it never shows a native payment form.

### Asking someone else to pay

Send `shared_payment: true` on `POST /checkout` and no gateway is charged. The returned `redirect_url` is a link to hand to whoever is paying, and it stays valid for the window the merchant configured. The endpoints behind it are on the [payment links](/developer/api/reference/payment-links) page.

### Guest checkout

The same sequence works without a bearer token. If the merchant has disabled guest checkout, `POST /checkout` requires one.

## Abandoned checkout recovery

Two calls keep the pending checkout session current while the buyer fills the form:

- `PATCH /checkout/draft` as fields change, debounced.
- `POST /checkout/options` when a shipping or payment method is selected.

The merchant's abandoned checkout list and recovery emails are built from that session. Checkout still works without these calls, but abandoned carts from the app are invisible to recovery.

When a buyer opens a recovery email, `GET /checkout/recover/{session}` returns the abandoned cart. Pass the full signed link from the email unchanged, since requests without a valid signature are rejected. Store the returned `token` as the device's cart.

## Endpoints

<OAOperation operation-id="listShippingOptions" />

<OAOperation operation-id="listPaymentOptions" />

<OAOperation operation-id="applyCoupon" />

<OAOperation operation-id="removeCoupon" />

<OAOperation operation-id="saveCheckoutDraft" />

<OAOperation operation-id="selectCheckoutOptions" />

<OAOperation operation-id="createCheckout" />

<OAOperation operation-id="getCheckoutSession" />

<OAOperation operation-id="cancelCheckoutSession" />

<OAOperation operation-id="recoverCheckout" />
