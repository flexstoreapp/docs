---
title: Account
description: A staff member's own profile, password, two factor and passkeys.
outline: 2
---

# Account

What a staff member can change about their own account. These endpoints need no permission beyond a valid staff token: they always act on the account behind the token, never on anyone else's.

Roles are deliberately not editable here. A staff member changing their own profile cannot grant themselves a role, and cannot set a password without first proving the current one.

## Proving it is you

The sensitive operations, anything that touches two factor or passkeys, need proof of identity in the request body. Send **either**:

```json
{ "current_password": "correct-horse-battery" }
```

or a passkey assertion, which is the better option for a staff member who signs in with a passkey and may not know their password:

```json
{ "credential": { "id": "AX8s...", "rawId": "AX8s...", "type": "public-key", "response": { } } }
```

To use a passkey, call `POST /admin/account/reauth/options` first and pass the options it returns to the platform WebAuthn API. The challenge is held against your access token, can be used once, and expires after five minutes. Send neither and the request comes back `422` on `current_password`.

Every endpoint that changes your security state returns the whole state back, so a client never needs to re-read after a change.

## Setting up two factor

Four steps, in order:

| Step | Call | Result |
| --- | --- | --- |
| 1 | `POST /admin/account/two-factor` | A secret is generated, confirmation now pending |
| 2 | `GET /admin/account/two-factor/qr-code` | The QR code to scan, plus the same secret as text |
| 3 | `POST /admin/account/two-factor/confirm` | Two factor goes live, recovery codes returned once |

Two factor is not active until step 3. The QR code is only available while a confirmation is pending, so calling it before step 1 or after step 3 returns `403`. Recovery codes appear in the response to step 3 and nowhere else, so capture them then; `POST /admin/account/two-factor/recovery-codes` issues a fresh set and invalidates the old.

A recovery code defeats two factor by itself, so the `recovery_codes` field is only present on those two responses. Everywhere else, including `GET /admin/account/security`, the field is absent rather than empty, and `recovery_codes_count` tells you how many unused codes the account holds. That way a client can show "8 codes remaining" without being able to read them, and an account that has never generated any is distinguishable from one whose codes are simply being withheld.

## Registering a passkey

Same shape as re-authentication, with a creation challenge instead of an assertion: call `POST /admin/account/passkeys/options`, hand the options to the platform API, then post the result to `POST /admin/account/passkeys`. An expired or already-used challenge comes back `422` on `credential`.

## Endpoints

<OAOperation operation-id="adminGetOwnProfile" />

<OAOperation operation-id="adminUpdateOwnProfile" />

<OAOperation operation-id="adminUpdateOwnPassword" />

<OAOperation operation-id="adminUpdateOwnAppearance" />

<OAOperation operation-id="adminGetOwnSecurity" />

<OAOperation operation-id="adminCreateReauthChallenge" />

<OAOperation operation-id="adminEnableOwnTwoFactor" />

<OAOperation operation-id="adminGetOwnTwoFactorQrCode" />

<OAOperation operation-id="adminConfirmOwnTwoFactor" />

<OAOperation operation-id="adminDisableOwnTwoFactor" />

<OAOperation operation-id="adminRegenerateOwnRecoveryCodes" />

<OAOperation operation-id="adminCreatePasskeyChallenge" />

<OAOperation operation-id="adminStoreOwnPasskey" />

<OAOperation operation-id="adminDeleteOwnPasskey" />
