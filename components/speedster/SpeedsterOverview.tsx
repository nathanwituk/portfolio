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

export default function SpeedsterOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "var(--section-pt)",
        paddingBottom: "calc(var(--section-pb) * 1.2)",
        transition: "background-color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col gap-[25px]"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        {/* Title */}
        <motion.h2
          variants={fadeUp}
          className="font-normal leading-none"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "-0.05em",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          Overview
        </motion.h2>

        {/* Body */}
        <motion.p
          variants={fadeUp}
          className="font-normal leading-[1.4]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.02em",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
            maxWidth: "900px",
          }}
        >
          Research consistently shows that speeding provides very small time savings in typical
          driving conditions, often only a few minutes over long trips. Despite this, drivers widely
          believe speeding is beneficial, largely due to cognitive bias and overestimation of time
          saved. Studies of driver psychology show that social comparison, feedback, and gamified
          metrics can significantly influence driving behavior. These findings suggest that
          visualizing real-time data can transform invisible driving habits into engaging experiences.
        </motion.p>
      </motion.div>
    </section>
  );
}
