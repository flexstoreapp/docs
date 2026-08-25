---
title: Products
description: Add, manage, and organize your product catalog in FlexStore.
---

# Products

Products are where you add items for sale, set prices, manage stock, and control what customers see in your storefront. Go to **Admin Panel > Products**. Related catalog tools live under the same menu: [Inventory](/inventory) and [Search synonyms](/search-synonyms).

## Product List

Each row shows the product thumbnail, title, SKU, price (or price range if it has variants), total stock, and active status.

### Searching and Filtering

The filter bar at the top lets you filter by:

- **Search**: any part of a product title or SKU.
- **Category**: show only products in one category.
- **Stock status**: In stock or Out of stock.
- **Status**: Active or Inactive.

Click any column header (Product, SKU, Price, or Stock) to sort.

### Bulk Delete

Check the box next to each product you want to remove and a toolbar appears with a **Delete** button. Deletion is permanent, so you'll be asked to confirm first.

> With products selected you can also press **Cmd+Backspace** (Mac) or **Ctrl+Backspace** (Windows/Linux).

## Adding a Product

Click **Add product** in the top-right corner.

### Product Type

Every product is either **Physical** or **Digital**, chosen at the top of the form. Physical products are shipped and show the Inventory and Shipping sections. Digital products are downloaded, so those two sections are replaced by **Digital files**. You can change the type later.

### Basic Information

- **Title**: the product title shown in your store.
- **Description**: the full product description, written in a rich text editor.
- **Category**: click the field to open a searchable picker. You can clear it at any time.
- **Brand**: optional, also chosen through a searchable picker.

### Media

Drag image files onto the upload area or click **Add images** to browse. JPG, PNG, WEBP, BMP, and GIF are supported.

The first image in the list becomes the featured image. Drag images to reorder them, or hover one and click the remove button to delete it.

The gallery stays in place when a product has variants. A variant can also carry its own image, which replaces the featured image once a customer selects that variant.

### Pricing

- **Price**: the selling price customers see.
- **Compare-at price**: an optional crossed-out price shown next to the current one to signal a discount.
- **Cost per item**: your internal cost, never shown to customers. Enter it alongside the price and the **Profit** and **Margin** fields fill in automatically. Cost also feeds the [Profit & margin report](/reports#profit-margin), so keeping it accurate tells you which products actually make money.

Products with variants set pricing on each variant instead.

### Variants

Variants let you sell versions of the same product, such as a t-shirt in several sizes and colors.

Click **Add option**, name the option ("Size", "Color"), then add its values ("Small", "Medium", "Large"). Add as many options as you need and FlexStore generates every combination as a variant.

Once variants exist, the product-level pricing and inventory sections are replaced by per-variant controls, and a **default variant** selector chooses which one is pre-selected on the storefront. Leave it empty to show a price range instead, letting shoppers pick their own options. Variant details live in four tabs:

- **Pricing**: price, compare-at price, and cost per item.
- **Inventory**: SKU, barcode, stock tracking, current stock, and low stock threshold.
- **Shipping**: weight (with unit) and optional dimensions.
- **Media**: an optional image shown when that variant is selected.

The row at the top of each tab applies a value to every variant at once.

### Inventory

For products without variants:

- **SKU**: a stock-keeping unit code, unique across your store.
- **Barcode**: an ISBN, UPC, GTIN, or similar value.
- **Track stock**: counts stock down as orders come in. Enabling it reveals **Stock** (current quantity) and **Low stock threshold** (leave blank to use the store default).
- **In stock**: a manual toggle that overrides the tracked quantity.

### Shipping

- **Weight**: the weight and its unit (kg, g, lb, or oz), used to calculate shipping rates.
- **Dimensions**: length, width, and height with a unit (cm, mm, or in). Dimensions make live carrier rates more accurate, because FlexStore can estimate how many packages a cart needs instead of assuming one. Products without dimensions are treated as filling a whole [default package](/settings-shipping#packages).
- **Country of origin**: where the product was made.
- **HS code**: the Harmonized System tariff code, such as `6109.10`.

Country of origin and HS code only matter for international orders. They go on the carrier's customs declaration so the destination country can identify the goods, apply the right import duties, and clear the parcel faster. When a product has no country of origin, the store-wide [Default country of origin](/settings-shipping) is used; if that's blank too, none is sent and the carrier may refuse the international shipment. A blank HS code is simply left off.

Weight and dimensions live in the Shipping card for products without variants, and in each variant's Shipping tab otherwise. Country of origin and HS code are always product-wide.

### Digital Files

This section appears for digital products only and holds the files customers download after buying.

Drag files onto the upload area or click **Add files**. There's no limit on how many, only the file size limit shown on the upload area. Common archives (ZIP, RAR), documents (PDF, EPUB, office files), audio, video, images, and fonts are supported.

That limit comes from your server rather than FlexStore: it's the lower of PHP's `upload_max_filesize` and `post_max_size` values. The same limit applies to product images and CSV imports.

> To raise it, ask your host to increase both values and restart PHP. On Nginx servers, `client_max_body_size` has to be raised to match.

For each file you can rename it (the name customers see, defaulting to the original filename), assign it to a specific variant or leave it on **All variants**, and drag it to reorder.

Two settings below the files control access:

- **Download limit**: how many times each file can be downloaded. Blank means unlimited. Buying more than one of the product multiplies the limit by the quantity.
- **Download expiry (days)**: how long the links stay active after purchase. Blank means they never expire.

Files are stored securely and reachable only through the private links given to the buyer.

Delivery is automatic once payment goes through, so there is nothing to fulfill by hand. Links are emailed and also appear in the customer's storefront account under **Downloads** and on the order page. A cart containing only digital products skips the shipping step at checkout and asks for a billing address only.

### Shopping

These fields are for Google Shopping and Facebook or Instagram Shop. They do not appear on your storefront.

- **Include in catalogs**: on by default. Turn it off to keep the product in your store but out of Google and Meta. The other shopping fields are shown only when this is on.
- **Condition**: New, Refurbished, or Used. Most products stay New.
- **Age group** and **Gender**: optional. Use them for clothing so ads and shops can match the right audience.
- **Adult**: check this only when the product is adult-only.

Products still need a price and at least one image to appear in a catalog. If there is no description, the title is sent instead. Connect the catalogs under [Settings > Integration](/settings-integration).

### Tax Settings

- **Tax exempt**: check this to skip tax on the product at checkout.
- **Tax category**: for non-exempt products, pick one from the built-in list, such as Standard, Clothing & apparel, or Digital services. The list is fixed, but each category can have its own rate in your [tax settings](/settings-taxes).

### SEO

- **SEO title**: the page title in search results, auto-filled from the product title, up to 70 characters.
- **SEO description**: the summary under the title in search results, auto-filled from the description, up to 160 characters.
- **URL handle**: the address of the product page, such as `blue-denim-jacket`. Generated from the title and editable. Use lowercase letters and numbers only, with single hyphens between words: no spaces, capitals, punctuation, or a hyphen at the start or end.

### Status

**Active** controls whether the product is visible and purchasable. Uncheck it to hide a product without deleting it. New products start active.

### Saving the Product

Click **Add product** to save. Checking **Add more** first keeps you on a blank create form afterwards so you can keep adding products.

## Editing a Product

Click a row in the product list. The form is identical to the create form, and the header shows when the product was last updated. Click **Update product** to save.

## Duplicating a Product

While editing, click **Duplicate** near the top right. The dialog lets you:

1. **Set a title**, defaulting to the original with "(copy)" appended.
2. **Set the initial status**, active or inactive.
3. **Choose what to copy**: category, brand, media, pricing, tax settings, inventory, SKUs, barcodes, shipping, SEO, and digital files. SKUs and barcodes are unchecked by default to avoid conflicts.

Only sections the original actually has can be copied. Clicking **Duplicate** creates the product and opens its edit page.

## Importing Products via CSV

### Starting an Import

Click **Import** on the Products page. If you don't have a file ready, **Download CSV template** gives you a sample with the expected column headers.

### Upload Step

Drag your `.csv` file onto the upload area or click to browse, then click **Upload and preview**. FlexStore reads the headers and tries to match them to product fields.

A CSV can set the product type and the download limit and expiry, but not the digital files themselves. Upload those on the product page after importing.

### Mapping Columns

You'll see a preview of the file next to a mapping panel listing each CSV column with a dropdown for the product field it maps to. Fix any wrong guesses here, and leave columns you don't want unmapped.

### Import Settings

Choose what happens when a product with the same URL handle already exists:

- **Update existing products**: overwrite the match with the CSV values.
- **Add new products**: always create new records, giving conflicting URL handles and SKUs a unique suffix.

### Confirming the Import

Click **Import**. FlexStore processes the file in batches and shows progress, then a summary of how many products and variants were created or updated, any categories and brands created automatically from CSV values, and anything that went wrong.

Every problem is labelled with its CSV row number:

- **Warnings** mean the row imported but one value couldn't be read and was skipped, such as a price that isn't a number or an unrecognised weight unit.
- **Errors** mean the row was skipped entirely, usually because a required value like the title is missing or the data conflicts with your catalog (a duplicate SKU, for instance).

Fix the flagged rows and import again, or click **Import another file** to start over.

## Exporting Products

Click **Export** on the Products page and choose a scope:

- **All products**: your entire catalog.
- **Current page**: only the products on the page you're viewing.
- **Selected products**: only the ones you've checked.
- **Filtered products**: only those matching your current search and filters.

Click **Export** in the dialog to download immediately. The filename includes the scope and a timestamp.
