---
title: Account
description: Manage your own admin profile, password, and security settings including two-factor authentication and passkeys.
---

# Account

The Account area is for your own admin login, as opposed to [Staff](/staff), which is for managing everyone else. Open it by clicking your name at the bottom of the sidebar and choosing **Account**. It has three tabs: **Profile**, **Password**, and **Security**.

## Profile

Update your **Full name** or **Email address** and click **Save profile**. Your email is also your username, so changing it changes how you log in.

## Password

Enter your **Current password** to confirm it's you, then a **New password** twice, and click **Save password**.

Pick something long and random and keep it in a password manager. For stronger protection, add two-factor authentication or a passkey from the Security tab.

## Security

Since these settings control how you log in, opening the tab asks you to confirm your identity again, either with your password or a passkey. That stops anyone who finds your session unattended from changing them.

### Two-Factor Authentication

With 2FA on, logging in needs a six-digit code from an authenticator app as well as your password.

**To enable it:**

1. Click **Enable 2FA**.
2. Scan the QR code with your authenticator app (Google Authenticator, Authy, or anything TOTP-compatible). If you can't scan it, copy the manual setup key below the code into the app instead.
3. Click **Continue**, enter the six-digit code from the app, and click **Confirm**.

**Recovery codes** get you back in if you lose your authenticator device. Click **View recovery codes** to reveal them and store them somewhere safe, like a password manager. Each code works once and disappears after use. **Regenerate codes** issues a fresh set and invalidates the old ones, which is worth doing when you're running low or think the codes may be compromised.

**To turn it off**, click **Disable 2FA** and you're back to password-only login.

### Passkeys

A passkey signs you in without a password, verifying you with the same method you use to unlock your device: fingerprint, face recognition, screen lock PIN, or a hardware security key. They're phishing-resistant and can't be reused across sites, which makes them safer than passwords.

**To add one:**

1. Scroll to the **Passkeys** section and click **Add passkey**.
2. Name it so you recognise it later ("MacBook Pro", "Work iPhone"), then click **Add passkey** again.
3. Confirm with your fingerprint, face, device PIN, or security key when your browser prompts you.

The passkey then appears in the list with its device type and creation date. Registering more than one is worth doing so you keep a backup on a second device.

Passkeys need a browser and device that support them. Where support is missing, a message replaces the **Add passkey** button.

**To log in**, click **Log in with a passkey** below the login form, choose your passkey, and confirm with your device. No password or 2FA code is needed, because the passkey already proves who you are and that you hold the device.

**To remove one**, find it in the list, click the trash icon, and confirm. It can't be used to log in afterwards.
