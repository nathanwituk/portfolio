# Project State — Nathan Wituk Portfolio

> Last updated: 2026-03-17
> Single-page portfolio for Nathan Wituk, IXD student at the University of Kansas.
> Source of truth for design: Figma file `nb7kLRXiAVeezPVWRQCUkX` ("Playground — Portfolio")

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (PostCSS plugin, no config file) |
| Animation | Framer Motion 12 |
| Font | Instrument Sans via `next/font/google` (weights 400/500/600, normal + italic) |
| Runtime | React 19, Node 20 |
| Dev server | `npm run dev` → localhost:3000 |

No database, no API routes, no auth. Pure static/SSR presentation site.

---

## Folder Structure

```
/
├── app/
│   ├── layout.tsx               # Root layout: ThemeProvider + EyeTrackingProvider + light-mode lock script
│   ├── page.tsx                 # Home page (/)
│   ├── globals.css              # Tailwind import + CSS theme tokens + base resets + scrollbar overrides
│   └── work/
│       ├── fearless-inventory/
│       │   └── page.tsx         # Fearless Inventory case study (/work/fearless-inventory)
│       └── speedster/
│           ├── page.tsx         # Speedster case study (/work/speedster)
│           └── data/            # Speedster TypeScript data files
│
├── components/
│   ├── Nav.tsx                  # Sticky header: wordmark + 4 project links + mobile drawer (no dark mode toggle)
│   ├── Hero.tsx                 # Phase-driven hero: mobile (text + Speedster panel) + desktop (two fold panels)
│   ├── FearlessInventorySection.tsx
│   ├── TickerBanner.tsx
│   ├── SpeedsterSection.tsx
│   ├── AboutSection.tsx
│   ├── BackToTop.tsx            # Full-width "Back to Top" bar with hover state
│   ├── Footer.tsx
│   ├── speedster/               # Speedster-specific components
│   │   ├── SpeedsterHero.tsx
│   │   └── SpeedsterKeyPoints.tsx
│   ├── ui/
│   │   ├── FigmaButton.tsx      # Animated "View in Figma" CTA button with eye SVG
│   │   ├── InsightCard.tsx      # Light/dark insight card
│   │   ├── SectionLabel.tsx     # Grey uppercase label
│   │   ├── SplitBlock.tsx       # Two-column content block
│   │   └── TagPill.tsx          # Olive pill tag
│   └── case-study/
│       ├── AISlopBanner.tsx
│       ├── BeautyLightbox.tsx   # Shared carousel lightbox (portal, keyboard, dot breadcrumbs)
│       ├── BrandingSection.tsx  # Info card on top + horizontal scroll rail beneath; custom draggable scrollbar
│       ├── CaseStudyHero.tsx
│       ├── FearlessInventoryBanner.tsx
│       ├── FeatureHighlights.tsx
│       ├── FigmaMakeSection.tsx
│       ├── FinalPrototypeBlock.tsx
│       ├── GuerrillaTestingHeader.tsx
│       ├── InsightsSection.tsx
│       ├── OverviewSection.tsx
│       ├── SectionDivider.tsx
│       ├── UserStoriesSection.tsx
│       ├── UserTestingSection.tsx
│       ├── WireframePrototypeBlock.tsx
│       └── WireframePrototypesBanner.tsx
│
├── contexts/
│   ├── ThemeContext.tsx          # LOCKED to light mode — static provider, no state/localStorage
│   └── EyeTrackingContext.tsx    # Mouse tracking context for FigmaButton eye animation
│
├── hooks/
│   └── useEyeAnimation.ts        # Eye state machine: idle→blink→look→tracking→wide
│
├── lib/
│   └── assets.ts                 # Central media manifest (paths)
│
├── public/
│   ├── images/
│   │   ├── about/nathan-portrait.jpg
│   │   ├── fearless-inventory/
│   │   │   ├── hero-mockup.png
│   │   │   ├── Item Selection.jpg / Item Selection-1.jpg / Item Selection-2.jpg
│   │   │   ├── final-select-items.png / final-ai-scan.png / final-editable-history.png
│   │   │   ├── Figma-Make-Designs/  (6 × Inventory Management Prototype JPEGs)
│   │   │   ├── Beauty Sections/     (3 × UI detail PNGs)
│   │   │   ├── scroll-01…13.png     (Black Rock branding research)
│   │   │   ├── philz-01…08.png      (Philz Coffee branding research)
│   │   │   ├── branding-1…5.png
│   │   │   └── Lightbulb-Icon.svg / InformationInsight-Icon.svg / Inventory Icon.svg
│   │   ├── nav/Icons/             (8 SVGs: grey default + colour hover, 4 projects)
│   │   ├── projects/              (fearless-inventory-iphone.png, fearless-inventory-screenshot.jpg)
│   │   ├── speedster/             (speedster screenshots and assets)
│   │   └── ui/                    (eye-open/closed/look-left/look-right SVGs)
│   └── videos/
│       ├── hero/                  (dashboard-walkthrough.mp4, speedster-arm.mp4, SpeedsterSection2.mp4)
│       ├── projects/              (Inventory Management Prototype-1.mp4)
│       └── speedster/             (speedster-hero-mockup.mov)
│
└── PROJECT_STATE.md
```

---

## Pages

### `/` — Home (`app/page.tsx`)
```
Nav → Hero → FearlessInventorySection → TickerBanner → SpeedsterSection → AboutSection → BackToTop → Footer
```

### `/work/fearless-inventory` — Case Study (`app/work/fearless-inventory/page.tsx`)
Client component — manages `lightboxIndex` state for shared `BeautyLightbox` carousel.
```
Nav
CaseStudyHero
SectionDivider (jump → #final-prototype)
FeatureHighlights (3 × Item Selection JPEGs)
OverviewSection
BrandingSection (Black Rock)
UserStoriesSection
FigmaMakeSection (6 × Figma Make AI screens)
AISlopBanner
InsightsSection
WireframePrototypesBanner
WireframePrototypeBlock — "Fulfillment Prototype 1"   (Figma iframe)
WireframePrototypeBlock — "Fulfillment Prototype 2"   (Figma iframe)
GuerrillaTestingHeader
UserTestingSection
BrandingSection (Philz Coffee)
WireframePrototypeBlock — "Final Fulfillment Prototype" (Figma iframe)
WireframePrototypeBlock — "Final Management Prototype"  (Figma iframe)
FearlessInventoryBanner (large text divider)
FinalPrototypeBlock — "Select Items"       (image left, roundedImage, onImageClick)
FinalPrototypeBlock — "AI Scan or Submit"  (image right, roundedImage, onImageClick)
FinalPrototypeBlock — "Editable History"   (image left, largeImage, cropLeft=20, onImageClick)
BackToTop
Footer
BeautyLightbox (portal — visible when lightboxIndex !== null)
```

**BEAUTY_IMAGES array:**
```ts
[
  { src: "/images/fearless-inventory/final-select-items.png",     alt: "Select Items" },
  { src: "/images/fearless-inventory/final-ai-scan.png",          alt: "AI Scan or Submit" },
  { src: "/images/fearless-inventory/final-editable-history.png", alt: "Editable History" },
]
```

### `/work/speedster` — Speedster Case Study (`app/work/speedster/page.tsx`)
```
Nav
SpeedsterHero (video hero with 25% left+right crop)
SpeedsterKeyPoints (3 key features: headline→body→image, centered)
BackToTop
Footer
```

---

## Component List

### `Nav.tsx`
- Sticky top bar, `h-[46px]`, theme-aware bg/border via CSS vars
- **No dark mode toggle** — removed; light mode is locked
- **Top-left**: "Nathan Wituk" wordmark (text)
- **Right**: four project links with paired SVG icons (grey default / colour hover)
  - Speedster → `/work/speedster`
  - Fearless Inventory → `/work/fearless-inventory`
  - Study Sync Dashboard → `#study-sync` (no route yet, shows "Coming Soon")
  - KU SafeRide Redesign → `#ku-saferide` (no route yet)
- Mobile: hamburger toggles an animated drawer (`AnimatePresence` height 0 → auto)
- Desktop padding: `pl-[80px] pr-[40px]`; mobile: `px-5`

### `Hero.tsx`
- **Mobile** (`flex flex-col lg:hidden`): `MobileHeroText` + one `MobileFoldPanel` (Speedster only)
- **Desktop** (`hidden lg:block`): Two `FoldPanel` components (Study Sync left, Speedster right) + center panel
- Mobile hero text: centered in `minHeight: "calc(100dvh - 46px - 25vw)"` with `display:flex, justifyContent:center`
- Mobile Speedster panel: `cropRight=25` (crops 25% from right side); `width: "125%"`, `objectPosition: "left center"`
- Desktop center panel: transparent background (no fill), text centered (`left:0, right:0, textAlign:"center"`)
- Study Sync fold panel: `comingSoon: true` → renders "Coming Soon" in grey instead of "See Project"
- Speedster fold panel: links to `/work/speedster`
- See full animation logic below.

### `FearlessInventorySection.tsx`
- White bg, flex row desktop / col mobile
- Left: text (category, title, description, CTA link) — **no olive tag pills**
- Right: iPhone 13 mockup image — `hidden md:block`, responsive sizes (300px → 420px → 595px)
- `useInView` triggers stagger animation on scroll

### `TickerBanner.tsx`
- **Visible on all screen sizes** (`flex`, not `hidden lg:flex`)
- Mobile: `h-10`, Desktop: `h-[66px]`; black bg
- Scrolling marquee: "You're viewing an early version of this site…"
- Font: `clamp(0.75rem, 2vw, 1.875rem)`; item padding: `clamp(24px, 4vw, 80px)`
- Framer Motion animates `x: ["0%", "-50%"]` on infinite loop (60s duration)
- 16 text spans (8 + 8 duplicate) to fill 200% width seamlessly

### `SpeedsterSection.tsx`
- White bg, flex row desktop / col mobile
- **Left**: video player (`SpeedsterSection2.mp4` from `/videos/hero/`), `object-cover`, fills container
- **Right**: text (category, title, description, CTA → `/work/speedster`)
- `useInView` triggers slide-in from left (video) + stagger (text)

### `AboutSection.tsx`
- `bg-[#f7f7f7]`, flex row (`md:flex-row`)
- **Desktop/tablet order**: bio text LEFT (`order-1`), portrait RIGHT (`order-2`)
- **Mobile order**: portrait TOP (`order-1`), bio text BOTTOM (`order-2`)
- Has **"About" heading** at top of bio text (2.3125rem, -1.11px, font-normal)
- Portrait: `blur(25px)` filter, clamp sizing
- `useInView` triggers fade-up (text) + slide-right (portrait)

### `BackToTop.tsx`
- Full-width bar, `h-[64px]`, placed on every page above Footer
- Default: black bg, white "Back to Top" text (30px, tracking -0.6px), white up-arrow SVG
- Hover: bg `#f7f7f7`, text turns black with underline, arrow turns black; 200ms ease-out
- Smooth scroll to top on click

### `Footer.tsx`
- White bg, `min-h-[545px]`, `overflow-hidden` (clips the giant name reveal)
- Top section: Contact column (email) + Social column (Behance, LinkedIn) — flex col mobile, flex row `md:`
- Padding: `px-5 md:px-[80px]`, `pt-[60px] pb-[60px]`
- Giant "Nathan.Wituk" at bottom: `position: absolute, bottom: 0`, `clamp(72px, 18vw, 230.529px)` font, slides up on scroll via `useInView`
- Social links currently point to `https://behance.net` and `https://linkedin.com` (not real profile URLs)

---

## Animation Logic

### Shared constants
```ts
const EASE = [0.25, 0, 0, 1]       // Figma's exact cubic-bezier
const HOVER_EASE = [0.4, 0, 0.2, 1] // Softer ease for hover/phase transitions
```

### Hero fold panels (`FoldPanel`)
Each panel has two states driven by `useState(hovered)`:

**Video**: `motion.video` with `x: "-50%"` (always), `y: "-50%" → "-68%"` on hover, `rotate: defaultRotate → hoverRotate`.
- Dashboard: `defaultRotate: 7.18, hoverRotate: 2.1`
- Speedster: `defaultRotate: 0, hoverRotate: 0`

**Text card**: `motion.div` with `y: "100%" → "0%"` on hover. Sits inside a 300px-tall `overflow-hidden` clip at the panel bottom. Duration 0.6s.

**Panel entrance**: `panelSlide` variant — slides in from `x: "-100%"` (left) or `x: "100%"` (right). Duration 1.0s, delay 0.1s.

**Study Sync CTA**: Renders grey "Coming Soon" text instead of orange "See Project" when `panel.comingSoon === true`.

### Hero center panel — phase state machine
```
Phase 0 → Phase 1 (700ms) → Phase 2 (1450ms) → Phase 3 (2200ms, permanent)
```

Three absolutely positioned `motion.p` elements. All centered with `left:0, right:0, textAlign:"center"`. All use `CENTER_TRANS = { duration: 0.65, ease: HOVER_EASE }`.

| Element | Phase 0 | Phase 3 (final) |
|---|---|---|
| "OMG," | hidden, y:320 | visible, y:60 |
| "you found" | hidden | visible, y:109 |
| "my portfolio 😏" | hidden | visible, y:158 italic |
| IXD badge | hidden | fades in +0.4s delay |

The center panel has no background fill (transparent). It sits between the two fold panels on desktop.

### Mobile hero layout
- `MobileHeroText`: text centered in `minHeight: "calc(100dvh - 46px - 25vw)"` — accounts for nav height (46px) and the 20% video peek at bottom (25vw = 20% of 125vw-tall video)
- `MobileFoldPanel`: Speedster video only; `cropRight=25` shows left 75% of video; `width: "125%"`, `objectPosition: "left center"`, `left: 0`

### Scroll animations (all sections except Hero)
All use `useInView(ref, { once: true, margin: "-60px" })` — triggers once when 60px of the section enters the viewport. Common patterns:
- `imageVariant`: `opacity: 0, x: ±28 → visible` (0.75s)
- `textStagger`: stagger children 0.1s
- `textLine` / `fadeUp`: `opacity: 0, y: 18–28 → visible` (0.55–0.65s)
- `nameReveal` (Footer): `y: "100%" → 0` (1.0s, delay 0.15s) — classic reveal-from-below

---

## Layout Decisions

### Breakpoints
Tailwind v4 defaults: `md:` = 768px, `lg:` = 1024px. Design reference breakpoints:
- Mobile: 376px (iPhone)
- Tablet: 800px (maps to `md:`)
- Desktop: 1280px (maps to `lg:`)

### Max width
Content max-width is `1280px` centered with `mx-auto` where applicable (SpeedsterSection, FearlessInventorySection).

### Hero heights
- Mobile: dynamic — `MobileHeroText` uses `minHeight: "calc(100dvh - 46px - 25vw)"` so Speedster preview peeks ~20% at bottom
- Desktop: `h-[723px]` — fold panels bleed above (`top: -41px`) into the nav boundary

### Fold panel sizing
`width: clamp(260px, 30vw, 420px)`, `height: 717px`, `top: -41px` — bleeds above hero section. Positioned `absolute` at `left: 0` (left panel) or `right: 0` (right panel).

### TickerBanner visibility
`flex` — visible on all screen sizes. `h-10` mobile, `h-[66px]` desktop.

### About section layout flip
On tablet+, portrait is on the right (`order-2`) and bio is on the left (`order-1`). On mobile, portrait stacks on top (`order-1`). Achieved with Tailwind `order-` utilities.

### Fluid sizing with clamp()
Used throughout for font sizes and spacing that should scale between breakpoints without hard jumps:
- Footer giant name: `clamp(72px, 18vw, 230.529px)`
- About portrait: `clamp(200px, 30vw, 326px)` wide
- About "About" label: `clamp(60px, 8vw, 105px)`

---

## Design Tokens (`app/globals.css`)

```css
--color-background: #ffffff
--color-foreground: #1d1d1d
--color-orange:     #ff5d00   /* CTA links, hover states, footer headers */
--color-purple:     #6363ff   /* (defined, not yet used) */
--color-green:      #00a63e   /* IXD 414 badge */
--color-gray-light: #f7f7f7   /* About section bg */
--color-gray-mid:   #949494   /* Nav link text, category labels */
--color-gray-dark:  #535353   /* About section sub-label */
--font-sans:        var(--font-instrument-sans)
```

Typography:
- Font: Instrument Sans (Google Fonts, loaded via `next/font`)
- CSS variable: `--font-instrument-sans`
- Common sizes: 14px (body), 16px (labels/nav), 20px (footer), 37px (section titles), 30px (ticker)
- Letter spacing pattern: negative tracking (`-0.48px` at 16px, `-1.11px` at 37px)
- **Standard headline style**: `fontSize: "2.3125rem"`, `letterSpacing: "-1.11px"`, `fontWeight: normal`, `lineHeight: "1"` — used in SpeedsterKeyPoints titles, FeatureHighlights titles, AboutSection heading

Olive green (`#6f7142`) is used for Speedster/Inventory brand accents — not in the global token set.

---

## Asset Manifest (`lib/assets.ts`)

All media paths are centralized here. Swap a file by updating one string.

| Export | Key | Path | Status |
|---|---|---|---|
| `HERO_ASSETS` | `dashboardVideo` | `/videos/hero/dashboard-walkthrough.mp4` | ✅ Present |
| `HERO_ASSETS` | `speedsterArmVideo` | `/videos/hero/speedster-arm.mp4` | ✅ Present |
| `PROJECT_ASSETS` | `speedsterHeroVideo` | `/videos/speedster/speedster-hero-mockup.mov` | ✅ Present |
| `PROJECT_ASSETS` | `speedsterSection2Video` | `/videos/hero/SpeedsterSection2.mp4` | ✅ Present |
| `NAV_ASSETS` | `wordmark` | `/images/nav/nathan-wituk-wordmark.svg` | ⚠️ Not wired up — Nav uses text fallback |

---

## Current Issues

### Footer social links are placeholder URLs
`https://behance.net` and `https://linkedin.com` — update to Nathan's actual profile URLs.

### KU SafeRide section is missing
`Nav.tsx` has a "KU SafeRide Redesign" link (`href: "#ku-saferide"`) with a map-pin icon. There is no corresponding route or section. Planned future project.

### Study Sync Dashboard section is missing
Nav links to `#study-sync` which doesn't exist. The hero left panel shows "Coming Soon" in grey. Planned future project.

---

## Next Tasks

### High priority
1. **Build Study Sync Dashboard page** — Create `/work/study-sync` route; update nav link; currently shows "Coming Soon" in hero panel
2. **Update Footer social links** — Replace `https://behance.net` and `https://linkedin.com` with real profile URLs

### Medium priority
3. **Build KU SafeRide Redesign page** — Create `/work/ku-saferide` route; update nav link from `#ku-saferide` to `/work/ku-saferide`
4. **Fix Nav hamburger duplicate `style` prop** — First and third hamburger `motion.span` each have two `style` props. Merge into single object.
5. **Wire up Nav wordmark SVG** — `NAV_ASSETS.wordmark` is defined but Nav still renders text fallback

### Lower priority
6. **SEO / OG tags** — Add per-page `metadata` exports to case study pages; add OG image
7. **Accessibility pass** — Verify focus styles on all interactive elements; check contrast ratios
8. **Performance** — Audit `next/image` `priority` flags (only hero images should be priority); consider converting `.mov` Speedster hero video to `.mp4`
9. **Deploy** — Add `vercel.json` or connect GitHub repo to Vercel

---

---

## Case Study Components

| Component | Key Props | Notes |
|---|---|---|
| `CaseStudyHero` | `label, title, body, boldText?, tags[], mockupSrc, mockupAlt` | Image left, text right; `paddingTop/Bottom: 110/129px` |
| `OverviewSection` | `col1, col2` (ReactNode) | Two-column text; `max-w-[1280px] mx-auto` with clamp padding |
| `BrandingSection` | `sectionLabel, title, bullets[], note?, screenshots[]` | **flex-col**: info card on top, scroll rail beneath; `object-contain` images; auto-scrolls 200px on entry; custom DOM scrollbar (14px, draggable thumb) |
| `FeatureHighlights` | `features[], screenshots[]` | 3-col grid; per-column order: NumberBadge→title→body→screenshot[i]; plain `<img>` (not Next Image); drop shadow; `pb-[110px]` |
| `FigmaMakeSection` | `screens[]` | Grid of AI design JPEGs; `drop-shadow(8px 10px 24px rgba(0,0,0,0.18))` |
| `InsightsSection` | `rows: { positive, negative }[]` | Two-column InsightCard pairs; column headers have dedicated icons (Lightbulb-Icon.svg for "Strong Design Insight", InformationInsight-Icon.svg for "Areas for Improvement") |
| `WireframePrototypeBlock` | `title, body, figmaHref?, embedSrc?, sectionLabel?, bg?` | Conditional Figma iframe; placeholder bg `var(--bg-secondary)` |
| `FinalPrototypeBlock` | `id?, sectionLabel?, title, body, imageSrc, imageAlt, imagePosition?, bg?, pillButtons?, beautyImageSrc?, largeImage?, centerImage?, roundedImage?, onImageClick?, cropLeft?` | Fully configurable prototype display |
| `SectionDivider` | `variant?: "arrow"\|"jump"`, `href?` | Jump variant: full-width `<a>` with hover colour swap (tan↔olive) |
| `BeautyLightbox` | `images[], initialIndex, onClose` | Portal to `document.body`; direction-aware slide; keyboard (←→Esc); dot breadcrumbs (active dot stretches to pill) |

### `FinalPrototypeBlock` image sizing
```ts
// largeImage = true  → clamp(200px, 26vw, 400px) × clamp(340px, 44vw, 660px)
// largeImage = false → clamp(180px, 20vw, 340px) × clamp(260px, 34vw, 520px)
// roundedImage → adds borderRadius: 16px + overflow:hidden clip wrapper + drop-shadow on outer div
// cropLeft=20 → crops left 20% (Editable History): inner div width=125%, left=-25%, parent overflow:hidden
```

### `BrandingSection` custom scrollbar
- Track: `height: 14px`, `bg: var(--bg-tan)`, always visible DOM element
- Thumb: `bg: #6f7142`, position/width calculated from `scrollLeft` / `scrollWidth`
- Drag: `onMouseDown` on thumb → global `mousemove/mouseup` listeners
- Auto-scroll: `animate(0, 200, { duration: 0.85, ease: "easeInOut" })` fires once on `inView`
- Left-edge alignment: uses `max(clamp(20px,6.25vw,80px), calc((100% - 1280px)/2 + 80px))` to match `max-w-[1280px]` containers
- Images use `object-contain` (not `object-cover`) so full image is always visible

### `FeatureHighlights` column layout
- Per-column order: NumberBadge → title → description → screenshot
- Headline group gap: `8px` (title-to-description); column gap (group to image): `24px`
- Title style: `2.3125rem`, `-1.11px` letter-spacing, `font-normal`, `leading-none` — matches site type system

### `SpeedsterKeyPoints` column layout
- Per-column order: NumberBadge → title → description → phone mockup image
- All content centered (`items-center`, `text-center`)
- Headline group gap: `6px`; column gap (group to image): `24px`

---

## Speedster Components

### `SpeedsterHero.tsx`
- Full-width video hero; uses `PROJECT_ASSETS.speedsterHeroVideo` (`speedster-hero-mockup.mov`)
- **25% side crop** (both left and right): inner video `width: "200%"`, `left: "-50%"`, parent `overflow: hidden`
- Shows center 50% of video width

### `SpeedsterKeyPoints.tsx`
- 3-column layout (stacks to 1-col on mobile)
- Per-column: NumberBadge → title (2.3125rem, -1.11px) → description → phone mockup image
- All centered; gap between group and image: `24px`; gap within group: `6px`

---

## Light Mode Lock

Dark mode has been **removed** until it is formally implemented later.

### Three-layer implementation
1. **`app/layout.tsx`** inline script: `try{localStorage.removeItem('theme');document.documentElement.classList.remove('dark');}catch(e){}`
2. **`contexts/ThemeContext.tsx`**: static provider — always returns `theme: "light"`, `toggleTheme: () => {}`; no useState, no useEffect, no localStorage reads
3. **`Nav.tsx`**: dark mode toggle button completely removed

### CSS Variables (`app/globals.css`)
Light mode vars are still defined under `:root`. `html.dark` overrides also still exist in CSS but are never applied since the `dark` class is never added.

```css
--bg-primary:   #ffffff
--bg-secondary: #f5f5f5
--bg-tertiary:  #f7f7f7
--bg-tan:       #ebe8de
--text-primary: #1d1d1d
--text-secondary:#949494
--text-tertiary: #a4a4a4
--border-primary:#000000
--border-subtle: rgba(0,0,0,0.10)
```

---

## Layout System

### Standard container (used in all white/themed sections)
```tsx
<section className="w-full" style={{ backgroundColor: "var(--bg-primary)" }}>
  <div
    className="max-w-[1280px] mx-auto"
    style={{
      paddingLeft:  "clamp(20px, 6.25vw, 80px)",
      paddingRight: "clamp(20px, 6.25vw, 80px)",
    }}
  >
```

### BrandingSection left-edge alignment
No `max-w` wrapper (image rail bleeds right). Left edge uses:
```css
padding-left: max(clamp(20px, 6.25vw, 80px), calc((100% - 1280px) / 2 + 80px))
```
Matches `max-w-[1280px] mx-auto` container left edge at all viewport widths.

### Responsive font scale
`html { font-size: clamp(14px, 1.25vw, 20px) }` — all `rem` values scale proportionally.

---

## Recent Fixes & Adjustments (2026-03-17 session)

| Item | Change |
|---|---|
| Study Sync hero panel | Shows "Coming Soon" in grey instead of orange "See Project" |
| Study Sync mobile | Removed from mobile hero entirely — only Speedster panel shows on mobile |
| Speedster desktop panel | Re-added with hover fold effect (matching Study Sync panel behavior) |
| Mobile hero text | Centered in viewport with `minHeight: calc(100dvh - 46px - 25vw)`; transparent background |
| Desktop center panel | Background fill removed (transparent) |
| Mobile Speedster crop | `cropRight=25` — shows left 75% of video frame |
| SpeedsterSection video | Replaced grey box with `SpeedsterSection2.mp4` (converted from `.mov` via ffmpeg, 67MB → 11MB) |
| SpeedsterHero video | Now uses `speedster-hero-mockup.mov` with 25% left+right crop |
| FearlessInventorySection | Olive tag pills removed |
| AboutSection | "About" heading added above bio text |
| TickerBanner | Now visible on mobile (`flex` instead of `hidden lg:flex`); responsive font/padding with `clamp()` |
| Dark mode | Fully removed — locked to light mode via ThemeContext static provider + layout script + Nav cleanup |
| SpeedsterKeyPoints | Reordered to headline→body→image; gap tightened; all content centered |
| FeatureHighlights | Reordered to NumberBadge→title→body→screenshot; per-column layout; title style matches site type system |
| BrandingSection | Layout changed to flex-col (info card above, scroll rail below); `object-contain` images |
| InsightsSection | Dedicated icons added to column headers (Lightbulb + InformationInsight SVGs) |
| Speedster CTAs | All "See Project" links on homepage route to `/work/speedster` |

---

## Figma Reference

File: `nb7kLRXiAVeezPVWRQCUkX` ("Playground — Portfolio")

Key nodes used during build:
- `243:24180` — Full desktop layout (1280px)
- `243:20138` — Tablet layout (800px)
- `243:21094` — iPhone layout (376px)
- `243:22218` — Left fold panel hover animation (DashboardHeaderLeftFold)
- `243:22110` — Center hero text animation (5 variants → Variant5 is permanent final state)
- `243:18942` — Fearless Inventory iPhone 13 mockup
