---
title: Coupons
description: Create and manage discount coupons that customers can apply at checkout.
---

# Coupons

Coupons are discount codes customers enter at checkout. They can take a fixed amount or a percentage off, expire on a date, and be limited to a set number of uses.

## Coupon List

Open **Coupons** from the sidebar. Each row shows:

- **Coupon code**: what customers type at checkout.
- **Discount value**: the amount or percentage off, such as `$10.00` or `15%`.
- **Usage**: how many times it's been used, shown as used/limit (`3/10`) when a total limit is set.
- **Schedule**: the valid date range, if any.
- **Status**: Active or Inactive.

Search by any part of a code and filter by status in the filter bar. Click a row to edit it.

To delete in bulk, select coupons with the row checkboxes (or the header checkbox for the whole page) and click **Delete**. You'll be asked to confirm.

## Adding a Coupon

Click **Add coupon** in the top-right corner. Only the code and discount value are required.

### Coupon Code

What customers type at checkout. Letters and numbers only, no spaces or special characters, up to 50 characters, and unique across your store. Pick something memorable like `SUMMER20` or `WELCOME10`.

Codes are saved in uppercase and matched without regard to case, so a customer who types `summer20` gets the same discount as one who types `SUMMER20`. That also means `summer20` and `SUMMER20` count as the same code, so you cannot create both.

### Discount Value and Type

Choose the type from the dropdown attached to the value field:

- **Flat amount**: a fixed sum off the order total, capped at the total itself.
- **Percentage**: a percentage off, between 0 and 100.

Switching type clears the field so you can enter the right kind of value.

### Restrictions

- **Minimum order value**: the subtotal an order must reach before the coupon applies. Enter `50.00` and the coupon only works on orders of $50 or more. Blank means any order qualifies.
- **Maximum discount amount**: caps the currency amount a percentage coupon can take off. A 20% coupon capped at $15 discounts fully up to a $75 order and stops there. Disabled for flat amount coupons, where the value is already fixed.
- **Total usage limit**: how many times the coupon can be used across all customers. Blank means unlimited.
- **Usage limit per customer**: how many times one customer can use it. Enter `1` for a once-per-customer coupon. Blank means unlimited.

### Availability

- **Start date and time**: when the coupon becomes valid. Blank means immediately.
- **Expiry date and time**: when it stops working, which must be after the start date. Blank means never.
- **Active**: untick to disable the coupon without deleting it. New coupons start active.

### Saving

Click **Add coupon** and you land on its edit page. Tick **Add more** first to reset the form instead and create another right away.

## Editing a Coupon

Click any coupon in the list. The fields are the same as when adding, and the page description shows when it was last updated. Click **Update coupon** to save.

## Sharing a Coupon Link

Rather than asking customers to type a code, share a link that applies it for them. Handy for email campaigns, social posts, and influencer promotions.

The coupon's edit page has a **Shareable link** card with a link like `https://yourstore.com/discount/SUMMER20`. Click the copy button and paste it wherever you're promoting the coupon.

Opening the link lands the customer on your homepage with the discount remembered. Once they have items in their cart and reach checkout, it applies on its own, and they can still remove it if they want.

Worth keeping in mind:

- The discount applies at checkout, so an empty cart just means it waits until they add products.
- Every normal rule still holds. An expired coupon, an order below the minimum, or an exhausted usage limit all block it exactly as if the code were typed.
- The link contains the code, so anyone it's forwarded to can use it. Set usage limits if that matters.

## How Customers Use Coupons at Checkout

The order summary has a **Discount code** field. Customers type their code, which isn't case-sensitive, and click **Apply**.

When the coupon is valid and every condition is met, the discount applies immediately, the total updates, and the code is shown with a remove option. Otherwise an error explains that the coupon is invalid or ineligible. Customers can remove an applied coupon any time before they finish checking out.

If a shopper applies a coupon and then leaves, it stays on the [abandoned checkout](/abandoned-checkouts). From that page you can also apply or remove a coupon yourself — useful when you want to offer a discount in the recovery email. The code is waiting on their cart when they come back. If you applied the coupon, the recovery email automatically mentions the code and savings.
