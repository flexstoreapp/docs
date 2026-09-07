---
title: API Conventions
description: Headers, response shapes, money, errors, and rate limits.
---

# Conventions

## Request headers

| Header | Purpose |
| --- | --- |
| `Authorization` | Bearer token, for account endpoints |
| `X-Cart-Token` | [The cart this device owns](/developer/api/cart-and-checkout#the-cart-token) |
| `X-Visitor-Id` | A uuid the app generates once and sends on every request, so product views count once per device |
| `Accept-Language` | Locale for translated fields |
| `X-Currency` | Currency for prices |

Locale and currency are resolved per request. An unavailable locale falls back to the store default, an unavailable currency to the base currency. Nothing is stored server side, so switching language in an app needs no round trip.

## Reads that use POST

[`POST /checkout/shipping-options`](/developer/api/reference/checkout#list-available-shipping-methods) and [`POST /checkout/payment-options`](/developer/api/reference/checkout#list-available-payment-methods) return data rather than change anything. They use `POST` because what they return depends on the destination address, which is a nested object that does not belong in a query string. Neither creates a record, so calling one twice is harmless.

## Response shape

A single record is wrapped in `data`:

```json
{ "data": { "id": 42, "title": "Merino crew knit" } }
```

Paginated lists add `links` and `meta`:

```json
{
  "data": [],
  "links": { "first": "...", "last": "...", "prev": null, "next": "..." },
  "meta": { "current_page": 1, "per_page": 24, "total": 112 }
}
```

## Translated fields

Product titles, category names, shipping method names and similar fields arrive as a plain string in the requested locale, never as a map of locales.

## Money

Every monetary value is a string, in the active currency:

```json
{ "price": "49.9900", "total": "109.9800" }
```

Parse it as a decimal, not a float. Formatting details, symbol, position, separators and decimal places, come from [`GET /config`](/developer/api/reference/configuration#get-the-store-configuration).

## Addresses

Required address fields differ by country. Build the checkout form from [`GET /address-field-rules/{country}`](/developer/api/reference/address-rules#get-the-address-fields-for-a-country) rather than a fixed set of inputs. A US address needs a state and a ZIP code; many countries need neither, and some label them differently.

## Filtering and sorting

Product listings accept the same filters on [`/shop`](/developer/api/reference/products#list-products), [`/categories/{category}/products`](/developer/api/reference/categories#list-products-in-a-category) and [`/brands/{brand}/products`](/developer/api/reference/brands#list-products-for-a-brand):

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

[`GET /shop/facets`](/developer/api/reference/products#list-filter-facets) takes the same parameters and returns the counts each remaining choice would produce, which is what a filter sheet needs.

## Errors

| Status | Meaning |
| --- | --- |
| `401` | No token, or the token was revoked |
| `403` | Valid token, but not permitted |
| `404` | No such record, or it belongs to another customer |
| `410` | The record exists but the window for this action has closed |
| `422` | Validation failed, or the action is not currently possible |
| `429` | Rate limited |

Validation errors name the offending fields:

```json
{
  "message": "The email field is required.",
  "errors": { "email": ["The email field is required."] }
}
```

Business rules use the same shape. A cart line above available stock arrives as a field error the form can render directly.

Messages honour `Accept-Language`.

## Rate limits

Authentication, password reset, order tracking, newsletter signup and file downloads are throttled. Exceeding a limit returns `429` with a `Retry-After` header. Log in attempts are throttled per email and IP together.
