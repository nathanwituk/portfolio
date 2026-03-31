"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const ACCENT = "#9747ff";
const DARK = "#12091c";
const RED = "#f04747";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const WORKING = [
  "Calendar visual is most useful for users",
  "Strong emotional design (calm, cozy, inviting)",
  "Extremely intuitive onboarding & navigation",
  "Clear value in tracking & reflecting on emotions",
];

const REFINE = [
  "Content density (too many choices)",
  "Clarity issues (icons, contrast)",
  "Micro-interactions (loading, feature visibility)",
  "Lean more into tracking progress feature",
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
      <path d="M7.5 12l3 3 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
      <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function HavenTakeaways() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: ACCENT }}>
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
          gap: "clamp(32px, 4vw, 52px)",
        }}
      >
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="font-normal leading-[1.05]"
          style={{
            fontFamily: FONT,
            fontSize: "1.875rem",
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          Takeaways
        </motion.h2>

        {/* Two columns */}
        <motion.div
          variants={stagger}
          className="flex flex-col lg:flex-row items-start"
          style={{ gap: "clamp(32px, 5vw, 66px)" }}
        >
          {/* What's working */}
          <motion.div variants={stagger} className="flex flex-col flex-1" style={{ gap: "clamp(16px, 2vw, 20px)" }}>
            <motion.div variants={fadeUp}>
              <div
                className="inline-flex items-center"
                style={{
                  gap: "10px",
                  backgroundColor: DARK,
                  borderRadius: "20px",
                  padding: "14px 28px",
                }}
              >
                <CheckIcon />
                <span
                  className="font-semibold uppercase"
                  style={{ fontFamily: FONT, fontSize: "0.8125rem", letterSpacing: "0.04em", color: "#ffffff", lineHeight: 1.1 }}
                >
                  What&apos;s working
                </span>
              </div>
            </motion.div>

            <motion.ul variants={stagger} className="flex flex-col" style={{ gap: "8px", paddingLeft: "4px" }}>
              {WORKING.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-start"
                  style={{ gap: "10px", listStyle: "none" }}
                >
                  <span style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0, marginTop: "2px" }}>·</span>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
                      letterSpacing: "0.02em",
                      lineHeight: 1.45,
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* What to refine */}
          <motion.div variants={stagger} className="flex flex-col flex-1" style={{ gap: "clamp(16px, 2vw, 20px)" }}>
            <motion.div variants={fadeUp}>
              <div
                className="inline-flex items-center"
                style={{
                  gap: "10px",
                  backgroundColor: RED,
                  borderRadius: "20px",
                  padding: "14px 28px",
                }}
              >
                <XIcon />
                <span
                  className="font-semibold uppercase"
                  style={{ fontFamily: FONT, fontSize: "0.8125rem", letterSpacing: "0.04em", color: "#ffffff", lineHeight: 1.1 }}
                >
                  What to refine
                </span>
              </div>
            </motion.div>

            <motion.ul variants={stagger} className="flex flex-col" style={{ gap: "8px", paddingLeft: "4px" }}>
              {REFINE.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-start"
                  style={{ gap: "10px", listStyle: "none" }}
                >
                  <span style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0, marginTop: "2px" }}>·</span>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
                      letterSpacing: "0.02em",
                      lineHeight: 1.45,
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
