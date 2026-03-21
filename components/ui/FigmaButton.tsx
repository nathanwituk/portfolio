"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useEyeAnimation } from "@/hooks/useEyeAnimation";
import type { EyeAnimState } from "@/hooks/useEyeAnimation";

// ─────────────────────────────────────────────────────────────────────────────
// SVG constants
// ─────────────────────────────────────────────────────────────────────────────

const EYE_W = 22;
const EYE_H = 14;
const CX    = EYE_W / 2; // 11
const CY    = EYE_H / 2; //  7
const EASE  = [0.25, 0, 0, 1] as [number, number, number, number];

// ─────────────────────────────────────────────────────────────────────────────
// Per-state visual values
//
// scaleY      — eye outline vertical scale (1 = normal, 0.08 = closed, 1.8 = wide)
// pupilX/Y    — scripted pupil offset in SVG units (overridden during live tracking)
// pupilOp     — pupil opacity
// lashOp      — closed-state lash opacity  (visible when eye is blinking shut)
// wideLashOp  — wide-state lash opacity    (visible when eye is wide open on hover)
// outlineDur  — animation duration for the eye outline transition (seconds)
// pupilDur    — animation duration for the pupil transition (seconds)
//               Kept separate so the outline can ease slowly while the pupil
//               stays snappy during live tracking.
// ─────────────────────────────────────────────────────────────────────────────

interface EyeFrame {
  scaleY:     number;
  pupilX:     number;
  pupilY:     number;
  pupilOp:    number;
  lashOp:     number;
  wideLashOp: number;
  outlineDur: number;
  pupilDur:   number;
}

const FRAMES: Record<EyeAnimState, EyeFrame> = {
  idle:                    { scaleY: 1,    pupilX: 0,  pupilY: 0, pupilOp: 1, lashOp: 0, wideLashOp: 0, outlineDur: 0,    pupilDur: 0    },
  hoverSequence_closing:   { scaleY: 0.08, pupilX: 0,  pupilY: 0, pupilOp: 0, lashOp: 1, wideLashOp: 0, outlineDur: 0.22, pupilDur: 0.22 },
  hoverSequence_opening:   { scaleY: 1,    pupilX: 0,  pupilY: 0, pupilOp: 1, lashOp: 0, wideLashOp: 0, outlineDur: 0.22, pupilDur: 0.22 },
  hoverSequence_lookRight: { scaleY: 1,    pupilX: 4,  pupilY: 0, pupilOp: 1, lashOp: 0, wideLashOp: 0, outlineDur: 0.30, pupilDur: 0.30 },
  hoverSequence_lookLeft:  { scaleY: 1,    pupilX: -4, pupilY: 0, pupilOp: 1, lashOp: 0, wideLashOp: 0, outlineDur: 0.30, pupilDur: 0.30 },
  // tracking: outline eases back smoothly from any prior state; pupil stays quick
  tracking:                { scaleY: 1,    pupilX: 0,  pupilY: 0, pupilOp: 1, lashOp: 0, wideLashOp: 0, outlineDur: 0.25, pupilDur: 0.07 },
  resetting:               { scaleY: 1,    pupilX: 0,  pupilY: 0, pupilOp: 1, lashOp: 0, wideLashOp: 0, outlineDur: 0.40, pupilDur: 0.40 },
  // wide: eye opens large on hover; lashes visible; pupil tracks live
  wide:                    { scaleY: 1.8,  pupilX: 0,  pupilY: 0, pupilOp: 1, lashOp: 0, wideLashOp: 1, outlineDur: 0.30, pupilDur: 0.07 },
};

// ─────────────────────────────────────────────────────────────────────────────
// Eye paths
// ─────────────────────────────────────────────────────────────────────────────

const EYE_PATH = "M 0.8,7 C 5.5,0.8 16.5,0.8 21.2,7 C 16.5,13.2 5.5,13.2 0.8,7 Z";

// Closed-state lashes — 5 strokes fanning upward from the squished lid (y ≈ 7).
// Visible only during hoverSequence_closing (blink). (Figma node 295:91514)
const CLOSE_LASHES: Array<{ x1: number; y1: number; x2: number; y2: number }> = [
  { x1:  4.2, y1: 7.1, x2:  3.0, y2: 4.0 }, // far left  — ~22° outward
  { x1:  7.4, y1: 7.0, x2:  6.8, y2: 4.1 }, // near left — ~8°  outward
  { x1: 11.0, y1: 6.9, x2: 11.0, y2: 3.8 }, // centre    — vertical
  { x1: 14.6, y1: 7.0, x2: 15.2, y2: 4.1 }, // near right — ~8°  outward
  { x1: 17.8, y1: 7.1, x2: 19.0, y2: 4.0 }, // far right  — ~22° outward
];

// Wide-open-state lashes — same fan, but bases positioned at the top of the
// circular eye outline (scaleY 1.8 pushes the arc top to y ≈ −4.16 in SVG
// space; overflow:visible lets them render above the viewBox). (Figma 296:91529)
const WIDE_LASHES: Array<{ x1: number; y1: number; x2: number; y2: number }> = [
  { x1:  4.2, y1: -3.0, x2:  2.8, y2: -6.5 }, // far left  — arc curves lower at edges
  { x1:  7.4, y1: -4.0, x2:  6.8, y2: -7.2 }, // near left
  { x1: 11.0, y1: -4.5, x2: 11.0, y2: -8.0 }, // centre    — top of arc
  { x1: 14.6, y1: -4.0, x2: 15.2, y2: -7.2 }, // near right
  { x1: 17.8, y1: -3.0, x2: 19.2, y2: -6.5 }, // far right
];

// ─────────────────────────────────────────────────────────────────────────────
// FigmaButton
// ─────────────────────────────────────────────────────────────────────────────

interface FigmaButtonProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  accentColor?: string;
  accentColorHover?: string;
  inkColor?: string;  // color of eye strokes, text, and underline (default: "white")
  external?: boolean;
}

export default function FigmaButton({
  href,
  children = "View in Figma",
  className = "",
  accentColor = "#6f7142",
  accentColorHover = "#838653",
  inkColor = "white",
  external = true,
}: FigmaButtonProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { animState, pupilOffset, onMouseEnter, onMouseLeave } =
    useEyeAnimation(eyeRef as React.RefObject<HTMLElement | null>);

  const frame = FRAMES[animState];

  // During live tracking states, override scripted pupil pos with mouse offset
  const isLive = animState === "tracking" || animState === "wide";
  const px = isLive ? pupilOffset.x : frame.pupilX;
  const py = isLive ? pupilOffset.y : frame.pupilY;

  const handleMouseEnter = () => { setIsHovered(true);  onMouseEnter(); };
  const handleMouseLeave = () => { setIsHovered(false); onMouseLeave(); };

  return (
    <motion.a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileFocus={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      className={`group inline-flex w-fit items-center gap-[10px] rounded-[10px] self-start ${className}`}
      style={{
        padding: "12px 20px",
        fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
        fontSize: "0.875rem",
        textDecoration: "none",
        cursor: "pointer",
        userSelect: "none",
        color: inkColor,
        backgroundColor: isHovered ? accentColorHover : accentColor,
        boxShadow: isHovered
          ? "0 8px 24px rgba(0,0,0,0.22)"
          : "0 2px 6px rgba(0,0,0,0.0)",
        transition: "background-color 180ms ease, box-shadow 180ms ease",
        outline: "none",
      }}
    >
      <div
        ref={eyeRef}
        className="shrink-0 flex items-center justify-center"
        style={{ width: EYE_W, height: EYE_H }}
        aria-hidden="true"
      >
        <svg
          width={EYE_W}
          height={EYE_H}
          viewBox={`0 0 ${EYE_W} ${EYE_H}`}
          fill="none"
          style={{ overflow: "visible" }}
        >
          {/* Eye outline — scaleY collapses to slit (blink) or expands to circle (hover) */}
          <motion.g
            animate={{ scaleY: frame.scaleY }}
            transition={{ duration: frame.outlineDur, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <path
              d={EYE_PATH}
              stroke={inkColor}
              strokeWidth="1.25"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </motion.g>

          {/* Closed-state lashes — fade in as eye blinks shut */}
          <motion.g
            animate={{ opacity: frame.lashOp }}
            transition={{ duration: frame.outlineDur, ease: EASE }}
          >
            {CLOSE_LASHES.map((l, i) => (
              <line
                key={i}
                x1={l.x1} y1={l.y1}
                x2={l.x2} y2={l.y2}
                stroke={inkColor}
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            ))}
          </motion.g>

          {/* Wide-open lashes — fade in when hovering, positioned above the circular arc */}
          <motion.g
            animate={{ opacity: frame.wideLashOp }}
            transition={{ duration: frame.outlineDur, ease: EASE }}
          >
            {WIDE_LASHES.map((l, i) => (
              <line
                key={i}
                x1={l.x1} y1={l.y1}
                x2={l.x2} y2={l.y2}
                stroke={inkColor}
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            ))}
          </motion.g>

          {/* Pupil — stroke-only circle, tracks the mouse at its own faster duration */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={2.4}
            fill="none"
            stroke={inkColor}
            strokeWidth="1.2"
            animate={{
              x:       px,
              y:       py,
              opacity: frame.pupilOp,
            }}
            transition={{ duration: frame.pupilDur, ease: EASE }}
          />
        </svg>
      </div>

      <span className="relative">
        {children}
        <span
          className="absolute bottom-0 left-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100"
          style={{ transition: "transform 150ms ease-out", backgroundColor: inkColor }}
        />
      </span>
    </motion.a>
  );
}
