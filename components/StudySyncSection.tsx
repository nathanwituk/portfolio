"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HERO_ASSETS } from "@/lib/assets";

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

// Mobile-only — desktop shows the dashboard via the hero fold panel
export default function StudySyncSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="study-sync"
      className="lg:hidden flex flex-col w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      {/* Video — full bleed to left edge */}
      <motion.div
        ref={ref}
        variants={imageVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative w-full overflow-hidden"
        style={{ borderRadius: "7.344px", aspectRatio: "490.891 / 424.5" }}
      >
        <video
          src={HERO_ASSETS.dashboardVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Text — 20px inset */}
      <div className="px-5 py-12">
        <motion.div
          variants={textStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col pt-6 pb-6"
          style={{ gap: "37px" }}
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
              User Interface &amp; Experience
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
              Study Sync Dashboard
            </motion.p>
          </div>

          {/* Description + Coming Soon */}
          <div className="flex flex-col" style={{ gap: "22px" }}>
            <motion.p
              variants={textLine}
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
              Designing an intuitive quick-glance dashboard for college students
              who have trouble tracking and managing their academic schedule and
              workload.
            </motion.p>

            {/* Coming Soon tag */}
            <motion.span
              variants={textLine}
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.48px",
                lineHeight: "1.1",
                color: "var(--text-tertiary)",
                transition: "color 200ms ease",
              }}
            >
              Coming Soon
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>

  );
}
