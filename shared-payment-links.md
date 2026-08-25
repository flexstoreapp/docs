---
title: Shared Payment Links
description: Let a shopper hand the payment for their checkout to someone else, without giving up their cart or their address.
---

# Shared Payment Links

A shopper who has filled in their checkout can ask someone else to pay for it. They send a link, the other person pays with their own payment method, and the order is placed in the shopper's name.

## How a Shopper Creates One

At checkout, once there are items in the cart and a delivery method is chosen, an **Ask someone else to pay** button appears below **Place order**. The shopper does not pick a payment method, since that choice belongs to whoever pays.

Pressing it takes them to a page with a link to copy and send. Everything they entered stays with them: the delivery address, the notes, and any discount code.

The button is hidden when the order total is zero, because there is nothing to pay. It is also hidden when checkout sharing is turned off in [Checkout Settings](/settings-checkout#checkout-sharing).

## What the Payer Sees

Opening the link shows who asked them to pay, the items, the totals, and the payment methods available for that order. They choose whichever method suits them and pay. They never see the shopper's address or a way to change the order.

Once the payment goes through, the payer sees a short confirmation that their payment was received. The order confirmation email goes to the shopper, not to the payer.

## The Order Is Created on Payment

Nothing appears in **Orders** while a link is waiting to be paid. The order is created at the moment the payment succeeds, so an unpaid link never leaves a half-finished order behind.

For the same reason, these checkouts are not treated as abandoned. They are left out of the abandoned checkout list and never trigger a recovery email while the link is still good.

## When a Link Stops Working

A link stops working once any of these happen:

- It has been paid. Anyone opening it afterwards is told the order is already paid.
- The shopper returns to checkout and places the order themselves.
- The discount applied to the checkout is no longer valid.
- The link's lifetime runs out. This is 48 hours by default and can be changed in [Checkout Settings](/settings-checkout#shared-payment-link-lifetime-hours).

In each case the payer gets a plain explanation instead of an error, so they know whether to ask for a new link.

## Stock Is Not Held

Items are not reserved for the whole life of a link. If something sells out before the payer gets round to it, they are told which item is unavailable and the payment does not go through. For items in short supply, it is worth telling shoppers not to leave a link sitting.
