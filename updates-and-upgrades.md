---
title: Updates
description: How to apply a version update to your store.
---

# Updates

A patch update takes your store from one version to the next, for example v1.2.0 to v1.2.1.

## Applying an Update

FlexStore has a built-in updater under **Settings > System > Software Update**. It checks for new versions, and when one is available you upload the patch archive from your customer portal, review the changes, and apply it from the admin panel, no shell access needed. See [System Settings](/settings-system) for the full walkthrough, including the backup reminder and what to do afterwards if your server keeps PHP in memory (OPcache, Octane, or a similar setup).

::: warning
Back up your database and files before updating.
:::

## Copy Files, Don't Replace Folders

If you ever apply an update by hand, copy the new files **into** your existing folders and let them overwrite matching files. Do not drag a folder onto an existing folder of the same name, and do not use a sync tool set to delete files that are missing from the source. Both of those remove your files first and put the new ones in their place, which deletes anything of yours that lives in the same folder.

This matters most if your store uses SQLite. Your whole database is a single file inside your installation, so replacing the folder that holds it destroys your store's data. New installations keep this file in the `storage` folder, which should always be preserved. If you installed an earlier version, check the `DB_DATABASE` line in your `.env` file to see where yours lives, and make sure that file survives the update.
