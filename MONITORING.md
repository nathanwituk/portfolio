# Monitoring Setup

Lightweight, zero-cost monitoring scaffold for a Next.js portfolio deployed on Vercel.

---

## What Was Scaffolded

### 1. `lib/reportError.ts` — Structured error logging

Central error reporting utility used by all error-catching surfaces.

- **Dev**: `console.error('[context]', error)` — human-readable, full stack trace
- **Prod**: `console.error(JSON.stringify({ level, context, message, digest, stack, timestamp, url }))` — structured JSON captured by Vercel's runtime log pipeline

Vercel automatically indexes these logs. You can search and filter them at:
**Vercel dashboard → your project → Logs** (filter by `"level":"error"`)

---

### 2. `components/ErrorReporter.tsx` — Global JS error handler

Catches two error classes React's error boundaries miss:

| Event | What it catches |
|---|---|
| `window.onerror` | Uncaught synchronous JS errors |
| `window.unhandledrejection` | Unhandled promise rejections |

Mounted once in `app/layout.tsx`. Renders nothing.

---

### 3. `app/error.tsx` — Route-level error boundary

Catches render errors thrown inside any page or layout below the root.
Styled to match the site. Shows error digest, "Try again" (calls `reset()`), and "Return home" CTA.

---

### 4. `app/global-error.tsx` — Root layout error boundary

Catches errors thrown inside `app/layout.tsx` itself.
Must render its own `<html><body>` — root layout may have failed, so CSS variables and fonts are unavailable. Uses static fallback colors.

---

### 5. `app/not-found.tsx` — Custom 404 page

Rendered by Next.js when no route matches. Styled to match the site. Returns a "Return home" CTA.

---

## Vercel Built-In Observability (Free Tier)

No setup needed — these are on by default:

| Feature | Where to find it |
|---|---|
| **Function logs** | Project → Logs → filter by Function |
| **Build logs** | Project → Deployments → click any deploy |
| **Edge network errors** | Project → Analytics (if Vercel Analytics enabled) |
| **Structured log search** | Logs → search `"level":"error"` |

Structured logs from `reportError()` are searchable here within minutes of a production error occurring.

---

## Uptime Monitoring

Vercel does not alert on downtime by default. Recommended free option:

**[UptimeRobot](https://uptimerobot.com)** (free tier: 50 monitors, 5-minute intervals)

Setup:
1. Create a free account
2. Add a new monitor: **HTTP(S)** type, URL = `https://nathanwituk.com` (or your domain)
3. Set interval to **5 minutes**
4. Add an alert contact (email or Slack webhook)

This gives you a ping and email/notification within 5–10 minutes of downtime.

---

## Upgrade Path: Sentry

When traffic grows or you need error grouping, replays, and performance tracing:

1. `npm install @sentry/nextjs`
2. `npx @sentry/wizard@latest -i nextjs` — generates `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
3. In `lib/reportError.ts`, replace the `console.error` production block with `Sentry.captureException(error, { tags: { context } })`
4. Add `NEXT_PUBLIC_SENTRY_DSN=https://...` to `.env.local` and Vercel environment variables
5. Update `next.config.ts` to wrap with `withSentryConfig(nextConfig, { ...sentryWebpackOptions })`
6. Add `https://*.ingest.sentry.io` to `connect-src` in the CSP header (`next.config.ts`)

Sentry's free tier (Developer plan) covers 5k errors/month — more than enough for a portfolio.

---

## What Doesn't Apply Here

| Concern | Status |
|---|---|
| Server/API error logs | N/A — no API routes or server actions |
| Request logging / rate limiting | N/A — no endpoints to protect |
| Admin/audit logging | N/A — no auth or admin interface |
| Database query monitoring | N/A — no database |
| Background job monitoring | N/A — no jobs or crons |

This is a static portfolio with a single Next.js page tree. The scaffolding above covers the realistic failure modes: JS runtime errors, unhandled promise rejections, React render crashes, and downtime.

---

## Summary Checklist

- [x] Structured error logging (`lib/reportError.ts`)
- [x] Global JS error handler (`components/ErrorReporter.tsx`)
- [x] Route error boundary (`app/error.tsx`)
- [x] Root error boundary (`app/global-error.tsx`)
- [x] Custom 404 page (`app/not-found.tsx`)
- [ ] UptimeRobot monitor — set up manually (free, 5 min)
- [ ] Sentry — optional upgrade when needed
