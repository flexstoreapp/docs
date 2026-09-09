---
title: Configuration
description: Store settings a staff client reads at start-up.
outline: 2
---

# Configuration

What a staff client needs before it can render anything: the store's identity, the locales every translatable field has a tab for, and the currencies money is formatted in.

The values a status filter accepts are documented on the filter itself, on each listing endpoint, rather than here. Tax display is not here either: it is a property of each order, so read `prices_include_tax` and `tax_details` from the order and a historical order renders under the settings it was placed with.

It is not the storefront's `GET /config`. That one sits behind the storefront maintenance gate and returns `503` when the merchant turns maintenance on, which is when a staff client most needs to work. This one is outside that gate, needs a staff token, and lists inactive currencies as well, since admin is where they get edited.

<OAOperation operation-id="adminGetConfig" />
