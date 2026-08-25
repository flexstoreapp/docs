---
title: Mail Settings
description: Configure how your store sends transactional emails directly from the admin panel.
---

# Mail Settings

Tell FlexStore how to send outgoing mail: order confirmations, password resets, abandoned checkout recovery, and every other notification. Find it under **Settings > Mail**.

Everything is configurable here without touching files on your server, and what you save in the admin panel always beats whatever your hosting provider set up. Any field you leave blank falls back to the server default, so you can override only what you need.

## Sender

**From address** is the address customers see as the sender. Most providers require it to be one you've verified with them, like `hello@yourstore.com`. An unverified address usually gets rejected or marked as spam.

**From name** is the display name beside it, usually your store name.

Both fields are pre-filled from your **Store email** and **Store name** in [Store Settings](/settings-store) if you haven't set them. Click **Save changes** to keep those or replace them first.

## SMTP Server

Your provider's dashboard or documentation has these.

**Host**: the server address, such as `smtp.mailgun.org` or `smtp.sendgrid.net`. The **Send test email** button only becomes available once this is saved.

**Port**: 587 with TLS is the most common choice, 465 goes with SSL, and 25 is unencrypted and rarely used today. When unsure, use 587.

**Encryption**: **TLS** is the modern standard and the safe default, **SSL** is the older one paired with port 465, and **None** should only be used if your provider explicitly says so.

**Username**: for many providers this is your full email address, though some issue a separate API username.

**Password**: your account password, or more often an app password or API key generated for outgoing mail. It's encrypted before being saved.

## Send Test Email

After saving your SMTP details, click **Send test email** in the page header. The dialog pre-fills your own address, which you can change, then click **Send**.

A successful test shows a brief **Test email sent** confirmation next to the button. A failure keeps the dialog open with the exact error your provider returned, so you can close it, fix the setting, save, and try again.

::: tip Common problems
- **Authentication failed**: check the username and password. Many providers need an app-specific password rather than your account password.
- **Connection refused** or **timeout**: check the host and port. Some hosts block outgoing SMTP ports until you ask support to open them.
- **From address rejected**: your provider only allows verified sender addresses. Verify yours or use one that already is.
:::
