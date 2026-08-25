---
title: Flash Sales
description: Create and manage time-limited flash sale promotions in your FlexStore admin panel.
---

# Flash Sales

Flash sales discount selected products for a set period. A live countdown creates urgency, which makes them useful for boosting sales, clearing stock, or rewarding shoppers with a short-lived deal.

Open **Flash sales** from the sidebar.

## The Flash Sale List

Each row shows the title, the discount applied, how many products and categories are included, the schedule, and the status.

Search by name, filter by status, and sort by clicking the Title, Discount, or Schedule headers.

| Status | Meaning |
|--------|---------|
| Active | Enabled and running within its dates. |
| Upcoming | Enabled, but the start date hasn't arrived. |
| Ended | The end date has passed. |
| Inactive | Manually disabled, whatever the schedule says. |

## Adding a Flash Sale

Click **Add flash sale** in the top-right corner, fill in the sections below, and click **Add flash sale**.

### Basic Information

- **Title**: the name customers see on the storefront.
- **URL handle**: the sale's address, such as `summer-flash-sale`. Generated from the title and editable. Use lowercase letters and numbers only, with single hyphens between words: no spaces, capitals, punctuation, or a hyphen at the start or end.
- **Description**: an optional line under the title, good for a call to action.
- **Discount value**: applied to every product in the sale. Use the dropdown to pick a **Flat amount** off the price or a **Percentage**.

### Products

Adding individual products is optional, since you can use categories instead or combine both.

Click **Add products**, search for and select what you want, and confirm. Each product in the list takes two optional settings:

- **Discount override**: replaces the sale's discount for that product. Blank uses the sale default.
- **Quantity limit**: how many units can sell at the sale price before the product goes back to full price. Blank means no limit.

Hover a row and click the trash icon to remove a product.

### Categories

Click **Add categories** and select the ones you want. Every active product in them joins the sale automatically. Check **Include subcategories** on a category to pull in everything nested beneath it. Hover a row and click the trash icon to remove one.

> Products and categories mix freely in one sale. A product included both directly and through a category still appears only once.

### Schedule

- **Start date & time**: before this the sale shows as Upcoming.
- **End date & time**: must be after the start. After it passes, the sale shows as Ended and leaves the storefront.

### Settings

- **Max quantity per customer**: how many sale-priced items one customer can buy across the whole sale. Enter `2` and each customer gets at most two discounted items. Blank means no limit.
- **Active**: uncheck and the sale stays off the storefront even inside its scheduled dates.

## Editing a Flash Sale

Click a flash sale's title to open it, change whatever you need, and click **Update flash sale**. The page shows when it was last updated.

## Deleting Flash Sales

Check the sales you want gone, click **Delete** in the action bar, and confirm.

> Deleting a flash sale is permanent.

## How Flash Sales Appear to Customers

An active sale inside its dates shows up in two places.

The **Flash Sales page** lists every active sale with its title, description, a live countdown, and a grid of included products.

Each sale also has its **own page**, reached by clicking its title, listing every product at its discounted price with the countdown in the header. Sales with many products are paginated.

The countdown ticks in real time, showing days, hours, minutes, and seconds, and disappears once the sale ends.
