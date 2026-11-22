---
title: Authentication
description: Personal access tokens, social login, password recovery, and revoking access.
outline: 2
---

# Authentication

Catalog, cart and checkout endpoints are public. Account endpoints require a personal access token, sent on every request:

```
Authorization: Bearer 12|Xk9tQ...
```

Register, log in and social login all take a `device_name`. It labels the token so a customer can tell one device from another when reviewing access. Each returns the token alongside the customer:

```json
{
  "token": "12|Xk9tQ...",
  "user": { "id": 4, "name": "Ada Lovelace", "email": "ada@example.com", "email_verified": false }
}
```

## Social login

Native apps do not follow a browser redirect. Get an access token from the platform SDK, then trade it:

```bash
curl -X POST https://your-store.com/api/v1/auth/social/google \
  -H 'Content-Type: application/json' \
  -d '{"access_token": "ya29.a0Af...", "device_name": "Pixel 9"}'
```

A first-time token creates the customer. A returning one logs in to the existing account. Unsupported providers, and providers the merchant has not configured, return `404`.

Ask the provider SDK for a token issued to the store's own client id, the one saved in **Settings > Integration**, rather than the mobile app's. FlexStore verifies the token against the merchant's credentials, so a token minted for a different client is rejected.

### Apple

Sign in with Apple is native only, so there is no browser redirect and no client secret. Send the identity token the SDK returns as `access_token`:

```bash
curl -X POST https://your-store.com/api/v1/auth/social/apple \
  -H 'Content-Type: application/json' \
  -d '{"access_token": "eyJraWQiOi...", "device_name": "iPhone 17", "name": "Ada Lovelace"}'
```

FlexStore checks the token's signature against Apple's published keys and requires it to be issued to the bundle identifier saved in **Settings > Integration**, so it must come from the merchant's own app. Apple only shares the customer's name on the first authorization, so repeat it in `name` when you have it. A customer without one is named after their email address. Check `social_login.apple` in the store configuration before showing the button.

## Storage and lifetime

Tokens do not expire on their own. Treat one like a password and keep it in the platform keychain, never in plain preferences.

Logging out revokes only the token that made the request, so other devices stay logged in. Deleting the account with `DELETE /account/profile` revokes every token for that customer.

## Passwords and verification

`POST /auth/forgot-password` returns the same response whether or not the account exists, so it cannot be used to discover registered emails.

The verification email links to the storefront, not to the API. A native client that handles the deep link posts the whole query it carries, `id`, `hash`, `expires` and `signature`, to `POST /auth/email/verify` with the customer's token, rather than opening the link in a browser. The signature is what proves the customer opened the email, so all four values are required.

## Endpoints

<OAOperation operation-id="register" />

<OAOperation operation-id="login" />

<OAOperation operation-id="socialLogin" />

<OAOperation operation-id="logout" />

<OAOperation operation-id="resendVerificationEmail" />

<OAOperation operation-id="verifyEmail" />

<OAOperation operation-id="sendPasswordResetLink" />

<OAOperation operation-id="resetPassword" />
