"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";
const ACCENT = "#9747ff";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const FEATURES: { label: string; source: string }[] = [
  { label: "Mood Check In", source: "Solution from Research" },
  { label: "Journal Log", source: "Solution from Research" },
  { label: "Reminders", source: "Solution from Research" },
  { label: "Library of Music", source: "Solution from Research" },
  { label: "Fun Animations", source: "Solution from Comp Analysis" },
  { label: "Google Calendar Integration", source: "Our Idea" },
  { label: "Prioritized Tasks", source: "Solution from Research" },
  { label: "Long Term Tracking", source: "Long Term Tracking" },
];

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pillText = {
  fontFamily: FONT,
  fontSize: "clamp(0.6875rem, 1vw, 0.875rem)",
  fontWeight: 600 as const,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  whiteSpace: "nowrap" as const,
};

export default function HavenStructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "clamp(48px, 8vw, 100px)",
          paddingBottom: "clamp(48px, 8vw, 100px)",
          gap: "clamp(32px, 5vw, 80px)",
          alignItems: "flex-start",
        }}
      >
        {/* Left: heading + body */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(16px, 2.5vw, 28px)", flex: "0 0 auto", maxWidth: "420px" }}
        >
          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.05]"
            style={{
              fontFamily: FONT,
              fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)",
              letterSpacing: "-0.05em",
              color: DARK,
            }}
          >
            Structure
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              lineHeight: 1.5,
              color: DARK,
            }}
          >
            After understanding what other apps offer users, we came up with a few key features that we hoped would successfully help college students facing burnout.
          </motion.p>
        </motion.div>

        {/* Right: feature pill columns + product → recovery */}
        <motion.div
          variants={stagger}
          className="flex flex-col flex-1"
          style={{ gap: "clamp(20px, 2.5vw, 32px)" }}
        >
          {/* Feature rows */}
          <div className="flex flex-col" style={{ gap: "6px" }}>
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}
              >
                {/* Feature name pill */}
                <span
                  style={{
                    ...pillText,
                    color: "#ffffff",
                    backgroundColor: DARK,
                    borderRadius: "20px",
                    padding: "clamp(10px, 1.2vw, 14px) clamp(20px, 2.5vw, 32px)",
                    textAlign: "center",
                  }}
                >
                  {feature.label}
                </span>
                {/* Source pill */}
                <span
                  style={{
                    ...pillText,
                    color: ACCENT,
                    backgroundColor: "transparent",
                    border: `2px solid ${ACCENT}`,
                    borderRadius: "20px",
                    padding: "clamp(10px, 1.2vw, 14px) clamp(20px, 2.5vw, 32px)",
                    textAlign: "center",
                  }}
                >
                  {feature.source}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Our Product → Recovery */}
          <motion.div
            variants={fadeUp}
            className="flex items-center flex-wrap"
            style={{ gap: "12px", marginTop: "8px" }}
          >
            <span
              style={{
                ...pillText,
                color: "#ffffff",
                backgroundColor: ACCENT,
                borderRadius: "20px",
                padding: "clamp(10px, 1.2vw, 16px) clamp(20px, 2.5vw, 36px)",
              }}
            >
              Our Product
            </span>
            <span style={{ color: DARK, display: "flex" }}>
              <ArrowRight />
            </span>
            <span
              style={{
                ...pillText,
                color: DARK,
                backgroundColor: "transparent",
                border: `2px solid ${DARK}`,
                borderRadius: "20px",
                padding: "clamp(10px, 1.2vw, 16px) clamp(20px, 2.5vw, 36px)",
              }}
            >
              Recovery
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
