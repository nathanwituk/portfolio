"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const QUESTIONS = [
  { text: "How many tasks do I have left in my Bio class for this week?", rotate: -10 },
  { text: "Is my GPA above 3.0?", rotate: -4 },
  { text: "What does the ratio between studying and grades look like?", rotate: -3 },
  { text: "How much time have I spent on assignments this week?", rotate: 1 },
  { text: "How many classes do I need to take until I can graduate?", rotate: 1 },
];

export default function NeedStatements() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full" style={{ backgroundColor: "#b2e639" }}>
      <div
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "88px",
          paddingBottom: "88px",
        }}
      >
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-[56px]"
        >
          {/* Headline */}
          <motion.p
            variants={fadeUp}
            className="font-normal leading-[1.1]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)",
              letterSpacing: "-0.05em",
              color: "#000000",
              maxWidth: "16ch",
            }}
          >
            Jordan needs to be able to answer the following:
          </motion.p>

          {/* Question pills — scattered with subtle rotations */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-[16px] items-start"
          >
            {QUESTIONS.map((q, i) => (
              <div
                key={i}
                className="inline-flex items-center rounded-[20px]"
                style={{
                  backgroundColor: "#000000",
                  padding: "10px 18px",
                  transform: `rotate(${q.rotate}deg)`,
                }}
              >
                <p
                  className="font-normal leading-none whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
                    letterSpacing: "0.02em",
                    color: "#ffffff",
                  }}
                >
                  {q.text}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
