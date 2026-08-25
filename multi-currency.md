---
title: Multi-Currency
description: Sell in multiple currencies and understand how currency conversion works in your store.
---

# Multi-Currency

Selling in multiple currencies lets customers browse and pay in something familiar. You enter prices once in your base currency and the store handles the rest.

## How It Works

1. You set every product price, shipping rate, and discount in your **base currency**.
2. You add other currencies with exchange rates in [Settings > Currencies](/settings-currencies).
3. Customers pick their currency from a switcher on your storefront.
4. Product prices, shipping, taxes, and totals convert automatically at the rate you set.
5. Orders are stored in the customer's currency, along with the exchange rate used at the time.

## What Converts

Product prices (including sale and compare-at prices), shipping costs, tax amounts, coupon discounts, and cart and checkout totals.

## What Stays in Your Base Currency

Prices you enter in the admin panel are always in the base currency, and reports normalize every order back to it so revenue reads consistently no matter what customers paid in.

## Setting Up Multi-Currency

1. Go to **Settings > Currencies** and confirm your base currency.
2. Add each currency you want to offer with its exchange rate relative to the base. With USD as your base and EUR at 0.92, a $100 product shows as €92.
3. Set how each currency displays: symbol, symbol position, decimal separator, thousands separator, and decimal places.
4. Check **Active** on the currencies you want available. Active currencies are offered to customers automatically.

## Exchange Rates

Rates are **not updated automatically**, so update them yourself to keep pricing accurate, especially with volatile currencies.

The rate at the moment of purchase is saved with the order, so updating rates later never changes existing orders.

## Currency Switcher

Customers switch currencies from a switcher in your storefront header. It only appears once you have two or more active currencies, and you can enable or disable it in the [Storefront Builder](/storefront) header settings.

## Tips

- Start with the currencies your actual markets use rather than adding everything.
- Check that converted prices look sensible. A $49.99 product at a rate of 0.92 shows as €45.99, which may or may not sit well in that market.
- Tax is computed on the base currency price and then converted, which keeps it accurate in every currency.
