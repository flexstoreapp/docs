---
title: Money & Currency
description: How FlexStore handles monetary values, decimal precision, and multi-currency conversion.
---

# Money & Currency

## Precision Rules

Monetary values are `DECIMAL(19, 4)` in the database, always 4 decimal places. Never use floats for arithmetic. Use `Brick\Math\BigDecimal` throughout and round only at the end with `RoundingMode::HalfUp`.

```php
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;

$tax = BigDecimal::of($amount)
    ->multipliedBy($rate)
    ->dividedBy(100, 4, RoundingMode::HalfUp);
```

## Utility Classes

`app/Utilities/MoneyFormatter.php` handles display formatting only:

- `format($amount, $currencyCode)` applies the currency's symbol, separators, and decimal places
- `toDecimal($value)` normalizes any value to a 4-decimal string
- `divideToDecimal($dividend, $divisor)` divides safely, returning `'0.0000'` when the divisor is zero

`app/Utilities/CurrencyConverter.php` handles exchange rate math:

- `convert($amount, $exchangeRate, $currencyDecimalPlaces)` multiplies by the rate, rounds to the currency's display precision, then re-scales to 4 decimals for storage
- `convertBack($amount, $exchangeRate, $scale)` divides by the rate to return to base currency
- `round($amount, $decimalPlaces)` rounds to currency precision and back to 4 decimals

## How Multi-Currency Works

**At checkout**, prices and tax are calculated in the base currency, the active currency's rate is read from the `currencies` table, and `CurrencyConverter::convert()` converts the subtotal, shipping, discount, tax, and per-item prices. The converted amounts are stored on the order alongside a snapshot of the `exchange_rate`.

**In reports**, stored amounts are divided by the order's `exchange_rate` in SQL, normalizing everything back to base currency regardless of what the customer paid in.

**On the frontend**, `useFormatMoney` reads the active currency from Inertia shared props and applies the exchange rate client-side, formatting with the currency's configured symbol, position, separators, and decimal places.

```ts
const { formatMoney } = useFormatMoney();
formatMoney(product.price); // Converts and formats to active currency
```

## Tax Calculation Precision

`OrderTaxCalculator` uses BigDecimal at every stage, with no float conversions:

- Tax rates are stored as percentages (`DECIMAL(10, 2)`) and divided by 100 for calculation
- Coupon discounts are distributed proportionally across items before tax
- Compound taxes accumulate, each rate applying on top of previous tax amounts
- Shipping tax is allocated by each item's share of the order value
- Tax is calculated before currency conversion

## Key Rules

- `BigDecimal` for arithmetic, never PHP floats
- `toScale(4, RoundingMode::HalfUp)` before storing
- Currency conversion happens at checkout, not at product creation
- Exchange rates are cached in-process for 1 minute via `Cache::memo()`
- `MoneyFormatter::format()` converts to float internally, which is fine because it's display-only
