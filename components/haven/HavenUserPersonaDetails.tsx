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
  visible: { transition: { staggerChildren: 0.1 } },
};

const CARDS: { label: string; bullets: string[] }[] = [
  {
    label: "Goals",
    bullets: [
      "Track her burnout in a way that emphasizes her self-awareness.",
      "Easily find ways to catch her burnout and poor mood early so she can practice coping skills.",
    ],
  },
  {
    label: "Pain Points",
    bullets: [
      "There are too many tools that forces her to spend time learning them.",
      "Too many features can cause option-paralysis.",
      "Data isn't visual enough for her busy life.",
    ],
  },
  {
    label: "Needs",
    bullets: [
      "Visualizations and simple steps.",
      "Track her progress and be able to quickly enter her mood.",
    ],
  },
];

export default function HavenUserPersonaDetails() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: ACCENT, marginTop: "-50px" }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "clamp(24px, 4vw, 48px)",
          paddingBottom: "clamp(48px, 8vw, 100px)",
          gap: "clamp(32px, 5vw, 56px)",
          alignItems: "flex-start",
        }}
      >
        {/* Cards: full width row, equal height */}
        <motion.div
          variants={stagger}
          className="flex flex-row flex-wrap w-full"
          style={{ gap: "clamp(12px, 1.5vw, 16px)", alignItems: "stretch" }}
        >
          {CARDS.map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUp}
              style={{ flex: "1 1 180px", minWidth: "180px", display: "flex", flexDirection: "column" }}
            >
              {/* Tab label */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 20px",
                  border: "2px solid rgba(255,255,255,0.7)",
                  borderBottom: "none",
                  borderRadius: "12px 12px 0 0",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                  }}
                >
                  {card.label}
                </span>
              </div>

              {/* Content card — flex: 1 so all three boxes reach the same height */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: DARK,
                  borderRadius: "0 12px 12px 12px",
                  padding: "clamp(14px, 1.8vw, 20px)",
                }}
              >
                <ul style={{ margin: 0, paddingLeft: "18px" }}>
                  {card.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: FONT,
                        fontSize: "0.8125rem",
                        letterSpacing: "0.02em",
                        lineHeight: 1.45,
                        color: "rgba(255,255,255,0.85)",
                        marginBottom: i < card.bullets.length - 1 ? "8px" : 0,
                      }}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
