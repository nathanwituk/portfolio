"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const MESSAGE =
  "You're viewing an early version of this site. Some pages may still be incomplete as the experience continues to be designed and refined.";

// Enough repetitions so the loop fills 200% width regardless of viewport
const ITEMS = Array.from({ length: 8 }, (_, i) => i);

export default function TickerBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      className="flex bg-black w-full shrink-0 overflow-hidden items-center h-10 lg:h-[66px]"
      aria-label="Site notice"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Outer track — we animate a 50% shift, then loop.
          The total width is ~200% because we duplicate items below. */}
      <motion.div
        className="flex shrink-0 whitespace-nowrap"
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          fontSize: "clamp(1.21875rem, 2vw, 1.875rem)",
          letterSpacing: "-0.6px",
          lineHeight: "1",
          color: "#fff",
        }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 86,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {/* First set */}
        {ITEMS.map((i) => (
          <span key={`a-${i}`} className="shrink-0" style={{ paddingRight: "clamp(24px, 4vw, 80px)" }}>
            {MESSAGE}
          </span>
        ))}
        {/* Duplicate — makes the loop seamless */}
        {ITEMS.map((i) => (
          <span key={`b-${i}`} className="shrink-0" style={{ paddingRight: "clamp(24px, 4vw, 80px)" }}>
            {MESSAGE}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
