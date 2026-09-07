---
title: API Authentication
description: Personal access tokens, social login, and revoking access.
---

# Authentication

Catalog, cart and checkout endpoints are public. Account endpoints require a personal access token.

```
Authorization: Bearer 12|Xk9tQ...
```

## Getting a token

| Endpoint | Use |
| --- | --- |
| [`POST /auth/register`](/developer/api/reference/authentication#register-and-log-in) | Create an account and log in |
| [`POST /auth/login`](/developer/api/reference/authentication#log-in) | Log in with email and password |
| [`POST /auth/social/{provider}`](/developer/api/reference/authentication#log-in-with-a-social-provider) | Exchange a provider token from a native SDK |

All three take a `device_name`. It labels the token so a customer can tell one device from another when reviewing access.

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

## Storage and lifetime

Tokens do not expire on their own. Treat one like a password and keep it in the platform keychain, never in plain preferences.

## Revoking

[`POST /auth/logout`](/developer/api/reference/authentication#revoke-the-current-token) revokes only the token that made the request. Other devices stay logged in.

Deleting the account with [`DELETE /account/profile`](/developer/api/reference/profile#delete-the-account) revokes every token for that customer.

## Passwords and verification

| Endpoint | Use |
| --- | --- |
| [`POST /auth/forgot-password`](/developer/api/reference/authentication#send-a-password-reset-link) | Email a reset link |
| [`POST /auth/reset-password`](/developer/api/reference/authentication#reset-a-password-with-a-token) | Set a new password from the emailed token |
| [`PUT /account/password`](/developer/api/reference/profile#change-the-password) | Change the password, requires the current one |
| [`POST /auth/email/verification-notification`](/developer/api/reference/authentication#resend-the-verification-email) | Resend the verification email |
| [`POST /auth/email/verify`](/developer/api/reference/authentication#verify-an-email-address) | Verify the address from the emailed link |

[`POST /auth/forgot-password`](/developer/api/reference/authentication#send-a-password-reset-link) returns the same response whether or not the account exists, so it cannot be used to discover registered emails.

The verification email links to the storefront, not to the API. A native client that handles the deep link posts the whole query it carries, `id`, `hash`, `expires` and `signature`, to [`POST /auth/email/verify`](/developer/api/reference/authentication#verify-an-email-address) with the customer's token, rather than opening the link in a browser. The signature is what proves the customer opened the email, so all four values are required.
