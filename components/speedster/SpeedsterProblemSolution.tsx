"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function ArrowRightIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
      <path
        d="M12 26H40M40 26L28 14M40 26L28 38"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 52 52" fill="none" aria-hidden="true">
      <path
        d="M26 12V40M26 40L14 28M26 40L38 28"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SpeedsterProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Starts at 180° (pointing left → problem statement), flips to 0° (pointing right → solution)
  const arrowRotate = useTransform(scrollYProgress, [0, 0.5], [180, 0]);

  // Shine sweeps left→right across the circle as the arrow flips (peaks at midpoint)
  const shineX = useTransform(scrollYProgress, [0, 0.25, 0.5], ["-120%", "0%", "120%"]);
  const shineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.65], [0, 0.55, 0.55, 0]);

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "91px",
        paddingBottom: "var(--section-pb)",
        transition: "background-color 200ms ease",
      }}
    >
      <div
        className="max-w-[1280px] mx-auto relative"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-start gap-0 md:gap-0"
        >
          {/* Problem statement */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-[12px] flex-1"
          >
            <h2
              className="font-normal leading-[1.1]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.05em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Problem statement
            </h2>
            <p
              className="font-normal leading-[1.4]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "0.02em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
                maxWidth: "420px",
              }}
            >
              Many drivers believe speeding saves significant time, but there is little accessible feedback showing the real impact of speeding behavior.
            </p>
          </motion.div>

          {/* Mobile-only: down arrow between sections */}
          <motion.div
            variants={fadeUp}
            className="md:hidden flex items-center justify-center w-full"
            style={{ padding: "32px 0" }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#ff5d00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowDownIcon />
            </div>
          </motion.div>

          {/* Desktop-only: center arrow circle */}
          <motion.div
            variants={fadeUp}
            className="hidden md:flex items-center justify-center shrink-0 self-start"
            style={{ padding: "0 40px", marginTop: "8px" }}
          >
            <div
              style={{
                width: "125px",
                height: "125px",
                borderRadius: "50%",
                backgroundColor: "#ff5d00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Shine sweep */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "-20%",
                  left: "-40%",
                  width: "80%",
                  height: "140%",
                  background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.38) 50%, transparent 80%)",
                  x: shineX,
                  opacity: shineOpacity,
                  pointerEvents: "none",
                  borderRadius: "50%",
                }}
              />
              <motion.div style={{ rotate: arrowRotate, position: "relative", zIndex: 1 }}>
                <ArrowRightIcon />
              </motion.div>
            </div>
          </motion.div>

          {/* Proposed solution */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-[12px] flex-1"
          >
            <h2
              className="font-normal leading-[1.1]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.05em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Proposed solution
            </h2>
            <p
              className="font-normal leading-[1.4]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "0.02em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
                maxWidth: "420px",
              }}
            >
              Speedster is a mobile app that tracks driving speeds and calculates how much time users actually save by speeding, turning driving behavior into a data-driven experience.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
