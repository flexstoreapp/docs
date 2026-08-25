---
title: System Settings
description: Manage maintenance mode, cache, and software updates from the admin panel.
---

# System Settings

Tools for your store's availability, performance, and software updates, under **Settings > System**.

## Maintenance Mode

Maintenance mode shows customers a maintenance page instead of your storefront, which is what you want during a major update or content migration. The admin panel stays fully accessible so you can keep working, and a warning banner reminds you the storefront is down.

Check **Take the storefront offline** to enable it, and uncheck it to go live again.

**Allowed IP addresses** whitelists people who should still reach the storefront during maintenance, like your team or a client reviewing changes. Enter one IPv4 or IPv6 address per line. Invalid entries are flagged when you save.

## Cache

Your store caches data to stay fast. If changes aren't taking effect, click **Rebuild cache** and confirm. That clears and rebuilds everything including configs, routes, and views, and the site may run slower for a moment afterwards.

## Software Update

Update your FlexStore installation from the admin panel without shell access. Your current version is shown at the top of the section.

::: warning
Back up your database and files before applying an update.
:::

**To upload a patch**, get the `.zip` archive for your version, choose it with the file selector, and click **Upload patch**. FlexStore validates it and shows a preview with the target version, release notes, warnings, and any new environment variables you'll need to add yourself.

**To apply it**, add any listed `.env` variables to your server first, then click **Apply update** and confirm. FlexStore copies the files, runs migrations, and clears the cache, and the page refreshes with the new version number.

If something fails, the error tells you which step. Your previous files aren't rolled back automatically, which is exactly why the backup matters.

**Cancel** discards a pending update and removes the uploaded patch. You can upload it again whenever you want.

### Reloading Server Processes After an Update

FlexStore copies new files and clears its own cache, but it can't restart services running on your server. If your hosting uses OPcache or keeps the application in memory between requests, the old code keeps running until you reload the relevant process. The tell-tale signs are missing new features or errors about classes and methods that were renamed.

On managed hosting, the control panel's **Restart PHP** or **Reload PHP Workers** action is usually enough. cPanel, Plesk, Forge, Ploi, RunCloud, and CloudPanel all have one.

If you manage the server yourself, reload whichever applies:

- **PHP-FPM**, the most common setup. OPcache keeps compiled PHP in each worker's memory, so workers run old bytecode until reloaded. Run `sudo systemctl reload php8.4-fpm`, adjusting for your PHP version, or `service php-fpm reload` without systemd.
- **Apache with mod_php**: PHP runs inside Apache, so reloading Apache flushes OPcache. Run `sudo systemctl reload apache2` or `sudo systemctl reload httpd`.
- **FrankenPHP**: the worker holds the application in memory, so restart the FrankenPHP service.
- **Laravel Octane** (Swoole, RoadRunner, or FrankenPHP): Octane boots once and stays in memory, ignoring updated files until workers restart. Run `php artisan octane:reload`, or restart the service if you manage it through systemd or Supervisor.
- **Laravel Horizon**: run `php artisan horizon:terminate` to stop the master process gracefully, and Supervisor restarts it with the new code. Without a process manager, start it again yourself with `php artisan horizon`.
- **Scheduler**: nothing to do. Cron runs it fresh every minute, so it always picks up new code.

### Update History

The five most recent updates are listed at the bottom of the section with their version number, release notes, and the date applied.
