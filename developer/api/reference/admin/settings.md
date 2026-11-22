---
title: Settings
description: Store configuration, one section per settings screen.
outline: 2
---

# Settings

Everything under Settings in the admin panel, one endpoint per section. Each section reads with `GET` and writes with `PATCH`, and a write returns the whole section back in the same shape, so a client never has to re-read after saving.

Every section is gated by its own permission, so a staff member who may configure shipping but not mail gets a `403` on the mail endpoints. Start from the index below rather than hardcoding the section list: it returns only the sections the signed-in staff member may open, each with the URL that serves it.

A `PATCH` changes only the fields you send. Values come back typed, so a boolean setting is a JSON boolean rather than `"1"`.

## Credentials are write only

Where a section stores a secret, the secret is never returned. You get a `_set` boolean in its place, telling you whether one is stored without disclosing it:

```json
{ "mail_host": "smtp.example.com", "mail_password_set": true }
```

That applies to the mail password and every credential in the integration section. The payment and newsletter sections never return gateway or provider credentials either, reporting `is_configured` per row instead.

<OAOperation operation-id="adminListSettingSections" />

## General

<OAOperation operation-id="adminGetGeneralSettings" />

<OAOperation operation-id="adminUpdateGeneralSettings" />

## Store

<OAOperation operation-id="adminGetStoreSettings" />

<OAOperation operation-id="adminUpdateStoreSettings" />

## Language

<OAOperation operation-id="adminGetLanguageSettings" />

<OAOperation operation-id="adminUpdateLanguageSettings" />

## Currency

<OAOperation operation-id="adminGetCurrencySettings" />

<OAOperation operation-id="adminUpdateCurrencySettings" />

## Shipping

<OAOperation operation-id="adminGetShippingSettings" />

<OAOperation operation-id="adminUpdateShippingSettings" />

## Tax

<OAOperation operation-id="adminGetTaxSettings" />

<OAOperation operation-id="adminUpdateTaxSettings" />

## Checkout

<OAOperation operation-id="adminGetCheckoutSettings" />

<OAOperation operation-id="adminUpdateCheckoutSettings" />

## Payment

<OAOperation operation-id="adminGetPaymentSettings" />

## Newsletter

<OAOperation operation-id="adminGetNewsletterSettings" />

<OAOperation operation-id="adminUpdateNewsletterSettings" />

## Mail

<OAOperation operation-id="adminGetMailSettings" />

<OAOperation operation-id="adminUpdateMailSettings" />

<OAOperation operation-id="adminSendTestMail" />

## Notification

<OAOperation operation-id="adminGetNotificationSettings" />

<OAOperation operation-id="adminUpdateNotificationSettings" />

## Policy

<OAOperation operation-id="adminGetPolicySettings" />

<OAOperation operation-id="adminUpdatePolicySettings" />

## SEO

<OAOperation operation-id="adminGetSeoSettings" />

<OAOperation operation-id="adminUpdateSeoSettings" />

## Integration

<OAOperation operation-id="adminGetIntegrationSettings" />

<OAOperation operation-id="adminUpdateIntegrationSettings" />

## System

<OAOperation operation-id="adminGetSystemSettings" />

<OAOperation operation-id="adminUpdateSystemSettings" />

<OAOperation operation-id="adminRebuildCache" />
