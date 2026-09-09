---
title: Cart
description: Cart contents, line items, and shared cart links.
outline: 2
---

# Cart

Cart contents, line items, and shared cart links.

## The cart token

The web storefront keeps the cart id in a cookie. An API client sends the same id as `X-Cart-Token`.

Omit the header on the first request. Any cart endpoint creates a cart and returns its id:

```json
{ "token": "019826f6-2b7a-73c1-9c4e-7f2d1a5b8e10", "items": [], "total": "0.0000" }
```

Persist that value across launches and send it with every cart, checkout and product-view request.

An unknown token is not an error. A fresh cart is created and returned, so a client that lost its storage recovers on its own. When a signed-in customer sends both a bearer token and a cart token, the account cart wins.

A shared cart link reaches an app as a deep link and is redeemed with `POST /cart/share/{items}`, which merges those items into the device's cart.

## Endpoints

<OAOperation operation-id="getCart" />

<OAOperation operation-id="addCartItem" />

<OAOperation operation-id="updateCartItem" />

<OAOperation operation-id="removeCartItem" />

<OAOperation operation-id="clearCart" />

<OAOperation operation-id="listCartCrossSells" />

<OAOperation operation-id="redeemCartShareLink" />
