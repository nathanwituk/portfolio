"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";
const GREEN = "#7e9571";
const MAUVE = "#95717b";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const PAIRS: { finding: string; focus: string; type: "x" | "check" }[] = [
  {
    finding:
      '"Offering academic support services, such as tutoring, study groups, and skills workshops, can help students feel more confident and capable in their studies."',
    focus: "Our product is aimed to guide solutions for your mental space, not your academics.",
    type: "x",
  },
  {
    finding: "Reconnect with purpose: when you remember why you started, you fuel resilience.",
    focus: "Most college students DO understand why they're on the path they chose.",
    type: "x",
  },
  {
    finding: "Providing creative outlets and ensuring your strengths are magnified helps prevent burnout.",
    focus: "Creative outlets such as journaling are easy to add to our product to make the experience more personal.",
    type: "check",
  },
  {
    finding:
      "Engage in reflection: check in with yourself regularly. Are you aligned? Are you rested? Are you still motivated?",
    focus: "Creative outlets such as journaling are easy to add to our product to make the experience more personal.",
    type: "check",
  },
  {
    finding: "Delegate or say no: learning to decline or ask for help is a core part of recovery.",
    focus: 'Downloading or interacting with our product is already an "ask" for help.',
    type: "x",
  },
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pillLabel = {
  fontFamily: FONT,
  fontSize: "0.6875rem",
  fontWeight: 600 as const,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

const cardText = {
  fontFamily: FONT,
  fontSize: "0.875rem",
  fontWeight: 400 as const,
  letterSpacing: "0.02em",
  lineHeight: 1.4,
};

export default function HavenResearchFindings() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "var(--section-pt)",
          paddingBottom: "var(--section-pb)",
          gap: "clamp(16px, 2.5vw, 24px)",
        }}
      >
        {/* Column headers */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row"
          style={{ gap: "clamp(10px, 1.5vw, 16px)" }}
        >
          <div
            className="flex-1 flex items-center justify-center"
            style={{
              backgroundColor: DARK,
              borderRadius: "16px",
              padding: "clamp(14px, 2vw, 20px) clamp(24px, 3vw, 40px)",
            }}
          >
            <p style={{ ...pillLabel, color: "#ffffff" }}>Research Findings</p>
          </div>
          {/* spacer for arrow column */}
          <div style={{ width: "clamp(32px, 4vw, 56px)", flexShrink: 0 }} className="hidden md:block" />
          <div
            className="flex-1 flex items-center justify-center"
            style={{
              backgroundColor: DARK,
              borderRadius: "16px",
              padding: "clamp(14px, 2vw, 20px) clamp(24px, 3vw, 40px)",
            }}
          >
            <p style={{ ...pillLabel, color: "#ffffff" }}>Our Product&apos;s Focus</p>
          </div>
        </motion.div>

        {/* Paired rows */}
        <div className="flex flex-col" style={{ gap: "clamp(8px, 1.2vw, 12px)" }}>
          {PAIRS.map((pair, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col md:flex-row items-stretch md:items-center"
              style={{ gap: "clamp(10px, 1.5vw, 16px)" }}
            >
              {/* Finding card */}
              <div
                className="flex-1"
                style={{
                  backgroundColor: DARK,
                  borderRadius: "16px",
                  padding: "clamp(16px, 2vw, 22px)",
                }}
              >
                <p style={{ ...cardText, color: "#ffffff", margin: 0 }}>{pair.finding}</p>
              </div>

              {/* Arrow */}
              <div
                className="hidden md:flex items-center justify-center shrink-0"
                style={{ width: "clamp(32px, 4vw, 56px)", color: DARK }}
              >
                <ArrowRight />
              </div>

              {/* Focus card */}
              <div
                className="flex-1 flex items-start"
                style={{
                  border: pair.type === "check" ? `2px solid ${GREEN}` : `2px solid ${MAUVE}`,
                  backgroundColor: pair.type === "check" ? GREEN : "transparent",
                  borderRadius: "16px",
                  padding: "clamp(16px, 2vw, 22px)",
                  gap: "12px",
                }}
              >
                <div
                  className="shrink-0 mt-[2px]"
                  style={{ color: pair.type === "check" ? "#ffffff" : MAUVE }}
                >
                  {pair.type === "check" ? <CheckIcon /> : <XIcon />}
                </div>
                <p
                  style={{
                    ...cardText,
                    color: pair.type === "check" ? "#ffffff" : DARK,
                    margin: 0,
                  }}
                >
                  {pair.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
