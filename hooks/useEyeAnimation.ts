"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useEyeTracking } from "@/contexts/EyeTrackingContext";

// Import locally and re-export so FigmaButton.tsx doesn't need to change its imports
import type { EyeAnimState, PupilOffset } from "@/contexts/EyeTrackingContext";
export type { EyeAnimState, PupilOffset };

// ─────────────────────────────────────────────────────────────────────────────
// Blink intervals — one per button instance, all in the 2500–4000 ms range.
// Non-multiples of each other so buttons that start offset stay offset.
// Each button is auto-assigned the next interval in the list on mount.
// ─────────────────────────────────────────────────────────────────────────────

const BLINK_INTERVALS = [2500, 2800, 3200, 3600, 3950] as const;

// Module-level counter: increments on each hook mount so every FigmaButton
// on the page gets a different interval automatically.
let instanceCounter = 0;

// ─────────────────────────────────────────────────────────────────────────────
// Blink timing
// ─────────────────────────────────────────────────────────────────────────────

const BLINK_CLOSE_DUR = 220; // ms — eye closes
const BLINK_HOLD_DUR  = 200; // ms — hold fully closed
const BLINK_OPEN_DUR  = 220; // ms — eye opens

// ─────────────────────────────────────────────────────────────────────────────
// Pupil tracking constants (SVG units — eye viewBox is 22×14)
// ─────────────────────────────────────────────────────────────────────────────

const SENSITIVITY = 0.13;
const MAX_X       = 4.5;
const MAX_Y       = 1.8;

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useEyeAnimation(eyeRef: React.RefObject<HTMLElement | null>) {
  const { mousePos } = useEyeTracking();

  // Each instance locks in its interval index on first render
  const intervalIndex = useRef(instanceCounter++ % BLINK_INTERVALS.length);
  const blinkInterval = BLINK_INTERVALS[intervalIndex.current];

  // Start tracking immediately — no hover required
  const [animState, setAnimState] = useState<EyeAnimState>("tracking");
  const isBlink = useRef(false);

  // ── Blink scheduler: fires whenever "tracking" is (re-)entered ─────────────
  useEffect(() => {
    if (animState !== "tracking") return;

    const t = setTimeout(() => {
      isBlink.current = true;
      setAnimState("hoverSequence_closing");
    }, blinkInterval);

    return () => clearTimeout(t);
  }, [animState, blinkInterval]);

  // ── Blink phase 2: closing → hold → open ───────────────────────────────────
  useEffect(() => {
    if (animState !== "hoverSequence_closing" || !isBlink.current) return;

    const t = setTimeout(() => {
      setAnimState("hoverSequence_opening");
    }, BLINK_CLOSE_DUR + BLINK_HOLD_DUR);

    return () => clearTimeout(t);
  }, [animState]);

  // ── Blink phase 3: opening → resume tracking ────────────────────────────────
  useEffect(() => {
    if (animState !== "hoverSequence_opening" || !isBlink.current) return;

    const t = setTimeout(() => {
      isBlink.current = false;
      setAnimState("tracking");
    }, BLINK_OPEN_DUR);

    return () => clearTimeout(t);
  }, [animState]);

  // ── Pupil offset: derived from global mousePos vs. this button's position ───
  // Active in both "tracking" and "wide" states so the pupil always follows.
  let pupilOffset = { x: 0, y: 0 };

  const isLiveTracking = animState === "tracking" || animState === "wide";
  if (isLiveTracking && eyeRef.current) {
    const rect = eyeRef.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;

    pupilOffset = {
      x: Math.max(-MAX_X, Math.min(MAX_X, (mousePos.x - cx) * SENSITIVITY)),
      y: Math.max(-MAX_Y, Math.min(MAX_Y, (mousePos.y - cy) * SENSITIVITY)),
    };
  }

  // Hover: snap to wide-open state, cancelling any in-progress blink.
  // Un-hover: return to tracking (blink timer restarts from blinkInterval).
  const onMouseEnter = useCallback(() => {
    isBlink.current = false;
    setAnimState("wide");
  }, []);

  const onMouseLeave = useCallback(() => {
    setAnimState("tracking");
  }, []);

  return { animState, pupilOffset, onMouseEnter, onMouseLeave };
}
