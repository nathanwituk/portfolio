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

export default function ProblemSolution() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{
        paddingTop: "var(--section-pt)",
        paddingBottom: "var(--section-pb)",
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
        <div className="flex flex-col md:flex-row items-center gap-[48px] md:gap-[60px]">

          {/* Problem */}
          <motion.div variants={fadeUp} className="flex flex-col gap-[16px] flex-1 min-w-0">
            <h2
              className="font-normal leading-[1.1] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Problem statement
            </h2>
            <p
              className="font-normal leading-[1.5]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.02em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Many college students are unable to keep up with the fast paced nature of college
              classes and assignments. This results in lower academic performance that may not
              accurately reflect the student&apos;s knowledge.
            </p>
          </motion.div>

          {/* Arrow divider */}
          <motion.div
            variants={fadeUp}
            className="shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: "96px",
              height: "96px",
              backgroundColor: "#b2e639",
            }}
          >
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
              <path
                d="M2 14H34M34 14L22 2M34 14L22 26"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Solution */}
          <motion.div variants={fadeUp} className="flex flex-col gap-[16px] flex-1 min-w-0">
            <h2
              className="font-normal leading-[1.1] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Proposed solution
            </h2>
            <p
              className="font-normal leading-[1.5]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.02em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Study Sync is a dashboard-based product that allows students to connect their Canvas,
              Blackboard, or Google Classroom to give students easy to understand information about
              their academics.
            </p>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
