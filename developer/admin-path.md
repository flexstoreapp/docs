---
title: Admin Path Prefix
description: How to serve the FlexStore admin panel from a URL other than /admin.
---

# Admin Path Prefix

The admin panel lives at `/admin` by default. One environment variable moves it somewhere else, such as `/control-panel` or `/manage`.

## Changing the Prefix

Add `ADMIN_PREFIX` to your `.env`:

```
ADMIN_PREFIX=control-panel
```

Then clear the cached config **before** rebuilding the front-end assets:

```bash
php artisan optimize:clear
npm run build
```

The order matters. The build reads your Laravel config to generate the front-end route helpers, so a stale config cache bakes the old prefix into the new bundle.

The admin panel is then reachable at `/control-panel`, and `/admin` no longer resolves.

## The Rebuild Is Required

FlexStore generates typed route helpers at build time, and every admin URL ends up in that generated code as a literal string. Skip the rebuild and the browser-side code still points at the old path, so navigation breaks.

Always run `npm run build` after changing `ADMIN_PREFIX`. That's also why the prefix is an environment variable rather than an admin panel setting: it can't be changed safely at runtime.

::: danger You can lock yourself out
Changing the prefix on a server that can't run `npm run build`, such as a shared host with no Node.js or a deployment of prebuilt assets, makes the admin panel unreachable. The login page renders, but submitting it fails because the form still points at the old path. You can't undo it from the admin panel, only by editing `.env` over SSH or FTP and clearing the cache.

Test the change on a staging copy first, or make sure you have file-level access before you start.
:::

## What It Does and Does Not Protect

Moving the admin panel off `/admin` is not access control. It hides the door without locking it, and a determined attacker will find the new path anyway, since it appears in every link on the page once anyone is logged in and in any password-reset email you send. Treat it as tidying, not security.

Your `robots.txt` deliberately doesn't mention the admin path, since that file is public and is the first thing most scanners read.

Keep the protections that actually matter: strong passwords and two-factor authentication on every staff account, roles that grant only what each user needs, and HTTPS across the whole site. See [Security](/security) for what the admin panel offers.

## Choosing a Prefix

Use a single path segment of letters, numbers, hyphens, and underscores, starting with a letter or number. Leading and trailing slashes are ignored, so `/manage/` and `manage` behave identically.

Prefixes that collide with a storefront URL (`products`, `cart`, `checkout`, `account`, and the like) are rejected outright, and the site reports the error rather than starting with a broken storefront. Pick something distinctive.
