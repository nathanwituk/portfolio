"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const ITEMS = [
  "Do user testing earlier on with wireframes.",
  "Find more participants for user testing",
  "Further refine key features (journaling and meditation)",
  "Add more visualizations (animations for meditations)",
];

export default function HavenWhereWeWentWrong() {
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
          paddingTop: "calc(var(--section-pt) + 25px)",
          paddingBottom: "calc(var(--section-pb) + 25px)",
          gap: "clamp(20px, 2.5vw, 32px)",
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
            color: DARK,
          }}
        >
          Where we went wrong
        </motion.h2>

        {/* Label button */}
        <motion.div variants={fadeUp}>
          <div
            className="inline-flex items-center"
            style={{
              backgroundColor: DARK,
              borderRadius: "20px",
              padding: "14px 28px",
            }}
          >
            <span
              className="font-semibold uppercase"
              style={{
                fontFamily: FONT,
                fontSize: "0.8125rem",
                letterSpacing: "0.04em",
                color: "#ffffff",
                lineHeight: 1.1,
              }}
            >
              + What we learned
            </span>
          </div>
        </motion.div>

        {/* Bullet list */}
        <motion.ul variants={stagger} className="flex flex-col" style={{ gap: "6px", paddingLeft: "4px" }}>
          {ITEMS.map((item) => (
            <motion.li
              key={item}
              variants={fadeUp}
              className="flex items-start"
              style={{ gap: "10px", listStyle: "none" }}
            >
              <span style={{ color: "rgba(0,0,0,0.3)", flexShrink: 0, marginTop: "2px" }}>·</span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.45,
                  color: "rgba(0,0,0,0.75)",
                }}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
