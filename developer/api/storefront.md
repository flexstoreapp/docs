---
title: Storefront API
description: REST API for the storefront, for mobile apps and custom clients.
---

# Storefront API

Every action a shopper can take on the storefront is available over HTTP: browse the catalog, build a cart, check out, and manage an account. Requests are authenticated with a customer token, or none at all for the public catalog.

## Quickstart

List products. The catalog listing is `/shop`, matching the storefront URL:

```bash
curl https://your-store.com/api/v1/shop
```

Add one to a [cart](/developer/api/reference/cart#the-cart-token). Send no cart token on the first call:

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
| [Authentication](/developer/api/reference/authentication) | Tokens, social login, revoking access |
| [Conventions](/developer/api/conventions) | Headers, response shapes, money, errors, rate limits |

## Filtering the catalog

The same filters work on `/shop`, `/categories/{category}/products` and `/brands/{brand}/products`:

| Parameter | Value |
| --- | --- |
| `query` | Free text |
| `categories`, `brands` | Comma separated ids |
| `min_price`, `max_price` | Numbers |
| `in_stock`, `on_sale` | Booleans |
| `rating` | 0 to 5 |
| `sort` | `relevance`, `latest`, `price_asc`, `price_desc`, `name_asc`, `name_desc` |
| `per_page` | 24, 36, 48 or 60 |
| `page` | Page number |

`relevance` applies only alongside a `query`. An unsupported `per_page` falls back to the store default rather than erroring.

Searching through `query` is recorded in the merchant's search reports, the same as a storefront search, so terms that return nothing show up there. Only the first page counts, so paging does not inflate the numbers.

`GET /shop/facets` returns the counts behind a filter sheet. It takes `category`, `brand` and `query`, which set the context the counts are computed in; the other filters above do not narrow it. Inside a category context the `categories` list is `null`, and inside a brand context the `brands` list is `null`, since that filter is already fixed.

## In-app purchases

A store-distributed app has to sell digital products with the platform's own billing. Send `X-App-Platform: ios` or `android` on every request and the catalog follows the store's setting:

- `GET /config` returns `checkout.mobile_digital_products`, one of `hidden`, `in_app_purchase` or `external_checkout`.
- With `hidden`, digital products are left out of listings, search, recommendations and the homepage, a digital product page returns `404`, and they cannot be added to the cart or checked out.
- With `in_app_purchase`, only digital products that have a store product ID for the platform are shown. `GET /products/{product}` returns `in_app_purchase.store_product_id` for a product without variants. For a product with variants, each entry in `variants` carries its own `in_app_purchase`. A variant with no ID for the platform cannot be bought there. They still cannot go in the cart.

After the customer completes the purchase in the store, send it to `POST /account/in-app-purchases` with the store product ID and, on iOS, the signed transaction (`signed_transaction`) or, on Android, the purchase token (`purchase_token`). The server verifies it with the store, creates a paid order at the product's price and grants the downloads. Finish or consume the transaction in the store only after the call succeeds. Sending the same purchase again returns the recorded purchase with `200`, so it is safe to retry.

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
| [Profile](/developer/api/reference/profile) | Account details, password, and deletion. |
| [Orders](/developer/api/reference/orders) | Past orders, invoices, reordering, and guest tracking. |
| [Returns](/developer/api/reference/returns) | Return eligibility, requests, and cancellation. |
| [Downloads](/developer/api/reference/downloads) | Digital files from paid orders. |
| [Addresses](/developer/api/reference/addresses) | The customer address book. |
| [Wishlist](/developer/api/reference/wishlist) | Products saved for later, for guests and signed-in customers. |
| [Compare](/developer/api/reference/compare) | Products compared side by side, for guests and signed-in customers. |

Staff endpoints live in the [Admin API](/developer/api/admin).
