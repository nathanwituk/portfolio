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
  visible: { transition: { staggerChildren: 0.09 } },
};

const PARTICIPANTS = ["4 total users", "All first time users", "All indicated previous feelings of burnout"];

const STATS = [
  { pct: "100%", label: "found symptom selection easy to understand", italic: true },
  { pct: "100%", label: "successfully completed check-in without confusion", italic: false },
  { pct: "100%", label: "Understood navigation labels and tools", italic: false },
];

export default function HavenUserTesting() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: ACCENT }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "var(--section-pt)",
          paddingBottom: "var(--section-pb)",
          gap: "clamp(48px, 8vw, 100px)",
        }}
      >
        {/* ── Left column ── */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ flex: "0 0 auto", maxWidth: "clamp(280px, 45%, 520px)", gap: "clamp(24px, 3vw, 40px)" }}
        >
          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.0]"
            style={{
              fontFamily: FONT,
              fontSize: "1.875rem",
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            User testing
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
              letterSpacing: "0.02em",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            After prototyping our final designs we took it to real users, giving them the chance
            to go through this prototype and find common frustrations or pain points that
            weren&apos;t previously identified.
          </motion.p>

          {/* Participants label */}
          <motion.div variants={fadeUp}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,255,255,0.9)",
                borderRadius: "20px",
                padding: "12px 32px",
                width: "100%",
              }}
            >
              <span
                className="font-semibold uppercase"
                style={{
                  fontFamily: FONT,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.06em",
                  color: "#ffffff",
                }}
              >
                Participants
              </span>
            </div>
          </motion.div>

          {/* Participant pills */}
          <motion.div
            variants={stagger}
            className="flex flex-wrap"
            style={{ gap: "10px" }}
          >
            {PARTICIPANTS.map((label) => (
              <motion.div
                key={label}
                variants={fadeUp}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "999px",
                  padding: "8px 18px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(0.8125rem, 1.1vw, 1rem)",
                    fontStyle: "italic",
                    letterSpacing: "0.02em",
                    color: ACCENT,
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right column ── */}
        <motion.div
          variants={stagger}
          className="flex flex-col flex-1"
          style={{ gap: "clamp(20px, 2.5vw, 28px)" }}
        >
          {/* Section label */}
          <motion.div variants={fadeUp}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,255,255,0.9)",
                borderRadius: "20px",
                padding: "14px 32px",
              }}
            >
              <span
                className="font-semibold uppercase"
                style={{
                  fontFamily: FONT,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.06em",
                  color: "#ffffff",
                }}
              >
                General Ease of Use
              </span>
            </div>
          </motion.div>

          {/* Stat blocks */}
          <motion.div variants={stagger} className="flex flex-col" style={{ gap: "clamp(12px, 2vw, 24px)" }}>
            {STATS.map(({ pct, label, italic }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex flex-col"
                style={{ gap: "4px", padding: "12px 24px" }}
              >
                <span
                  className="font-semibold uppercase leading-[1.0]"
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(3rem, 6vw, 5.625rem)",
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                  }}
                >
                  {pct}
                </span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(0.875rem, 1.4vw, 1.125rem)",
                    fontStyle: italic ? "italic" : "normal",
                    letterSpacing: "0.02em",
                    lineHeight: 1.35,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
