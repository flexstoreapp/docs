---
title: Inventory
description: Manage stock levels, make adjustments, and track every change to your product inventory.
---

# Inventory

Inventory is where you monitor stock across all products and variants, make manual adjustments, and review the history of every change.

## Inventory List

Open **Products > Inventory** from the sidebar to see every product and variant with stock tracking enabled. Each row shows the product title and thumbnail (with a "Low stock" or "Out of stock" badge where relevant), the SKU, and the current quantity on hand. Products with variants list the parent first with each trackable variant indented beneath.

The filter bar narrows the list by search (product title or SKU), stock status (In stock or Out of stock), and **Low stock only**, which shows just the items at or below their low stock threshold. Search combines with either dropdown, and the reset button clears everything.

## Adjusting Stock

Hover a row and click the **Adjust stock** button (the box-with-plus icon) to open the adjustment dialog. It shows the current stock on the left and a live preview of the new figure on the right, updating as you type.

- **Quantity change**: a positive number adds stock (`+50` for an arriving shipment), a negative number removes it (`-3` for damaged goods). Stock can't go below zero.
- **Reason**: why the level changed, from the list below.
- **Notes**: optional free text, such as a supplier reference.

Click **Adjust stock** and the list updates immediately.

### Adjustment Reasons

An accurate reason makes your movement history worth reading later.

| Reason | When to use it |
|---|---|
| **Manual adjustment** | A general correction that fits nothing else. |
| **Received** | Stock from a supplier or purchase order. |
| **Damaged** | Items no longer sellable. |
| **Lost** | Items missing and unaccounted for. |
| **Return** | Stock returned by a customer and put back. |
| **Inventory count** | A correction after a physical count. |
| **Transfer** | Stock moved between locations or warehouses. |
| **Other** | Anything else. |

Three more reasons are recorded automatically and don't appear in the dialog: **Sale** when an order is placed, **Refund** when an order is refunded, and **Cancellation** when an order is canceled.

## Stock Movement History

Click a product or variant row to open its movement history. Rows that have variants aren't clickable themselves, so click the individual variant instead.

Three cards at the top show the SKU, current stock, and whether the item is in or out of stock. Below them, every movement is listed newest first with:

- **Date**: when it was recorded.
- **User**: who made the change, or a dash for automatic changes like sales, refunds, and cancellations.
- **Change**: the quantity added (green) or removed (red).
- **Stock**: the level before the change, crossed out, next to the level after.
- **Reason** and **Notes**: from the adjustment.

Older movements are paginated.
