---
title: Payment Links
description: Shared payment links and merchant payment requests.
outline: 2
---

# Payment Links

Shared payment links and merchant payment requests. Both reach an app as a deep link.

| Link | Endpoint |
| --- | --- |
| Shared payment, the buyer asked someone else to pay | `/checkout/shared-payments/{session}` |
| Payment request, the merchant asked for a balance due | `/payment-requests/{paymentRequest}` |

For shared payments the session id is the capability: whoever holds the link can pay. Expiry is enforced from the session itself, and a link that is paid, expired or withdrawn returns `410` with a `status` explaining which.

Discount links have no dedicated endpoint. Apply the code with `POST /checkout/coupons`. A shared cart link is redeemed on the [cart](/developer/api/reference/cart) instead.

## Endpoints

<OAOperation operation-id="getSharedPayment" />

<OAOperation operation-id="paySharedPayment" />

<OAOperation operation-id="getPaymentRequest" />

<OAOperation operation-id="payPaymentRequest" />

<OAOperation operation-id="cancelPaymentRequestPayment" />
