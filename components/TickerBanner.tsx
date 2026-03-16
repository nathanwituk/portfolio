"use client";

import { motion } from "framer-motion";

const MESSAGE =
  "You're viewing an early version of this site. Some pages may still be incomplete as the experience continues to be designed and refined.";

// Enough repetitions so the loop fills 200% width regardless of viewport
const ITEMS = Array.from({ length: 8 }, (_, i) => i);

export default function TickerBanner() {
  return (
    <div
      className="hidden lg:flex bg-black w-full shrink-0 overflow-hidden items-center"
      style={{ height: "66px" }}
      aria-label="Site notice"
    >
      {/* Outer track — we animate a 50% shift, then loop.
          The total width is ~200% because we duplicate items below. */}
      <motion.div
        className="flex shrink-0 whitespace-nowrap"
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          fontSize: "1.875rem",
          letterSpacing: "-0.6px",
          lineHeight: "1",
          color: "#fff",
        }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 60,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {/* First set */}
        {ITEMS.map((i) => (
          <span key={`a-${i}`} className="shrink-0" style={{ paddingRight: "80px" }}>
            {MESSAGE}
          </span>
        ))}
        {/* Duplicate — makes the loop seamless */}
        {ITEMS.map((i) => (
          <span key={`b-${i}`} className="shrink-0" style={{ paddingRight: "80px" }}>
            {MESSAGE}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
