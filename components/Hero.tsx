"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HERO_ASSETS } from "@/lib/assets";

/* ─────────────────────────────────────────────
   Panel data — video paths come from lib/assets.ts
───────────────────────────────────────────── */
const panels = [
  {
    id: "dashboard",
    side: "left" as const,
    category: "USER INTERFACE & EXPERIENCE",
    title: "Study Sync Dashboard",
    description:
      "Designing an intuitive quick-glance dashboard for college students who have trouble tracking and managing their academic schedule and workload.",
    href: "#study-sync",
    comingSoon: true,
    // Figma: Dashboard_HeaderLeftFold — portrait video rotated 7.18deg default, 2.1deg on hover
    videoSrc: HERO_ASSETS.dashboardVideo,
    // Aspect ratio from Figma: 413.08 / 505.05 ≈ 0.818 (portrait)
    videoAspect: "413 / 505",
    defaultRotate: 7.18,
    hoverRotate: 2.1,
  },
  {
    id: "speedster",
    side: "right" as const,
    category: "DIGITAL REBRAND & UX",
    title: "Speedster",
    description:
      "Designing a small but useful tool that helps the user orient themselves in time or space. I'm making a new kind of calendar or clock or compass.",
    href: "#speedster",
    // Figma: Speedster_HeaderRightFold — portrait video, no rotation
    videoSrc: HERO_ASSETS.speedsterArmVideo,
    // Aspect ratio from Figma: 1080 / 1400 ≈ 0.771 (portrait)
    videoAspect: "1080 / 1400",
    defaultRotate: 0,
    hoverRotate: 0,
  },
];

/* ─────────────────────────────────────────────
   Animation variants — exact Figma timing
───────────────────────────────────────────── */
const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
// Slightly softer ease for hover interactions (ease-out feel)
const HOVER_EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

// Side panels slide in from off-screen
const panelSlide = {
  hidden: (side: "left" | "right") => ({
    x: side === "left" ? "-100%" : "100%",
  }),
  visible: {
    x: 0,
    transition: { duration: 1.0, ease: EASE, delay: 0.1 },
  },
};

// ── Center text animation phases ─────────────────────────────────────────────
// Phase 0: all hidden (initial — text below panel, clipped by overflow-hidden)
// Phase 1: "OMG," slides up large (87px, centered) — Figma F707
// Phase 2: "OMG," shrinks to final spot, "you found" enters large — Figma F708
// Phase 3: "you found" shrinks to final, "my portfolio 😏" joins — Figma Variant5
//
// Final positions from Figma Variant5 (392×538px panel):
//   "OMG,"            left:42,  top:173, fontSize:42.624px
//   "you found "      left:161, top:179, fontSize:42.807px
//   "my portfolio 😏" left:4,   top:229, fontSize:62.772px italic
// ─────────────────────────────────────────────────────────────────────────────
const CENTER_TRANS = { duration: 0.65, ease: HOVER_EASE };

/* ─────────────────────────────────────────────
   Desktop FoldPanel — hover behaviour (desktop only, unchanged)
───────────────────────────────────────────── */
function FoldPanel({
  panel,
}: {
  panel: (typeof panels)[number];
}) {
  const [hovered, setHovered] = useState(false);
  const isLeft = panel.side === "left";

  return (
    <motion.div
      // Panels: clamp(260px, 30vw, 420px) wide, height 717px, top=-41px bleeds above hero.
      className="absolute overflow-hidden cursor-pointer"
      style={{
        width: "clamp(260px, 36vw, 500px)",
        height: "717px",
        top: "-41px",
        [isLeft ? "left" : "right"]: "0",
      }}
      custom={panel.side}
      variants={panelSlide}
      initial="hidden"
      animate="visible"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* ── Media: video, centered + cropped.
          On hover: de-rotates and shifts upward (Figma Variant2).
          Default: 7.18deg rotation (dashboard) / 0deg (speedster), vertically centered.
          Hover: 2.1deg rotation (dashboard), shifts to upper portion of panel.
      ── */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.video
          src={panel.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute w-full h-auto object-cover"
          style={{
            top: "50%",
            left: "50%",
            aspectRatio: panel.videoAspect,
            minWidth: "110%",
          }}
          // Framer Motion handles x/y/rotate as transforms.
          // Default: translate(-50%, -50%) = centered.
          // Hover: shift up ~20% of element height so video moves to upper panel.
          animate={{
            x: "-50%",
            y: hovered ? "-68%" : "-50%",
            rotate: hovered ? panel.hoverRotate : panel.defaultRotate,
          }}
          transition={{ duration: 0.65, ease: HOVER_EASE }}
        />
      </div>

      {/* Text card — hidden by default (y: 100% = below panel clip).
          Slides up into view on hover.
          Figma: p-[17.938px], 282px wide, bg-white, positioned at bottom of panel.
      ── */}
      <div
        className="absolute left-0 right-0 overflow-hidden"
        style={{ bottom: 0, height: "300px" }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ y: "100%" }}
          animate={{ y: hovered ? "0%" : "100%" }}
          transition={{ duration: 0.6, ease: HOVER_EASE }}
          style={{
            backgroundColor: "var(--bg-primary)",
            transition: "background-color 200ms ease, color 200ms ease",
            paddingTop: "17.938px",
            paddingBottom: "17.938px",
            // Outer edge aligns with the page's 80px grid margin;
            // inner edge keeps the original Figma inset.
            paddingLeft:  isLeft  ? "clamp(20px, 6.25vw, 80px)" : "17.938px",
            paddingRight: !isLeft ? "clamp(20px, 6.25vw, 80px)" : "17.938px",
          }}
        >
          <div className="flex flex-col" style={{ gap: "18.963px" }}>
            {/* Category + title */}
            <div className="flex flex-col" style={{ gap: "3.075px" }}>
              <p
                className="font-semibold uppercase leading-[1.1]"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "1rem",
                  letterSpacing: "-0.48px",
                  color: "var(--text-tertiary)",
                }}
              >
                {panel.category}
              </p>
              <p
                className="font-normal leading-none"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "2.3125rem",
                  letterSpacing: "-1.11px",
                  color: "var(--text-primary)",
                  transition: "color 200ms ease",
                }}
              >
                {panel.title}
              </p>
            </div>

            {/* Description + CTA */}
            <div className="flex flex-col" style={{ gap: "11.275px" }}>
              <p
                className="font-normal"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "0.28px",
                  lineHeight: "1.4",
                  color: "var(--text-primary)",
                  transition: "color 200ms ease",
                }}
              >
                {panel.description}
              </p>
              {panel.comingSoon ? (
                <span
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "-0.48px",
                    lineHeight: "1.1",
                    color: "var(--text-tertiary)",
                  }}
                >
                  Coming Soon
                </span>
              ) : (
                <a
                  href={panel.href}
                  className="flex items-center font-medium group"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "-0.48px",
                    lineHeight: "1.1",
                    color: "#ff5d00",
                    gap: "3px",
                  }}
                >
                  <span>See Project</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Mobile FoldPanel — scroll-triggered reveal
   Video at natural 4:5 aspect ratio (no fixed
   height, no text card overlay = no clipping).
   Text sits below the video in normal flow.
───────────────────────────────────────────── */
function MobileFoldPanel({
  panel,
  revealDelay = 0,
  cropRight = 0,
}: {
  panel: (typeof panels)[number];
  revealDelay?: number;
  cropRight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-48px" });

  return (
    <div ref={ref} className="w-full">
      {/* ── Video ──────────────────────────────────────────────────────────────
          4:5 aspect ratio chosen to show both portrait source videos with
          near-zero cropping:
            • Dashboard  413 × 505 px  (ratio 0.818) — container ratio 0.800
              → scales to fit height, 2.3 % horizontal crop each side
            • Speedster  1080 × 1400 px (ratio 0.771) — container ratio 0.800
              → scales to fit width,  0.6 % vertical crop at bottom only
      ── */}
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 5" }}
        initial={{ opacity: 0, y: 44 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
        transition={{ duration: 0.75, ease: EASE, delay: revealDelay }}
      >
        <video
          src={panel.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full object-cover"
          style={cropRight > 0
            ? { width: `${100 + cropRight}%`, objectPosition: "left center", left: 0, right: "auto" }
            : { width: "100%" }
          }
        />
      </motion.div>

      {/* ── Text card — below the video, always fully visible ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, ease: HOVER_EASE, delay: revealDelay + 0.22 }}
        style={{
          backgroundColor: "var(--bg-primary)",
          transition: "background-color 200ms ease, color 200ms ease",
          padding: "24px 20px 32px",
        }}
      >
        <div className="flex flex-col" style={{ gap: "18px" }}>
          {/* Category + title */}
          <div className="flex flex-col" style={{ gap: "4px" }}>
            <p
              className="font-semibold uppercase leading-[1.1]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.48px",
                color: "var(--text-tertiary)",
              }}
            >
              {panel.category}
            </p>
            <p
              className="font-normal leading-none"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "2.3125rem",
                letterSpacing: "-1.11px",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              {panel.title}
            </p>
          </div>

          {/* Description */}
          <p
            className="font-normal"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "0.875rem",
              letterSpacing: "0.28px",
              lineHeight: "1.4",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            {panel.description}
          </p>

          {/* CTA */}
          {panel.comingSoon ? (
            <span
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.48px",
                lineHeight: "1.1",
                color: "var(--text-tertiary)",
              }}
            >
              Coming Soon
            </span>
          ) : (
            <a
              href={panel.href}
              className="flex items-center font-medium group w-fit"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.48px",
                lineHeight: "1.1",
                color: "#ff5d00",
                gap: "3px",
              }}
            >
              <span>See Project</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Mobile hero text — full phase animation,
   sits ABOVE the fold panels on mobile.

   Uses the same overflow-hidden stage trick as
   desktop: elements start at y:280 (below the
   240px container, invisible) and slide up
   through three phases, mirroring the desktop.

   Final positions (phase 3) in the 240px stage:
     "OMG,"            y:40  fontSize:2.4375rem
     "you found"       y:84  fontSize:2.4375rem
     "my portfolio 😏" y:132 fontSize:3.25rem italic
───────────────────────────────────────────── */
function MobileHeroText({ phase }: { phase: number }) {
  const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

  return (
    /* Fill viewport height minus nav (46px) minus Speedster peek (72px).
       100dvh = dynamic viewport height — accounts for mobile browser chrome.
       Flex + justify-center keeps the animation stage true-centered. */
    <div
      className="flex flex-col items-center justify-center"
      style={{
        minHeight: "calc(100dvh - 46px - 25vw)",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      {/* Fixed-height animation stage — overflow:hidden clips elements
          that are below y:280 so the slide-up reveals look clean.
          Text is centered horizontally via left:0 right:0 + textAlign:center. */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "280px" }}
      >
        {/* "OMG,"
            ph1: enters large (5.5rem), vertically centered at y:92
            ph3: settles small (2.4375rem) at y:60 */}
        <motion.p
          className="absolute font-normal whitespace-nowrap"
          style={{ fontFamily: FONT, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--text-primary)", transition: "color 200ms ease", left: 0, right: 0, textAlign: "center" }}
          initial={{ opacity: 0, y: 320, fontSize: "5.5rem" }}
          animate={
            phase === 0
              ? { opacity: 0,  y: 320, fontSize: "5.5rem"    }
              : phase === 1
              ? { opacity: 1,  y: 92,  fontSize: "5.5rem"    }
              : { opacity: 1,  y: 60,  fontSize: "2.4375rem" }
          }
          transition={CENTER_TRANS}
        >
          OMG,
        </motion.p>

        {/* "you found"
            ph2: enters large (4.5rem) at y:109 (below settled "OMG,")
            ph3: shrinks (2.4375rem) and settles at y:109 */}
        <motion.p
          className="absolute font-normal whitespace-nowrap"
          style={{ fontFamily: FONT, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--text-primary)", transition: "color 200ms ease", left: 0, right: 0, textAlign: "center" }}
          initial={{ opacity: 0, y: 320, fontSize: "4.5rem" }}
          animate={
            phase < 2
              ? { opacity: 0, y: 320, fontSize: "4.5rem"    }
              : phase === 2
              ? { opacity: 1, y: 109, fontSize: "4.5rem"    }
              : { opacity: 1, y: 109, fontSize: "2.4375rem" }
          }
          transition={CENTER_TRANS}
        >
          you found
        </motion.p>

        {/* "my portfolio 😏"
            ph3: slides up from below into y:158 */}
        <motion.p
          className="absolute whitespace-nowrap"
          style={{ fontFamily: FONT, fontSize: "3.25rem", letterSpacing: "-0.04em", lineHeight: 1.2, fontStyle: "italic", color: "var(--text-primary)", transition: "color 200ms ease", left: 0, right: 0, textAlign: "center" }}
          initial={{ opacity: 0, y: 320 }}
          animate={
            phase < 3
              ? { opacity: 0, y: 320 }
              : { opacity: 1, y: 158 }
          }
          transition={CENTER_TRANS}
        >
          my portfolio <span style={{ fontStyle: "normal" }}>😏</span>
        </motion.p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
export default function Hero() {
  // 0=hidden → 1=OMG large → 2=OMG small+you found large → 3=all final
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700);   // OMG, slides up large
    const t2 = setTimeout(() => setPhase(2), 1450);  // OMG, shrinks, you found enters
    const t3 = setTimeout(() => setPhase(3), 2200);  // all settle at Variant5
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      className="relative w-full lg:overflow-hidden lg:h-[723px]"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      {/* ── MOBILE layout — stacked, visible below lg ── */}
      <div className="flex flex-col lg:hidden">
        {/* Phase animation — above both panels, plays on load */}
        <MobileHeroText phase={phase} />

        {/* Speedster — reveals on scroll, crop 15% from right for clean framing */}
        <MobileFoldPanel panel={panels[1]} revealDelay={0} cropRight={15} />
      </div>

      {/* ── DESKTOP layout — absolute positioning, visible at lg+ ── */}

      {/* Left fold — Study Sync */}
      <div className="hidden lg:block">
        <FoldPanel panel={panels[0]} />
      </div>

      {/* ── Center panel ──
          392×538px white rectangle centered in the hero.
          Sits between fold panels on desktop.
          Hidden on mobile — mobile uses MobileCenterText instead.
      ── */}
      <motion.div
        className="absolute hidden lg:block"
        style={{
          width: "392px",
          height: "538px",
          left: "calc(50% + 20px)",
          top: "calc(50% - 27.5px)",
          transform: "translate(-50%, -50%)",
          backgroundColor: "var(--bg-primary)",
          transition: "background-color 200ms ease",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.01, delay: 0.7 } }}
      >
        {/* ── Phase-driven text animation ──────────────────────────────────────
            All elements span full width with textAlign:center.
            Stacked vertically, centered block within the 392×538 panel:
              Content height ≈ 203px → starts at y:168 (centered in 538px)
              "OMG,"            y:168  42.624px
              "you found"       y:233  42.807px
              "my portfolio 😏" y:290  62.772px italic
        ─────────────────────────────────────────────────────────────────── */}

        {/* "OMG," — ph1: large centered, ph2+: settled small centered */}
        <motion.p
          className="absolute font-normal whitespace-nowrap"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            letterSpacing: "-1.5px",
            lineHeight: "1.29",
            color: "var(--text-primary)",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 600, fontSize: "86.842px" }}
          animate={
            phase === 0
              ? { opacity: 0, y: 600, fontSize: "86.842px" }
              : phase === 1
              ? { opacity: 1, y: 213, fontSize: "86.842px" }
              : { opacity: 1, y: 168, fontSize: "42.624px" }
          }
          transition={CENTER_TRANS}
        >
          OMG,
        </motion.p>

        {/* "you found" — ph2: large entry below OMG, ph3: settled small */}
        <motion.p
          className="absolute font-normal whitespace-nowrap"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            letterSpacing: "-0.6px",
            lineHeight: "1",
            color: "var(--text-primary)",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 600, fontSize: "78.48px" }}
          animate={
            phase < 2
              ? { opacity: 0, y: 600, fontSize: "78.48px" }
              : phase === 2
              ? { opacity: 1, y: 233, fontSize: "78.48px" }
              : { opacity: 1, y: 233, fontSize: "42.807px" }
          }
          transition={CENTER_TRANS}
        >
          you found
        </motion.p>

        {/* "my portfolio 😏" — ph3: slides up to final position */}
        <motion.p
          className="absolute whitespace-nowrap"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "62.772px",
            letterSpacing: "-1.5px",
            lineHeight: "1.29",
            fontStyle: "italic",
            color: "var(--text-primary)",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 600 }}
          animate={
            phase < 3
              ? { opacity: 0, y: 600 }
              : { opacity: 1, y: 290 }
          }
          transition={CENTER_TRANS}
        >
          my portfolio <span style={{ fontStyle: "normal" }}>😏</span>
        </motion.p>

      </motion.div>
    </section>
  );
}
