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
  visible: { transition: { staggerChildren: 0.1 } },
};


export default function HavenWireframesOnboarding() {
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
          paddingTop: "var(--section-pt)",
          paddingBottom: "var(--section-pb)",
          gap: "clamp(40px, 6vw, 80px)",
        }}
      >
        {/* Left: text */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(16px, 2.5vw, 28px)", flex: "0 0 auto", maxWidth: "480px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{ fontFamily: FONT, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)" }}
          >
            Wireframes
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.1]"
            style={{
              fontFamily: FONT,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Onboarding
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "0.9375rem",
              letterSpacing: "0.02em",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            From our research, we learned that daily check-ins can be super beneficial in creating
            better habits for individuals struggling with burnout or academic stress in College.
          </motion.p>
        </motion.div>

        {/* Right: wireframe phones */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center"
          style={{ flex: 1, gap: "clamp(16px, 2.5vw, 32px)" }}
        >
          <img
            src="/images/Haven/OnboardingWireframe1.svg"
            alt="Onboarding wireframe screen 1"
            draggable={false}
            style={{ width: "clamp(120px, 14vw, 220px)", height: "auto", display: "block" }}
          />
          <img
            src="/images/Haven/OnboardingWireframe2.svg"
            alt="Onboarding wireframe screen 2"
            draggable={false}
            style={{ width: "clamp(120px, 14vw, 220px)", height: "auto", display: "block" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
