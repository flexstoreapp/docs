---
title: Checkout Settings
description: Control guest checkout, shared payment links, stock holds, and when a checkout is treated as abandoned.
---

# Checkout Settings

How shoppers are allowed to pay, and how long the store waits for them. Find these under **Settings > Checkout**.

## Guest Checkout

On, and a shopper can place an order without creating an account: they only need an email address. Off, and anyone reaching checkout is asked to log in or register first, and is returned to checkout once they do.

Turning this off means every order is tied to a customer account, which makes order history and repeat purchases easier to follow. It also loses the sales from shoppers who would rather not register, so leave it on unless you have a reason.

Customers who are already logged in are never affected by this setting.

## Checkout Sharing

On, and the **Ask someone else to pay** button appears at checkout, so a shopper can send their filled-in checkout to another person to pay. See [Shared Payment Links](/shared-payment-links) for what the shopper and the payer each see.

Off, and the button disappears. Links that were already created keep working until they expire or are paid.

## Digital Products in Mobile Apps

Controls how your apps treat digital products, with one option for the **iOS app** and one for the **Android app**. Each store has its own rules, so the two can differ. Your website is not affected. The choices are:

- **Hide digital products**: the default. The app leaves digital products out of the shop, search, categories, the homepage, wishlists and comparisons, and nobody can add one to the cart from the app. Physical products sell as usual. Choose this if you only sell physical goods, because it needs no in-app purchase setup.
- **Sell with in-app purchase**: the app shows a digital product only when it has a product ID for that platform, set under [Mobile Apps](/products#mobile-apps) on the product or on each of its variants. Customers buy it with **Buy now** on the product page, using the App Store or Google Play payment sheet, and it never goes in the cart. FlexStore creates a paid order at the product's FlexStore price and the downloads appear straight away. The store charges the price set for the product in App Store Connect or Play Console, so mirror any sale price there too (see [Mobile Apps](/products#mobile-apps)). Customers must be logged in to buy. This needs the store accounts connected under [Integration settings](/settings-integration#in-app-purchases).
- **Sell with your own checkout**: the app sells digital products through your own checkout, like any other product. App Store and Google Play usually do not allow this, so pick it only if you have cleared it with them.

This exists because the App Store and Google Play require digital goods to be sold with in-app purchase, and an app that sends buyers to an outside payment page for them can be rejected.

To sell a single product through your own checkout while the rest follow these options, use **Sell with your own checkout** under [Mobile Apps](/products#mobile-apps) on that product. It suits gift cards that are spent on physical goods, which the stores treat differently from digital goods.

With **Hide digital products**, the app also hides **Downloads** and the download links on orders, so files bought on your website are not offered in the app. The App Store and Google Play only allow access to content bought elsewhere when the same items are also sold with in-app purchase in the app. Customers still receive the download links by email and can open them on your website. With the other two options the app keeps showing downloads. A product with **Sell with your own checkout** turned on keeps its downloads in the app, even when the app's option is **Hide digital products**, because customers buy it in the app and need the files.

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
