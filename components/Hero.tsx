"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HERO_ASSETS } from "@/lib/assets";
import FigmaButton from "@/components/ui/FigmaButton";

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
    href: "/work/studysync",
    accentColor: "#b2e639",
    accentColorHover: "#c5f53f",
    inkColor: "#000000",
    videoSrc: HERO_ASSETS.dashboardVideo,
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
      "Exploring a new approach to time and spatial awareness through the design of a minimal, intuitive tool inspired by calendars, clocks, and compasses.",
    href: "/work/speedster",
    accentColor: "#ff5d00",
    accentColorHover: "#e05200",
    videoSrc: HERO_ASSETS.speedsterArmVideo,
    videoAspect: "1080 / 1400",
    defaultRotate: 0,
    hoverRotate: 0,
  },
];

/* ─────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────── */
const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const HOVER_EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

// Side panels slide in from off-screen (x is relative to the panel's own width)
const panelSlide = {
  hidden: (side: "left" | "right") => ({
    x: side === "left" ? "-100%" : "100%",
  }),
  visible: {
    x: 0,
    transition: { duration: 1.0, ease: EASE, delay: 0.1 },
  },
};

const CENTER_TRANS = { duration: 0.65, ease: HOVER_EASE };

/* ─────────────────────────────────────────────
   Desktop FoldPanel
   Fills its flex-slot container (w-full h-full).
   Parent flex slot owns the sizing; this component
   handles video + hover text card only.
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
      // Fills the flex slot: w-full h-full. relative for absolute children.
      // overflow-hidden clips the video (minWidth: 110%) and the hover card.
      className="relative w-full h-full overflow-hidden cursor-pointer"
      custom={panel.side}
      variants={panelSlide}
      initial="hidden"
      animate="visible"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* ── Video: centered within the panel, rotated by default ── */}
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
          animate={{
            x: "-50%",
            y: hovered ? "-68%" : "-50%",
            rotate: hovered ? panel.hoverRotate : panel.defaultRotate,
          }}
          transition={{ duration: 0.65, ease: HOVER_EASE }}
        />
      </div>

      {/* ── Hover text card: slides up from below the panel ── */}
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
            paddingLeft:  isLeft  ? "clamp(20px, 6.25vw, 80px)" : "17.938px",
            paddingRight: !isLeft ? "clamp(20px, 6.25vw, 80px)" : "17.938px",
          }}
        >
          <div className="flex flex-col" style={{ gap: "18.963px" }}>
            <div className="flex flex-col" style={{ gap: "3.075px" }}>
              <p
                className="font-semibold uppercase leading-[1.1]"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  color: "var(--text-tertiary)",
                }}
              >
                {panel.category}
              </p>
              <p
                className="font-normal leading-none"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
                  letterSpacing: "-1.11px",
                  color: "var(--text-primary)",
                  transition: "color 200ms ease",
                }}
              >
                {panel.title}
              </p>
            </div>
            <div className="flex flex-col" style={{ gap: "11.275px" }}>
              <p
                className="font-normal"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "14px",
                  letterSpacing: "0.28px",
                  lineHeight: "1.4",
                  color: "var(--text-primary)",
                  transition: "color 200ms ease",
                }}
              >
                {panel.description}
              </p>
              <FigmaButton
                href={panel.href}
                external={false}
                accentColor={panel.accentColor}
                accentColorHover={panel.accentColorHover}
                inkColor={panel.inkColor}
              >
                View Project
              </FigmaButton>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Mobile FoldPanel
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
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "4 / 5.5" }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: EASE, delay: revealDelay }}
    >
      {/* Video — shifts up when card reveals, mirroring desktop hover */}
      <motion.video
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
        animate={{ y: inView ? "-12%" : "0%" }}
        transition={{ duration: 0.7, ease: HOVER_EASE, delay: revealDelay + 0.1 }}
      />

      {/* Text card — slides up from below, same as desktop hover */}
      <div className="absolute left-0 right-0 overflow-hidden" style={{ bottom: 0, height: "260px" }}>
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ y: "100%" }}
          animate={{ y: inView ? "0%" : "100%" }}
          transition={{ duration: 0.65, ease: HOVER_EASE, delay: revealDelay + 0.18 }}
          style={{
            backgroundColor: "var(--bg-primary)",
            transition: "background-color 200ms ease, color 200ms ease",
            padding: "18px 20px 28px",
          }}
        >
          <div className="flex flex-col" style={{ gap: "16px" }}>
            <div className="flex flex-col" style={{ gap: "4px" }}>
              <p
                className="font-semibold uppercase leading-[1.1]"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  color: "var(--text-tertiary)",
                }}
              >
                {panel.category}
              </p>
              <p
                className="font-normal leading-none"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "1.75rem",
                  letterSpacing: "-1.11px",
                  color: "var(--text-primary)",
                  transition: "color 200ms ease",
                }}
              >
                {panel.title}
              </p>
            </div>
            <p
              className="font-normal"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "14px",
                letterSpacing: "0.28px",
                lineHeight: "1.4",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              {panel.description}
            </p>
            <FigmaButton
              href={panel.href}
              external={false}
              accentColor={panel.accentColor}
              accentColorHover={panel.accentColorHover}
              inkColor={panel.inkColor}
            >
              View Project
            </FigmaButton>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Mobile hero text
───────────────────────────────────────────── */
function MobileHeroText({ phase }: { phase: number }) {
  const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        paddingTop: "clamp(48px, 10vh, 80px)",
        paddingBottom: "clamp(48px, 10vh, 80px)",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "280px" }}
      >
        {/* Wrapper: sized to widest child so the group centers as a unit */}
        <div style={{
          position: "absolute",
          top: "90px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "inline-flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "flex-start",
        }}>
          {/* "Welcome to" — enters large, shrinks when "my portfolio" appears */}
          <motion.p
            className="whitespace-nowrap"
            style={{ fontFamily: FONT, letterSpacing: "0.5px", lineHeight: 1, color: "var(--text-primary)", transition: "color 200ms ease" }}
            initial={{ opacity: 0, y: 220, fontSize: "3.5rem" }}
            animate={
              phase === 0
                ? { opacity: 0, y: 220, fontSize: "3.5rem" }
                : phase === 1
                ? { opacity: 1, y: 0, fontSize: "3.5rem" }
                : { opacity: 1, y: 0, fontSize: "1.5rem" }
            }
            transition={CENTER_TRANS}
          >
            Welcome to
          </motion.p>

          {/* "my portfolio 😏" — semibold italic, Figma sizing */}
          <motion.p
            className="whitespace-nowrap"
            style={{ fontFamily: FONT, fontSize: "3.25rem", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.29, fontStyle: "italic", color: "var(--text-primary)", transition: "color 200ms ease" }}
            initial={{ opacity: 0, y: 220 }}
            animate={
              phase < 2
                ? { opacity: 0, y: 220 }
                : { opacity: 1, y: 0 }
            }
            transition={CENTER_TRANS}
          >
            my portfolio <span style={{ fontStyle: "normal" }}>😏</span>
          </motion.p>
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
export default function Hero() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 0);
    const t2 = setTimeout(() => setPhase(2), 750);
    const t3 = setTimeout(() => setPhase(3), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative w-full lg:overflow-hidden lg:min-h-[85vh]"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      {/* ── MOBILE layout ── */}
      <div className="flex flex-col lg:hidden">
        <MobileHeroText phase={phase} />
        <MobileFoldPanel panel={panels[1]} revealDelay={0} cropRight={25} />
      </div>

      {/* ── DESKTOP layout: absolute flex row filling the section ──
          Using flex with %-based flex-basis instead of vw-based absolute
          positioning ensures panels and center text all reference the same
          container width, eliminating the scrollbar-induced vw vs % drift
          that causes localhost/production layout mismatches.
      ── */}
      <div
        className="absolute inset-0 hidden lg:flex"
        style={{ alignItems: "stretch" }}
      >
        {/* Left panel slot — flex-basis uses % (container-relative), not vw */}
        <div
          style={{
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: "clamp(260px, 36%, 500px)",
            position: "relative",
          }}
        >
          <FoldPanel panel={panels[0]} />
        </div>

        {/* Center gap — fills remaining space, exactly mirrors the center text width */}
        <div style={{ flex: 1 }} aria-hidden="true" />

        {/* Right panel slot */}
        <div
          style={{
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: "clamp(260px, 36%, 500px)",
            position: "relative",
          }}
        >
          <FoldPanel panel={panels[1]} />
        </div>
      </div>

      {/* ── Center text panel ──
          A flex container fills the section (inset-0) and centers its single
          child via align-items/justify-content. No transform, no dimension-
          derived negative margins. The only non-zero margins on the inner div
          are the Figma design offsets (+20px horizontal, -27.5px vertical) —
          those express design intent, not element-size arithmetic.

          The inner div keeps width/height only because its motion.p children
          use absolute px y-positions calibrated to a 538px tall stage; that
          is a text-animation concern, separate from this centering layer.

          pointer-events:none on both layers lets panel hover events pass
          through the center area (no interactive elements live here).
      ── */}
      <div
        className="absolute inset-0 hidden lg:flex"
        style={{
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "392px",
            height: "538px",
            flexShrink: 0,
            marginLeft: "20px",    // Figma: text stage is 20px right of visual center
            marginTop: "-27.5px",  // Figma: text stage is 27.5px above visual center
            pointerEvents: "none",
          }}
        >
        {/* "Welcome to" — enters large, shrinks when "my portfolio" appears */}
        <motion.p
          className="absolute whitespace-nowrap"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            letterSpacing: "0.5137px",
            lineHeight: "1",
            color: "var(--text-primary)",
            left: 0,
            textAlign: "left",
          }}
          initial={{ opacity: 0, y: 600, fontSize: "62px" }}
          animate={
            phase === 0
              ? { opacity: 0, y: 600, fontSize: "62px"      }
              : phase === 1
              ? { opacity: 1, y: 220, fontSize: "62px"      }
              : { opacity: 1, y: 250, fontSize: "25.684px"  }
          }
          transition={CENTER_TRANS}
        >
          Welcome to
        </motion.p>

        {/* "my portfolio 😏" — semibold italic, Figma sizing */}
        <motion.p
          className="absolute whitespace-nowrap"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "57.554px",
            fontWeight: 600,
            letterSpacing: "-1.1511px",
            lineHeight: "1.29",
            fontStyle: "italic",
            color: "var(--text-primary)",
            left: 0,
            textAlign: "left",
          }}
          initial={{ opacity: 0, y: 600 }}
          animate={
            phase < 2
              ? { opacity: 0, y: 600 }
              : { opacity: 1, y: 280 }
          }
          transition={CENTER_TRANS}
        >
          my portfolio <span style={{ fontStyle: "normal" }}>😏</span>
        </motion.p>
        </div> {/* end inner text stage */}
      </div> {/* end flex centering wrapper */}
    </section>
  );
}
