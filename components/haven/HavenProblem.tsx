"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const ACCENT = "#9747ff";


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HavenProblem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: ACCENT }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "clamp(48px, 8vw, 100px)",
          paddingBottom: "clamp(48px, 8vw, 100px)",
          gap: "clamp(32px, 5vw, 80px)",
        }}
      >
        {/* Left — title + body */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(20px, 2.5vw, 32px)", flex: "1 1 0" }}
        >
          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.05]"
            style={{
              fontFamily: FONT,
              fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)",
              letterSpacing: "-0.05em",
              color: "#ffffff",
            }}
          >
            A student burnout companion
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              lineHeight: "1.4",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            College students struggle to recognize and manage early signs of burnout
            due to constant academic and social demands. They need a simple, supportive
            way to take breaks, track emotional patterns, and maintain balance between
            productivity and mental health.
          </motion.p>
        </motion.div>

        {/* Right — audience diagram */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center shrink-0"
          style={{ width: "clamp(240px, 35%, 480px)" }}
        >
          {/* Icon infographic SVG */}
          <img
            src="/images/Haven/CollegeStudentsIconInfographic.svg"
            alt="Sources: academia, social media, alcohol, social apps, devices"
            style={{ width: "100%", display: "block" }}
            draggable={false}
          />

        </motion.div>
      </motion.div>
    </section>
  );
}
