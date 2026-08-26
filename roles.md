---
title: Roles
description: Define roles, assign permissions, and control what each staff member can access in the admin panel.
---

# Roles

A role is a named group of permissions that you assign to [staff](/staff). Permissions always live on roles and can never be set on an individual user.

## Viewing the Role List

Go to **Roles** in the System group of the sidebar. Each role shows its name, permission count, and how many users hold it. Search by name and sort by name or creation date.

## Adding a Role

1. Click **Add role**.
2. Enter a **Role name** that reflects the responsibility, like "Content Editor" or "Order Manager".
3. Check the permissions you want in the **Permissions** panel. They're grouped by area (Orders, Products, Customers, and so on), and the search box finds a specific one quickly. **Select All** and **Deselect All** handle the extremes.
4. Click **Add role**.

Check **Add more** before saving to create several roles in a row.

## Editing a Role

Click a role to open its edit page, rename it or change its permissions, then click **Update role**. Changes apply immediately to every user holding that role.

## Deleting Roles

Select roles with the checkboxes and click **Delete**, then confirm. The users assigned to a deleted role aren't deleted, but they lose whatever access that role gave them.

## Permissions Reference

Most groups follow a **View**, **Manage**, **Delete** pattern: View shows the list and opens records, Manage covers adding and editing, Delete removes them. Some groups add more actions.

| Group | Actions | What it controls |
|---|---|---|
| **Dashboard** | View | The main dashboard and summary stats |
| **Orders** | View, Manage, Refund, Fulfill, Cancel | The order list, adding and editing orders, refunds, fulfillment, and cancellation |
| **Abandoned Checkouts** | View, Manage | The abandoned-checkout list and manual recovery emails |
| **Products** | View, Manage, Delete | The product catalog, including variants, images, and stock |
| **Inventory** | View, Manage | Inventory levels and stock adjustments with reason logging |
| **Categories** | View, Manage, Delete | Product categories |
| **Brands** | View, Manage, Delete | Product brands |
| **Blog Posts** | View, Manage, Delete | Writing, scheduling, and publishing posts |
| **Coupons** | View, Manage, Delete | Discount coupons |
| **Flash Sales** | View, Manage, Delete | Flash sale campaigns |
| **Customers** | View, Manage, Delete | Customer accounts, addresses, and order history |
| **Reviews** | View, Manage, Delete | Moderating product reviews |
| **Staff** | View, Manage, Delete | Admin staff accounts |
| **Roles** | View, Manage, Delete | Roles and their permissions |
| **Regions** | View, Manage, Delete | Regions used by shipping, tax, and payments |
| **Reports** | View | Sales, order, product, customer, and marketing analytics |
| **Storefront** | View, Update | The storefront builder: homepage, menus, theme, and the rest |
| **Settings** | Configure (per area) | Individual settings pages, listed below |

Shipping carriers and rates, tax rates, and currencies have no separate permission group. They're managed inside their settings pages under the matching **Shipping configure**, **Tax configure**, and **Currency configure** permissions.

### Settings Permissions

Each settings page has its own **Configure** permission, and granting one grants nothing else.

| Permission | What it controls |
|---|---|
| **General configure** | General settings such as default locale and time zone |
| **Store configure** | Store details, branding, contact info, address, social links |
| **Language configure** | Available locales and the default language |
| **Currency configure** | Base currency and display preferences |
| **Shipping configure** | Shipping configuration |
| **Tax configure** | Tax configuration |
| **Payment configure** | Payment gateway configuration |
| **Checkout configure** | Guest checkout, checkout sharing, and payment timing |
| **Newsletter configure** | Newsletter subscription and integration settings |
| **Notification configure** | Customer and admin email notification toggles |
| **Policy configure** | Privacy policy, refund policy, terms of service |
| **SEO configure** | SEO defaults, meta tags, sitemap |
| **Integration configure** | Third-party integration credentials |
| **System configure** | System-level options such as cache and maintenance |

### How Permissions Control Access

Without the **View** permission for an area, that section is hidden entirely and can't be reached even by typing the URL. With View alone, a user can browse lists and open records but change nothing. **Manage** allows adding and editing, and **Delete** allows removal.

A user with only **View orders** can read the list and open order details, but editing needs **Manage orders**, refunds need **Refund orders**, cancellation needs **Cancel orders**, and shipments need **Fulfill orders**.

### Access to Pickers Is Automatic

Some forms reference other resources: attaching a customer or products to an order, choosing a category and brand for a product. You don't need to grant separate view permissions for those pickers. A role that can manage a form is automatically allowed to search and select what the form needs, so **Manage orders** can look up customers and products without **View customers** or **View products**. That keeps roles focused on what someone actually does instead of forcing broad view access just to make forms usable.

### The Super Admin Role

The Super Admin is the account created when the app is first installed. It has unrestricted access and bypasses permissions entirely. There is exactly one, no more can be created, and it doesn't appear in the Staff list.
