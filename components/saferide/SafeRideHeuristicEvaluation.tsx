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

const slideIn = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 } },
};

const HEURISTICS = [
  {
    title: "Visibility of Status",
    body: "Large blue dot shows user location; bus appears only near arrival time.",
  },
  {
    title: "User Control and Freedom:",
    body: '"Where to" removes map view, shifting users into text-based destination selection.',
  },
  {
    title: "Error Prevention:",
    body: "Rides limited to service hours; multiple buttons may confuse intoxicated users.",
  },
];

// Valid for 7 days from fetch — replace with a local asset if expired
const PHONE_IMG = "https://www.figma.com/api/mcp/asset/9c1785d1-21f2-4692-9b29-3139b2e14dd9";

export default function SafeRideHeuristicEvaluation() {
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
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-[60px] md:gap-[80px]"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        {/* Left: text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-[50px] flex-1 min-w-0"
        >
          {/* Label + title */}
          <motion.div variants={fadeUp} className="flex flex-col gap-[6px]">
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
              Analyzing the App
            </p>
            <h2
              className="font-normal leading-none"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1.875rem",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Heuristic Evaluation
            </h2>
          </motion.div>

          {/* Heuristics */}
          <motion.div variants={fadeUp} className="flex flex-col gap-[28px]">
            {HEURISTICS.map((h) => (
              <div key={h.title} className="flex flex-col gap-[4px]">
                <p
                  className="font-medium leading-[1.21]"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1.25rem",
                    letterSpacing: "-0.05em",
                    color: "var(--text-primary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {h.title}
                </p>
                <p
                  className="font-normal leading-[1.21]"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "-0.025em",
                    color: "var(--text-secondary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {h.body}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: phone mockup */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="shrink-0 flex items-center justify-center"
          style={{ maxWidth: "280px", width: "100%" }}
        >
          <img
            src={PHONE_IMG}
            alt="SafeRide app screenshot on iPhone"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "26px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
