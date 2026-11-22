---
title: Integration Settings
description: Connect third-party analytics, advertising, product catalogs, and social login services to your store.
---

# Integration Settings

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

Social login lets customers log in with an existing account instead of creating a new email and password. Once set up, a **Continue with Google** button appears on the login and registration pages, and a **Continue with Apple** button appears there too once Apple is set up. The same button appears in your iOS mobile app. Customers who use either get an account automatically, and if they already shop with the same email address, logging in links to that account.

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

### Apple

Sign in with Apple lets customers log in with their Apple ID, on your website, in your iOS app, or both. You set up each one separately, and either can be left empty. Apple also requires it for the app: if your iOS app offers Google login, it must offer Sign in with Apple too, or the App Store can reject the app.

You need an [Apple Developer](https://developer.apple.com/) account, which is the same one you use to publish the app. Your store must run on a secure address (https), because Apple doesn't accept plain http or local addresses.

#### On your website

**Step 1: create an App ID.** In your Apple Developer account, open **Certificates, Identifiers & Profiles** and choose **Identifiers**. Click the **+** button, choose **App IDs**, then **App**, and continue. Give it a name and an identifier, tick **Sign in with Apple** under Capabilities, and register it. If you already have an App ID for your iOS app, you can open it, tick **Sign in with Apple**, and use that one instead.

**Step 2: copy your redirect URI.** In your store, open **Settings > Integration** and click **Connect** on the **Apple** row under Social login. Copy the **Authorized redirect URI** from the dialog and leave it open.

**Step 3: create a Services ID.** Back in Apple's Identifiers page, click **+** again and choose **Services IDs**. Enter a description and an identifier such as `com.your-store.web`, then register it. Open the new Services ID, tick **Sign in with Apple**, and click **Configure**:

1. Choose the App ID from step 1 as the **Primary App ID**.
2. Under **Domains and Subdomains**, enter your store's domain, for example `your-store.com`, without `https://`.
3. Under **Return URLs**, paste the redirect URI you copied. It has to match exactly.
4. Click **Next**, then **Done**, then **Continue** and **Save**. If Apple asks you to verify your domain, follow its on-screen instructions first.

**Step 4: paste the Services ID into your store.** Enter the identifier from step 3 in the **Services ID** field of the dialog and click **Connect**.

The **Continue with Apple** button appears on the login and registration pages as soon as the Services ID is saved. Customers who use it return to your store signed in.

#### In your iOS app

Open the Apple row in **Settings > Integration** and enter the **Bundle ID** of your iOS app, for example `com.your-store.app`. It is the identifier you gave the app, and it has to match exactly. Your App ID in Apple's account needs **Sign in with Apple** ticked, as in step 1 above. The button appears in the app as soon as the Bundle ID is saved.

#### Turning it off

Open the Apple row, clear the **Services ID** to remove the button from the website or clear the **Bundle ID** to remove it from the app, and save.

#### Good to know

- Apple shares a customer's name only the first time they sign in. If it isn't shared, the account is named after the first part of their email address, and the customer can change it from their profile.
- Customers can choose **Hide My Email**. Apple then gives your store a private address that forwards to the customer's real inbox. Order emails only reach these addresses if you register your store's sending domain with Apple's private email relay service in the same developer account.
- If a customer already shops with the same email address, signing in with Apple links to that account instead of creating a new one. A customer who hides their email gets a separate account, because Apple's private address doesn't match.

## In-App Purchases

In-app purchases let customers buy digital products inside your iOS and Android apps with the App Store or Google Play payment sheet. They are used when a platform's digital products option is set to **Sell with in-app purchase**, which you choose in that platform's dialog below. If you only sell physical products, you can skip this page.

Controls how your apps treat digital products, with one option for the **iOS app** and one for the **Android app**. Each store has its own rules, so the two can differ. Your website is not affected. The choices are:

- **Hide digital products**: the default. The app leaves digital products out of the shop, search, categories, the homepage, wishlists and comparisons, and nobody can add one to the cart from the app. Physical products sell as usual. Choose this if you only sell physical goods, because it needs no in-app purchase setup.
- **Sell with in-app purchase**: the app shows a digital product only when it has a product ID for that platform, set under [Mobile Apps](/products#mobile-apps) on the product or on each of its variants. Customers buy it with **Buy now** on the product page, using the App Store or Google Play payment sheet, and it never goes in the cart. FlexStore creates a paid order at the product's FlexStore price and the downloads appear straight away. The store charges the price set for the product in App Store Connect or Play Console, so mirror any sale price there too (see [Mobile Apps](/products#mobile-apps)). Customers must be logged in to buy. This needs the store accounts connected under [Integration settings](/settings-integration#in-app-purchases).
- **Sell with your own checkout**: the app sells digital products through your own checkout, like any other product. App Store and Google Play usually do not allow this, so pick it only if you have cleared it with them.

This exists because the App Store and Google Play require digital goods to be sold with in-app purchase, and an app that sends buyers to an outside payment page for them can be rejected.

To sell a single product through your own checkout while the rest follow these options, use **Sell with your own checkout** under [Mobile Apps](/products#mobile-apps) on that product. It suits gift cards that are spent on physical goods, which the stores treat differently from digital goods.

With **Hide digital products**, the app also hides **Downloads** and the download links on orders, so files bought on your website are not offered in the app. The App Store and Google Play only allow access to content bought elsewhere when the same items are also sold with in-app purchase in the app. Customers still receive the download links by email and can open them on your website. With the other two options the app keeps showing downloads. A product with **Sell with your own checkout** turned on keeps its downloads in the app, even when the app's option is **Hide digital products**, because customers buy it in the app and need the files.

Each digital product is sold as a **consumable** in-app product in the store. That means a customer can buy it again later, and every purchase becomes one paid order in FlexStore with the download links attached. Subscriptions are not supported.

The order records the price you set on the product in FlexStore. What the customer actually pays, and the store's commission, come from the price you set in App Store Connect or Play Console.

### App Store

1. In App Store Connect, add an in-app purchase of type **Consumable** for each digital product, with the price you want. Copy its Product ID.
2. In your store, open **Settings > Integration** and click **Connect** on the **App Store** row under In-app purchases. At the top of the dialog, choose how digital products appear in the iOS app.
3. Enter the **Bundle ID** of your iOS app. This is separate from the Bundle ID for [Sign in with Apple](#apple), so enter it here even if you already use Sign in with Apple.
4. Copy the **Server notification URL** into App Store Connect as the production and sandbox server URL, using version 2 notifications. Apple then tells your store when it refunds a purchase.
5. On each product, or each variant of a product, paste the Product ID into **Apple product ID**. See [Mobile Apps](/products#mobile-apps).

### Google Play

1. In Play Console, create an in-app product for each digital product, with the price you want. Copy its product ID.
2. In the Google Cloud console, create a service account and download its JSON key. Then invite the service account in Play Console, with permission to view financial data and manage orders.
3. In your store, open **Settings > Integration** and click **Connect** on the **Google Play** row under In-app purchases. At the top of the dialog, choose how digital products appear in the Android app.
4. Enter the **Android package name** of your app and paste the JSON key into **Service account key**.
5. Create a Pub/Sub topic in Google Cloud with a push subscription to the **Real-time notification URL**, then select the topic under Monetization setup in Play Console. Google then tells your store when it refunds a purchase. The URL contains a private key, so keep it to yourself.
6. On each product, or each variant of a product, paste the product ID into **Google product ID**.

### Good to know

- When a purchase is refunded in App Store Connect or Play Console, the order is marked refunded and the downloads stop working. It behaves like a [gateway refund](/orders#refunds-from-the-payment-gateway), with only the total recorded.
- Without the notification URLs, purchases still work, but you have to refund the order in the admin panel yourself.
- A purchase is only recorded once the store confirms it to your server. If the customer's connection drops after paying, the app sends it again the next time it opens.
- Purchases made in the store's testing environments create real orders in your store, so test on a copy of it.
