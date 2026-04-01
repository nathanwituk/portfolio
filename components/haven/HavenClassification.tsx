"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const ACCENT = "#9747ff";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const BURNOUT_TYPES = [
  ["Academic Burnout", "Emotional Burnout"],
  ["Physical Burnout", "Creative Burnout"],
  ["Workplace Burnout", "Systemic Burnout"],
];

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HavenClassification() {
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
          paddingTop: "calc(var(--section-pt) + 25px)",
          paddingBottom: "calc(var(--section-pb) + 25px)",
          gap: "clamp(32px, 5vw, 80px)",
          alignItems: "flex-start",
        }}
      >
        {/* Left: title + body */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(16px, 2.5vw, 28px)", flex: "0 0 auto", maxWidth: "420px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{
              fontFamily: FONT,
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
              color: "#a4a4a4",
            }}
          >
            Research
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.05]"
            style={{
              fontFamily: FONT,
              fontSize: "1.875rem",
              letterSpacing: "-0.03em",
              color: "#12091c",
            }}
          >
            Classification
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              lineHeight: "1.4",
              color: "#12091c",
            }}
          >
            Loudan and I worked together to identify the typical types of burnout
            that humans encounter.
          </motion.p>
        </motion.div>

        {/* Right: pill grid + flow */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(20px, 2.5vw, 32px)", flex: "1 1 0" }}
        >
          {/* 3-row × 2-col pill grid */}
          {BURNOUT_TYPES.map((row, rowIdx) => (
            <motion.div
              key={rowIdx}
              variants={fadeUp}
              className="flex flex-wrap"
              style={{ gap: "12px" }}
            >
              {row.map((type) => (
                <span
                  key={type}
                  className="font-semibold uppercase"
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(0.6875rem, 1vw, 0.875rem)",
                    letterSpacing: "0.06em",
                    color: "#ffffff",
                    backgroundColor: "#12091c",
                    borderRadius: "20px",
                    padding: "clamp(10px, 1.2vw, 16px) clamp(20px, 2.5vw, 36px)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {type}
                </span>
              ))}
            </motion.div>
          ))}

          {/* Flow: OUR PRODUCT → RECOVERY */}
          <motion.div
            variants={fadeUp}
            className="flex items-center flex-wrap"
            style={{ gap: "12px", marginTop: "8px" }}
          >
            <span
              className="font-semibold uppercase"
              style={{
                fontFamily: FONT,
                fontSize: "clamp(0.6875rem, 1vw, 0.875rem)",
                letterSpacing: "0.06em",
                color: "#ffffff",
                backgroundColor: ACCENT,
                borderRadius: "20px",
                padding: "clamp(10px, 1.2vw, 16px) clamp(20px, 2.5vw, 36px)",
                whiteSpace: "nowrap",
              }}
            >
              Our Product
            </span>

            <span style={{ color: "#12091c", transform: "rotate(45deg)", display: "flex" }}>
              <ArrowRight />
            </span>

            <span
              className="font-semibold uppercase"
              style={{
                fontFamily: FONT,
                fontSize: "clamp(0.6875rem, 1vw, 0.875rem)",
                letterSpacing: "0.06em",
                color: "#12091c",
                backgroundColor: "transparent",
                border: "2px solid #12091c",
                borderRadius: "20px",
                padding: "clamp(10px, 1.2vw, 16px) clamp(20px, 2.5vw, 36px)",
                whiteSpace: "nowrap",
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
