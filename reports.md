---
title: Reports
description: Use FlexStore's built-in reports to track sales, orders, customers, products, and marketing performance.
---

# Reports

Reports show how your store is performing, grouped into Sales, Orders, Products, Returns & refunds, Customers, and Marketing. Open them from **Reports** in the sidebar.

## Selecting a Date Range

Every report has a date range selector at the top: **Last 7 days**, **Last 30 days** (the default), **Last 90 days**, **Last 12 months**, or **Custom**, where you pick a start and end date that must both be today or earlier. Changing the range refreshes the data straight away.

## How Reports Are Structured

Each report combines three things: a row of **summary statistics** at the top, a **chart**, and a **data table** with the detailed breakdown. Longer tables are paginated.

## Sales Reports

### Sales over time

Revenue, order counts, and net sales plotted day by day, or month by month over longer periods.

**Stats**: net sales, orders, average order value, discounts applied, refunds issued.
**Table**: date, orders, gross sales, discounts, tax, shipping, refunds, net sales.

Use it to spot busy periods, seasonal patterns, and the effect of promotions. Net sales is gross sales minus discounts and refunds, so it's the truest measure of what your store earned.

### Sales by product

Which products generated the most revenue in the period.

**Stats**: total revenue, items sold, products with at least one sale.
**Chart**: revenue for the top 10 products.
**Table**: product, units sold, orders, revenue. Sorted by revenue, 50 products per page.

Products with high unit counts but low revenue often signal a pricing opportunity.

### Sales by category

Revenue broken down by product category.

**Stats**: total revenue, items sold, categories with sales.
**Chart**: revenue across categories.
**Table**: category, items sold, orders, revenue, share of total revenue.

If a category consistently underperforms, review its product selection, pricing, or storefront visibility.

### Sales by region

Revenue by the shipping region of each order.

**Stats**: total revenue, orders, regions with sales.
**Chart**: revenue for the top 10 regions.
**Table**: region, orders, revenue, share of total revenue.

Useful for deciding on shipping options, regional campaigns, or expansion.

### Profit & margin

Gross profit and margin per product after subtracting the cost of goods. Profit is revenue minus what the items cost you; margin is that profit as a percentage of revenue.

**Stats**: net revenue, cost of goods, gross profit, overall margin. These totals only count products with a recorded cost, so they reflect real profit rather than an inflated estimate.
**Chart**: gross profit for the top 10 products.
**Table**: product, units sold, net revenue, cost, gross profit, margin. Sorted by gross profit, with costless products last, 50 per page.

This is the report that tells you which products actually make money. A product can top Sales by product on revenue and still sit near the bottom here.

The numbers come from the **Cost per item** you set on each product or variant (see [Products](/products#pricing)). Cost is recorded on the order at the time of sale, so changing it later doesn't rewrite past orders. Products sold without a recorded cost still appear with their units and revenue, but their cost, profit, and margin show a dash and they're excluded from the summary totals. Fill in the missing costs to bring them in.

Refunds reduce net revenue by the refunded amount, while cost of goods only drops for units that actually come back. A goodwill refund with no return therefore lowers revenue but leaves cost unchanged.

### Tax collected

Total tax collected in the period, broken down by each configured tax rate.

**Stats**: total tax collected, orders including tax, distinct rates applied.
**Chart**: tax collected over time.
**Table**: tax name, rate percentage, orders, taxable amount, tax collected.

Each row is one tax rule, so you can see exactly what was collected under each rate at reporting time.

## Order Reports

### Orders over time

Order volume per day or month, paid and unpaid, plus what customers spend per order.

**Stats**: total orders, paid orders, fulfilled orders, average order value, smallest and largest order value.
**Chart**: order volume over time.
**Table**: date, orders, revenue, average order value.

Compare paid orders against total orders to see what share of placements convert to payment. A falling average order value is a cue for bundles, free-shipping thresholds, or upsells; the smallest and largest values show how wide the spread behind the average is.

### Orders by payment method

How revenue and volume split across your payment methods.

**Stats**: total revenue, orders, distinct methods used.
**Chart**: revenue by payment method.
**Table**: payment method, orders, revenue, share of total revenue.

Low adoption of a method may mean it needs to be more prominent at checkout, or that its configuration needs a look.

### Orders by shipping method

How orders split across your shipping rates.

**Stats**: shipping revenue collected, orders, distinct methods used.
**Chart**: order counts by shipping method.
**Table**: shipping method, orders, shipping revenue, order revenue, share of total orders.

Very low usage suggests an option isn't meeting customer needs; a popular one may be worth promoting.

## Product Reports

### Product conversion

How well product pages turn visitors into buyers, comparing views against purchases.

**Stats**: total product page views, conversion rate, units sold, revenue from viewed products.
**Chart**: conversion rate for the top 10 most-viewed products.
**Table**: product, views, orders, units sold, conversion rate, revenue. Sorted by views.

Lots of views with a low conversion rate means the page attracts interest but doesn't close the sale, usually a description, imagery, or pricing problem. A high-converting product deserves more prominent placement.

### Top searches

What customers search for on your storefront and how often.

**Stats**: total searches, unique queries, queries that returned nothing.
**Chart**: the 10 most-searched queries by volume.
**Table**: query, searches, results returned by the most recent search, date and time of that search. Sorted by volume.

Frequent searches with zero results are the most actionable signal here: products customers want but can't find, or category and product names that don't match their vocabulary. Renaming a product, adding the words customers actually use to its title and description, or creating a [search synonym](/search-synonyms) makes it findable. High-volume queries with plenty of results point to products worth featuring.

## Returns & Refunds Reports

These cover two related things. The **returns** reports track the [Returns](/returns) workflow, meaning merchandise physically coming back, and exclude canceled and declined requests. The **refunds** reports track money going back to customers, which can happen with or without a return.

### Return reasons

Why customers send items back, broken down by reason such as Defective, Wrong item, or Too small.

**Stats**: items returned, returns, share attributed to the single most common reason, average items per return.
**Chart**: items returned per reason.
**Table**: reason, returns, items returned, share of total returned items. Sorted by items returned.

This is the most actionable returns report. A lot of "Defective" or "Arrived damaged" points at quality or packaging; "Too small" and "Too large" mean your sizing guidance needs work; "Not as described" usually means the photos or copy set the wrong expectation.

### Returns over time

Return requests per day or month, alongside the overall return rate.

**Stats**: total returns, return rate (returns as a percentage of paid orders in the period), items returned, paid orders.
**Chart**: return volume over time.
**Table**: date, returns.

Returns usually happen well after the order, so this rate compares returns and orders within the same window. Read it as a broad activity trend and spike detector rather than a precise per-order rate. For a rate tied to when products actually sold, use Product return rate.

### Product return rate

Which products come back most often, as units returned over units sold. Unlike [Product refund rate](#product-refund-rate), this counts actual merchandise.

**Stats**: overall return rate, units returned, value of returned merchandise, products with at least one return.
**Chart**: the top 10 products by units returned.
**Table**: product, units sold, units returned, return value, return rate. Only products with a return appear, 50 per page.

A high rate on one product is a strong quality signal: inconsistent quality, misleading descriptions, or sizing that runs off. Returns are tied back to the orders placed in the period, so recent periods understate the true rate until your return window closes. Pair it with Return reasons to learn why.

### Refunds

The volume and value of refunds issued in the period.

**Stats**: total refunded, orders with a refund, refund rate, total orders.
**Chart**: refund amounts over time.
**Table**: date, refunded orders, refund amount.

A sudden spike on one date often traces back to a bad product batch, a confusing description, or a fulfillment problem.

### Product refund rate

Which products have the highest refund rate, as units refunded over units sold. This is the financial view, counting money returned with or without the item coming back. For physical returns, see [Product return rate](#product-return-rate).

**Stats**: overall refund rate, units refunded, total refund amount, products with at least one refund.
**Chart**: the top 10 products by units refunded.
**Table**: product, units sold, units refunded, refund amount, refund rate. Only products with a completed refund appear.

Use it to prioritize product improvements or to revisit your refund policy for problem items.

## Customer Reports

### Customers over time

How your customer base grows, split between new customers placing their first-ever order and returning ones.

**Stats**: unique customers, new customers, returning customers.
**Chart**: new and returning customers side by side per period.
**Table**: date, new customers, returning customers.

Low returning numbers point at post-purchase engagement: email follow-ups, loyalty incentives, personalized recommendations.

### Top customers

Your highest spenders in the period.

**Stats**: unique customers who ordered, total spend, average spend per customer.
**Chart**: total spend for the top 10 customers.
**Table**: customer name and email, orders, total spent, average order value.

Customers who place many small orders behave differently from those placing a few large ones, which is worth knowing when you tailor retention.

### Repeat purchase rate

The share of customers who placed more than one order in the period.

**Stats**: repeat purchase rate, repeat customers, one-time customers, average orders per customer.
**Chart**: average orders per customer over time.
**Table**: date, active customers, orders, orders per customer.

A rate above 20 to 30% generally indicates strong loyalty. Below that, loyalty programs, post-purchase emails, or subscriptions are the usual levers.

### Customer lifetime value

Total revenue per customer in the period, plus how customers are spread across spending tiers.

**Stats**: average lifetime value, median lifetime value, customers, total revenue from them.
**Chart**: how many customers fall into each spending bracket ($0 to $50, $50 to $100, and so on), with brackets calculated from your data.
**Table**: customer name and email, orders, lifetime value, average order value.

The distribution chart shows whether revenue comes from a handful of high spenders or a broad base. If it's the former, consider what happens if they stop buying.

## Marketing Reports

### Blog post views

How often each post was read, and how reading trends over time.

**Stats**: total views, unique readers, posts viewed at least once.
**Chart**: view volume over time, by day for shorter periods and by month for longer ones.
**Table**: post title, total views, signed-in readers.

The signed-in readers column shows how much traffic comes from logged-in customers rather than anonymous visitors. Pair a strong post with the Blog Posts homepage section to send more shoppers to it.

A view counts once per visitor session per post, so refreshing doesn't inflate the numbers.

### Coupon usage

How often each code was used, how much discount you gave away, and the revenue from coupon orders.

**Stats**: redemptions, total discount given, revenue from coupon orders, distinct codes used.
**Chart**: usage count and discount amount for the top 10 codes.
**Table**: coupon code, times used, discount given, revenue from those orders.

Compare the revenue and discount columns to judge net impact. Heavy usage paired with deep discounts can quietly eat your margin.

### Flash sale performance

Revenue and unit sales per flash sale.

**Stats**: flash sale revenue, units sold, orders containing a flash sale item, distinct sales with activity.
**Chart**: revenue and units sold across the top 10 flash sales.
**Table**: flash sale name, orders, units sold, revenue.

Use it to plan future promotions, whether that means repeating a winner or changing the timing and depth of discount on the rest.

### Abandoned checkouts

How many customers started checkout without finishing, and the revenue that cost you.

**Stats**: two rows. The abandonment row covers abandoned checkouts, abandonment rate, checkout-to-order conversion rate, and estimated lost revenue. The recovery row covers recovery emails sent, recovery rate (how many ended in a completed order), and recovered revenue.
**Chart**: abandoned checkouts over time.
**Table**: date, checkouts initiated, completed, abandoned, and abandonment rate.

High abandonment usually traces to unexpected shipping costs, a complicated checkout, or a missing payment option. The recovery rate tells you how well your follow-up emails work. See [Abandoned Checkouts](/abandoned-checkouts) for the per-customer view and email controls.
