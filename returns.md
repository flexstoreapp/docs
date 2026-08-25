---
title: Returns
description: Let customers request returns for delivered items, review and approve requests, generate prepaid return labels, receive and restock items, and refund the customer.
---

# Returns

Returns add a full return merchandise authorization (RMA) workflow on top of refunds. A customer requests to send items back from their account, your staff review and approve, an optional prepaid label is generated, the items come back and get restocked, and the customer is refunded. Every step lands on the order timeline.

Only physical items that have already shipped can be returned. Digital products and unshipped items cannot.

The order also needs to have collected at least part of its payment, since a return ends in a refund. On an order where nothing has been paid, such as a Cash on Delivery order that was never collected, neither the customer nor your staff can start a return. Cancel the order instead.

## Turning Returns On

Self-service returns are configured in **Settings > Policy**:

- **Customer returns**: turn self-service on or off. With it off, customers see no return option and requests are rejected, though your staff can still create returns manually from an order.
- **Return window**: how many days after delivery a customer may request a return, measured from the delivery date or the ship date when delivery isn't tracked. Set `0` to allow returns at any time.
- **Restocking fee**: a default percentage deducted from the refund. Set `0` for none. You can override it per return and again on the refund screen.

## The Return Lifecycle

- **Requested**: submitted by the customer, waiting for your review. Staff-created returns skip straight to Approved.
- **Approved**: accepted, waiting for the items. A return label can be generated here.
- **Declined**: not accepted. The customer is emailed the reason you give.
- **Received**: the items have arrived and been checked in. Good units can be restocked at this point.
- **Completed**: the customer has been refunded and the return is closed.
- **Canceled**: withdrawn before the items were checked in. Both the customer and your staff can cancel a return while it is Requested or Approved.

## How a Customer Requests a Return

From **My Account > Orders**, the customer opens a delivered order and clicks **Request a return**, which only shows while the order is inside the return window, payment has been collected, and returns are enabled. They pick the items and quantities, give a reason for each one (Defective, Arrived damaged, Wrong item, No longer wanted, and so on), and can add a note.

As they choose, an **estimated refund** including taxes and the restocking fee updates so they know roughly what to expect. You confirm the final amount when you review the return.

After submitting, the customer lands back on the order page, where a **Return** card now sits under the order items, and they get a confirmation email while your store gets a notification.

The card shows the current status, the items and quantities being returned with the reason given for each, and the note they left. As you work through the return it also shows your decline reason if you turned it down, the return tracking number and its latest carrier update, and a **Download return label** link once a prepaid label exists. A **Cancel return request** button lets the customer withdraw the return themselves while it is still Requested or Approved. Once you mark it as received, the button disappears and the return has to be seen through.

## Reviewing a Return

Open the order and find the **Returns** card, or go to **Returns** in the admin panel for every return across all orders. The admin list filters by status and searches by order number or customer email, which makes triage quick.

- **Approve** accepts the request and emails the customer. You can attach an internal note.
- **Decline** rejects it with a reason, which is emailed to the customer.
- **Create return** starts one yourself for any returnable items on a paid order. Staff-created returns are approved automatically, and the create screen also lets you set a restocking fee, choose whether to notify the customer, and attach return shipping right away, either by pasting a label link and tracking number you already have or by buying a prepaid label from the carrier.

## Return Shipping Labels

Once a return is approved and the order's carrier supports it, click **Generate a return label**, pick the package details and shipping service, and a prepaid label is purchased. The label and tracking number attach to the return and reach the customer, who can download the label from their account or their notification email.

You can attach a label to an existing approved return from the **Returns** card, or attach one while adding a return yourself. Already have a label from another service? Add its link and tracking number by hand instead of buying through the carrier.

Use **Sync tracking** to pull the latest delivery status as the package travels back. Carriers set to manual can't produce automatic labels, though the customer can still ship items back on their own.

## Receiving and Restocking

When the items arrive, click **Mark received** and confirm how many units of each actually came back and whether they go back into inventory. Restocking here creates a stock movement logged as a *Return*, so your counts stay accurate. Damaged units can be received without restocking.

## Refunding and Closing

Click **Refund and close** on a received return. The usual refund screen opens pre-filled with the returned items, where you confirm the amount and the refund method (through the gateway or recorded manually). Since the items were already restocked at the receiving step, the refund doesn't restock them twice.

Completing the refund closes the return, links it to the refund for your records, and emails the customer. The whole sequence from requested to completed is captured on the order's activity timeline.
