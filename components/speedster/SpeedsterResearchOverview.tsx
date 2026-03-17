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

function TargetIcon() {
  return (
    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" aria-hidden="true">
      <circle cx="20.5" cy="20.5" r="20.5" fill="#ff5d00" />
      <circle cx="20.5" cy="20.5" r="7.5" stroke="white" strokeWidth="2" />
      <line x1="20.5" y1="7" x2="20.5" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="20.5" y1="29" x2="20.5" y2="34" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="20.5" x2="12" y2="20.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="20.5" x2="34" y2="20.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" aria-hidden="true">
      <circle cx="20.5" cy="20.5" r="20.5" fill="#ff5d00" />
      <circle cx="18" cy="18" r="7" stroke="white" strokeWidth="2" fill="none" />
      <line x1="23.5" y1="23.5" x2="30" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function InsightIcon() {
  return (
    <svg width="42" height="44" viewBox="0 0 42 44" fill="none" aria-hidden="true">
      <circle cx="21" cy="21" r="21" fill="#ff5d00" />
      <path d="M21 11C16.03 11 12 15.03 12 20C12 23.4 13.9 26.4 16.75 28.1V31H25.25V28.1C28.1 26.4 30 23.4 30 20C30 15.03 25.97 11 21 11Z" fill="white" />
      <rect x="16.75" y="32" width="8.5" height="2" rx="1" fill="white" />
      <rect x="17.5" y="35" width="7" height="2" rx="1" fill="white" />
    </svg>
  );
}

const CARDS = [
  {
    icon: <TargetIcon />,
    title: "Drivers Lack:",
    bullets: [
      "understanding actual time saved",
      "awareness of driving habits",
      "comparative context with other drivers",
    ],
  },
  {
    icon: <SearchIcon />,
    title: "Research Q's",
    bullets: [
      "How much time does speeding actually save?",
      "Do drivers perceive speeding as beneficial?",
      "How can we display data that gameifies driver behavior?",
    ],
  },
  {
    icon: <InsightIcon />,
    title: "Insights",
    bullets: [
      "Drivers often overestimate time saved.",
      "Gamification increases engagement with behavioral data.",
    ],
  },
];

export default function SpeedsterResearchOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "80px",
        paddingBottom: "80px",
        transition: "background-color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-[50px] items-stretch justify-center"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex flex-col gap-[40px] flex-1 rounded-[20px]"
            style={{
              backgroundColor: "var(--bg-secondary)",
              padding: "21px 29px",
              transition: "background-color 200ms ease",
            }}
          >
            {/* Label + icon + title */}
            <div className="flex flex-col gap-[10px]">
              <p
                className="font-semibold leading-none uppercase"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "1rem",
                  letterSpacing: "-0.03em",
                  color: "var(--text-tertiary)",
                  transition: "color 200ms ease",
                }}
              >
                IDEATION
              </p>
              <div className="flex items-center gap-[10px]">
                {card.icon}
                <h3
                  className="font-normal leading-none whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1.875rem",
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {card.title}
                </h3>
              </div>
            </div>

            {/* Bullets */}
            <ul className="flex flex-col gap-0 list-disc" style={{ paddingLeft: "1.25rem" }}>
              {card.bullets.map((b, j) => (
                <li
                  key={j}
                  className="font-normal leading-[1.4]"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.02em",
                    color: "var(--text-primary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
