---
title: Translating the Interface
description: Translate FlexStore's buttons, labels, messages, and other interface text into a new language.
---

# Translating the Interface

FlexStore's own text (buttons, labels, headings, error messages) can be translated into any language. That's separate from [translating your content](/translating-content), which happens in the admin panel.

Interface translations are JSON files in the `lang/` folder, split into three groups with one file per language:

| Folder | What it contains |
| --- | --- |
| `lang/common/` | Text shared by the storefront and the admin panel |
| `lang/storefront/` | Storefront-only text |
| `lang/admin/` | Admin-panel-only text |

English (`en.json`) ships in each folder. The split keeps pages light, since a shopper's browser only downloads the storefront and shared text, never the admin panel's.

## Adding a New Language

### Step 1: Copy the English Files

Copy `en.json` in each of the three folders and rename each copy to the language code you're adding. For French:

```
lang/common/en.json      →  lang/common/fr.json
lang/storefront/en.json  →  lang/storefront/fr.json
lang/admin/en.json       →  lang/admin/fr.json
```

To translate the storefront only, start with `lang/common/fr.json` and `lang/storefront/fr.json`. Any file you skip falls back to English.

Common codes: `ar`, `fr`, `de`, `es`, `pt`, `it`, `ja`, `ko`, `zh`, `tr`, `nl`, `ru`.

### Step 2: Translate the Values

Open each file in a text editor. Translate the values on the right, never the keys on the left:

```json
{
    "Add": "Ajouter",
    "Edit": "Modifier",
    "Delete": "Supprimer",
    "Save changes": "Enregistrer les modifications"
}
```

Text inside each file is arranged in blocks separated by blank lines, following the areas of the app: general wording first, then onboarding, login, reports, catalog, products, orders, checkout, payments, and so on, with the framework's validation messages last. Lines within a block are alphabetical.

Leave the lines where they are. Translating top to bottom then means working through one area of the app at a time, and your file stays lined up with the English one so you can compare them side by side and spot anything you missed.

Some strings contain placeholders like `:name`, `:count`, or `:size` that are filled in at runtime. Keep them exactly as they appear:

```json
{
    "File \":name\" exceeds the maximum size of :size.": "Le fichier \":name\" dépasse la taille maximale de :size."
}
```

#### Letting AI Do the First Pass

Hand-typing thousands of lines is slow, and an AI assistant such as ChatGPT or Claude handles it well. Upload one file at a time, or paste a few hundred lines if the file is too big, and ask for something like:

> Translate this JSON file into French. Translate only the values, keep the keys exactly as they are, keep placeholders like `:name` and `:count` untouched, keep the same line order and blank lines, and return valid JSON.

Save the result back over the file, then read through it. AI translations get most of the way there but tend to slip on brand names, industry wording, and the tone you want on your storefront, so treat the output as a draft you review rather than a finished translation.

### Step 3: Enable the Language

Go to **Settings > Language**, where your new language appears automatically. Check it and click **Save changes**. With more than one language enabled, a switcher appears on both the storefront and the admin panel.

## Keeping Translations Up to Date

Updates change the English files in two ways: they add strings, and they remove or reword ones the app no longer uses. Neither breaks anything. A key you're missing shows in English until you translate it, and a key you kept that the app no longer asks for is simply never read. Edits take effect as soon as you save.

Because your file keeps the same key order and blank-line blocks as `en.json`, comparing the two files shows both sides at once: lines only in the English file are new keys to translate, and lines only in yours are leftovers to delete. Pick whichever of these fits how you work:

**Read the release notes.** Updates that add a noticeable amount of interface text say so, which tells you whether it's worth doing a pass at all.

**Compare the two files side by side.** Open `en.json` and your language file in an editor that shows two files at once, or paste both into a free online text-comparison tool. Lines that exist only in the English file are your new keys; lines that exist only in yours have been dropped from the app. This works because both files are in the same order, so the differences line up instead of scattering.

**Look for untranslated English in your file.** Search your file for the new wording you saw in the admin panel or storefront. If a key was added by copying the newest `en.json` over your file, the untranslated entries are the ones whose value still reads as English.

**Ask an AI assistant.** Upload both `en.json` and your language file and ask it to list the keys the English file has that yours doesn't, and the keys yours has that the English file doesn't, then to translate the new ones and give you the lines to paste in. This is the quickest route on a large update.

Add each new key in the same position it occupies in `en.json`, inside the same block and in the same alphabetical spot, then delete the leftovers. Removing them is optional housekeeping rather than a fix, but it keeps the two files aligned, which is what makes the next update easy to check.

## Tips

- You don't need to translate everything at once. Missing strings fall back to English, so start with the most visible ones.
- Keep every file valid JSON. One missing comma breaks the whole file, so run it through a JSON validator if you're unsure.
- Each string lives in exactly one of the three folders, so there's nothing to keep in sync between them.
- Language files live outside the database, so include them in your version control or backups.
