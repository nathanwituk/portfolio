/**
 * Typography tokens — Nathan's Portfolio
 *
 * Single source of truth for all text styles.
 * Font: Instrument Sans via var(--font-instrument-sans).
 *
 * ─── HEADING HIERARCHY ────────────────────────────────────────────────────────
 *
 *   displayText    → Page heroes, case study title cards
 *                    clamp(3.5rem→6.5625rem) / -0.05em / lh 1.05
 *
 *   headingLarge   → Major section headings ("Overview", "Research", "Classification")
 *                    clamp(3rem→5.5rem) / -0.03em / lh 1
 *                    Use when a section needs a prominent chapter-level title.
 *
 *   headingMedium  → Subsection headings within case study blocks
 *                    1.875rem / -0.03em / lh 1
 *                    Use for named blocks, titled cards, prototype sections.
 *
 *   headingSmall   → Panel and card titles (hero fold panels, homepage cards)
 *                    clamp(1.5rem→1.875rem) / -0.03em / lh 1
 *                    Use for compact titled areas inside larger sections.
 *
 * NOTE: displayText and headingLarge both use negative tracking and tight
 * line-height — they are stylistically related but serve different hierarchy levels.
 * Do not promote headingLarge into displayText roles.
 *
 * ─── BODY TEXT ────────────────────────────────────────────────────────────────
 *
 *   body           → Standard descriptions, short-form prose (1–3 sentences)
 *                    0.875rem / 0.02em / lh 1.4
 *
 *   bodyLong       → Extended multi-sentence paragraphs (overview columns,
 *                    research write-ups, multi-paragraph blocks)
 *                    0.875rem / 0.02em / lh 1.5
 *                    Use when text is 4+ sentences or fills a column.
 *
 *   bodyLarge      → Case study overview paragraphs (slightly bigger for
 *                    sections where text is the primary content)
 *                    1rem / 0.02em / lh 1.4
 *
 * ─── LABELS & TAGS (semantically distinct — do not conflate) ─────────────────
 *
 *   sectionLabel   → Structural micro-label. Identifies the type of a section
 *                    or content block. No background. Wide tracking (0.08em).
 *                    Used as: "Research Insights", "Competitive Research", "Case Study"
 *                    0.6875rem / SemiBold / uppercase / 0.08em
 *
 *   tagPill        → Categorisation badge. Labels the project type or topic.
 *                    Has a background (pill shape). Tight tracking (-0.03em).
 *                    Used as: "FIGMA", "UI UX", "3 WEEKS", "REDESIGN"
 *                    0.875rem / SemiBold / uppercase / -0.03em
 *
 *   Rule: if it has a background → tagPill. If it's plain text → sectionLabel.
 */

export const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

// ─── Headings ─────────────────────────────────────────────────────────────────

/** Page heroes, case study title cards */
export const displayText = {
  fontFamily: FONT,
  fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)",
  fontWeight: 400,
  letterSpacing: "-0.05em",
  lineHeight: 1.05,
} as const;

/** Major section headings: "Overview", "Research", "Classification" */
export const headingLarge = {
  fontFamily: FONT,
  fontSize: "clamp(3rem, 7vw, 5.5rem)",
  fontWeight: 400,
  letterSpacing: "-0.03em",
  lineHeight: 1,
} as const;

/** Subsection headings within case study blocks */
export const headingMedium = {
  fontFamily: FONT,
  fontSize: "1.875rem",
  fontWeight: 400,
  letterSpacing: "-0.03em",
  lineHeight: 1,
} as const;

/** Panel and card titles (hero fold panels, homepage cards) */
export const headingSmall = {
  fontFamily: FONT,
  fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
  fontWeight: 400,
  letterSpacing: "-0.03em",
  lineHeight: 1,
} as const;

/** @deprecated Use headingMedium — kept for backwards compatibility */
export const subsectionTitle = headingMedium;

// ─── Body ─────────────────────────────────────────────────────────────────────

/** Standard descriptions, short-form prose (1–3 sentences) */
export const body = {
  fontFamily: FONT,
  fontSize: "0.875rem",
  fontWeight: 400,
  letterSpacing: "0.02em",
  lineHeight: 1.4,
} as const;

/** Extended multi-sentence paragraphs — overview columns, research write-ups */
export const bodyLong = {
  fontFamily: FONT,
  fontSize: "0.875rem",
  fontWeight: 400,
  letterSpacing: "0.02em",
  lineHeight: 1.5,
} as const;

/** Slightly larger body for overview sections where text is the primary content */
export const bodyLarge = {
  fontFamily: FONT,
  fontSize: "1rem",
  fontWeight: 400,
  letterSpacing: "0.02em",
  lineHeight: 1.4,
} as const;

// ─── Labels & Tags ────────────────────────────────────────────────────────────

/**
 * Structural micro-label — plain text, no background.
 * Identifies what type of section or block this is.
 * Rule: plain text context → use sectionLabel.
 */
export const sectionLabel = {
  fontFamily: FONT,
  fontSize: "0.6875rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  lineHeight: 1,
} as const;

/**
 * Categorisation badge — pill shape with background.
 * Labels the project type, duration, or topic category.
 * Rule: has a background pill → use tagPill.
 */
export const tagPill = {
  fontFamily: FONT,
  fontSize: "0.875rem",
  fontWeight: 600,
  letterSpacing: "-0.03em",
  textTransform: "uppercase" as const,
  lineHeight: 1,
} as const;
