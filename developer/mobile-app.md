---
title: Mobile App
description: Set up the FlexStore Expo app, point it at your store, rename it, and run it on a device or simulator.
---

# Mobile App

The mobile app is an Expo (React Native) project in the `expo` folder. It runs on iOS and Android and talks to your store through the [API](/developer/api/).

Your store name, accent color and policy pages come from the store itself, so changing them in the admin updates the app without a new build. The API URL (`EXPO_PUBLIC_API_URL`, covered in step 2) is different. It is set at build time, so each build of the app talks to one store.

This page is for the developer who sets up the Expo project in the `expo` folder and runs it locally. Basic command-line and Node.js experience is enough. To build and submit to the App Store and Google Play, read [Publishing the Mobile App](/developer/mobile-app-publishing).

## Requirements

- Node.js 22.13 or newer, or 24.3 or newer, with npm
- Xcode on a Mac, if you want to run the iOS app on a simulator
- Android Studio, if you want to run the Android app on an emulator

EAS (Expo Application Services) is Expo's build and submit service. Release builds for the stores are made in the cloud by EAS by default, so you don't need Xcode or Android Studio for them. [Publishing](/developer/mobile-app-publishing) covers the build options.

## 1. Install dependencies

From the `expo` folder:

```bash
npm install
```

## 2. Set your API URL

Copy the example environment file:

```bash
cp .env.example .env
```

Set `EXPO_PUBLIC_API_URL` to your store's API URL. It ends in `/api/v1`:

```dotenv
EXPO_PUBLIC_API_URL=https://your-store.com/api/v1
```

`npm start` reads this file. Restart the dev server after you change it.

EAS Build does not read `.env`. Release builds take their values from `eas.json`, as explained in the [publishing guide](/developer/mobile-app-publishing).

A phone or emulator cannot reach `localhost` on your computer, because `localhost` means the device itself. The device needs an HTTPS address it can open. Use one of these:

- **A staging store.** Point the URL at a copy of your store on a public domain.
- **Laravel Herd Share.** If you run the store with Laravel Herd, its Share feature gives the local site a public HTTPS address.
- **Expose.** Expose is the tunnelling tool from the Laravel community. It gives the local site a public HTTPS address from the command line.
- **Other tunnels.** Cloudflare Tunnel (`cloudflared`) and ngrok work the same way.

Whichever you use, set `EXPO_PUBLIC_API_URL` to `https://<tunnel-address>/api/v1`, and set the Laravel `APP_URL` to the same address so the links the store generates point to the tunnel.

`npx expo start --tunnel` is a different thing. It tunnels the Expo dev server, which sends your app's JavaScript to the device. It does not expose your store's API, so the API still needs its own address.

## 3. Rename the app

Open `app.json` and replace the placeholder identity with your own:

| Field | Purpose |
| --- | --- |
| `name` | The name shown under the app icon |
| `slug` | The project identifier used by Expo |
| `ios.bundleIdentifier` | The iOS bundle ID, for example `com.yourbrand.store` |
| `android.package` | The Android package name, for example `com.yourbrand.store` |

The bundle ID and package name are permanent once the app is in a store, so choose them before your first build. Use the same bundle ID when you register the App ID with Apple, and enter it in **Settings > Integration** if you use Apple sign-in.

The `scheme` value (`flexstore`) is used to bring customers back into the app after a payment. If you keep it, nothing else changes. If you change it, update both places that hardcode the return URL:

- `expo/src/lib/open-link.ts`, the `CHECKOUT_RESULT_URL` constant
- `app/Http/Controllers/Storefront/CheckoutAppReturnController.php`, the `RESULT_URL` constant

Both must read `<your-scheme>://checkout/result`.

## 4. Replace the artwork

The files live in `assets/images`:

- `icon.png` is the iOS app icon and must be 1024 x 1024 pixels. App Store icons cannot have transparency.
- `android-icon-foreground.png` (512 x 512) and `android-icon-background.png` (512 x 512) form the Android adaptive icon. `android-icon-monochrome.png` (432 x 432) is used for themed icons.
- `splash-icon.png` is shown on the launch screen. Its background color is set under `plugins` in `app.json`.

The store name and accent color shown in the app come from your store, not from the app files. Set the accent color under [Storefront](/storefront) and the name under [Store Settings](/settings-store).

## 5. Social sign-in

Google and Apple buttons appear on the login screen only when both sides are set up:

1. The provider is enabled in **Settings > Integration**, under Social login. The [Social login](/settings-integration) section covers each provider's console setup.
2. The app has the matching client ID or bundle ID.

**Apple (iOS only).** The Apple sign-in button depends on the Bundle ID you enter in **Settings > Integration** matching `ios.bundleIdentifier` exactly. The app adds the Sign in with Apple entitlement itself through the `expo-apple-authentication` plugin in `app.json`, so you don't need an extra setting there. Your App ID in Apple's developer portal must still have Sign in with Apple turned on.

**Google.** Set these in `.env` for local runs and in `eas.json` for release builds:

- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`, the iOS OAuth client ID. Leave it out of the build profile if you don't offer Google on iOS.
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`, the Web client ID. Use the same one you entered in **Settings > Integration**.

Android needs an OAuth client of type Android in the same Google Cloud project. Each client is tied to a signing key, so create one for each key you build with:

- Local debug builds use a debug key with its own SHA-1 fingerprint.
- EAS builds use the keystore EAS manages. Run `eas credentials` to see its SHA-1.
- Play builds use the app signing certificate that Play Console shows for your app.

A missing or wrong SHA-1 makes Google sign-in fail with `DEVELOPER_ERROR` on Android.

The Google and Apple buttons are hidden in Expo Go, since they need a native build. Test them with a development build.

Apple requires Sign in with Apple when you offer Google sign-in on iOS. If the Google button shows in the iOS app, turn on Apple as well.

## 6. Run the app

Start the Expo dev server:

```bash
npm start
```

The server prints a QR code and shows the commands it accepts. Press `i` to open the iOS simulator or `a` to open the Android emulator.

### Expo Go

Expo Go is a free app from the App Store and Google Play. It runs your project without a native build, so you can edit a screen and see the change within seconds. Scan the QR code from `npm start` with the Expo Go app on a phone on the same network as your computer.

Expo Go has limits:

- It only includes the native modules that Expo ships with it. A package that needs its own native code will not load in Expo Go.
- The Google and Apple sign-in buttons are hidden, since those need a native build. The code checks for Expo Go and hides them.
- In-app purchases are unavailable. The product page shows a disabled button instead of the store payment sheet.
- The device running Expo Go must be able to reach `EXPO_PUBLIC_API_URL`, as described in step 2.

Use Expo Go while you change screens, styles and copy. When you add a package with native code or need to test sign-in, build the app as described in [Publishing](/developer/mobile-app-publishing#ways-to-build).
