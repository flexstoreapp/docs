---
title: Admin API
description: The staff-facing half of the API, covering catalog, orders, customers and reporting.
---

# Admin API

Everything a staff member can do in the admin panel, over HTTP. It sits under `/api/v1/admin` and follows the same [conventions](/developer/api/conventions) as the storefront half: same envelopes, money as a string, translated fields resolved to the requested locale. Listings page the same way, except that `per_page` here takes any number from 1 to 100.

## Signing in

```bash
curl -X POST https://your-store.com/api/v1/admin/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email": "ada@your-store.com", "password": "secret", "device_name": "Studio display"}'
```

The token that comes back carries the `admin` ability. A storefront token cannot reach these endpoints, and an admin token cannot reach the customer ones.

Staff with two-factor authentication get a challenge instead of a token:

```json
{ "two_factor_required": true, "two_factor_token": "42|kZ9x...", "expires_in": 300 }
```

Send that token as the bearer token to `POST /admin/auth/two-factor` with the authenticator `code`, or a `recovery_code`, and it comes back as a real admin token. The pending token expires in five minutes and can reach nothing else in the API, so the password is never sent twice. Accounts with no admin permissions are rejected, so a customer cannot log in here.

## Postman

An [admin collection](/flexstore-admin.postman_collection.json) is generated from the spec. Import it, set `baseUrl` to your store, log in, and paste the token into `bearerToken`.

## Permissions

Every endpoint is gated by the same permission as the matching admin screen, and each operation's description names the one it needs. A token inherits the permissions of the staff member's roles, so a Staff member who can view orders but not refund them gets `403` on the refund endpoints.

`GET /admin/auth/me` returns the signed-in staff member with their roles and resolved permissions, which is what a client should build its navigation from rather than assuming.

## Sections

| Section | Contents |
| --- | --- |
| [Authentication](/developer/api/reference/admin/authentication) | Admin tokens and the two-factor challenge |
| [Configuration](/developer/api/reference/admin/configuration) | Store settings a client reads at start-up |
| [Dashboard](/developer/api/reference/admin/dashboard) | Headline figures for the home screen |
| [Orders](/developer/api/reference/admin/orders) | Orders, statuses, timeline, fulfilment, payments, refunds |
| [Returns](/developer/api/reference/admin/returns) | The return workflow and labels |
| [Abandoned Checkouts](/developer/api/reference/admin/abandoned-checkouts) | Recovery coupons and emails |
| [Products](/developer/api/reference/admin/products) | Products, variants, digital files |
| [Inventory](/developer/api/reference/admin/inventory) | Stock levels and adjustments |
| [Search Synonyms](/developer/api/reference/admin/search-synonyms) | Terms that widen storefront search |
| [Categories](/developer/api/reference/admin/categories) | The category tree and its ordering |
| [Brands](/developer/api/reference/admin/brands) | Brands |
| [Blog Posts](/developer/api/reference/admin/blog-posts) | Posts and scheduling |
| [Coupons](/developer/api/reference/admin/coupons) | Discount codes and validation |
| [Flash Sales](/developer/api/reference/admin/flash-sales) | Time-limited sales |
| [Customers](/developer/api/reference/admin/customers) | Customer records and addresses |
| [Reviews](/developer/api/reference/admin/reviews) | Review moderation |
| [Reports](/developer/api/reference/admin/reports) | Read-only reporting |
| [Media](/developer/api/reference/admin/media) | Uploads other endpoints reference |

## Not included yet

Settings, the storefront builder, staff and roles, regions, shipping, taxes, payment gateways, system tooling, and product import and export. Those screens have no API equivalent yet, so a client still needs the admin panel for them.
