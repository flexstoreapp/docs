---
title: Abandoned Checkouts
description: Recover lost sales by finding customers who started checkout but never completed their purchase.
---

# Abandoned Checkouts

This page lists customers who started checkout but never finished. You can see what they were about to buy, the details they entered, and send them a recovery link that restores their cart.

## When a Checkout Becomes "Abandoned"

Three things have to be true: the customer entered their email at checkout, they left without paying, and more than the configured delay has passed since they started (60 minutes by default). Customers who never reach the email step never appear here, since there's no way to contact them.

The delay lives in **Settings > Checkout** under **Abandoned checkout delay (minutes)**.

Checkouts waiting on a [shared payment link](/shared-payment-links) are left out. They are deliberately unfinished while the link is live, so counting them as abandoned would be misleading.

## The List Page

Each row shows the checkout ID, when the customer started, their email, the item count and estimated total from the latest cart snapshot, the status, and whether a recovery email has gone out.

Status is one of **Pending** (still abandoned), **Canceled** (the customer explicitly canceled), or **Recovered** (they completed the order after a recovery email).

The filter bar narrows by search (checkout ID or email), status, and whether the recovery email was sent.

## The Detail Page

Click a row to see the status badge, the products that were in the cart with thumbnails and quantities, the totals (subtotal, shipping, tax, discount, total), the customer's details, and the shipping and billing addresses they entered. Customers with an account also show their total orders, lifetime value, and how long they've been a customer.

If the customer applied a coupon before leaving, it shows in the totals. You can also apply or remove a coupon from a pending checkout. The discount is saved on the cart, so it is still there when they open the recovery link.

An activity timeline records checkout started, recovery email sent, recovery link clicked, recovered as order, and checkout canceled.

The header carries a **Send recovery email** button, which becomes **Resend recovery email** once one has gone out.

## Recovery Email

Recovery emails are automatic. A scheduled job runs every 15 minutes and emails each pending checkout that has been idle longer than the configured delay. You can also send one by hand from the detail page.

::: warning Scheduler required
Automatic recovery emails only go out while the background scheduler is running. If you haven't set up the cron job yet, follow [Scheduler setup](/installation#scheduler-optional). Until then, the **Send recovery email** button is the only way anything gets sent.
:::

The email contains a unique signed link that expires after 30 days. Clicking it restores the customer's original cart, drops them on the checkout page with their email and address pre-filled, and lets them finish in a few clicks. If a discount is on the checkout, the email lists it next to the cart total. Apply a coupon yourself on a pending checkout and the email also adds a highlighted line with the code and savings. A coupon the customer already applied does not get that extra line.

Complete the order and the checkout is marked **Recovered** automatically, with the timeline linking to the resulting order.

The automatic email is sent once only. Use **Resend recovery email** if a customer asks for the link again.

## What Counts as Recovered

A checkout counts as recovered when a recovery email was sent, that same checkout was paid, and an order was created.

Recovered checkouts stay in the list with a **Recovered** badge so you can audit how many emails turned into orders. They also feed the **Recovery rate** in the [Abandoned Checkouts report](/reports#abandoned-checkouts).
