---
title: Publishing the Mobile App
description: Create store accounts, build the FlexStore app with EAS, and submit it to Google Play and the App Store.
---

# Publishing the Mobile App

A release build is the app package you upload to Google Play or the App Store. This page is for the developer who builds and submits the app. Finish [Mobile App](/developer/mobile-app) first, so the project already runs on your machine. The commands run from the `expo` folder.

## Ways to build

Expo is the framework, and its `expo` commands read `app.json`. EAS (Expo Application Services) is Expo's build and submit service, used through the `eas` command. It reads the build profiles in `eas.json`, builds in Expo's cloud by default, can build on your computer with `--local`, and can upload finished builds to the stores.

`npm run ios` and `npm run android` run Expo on your computer. The `eas` commands run in the cloud or on your computer. EAS builds release versions in the cloud by default, so you don't need Xcode or Android Studio for those. Section 9 explains local EAS builds, and section 10 explains builds with `npx expo`.

| Command | Where it builds | Build type | Result | Use it for |
| --- | --- | --- | --- | --- |
| `npm run ios` or `npm run android` | Your computer, with Xcode or Android Studio | Debug | Installed on a simulator or emulator | Everyday development |
| `eas build --profile development` | EAS cloud | Development (debug, with the dev client) | Installable file for a simulator or device | Testing native changes without local native tools |
| `eas build --profile production` | EAS cloud | Release | Store file, signed for the store | Store releases (the default) |
| `eas build --local --profile production` | Your computer | Release | Store file that you upload yourself | Release builds on your own machine (experimental) |
| `npx expo run:android --variant release` or `npx expo run:ios --configuration Release` | Your computer | Release | Unsigned or debug-signed build, not ready for upload | Testing a release build |
| `npx expo prebuild`, then `./gradlew bundleRelease` or `xcodebuild` | Your computer | Release | Store file that you upload yourself | Builds without EAS (you manage signing and versions) |

## Check before you build

```bash
npm run typecheck
npm run lint
npm test
```

Fix any failures before you start a release build.

## Before you start

You need these accounts:

- An [Expo account](https://expo.dev/signup), which EAS uses for builds. It is free to create.
- An [Apple Developer Program](https://developer.apple.com/programs/) membership for the App Store. It has an annual fee.
- A [Google Play Console](https://play.google.com/console) developer account. It has a one-time registration fee.

You also need your store's privacy policy. Write it under **Settings > Policy**. Your store serves it at `https://your-store.com/policies/privacy`, and both stores ask for that URL.

## 1. Set the release values

EAS Build does not read the `.env` file. Every value a release build needs goes in `eas.json`, under the profile's `env` key. Check the `production` profile first:

- `EXPO_PUBLIC_API_URL` must be your store's API URL over HTTPS, ending in `/api/v1`. The bundled value is a placeholder.
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` and `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` go here too if you offer Google sign-in. See the social sign-in section of [Mobile App](/developer/mobile-app).

Versions work like this:

- `version` in `app.json` is the version customers see, such as `1.0.0`. You change it by hand for each release.
- Build numbers are handled by EAS. The `production` profile sets `autoIncrement`, and `appVersionSource` is `remote`, so EAS stores the build number and raises it on every build. You don't set build numbers yourself.

## 2. Link the project to EAS

From the `expo` folder, sign in and create the EAS project:

```bash
npx eas-cli@latest login
npx eas-cli@latest init
```

## 3. Create the app in each store

**App Store**

1. In the Apple Developer portal, register an App ID with the same bundle ID as `ios.bundleIdentifier`. If you offer Apple sign-in, turn on Sign in with Apple for it.
2. In [App Store Connect](https://appstoreconnect.apple.com/), create a new app with that bundle ID.
3. Open the app's **App Information** page and note the **Apple ID** (a number). You need it for `ascAppId` below.

**Google Play**

1. In Play Console, click **Create app** and fill in the details. This creates the app's record in Play Console. You upload your first build to it in section 5.
2. Create a service account key for submissions. Expo's [Google Play guide](https://docs.expo.dev/submit/android/) walks through it, and the key is uploaded to Expo.

Keep the service account JSON file private. Don't put it in a folder you share or in a zip you send to customers.

## 4. Add the submit settings

Add your App Store Connect app ID and the path to the Google key to the `submit` section of `eas.json`:

```json
"submit": {
    "production": {
        "ios": {
            "ascAppId": "1234567890"
        },
        "android": {
            "serviceAccountKeyPath": "./path/to/google-service-account.json"
        }
    }
}
```

## Digital products

Both stores require digital goods and content used in the app to be sold with in-app purchase. Apple's rule is guideline 3.1.1, and Google's is the Play payments policy. A store that sells only physical goods or services is not affected.

The app sends an `X-App-Platform` header, and the store decides what it shows from the **Digital products in the iOS app** and **Digital products in the Android app** options under **Settings > Checkout**, one for each store:

- **Hide digital products** is the default. Digital products are left out of the shop, search, categories, the homepage, wishlists and comparisons, and cannot be added to the cart or checked out from the app. A store that sells only physical products needs nothing else and does not set up in-app purchases.
- **Sell with in-app purchase** shows a digital product only when it has a product ID for the platform. The product page then offers **Buy now**, which opens the App Store or Google Play payment sheet. The app sends the result to the store, which verifies it with Apple or Google, creates a paid order and grants the downloads.
- **Sell with your own checkout** sells digital products through the normal checkout. The stores usually reject this, so use it only if you have cleared it with them. A single product can opt in with **Sell with your own checkout** on its **Mobile Apps** card, for example a gift card for physical goods.

For in-app purchases, connect the stores under **Settings > Integration**, create a consumable product in each store, and enter the product IDs on the product. The [Integration settings](/settings-integration#in-app-purchases) page walks through it.

In-app purchases need native code, so they work in development builds and release builds but not in Expo Go. The app picks up purchases the store never finished, for example after a dropped connection, the next time a signed in customer opens it.

Read Apple's [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) and Google's [payments policy](https://support.google.com/googleplay/android-developer/answer/9858738) before you decide.

## 5. Build and submit for Android

```bash
npx eas-cli@latest build --profile production --platform android
npx eas-cli@latest submit --profile production --platform android
```

The production build is an Android App Bundle (`.aab`), which is the format Play requires.

The first `submit` creates a release on the internal testing track. Play Console then asks for the rest of the listing before you can publish:

- Store listing text, screenshots and icon
- Privacy policy URL
- Data safety form
- Content rating and target audience

**Account deletion.** An app that lets people create accounts must let them delete the account in the app and provide a web link for deletion requests. The app has the in-app path under **Profile > Delete account**. For the web link, use `https://your-store.com/account/profile`. Customers sign in there and can delete their account from the profile page. Check the current wording in Play Console, since the form asks for it directly.

**Testing requirement for new personal accounts.** If your Play account is a personal one created recently, Google won't let you publish to production until you've run a closed test. A closed test is a release that only invited testers can install. It needs at least 12 testers who stay opted in for at least 14 days. Plan for this before you expect a production release. Google's [testing requirements page](https://support.google.com/googleplay/android-developer/answer/14151465) has the current rules.

## 6. Build and submit for iOS

```bash
npx eas-cli@latest build --profile production --platform ios
npx eas-cli@latest submit --profile production --platform ios
```

On the first iOS build, EAS CLI asks you to sign in to your Apple Developer account and sets up the signing certificates and profiles for you.

After `submit` uploads the build, it appears in TestFlight once Apple finishes processing it. That usually takes 10 to 15 minutes.

In App Store Connect, complete the App Privacy questions, screenshots, description and App Review information. Three points need attention before you submit for review:

- **Demo account.** Apple reviewers need to log in, and the installer creates the demo accounts with random passwords nobody can use. Register a customer account on your store for App Review, and enter its email and password in the App Review information section.
- **Your store must be live.** Reviewers test against your real API, so the store has to be online over HTTPS while the app is in review.
- **Sign in with Apple.** Apple requires Sign in with Apple when the app offers Google sign-in. If you turn on Google for iOS, turn on Apple too.

## 7. Test before release

Preview builds are for testers. They don't go through the stores.

```bash
npx eas-cli@latest build --profile preview --platform android
npx eas-cli@latest build --profile preview --platform ios
```

- The Android preview build is an APK that testers can install directly.
- The iOS preview build is an internal build. Only devices registered to your Apple account can install it. Register a device with `npx eas-cli@latest device:create`, then build again so the new device is included.

## 8. Ship an update

For a new version in the stores, change `version` in `app.json`, then run the production build and submit steps for each platform again. Each new version goes through store review.

Changes that only touch JavaScript can be sent over the air with EAS Update, without a store review. The project includes `expo-updates` and the `production` and `preview` profiles name a channel. Before the first update:

```bash
npx eas-cli@latest update:configure
```

Installed apps only pick up updates from builds that include `expo-updates`, so ship at least one new build after this step.

Then publish a JavaScript update to the production channel:

```bash
npx eas-cli@latest update --channel production --message "Fix checkout copy"
```

## 9. Build on your own machine (optional)

EAS can build on your computer as well as in the cloud. Add `--local` to an `eas build` command, and it uses the same profile and `env` values from `eas.json`:

```bash
npx eas-cli@latest build --local --profile production --platform android --output ./release/flexstore.aab
```

The output is a release file you upload yourself in Play Console or App Store Connect. Local builds need Xcode on a Mac for iOS, and the Android SDK (through Android Studio) for Android. The EAS CLI marks local builds as experimental, so use cloud builds unless you need to build on your own machine.

The table under [Ways to build](#ways-to-build) compares this with the cloud builds and `npm run ios` and `npm run android`. Section 10 covers building without EAS.

## 10. Build without EAS (prebuild)

`npx expo run:android --variant release` and `npx expo run:ios --configuration Release` build a release version on your computer, but neither output is ready for the stores. Android signs it with the debug keystore, and the iOS build is unsigned. Use them to test a release build, then sign it as described below.

`npx expo prebuild` generates the `ios` and `android` native projects from `app.json` and the config plugins. Run it from the `expo` folder:

```bash
npx expo prebuild
```

The generated folders are not part of the project. Add `--clean` to rebuild them from scratch. Change native settings in `app.json` or a config plugin, not inside `ios/` or `android/`, because a later prebuild overwrites those changes. If you use Google sign-in, export `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` before you run prebuild, since `app.config.ts` reads it then.

Release builds take `EXPO_PUBLIC_API_URL` from the environment, so export it before you build:

```bash
export EXPO_PUBLIC_API_URL=https://your-store.com/api/v1
```

**Android.** Build from the `android` folder:

```bash
cd android
./gradlew bundleRelease
./gradlew assembleRelease
```

`bundleRelease` writes the Android App Bundle for Google Play to `android/app/build/outputs/bundle/release/app-release.aab`. `assembleRelease` writes an APK for direct install to `android/app/build/outputs/apk/release/app-release.apk`.

The generated release build is signed with the debug keystore, and Play will not accept it. Create an upload keystore with `keytool`, add a release `signingConfig` to `android/app/build.gradle` that reads the passwords from `gradle.properties`, and point the `release` build type at it. Keep the keystore and its passwords out of any shared copy of the project.

**iOS.** Build from the `ios` folder with Xcode installed:

```bash
cd ios
xcodebuild -workspace FlexStore.xcworkspace -scheme FlexStore -configuration Release -archivePath build/FlexStore.xcarchive archive
xcodebuild -exportArchive -archivePath build/FlexStore.xcarchive -exportOptionsPlist ExportOptions.plist -exportPath build/ipa
```

`ExportOptions.plist` sets the export method (`app-store-connect` for the App Store, `ad-hoc` for registered devices) and your Apple team ID. Choose your team under **Signing & Capabilities** in Xcode first. The project file carries another team ID, so replace it with yours.

Upload the `.ipa` with Transporter or in App Store Connect, and the `.aab` in Play Console.

Without EAS you manage the version and build numbers yourself, and `eas update` is not available.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Google sign-in fails with `DEVELOPER_ERROR` on Android | The SHA-1 of the signing key is missing from the Android OAuth client. See the social sign-in section of [Mobile App](/developer/mobile-app). |
| The Google button is missing | Google is off in **Settings > Integration**, or on iOS `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` is empty in the build profile. |
| The Apple button is missing on iOS | The Bundle ID in **Settings > Integration** is empty or differs from `ios.bundleIdentifier`. |
| The app shows no products or can't log in | `EXPO_PUBLIC_API_URL` in the build profile points to the wrong URL or to plain HTTP. |
| Values from `.env` don't appear in the build | EAS Build does not read `.env`. Put the values in `eas.json`. |
