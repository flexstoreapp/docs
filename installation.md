---
title: Installation
description: Step-by-step guide to installing FlexStore using the built-in web installer.
---

# Installation

FlexStore has a built-in web installer that walks you through setup in five steps. No technical knowledge needed, just a browser.

## Before You Begin

You need a web server with PHP and a database ready. Managed hosting will have set this up for you already. If you're building the server yourself, use the [Developer Installation](/developer/installation) guide instead.

Open your FlexStore URL in a browser and a fresh installation redirects you straight to the installer.

## Step 1: Requirements Check

The installer checks your server against what FlexStore needs.

**PHP version**: 8.4 or newer. Your current version is shown alongside the minimum.

**PHP extensions**: bcmath, ctype, curl, dom, fileinfo, json, mbstring, openssl, pdo, tokenizer, xml, and zip must all be installed and enabled. Anything missing needs your hosting provider to enable it.

**Database drivers**: at least one of MySQL/MariaDB, PostgreSQL, or SQLite. You only need the driver for the database you'll actually use.

**Write permissions**: certain directories and files must be writable. Fix any flagged permissions on your server before continuing.

Once everything passes, click **Continue**.

## Step 2: Database

Pick your database type and enter the connection details.

For **MySQL/MariaDB or PostgreSQL**: the **host** (usually `127.0.0.1` or `localhost`), the **port** (filled in automatically, 3306 for MySQL and 5432 for PostgreSQL), the **database name** you created, and the **username** and **password** of a user with access. Leave the password blank if there isn't one.

For **SQLite**: just a **database filename**, defaulting to `database.sqlite`. The file is created in the `storage` folder if it doesn't exist, which keeps it out of the way when you update the software later.

### Demo Data

Tick **Install demo data** to fill the store with example content: around a hundred products across 22 categories, plus brands, customers, reviews, blog posts, coupons, shipping and tax rates, and a fully built homepage. It's the quickest way to see how everything fits together before you add your own catalog.

Demo content includes no example orders, abandoned checkouts, or storefront traffic. None of those can be deleted once they exist, so fake ones in a store you might really sell from would permanently distort your revenue, order numbers, tax reports, recovery rate, and conversion figures. Your dashboard and reports stay empty until your first real order and your first real visitor, which is exactly what a new store should show.

It also includes example staff and customer accounts, but no administrator, since you create the only one yourself in the next step. Every example account gets a random password during installation, so none of them can be logged into. They exist purely to give the sample reviews and wishlists a believable owner.

Leave it unticked for a clean, empty store. Change your mind later and you can delete the demo content from the admin panel, or reinstall against a fresh database.

Click **Connect & Migrate** to test the connection and build the tables. A failure means the credentials need another look. With demo data on, this step takes a little longer while the content and images are copied in.

## Step 3: Admin Account

Create the first administrator, which has full access to everything. Enter your **name**, the **email** you'll log in with, and a strong **password**, confirmed twice. Click **Create Account**.

## Step 4: License

Enter the license key from your purchase email and click **Activate license**. This reserves one of your plan's live domains for this store's address.

The step is skipped automatically on your own computer or a test address such as `localhost` or any `.test` domain, since no key is needed there.

If activation fails, the page says why: a mistyped key, every domain on your plan already in use, or your server unable to reach the licensing service. Out of domains means releasing one in your Polar customer portal or upgrading your plan, then trying again.

## Step 5: Finalize

Pick your store's **timezone**, which sets how dates and times display throughout the store. UTC is the default.

The installer then switches the application to production mode, disables debug mode, sets the application URL, creates the public storage symlink, and caches configuration, routes, and views for performance.

Click **Complete Installation** and you land on the admin login page.

## After Installation

The installer disables itself once it finishes, so nobody can run it again. Log in and start setting up. See the [Introduction](/introduction) for a tour.

## Email

FlexStore sends order confirmations, password resets, and other notifications. Configure an SMTP server in **Settings > Mail**, where the [Mail Settings](/settings-mail) page explains each field and a **Send test email** button confirms it works.

To set credentials at the server level instead, edit your `.env` file. Values saved in **Settings > Mail** always take priority, and blank fields there fall back to the matching `.env` value.

The keys are:

- **MAIL_MAILER**: set to `smtp`.
- **MAIL_HOST**: the SMTP server address from your email service.
- **MAIL_PORT**: commonly `587` for TLS or `465` for SSL.
- **MAIL_USERNAME**: your account username or full email address.
- **MAIL_PASSWORD**: your account password or an app-specific password.
- **MAIL_SCHEME**: optional, `tls` or `ssl`. Leave it empty and the right encryption is chosen from the port.
- **MAIL_FROM_ADDRESS** and **MAIL_FROM_NAME**: the sender address and display name.

After editing `.env`, go to **Settings > System** and click **Rebuild cache**. That's only needed for `.env` changes; values saved through **Settings > Mail** apply immediately.

## Scheduler (Optional)

A background scheduler runs periodic tasks. It's optional, and the only thing that needs it today is [abandoned checkout recovery emails](/abandoned-checkouts), which the scheduler dispatches. Without the cron job, only the manual **Send recovery email** button works.

Ask your hosting provider to add a cron job that runs every minute:

```
* * * * * cd /path/to/flexstore && php artisan schedule:run >> /dev/null 2>&1
```

Replace `/path/to/flexstore` with the real path on your server. Your host's support team can help if you're unsure.
