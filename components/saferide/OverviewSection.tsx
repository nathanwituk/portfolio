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

export default function OverviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="font-normal tracking-[-0.03em] leading-none"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            marginBottom: "48px",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          Overview
        </motion.h2>

        {/* Two-column body */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-[48px]"
        >
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
            This dashboard gives students the ability to track progress related to school work.
            The dashboard will give users the ability to connect their Canvas, Blackboard, or
            Google Classroom account in order to input data needed for key visualizations.
          </p>
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
            These visuals help students break down how well they&apos;re doing in classes and in
            their degree progress, making it easy to stay on top of deadlines and academic goals.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
