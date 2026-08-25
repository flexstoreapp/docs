---
title: Updates & Upgrades
description: How to apply a regular version update, and how to upgrade a free installation to a paid license.
---

# Updates & Upgrades

There are two different things "updating FlexStore" can mean: applying a routine patch to your current edition, or upgrading a free installation to a paid license. This page covers both.

## Regular Patch Updates

A patch update takes your store from one version to the next, for example v1.2.0 to v1.2.1, without changing which edition you're on.

### On a Paid License

Paid installations have a built-in updater under **Settings > System > Software Update**. It checks for new versions, and when one is available you upload the patch archive from your customer portal, review the changes, and apply it from the admin panel, no shell access needed. See [System Settings](/settings-system) for the full walkthrough, including the backup reminder and what to do afterwards if your server keeps PHP in memory (OPcache, Octane, or a similar setup).

### On the Free Edition

The free edition doesn't include the in-admin updater. To update it, download the latest release from GitHub and replace your installation's files with it the same way you would for a fresh [manual install](/developer/installation), keeping your `.env` file, `storage` folder, and database as they are, then install dependencies and build the front-end again.

::: warning
Back up your database and files before updating either edition.
:::

## Upgrading From Free to Pro

Buying a license doesn't flip a switch on your existing free installation. You get the paid edition's source code, and you install it over your free store the same way you'd apply any update: by replacing files, not by unlocking a hidden feature.

To upgrade:

1. **Get the paid edition's files** from your customer portal.
2. **Copy them over your existing installation**, keeping your `.env` file, `storage` folder, and database exactly as they are.
3. **Reload your server process** if your hosting keeps PHP in memory (see [Reloading Server Processes After an Update](/settings-system#reloading-server-processes-after-an-update)).
4. **Activate your license** under **Settings > System**, and turn on the paid features you want to use.

Once activated, your scheduled tasks, storefront, and admin panel keep running as normal, now with the full feature set available.
