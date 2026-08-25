---
title: Payment Drivers
description: How payment gateways work and how to add a new one.
---

# Payment Drivers

Payment gateways are driver classes implementing the `PaymentDriver` interface. A driver owns all communication with an external provider: session creation, payment verification, refunds, and webhook handling.

A gateway is either **integrated**, talking to an external API for payments and usually refunds, or **manual**, where payments are recorded and voided locally with no API call at all, as with cash on delivery. Either way, any order can also be refunded as **record only**, which creates the refund, restocks, and reconciles financials without touching a gateway.

## The `PaymentDriver` Interface

Every driver implements `App\Payment\Contracts\PaymentDriver`, whose 8 methods cover four concerns.

**Session and verification**

| Method | Purpose |
|---|---|
| `createSession(CreateSession $session)` | Create a payment session on the gateway. Returns `SessionResult`. |
| `verifyPayment(?string $gatewayReference, PaymentStatus $currentStatus)` | Poll the gateway for a payment's current status. Returns `VerificationResult`. |
| `testConnection()` | Authenticate with the stored credentials, returning `true` when they work. Backs the **Test connection** button. Manual drivers return `true`, since there's nothing to verify. |

**Refund**

`refund(RefundPayment $refund)` issues a refund through the gateway API and returns a `RefundResult`.

**Webhooks**

| Method | Purpose |
|---|---|
| `verifyWebhook(Request)` | Validate the webhook signature. |
| `parseWebhook(Request)` | Parse the raw payload into a `WebhookEvent`. |

**Capability flags**

| Method | Purpose |
|---|---|
| `supportsRefunds()` | Whether the gateway supports refunds. |
| `isManual()` | Whether this is an offline payment method. Manual payments are recorded and voided from the admin panel without an external call. |

## DTOs

All DTOs are `final readonly` classes in `App\Payment\DTOs`. Never return raw arrays from driver methods.

### `CreateSession`

Input for `createSession()`.

| Property | Type | Description |
|---|---|---|
| `internalReference` | `string` | The `PaymentSession` UUID, used as the payment's internal reference. |
| `amount` | `string` | The amount to charge. |
| `currencyCode` | `string` | ISO currency code. |
| `customerEmail` | `?string` | The customer's email address. |
| `storeName` | `?string` | The store name, for drivers that display a brand name. |
| `description` | `?string` | Human-readable description, e.g. "Order from My Store". |
| `redirectUrls` | `RedirectUrls` | Return, cancel, and failure URLs for hosted flows. |
| `callbackUrls` | `CallbackUrls` | Webhook URL for asynchronous notifications. |
| `metadata` | `array` | Metadata for the gateway, always including `payment_session_id`. |
| `shippingAddress` / `billingAddress` | `?array` | The customer's addresses. |
| `providerOptions` | `array` | Driver-specific data such as `card_token`. |

Two factory methods build it. For checkout payments, from a `PaymentSession` and its owning `CheckoutSession`:

```php
$driver->createSession(CreateSession::fromCheckoutPaymentSession(
    $paymentSession,
    $checkoutSession,
    ['card_token' => $data['card_token']],
));
```

And for collecting a remaining balance on an existing order:

```php
$driver->createSession(CreateSession::fromPaymentRequest(
    $paymentSession,
    $paymentRequest,
    $order,
));
```

`RedirectUrls` groups `returnUrl`, `?cancelUrl`, and `?failureUrl`; `CallbackUrls` holds `?webhookUrl`. The factory methods generate signed, time-limited URLs, so drivers never construct them.

### `RefundPayment`

Input for `refund()`.

| Property | Type | Description |
|---|---|---|
| `amount` | `string` | The refund amount. |
| `currencyCode` | `string` | ISO currency code. |
| `gatewayReference` | `?string` | Gateway-side reference for the transaction being refunded. |
| `orderId` | `?int` | Internal order ID, available for gateway metadata. |
| `reason` | `?string` | Refund reason, mapped to gateway-specific fields. |
| `idempotencyKey` | `?string` | Refund ID plus allocation index. |

Build it from a `RefundAllocation` (see [Refund Flows](#refund-flows)):

```php
$driver->refund(RefundPayment::fromAllocation(
    allocation: $allocation,
    currencyCode: $order->currency_code,
    orderId: $order->id,
    reason: $refund->reason,
    idempotencyKey: $refund->id . '_0',
));
```

### `RefundAllocation`

Produced by `RefundAllocator`, representing a portion of a refund aimed at one payment transaction.

| Property | Type | Description |
|---|---|---|
| `transactionId` | `int` | The `OrderTransaction` being refunded against. |
| `gatewayReference` | `?string` | Gateway-side reference from the original payment. |
| `amount` | `string` | The amount to refund from that transaction. |

### `SessionResult`

Returned by `createSession()`.

| Property | Type | Description |
|---|---|---|
| `status` | `PaymentStatus` | Usually `Unpaid`, or `Failed` when session creation failed. |
| `redirectUrl` | `string` | Where to send the customer. External for hosted mode, the internal success route for COD. |
| `gatewayReference` | `?string` | Gateway-side reference such as a payment intent or order ID. |
| `payload` | `array` | Extra data for the frontend, such as a client secret for embedded flows. |
| `failureReason` | `?string` | Error message when `status` is `Failed`. |

### `VerificationResult`

Returned by `verifyPayment()`.

| Property | Type | Description |
|---|---|---|
| `status` | `PaymentStatus` | The verified status from the gateway. |
| `gatewayReference` | `?string` | The resolved reference, which may differ from the input if that was a checkout session ID. |
| `paymentMethod` | `?string` | Method type such as `card` or `paypal`. |
| `paymentMethodDetails` | `?array` | Extras like `brand` and `last4`. |

### `RefundResult`

Returned by `refund()`.

| Property | Type | Description |
|---|---|---|
| `status` | `RefundStatus` | `Completed`, `Pending`, or `Failed`. |
| `amount` | `string` | The refunded amount. |
| `gatewayReference` | `?string` | Gateway reference for the refund. |
| `payload` | `array` | Raw gateway data. |
| `failureReason` | `?string` | Error message on failure. |

### `WebhookEvent`

Returned by `parseWebhook()`.

| Property | Type | Description |
|---|---|---|
| `type` | `string` | Raw event type from the gateway. |
| `status` | `?PaymentStatus` | The payment status this event implies. |
| `paymentSessionId` | `?string` | Internal `PaymentSession` UUID, used to confirm pending payments. |
| `gatewayPaymentReference` | `?string` | Gateway-side payment reference, used to look up orders. |
| `gatewayOrderReference` | `?string` | Gateway-side order or session reference, a fallback when resolving orders for refund events. |
| `payload` | `array` | Raw event data. |
| `cumulativeRefundTotal` | `?string` | The **cumulative** refund total for the payment, never an individual refund amount. Setting it triggers external refund handling. |
| `gatewayRefundReference` | `?string` | Gateway reference for the specific refund. |
| `paymentMethod` / `paymentMethodDetails` | `?string` / `?array` | Payment method info. |

Two routing helpers sit on the event. `isRefundEvent()` is true when `cumulativeRefundTotal` is positive and an order can be identified through `gatewayPaymentReference` or `paymentSessionId`. `shouldConfirmPaymentSession()` is true when `status` is a payment status rather than a refund status and `paymentSessionId` is set.

## PaymentSession Model

`App\Models\PaymentSession` is created before `driver->createSession()` runs. It's the internal record of a payment attempt, used to generate signed return URLs and link webhook events back to the right flow.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key. |
| `payment_gateway_id` | `int` | The gateway used. |
| `owner_type` / `owner_id` | `string` | Polymorphic owner, either a `CheckoutSession` or an `OrderPaymentRequest`. |
| `purpose` | `PaymentSessionPurpose` | `Checkout` or `PaymentRequest`. |
| `currency_code` | `string` | ISO currency code. |
| `amount` | `decimal` | The payment amount. |
| `status` | `PaymentSessionStatus` | `Pending`, `Completed`, `Failed`, or `Canceled`. |
| `gateway_reference` | `?string` | Stored after `createSession()` returns. |
| `payload` | `?array` | Extra gateway data such as a client secret. |
| `metadata` | `?array` | Internal metadata, always including `payment_session_id`. |
| `return_url` / `cancel_url` / `failure_url` | `string` / `?string` | Signed redirect URLs. |
| `webhook_url` | `?string` | Webhook callback URL. |
| `completed_at` | `?datetime` | When the payment was confirmed. |

`purpose` decides how webhook confirmations route: `Checkout` owners run `ConfirmCheckoutSessionAction`, `PaymentRequest` owners run `ConfirmPaymentRequestAction`.

Drivers receive the UUID as `CreateSession::internalReference` and should store it in their gateway metadata. When parsing webhooks, extract it and return it as `WebhookEvent::paymentSessionId`.

## Order Financial Reconciliation

After every payment event (checkout confirmation, payment request completion, refund, external refund), `ReconcileOrderFinancialsAction` recomputes the order's financial state from its transaction ledger:

| Column | Calculation |
|---|---|
| `paid_total` | Successful Sale transactions minus successful Voids, floored at 0. |
| `refund_total` | The greater of transaction-derived refunds and the existing value. |
| `net_paid_total` | `paid_total - refund_total`, floored at 0. |
| `balance_due_total` | `total - paid_total`, floored at 0. Positive means the customer still owes. |
| `credit_due_total` | `net_paid_total - total`, floored at 0. Positive means the merchant owes a refund. |

It also derives `payment_status` from those figures, keeping status consistent with transaction history.

## Webhook Processing

Webhooks arrive at `POST /webhooks/payment/{driver}`, and `PaymentWebhookController` handles every gateway through that one endpoint:

1. **Resolve** the `PaymentGateway` model from the driver slug.
2. **Verify** the signature with `verifyWebhook()`, returning `403` when invalid.
3. **Parse** into a `WebhookEvent` with `parseWebhook()`.
4. **Route**: `isRefundEvent()` goes to `HandleExternalRefundAction`; `shouldConfirmPaymentSession()` looks up the `PaymentSession` and dispatches by its purpose. Anything else is acknowledged and ignored.

Already-completed sessions are skipped, which makes webhook handling idempotent.

### Handling External Refunds

A refund issued directly on the gateway, such as from the provider's own dashboard, arrives as a webhook. Your `parseWebhook()` must return a `WebhookEvent` whose `cumulativeRefundTotal` is the cumulative refund total for the payment:

```php
private function parseChargeRefunded(array $charge): WebhookEvent
{
    // Use the cumulative amount_refunded, NOT the individual refund amount
    $amountRefunded = $this->convertFromSmallestUnit(
        $charge['amount_refunded'],
        $charge['currency'],
    );

    return new WebhookEvent(
        type: 'charge.refunded',
        status: $charge['refunded']
            ? PaymentStatus::Refunded
            : PaymentStatus::PartiallyRefunded,
        gatewayPaymentReference: $charge['payment_intent'],
        cumulativeRefundTotal: $amountRefunded,      // cumulative total
        gatewayRefundReference: $refunds[0]['id'],   // latest individual refund ID
    );
}
```

`HandleExternalRefundAction` then resolves the order by matching gateway references against `OrderTransaction` records, falling back to a `PaymentSession` lookup that resolves its owner to find the order. It compares the incoming cumulative total against the order's current `refund_total`: a higher total creates an `OrderRefund` for the delta, records a refund transaction, and updates `refund_total`, while a lower one, meaning a refund was canceled on the gateway, creates a failed refund record for the reversed amount. Finally it runs `ReconcileOrderFinancialsAction`.

::: warning Important
`cumulativeRefundTotal` must be cumulative, not the amount of the individual refund event. The system computes deltas from it, which is what makes repeated webhook delivery safe.
:::

### Payment Confirmation

For payment-success events, return a `WebhookEvent` with `status` set to the resolved `PaymentStatus` and `paymentSessionId` set to the UUID you stored in gateway metadata during session creation. The controller looks up the session, checks its purpose, and dispatches the right confirmation action, safely ignoring sessions that are already complete.

## Refund Flows

### Admin-Initiated

Triggered from the admin panel through `ProcessOrderRefundAction`:

1. The admin creates an itemized refund covering products, tax, shipping, and adjustments.
2. `StoreOrderRefundAction` creates the `OrderRefund` and `OrderRefundItem` records.
3. Unless the method is record-only, `RefundAllocator` splits the amount across the order's payment transactions, each allocation targeting a specific `OrderTransaction` and its gateway reference. That's what handles orders paid across several transactions, such as a partial payment followed by a payment request.
4. Each allocation becomes a `RefundPayment::fromAllocation()` passed to `driver->refund()`.
5. On success `refund_total` updates, a refund transaction is recorded per allocation with `related_transaction_id` pointing back at the original payment, and payment status transitions.
6. `ReconcileOrderFinancialsAction` recomputes the totals.
7. Items marked for restock have their inventory restored.

### External (Webhook)

The gateway sends a webhook with the cumulative refund amount, `parseWebhook()` surfaces it as `cumulativeRefundTotal`, `HandleExternalRefundAction` computes the delta and creates the internal records, and `ReconcileOrderFinancialsAction` recomputes the totals. No restocking happens, since external refunds carry no item-level detail.

## Adding a Payment Driver

### 1. Add the enum case

```php
// app/Enums/PaymentGatewayDriver.php
case MyGateway = 'my_gateway';

// in make()
self::MyGateway => new MyGatewayDriver($gateway),
```

The enum's `make()` is the single place mapping a case to its driver class. `PaymentManager::driver()` resolves through it via `$gateway->driver->make($gateway)`, so this match arm is all the wiring needed.

### 2. Create the driver

```php
// app/Payment/Drivers/MyGatewayDriver.php
use App\Payment\DTOs\RefundPayment;

final readonly class MyGatewayDriver implements PaymentDriver
{
    public function __construct(
        private PaymentGateway $gateway,
    ) {}

    // refund() receives a RefundPayment DTO with amount, currencyCode,
    // gatewayReference, reason, idempotencyKey, and orderId
}
```

### 3. Add the admin UI

Create a credentials component at `resources/js/components/admin/payment-gateway/my-gateway-credentials.tsx` and register it on the payment settings page. Drop in the shared `<TestConnectionButton>` from `components/admin/payment/test-connection-button.tsx`, passing your driver key and the credential fields being edited. It posts to `TestPaymentGatewayConnectionController`, which builds an unsaved gateway and calls your `testConnection()`. Add a matching credential rule in `TestPaymentGatewayConnectionRequest`.

### 4. Add the migration

Insert a row into `payment_gateways`. Credentials are stored as an `encrypted:array` JSON column.

### 5. Implement webhook handling

`parseWebhook()` must handle both payment confirmation and refund events. Extract `paymentSessionId` from your gateway metadata, where it arrived as `CreateSession::metadata['payment_session_id']`:

```php
public function parseWebhook(Request $request): WebhookEvent
{
    $event = json_decode($request->getContent(), true);

    return match ($event['type']) {
        'payment.completed' => new WebhookEvent(
            type: 'payment.completed',
            status: PaymentStatus::Paid,
            paymentSessionId: $event['metadata']['payment_session_id'],
            gatewayPaymentReference: $event['payment_id'],
        ),
        'refund.completed' => new WebhookEvent(
            type: 'refund.completed',
            gatewayPaymentReference: $event['payment_id'],
            cumulativeRefundTotal: $event['cumulative_refund_amount'],
            gatewayRefundReference: $event['refund_id'],
        ),
        default => new WebhookEvent(type: $event['type'], payload: $event),
    };
}
```

### 6. Handle currency conversion

Most gateways use smallest-unit integers. Convert with `Currency::getDecimalPlaces()`:

```php
use App\Models\Currency;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;

// To smallest unit (19.99 USD → 1999)
$smallest = BigDecimal::of($amount)
    ->toScale(Currency::getDecimalPlaces($currencyCode), RoundingMode::HalfUp)
    ->multipliedBy(10 ** Currency::getDecimalPlaces($currencyCode))
    ->toScale(0, RoundingMode::HalfUp)
    ->toInt();

// From smallest unit (1999 → 19.9900)
$decimal = BigDecimal::of($smallest)
    ->dividedBy(10 ** Currency::getDecimalPlaces($currencyCode), 4, RoundingMode::HalfUp)
    ->toString();
```

## Checkout Page Integration

Each gateway needs a frontend adapter for its checkout UI, through the `PaymentGatewayAdapter` interface:

```ts
// resources/js/types/gateway.ts
interface PaymentGatewayAdapter {
    processing: boolean;
    error: string | null;
    replacesSubmitButton: boolean;
    submitButtonText: string;
    handleSubmit: () => Promise<void>;
    renderInlineContent: ((option: PaymentOption) => ReactNode) | null;
    renderHiddenComponent: (() => ReactNode) | null;
    renderSubmitAction: (() => ReactNode) | null;
}
```

Four rendering strategies are available:

| Strategy | Method | Used for |
|---|---|---|
| Inline card fields | `renderInlineContent` | Gateways with an embeddable payment element |
| Replace submit button | `renderSubmitAction` | Gateways that render their own pay button |
| Hidden component | `renderHiddenComponent` | Gateways that load an SDK and open a modal on submit |
| No extra UI | All return `null` | Manual methods and anything in hosted mode |

### Adding a checkout adapter

Create the hook:

```ts
// resources/js/hooks/use-my-gateway.tsx
export function useMyGateway(context: GatewayContext): PaymentGatewayAdapter {
    return {
        processing: false,
        error: null,
        replacesSubmitButton: false,
        submitButtonText: __('Pay now'),
        handleSubmit: async () => {
            // POST to ctx.submitUrl, handle response
        },
        renderInlineContent: null,  // or a function returning card fields
        renderHiddenComponent: null,
        renderSubmitAction: null,
    };
}
```

For embedded gateways, add the UI component at `resources/js/components/checkout/my-gateway-element.tsx`, loading it through `React.lazy()` so third-party SDKs stay out of the bundle until the gateway is selected.

Then register it in `usePaymentGateway` (`resources/js/hooks/use-payment-gateway.ts`):

```ts
if (driver === 'my_gateway' && isEmbedded) return myGateway;
```

Unmatched gateways fall through to `useDefaultGateway`, which handles hosted mode.

### Embedded vs Hosted

**Hosted** needs no frontend adapter. The default adapter POSTs the form, the server returns a `redirectUrl`, and the customer goes to the gateway's page.

**Embedded** means your adapter loads the gateway's SDK, renders fields or buttons inline, and confirms payment client-side.

The store owner picks the mode per gateway in admin settings, and it reaches the frontend on the `PaymentOption` object.

## Testing

`PaymentManager::fake()` swaps in the `MockDriver`, which always succeeds by default:

```php
PaymentManager::fake();

// Or with a custom driver
PaymentManager::fake(new MockDriver(alwaysSucceed: false));
```

`MockDriver` implements every interface method, supports full and partial refunds, and generates random references prefixed with `mock_`. Its `parseWebhook()` reads from request input, so you can simulate events:

```php
PaymentManager::fake();

// Simulate a payment confirmation webhook
post(route('webhooks.payment', 'stripe'), [
    'status' => 'paid',
    'payment_session_id' => $paymentSession->id,
    'gateway_reference' => 'pi_test_123',
]);

// Simulate a refund webhook
post(route('webhooks.payment', 'stripe'), [
    'refund_amount' => '25.00',
    'gateway_reference' => $transaction->gateway_reference,
]);
```
