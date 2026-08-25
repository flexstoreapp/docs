---
title: Integration
description: Connect third-party analytics, advertising, product catalogs, and social login services to your store.
---

# Integration

Connect third-party services to your store, under **Settings > Integration**. Analytics and social login use a **Connect** button that becomes **Connected** once set up. Product catalogs use **Enable** and **Enabled**. Click a row any time to edit or remove its details.

## Analytics & Tracking

Enter a tracking ID and its code is added to every page of your storefront automatically.

- **Google Analytics ID**: your GA4 measurement ID, starting with `G-`. Find it under Admin > Data Streams.
- **Google Tag Manager ID**: your container ID, starting with `GTM-`. It's on the workspace overview screen.
- **Meta Pixel ID**: for Facebook and Instagram conversions and audiences. Find it in Meta Business Manager under Events Manager.
- **TikTok Pixel ID**: from TikTok Ads Manager under Assets > Events.
- **Pinterest Tag ID**: from your Pinterest Ads account under Ads > Conversions.

> Provide both Google IDs and only Tag Manager loads, since it can manage your Analytics tag itself.

## Product Catalogs

Product catalogs let Google and Meta pull your catalog from a feed URL. Turn a catalog on, copy the feed URL, and paste it into that platform. FlexStore builds the feed from your live products each time they fetch it. Some other shopping destinations can use the Google feed as well — see [Using the Google feed elsewhere](#using-the-google-feed-elsewhere).

Only **active** products with **Include in catalogs** turned on, a price, and at least one image are sent. If a product has no description, the title is used instead. Variants become separate items in the same group. Digital products are left out of Meta. You can include them in Google Merchant Center with **Include digital products**.

Set a [Google product category](/categories) on your store categories so Google and Meta can classify the products.

### Google Merchant Center

1. Open the **Google Merchant Center** row and turn on **List products in this catalog**.
2. Copy the **Feed URL**.
3. In [Google Merchant Center](https://merchants.google.com/), add a product source from a file and choose a scheduled fetch.
4. Paste the feed URL. Set the schedule to **daily**.

Google does not pull the feed until you add that schedule. Products expire if they are not refreshed for 30 days.

### Using the Google feed elsewhere

You do not need a separate FlexStore connection for these. Copy the same **Google Merchant Center** feed URL.

- **Microsoft Merchant Center** (Bing Shopping): add a scheduled file source and paste the Google feed URL.
- **TikTok Catalog**: in TikTok Ads Manager, import a catalog from Google Merchant Center if you already connected Google, or add a scheduled data feed and paste the Google feed URL.
- **YouTube Shopping**: uses the catalog already in Google Merchant Center. There is nothing extra to paste.

### Meta Catalog

1. Open the **Meta Catalog** row and turn on **List products in this catalog**.
2. Copy the **Feed URL**.
3. In Meta Commerce Manager, add or update a data feed and paste the URL.
4. Set the schedule to **hourly** if prices or stock change often, otherwise **daily**.

Turn **List products in this catalog** off to stop serving the feed. The URL stays the same if you turn it back on.

## Social Login

Social login lets customers log in with an existing account instead of creating a new email and password. Once set up, a **Continue with Google** button appears on the login and registration pages. Customers who use it get an account automatically, and if they already shop with the same email address, logging in with Google links to that account.

### Google

You create credentials in Google's own console and paste them into the store. It's a one-time job.

**Step 1: copy your redirect URI.** Open **Settings > Integration** and click **Connect** on the **Google** row under Social login. Copy the **Authorized redirect URI** at the top of the dialog and leave the dialog open.

**Step 2: create a Google Cloud project.** In a new tab, go to the [Google Cloud console](https://console.cloud.google.com/) and sign in. Open the project dropdown at the top, click **New Project**, name it something recognisable, and click **Create**. Make sure it's selected before you continue.

**Step 3: configure the consent screen.** This is what customers see when Google asks them to allow the login.

1. Go to **APIs & Services > OAuth consent screen**. The first time through you may be guided into a **Branding** setup.
2. Choose **External** as the user type so any customer can log in.
3. Fill in the **App name** (your store name), a **User support email**, and a **Developer contact email**. The optional fields can stay blank.
4. Save and continue through the rest. While the app is in testing mode only accounts you list can log in, so click **Publish app** to open it to everyone.

**Step 4: create the OAuth credentials.**

1. Go to **APIs & Services > Credentials**.
2. Click **Create Credentials** and choose **OAuth client ID**.
3. Select **Web application** as the type and give it a name.
4. Under **Authorized redirect URIs**, click **Add URI** and paste the one you copied. It has to match exactly.
5. Click **Create**.

**Step 5: paste the credentials into your store.** Copy the **Client ID** and **Client secret** Google shows you into the matching fields in the store's dialog, then click **Connect**.

The **Continue with Google** button appears as soon as both values are saved. To turn social login off, open the Google row, clear both fields, and save. Your client secret is stored securely and never reaches the storefront.
