---
title: Storefront Sections
description: How homepage sections work and how to add a new section type.
---

# Storefront Sections

The homepage is built from modular sections. Each has a type, settings stored as JSON, and optionally runtime data fetched when the page loads.

**Settings** are what the store owner configures: column count, layout, product limit. They live in the `settings` JSON column.

**Data** is content fetched at page load based on those settings, such as the actual product records. It's computed in `StorefrontHomepageDataQuery` and passed under a separate `data` key.

## Adding a Section Type

### 1. Add the enum case

```php
// app/Enums/StorefrontSectionType.php
case MySection = 'my_section';
```

### 2. Add validation rules

Add rules for your settings in both `StoreStorefrontSectionRequest` and `UpdateStorefrontSectionRequest`:

```php
'my_section' => [
    'settings.title' => ['nullable', 'string', 'max:255'],
    'settings.items_count' => ['required', 'integer', 'min:1', 'max:12'],
],
```

### 3. Enrich with runtime data, if needed

Sections that fetch data at render time need a match arm in `StorefrontHomepageDataQuery::enrichSectionsWithData()`:

```php
'my_section' => $section['data'] = $this->fetchMyData($section['settings']),
```

### 4. Resolve settings for admin, if needed

Settings that reference model IDs and need names or thumbnails in the admin builder need a match arm in `ResolveSectionSettingsQuery`.

### 5. Add the admin settings form

Create `resources/js/components/admin/storefront/my-section-fields.tsx` and register it in `section-form.tsx`.

### 6. Add the storefront component

Create `resources/js/components/homepage/my-section.tsx` and add it to the homepage page component.
