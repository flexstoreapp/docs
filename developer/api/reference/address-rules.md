---
title: Address Rules
description: The address fields and validation each country requires.
outline: 2
---

# Address Rules

Build any address form from these rules rather than assuming a fixed set of fields. That means checkout and the [address book](/developer/api/reference/addresses) alike: both validate against the same per-country rules, so a form built for one country will fail for another.

Required fields differ by country. A US address needs a state and a ZIP code; many countries need neither, and some label them differently. Read the rules for the country the customer picked, then render and validate accordingly. Posting a US address without a state returns `422` on the `state` field, whether it came from checkout or the address book.

## What varies between countries

The sample below the endpoint is the United States. Bangladesh returns the same shape with different answers:

```json
{
  "country_code": "BD",
  "city": { "label": "City", "required": true, "hidden": false, "options": null },
  "state": {
    "label": "District",
    "required": true,
    "hidden": false,
    "options": [
      { "value": "Dhaka", "label": "Dhaka" },
      { "value": "Chattogram", "label": "Chattogram" }
    ]
  },
  "postal_code": { "label": "Postal code", "required": false, "hidden": true, "options": null }
}
```

Three things differ from the US response, and each one changes what you render:

- **The label.** `state` is "State" in the US and "District" in Bangladesh. Never hardcode a field name in your own copy.
- **`hidden`.** Bangladesh hides `postal_code` entirely; the United Kingdom hides `state` and requires `postal_code`. A hidden field should not be drawn, and is not validated.
- **What `options` holds.** The US list is subdivision codes with separate labels (`MA` / `Massachusetts`), so what you submit differs from what you show. Bangladesh uses the district name for both. Submit the `value`, display the `label`, and the difference stops mattering.

`options: null` means free text. `options` with entries means a picker, and a value outside the list is rejected.

<OAOperation operation-id="getAddressFieldRules" />
