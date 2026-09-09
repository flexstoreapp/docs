---
title: Homepage
description: The merchandising sections a merchant configured for the home screen, and how to render them.
outline: 2
---

# Homepage

The sections the merchant configured for the home screen, in display order, so an app can mirror the storefront instead of hardcoding a layout.

<OAOperation operation-id="getHomepage" />

## Rendering the sections

```json
{
  "data": [
    {
      "id": 3,
      "type": "hero_slider",
      "title": "Winter picks",
      "settings": { "slides": [] }
    }
  ]
}
```

Switch on `type` and render the sections you support. Skipping one is fine; the merchant simply won't see it in the app.

| Type | Content |
| --- | --- |
| `hero_slider` | `slides`, plus optional `side_tiles` |
| `promo_banners` | `banners` |
| `category_grid` | `categories`, each resolved with its name and handle |
| `brand_strip` | `brands` |
| `featured_products`, `product_carousel`, `deal_of_the_day` | `products`, plus `end_date` and `show_countdown` for the deal |
| `product_tabs`, `product_columns` | `tabs` or `columns`, each with its own `products` |
| `blog_posts` | `posts` |
| `info_strip` | `items`, each with an `icon_name` |
| `testimonials` | `testimonials` |
| `newsletter` | Copy only; post to `/newsletter/subscribe` |

## What the API resolves for you

Text is returned in the requested locale, not as a map. Images are media objects with `url` and thumbnails, never raw ids. Product and post references are expanded into full cards, so no follow-up request is needed to draw a section.

## Links

Every link field is accompanied by a resolved target: `url` by `target`, `view_all_url` by `view_all_target`, `button_url` by `button_target`.

```json
{
  "url": "/categories/knitwear",
  "target": { "type": "category", "handle": "knitwear" }
}
```

Switch on `target.type` to navigate natively:

| Type | Payload | Goes to |
| --- | --- | --- |
| `home` | | The home screen |
| `shop` | `query` | The shop listing, with any filters carried over |
| `search` | `query` | Search results |
| `categories`, `brands`, `flash_sales`, `blog` | | The matching index |
| `category`, `brand`, `product`, `flash_sale`, `post` | `handle` | That record |
| `cart`, `checkout`, `account` | | The matching screen |
| `policy` | `policy` | The matching page from `/policies/{policy}` |
| `external` | `url` | An absolute URL, open it outside the app |
| `url` | `url` | An unrecognised storefront path, open it in a web view |

Anything the API cannot classify arrives as `url`, so there is always a working fallback. The raw string is always present alongside the target.

## Presentation hints

`text_align`, `text_color`, `autoplay`, `autoplay_speed`, `transition`, `show_dots` and `grayscale` describe how the web storefront renders a section. Apply them if they map onto your UI, ignore them otherwise.

`icon_name` is a stable identifier such as `shipping` or `returns`. Map it to your own icon set.
