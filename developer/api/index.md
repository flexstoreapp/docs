---
title: Storefront API
description: REST API for the storefront, for mobile apps and custom clients.
---

# Storefront API

Every action a shopper can take on the storefront is available over HTTP: browse the catalog, build a cart, check out, and manage an account.

The admin panel is not exposed. This API covers the customer-facing side only.

## Base URL

```
https://your-store.com/api/v1
```

The major version is in the path. New endpoints and new fields on existing responses ship inside `v1`. Anything that would break a released client gets a new version.

The OpenAPI 3.1 description is served at [`/openapi.json`](/openapi.json). Point a generator at it to get a typed client.

A [Postman collection](/flexstore.postman_collection.json) is generated from the same description. Import it, set the `baseUrl` variable to your store, and paste your token into `bearerToken`.

## Quickstart

List products. The catalog listing is [`/shop`](/developer/api/reference/products#list-products), matching the storefront URL:

```bash
curl https://your-store.com/api/v1/shop
```

Add one to a [cart](/developer/api/cart-and-checkout#the-cart-token). Send no cart token on the first call:

```bash
curl -X POST https://your-store.com/api/v1/cart/items \
  -H 'Content-Type: application/json' \
  -d '{"product_id": 1, "quantity": 2}'
```

The response carries the cart token. Send it on every later cart and checkout call:

```bash
curl https://your-store.com/api/v1/cart \
  -H 'X-Cart-Token: 019826f6-2b7a-73c1-9c4e-7f2d1a5b8e10'
```

Log in to reach account endpoints:

```bash
curl -X POST https://your-store.com/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email": "ada@example.com", "password": "secret", "device_name": "Pixel 9"}'
```

## Guides

| Page | Covers |
| --- | --- |
| [Authentication](/developer/api/authentication) | Tokens, social login, revoking access |
| [Conventions](/developer/api/conventions) | Headers, response shapes, money, errors, rate limits |
| [Cart & checkout](/developer/api/cart-and-checkout) | Cart tokens, the checkout flow, recovery and payment links |

## Reference

**Store**

| Section | Contents |
| --- | --- |
| [Configuration](/developer/api/reference/configuration) | Store identity, locales, currencies, and checkout switches a client reads at start-up. |
| [Homepage](/developer/api/reference/homepage) | The home screen sections, how to render them, and link targets. |
| [Address Rules](/developer/api/reference/address-rules) | The address fields and validation each country requires. |
| [Policies](/developer/api/reference/policies) | Refund, privacy and terms text. |
| [Newsletter](/developer/api/reference/newsletter) | Newsletter signup. |

**Catalog**

| Section | Contents |
| --- | --- |
| [Products](/developer/api/reference/products) | The shop listing, filters, search suggestions, and product detail. |
| [Categories](/developer/api/reference/categories) | The category tree and its product listings. |
| [Brands](/developer/api/reference/brands) | Brands and their product listings. |
| [Reviews](/developer/api/reference/reviews) | Reading and writing product reviews. |
| [Flash Sales](/developer/api/reference/flash-sales) | Time-limited sales and the products in them. |
| [Blog](/developer/api/reference/blog) | Published posts and their authors. |

**Buying**

| Section | Contents |
| --- | --- |
| [Cart](/developer/api/reference/cart) | Cart contents, line items, and shared cart links. |
| [Checkout](/developer/api/reference/checkout) | Shipping and payment options, coupons, and placing an order. |
| [Payment Links](/developer/api/reference/payment-links) | Shared payment links and merchant payment requests. |

**Account**

| Section | Contents |
| --- | --- |
| [Authentication](/developer/api/reference/authentication) | Accounts, access tokens, and password recovery. |
| [Profile](/developer/api/reference/profile) | Account details, password, and deletion. |
| [Orders](/developer/api/reference/orders) | Past orders, invoices, reordering, and guest tracking. |
| [Returns](/developer/api/reference/returns) | Return eligibility, requests, and cancellation. |
| [Downloads](/developer/api/reference/downloads) | Digital files from paid orders. |
| [Addresses](/developer/api/reference/addresses) | The customer address book. |
| [Wishlist](/developer/api/reference/wishlist) | Products the customer saved for later. |
| [Compare](/developer/api/reference/compare) | Products the customer is comparing side by side. |

## Not included

- **Admin endpoints.** Planned, not shipped.
- **Guest wishlists and comparison lists.** Both require an account here; the web keeps them in a cookie.
