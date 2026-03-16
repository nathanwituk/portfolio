# Project State — Nathan Wituk Portfolio

> Last updated: 2026-03-15
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
│   ├── layout.tsx               # Root layout: ThemeProvider + EyeTrackingProvider + no-flash script
│   ├── page.tsx                 # Home page (/)
│   ├── globals.css              # Tailwind import + CSS theme tokens + base resets + scrollbar overrides
│   └── work/
│       ├── fearless-inventory/
│       │   └── page.tsx         # Fearless Inventory case study (/work/fearless-inventory)
│       └── speedster/
│           ├── page.tsx         # Speedster page scaffold (/work/speedster) — CONTENT PENDING
│           └── data/            # (empty) Speedster TypeScript data files go here
│
├── components/
│   ├── Nav.tsx                  # Sticky header: dark/light toggle + 4 project links + mobile drawer
│   ├── Hero.tsx
│   ├── FearlessInventorySection.tsx
│   ├── TickerBanner.tsx
│   ├── SpeedsterSection.tsx
│   ├── AboutSection.tsx
│   ├── BackToTop.tsx            # Full-width "Back to Top" bar with hover state
│   ├── Footer.tsx
│   ├── speedster/               # (empty) Speedster-specific components go here
│   ├── ui/
│   │   ├── FigmaButton.tsx      # Animated "View in Figma" CTA button with eye SVG
│   │   ├── InsightCard.tsx      # Light/dark insight card
│   │   ├── SectionLabel.tsx     # Grey uppercase label
│   │   ├── SplitBlock.tsx       # Two-column content block
│   │   └── TagPill.tsx          # Olive pill tag
│   └── case-study/
│       ├── AISlopBanner.tsx
│       ├── BeautyLightbox.tsx   # Shared carousel lightbox (portal, keyboard, dot breadcrumbs)
│       ├── BrandingSection.tsx  # Horizontal scroll image rail + custom draggable scrollbar
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
│   ├── ThemeContext.tsx          # Dark/light mode state + localStorage + .dark on <html>
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
│   │   ├── speedster/             (empty — ready for assets)
│   │   └── ui/                    (eye-open/closed/look-left/look-right SVGs)
│   └── videos/
│       ├── hero/                  (dashboard-walkthrough.mp4, speedster-arm.mp4)
│       ├── projects/              (Inventory Management Prototype-1.mp4, speedster-demo.mp4)
│       └── speedster/             (empty — ready for assets)
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

### `/work/speedster` — Speedster (`app/work/speedster/page.tsx`)
**Status: Scaffold only.** Nav + placeholder hero + BackToTop + Footer. Content pending.

---

## Component List

### `Nav.tsx`
- Sticky top bar, `h-[46px]`, theme-aware bg/border via CSS vars
- **Top-left**: dark/light mode toggle button (moon↔sun icon, rotate/fade swap animation)
- **Left of toggle**: "Nathan Wituk" wordmark (text)
- **Right**: four project links with paired SVG icons (grey default / colour hover)
  - Speedster → `/work/speedster`
  - Fearless Inventory → `/work/fearless-inventory`
  - Study Sync Dashboard → `#study-sync` (no route yet)
  - KU SafeRide Redesign → `#ku-saferide` (no route yet)
- Mobile: hamburger toggles an animated drawer (`AnimatePresence` height 0 → auto)
- Desktop padding: `pl-[80px] pr-[40px]`; mobile: `px-5`

### `Hero.tsx`
- `h-[228px]` mobile / `h-[723px]` desktop, white bg, `overflow-hidden`
- **Two fold panels** (desktop only, `hidden lg:block`): left = Study Sync Dashboard, right = Speedster
- **Center panel**: 392×538px white box, absolutely centered at `left: calc(50% + 20px), top: calc(50% - 27.5px), transform: translate(-50%, -50%)`
- See full animation logic below.

### `FearlessInventorySection.tsx`
- White bg, flex row desktop / col mobile
- Left: text (category, title, description, CTA link, olive tag pills)
- Right: iPhone 13 mockup image — `hidden md:block`, responsive sizes (300px → 420px → 595px)
- Image currently uses a Figma CDN URL as fallback (`IPHONE_FIGMA_FALLBACK`). Swap to local once `fearless-inventory-iphone.png` is in `/public/images/projects/`
- `useInView` triggers stagger animation on scroll

### `TickerBanner.tsx`
- `hidden lg:flex` — desktop only, `h-[66px]`, black bg
- Scrolling marquee text: "You're viewing an early version of this site…"
- Framer Motion animates `x: ["0%", "-50%"]` on infinite loop (60s duration)
- 16 text spans (8 + 8 duplicate) to fill 200% width seamlessly

### `SpeedsterSection.tsx`
- White bg, flex row desktop / col mobile
- Left: video player (`speedster-demo.mp4`), `w-full lg:w-[490.891px]`, `h-[297px] lg:h-[424.5px]`, dark bg `#1a1a1a`, `rounded-[7.344px]`
- Right: text (category, title, description, CTA)
- `useInView` triggers slide-in from left (video) + stagger (text)

### `AboutSection.tsx`
- `bg-[#f7f7f7]`, flex row (`md:flex-row`)
- **Desktop/tablet order**: bio text LEFT (`order-1`), portrait RIGHT (`order-2`)
- **Mobile order**: portrait TOP (`order-1`), bio text BOTTOM (`order-2`)
- Portrait: `blur(25px)` filter, clamp sizing. `ABOUT_ASSETS.portrait` → currently falls back to Figma CDN URL
- "About" large orange text (`#e96c2a`) overlaid on portrait using CSS grid stack (both elements in `gridColumn: 1, gridRow: 1`)
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

### Hero center panel — phase state machine
```
Phase 0 → Phase 1 (700ms) → Phase 2 (1450ms) → Phase 3 (2200ms, permanent)
```

Three absolutely positioned `motion.p` elements inside the 392×538px panel. All use `CENTER_TRANS = { duration: 0.65, ease: HOVER_EASE }`.

| Element | Phase 0 | Phase 1 | Phase 2 | Phase 3 (final) |
|---|---|---|---|---|
| "OMG," | hidden, x:96 y:290 86.8px | visible, x:96 y:185 86.8px | x:42 y:173 42.6px | same as phase 2 |
| "you found" | hidden | hidden | visible, x:20 y:229 78.5px | x:161 y:179 42.8px |
| "my portfolio 😏" | hidden | hidden | hidden | x:4 y:229 62.8px italic |
| IXD badge | hidden | hidden | hidden | fades in +0.4s delay |

Coordinates are Framer Motion `x`/`y` transforms from absolute `left:0, top:0` origin within the panel (not CSS `left`/`top`). They match Figma Variant5 final pixel positions.

The center panel itself fades from `opacity: 0 → 1` at `delay: 0.7s, duration: 0.01s` (near-instant pop-in, timed to match panels finishing their slide-in).

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
- Mobile: `h-[228px]` — fold panels are `hidden lg:block`, so only center text shows
- Desktop: `h-[723px]` — fold panels bleed above (`top: -41px`) into the nav boundary

### Fold panel sizing
`width: clamp(260px, 30vw, 420px)`, `height: 717px`, `top: -41px` — bleeds above hero section. Positioned `absolute` at `left: 0` (left panel) or `right: 0` (right panel).

### TickerBanner visibility
`hidden lg:flex` — confirmed absent in both tablet and iPhone Figma frames.

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

Olive green (`#6f7142`) is used for Fearless Inventory tag pills — not in the global token set.

---

## Asset Manifest (`lib/assets.ts`)

All media paths are centralized here. Swap a file by updating one string.

| Export | Key | Path | Status |
|---|---|---|---|
| `HERO_ASSETS` | `dashboardVideo` | `/videos/hero/dashboard-walkthrough.mp4` | ✅ Present |
| `HERO_ASSETS` | `speedsterArmVideo` | `/videos/hero/speedster-arm.mp4` | ✅ Present |
| `PROJECT_ASSETS` | `fearlessInventoryIphone` | `/images/projects/fearless-inventory-iphone.png` | ⚠️ Missing — fallback to Figma CDN URL |
| `PROJECT_ASSETS` | `speedsterDemoVideo` | `/videos/projects/speedster-demo.mp4` | ✅ Present |
| `ABOUT_ASSETS` | `portrait` | `/images/about/nathan-portrait.jpg` | ⚠️ Missing — fallback to Figma CDN URL |
| `NAV_ASSETS` | `wordmark` | `/images/nav/nathan-wituk-wordmark.svg` | ⚠️ Not wired up — Nav uses text fallback |

Figma CDN URLs expire after ~7 days. Swap to local files ASAP.

---

## Current Issues

### Missing local images
`fearless-inventory-iphone.png` and `nathan-portrait.jpg` are not in `/public`. Components fall back to Figma CDN asset URLs which will expire. Drop the files into the correct `/public` paths — `lib/assets.ts` picks them up automatically.

### Hero center panel x-position approximation
The "OMG," phase 1 centering uses `x: 96` as a transform offset. This is an approximation — exact centering depends on the rendered text width of "OMG," at 86.842px in Instrument Sans. If it looks slightly off-center on first load, measure the rendered width and adjust the `x` value in `Hero.tsx` phase 1 animate block.

### Footer social links are placeholder URLs
`https://behance.net` and `https://linkedin.com` — update to Nathan's actual profile URLs.

### KU SafeRide section is missing
`Nav.tsx` has a "KU SafeRide Redesign" link (`href: "#ku-saferide"`) with a map-pin icon. There is no corresponding `KUSafeRideSection` component or section in `page.tsx`. This is a planned project section that hasn't been built yet.

### Study Sync Dashboard section is missing
Similarly, `href: "#study-sync"` in the nav links to a section that doesn't exist yet. The hero left panel CTA points to it too.

### ~~Light mode only~~ — RESOLVED
Dark mode is now fully implemented. See Dark Mode System section below.

---

## Next Tasks

### High priority — Speedster page
1. **Build Speedster case study** — Add content to `app/work/speedster/data/`, build components in `components/speedster/`, drop assets in `public/images/speedster/` and `public/videos/speedster/`
2. **Add missing images** — Confirm `fearless-inventory-iphone.png` is in `/public/images/projects/` (was missing in earlier session; `lib/assets.ts` was falling back to Figma CDN URL which expires)

### Medium priority
3. **Build Study Sync Dashboard page** — Create `/work/study-sync` route; update nav link from `#study-sync` to `/work/study-sync`
4. **Build KU SafeRide Redesign page** — Create `/work/ku-saferide` route; update nav link from `#ku-saferide` to `/work/ku-saferide`
5. **Update Footer social links** — Replace `https://behance.net` and `https://linkedin.com` with real profile URLs
6. **Fix Nav hamburger duplicate `style` prop** — First and third hamburger `motion.span` each have two `style` props (React takes last). Merge into single object.

### Lower priority
7. **SEO / OG tags** — Add per-page `metadata` exports to case study pages; add OG image
8. **Accessibility pass** — Verify focus styles on all interactive elements; check contrast of `var(--text-tertiary)` in dark mode
9. **Performance** — Audit `next/image` `priority` flags (only hero images should be priority)
10. **Deploy** — Add `vercel.json` or connect GitHub repo to Vercel

---

---

## Case Study Components

| Component | Key Props | Notes |
|---|---|---|
| `CaseStudyHero` | `label, title, body, boldText?, tags[], mockupSrc, mockupAlt` | Image left, text right; `paddingTop/Bottom: 110/129px` |
| `OverviewSection` | `col1, col2` (ReactNode) | Two-column text; `max-w-[1280px] mx-auto` with clamp padding |
| `BrandingSection` | `sectionLabel, title, bullets[], note?, screenshots[]` | Horizontal scroll rail; auto-scrolls 200px on entry; custom DOM scrollbar (14px, draggable thumb) |
| `FeatureHighlights` | `features[], screenshots[]` | 3-col grid; plain `<img>` (not Next Image) to prevent cropping; drop shadow on screenshots; `pb-[110px]` |
| `FigmaMakeSection` | `screens[]` | Grid of AI design JPEGs; `drop-shadow(8px 10px 24px rgba(0,0,0,0.18))` |
| `InsightsSection` | `rows: { positive, negative }[]` | Two-column InsightCard pairs; column headers use `var(--text-tertiary)` |
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

---

## Dark Mode System

### Architecture
- **`contexts/ThemeContext.tsx`**: stores `"light" | "dark"`, reads/writes `localStorage`, toggles `.dark` class on `document.documentElement`
- **No-flash script** in `app/layout.tsx` `<head>` (inline, runs before hydration): `try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}`
- **Toggle button** in `Nav.tsx`: top-left, moon icon (light) ↔ sun icon (dark); framer-motion rotate/fade swap on icon change

### CSS Variables (`app/globals.css`)
```css
:root                     →  html.dark
--bg-primary:   #ffffff   →  #111111
--bg-secondary: #f5f5f5   →  #1e1e1e
--bg-tertiary:  #f7f7f7   →  #181818
--bg-tan:       #ebe8de   →  #1c1a16
--text-primary: #1d1d1d   →  #f0f0f0
--text-secondary:#949494  →  #777777
--text-tertiary: #a4a4a4  →  #555555
--border-primary:#000000  →  #333333
--border-subtle: rgba(0,0,0,0.10) → rgba(255,255,255,0.08)
```

### Colors NOT dark-mode-aware (intentional)
- `#6f7142`, `#4a4a22`, `#838653` — olive accent/brand
- `#ff5d00` — orange accent
- `#6363ff` — purple accent
- `TickerBanner` black bg — brand element
- White text on olive/dark backgrounds — correct as-is
- `SpeedsterSection` video container `#1a1a1a` — intentionally dark for video
- `AISlopBanner` lime blend `#c5cc6b` — specific design effect
- `BeautyLightbox` backdrop `rgba(0,0,0,0.5)` — lightbox always needs dark overlay

### Coverage
All components use `var(--bg-primary/secondary/tertiary/tan)` and `var(--text-primary/secondary/tertiary)` for theme-aware colours. All transitions include `200ms ease` on bg/color/border properties.

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

## Recent Fixes & Adjustments (2026-03-15 session)

| Item | Change |
|---|---|
| Hero padding | `paddingTop/Bottom` increased by 100px each (10px→110px, 29px→129px) |
| `SectionDivider` jump hover | Full-width `<a>` with JS `onMouseEnter/Leave`; bg/text/arrow colour swap; `stroke="currentColor"` on arrow SVG |
| `FigmaButton` | Added `motion.a` with `whileHover scale(1.04)`, spring transition, bg/shadow hover states; `inline-flex w-fit` to hug content |
| `FeatureHighlights` | Replaced Next `Image fill object-cover` with plain `<img>` to fix top-crop; added drop shadow; `pb-[110px]` |
| `BrandingSection` | Auto-scroll 200px on entry; custom DOM scrollbar (replaces native); draggable thumb; left-edge alignment fix |
| `BackToTop` | Rebuilt to Figma spec: black bar 64px, hover to light grey with underline |
| Dark mode | Full implementation across all components (ThemeContext, CSS vars, toggle button in Nav, no-flash script) |
| `/work/speedster` | Route created; folder structure scaffolded (`components/speedster/`, `public/images/speedster/`, `public/videos/speedster/`, `app/work/speedster/data/`) |

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
