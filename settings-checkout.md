---
title: Checkout Settings
description: Control guest checkout, shared payment links, stock holds, and when a checkout is treated as abandoned.
---

# Checkout Settings

How shoppers are allowed to pay, and how long the store waits for them. Find these under **Settings > Checkout**.

## Guest Checkout

On, and a shopper can place an order without creating an account: they only need an email address. Off, and anyone reaching checkout is asked to sign in or register first, and is returned to checkout once they do.

Turning this off means every order is tied to a customer account, which makes order history and repeat purchases easier to follow. It also loses the sales from shoppers who would rather not register, so leave it on unless you have a reason.

Customers who are already signed in are never affected by this setting.

## Checkout Sharing

On, and the **Ask someone else to pay** button appears at checkout, so a shopper can send their filled-in checkout to another person to pay. See [Shared Payment Links](/shared-payment-links) for what the shopper and the payer each see.

Off, and the button disappears. Links that were already created keep working until they expire or are paid.

## Shared Payment Link Lifetime (hours)

How long a shared payment link stays valid after it is created. Once the time is up, anyone opening the link is told it has expired and the shopper needs to send a new one. Defaults to 48 hours, and accepts anything from 1 hour to 30 days (720 hours).

Shorter is safer for items in short supply, since stock is not held while a link waits to be paid. Longer gives the payer more room if they are in another time zone.

## Stock Reservation Window (minutes)

How long stock is held for a shopper once they start paying. The hold keeps the items out of other shoppers' carts while the payment is being processed, and is released if the payment is not completed in time.

Defaults to 10 minutes, with a range of 1 minute to 24 hours (1440 minutes). Give it enough room for slower payment methods, such as bank redirects, where a shopper may leave the store and come back. Setting it very high ties up stock that may never be sold.

## Abandoned Checkout Delay (minutes)

How long after a checkout starts before it counts as abandoned. This one value drives both when the session shows up in the [Abandoned Checkouts](/abandoned-checkouts) list and when the scheduler queues the recovery email. Defaults to 60 minutes, and accepts anything from 1 minute to 7 days (10080 minutes).

The on/off switch for the recovery email itself lives in [Notification Settings](/settings-notification#abandoned-checkout-recovery).

## Recovery Link Lifetime (days)

How long the link inside the recovery email stays valid. Clicking it restores the customer's cart by setting a cookie in their browser, so keep this no longer than you need. Defaults to 7 days, with a range of 1 to 90.
