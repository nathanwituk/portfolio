/**
 * Central asset manifest.
 * All media paths live here — update once, reflects everywhere.
 *
 * Swap a placeholder:
 *  1. Drop the real file into the matching /public path.
 *  2. If the filename changes, update the path below.
 *  3. Done — the component picks it up automatically.
 */

// ── Hero panels ──────────────────────────────────────────────────────────────
export const HERO_ASSETS = {
  /**
   * Left fold — Study Sync Dashboard walkthrough video.
   * Source: "Final DashboardWalkthrough Portfolio 1" in Figma
   * Aspect: 413 × 505  (portrait)
   * Format: .mp4 (H.264)
   */
  dashboardVideo: "/videos/hero/dashboard-walkthrough.mp4",

  /**
   * Right fold — Speedster arm video.
   * Source: "SpeedsterFinalArmVideo 1" in Figma
   * Aspect: 1080 × 1400  (portrait)
   * Format: .mp4 (H.264)
   */
  speedsterArmVideo: "/videos/hero/speedster-arm.mp4",
} as const;

// ── Project sections ─────────────────────────────────────────────────────────
export const PROJECT_ASSETS = {
  /**
   * Speedster — hero mockup video used on homepage section + case study hero.
   * Crop 25% from each side before displaying (show center 50% of width).
   * Format: .mov
   */
  speedsterHeroVideo: "/videos/speedster/speedster-hero-mockup.mov",

  /**
   * Speedster — homepage second section video (replaces grey box).
   * Format: .mov
   */
  speedsterSection2Video: "/videos/hero/SpeedsterSection2.mov",
} as const;

// ── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ASSETS = {
  /**
   * Wordmark SVG — "Nathan Wituk" logo lockup.
   * Export from Figma node 227:8126 as SVG.
   * Display: 168.041 × 20.543px
   */
  wordmark: "/images/nav/nathan-wituk-wordmark.svg",
} as const;
