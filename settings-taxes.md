---
title: Tax Settings
description: Configure how taxes are calculated, applied, and displayed to customers in your store.
---

# Tax Settings

Control how your store handles tax, under **Settings > Tax**. The page has global **Tax configuration** at the top and a list of **Tax rates** you define per region and product category below.

## Tax Configuration

**Default tax rate** is the fallback percentage for products with no specific rate assigned. Enter it as a percentage, so `20` means 20%. Rates configured for a particular region or category always take priority.

**Tax based on** decides which address determines the rate:

- **Shipping address**: where the order is delivered. The most common choice.
- **Billing address**: the customer's billing address.
- **Store address**: your own address, regardless of where the customer is.

**Prices include tax** tells the store whether the prices you enter already contain tax. It changes how everything is displayed:

| | Prices include tax **on** | Prices include tax **off** |
|---|---|---|
| Product prices | Labelled "(incl. tax)" | No tax label |
| Checkout subtotal | "Subtotal (incl. tax)" | "Subtotal" |
| Tax line at checkout | Hidden, since tax is already in the prices | A separate line |
| Order total | Subtotal + shipping - discount | Subtotal + shipping - discount + tax |

**Tax on shipping** applies the tax rate to the shipping fee as well as the products.

**Display tax totals** controls how tax is shown at checkout and on order summaries: **Itemized** gives each applicable rate its own line, **Single total** combines them into one.

Click **Save changes** to apply.

## Tax Rates

Tax rates set precise percentages for a combination of region and product tax category, overriding the default rate for any matching order.

Click **Add tax rate** and provide:

- **Region**: the geographic region it applies to.
- **Tax category**: the product category it applies to, picked from the built-in list, such as Standard, Clothing & apparel, or Digital services.
- **Rate**: the percentage.
- **Active**: whether it's currently in use.

Search and sort existing rates with the search bar and column headers. Click a rate to edit it, or use the delete action to remove it permanently.

If your tax obligations aren't clear to you, talk to a tax professional.
