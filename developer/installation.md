---
title: Developer Installation
description: Set up a FlexStore development environment or deploy to a server using the command line.
---

# Developer Installation

Installing FlexStore from the command line, for development or manual server deployment.

## Requirements

- PHP 8.4 or newer
- Composer
- Node.js 20 or newer with npm
- MySQL 8+, MariaDB 10.6+, PostgreSQL 14+, or SQLite 3.35+

PHP extensions: bcmath, ctype, curl, dom, fileinfo, json, mbstring, openssl, pdo, tokenizer, xml, zip, plus the PDO driver for your database (`pdo_mysql`, `pdo_pgsql`, or `pdo_sqlite`).

## Setup

### 1. Install Dependencies

```bash
composer install
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
php artisan key:generate
```

Then configure `.env`.

**Timezone**, defaulting to `UTC`:

```dotenv
APP_TIMEZONE=America/New_York
```

**Admin panel path**, defaulting to `/admin`. Changing it means rebuilding the front-end assets, so read [Admin Path Prefix](/developer/admin-path) first:

```dotenv
ADMIN_PREFIX=control-panel
```

**Database**, MySQL/MariaDB:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=flexstore
DB_USERNAME=root
DB_PASSWORD=
```

PostgreSQL:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=flexstore
DB_USERNAME=postgres
DB_PASSWORD=
```

SQLite, where you create the file first with `touch database/database.sqlite`:

```dotenv
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

**Email**:

```dotenv
MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your-email@example.com
MAIL_PASSWORD=your-password
MAIL_FROM_ADDRESS=store@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

For local development, leave `MAIL_MAILER` as `log` to write emails into `storage/logs`, or point it at [Mailpit](https://github.com/axllent/mailpit) or [Mailtrap](https://mailtrap.io) to capture them.

**Queue**: FlexStore queues its emails (order confirmations, shipping updates, low stock alerts). `QUEUE_CONNECTION` defaults to `sync`, which processes jobs inline with no extra setup. To go asynchronous, switch it to `database`, `redis`, or `sqs` and run a worker with `php artisan queue:work`. Queued emails won't be delivered unless the worker is running.

### 3. Run Migrations and Seed

```bash
php artisan migrate
php artisan db:seed
```

The seeder creates a super admin (`admin@flexstore.app` / `password`), sample products, categories, customers, orders, and other demo content, and writes the `storage/installed` marker so the app skips the web installer.

Skipping the seeder means creating that marker yourself, otherwise every request redirects to the web installer:

```bash
php -r "file_put_contents('storage/installed', date('Y-m-d H:i:s'));"
```

And creating an admin account through Tinker:

```php
$user = App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@flexstore.app',
    'password' => 'password',
    'email_verified_at' => now(),
]);

$user->assignRole(App\Enums\Role::SuperAdmin);
```

### 4. Create the Storage Symlink

```bash
php artisan storage:link
```

### 5. Start the Development Server

Build assets with hot reload using `npm run dev`, then serve with whatever you prefer: Laravel Herd, Valet, or the built-in server.

```bash
php artisan serve --no-reload
```

`--no-reload` matters if you plan to go through the web installer. By default `artisan serve` watches `.env` and restarts when it changes, and the installer rewrites `.env` mid-request to save your database credentials, which triggers a restart before the response can be sent and leaves the browser with nothing. Disabling the watcher lets the installer finish cleanly.

FlexStore also ships with Laravel Octane if you want it:

```bash
php artisan octane:start
```

The default driver is FrankenPHP, changeable through `OCTANE_SERVER` in `.env`.

## Production Deployment

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
```

Then install, build, and optimize:

```bash
composer install --no-dev --optimize-autoloader
npm run build

php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### Queue Worker

Keep the worker alive with a process manager like [Supervisor](https://laravel.com/docs/queues#supervisor-configuration):

```bash
php artisan queue:work --sleep=3 --tries=3 --max-time=3600
```

### Scheduler

Run the Laravel scheduler every minute via cron:

```
* * * * * cd /path/to/flexstore && php artisan schedule:run >> /dev/null 2>&1
```
