---
title: Orders
description: View, manage, and fulfill customer orders, process refunds, and track every activity on an order from a single page.
---

# Orders

Orders is where you browse purchases, check payment and fulfillment status, fulfill items, issue refunds, cancel orders, download invoices, and leave internal notes.

## Order List

Each row shows the order number, date, customer name, total, item count, payment status, and fulfillment status. Click a row to open the order.

### Searching and Filtering

The filter bar narrows the list by:

- **Search**: part of an order number, customer name, or email address.
- **Payment status**: Unpaid, Partially Paid, Paid, Refunded, Partially Refunded, Failed, or Canceled.
- **Fulfillment status**: Unfulfilled, In Progress, Fulfilled, or On Hold.
- **Cancellation status**: Active or Canceled.

Filters combine. Click a column header to sort by it, and click again to reverse.

### Exporting Orders

Click **Export** and pick a scope: **All orders**, **Current page**, **Selected orders** (when at least one is checked), or **Filtered orders** (matching your active search and filters).

## Order Detail

The detail page groups everything about one order into fulfillment cards, a payment card, and a timeline. The buttons at the top are:

- **Invoice**: opens the invoice PDF in a new tab.
- **Refund**: opens the refund page. Only shown once the order has been paid.
- **Return**: opens the return page, where you create a return on the customer's behalf. Only shown while the order still has items that can be returned (see [Returns](/returns)).
- **More actions**: contains **Duplicate** (see [Duplicating an Order](#duplicating-an-order)) and **Cancel order** when cancellation is possible.
- **Edit order**: opens the edit page.

### Order Items

Items are grouped by state.

The **Unfulfilled card** appears while items remain to be shipped. Its header shows the current status (Unfulfilled, In Progress, or On Hold), and each item lists its product title, variant, remaining quantity, unit price, and line total. The header dropdown offers **Mark as fulfilled**, **Mark as in progress**, **Mark as on hold**, and **Release hold**, depending on where the order stands.

**Fulfilled cards** appear one per fulfillment, each with a "Fulfilled" badge and the items and quantities it covers. An item refunded after shipping gets a refund badge. Tracking information appears at the bottom, linked when a tracking URL exists. For shipments created through a connected carrier you also get **Download label** for printing the carrier's label and **Sync delivery status** to pull the latest tracking status on demand, which is handy when carrier webhooks aren't set up. Each card's dropdown offers **Edit tracking** and **Cancel fulfillment**.

The **Refunded card** appears once items have been refunded and lists each one with its quantity, unit price, and line total.

### Payment Card

Shows the payment status and a financial breakdown. Lines only appear when they apply:

- **Subtotal**, with the item count, marked "(incl. tax)" if prices include tax.
- **Discount**, with the coupon code if one was used.
- **Shipping**, with the shipping method name.
- **Tax**, shown as one total or itemized by rate depending on your tax display setting.
- **Total**, plus an approximate conversion to your base currency if the order used a different one.
- **Paid**: the total collected through payment transactions.
- **Refunded**: the total refunded.
- **Net payment**: collected minus refunds.
- **Balance due**: what the customer still owes, highlighted in amber.
- **Credit owed**: what you owe the customer back, highlighted in red.

**Balance due** shows when the order total is higher than what has been collected so far. That happens on an order that has not been paid yet, such as a Cash on Delivery order before you record the payment, and on an already paid order after you edit it in a way that increases the total, such as adding items, increasing a quantity, switching to a more expensive shipping method, or removing the coupon. To collect it, use **Record payment** when the customer pays you directly, or **Request payment** to email them a link to pay the rest online. Payments always cover the whole outstanding amount, so the line goes away as soon as one is collected.

**Credit owed** shows when what has been collected is more than the order total, which happens after you edit a paid order in a way that lowers the total, such as removing items, reducing a quantity, choosing a cheaper shipping method, or applying a coupon. Use **Refund credit** to give the difference back, and the line goes away.

The card's dropdown offers payment actions depending on the order state:

- **Record payment**: records a manual payment for the outstanding balance. Available for every payment method.
- **Void payment**: reverses all recorded payments. Shown for manual methods such as Cash on Delivery.
- **Request payment**: emails the customer a link to pay the remaining balance through the original gateway. Needs an online gateway and a customer email on file.
- **Refund credit**: refunds credit the store owes the customer.

### Customer

The customer's name and email. Registered customers link through to their profile and show total orders, lifetime value, and registration date.

### Addresses

Shipping Address holds the delivery address and Billing Address the one tied to the payment method. Orders containing only digital items have no shipping address, so that card is hidden.

### Order Notes

Any special instructions the customer left at checkout.

### Timeline

Every event on the order in reverse chronological order. Only admins see the timeline.

Entries cover:

- **Order placed** and **Order canceled** (with reason and optional note)
- **Order edited**, expanding to list what changed: items added or removed, quantities changed, and changes to the shipping method, payment method, coupon, contact email, or customer
- **Fulfillment status changes** such as put on hold, hold released, or in progress
- **Items fulfilled**, referencing the fulfillment, and **Fulfillment canceled**
- **Tracking updated** when an admin adds or edits a tracking number or link
- **Delivery updates** reported by a connected carrier (Shipment pending, Picked up by carrier, In transit, Out for delivery, Delivered, Delivery failed, Returned to sender), with the location and time
- **Shipping label could not be voided**, recorded when a carrier fulfillment is cancelled but its label was already scanned
- **Payment received** (amount, method, gateway reference), **Payment voided**, **Payment status changes**, and **Payment request sent**
- **Refund pending**, **Refund completed** (amount, status, reason, item breakdown), and **Refund failed**
- **Return entries** covering the whole return flow: requested, approved, declined (with the reason you gave), label created, received, completed, and canceled. Each one expands to show the returned items, their quantities, and the reason the customer picked. Carrier updates on the return shipment appear here too, such as Return in transit and Return delivered. See [Returns](/returns)
- **Email resent**, noting which email went out
- **Internal notes** added by staff

Add a note by typing in the box at the top of the timeline and clicking **Add note**, or pressing Cmd+Enter. Hover a note to edit or delete it. Customers never see them.

Events that sent a customer email expand to reveal a **Resend email** button. See [Resending Customer Emails](#resending-customer-emails).

## Payment Status

| Status | Meaning |
|---|---|
| **Unpaid** | No payment has been collected. |
| **Partially Paid** | Some payment collected, the rest still outstanding. |
| **Paid** | The full order amount has been collected. |
| **Partially Refunded** | Some of the collected amount has been refunded. |
| **Refunded** | The entire collected amount has been refunded. |
| **Failed** | The payment attempt failed. |
| **Canceled** | The payment was canceled. |

Payment status is derived from the order's transaction history. Recording a payment, issuing a refund, or receiving a webhook recalculates the totals and updates the status.

## Fulfillment

A fulfillment is a group of items sent to the customer, optionally with tracking.

### Fulfillment Status

- **Unfulfilled**: nothing has been fulfilled yet.
- **In Progress**: some items are fulfilled, others remain.
- **Fulfilled**: every shippable item is fulfilled. This also covers the case where the remaining items were refunded instead.
- **On Hold**: fulfillment is paused and items can't be fulfilled until the hold is removed. If the remaining items get refunded during a hold, release it and set the status manually.

The status moves on its own as you fulfill items, cancel fulfillments, and refund items. The unfulfilled card's dropdown also lets you set it by hand with **Mark as in progress** (from Unfulfilled), **Mark as on hold** (from Unfulfilled or In Progress), and **Release hold** (returns to the previous status).

### Fulfilling Items

1. Open the unfulfilled card's dropdown and click **Mark as fulfilled**.
2. Set the quantity for each item. Everything fulfillable starts selected at its maximum.
3. Optionally enter a **Tracking number** and **Tracking URL**.
4. Optionally check **Notify customer** to send a fulfillment confirmation email.
5. Click **Mark as fulfilled**.

The status updates to In Progress or Fulfilled. You don't have to fulfill everything at once, so create as many fulfillments as you need.

Orders placed with a connected shipping carrier show a **Buy a shipping label with [carrier]** option instead, checked by default. The carrier then generates the shipment and fills in the tracking number and label for you, the manual tracking fields disappear, and the confirm button reads **Buy label & fulfill**.

The dialog also pre-fills packages: your items are packed into the best-fitting saved [packages](/settings-shipping#packages), one parcel per box, each with its dimensions and weight already filled in. Review them, switch a parcel with the **Package** dropdown, edit any value by hand, or click **Add package** if the order ships in more boxes. Products without dimensions, or items no saved package can hold, fall back to a single default-package parcel.

Under **Shipping service**, click **Get rates** to fetch live prices for the packages you've set. Each option shows its price and delivery estimate, and the service the customer chose at checkout is marked **Customer's choice** and pre-selected. Pick a different one to ship faster or cheaper, keeping in mind that your store covers the difference. Skip the rate fetch and the label is bought with the customer's original service.

The store never picks a service for you. If the customer's service is no longer available for the packages you've set, or no service was chosen at checkout at all (a flat-rate option that uses a connected carrier, say), fulfillment is blocked until you fetch rates and choose one. International labels include a customs declaration generated from the order; set a store-wide fallback under [Shipping settings](/settings-shipping#default-country-of-origin).

### Editing Tracking

On a fulfilled card, open the dropdown and choose **Edit tracking** to change the tracking number or URL. Check **Notify customer** to send a tracking update email, then click **Save**.

### Cancelling a Fulfillment

Choose **Cancel fulfillment** from a fulfilled card's dropdown. Its items return to the unfulfilled group and the status recalculates, so a Fulfilled order may drop back to In Progress or Unfulfilled.

For carrier fulfillments, the store first asks the carrier to void the shipping label so you aren't charged for it. If the label can no longer be voided, the fulfillment is still cancelled and a timeline note tells you to void it manually in the carrier's dashboard.

### Digital Items

Digital products need no shipping or tracking. As soon as the order is paid, the files are granted to the customer and appear on the order in a **Fulfilled** card labelled **Digital download**, listing each file with its download count, limit, expiry, and last download time.

An order with only digital items is marked **Fulfilled** the moment payment arrives. In a mixed order the physical items still go through the usual fulfillment steps while the digital ones are delivered on their own.

## Refunds

Refunds are available for orders that are **Paid**, **Partially Paid**, or **Partially Refunded**. Click **Refund** at the top of the order.

### Choosing What to Refund

Each item shows its maximum refundable quantity; use the plus and minus buttons to set amounts. The shipping refund field covers part or all of the shipping cost.

You can also deduct a **restocking fee**. It's pre-filled from your store default in [Settings → Policy](/settings-policy), or from the return when you're refunding one, and you can edit or clear it per refund.

**Restock items** is on by default and returns the refunded quantities to inventory. Uncheck it for unsellable goods. Anything you type in **Reason** shows up in the timeline.

### Overriding the Refund Total

The total comes from the selected items, shipping, and tax, minus any discount and restocking fee. Type straight into the **Total refund** box to set a custom amount, up to the maximum refundable shown as **Max** beside it. Click **Max** to fill in that maximum. Once you have entered your own figure, a **Reset** link appears next to it that puts the calculated total back.

### Refund Method

- **Process through gateway** sends the refund to the original provider (Stripe, PayPal, and so on) and is the default for online payments. Orders paid across several transactions have the refund split across them automatically.
- **Record only** creates a refund record without contacting the gateway. Use it when the refund already happened elsewhere, such as in the gateway's own dashboard, or for cash refunds. It's the only option for manual methods like Cash on Delivery.

A failed gateway refund (because the charge was already refunded on the gateway, for example) shows the error and creates no record. Switch to **Record only** and resubmit to bring your store's records up to date.

### Submitting the Refund

Check **Notify customer** to send a refund confirmation email, then click **Refund**. A confirmation dialog shows the amount before processing, and the payment status updates afterwards.

### Refunds from the Payment Gateway

With [webhooks configured](/settings-payments#webhooks), refunds issued from the gateway's own dashboard sync back to your store automatically, creating a refund record, transaction entry, and timeline activity, and updating the payment status.

They differ from admin panel refunds in three ways:

- Only the total amount is recorded, with no item-level detail.
- Inventory is not restocked, so adjust stock yourself from [Inventory](/inventory) if needed.
- Fulfillment status is not updated, so set it manually if the refund covers unfulfilled items.

If the same refund gets recorded from both the admin panel and the gateway, the webhook is ignored.

## Cancelling an Order

Any order that isn't already fulfilled or canceled can be canceled.

1. Click **More actions > Cancel order**.
2. Pick a **reason**: Customer request, Fraudulent order, Inventory issue, or Other, plus an optional note.
3. Choose the options you want: **Refund payment** (a full refund, disabled on unpaid orders), **Restock items** (on by default), and **Notify customer** (on by default).
4. Click **Cancel order**.

Cancellation is tracked separately from fulfillment. The order keeps the fulfillment status it had, so already-shipped items stay shipped, and a **Canceled** badge is added to the header. A requested refund goes through the original gateway; an unpaid order moves to a **Canceled** payment status. Restocked quantities return to inventory, any coupon usage count is decremented, and the reason and note land in the timeline.

Cancellation is permanent.

## Invoices

Click **Invoice** to open the invoice PDF in a new tab. It includes the order number, date, items with prices, addresses, and your store's contact details.

## Resending Customer Emails

Your store emails customers as their order progresses: a confirmation when it's placed, a shipping notice when items are fulfilled, a tracking update, a refund notice, and so on. When one of those never arrives (spam folder, deleted, or a corrected email address), you can send it again from the [timeline](#timeline).

Click the event that triggered the email to expand it, then click **Resend email**. A short dialog confirms the address before sending a fresh copy.

| Timeline event | Email resent |
|---|---|
| Order placed | Order confirmation |
| Items fulfilled | Shipping confirmation |
| Tracking updated | Tracking update |
| Refund completed | Refund notification |
| Order canceled | Cancellation |
| Order edited | Order update |

Resends go out even when the matching automatic notification is turned off in [Notification settings](/settings-notification). Each one is recorded in the timeline, and since the email goes to the address on the order, guest checkouts can be resent too.

## Editing an Order

Click **Edit order** to change items, quantities, customer details, addresses, shipping method, payment method, or coupon. Check **Notify customer** to email the customer about the change, then click **Update order**.

Orders placed with a connected carrier show the carrier rate set at checkout, locked while you edit so the price the customer paid is preserved even as items change. Use **Change shipping method** to swap it for one of your own rates; otherwise leave it alone and the carrier rate stays untouched.

Shipped items are protected. Any item with shipped units carries a **shipped** badge with the quantity sent, can't be deleted, and can't be lowered below what went out, so you can never edit away something the customer already has. Increasing a shipped item's quantity and editing unshipped items both work normally. Adding items to a fulfilled order moves it back to **In Progress** so the new items can be fulfilled.

## Duplicating an Order

Open an order and click **Duplicate** to get the order form pre-filled with its items, customer, addresses, shipping method, payment method, coupon, and notes. Adjust whatever you need and click **Add order**. The original is untouched, and items whose product has since been deleted are left out.

## Adding an Order Manually

Click **Add order** from the Orders list to record a phone or in-person sale.

1. **Products**: click **Add products** to search and select items, then set quantities in the table.
2. **Customer**: enter their email. Matching accounts are linked automatically.
3. **Shipping address**: enter the delivery address. Shipping methods load once you've set a country.
4. **Billing address**: matches shipping unless you check **Use a different billing address**.
5. **Shipping**: pick a shipping method.
6. **Payment**: pick the gateway. This is for tracking only and doesn't charge the customer.
7. **Coupon**: enter a code and click **Apply**, or **Remove** to clear it.
8. **Order notes**: any special instructions.

The Order Summary updates as you go. Click **Add order** to save.
