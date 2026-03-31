"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { getTooltipMessage } from "@/lib/progress";

const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const CIRCLE_SIZE = 15; // px
const TOOLTIP_W = 339;  // px — matches Figma exactly
const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

export default function ExplorationProgress() {
  const { percentage } = useProgress();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const reduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isMouseRef = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  // Track container width for accurate flip threshold
  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [mounted]);

  const openTooltip = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeTooltip = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  // Tapping outside closes on mobile
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const bar = document.getElementById("exploration-progress-bar");
      if (bar && !bar.contains(target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  if (!mounted) return null;

  const pct = percentage; // 0–100

  // Flip to LEFT when a right-opening tooltip would overflow the right edge.
  // Threshold: circle pixel position > (containerWidth - tooltipWidth - 16px safety)
  const circlePixel = containerWidth > 0 ? (pct / 100) * containerWidth : pct * 10;
  const flipped = circlePixel > containerWidth - TOOLTIP_W - 16;

  const circleLeft = `clamp(0px, calc(${pct}% - ${CIRCLE_SIZE / 2}px), calc(100% - ${CIRCLE_SIZE}px))`;

  // Right-opening: tooltip left edge aligns with circle left edge
  const tooltipLeft = `clamp(0px, calc(${pct}% - ${CIRCLE_SIZE / 2}px), calc(100% - ${TOOLTIP_W}px - 8px))`;
  // Left-opening: tooltip right edge aligns with circle right edge
  const tooltipRight = `clamp(0px, calc(100% - ${pct}% - ${CIRCLE_SIZE / 2}px), calc(100% - ${TOOLTIP_W}px - 8px))`;

  return (
    <div
      ref={containerRef}
      id="exploration-progress-bar"
      className="absolute left-0 right-0 z-[49]"
      style={{ bottom: `${CIRCLE_SIZE / 2}px`, pointerEvents: "none" }}
      role="status"
      aria-live="polite"
      aria-label={`${pct}% of portfolio explored`}
    >
      {/* ── 1px horizontal line ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          top: `${CIRCLE_SIZE / 2}px`,
          height: "1px",
          backgroundColor: "var(--border-primary)",
          opacity: 0.35,
        }}
      />

      {/* ── Circle — the interactive handle ── */}
      <button
        aria-label={`${pct}% explored. ${getTooltipMessage(pct)}`}
        aria-expanded={open}
        aria-haspopup="true"
        style={{
          position: "absolute",
          left: circleLeft,
          top: 0,
          width: `${CIRCLE_SIZE}px`,
          height: `${CIRCLE_SIZE}px`,
          borderRadius: "50%",
          border: "1px solid var(--border-primary)",
          backgroundColor: "var(--bg-primary)",
          cursor: "pointer",
          padding: 0,
          pointerEvents: "auto",
          outline: "none",
          zIndex: 1,
          transition: reduceMotion
            ? "none"
            : `left 0.7s cubic-bezier(0.25, 0, 0, 1)`,
        }}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") { isMouseRef.current = true; openTooltip(); }
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") { isMouseRef.current = false; closeTooltip(); }
        }}
        onFocus={openTooltip}
        onBlur={closeTooltip}
        onClick={(e) => {
          if (!isMouseRef.current) {
            e.stopPropagation();
            setOpen((v) => !v);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") { setOpen(false); (e.target as HTMLElement).blur(); }
        }}
      />

      {/* ── Tooltip card ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={flipped ? "flipped" : "default"}
            role="tooltip"
            onPointerEnter={() => { clearTimeout(closeTimer.current); setOpen(true); }}
            onPointerLeave={closeTooltip}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: flipped ? 10 : -10, y: -4 }
            }
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: flipped ? 10 : -10, y: -3 }
            }
            transition={{ duration: 0.16, ease: EASE }}
            style={{
              position: "absolute",
              ...(flipped ? { right: tooltipRight } : { left: tooltipLeft }),
              top: `${CIRCLE_SIZE + 8}px`,
              width: `${TOOLTIP_W}px`,
              // Mirror border and corner based on direction
              borderLeft: flipped ? "none" : "1px solid var(--border-primary)",
              borderRight: flipped ? "1px solid var(--border-primary)" : "none",
              borderBottom: "1px solid var(--border-primary)",
              borderRadius: flipped ? "0 0 20px 0" : "0 0 0 20px",
              padding: "30px",
              backgroundColor: "var(--bg-primary)",
              pointerEvents: "auto",
              zIndex: 2,
              textAlign: flipped ? "right" : "left",
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                fontWeight: 400,
                letterSpacing: "-0.6px",
                lineHeight: 1,
                color: "var(--text-primary)",
                marginBottom: "20px",
              }}
            >
              {pct}% Explored
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "1rem",
                fontWeight: 400,
                letterSpacing: "0.02em",
                lineHeight: 1.4,
                color: "var(--text-primary)",
              }}
            >
              {getTooltipMessage(pct)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
