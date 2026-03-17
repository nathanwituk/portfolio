"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type EyeAnimState =
  | "idle"
  | "hoverSequence_closing"
  | "hoverSequence_opening"
  | "hoverSequence_lookRight"
  | "hoverSequence_lookLeft"
  | "tracking"
  | "resetting"
  | "wide";

export interface PupilOffset {
  x: number;
  y: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Context — only provides global mouse position.
// Blink state is managed independently per button in useEyeAnimation.
// ─────────────────────────────────────────────────────────────────────────────

interface EyeTrackingContextValue {
  mousePos: { x: number; y: number };
}

const EyeTrackingContext = createContext<EyeTrackingContextValue>({
  mousePos: { x: 0, y: 0 },
});

export function EyeTrackingProvider({ children }: { children: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Start centered so the pupil looks straight ahead before any interaction
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const onMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });

    // Mobile: follow finger position during scroll/touch gestures
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) setMousePos({ x: touch.clientX, y: touch.clientY });
    };

    // Scroll shifts each button's getBoundingClientRect without moving the
    // mouse — nudge mousePos to a new object so all buttons re-render and
    // recalculate their pupil offsets against updated positions.
    const onScroll = () =>
      setMousePos((prev) => ({ x: prev.x, y: prev.y }));

    window.addEventListener("mousemove",  onMove,       { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("scroll",     onScroll,     { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll",    onScroll);
    };
  }, []);

  return (
    <EyeTrackingContext.Provider value={{ mousePos }}>
      {children}
    </EyeTrackingContext.Provider>
  );
}

export const useEyeTracking = () => useContext(EyeTrackingContext);
