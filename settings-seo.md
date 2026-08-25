---
title: SEO Settings
description: Improve your store's visibility in search engines by setting meta titles, descriptions, and indexing preferences.
---

# SEO Settings

Control how your store appears in search results, under **Settings > SEO**.

## Homepage Meta Title

The clickable headline in search results for your homepage, and the text in the browser tab. Leave it empty and the store name is used. Keep it clear, descriptive, and under 60 characters.

## Homepage Meta Description

The summary beneath the title in search results. It doesn't affect ranking directly, but a good one earns clicks. Stay under 160 characters and say what makes your store worth visiting.

## Search Engine Indexing

**Enabled** lets search engines crawl and index your store, which is what you want for a live public store. **Disabled** tells them to stay away, useful while you're still building or running on staging.

> Disabling indexing is an instruction, not a lock. It works only as far as search engines respect it.

## Sitemap

FlexStore publishes a sitemap at `/sitemap.xml` automatically, listing your homepage, the product, category, brand, and flash sale listing pages, and every active product, category, brand, and running flash sale. It updates itself as your content changes, so there's nothing to configure.

Submit the URL to tools like Google Search Console to get the most out of it.

## Robots File

A `robots.txt` file is served at `/robots.txt`. It points search engines to your sitemap and keeps private areas like the admin panel, cart, checkout, and account pages out of search results. Turning **Search Engine Indexing** off makes it tell every crawler to stay out entirely.

## Page-Level SEO

Everything on this page is about your homepage. Individual products, categories, and brands each have their own **SEO title** and **SEO description**, auto-filled from their name and description so they work out of the box, and editable from their admin pages.

See [Products](/products#seo), [Categories](/categories#adding-a-category), and [Brands](/brands#adding-and-editing-a-brand).
