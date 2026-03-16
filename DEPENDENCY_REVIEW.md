# Dependency Review

**Project**: Nathan Wituk Portfolio
**Date**: March 16, 2026
**Node**: via npm
**Result**: ✅ Clean — 0 vulnerabilities, 0 unused deps, 1 update applied

---

## 1. Security Audit

```
npm audit → found 0 vulnerabilities
```

No known CVEs across all 364 installed packages (direct + transitive).

---

## 2. Production Dependencies

| Package | Declared | Installed | Used In Source | Notes |
|---|---|---|---|---|
| `next` | `16.1.6` | `16.1.6` | `next`, `next/image`, `next/font/google` | Framework — pinned, correct |
| `react` | `19.2.3` | `19.2.3` | All components | Pinned, see update section |
| `react-dom` | `19.2.3` | `19.2.3` | `app/layout.tsx` | Pinned, see update section |
| `framer-motion` | `^12.35.2` | `12.37.0` ✅ | All animated components | **Updated this session** |

**No unused production dependencies.** All four packages have confirmed imports in source.

---

## 3. Dev Dependencies

| Package | Declared | Installed | Purpose | Notes |
|---|---|---|---|---|
| `typescript` | `^5` | `5.9.3` | Type checking | Current, no update needed |
| `tailwindcss` | `^4` | `4.2.1` | Styling | Current in v4 line |
| `@tailwindcss/postcss` | `^4` | `4.2.1` | PostCSS integration | Required pair with tailwindcss |
| `@types/node` | `^20` | `20.19.37` | Node.js types | See update section |
| `@types/react` | `^19` | `19.2.14` | React types | Current |
| `@types/react-dom` | `^19` | `19.2.3` | ReactDOM types | Current |
| `eslint` | `^9` | `9.39.4` | Linting | See update section |
| `eslint-config-next` | `16.1.6` | `16.1.6` | Next.js lint rules | Pinned to match Next version |

**No unused dev dependencies.**

---

## 4. Updates Applied This Session

| Package | Before | After | Type | Risk |
|---|---|---|---|---|
| `framer-motion` | `12.35.2` | `12.37.0` | Minor / patch | None — within `^12` semver range |

Run: `npm update framer-motion`

---

## 5. Updates Deferred — Reason Required

### `react` + `react-dom`: 19.2.3 → 19.2.4 (patch)
- **Safe:** Patch release, no breaking changes.
- **Deferred:** Pinned without `^` in `package.json`. Requires explicit version bump.
- **Action when ready:**
  ```json
  "react": "19.2.4",
  "react-dom": "19.2.4"
  ```
  Then run `npm install`.

### `@types/node`: `^20` → latest `25.x` (major)
- **Do not update yet.** Major version jump. Node.js 20 is the current LTS; `@types/node@25` targets a future Node release whose APIs may not match the runtime. No action needed — `^20` will auto-track 20.x patch releases.

### `eslint`: `^9` → `10.x` (major)
- **Do not update yet.** ESLint 10 may introduce breaking rule or flat-config changes. `eslint-config-next` must be updated in lockstep; the current version (`16.1.6`) is pinned against ESLint 9. Update both together only after verifying compatibility.

---

## 6. "Extraneous" Package Investigation

`npm list --depth=0` reported these five packages as extraneous:

```
@emnapi/core@1.8.1
@emnapi/runtime@1.8.1
@emnapi/wasi-threads@1.1.0
@napi-rs/wasm-runtime@0.2.12
@tybys/wasm-util@0.10.1
```

**Finding: False alarm — do not remove.**

These are Tailwind CSS v4's WebAssembly platform bindings for the `wasm32-wasi` target. Tailwind v4 ships its Oxide CSS engine (written in Rust) as a WASM binary (`@tailwindcss/oxide-wasm32-wasi`) that requires these N-API/WASM runtime packages. npm marks them as "extraneous" because they are optional platform-conditional dependencies that fall outside npm's standard dependency resolution graph for macOS, even though they are correctly recorded in `package-lock.json`.

`npm prune` was run and correctly left them in place. **No action required.**

---

## 7. Third-Party Scripts

| Script | How loaded | Executes remote code? | Risk |
|---|---|---|---|
| None | — | — | — |

**No third-party scripts are loaded at runtime.** This project contains no analytics tags, CDN-hosted JS, tag managers, A/B testing tools, chat widgets, or ad scripts.

The only scripts in the HTML output are:
1. Next.js runtime bundles — served from `/_next/static/` (self-hosted, built from audited source)
2. The anti-FOUC inline `<script>` in `app/layout.tsx` — a 92-character static string with no external dependencies

---

## 8. Third-Party Assets — Self-Hosting Status

| Asset | Current source | Self-hosted? | Action |
|---|---|---|---|
| Instrument Sans font | `next/font/google` — downloaded at build time, served from `/_next/static/` | ✅ Yes | None |
| Figma prototype embeds | `embed.figma.com` iframes | ❌ Cannot self-host | Acceptable — interactive prototypes require Figma's platform |
| Nathan portrait image | `PROJECT_ASSETS.portrait` → `/images/about/nathan-portrait.jpg` | ⚠️ Path defined, file missing | Add file to `/public/images/about/` |
| Fearless Inventory iPhone mockup | `PROJECT_ASSETS.fearlessInventoryIphone` → `/images/projects/fearless-inventory-iphone.png` | ⚠️ Path defined, file missing | Add file to `/public/images/projects/` |
| Speedster variants panel | `/images/speedster/variants-state.jpg` | ✅ Yes | None |
| All other images/videos | `/public/images/speedster/` | ✅ Yes | None |

The `next.config.ts` still allows `www.figma.com` in `remotePatterns` as a Next.js image optimisation fallback. Once the two missing local images are added, this entry can be removed:

```ts
// Remove from next.config.ts once both local files are in place:
{
  protocol: "https",
  hostname: "www.figma.com",
  pathname: "/api/mcp/asset/**",
}
```

---

## 9. Risk Assessment

| Category | Finding | Severity |
|---|---|---|
| Known CVEs | 0 found across 364 packages | ✅ None |
| Unused production deps | 0 found | ✅ None |
| Abandoned / unmaintained packages | None — all deps actively maintained | ✅ None |
| Remote script execution at runtime | None | ✅ None |
| Supply chain risk | Low — only 4 production deps (next, react, react-dom, framer-motion), all major ecosystem packages with high publication scrutiny | ✅ Low |
| Extraneous packages | 5 found — confirmed as Tailwind v4 WASM platform bindings, not orphans | ✅ Resolved |
| Outdated with breaking changes | eslint 9→10, @types/node 20→25 | ⚠️ Hold |
| Outdated patch releases | react/react-dom 19.2.3→19.2.4 | 🟡 Safe when ready |
| Missing local image files | 2 images still need to be added to `/public/` | 🟡 Pre-launch |

---

## 10. Summary of Actions

| Action | Status |
|---|---|
| `npm audit` — verified 0 vulnerabilities | ✅ Done |
| `npm prune` — confirmed extraneous packages are Tailwind WASM bindings | ✅ Done |
| `framer-motion` 12.35.2 → 12.37.0 | ✅ Updated |
| `react` / `react-dom` 19.2.3 → 19.2.4 | ⬜ Safe, apply when ready |
| `eslint` 9 → 10 + `eslint-config-next` in lockstep | ⬜ Hold — verify compatibility first |
| `@types/node` 20 → 25 | ⬜ Hold — wait for LTS alignment |
| Remove `www.figma.com` from `next.config.ts` remotePatterns | ⬜ After local image files are added |
