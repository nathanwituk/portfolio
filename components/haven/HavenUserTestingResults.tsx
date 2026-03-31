"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";
const ACCENT = "#9747ff";
const RED = "#f04747";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const CONCEPT_STATS = [
  { pct: "100%", label: "understood the flame intensity metaphor", italic: true },
  { pct: "75%",  label: "Immediately understood calendar icons",   italic: false },
  { pct: "25%",  label: "experienced minor confusion with water icon", italic: false },
];

const VALUE_STATS = [
  { pct: "75%",  label: "identified the calendar as one of the most useful features", italic: false },
  { pct: "100%", label: "said using the calendar would definitely help them track emotional patterns", italic: true },
];

const PAIN_POINTS = [
  { pct: "50%", label: "mentioned too many options for onboarding symptoms and meditation library", italic: true },
  { pct: "25%", label: "noted loading screens felt slightly long", italic: false },
  { pct: "25%", label: "suggested stronger feature emphasis (lock feature)", italic: false },
];

function StatLabel({ text, color }: { text: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color,
        borderRadius: "20px",
        padding: "14px 32px",
        width: "100%",
      }}
    >
      <span
        className="font-semibold uppercase"
        style={{ fontFamily: FONT, fontSize: "0.8125rem", letterSpacing: "0.06em", color: "#ffffff", lineHeight: 1.1 }}
      >
        {text}
      </span>
    </div>
  );
}

export default function HavenUserTestingResults() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: DARK }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "var(--section-pt)",
          paddingBottom: "var(--section-pb)",
          gap: "clamp(40px, 6vw, 72px)",
        }}
      >

        {/* ── Left: Concept + Value columns ── */}
        <motion.div
          variants={stagger}
          className="flex flex-col flex-1"
          style={{ gap: "clamp(40px, 5vw, 64px)" }}
        >
          {/* Concept Understanding */}
          <motion.div variants={stagger} className="flex flex-col" style={{ gap: "clamp(20px, 2.5vw, 32px)" }}>
            <motion.div variants={fadeUp}>
              <StatLabel text="Concept Understanding" color={ACCENT} />
            </motion.div>
            <motion.div
              variants={stagger}
              className="flex flex-row flex-wrap"
              style={{ gap: "clamp(20px, 3vw, 44px)" }}
            >
              {CONCEPT_STATS.map(({ pct, label, italic }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex flex-col"
                  style={{ gap: "4px", flex: "1 1 140px" }}
                >
                  <span
                    className="font-semibold uppercase leading-[1.0]"
                    style={{ fontFamily: FONT, fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: ACCENT }}
                  >
                    {pct}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)",
                      fontStyle: italic ? "italic" : "normal",
                      letterSpacing: "0.02em",
                      lineHeight: 1.35,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Value & Usefulness */}
          <motion.div variants={stagger} className="flex flex-col" style={{ gap: "clamp(20px, 2.5vw, 32px)" }}>
            <motion.div variants={fadeUp}>
              <StatLabel text="Value & Usefulness" color={ACCENT} />
            </motion.div>
            <motion.div
              variants={stagger}
              className="flex flex-row flex-wrap"
              style={{ gap: "clamp(20px, 3vw, 44px)" }}
            >
              {VALUE_STATS.map(({ pct, label, italic }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex flex-col"
                  style={{ gap: "4px", flex: "1 1 180px" }}
                >
                  <span
                    className="font-semibold uppercase leading-[1.0]"
                    style={{ fontFamily: FONT, fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: ACCENT }}
                  >
                    {pct}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)",
                      fontStyle: italic ? "italic" : "normal",
                      letterSpacing: "0.02em",
                      lineHeight: 1.35,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {label}
                  </span>
                </motion.div>
              ))}

              {/* Quote block */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col"
                style={{ gap: "16px", flex: "1 1 200px" }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    color: "rgba(255,255,255,0.25)",
                    lineHeight: 1,
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.4,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: "-12px",
                  }}
                >
                  That might actually be the most useful part so you can eventually see progress over time.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Right: Pain Points ── */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(20px, 2.5vw, 28px)", flex: "0 0 auto", width: "clamp(260px, 35%, 460px)" }}
        >
          <motion.div variants={fadeUp}>
            <StatLabel text="Pain Points" color={RED} />
          </motion.div>

          <motion.div variants={stagger} className="flex flex-col" style={{ gap: "clamp(12px, 1.5vw, 20px)" }}>
            {PAIN_POINTS.map(({ pct, label, italic }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex flex-col"
                style={{
                  gap: "4px",
                  border: `2px solid ${RED}`,
                  borderRadius: "clamp(16px, 2vw, 28px)",
                  padding: "clamp(16px, 2vw, 24px)",
                }}
              >
                <span
                  className="font-semibold uppercase leading-[1.0]"
                  style={{ fontFamily: FONT, fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: RED }}
                >
                  {pct}
                </span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)",
                    fontStyle: italic ? "italic" : "normal",
                    letterSpacing: "0.02em",
                    lineHeight: 1.35,
                    color: "rgba(255,255,255,0.8)",
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
