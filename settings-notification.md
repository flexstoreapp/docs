---
title: Notification Settings
description: Configure which email notifications your store sends to admins and customers.
---

# Notification Settings

Control which emails your store sends, under **Settings > Notification**.

## Admin Notifications

These go to your store email address.

| Notification | Sent when | Default |
|---|---|---|
| **New order** | A customer places an order | On |
| **Order canceled** | An order is canceled | On |
| **Low stock** | A product hits or falls below the low stock threshold from **Settings > General** | On |
| **New customer** | Someone creates an account | Off |
| **New review** | A customer submits a product review | On |

## Customer Notifications

### Order Confirmed

Sends a confirmation immediately after checkout, with an invoice PDF attached. On by default.

### Abandoned Checkout Recovery

Emails customers who started checkout but didn't finish, with a link straight back to their cart. On by default. If you applied a coupon on that checkout, the email automatically includes a line with the code and savings. Coupons the customer applied themselves are not called out that way.

The timing controls, **Abandoned checkout delay (minutes)** and **Recovery link lifetime (days)**, live in [Checkout Settings](/settings-checkout#abandoned-checkout-delay-minutes).

Recovery emails only go to customers whose email was captured during checkout, and sessions that already turned into an order are skipped. See [Abandoned Checkouts](/abandoned-checkouts) for more.

::: warning Scheduler required
Automatic recovery emails only go out while the background scheduler is running. If you haven't set up the cron job, follow [Scheduler setup](/installation#scheduler-optional). Until then, only the manual **Send recovery email** button dispatches anything.
:::

### Per-Action Notifications

The rest of the customer emails are controlled by a **Notify customer** checkbox on the action that triggers them, rather than a global toggle:

- [Fulfilling items](/orders#fulfilling-items) sends a fulfillment confirmation with tracking, if provided. Unchecked by default.
- [Editing tracking](/orders#editing-tracking) sends a tracking update. Checked by default.
- [Cancelling an order](/orders#cancelling-an-order) sends a cancellation confirmation. Checked by default.
- [Processing a refund](/orders#submitting-the-refund) sends a refund confirmation. Checked by default.

That way you decide per action rather than all at once.
