---
title: Regions
description: Create and manage regions in FlexStore to control shipping rates, tax rates, and payment gateway availability.
---

# Regions

A region is a named geographic grouping you define: the countries, states, and postal codes that belong together. Shipping rates, tax rates, and payment gateways can then be tied to a region so they only apply to customers in that part of the world.

You might build a "European Union" region covering all member countries, a "United States" region, or something as narrow as "California".

## Viewing Your Regions

Go to **Regions** in the sidebar. The list shows every region with its countries, states, and postal codes. Search by name in the bar at the top, and click any column header to sort.

## Adding a Region

Click **Add region**, fill in the details below, and click **Add region** to save.

### Region Name

Something you'll recognise later when setting up shipping, tax, or payment rules, like "North America", "Germany", or "Australia & New Zealand".

### Countries

Every region needs at least one. Click **Browse countries** to open the picker, search the full list, and check what you want. The footer shows the count ("3 selected"), and clicking that label filters the list down to your selections so you can review and prune them. Click **Confirm** when you're done.

Back in the dialog, the first three countries appear as tags with an × to remove them. Anything beyond that shows as a **+N** badge, so reopen the picker to manage the full set.

### States

Optional. Leave the field empty and the region covers the whole country or countries you chose. To narrow it to specific states or territories, type each name and press **Enter** or click the **+** button. Each becomes a tag you can remove with its ×.

### Postal codes

Also optional, and the most precise targeting available. Type each value and press **Enter** or click **+**.

You don't have to list every code. Each entry can take one of three forms:

- **Exact**: a single code such as `90210`. Codes containing a hyphen, like the Japanese `100-0001` or the US ZIP+4 `90210-1234`, match exactly as written.
- **Prefix wildcard**: a partial code ending in `*`, such as `902*`, matching `90210`, `90250`, `90290`, and so on. Letters work too, so `SW1*` catches UK codes like `SW1A 1AA`.
- **Numeric range**: two numbers joined by two dots, such as `90001..90099`, matching everything in between inclusive. Ranges only work for all-digit postal codes.

Mix all three freely. Adding `90210`, `100*`, and `60601..60699` targets one exact code, everything starting with `100`, and a whole range at once.

### Active

Inactive regions aren't matched against customer addresses, so any shipping rate, tax rate, or payment gateway tied to them disappears from checkout. Leave it checked to use the region right away.

## Editing a Region

Click any row to open the edit dialog. Every field can be changed. Click **Update region** to save.

## Deleting Regions

Check the regions you want gone, click **Delete** in the action bar above the table, and confirm.

::: warning
Deletion is permanent. Check first that no active shipping rates, tax rates, or payment gateways depend on the region, since removing it affects those configurations.
:::

## How Regions Connect to the Rest of Your Store

On their own, regions change nothing for customers. They're a building block other features use for location-specific rules.

**Shipping rates** are each assigned to a region and only offered to customers delivering inside it. That's how you charge differently for domestic and international orders, or offer free shipping in select countries. See [Shipping settings](/settings-shipping).

**Tax rates** work the same way, so the right tax is calculated from the customer's address at checkout. Typically one rate for your home country and separate ones for other markets where you collect tax. See [Taxes settings](/settings-taxes).

**Payment gateways** can be restricted to one or more regions, appearing at checkout only for customers inside them. Handy when a payment method is only available or relevant in certain countries. See [Payments settings](/settings-payments).
