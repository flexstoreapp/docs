---
title: Cart & Checkout
description: Cart tokens, the checkout sequence, and the links a customer can arrive with.
---

# Cart & Checkout

## The cart token

The web storefront keeps the cart id in a cookie. An API client sends the same id as `X-Cart-Token`.

Omit the header on the first request. Any cart endpoint creates a cart and returns its id:

```json
{ "data": { "token": "019826f6-2b7a-73c1-9c4e-7f2d1a5b8e10", "items": [], "total": "0.0000" } }
```

Persist that value across launches and send it with every cart, checkout and product-view request.

An unknown token is not an error. A fresh cart is created and returned, so a client that lost its storage recovers on its own. When a signed-in customer sends both a bearer token and a cart token, the account cart wins.

## Placing an order

| Step | Call | Result |
| --- | --- | --- |
| 1 | [`POST /checkout/shipping-options`](/developer/api/reference/checkout#list-available-shipping-methods) | The shipping methods for that address |
| 2 | [`POST /checkout/payment-options`](/developer/api/reference/checkout#list-available-payment-methods) | The gateways the buyer can pay with |
| 3 | [`POST /checkout`](/developer/api/reference/checkout#submit-the-checkout) | A `redirect_url` to open |
| 4 | Open `redirect_url` in a web view | The buyer pays |
| 5 | [`GET /checkout/sessions/{session}`](/developer/api/reference/checkout#get-checkout-session-status) | The order, once payment settles |

Steps 1 and 2 both take the destination address and return what the buyer can choose there, plus an estimated tax total. Live carrier quotes appear here when the merchant has a carrier connected; pass the option's `quote_reference` back in step 3.

Step 3 reserves stock, creates the checkout session, and returns a `redirect_url`.

Step 5 is what turns a paid session into an order. It verifies the payment with the gateway and returns the order once it settles. Call it when the web view closes rather than trusting the exit itself.

If the buyer abandons the payment step, [`DELETE /checkout/sessions/{session}`](/developer/api/reference/checkout#cancel-a-checkout-session) releases the reserved stock immediately instead of waiting for the hold to lapse. A session waiting on a shared payment is left running, because someone else may still be paying it.

### Native payment sheets

Gateways that run in-app rather than in a hosted page expose their public key on the payment option. Collect the card in the SDK and pass the resulting `card_token` to [`POST /checkout`](/developer/api/reference/checkout#submit-the-checkout).

### Asking someone else to pay

Send `shared_payment: true` on [`POST /checkout`](/developer/api/reference/checkout#submit-the-checkout) and no gateway is charged. The returned `redirect_url` is a link to hand to whoever is paying, and it stays valid for the window the merchant configured. See [inbound links](#inbound-links) for the endpoints behind it.

### Guest checkout

The same sequence works without a bearer token. If the merchant has disabled guest checkout, [`POST /checkout`](/developer/api/reference/checkout#submit-the-checkout) requires one.

## Abandoned checkout recovery

Two calls keep the pending checkout session current while the buyer fills the form:

- [`PATCH /checkout/draft`](/developer/api/reference/checkout#save-checkout-progress) as fields change, debounced.
- [`POST /checkout/options`](/developer/api/reference/checkout#select-shipping-and-payment) when a shipping or payment method is selected.

The merchant's abandoned checkout list and recovery emails are built from that session. Checkout still works without these calls, but abandoned carts from the app are invisible to recovery.

When a buyer opens a recovery email, [`GET /checkout/recover/{session}`](/developer/api/reference/checkout#restore-an-abandoned-cart) returns the abandoned cart. Store its `token` as the device's cart.

## Inbound links

Three kinds of link can reach an app as a deep link:

| Link                                                  | Endpoint                              |
| ----------------------------------------------------- | ------------------------------------- |
| Shared payment, the buyer asked someone else to pay   | [`/checkout/shared-payments/{session}`](/developer/api/reference/payment-links#get-a-shared-payment-link) |
| Payment request, the merchant asked for a balance due | [`/payment-requests/{paymentRequest}`](/developer/api/reference/payment-links#get-a-payment-request) |
| Shared cart                                           | [`POST /cart/share/{items}`](/developer/api/reference/cart#add-shared-items-to-the-cart)            |

For shared payments the session id is the capability: whoever holds the link can pay. Expiry is enforced from the session itself, and a link that is paid, expired or withdrawn returns `410` with a `status` explaining which.

Discount links have no dedicated endpoint. Apply the code with [`POST /checkout/coupons`](/developer/api/reference/checkout#apply-a-coupon).
