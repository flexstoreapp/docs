---
title: Payment Settings
description: Connect and configure payment gateways.
---

# Payment Settings

Set up the payment methods customers see at checkout, under **Settings > Payment**.

Each gateway is a card. Click one to open its configuration dialog, where you enter credentials, set conditions, and apply restrictions. Click **Test connection** before saving: it calls the provider with the keys you entered and reports back. A failure usually means a mistyped key or the wrong set entirely (live versus test). Cash on Delivery has no credentials, so no test button.

Every gateway offers a **Checkout mode**, which is the same choice everywhere: **Embedded checkout** keeps the payment form on your checkout page, and **Hosted checkout** redirects the customer to the provider's own page.

## Available Payment Gateways

### Stripe

Cards, debit, and many local payment methods, used worldwide.

- **Publishable key**: from your Stripe dashboard under API keys, starting with `pk_live_` or `pk_test_`.
- **Secret key**: same place, starting with `sk_live_` or `sk_test_`. Keep it confidential.

### PayPal

Payment by PayPal account, or by card through PayPal's interface.

- **Client ID** and **Client secret**: both from your PayPal developer dashboard.
- **Sandbox mode**: turn it on to test without real money, and off when you go live.

### Razorpay

Popular in India, covering cards, UPI, net banking, and wallets.

- **Key ID**: from your dashboard under API Keys, starting with `rzp_live_` or `rzp_test_`.
- **Key Secret**: same place.

### Mollie

A European provider covering cards, iDEAL, SEPA, Klarna, and other local methods.

- **API key**: from your Mollie dashboard, starting with `live_` or `test_`.
- **Profile ID**: your website profile ID, starting with `pfl_`.

### Tap

Widely used across the Middle East and North Africa, supporting cards (mada, Visa, Mastercard, Amex), KNET, Benefit, and other local methods, in currencies including AED, SAR, KWD, BHD, OMR, QAR, EGP, JOD, and USD.

- **Public key** and **Secret key**: from your Tap dashboard under Developers, starting with `pk_` and `sk_` respectively.

Note that even embedded Tap payments may briefly send the customer to their bank for 3-D Secure confirmation.

### Paystack

Popular across Africa, covering cards, bank transfers, mobile money, and USSD, in NGN, GHS, ZAR, KES, USD, and XOF.

- **Public key** and **Secret key**: from your dashboard under Settings > API Keys & Webhooks.

### Mercado Pago

The leading gateway in Latin America, covering cards, bank transfers, cash payments, and its own wallet, in ARS, BRL, CLP, COP, MXN, PEN, UYU, and more.

- **Public key** and **Access token**: both from Your integrations > Credentials, starting with `APP_USR-` or `TEST-`.

### Cash on Delivery

Customers pay when the order arrives. No credentials needed, though the Conditions and Restrictions tabs still apply.

## Conditions and Restrictions

Every gateway, Cash on Delivery included, has these two tabs controlling when it's available.

**Conditions**

- **Min order value** and **Max order value**: the cart total range. Blank max means no upper limit.
- **Min weight** and **Max weight**: the cart weight range, with a unit of kg, g, lb, or oz. Blank means no limit.

**Restrictions**

- **Excluded products**: a cart containing any of these doesn't get the gateway.
- **Excluded categories**: same, for whole categories.
- **Excluded brands**: same, for whole brands.
- **Allowed regions**: limit the gateway to specific regions, matched against the customer's shipping address. Empty means everywhere.
- **Supported currencies**: only gateways supporting the customer's active currency appear at checkout. New gateways come with their provider's usual currencies pre-selected. Empty means all currencies.

## Webhooks

Webhooks let gateways tell your store when a payment completes, fails, or is refunded. Configure the URL in each provider's dashboard.

The pattern is `https://yourdomain.com/webhooks/payment/{gateway}`, and you can copy the exact URL from the **Webhook** tab when configuring a gateway.

Some gateways need an extra credential for verification:

- **Stripe**: your **Signing secret**, starting with `whsec_`, from the Webhooks section of your dashboard.
- **PayPal**: your **Webhook ID**, shown after you create the webhook.
- **Razorpay**: the **Webhook secret** you set when creating the webhook.
- **Mercado Pago**: the **Secret** signature shown when configuring the webhook. Add the URL under Your integrations > Webhooks and subscribe it to Payments events.
- **Mollie**: nothing extra. Mollie sets the URL up itself.
- **Tap** and **Paystack**: nothing extra, since signatures are verified with your secret key. Add the URL under Developers > Webhooks (Tap) or Settings > API Keys & Webhooks (Paystack).

::: warning
Without webhooks, your store may never receive payment confirmations or refund notifications. Set them up for every active gateway.
:::

### Syncing External Refunds

The **Webhook** tab has a **Sync external refunds** option. With it on, a refund you issue in the provider's own dashboard is reflected back on the matching order automatically, updating the refunded total and payment status.

Turn it off to ignore refunds made outside your store. Either way, refunds issued from your admin panel are always recorded.

## Enabling and Disabling Gateways

Each card has an active toggle, and disabling a gateway keeps its configuration intact. Only fully configured, enabled gateways appear at checkout.
