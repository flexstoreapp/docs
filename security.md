---
title: Security
description: How FlexStore protects your store data, customer information, and sensitive credentials.
---

# Security

Your store data, customer information, and credentials are protected with standard encryption and security practices.

## Password Protection

Customer and staff passwords are never stored in plain text. Every one is hashed with **bcrypt**, a one-way algorithm built for passwords, so even an exposed database gives up nothing readable.

## Encrypted Credentials

Sensitive credentials entered in the admin panel are encrypted with **AES-256** before they reach the database:

- Payment gateway API keys, secret keys, and webhook secrets
- Shipping carrier API keys, passwords, and webhook tokens
- Newsletter provider API keys and IDs
- Your outgoing mail password or API key
- The Google social login client secret
- Two-factor authentication secrets and recovery codes

They're decrypted only when needed, never appear in logs or API responses, and never reach the storefront.

## Two-Factor Authentication

Staff accounts can require a time-based code from an authenticator app alongside the password. Recovery codes cover the case where the authenticator app isn't available. See [Account](/account#two-factor-authentication) for setup.

## Passkeys

Staff can log in with a passkey instead of a password, proving identity with the device's own unlock method: fingerprint, face recognition, PIN, or a hardware security key.

Passkeys are phishing-resistant. The private key never leaves the device, nothing reusable is sent to the server, and a passkey only works on the domain it was created for, so fake login pages can't steal it. FlexStore stores only the public half, which on its own can't impersonate anyone. See [Account](/account#passkeys) for setup.

## Login Protection

Accounts lock temporarily after 5 failed login attempts, tracked by both email address and IP address. Sessions are regenerated on login to prevent session fixation.

## CSRF Protection

Every form submission carries a unique token that's verified server-side, so actions can only come from your own admin panel and storefront.

## Secure Sessions

Sessions are stored in the database rather than on the file system. Session cookies are marked **HttpOnly** so JavaScript can't read them, and the **SameSite** attribute blocks cross-site request attacks.

## Rate Limiting

- **Login**: 5 attempts per minute
- **Checkout**: 10 attempts per minute
- **Newsletter subscription**: 5 attempts per minute
- **Password reset and email verification**: 5 attempts per minute

## Cookie Encryption

All cookies are encrypted, apart from non-sensitive preferences like appearance mode and sidebar state.
