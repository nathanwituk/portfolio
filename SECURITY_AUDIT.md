# Security & Production Readiness Audit

**Project**: Nathan Wituk Portfolio
**Date**: March 16, 2026
**Status**: ✅ Production Ready — No critical issues found

---

## 1. Tech Stack & Deployment Assumptions

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript (strict mode) | 5.x |
| Styling | Tailwind CSS v4 + PostCSS | 4.x |
| Animation | Framer Motion | 12.35.2 |
| Font Loading | next/font/google (Instrument Sans) | — |
| Linting | ESLint 9 (flat config) | 9.x |

**Deployment assumptions:**
- Static/SSG-friendly — no server-side data fetching, no backend, no database
- Intended for Vercel or equivalent static hosting
- No environment-specific secrets required for base functionality
- Public portfolio — no login, no user accounts, no sensitive data

---

## 2. All Routes / Pages

| Route | File | Render Mode |
|---|---|---|
| `/` | `app/page.tsx` | Server component |
| `/work/fearless-inventory` | `app/work/fearless-inventory/page.tsx` | Client component (`"use client"`) |
| `/work/speedster` | `app/work/speedster/page.tsx` | Server component |

**Missing pages:**
- No `not-found.tsx` — Next.js will fall back to its default 404 page
- No `error.tsx` — no custom error boundary; Next.js default used

---

## 3. Forms and User Inputs

**None.** This project contains zero `<form>`, `<input>`, or `<textarea>` elements.

User interactions are limited to:
- Theme toggle button (`Nav.tsx`) — reads/writes `localStorage`
- Mobile nav hamburger toggle (`Nav.tsx`) — local UI state only
- Back to top button (`BackToTop.tsx`) — calls `window.scrollTo()`
- Hover states on nav links and FigmaButton — local UI state only
- Lightbox open/close on Fearless Inventory page — local UI state only

No user input is processed, validated, or transmitted anywhere.

---

## 4. API Calls, Server Actions, and Database Access

**None.** This is a fully static front-end project.

- No `/api/` route handlers
- No `"use server"` directives or server actions
- No `fetch()` or `axios` calls at runtime
- No database connections (no Prisma, Drizzle, Supabase, etc.)
- No external data dependencies at request time

**Asset loading only:**
- Local assets from `/public/` (images, videos, SVGs)
- Google Fonts loaded at build time via `next/font/google`
- Figma CDN assets (`www.figma.com/api/mcp/asset/...`) — **expire in 7 days**, whitelisted in `next.config.ts`

---

## 5. Auth / Session Logic

**None.** No authentication system is present or required.

**localStorage usage** (only):
- `ThemeContext.tsx` reads/writes `localStorage.getItem('theme')` to persist light/dark mode preference
- No sensitive data, no tokens, no credentials stored

---

## 6. Third-Party Scripts and Services

| Service | How Used | Location |
|---|---|---|
| Google Fonts | `next/font/google` at build time | `app/layout.tsx` |
| Figma (embed) | `<iframe src="embed.figma.com/...">` | `WireframePrototypeBlock.tsx` |
| Figma (CDN assets) | `<img src="figma.com/api/mcp/asset/...">` | Various speedster components |

**No analytics, no tracking, no ad scripts, no GTM, no GA.**

**Inline script** (`app/layout.tsx`, lines 29–33):
```js
try {
  var t = localStorage.getItem('theme');
  if (t === 'dark') document.documentElement.classList.add('dark');
} catch(e) {}
```
Purpose: Prevent flash of unstyled content (FOUC) on theme load. Static string only — no external input involved.

---

## 7. Environment Variables and Secrets

**None in use.** No `.env`, `.env.local`, `.env.production` files exist.

No `process.env` references found anywhere in the codebase.

`next.config.ts` contains only:
```ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "www.figma.com", pathname: "/api/mcp/asset/**" }]
}
```

No secrets, API keys, or credentials are present or needed.

---

## 8. Risk Register

### 🔐 Auth
| Risk | Severity | Notes |
|---|---|---|
| No auth required | N/A | Public portfolio — correct by design |

---

### 🧹 Input Validation
| Risk | Severity | Notes |
|---|---|---|
| No user inputs exist | N/A | Zero forms or inputs in the project |

---

### 🔍 Data Exposure
| Risk | Severity | Notes |
|---|---|---|
| Email address visible in Footer | Low | `nathan.wituk@ku.edu` is publicly listed — intentional for portfolio contact |
| Figma asset URLs in source code | Low | Temporary 7-day CDN links embedded as string literals; will 404 after expiry but pose no security risk |
| No PII collected or stored | None | ✅ |

---

### 🔀 Client / Server Boundaries
| Risk | Severity | Notes |
|---|---|---|
| `"use client"` on Fearless Inventory page | Info | Page uses `useState` for lightbox — correct usage |
| `dangerouslySetInnerHTML` in `layout.tsx` | Low | Static theme script only; no user input; standard anti-FOUC pattern — safe |
| No `"use server"` or server actions | N/A | Not needed for this project |

---

### 📦 Dependencies
| Risk | Severity | Notes |
|---|---|---|
| All dependencies current | None | Next.js 16, React 19, Framer Motion 12 — all actively maintained |
| No known CVEs in dependency list | None | ✅ |
| No unused or abandoned packages | None | ✅ |

---

### ⚙️ Configuration
| Risk | Severity | Notes |
|---|---|---|
| Figma remote image pattern is appropriately scoped | None | `pathname: "/api/mcp/asset/**"` limits pattern correctly |
| No CORS headers configured | Info | Not needed — no API routes |
| Content-Security-Policy | ✅ Fixed | Implemented — see § Security Headers below |
| X-Frame-Options | ✅ Fixed | `DENY` — implemented |
| X-Content-Type-Options | ✅ Fixed | `nosniff` — implemented |
| Referrer-Policy | ✅ Fixed | `strict-origin-when-cross-origin` — implemented |
| Permissions-Policy | ✅ Fixed | All unused capabilities denied — implemented |
| Strict-Transport-Security | ✅ Fixed | 2-year HSTS with preload — implemented |
| TypeScript strict mode enabled | ✅ | Reduces runtime type errors |

---

### 🚀 Deployment
| Risk | Severity | Notes |
|---|---|---|
| Figma CDN assets expire in ~7 days | Medium | Replace expiring `figma.com/api/mcp/asset/` URLs with local copies in `/public/images/` before launch |
| No custom 404 page | Low | Add `app/not-found.tsx` for polished user experience |
| No error boundary | Low | Add `app/error.tsx` for graceful error handling |
| `suppressHydrationWarning` on `<html>` | Info | Intentional and correct — needed for theme class injection |

---

---

## 9. Security Headers

All headers implemented in `next.config.ts` via the `headers()` function and applied to `/:path*`.

### Headers Applied

| Header | Value | Purpose |
|---|---|---|
| `Content-Security-Policy` | See below | Restricts which resources the browser can load |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS for 2 years |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer data sent cross-origin |
| `Permissions-Policy` | all unused APIs denied | Blocks camera, mic, geolocation, payment, USB, bluetooth, sensors |
| `X-Frame-Options` | `DENY` | Clickjacking fallback for browsers without CSP frame-ancestors |

### CSP Directive Breakdown

```
default-src 'none'
script-src  'self' 'unsafe-inline'
style-src   'self' 'unsafe-inline'
font-src    'self'
img-src     'self' data:
media-src   'self'
frame-src   embed.figma.com
connect-src 'self'
worker-src  'self' blob:
base-uri    'self'
form-action 'none'
frame-ancestors 'none'
object-src  'none'
upgrade-insecure-requests
```

### CSP Exceptions Explained

**`script-src 'unsafe-inline'`** — Required for two unavoidable reasons:
1. The anti-FOUC theme script in `app/layout.tsx` (inline `<script>` tag). Its SHA-256 hash is `sha256-b8gQUaRzu5dP+/0zQJl4vk5wzo+Fq2JJ7SRmx9HppLc=` — hashable but insufficient alone (see below).
2. Next.js App Router streams RSC payload as inline `<script>` tags that change every build and cannot be pre-hashed. `'unsafe-inline'` is unavoidable until a nonce-based approach is added.

**`style-src 'unsafe-inline'`** — Framer Motion applies all animation state as inline `style=""` attributes on DOM elements at runtime. These are dynamic and cannot be hashed or nonced at build time.

**`frame-src embed.figma.com`** — `WireframePrototypeBlock` renders `<iframe src="embed.figma.com/proto/...">` for interactive prototype embeds. Scoped to the `embed` subdomain only.

**`img-src data:`** — Next.js Image may emit `data:` URIs for blur-up placeholder previews.

**`font-src 'self'`** — `next/font/google` downloads Instrument Sans at build time and self-hosts it from `/_next/static/`. No runtime requests to `fonts.googleapis.com` or `fonts.gstatic.com`.

**No analytics, CDN, or tracking domains** — None are present in this project.

### Follow-Up: Removing `'unsafe-inline'` from `script-src`

To harden `script-src` further, add `middleware.ts` that generates a cryptographically random nonce per request:

```ts
// middleware.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function middleware(request) {
  const nonce = crypto.randomBytes(16).toString('base64');
  const response = NextResponse.next();
  // Pass nonce to Next.js so it adds it to RSC inline scripts
  response.headers.set('x-nonce', nonce);
  // Replace 'unsafe-inline' with 'nonce-{value}' in CSP
  response.headers.set('Content-Security-Policy', buildCsp(nonce));
  return response;
}
```

Then pass the nonce to the `<script>` tag in `app/layout.tsx`:
```tsx
// app/layout.tsx
import { headers } from 'next/headers';
const nonce = (await headers()).get('x-nonce') ?? '';
<script nonce={nonce} dangerouslySetInnerHTML={{ __html: fouc }} />
```

This replaces `'unsafe-inline'` with `'nonce-{value}' 'strict-dynamic'` — the strictest practical CSP for a Next.js App Router site. `'style-src unsafe-inline'` would still be required for Framer Motion.

---

## Recommended Pre-Launch Checklist

- [ ] Replace expiring Figma CDN image URLs with local assets
- [ ] Run `npm run build` — verify zero TypeScript/ESLint errors
- [ ] Add `app/not-found.tsx` custom 404 page
- [ ] Add `app/error.tsx` custom error boundary
- [x] ~~Add security headers to `next.config.ts`~~ — **Done**: CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options all implemented
- [ ] (Optional) Replace `script-src 'unsafe-inline'` with nonce-based CSP via `middleware.ts` — see § Follow-Up above
- [ ] Verify all video/image assets in `/public` are present and load correctly
- [ ] Test dark/light mode toggle on production build
- [ ] Test on mobile viewports
