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
                See Project
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
  const inView = useInView(ref, { once: true, margin: "-48px" });

  return (
    <div ref={ref} className="w-full">
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
            See Project
          </FigmaButton>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Compose button — shared by desktop + mobile
───────────────────────────────────────────── */
function ComposeNavIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <path d="M3.59949 11.5472C3.66791 11.4113 3.76648 11.2928 3.88767 11.2008C4.00886 11.1087 4.14948 11.0456 4.29878 11.0162C4.60388 10.9613 4.90357 11.0639 5.13397 11.27M8.81131 14.249C8.51702 14.798 8.02112 15.2003 7.41183 15.311C6.80254 15.4207 6.20225 15.2165 5.74236 14.8025M8.20202 10.7165C8.34962 10.442 8.59712 10.2404 8.90131 10.1855C9.20731 10.1315 9.5061 10.2332 9.7365 10.4402M10.4619 5.12761C9.4269 6.10499 7.85283 6.88258 6.01596 7.21377C4.17998 7.54497 2.44301 7.36497 1.14253 6.80878C1.06087 6.77271 0.970337 6.76175 0.882433 6.77728C0.626837 6.82228 0.459439 7.09047 0.507139 7.37397L1.35133 12.2726C1.98132 15.9247 5.04127 17.6788 6.46055 18.3061C6.93034 18.5149 7.44873 18.541 7.95273 18.4501C8.45672 18.3592 8.93551 18.1531 9.30811 17.7931C10.4322 16.7059 12.7209 13.9871 12.0909 10.3349L11.2476 5.4363C11.1981 5.1528 10.9506 4.96021 10.695 5.00701C10.6067 5.02298 10.5261 5.06498 10.4619 5.12761Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.5832 13.9996C11.9099 13.9996 12.2338 13.9411 12.5371 13.8061C13.9564 13.1788 17.0164 11.4247 17.6464 7.7726L18.4905 2.87397C18.5391 2.59048 18.3709 2.32318 18.1153 2.27728C18.0274 2.26175 17.9368 2.27271 17.8552 2.30878C16.5556 2.86497 14.8177 3.04497 12.9808 2.71377C11.1449 2.38258 9.57169 1.60499 8.5358 0.627605C8.47181 0.565138 8.39066 0.523152 8.3027 0.507007C8.04711 0.460208 7.79871 0.652805 7.75011 0.9363L6.90683 5.83493C6.83213 6.26422 6.79883 6.68091 6.79883 7.08231" stroke="currentColor" strokeLinejoin="round"/>
    </svg>
  );
}

function ComposeButton({ visible }: { visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

  return (
    <motion.a
      href="/work/compose"
      className="group inline-flex items-center gap-[10px] rounded-[10px]"
      style={{
        padding: "12px 20px",
        fontFamily: FONT,
        fontSize: "0.875rem",
        textDecoration: "none",
        cursor: "pointer",
        userSelect: "none",
        color: "white",
        backgroundColor: hovered ? "#3730a3" : "#4438ca",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.22)" : "0 2px 6px rgba(0,0,0,0.0)",
        transition: "background-color 180ms ease, box-shadow 180ms ease",
        outline: "none",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={{ scale: 1.04 }}
      whileFocus={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="shrink-0 flex items-center">
        <ComposeNavIcon />
      </span>
      <span className="relative whitespace-nowrap">
        Compose - IXD 414 Draft
        <span
          className="absolute bottom-0 left-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100"
          style={{ transition: "transform 150ms ease-out", backgroundColor: "white" }}
        />
      </span>
    </motion.a>
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
        minHeight: "calc(100dvh - 46px - 25vw)",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "280px" }}
      >
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

      {/* Button appears after "my portfolio" settles */}
      <div className="flex justify-center mt-8">
        <ComposeButton visible={phase >= 4} />
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
    const t4 = setTimeout(() => setPhase(4), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <section
      className="relative w-full lg:overflow-hidden lg:h-[723px]"
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
        {/* "OMG," */}
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

        {/* "you found" */}
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

        {/* "my portfolio 😏" */}
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

        {/* Compose button — pops in after "my portfolio" settles */}
        <div
          className="absolute flex justify-center"
          style={{ top: "396px", left: 0, right: 0, pointerEvents: "auto" }}
        >
          <ComposeButton visible={phase >= 4} />
        </div>
        </div> {/* end inner text stage */}
      </div> {/* end flex centering wrapper */}
    </section>
  );
}
