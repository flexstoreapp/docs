---
title: Shipping Settings
description: Configure your store's shipping carriers, default country of origin, packages, and shipping rates with conditions and regional restrictions.
---

# Shipping Settings

How orders get delivered, under **Settings > Shipping**. The page runs top to bottom through **Shipping carriers**, your **Default country of origin**, your **Packages**, and your **Shipping rates**.

## Shipping Carriers

Carriers are the delivery services you use, and every shipping rate is linked to one. They're grouped into integrated and manual carriers.

### Integrated Carriers

An integrated carrier connects to a real shipping service, so your store can quote live rates and fulfill orders with real tracking numbers and labels without leaving the admin panel.

Each integration is a card. Open its settings, enter your account credentials, click **Test connection** to confirm they work, save, and flip the switch to turn the carrier on. Details differ per provider, covered below.

**Offering live rates**: create a shipping rate, choose your connected carrier, and set the rate type to **Calculated at checkout**. Customers in that region then see real-time prices based on their address and cart weight. Accuracy depends on your store's origin address, your products' weights and [dimensions](/products#shipping), and your saved packages all being filled in.

**Receiving tracking updates**: connect the carrier's webhook from the card's **Webhook** tab and delivery status flows into your orders on its own, updating the timeline as the parcel moves. You can also pull the latest status manually with the **Sync delivery status** button on any carrier-created fulfillment.

**Fulfilling orders**: buy a label and fulfill straight from the order page, with no trip to the carrier's dashboard. See [Fulfilling Items](/orders#fulfilling-items).

#### Shippo

Shippo is an aggregator covering many carriers (USPS, UPS, FedEx, DHL, and more) through one connection, and works in most countries.

1. Create a Shippo account and copy your API token from **Settings > API** in their dashboard.
2. Click the settings icon on the **Shippo** card and paste the **API token**. While testing, use a Shippo *test* token, which generates sample rates and labels without charging you, then switch to a *live* token when you're ready to ship.
3. Click **Test connection**, save the carrier, and turn it on.

For automatic tracking updates, open the card's **Webhook** tab and copy the **Webhook URL**. In Shippo, go to **Settings > API > Webhooks**, add the URL, and subscribe it to the **Track Updated** event.

#### Shiprocket

Shiprocket is an aggregator for India covering couriers such as Delhivery, Blue Dart, DTDC, and Xpressbees, and it can collect cash on delivery for you.

1. In Shiprocket, create an **API user** under **Settings > API > Configure** and note its email and password. This is a dedicated login, separate from your normal login. Note the nickname of your **pickup location** too.
2. Click the settings icon on the **Shiprocket** card and enter the API user's email and password plus the pickup location nickname exactly as Shiprocket shows it.
3. Click **Test connection**, save the carrier, and turn it on.

For automatic tracking updates, open the card's **Webhook** tab, copy the **Webhook URL**, and set a **Security token** of your choice. In Shiprocket, go to **Settings > API > Webhooks**, add the URL, and paste the same token so updates can be verified.

**Cash on delivery**: when you fulfill a COD order through Shiprocket and buy a label, a **Collect cash on delivery** option appears in the fulfillment dialog. It only shows for cash-on-delivery orders that still have a balance due, never for prepaid ones. Tick it and the courier collects the outstanding balance on delivery.

### Manual Carriers

Manual carriers are services you handle yourself, like "Standard Post" or "Express Courier". They're used for flat and free rates, and you enter tracking numbers by hand when fulfilling.

Click **Add carrier** and give it a **Shipping carrier name**, which is what customers see at checkout, and set whether it's **Active**. Inactive carriers disappear from the shipping rate selector.

Click a card's settings icon to rename a carrier or toggle it with the switch. Disabling doesn't delete the carrier or its rates, it just makes them unavailable. You can also delete a manual carrier outright.

## Default Country of Origin

Set the country your goods are made in and click **Save changes**. It's added to the carrier's customs declaration on international orders whenever a product has no country of origin of its own, which saves a lot of repetition when most of your catalog comes from one country.

A product's own **Country of origin**, set in its [Shipping section](/products#shipping), always wins over this default. With neither set, no country of origin is sent, and the carrier may refuse to ship internationally until one is.

## Packages

Carriers price shipments on box size as well as weight, so they need to know what you ship in. Click **Add package** to create one, or the edit icon to change it. Each package has:

- **Name**: something recognisable, like "Small box" or "Mailer".
- **Length, width, and height**: in cm, mm, or inches.
- **Package weight**: two figures sharing one unit. **Empty** is the weight of the box itself, added to every package, and **Max** is the heaviest a single package can ship. Leave Max blank for no limit.
- **Default**: one package always carries the **Default** badge. To move it, edit another package and tick **Set as default package**, which unticks the previous one. The default package can't be deleted until you make a different one the default.

Packages get used in two places. **At checkout** the store packs the cart into your boxes and quotes each one. **When you fulfill an order**, the items are packed into the best-fitting packages to pre-fill the parcels, so you usually just review and confirm.

**Quoting a cart.** When your products have [dimensions](/products#shipping), checkout works out how to fit the cart into your saved packages, picking the best-fitting boxes and splitting across several when needed, then quotes each box with the carrier. A small order might come back as one box and a large one as several. Products without dimensions are assumed to fill a whole default package, which is a deliberately cautious estimate, and a cart with no dimensions anywhere is simply quoted as one default package.

**When nothing fits.** An item too big or too heavy for every saved package, such as a product longer than your largest box or heavier than a box's max weight once its empty weight is counted, falls back to a single default package. That's a safety net so checkout always returns a quote, and the default package has no weight limit. Unexpected fallbacks usually mean a package's dimensions or max weight are set too small.

## Shipping Rates

A shipping rate is a delivery option with its cost and the conditions under which customers see it. Have as many as you need, each targeting different regions, price ranges, or weights.

Click **Add shipping rate** to open the dialog, which has three tabs.

### General

- **Region**: the region this rate applies to, from your region settings.
- **Shipping carrier**: the carrier it's linked to.
- **Shipping name**: the label customers see, such as "Express shipping".
- **Shipping rate**: **Flat rate** for a fixed charge, **Free shipping** for none, or **Calculated at checkout** for live carrier rates. The last option only appears when the carrier supports live rates, and the price field is disabled because the carrier quotes it.
- **Service codes**: calculated rates only. Limit which carrier services you offer, such as ground shipping alone. Pick from the suggestions as you type or enter a service code by hand. Leave it empty to offer everything the carrier returns.
- **Delivery time**: an optional estimate shown at checkout, such as "1 to 2 business days". Hidden on calculated rates, where the estimate comes from the carrier's quote.
- **Active**: toggle the rate off without deleting it.

### Conditions

Conditions decide when the rate appears. An order that misses any of them doesn't see it.

- **Min order value** and **Max order value**: the cart total range. Leave the max blank for no upper limit.
- **Min weight** and **Max weight**: the total cart weight range, in kilograms or grams. Leave the max blank for no upper limit.

Combine them freely, so a rate can require a $50 minimum order and cap out at 5 kg.

### Restrictions

- **Excluded products**: an order containing any of these doesn't get the rate.
- **Excluded categories**: same, for whole categories.
- **Excluded brands**: same, for whole brands.

Customers see rates based on their delivery address, cart contents, and whatever conditions and restrictions you've set.
