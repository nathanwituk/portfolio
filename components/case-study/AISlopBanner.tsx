"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

/**
 * Full-bleed "AI SLOP" display banner.
 * Olive-green background (#6f7142) with massive white text.
 * From Figma: 420px font, tracking-[-21px], bleeds off canvas.
 */
export default function AISlopBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      ref={ref}
      className="w-full overflow-hidden flex items-center relative"
      style={{ height: "clamp(300px, 46vw, 591px)" }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/projects/Inventory Management Prototype-1.mp4" type="video/mp4" />
      </video>

      {/* Color blend overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#c5cc6b", mixBlendMode: "multiply", zIndex: 1 }}
      />

      {/*
        Text is absolutely centered so the bleed is symmetric on both sides.
        At ~800px the font is ~264px tall; "AI SLOP" at that size is wider
        than the viewport, but both the "A" and the "P" are still partially
        visible because the overhang is equal on each side.
        33vw keeps the bleed intentional (≈60–100px per side) without any
        letter disappearing entirely at any reasonable viewport width.
      */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="font-bold text-white whitespace-nowrap select-none pointer-events-none absolute"
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          fontSize: "clamp(80px, 33vw, 500px)",
          letterSpacing: "-0.04em",
          lineHeight: "1",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        AI SLOP
      </motion.p>
    </section>
  );
}
