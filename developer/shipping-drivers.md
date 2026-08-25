---
title: Shipping Drivers
description: How shipping carriers work and how to add a new one.
---

# Shipping Drivers

Shipping carriers are driver classes implementing the `ShippingDriver` interface. A driver owns all communication with an external carrier: live rate quoting, shipment and label creation, tracking by webhook and manual sync, cancellation, and connection testing.

A carrier is either **manual**, with no integration, so the admin types the tracking number and URL by hand, or **integrated**, talking to an external API to buy labels and pull tracking.

## The `ShippingDriver` Interface

Every driver implements `App\Shipping\Contracts\ShippingDriver`, whose 10 methods cover four concerns.

**Rates and shipments**

| Method | Purpose |
|---|---|
| `rates(ShipmentRequest $request)` | Quote live rates. Returns `Collection<RateQuote>`. |
| `createShipment(ShipmentRequest $request, ?string $serviceCode)` | Create a shipment, buy a label, return tracking. `$serviceCode` is the chosen rate's service code. Returns `ShipmentResult`. |
| `cancelShipment(string $shipmentReference)` | Void a created shipment. Returns `true` on success. |

**Tracking**

| Method | Purpose |
|---|---|
| `verifyWebhook(Request)` | Validate the incoming webhook signature or secret. |
| `parseWebhook(Request)` | Parse the raw payload into a `ShippingWebhookEvent`. |
| `track(string $shipmentReference)` | Poll the carrier for current status. Returns `?ShippingWebhookEvent`, used by "Sync delivery status". |

**Connection**

`testConnection()` attempts to authenticate and returns `true` when the credentials work.

**Capability flags**

| Method | Purpose |
|---|---|
| `supportsLiveRates()` | Whether the carrier can return live quotes. |
| `collectsCod()` | Whether the integration collects cash on delivery and remits it to the merchant. Distinct from offering COD as a payment method, see [Cash on Delivery](#cash-on-delivery). |
| `isManual()` | Whether this is a manual carrier. Manual carriers skip `createShipment()` and `track()` entirely. |

## DTOs

All DTOs are `final readonly` classes in `App\Shipping\DTOs`. Never return raw arrays from driver methods.

### `ShipmentRequest`

Input for `rates()` and `createShipment()`, built by `ShipmentRequestBuilder`. Never construct it manually in a driver.

| Property | Type | Description |
|---|---|---|
| `origin` | `Address` | Ship-from address, from store settings. |
| `destination` | `Address` | The customer's address. |
| `parcels` | `list<Parcel>` | One or more parcels. |
| `items` | `array` | Line items (`title`, `quantity`, `value`, `weight_grams`, `origin_country`, `hs_code`) used for customs and declared value. |
| `currencyCode` | `string` | ISO currency code of the order. |
| `orderReference` | `?string` | The order ID, required when creating a shipment. Carriers use it as the merchant order reference and idempotency key. |
| `codAmount` | `?string` | Set means cash on delivery for this amount, the order's balance due. `null` for prepaid. |

### `Parcel`

| Property | Type | Description |
|---|---|---|
| `weightInGrams` | `string` | Total parcel weight. |
| `lengthCm` / `widthCm` / `heightCm` | `?string` | Dimensions in centimetres. |

### `RateQuote`

Returned as a `Collection` by `rates()`.

| Property | Type | Description |
|---|---|---|
| `serviceCode` | `string` | Carrier service identifier, passed back to `createShipment()`. |
| `name` | `string` | Human-readable service name, e.g. "USPS Priority". |
| `amount` | `string` | Rate in the carrier's currency. |
| `currencyCode` | `string` | ISO currency of the rate, converted to store base currency downstream. |
| `quoteReference` | `string` | Stable reference for the quote. |
| `deliveryEstimate` | `?string` | e.g. "3 days". |
| `provider` | `?string` | Underlying courier name. |

### `ShipmentResult`

Returned by `createShipment()`.

| Property | Type | Description |
|---|---|---|
| `success` | `bool` | `false` short-circuits fulfillment and surfaces `failureReason`. |
| `trackingNumber` | `?string` | The AWB or tracking number, stored on the shipment and used to match webhooks. |
| `trackingUrl` | `?string` | Public tracking URL. |
| `labelUrl` | `?string` | Shipping label PDF URL. |
| `shipmentReference` | `?string` | Carrier-side reference, stored on the shipment and passed to `track()` and `cancelShipment()`. Encode a composite here if you need more than one id, see [Reference identity](#reference-identity). |
| `payload` | `array` | Raw carrier response. |
| `failureReason` | `?string` | Human-readable error when `success` is `false`. |

### `ShippingWebhookEvent`

Returned by `parseWebhook()` and `track()`.

| Property | Type | Description |
|---|---|---|
| `type` | `string` | Raw event type, informational. |
| `trackingNumber` | `?string` | Matches the shipment when `shipmentReference` is absent. |
| `shipmentReference` | `?string` | Carrier reference, used to match the shipment. |
| `status` | `?ShipmentDeliveryStatus` | The status this event implies. Must be set for the update to apply. |
| `events` | `list<TrackingEvent>` | Optional timeline entries. The first becomes an order activity. |
| `payload` | `array` | Raw event data. |

### `TrackingEvent`

| Property | Type | Description |
|---|---|---|
| `status` | `ShipmentDeliveryStatus` | Status at this scan. |
| `description` | `?string` | Scan activity text. |
| `happenedAt` | `?CarbonImmutable` | Timestamp of the scan. |
| `location` | `?string` | Scan location. |

## ShippingCarrier Model

`App\Models\ShippingCarrier` stores an integrated carrier's configuration:

| Column | Type | Description |
|---|---|---|
| `name` | `string` | Display name. |
| `driver` | `ShippingCarrierDriver` | Enum selecting the driver class. |
| `credentials` | `encrypted:array` | API keys, secrets, and the webhook token. Encrypted at rest and hidden from serialization. |
| `is_active` | `bool` | Whether the carrier is enabled. |

A computed `collects_cod` attribute delegates to the driver:

```php
protected function collectsCod(): Attribute
{
    return Attribute::get(fn (): bool => $this->driver->make($this)->collectsCod());
}
```

Only one integrated carrier may exist per driver. Manual carriers can be created freely.

## OrderShipment Model

Created when an order is fulfilled. The driver's `ShipmentResult` populates:

| Column | Source |
|---|---|
| `tracking_number` | `ShipmentResult::trackingNumber` |
| `tracking_url` | `ShipmentResult::trackingUrl` |
| `label_url` | `ShipmentResult::labelUrl` |
| `shipment_reference` | `ShipmentResult::shipmentReference` |
| `delivery_status` | Starts at `Pending`, advanced by tracking updates. |
| `delivered_at` | Set when the status reaches `Delivered`. |

### Reference identity

`shipment_reference` is the single column driving both `track()` and `cancelShipment()`. A carrier needing more than one identifier, such as a separate shipment id and order id, should encode them into that field, typically as a small JSON blob decoded per method. Webhook matching also falls back to `tracking_number`, which carriers reliably include in tracking payloads.

## Delivery Status & the State Machine

`ShipmentDeliveryStatus` has seven cases: `Pending`, `PickedUp`, `InTransit`, `OutForDelivery`, `Delivered`, `Failed`, `Returned`.

`App\StateMachines\ShipmentDeliveryStatusMachine::canTransition(?from, to)` guards every update so out-of-order or stale tracking events can't regress a shipment:

- The same status is a no-op.
- From `null`, any status is allowed.
- `Delivered` and `Returned` are terminal, and nothing overrides them.
- Entering a final state is always allowed.
- `Failed` is recoverable in both directions.
- Otherwise only forward progression along `Pending → PickedUp → InTransit → OutForDelivery → Delivered` passes.

The check runs again under a row lock when applying an update, so a late webhook can't undo a delivery confirmation.

## Rate Quoting

`LiveRateQuoter` resolves the driver, calls `rates()`, drops quotes in unconfigured currencies, and converts the rest to base currency. `ShipmentRequestBuilder` builds the request:

- **At checkout**, `forCheckout()` builds from the cart and destination, and quotes become shipping options.
- **In the fulfill dialog**, `POST /admin/orders/{order}/shipment-rates` runs through `OrderShipmentRateController`, `OrderShipmentRatesQuery`, `forOrder()`, and `LiveRateQuoter`.

Drivers returning `supportsLiveRates() === false`, and manual carriers, are skipped without a request.

## Shipment Creation

Fulfillment runs through `StoreOrderShipmentAction`:

1. Resolve the driver. Manual carriers return none, since tracking is entered by hand.
2. Create the base `OrderShipment` record.
3. Call `driver->createShipment($builder->forOrder($order, $parcels, $collectCod), $serviceCode)`.
4. On failure, delete the base shipment and surface `failureReason`.
5. Finalize by advancing fulfillment status and writing activities. If finalization throws after a label was bought, `cancelShipment()` voids it so no orphaned label or charge is left at the carrier.

Multi-step carriers should clean up after themselves inside `createShipment()` too. A driver that creates an order, assigns an AWB, then generates a label must cancel the just-created order if AWB assignment fails, before returning a failed result.

## Tracking

### Webhooks

Tracking webhooks arrive at `POST /webhooks/shipping/{slug}`, and `ShippingWebhookController` handles every carrier through that one endpoint:

1. **Resolve** the driver from the slug with `ShippingCarrierDriver::fromWebhookSlug()`, then the active carrier for that driver.
2. **Verify** with `verifyWebhook()`, returning `403` when invalid.
3. **Parse** with `parseWebhook()` into a `ShippingWebhookEvent`.
4. **Apply** with `ApplyShipmentTrackingUpdateAction`, which under a row lock matches the shipment by `shipment_reference` or `tracking_number`, runs the state machine guard, updates `delivery_status` and `delivered_at`, and records a timeline activity.

The endpoint returns `200` on success, and unknown shipments are logged and ignored, which makes delivery idempotent.

#### Webhook URL slug

The URL segment comes from `ShippingCarrierDriver::webhookSlug()`, defaulting to the driver's enum value. Override it when a carrier restricts what the URL may contain, for instance when it rejects URLs containing its own brand name, and pick a brand-free slug instead. The controller maps the slug back with `fromWebhookSlug()`.

The shared webhook secret lives in `credentials['webhook_token']`, supporting two patterns:

- **Secret in a header**: the merchant chooses a token, the carrier sends it back on each webhook, and `verifyWebhook()` compares it with `hash_equals()`.
- **Secret in the URL**: the token is system-generated and embedded as a query parameter, for carriers with no dashboard field for a secret.

### Manual sync

`POST /admin/orders/{order}/shipments/{shipment}/sync` goes through `SyncShipmentTrackingController` to `driver->track($shipment->shipment_reference)`. The returned event flows through the same `ApplyShipmentTrackingUpdateAction`, so the state machine guard applies identically.

## Cancellation

Deleting a carrier-created shipment runs `DeleteOrderShipmentAction`, which calls `driver->cancelShipment($shipment->shipment_reference)` to void the label before removing the local record.

## Cash on Delivery

Two separate capabilities share the name, so keep them distinct:

- **`collectsCod()`**, covered here, means the carrier's integration collects the cash and remits it to the merchant. The admin fulfill dialog uses it: buying a label for a COD order shows a "Collect cash on delivery" option, and the amount (the order's balance due) reaches the carrier through `ShipmentRequest::codAmount`.
- **The COD payment method** at checkout is a `PaymentGateway` concern (`PaymentGatewayDriver::Cod`), unrelated to shipping drivers.

Eligibility for the fulfill-dialog option is computed server-side by `Order::can_collect_cod`, which requires a COD payment gateway, a `collects_cod` carrier, and an outstanding balance, and is validated by the `ValidCodCollection` rule. The COD amount goes to the carrier only and is never persisted locally.

## Adding a Shipping Driver

### 1. Add the enum case

```php
// app/Enums/ShippingCarrierDriver.php
case MyCarrier = 'my_carrier';

// in make()
self::MyCarrier => new MyCarrierDriver($carrier),
```

The enum's `make()` is the single place mapping a case to its driver class. `ShippingManager::driver()` resolves through it via `$carrier->driver->make($carrier)`, so this match arm is all the wiring needed. There's no separate registration step.

### 2. Create the driver

```php
// app/Shipping/Drivers/MyCarrierDriver.php
final readonly class MyCarrierDriver implements ShippingDriver
{
    public function __construct(private ShippingCarrier $carrier) {}

    // implement all 10 interface methods; read API keys from
    // $this->carrier->credentials
}
```

Return DTOs, not arrays. Wrap external calls in try/catch and return an empty `collect()` from `rates()` or a failed `ShipmentResult` from `createShipment()` rather than throwing.

### 3. Validate credentials and build the admin UI

Add credential rules to `Store/UpdateShippingCarrierRequest`, build the carrier card, a credentials tab, and a webhook tab if it has webhooks under `resources/js/components/admin/shipping/`, then add the driver to `resources/js/types/shipping.ts`.

### 4. Wire up webhooks

Implement `verifyWebhook()` and `parseWebhook()`. The returned event's `status` maps the carrier's status onto a `ShipmentDeliveryStatus`, and its `trackingNumber` or `shipmentReference` identifies the shipment:

```php
public function parseWebhook(Request $request): ShippingWebhookEvent
{
    $payload = json_decode($request->getContent(), true) ?: [];

    return new ShippingWebhookEvent(
        type: 'track_updated',
        trackingNumber: $payload['awb'] ?? null,
        status: $this->mapStatus($payload['current_status'] ?? null),
        events: [/* optional TrackingEvent[] */],
        payload: $payload,
    );
}
```

If the carrier restricts the webhook URL, override `webhookSlug()` on the enum with a safe value.

### 5. Set the capability flags

Implement `supportsLiveRates()`, `collectsCod()`, and `isManual()` honestly. The system uses them to decide whether to request rates, offer carrier COD, and call the API at all.

## Testing

`ShippingManager::fake()` swaps in the `MockDriver`:

```php
ShippingManager::fake();

// Or with a custom driver
ShippingManager::fake(new MockDriver(alwaysSucceed: false));
```

`MockDriver` returns canned rates (`mock_standard`, `mock_express`), creates shipments with a `MOCK…` tracking number, and reads `parseWebhook()` from request input so you can simulate webhooks.

To exercise a real driver instead, leave `ShippingManager` un-faked and stub the carrier's HTTP endpoints with `Http::fake()`. That tests the driver's request payloads and response handling end to end:

```php
Http::fake([
    'api.example.com/*' => Http::response(['rates' => [/* … */]]),
]);

post(route('admin.orders.shipments.store', $order), [
    'create_with_carrier' => true,
    'service_code' => 'standard',
    'parcels' => [/* … */],
]);

// Simulate a tracking webhook
postJson(route('webhooks.shipping', ['driver' => $carrier->driver->webhookSlug()]), [
    'awb' => $shipment->tracking_number,
    'current_status' => 'DELIVERED',
], ['x-api-key' => $carrier->credentials['webhook_token']]);
```
