---
title: API Conventions
description: Headers, response shapes, money, errors, and rate limits, across both halves of the API.
---

# Conventions

These hold for both the [Storefront API](/developer/api/storefront) and the [Admin API](/developer/api/admin).

## Request headers

| Header | Purpose | Applies to |
| --- | --- | --- |
| `Authorization` | Bearer token, `Authorization: Bearer 12\|Xk9tQ...` | Both |
| `Accept-Language` | Locale for translated fields | Both |
| `X-Currency` | Currency for prices | Both |
| `X-Cart-Token` | [The cart this device owns](/developer/api/reference/cart#the-cart-token) | Storefront |
| `X-Visitor-Id` | A uuid the app generates once and sends on every request, so product views count once per device | Storefront |

Locale and currency are resolved per request. An unavailable locale falls back to the store default, an unavailable currency to the base currency. Nothing is stored server side, so switching language in an app needs no round trip.

## Start-up configuration

Both halves publish what a client needs before its first screen: store identity, the configured locales, and the currencies with their formatting rules. Read it once at launch rather than hardcoding any of it.

| Half | Endpoint | Also carries |
| --- | --- | --- |
| Storefront | `GET /config` | Checkout switches and the policies the merchant has written. Public, no token |
| Admin | `GET /admin/config` | Inactive currencies as well as active ones. Needs a staff token |

The two are not interchangeable. `GET /config` sits behind the storefront maintenance gate and returns `503` while maintenance is on, so a staff client must read `GET /admin/config` instead.

## Response shape

A single record is the response body itself, with no envelope:

```json
{ "id": 42, "title": "Merino crew knit" }
```

An envelope appears only when there is something to sit beside the payload. Paginated lists put the rows under `data` so `links` and `meta` have somewhere to live:

```json
{
  "data": [],
  "links": { "first": "...", "last": "...", "prev": null, "next": "..." },
  "meta": { "current_page": 1, "per_page": 24, "total": 112 }
}
```

A handful of endpoints wrap for the same reason without paginating, because they return a sibling alongside the record: `GET /search/suggestions` adds `meta`, and the abandoned checkout endpoints add `customer_stats` and `sent`. Every other response is unwrapped, including unpaginated lists, which arrive as a plain array.

`per_page` is capped differently on each half. Storefront listings accept 24, 36, 48 or 60, and fall back to the store default rather than erroring. Admin listings accept any number from 1 to 100, and reject anything larger.

## Translated fields

Product titles, category names, shipping method names and similar fields arrive as a plain string in the requested locale, never as a map of locales.

Which locales exist is a store setting, never a fixed list. An admin client building the per-locale tabs on a translatable field reads them from `locales.available`.

## Money

Every monetary value is a string, in the active currency:

```json
{ "price": "49.9900", "total": "109.9800" }
```

Parse it as a decimal, not a float. Formatting details, symbol, position, separators and decimal places, come from `GET /config` on the storefront and `GET /admin/config` on the admin half.

## Errors

| Status | Meaning |
| --- | --- |
| `401` | No token, or the token was revoked |
| `403` | Valid token, but not permitted. On the admin half, the staff member lacks the permission the endpoint requires |
| `404` | No such record, or it belongs to another customer |
| `409` | The record is in a state that forbids this, such as shipping a canceled order |
| `410` | The record exists but the window for this action has closed |
| `422` | Validation failed, or the action is not currently possible |
| `429` | Rate limited |

Validation errors name the offending fields:

```json
{
  "message": "The email address field is required.",
  "errors": { "email": ["The email address field is required."] }
}
```

Business rules use the same shape. A cart line above available stock arrives as a field error the form can render directly.

Messages honour `Accept-Language`.

## Rate limits

Exceeding a limit returns `429` with a `Retry-After` header.

On the storefront, authentication, password reset, order tracking, newsletter signup and file downloads are throttled. Log in attempts are throttled per email and IP together.

On the admin half, `POST /admin/auth/login` allows 10 attempts a minute and the two factor challenge allows 6. Nothing else is throttled, since every other admin endpoint already needs a token.
