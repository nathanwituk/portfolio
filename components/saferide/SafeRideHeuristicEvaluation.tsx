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

export default function SafeRideHeuristicEvaluation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "var(--section-pt)",
        paddingBottom: "var(--section-pb)",
        transition: "background-color 200ms ease",
      }}
    >
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto flex flex-col md:flex-row-reverse items-center gap-[60px] md:gap-[80px]"
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
                  className="font-normal leading-[1.4]"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "0.875rem",
                    letterSpacing: "0.02em",
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

        {/* Right: heuristic evaluation screenshots */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="shrink-0 flex items-center justify-center gap-[14px]"
          style={{ maxWidth: "320px", width: "100%" }}
        >
          {["/images/Saferide/HeuristicEval-1.jpg", "/images/Saferide/HeuristicEval-2.jpg"].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`Heuristic Evaluation screenshot ${i + 1}`}
              style={{
                width: "calc(50% - 7px)",
                height: "auto",
                borderRadius: "20px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                display: "block",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
