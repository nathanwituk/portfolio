"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECT_ASSETS } from "@/lib/assets";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const imageVariant = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const textStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const textLine = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function SpeedsterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="speedster"
      className="flex items-center justify-center w-full"
      style={{ backgroundColor: "var(--bg-primary)", transition: "background-color 200ms ease, color 200ms ease" }}
    >
      {/* Desktop: side-by-side. Tablet/Mobile: stacked. */}
      <div
        ref={ref}
        className="flex flex-col lg:flex-row items-center w-full px-5 md:px-[80px] py-12 lg:py-[29px]"
        style={{
          maxWidth: "1280px",
          gap: "0",
        }}
      >
        {/* ── Speedster phone/animation video ──
            Desktop: 490.891×424.5px, shrink-0
            Tablet/mobile: full width, 297px tall
        ── */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative shrink-0 overflow-hidden w-full lg:w-[490.891px]"
          style={{
            borderRadius: "7.344px",
            backgroundColor: "#1a1a1a",
          }}
        >
          {/* Natural aspect ratio on mobile — no fixed height cropping.
              Video source is 490.891 × 424.5 px (ratio 1.156, landscape).
              On mobile (full-width): aspect-ratio gives ~337 px height = 0 crop.
              On desktop: outer div is 490.891 px wide so height resolves to
              424.5 px automatically from the same aspect-ratio rule. */}
          <div className="relative" style={{ aspectRatio: "490.891 / 424.5" }}>
            <video
              src={PROJECT_ASSETS.speedsterDemoVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* ── Text content ── */}
        <motion.div
          variants={textStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col w-full pt-6 pb-6 lg:p-[35px]"
          style={{
            flex: "1 0 0",
            gap: "37px",
            minWidth: "0",
          }}
        >
          {/* Category + Title */}
          <div className="flex flex-col" style={{ gap: "6px" }}>
            <motion.p
              variants={textLine}
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.48px",
                lineHeight: "1.1",
                color: "var(--text-tertiary)",
              }}
            >
              Digital Rebrand &amp; UX
            </motion.p>
            <motion.p
              variants={textLine}
              className="font-normal"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "2.3125rem",
                letterSpacing: "-1.11px",
                lineHeight: "1",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Speedster
            </motion.p>
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col" style={{ gap: "22px" }}>
            <motion.p
              variants={textLine}
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
              Designing a small but useful tool that helps the user orient
              themselves in time or space. I&apos;m making a new kind of
              calendar or clock or compass.
            </motion.p>
            <motion.a
              variants={textLine}
              href="#speedster"
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
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
