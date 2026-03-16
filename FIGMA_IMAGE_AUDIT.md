# Figma Image Audit

**Project**: Nathan Wituk Portfolio
**Date**: March 16, 2026
**Purpose**: Track all temporary Figma CDN image URLs that will expire ~7 days after generation.

> These URLs follow the pattern `https://www.figma.com/api/mcp/asset/<uuid>` and must be replaced with local assets before launch.

---

## Summary

| Metric | Count |
|---|---|
| Total Figma CDN image references | 7 |
| Unique Figma CDN image URLs | 6 |
| Source files affected | 3 |
| Images already replaced with local paths | 0 |

---

## All Figma CDN Image References

### 1. `components/FearlessInventorySection.tsx`

| # | Line | Current URL | Suggested local path |
|---|---|---|---|
| 1 | 13 | `https://www.figma.com/api/mcp/asset/3787af60-a01b-4355-b877-0a772acc0f5b` | `/public/images/projects/fearless-inventory-iphone.png` |
| 2 | 17 | `https://www.figma.com/api/mcp/asset/3787af60-a01b-4355-b877-0a772acc0f5b` | `/public/images/projects/fearless-inventory-iphone.png` |

**Note**: Both references use the same URL. This is the iPhone 13 mockup showing the inventory app UI. `lib/assets.ts` already declares a local path for this asset (`PROJECT_ASSETS.fearlessInventoryIphone = "/images/projects/fearless-inventory-iphone.png"`), but `FearlessInventorySection.tsx` is not yet using it.

---

### 2. `components/AboutSection.tsx`

| # | Line | Current URL | Suggested local path |
|---|---|---|---|
| 3 | 14 | `https://www.figma.com/api/mcp/asset/6ca09298-8df8-4b98-9778-e115688b8833` | `/public/images/about/nathan-portrait.jpg` |

**Note**: Nathan's portrait photo. `lib/assets.ts` already declares a local path for this asset (`ABOUT_ASSETS.portrait = "/images/about/nathan-portrait.jpg"`), but `AboutSection.tsx` is not yet using it.

---

### 3. `components/speedster/SpeedsterVariantsComponents.tsx`

| # | Line | Current URL | Suggested local path |
|---|---|---|---|
| 4 | 28 | `https://www.figma.com/api/mcp/asset/10b68b27-860f-4ebe-8d07-bb2c2af9c8ae` | `/public/images/speedster/variants-grid-1.png` |
| 5 | 29 | `https://www.figma.com/api/mcp/asset/6fa2ffe0-51e6-48a8-9139-3a246d7c1464` | `/public/images/speedster/variants-grid-2.png` |
| 6 | 30 | `https://www.figma.com/api/mcp/asset/fb009cb7-0b2d-47f9-be87-d22ad5acfa1b` | `/public/images/speedster/variants-grid-3.png` |
| 7 | 31 | `https://www.figma.com/api/mcp/asset/ff964ab4-2a5e-466c-92db-e503cdfe5558` | `/public/images/speedster/variants-grid-4.png` |

**Note**: Four screenshots displayed in a 2×2 grid in the Variants & Components section. These are the most at-risk — they are pure Figma CDN with no local fallback defined anywhere.

---

## What Is NOT in Scope

The following Figma URLs were found in the codebase but are **not** temporary CDN image assets — they are stable prototype/embed links and do not expire:

- `embed.figma.com/proto/...` — Figma iframe embeds (WireframePrototypeBlock)
- `www.figma.com/proto/...` — FigmaButton "open in Figma" links
- `www.figma.com/design/...` — Figma design file links

These are user-facing hyperlinks to Figma, not hosted image assets, and are not at risk of expiry.

---

## Pre-Launch Replacement Steps

For each image:
1. Export the asset from Figma (PNG or JPG as appropriate)
2. Drop the file into the suggested `/public/...` path
3. Update the `src` in the component from the CDN URL to the local path
4. (For FearlessInventorySection and AboutSection) Consider switching to use `lib/assets.ts` constants instead of hardcoding the path

**Priority order:**
1. `SpeedsterVariantsComponents.tsx` (4 images, no fallback)
2. `FearlessInventorySection.tsx` (1 unique image, appears twice, local path already defined in assets.ts)
3. `AboutSection.tsx` (1 image, local path already defined in assets.ts)
