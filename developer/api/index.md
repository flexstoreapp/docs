---
title: API
description: The REST API for FlexStore, in two halves, one for the storefront and one for the admin panel.
---

# API

FlexStore exposes two REST APIs under one version. The [Storefront API](/developer/api/storefront) is what a shopper's app talks to, and the [Admin API](/developer/api/admin) is what a staff app talks to. They share a base URL, a version, the error and pagination envelopes, and the [conventions](/developer/api/conventions); they differ in who holds the token and what it may do.

| | Storefront | Admin |
| --- | --- | --- |
| Path | `/api/v1` | `/api/v1/admin` |
| Who | Shoppers, and anonymous visitors | Staff |
| Token ability | `customer` | `admin` |
| Gate | Ownership: a customer reaches their own data | Permissions: the same ones the admin panel enforces |

A token from one side is rejected by the other, so a single app cannot drift across the boundary by accident.

## Base URL

```
https://your-store.com/api/v1
```

The major version is in the path. New endpoints and new fields on existing responses ship inside `v1`. Anything that would break a released client gets a new version.

The OpenAPI 3.1 description is served at [`/openapi.json`](/openapi.json) and covers both halves. Point a generator at it to get a typed client.

Postman collections are generated from the same description, one per half: [storefront](/flexstore.postman_collection.json) and [admin](/flexstore-admin.postman_collection.json). Import the one you need, set the `baseUrl` variable to your store, and paste your token into `bearerToken`.

## Where to start

| Page | Covers |
| --- | --- |
| [Conventions](/developer/api/conventions) | Headers, response shapes, money, errors, rate limits |
| [Storefront API](/developer/api/storefront) | Catalog, cart, checkout, customer accounts |
| [Admin API](/developer/api/admin) | Catalog management, orders, customers, reporting |
