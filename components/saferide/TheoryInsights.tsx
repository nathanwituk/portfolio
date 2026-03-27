"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

function SearchIcon() {
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-full"
      style={{ width: "40px", height: "40px", backgroundColor: "#b2e639" }}
      aria-hidden="true"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="#000000" strokeWidth="1.8" />
        <path d="M13 13L17 17" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const CARDS = [
  {
    title: "Centralization",
    bullets: [
      "One dash removes the need to check multiple apps, reducing cognitive load.",
      "Fewer platforms means fewer forgotten tasks.",
    ],
    source: "Cognitive Load Theory",
  },
  {
    title: "Progress is key",
    bullets: [
      "Visual feedback reinforces motivation by showing growth and achievement clearly.",
      "Seeing progress reduces anxiety and helps users stay aligned with targets.",
    ],
    source: "Goal-Setting Theory",
  },
  {
    title: "Easier decision-making",
    bullets: [
      "Graphs reveal patterns like study time vs. grades instantly.",
      "Visual comparisons reduce overwhelm and speed up understanding.",
    ],
    source: "The Visual Display of Quantitative Information",
  },
];

export default function TheoryInsights() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{
        paddingTop: "88px",
        paddingBottom: "88px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-[24px]"
        >
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-[32px] rounded-[20px]"
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "21px 29px",
                transition: "background-color 200ms ease",
              }}
            >
              {/* Header: label + icon + title */}
              <div className="flex flex-col gap-[10px]">
                <p
                  className="font-semibold uppercase leading-none"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "-0.03em",
                    color: "var(--text-tertiary)",
                    transition: "color 200ms ease",
                  }}
                >
                  Theory Insights
                </p>
                <div className="flex items-center gap-[10px]">
                  <SearchIcon />
                  <p
                    className="font-normal leading-[1.2]"
                    style={{
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                      letterSpacing: "-0.03em",
                      color: "var(--text-primary)",
                      transition: "color 200ms ease",
                    }}
                  >
                    {card.title}
                  </p>
                </div>
              </div>

              {/* Bullets + source */}
              <div className="flex flex-col justify-between gap-[24px] flex-1">
                <ul className="flex flex-col gap-[10px] list-disc pl-[20px]">
                  {card.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="font-normal leading-[1.5]"
                      style={{
                        fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                        fontSize: "0.875rem",
                        letterSpacing: "0.02em",
                        color: "var(--text-primary)",
                        transition: "color 200ms ease",
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
                <p
                  className="italic leading-[1.4]"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "0.875rem",
                    letterSpacing: "0.02em",
                    color: "var(--text-tertiary)",
                    transition: "color 200ms ease",
                  }}
                >
                  Source: {card.source}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
