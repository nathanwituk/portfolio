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

const slideIn = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE, delay: 0.1 } },
};

export default function SafeRideHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-[40px]"
      style={{
        paddingTop: "110px",
        paddingBottom: "0",
        paddingLeft: "clamp(20px, 6.25vw, 80px)",
        paddingRight: "clamp(20px, 6.25vw, 80px)",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      {/* Left: Title */}
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col gap-[20px] pb-[110px] shrink-0"
        style={{ maxWidth: "595px" }}
      >
        <motion.p
          variants={fadeUp}
          className="font-normal uppercase"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1rem",
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          IXD414 — Designing with Systems
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-semibold leading-[1.05]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "clamp(2.5rem, 6.5vw, 4rem)",
            letterSpacing: "-0.05em",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          SafeRide Redesign
        </motion.h1>
      </motion.div>

      {/* Right: Description card — flush to bottom of section */}
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="lg:flex-1 flex justify-center lg:justify-end items-end"
        style={{ maxWidth: "567px", width: "100%" }}
      >
        <div
          className="w-full flex flex-col gap-[44px] rounded-tl-[20px] rounded-tr-[20px]"
          style={{
            backgroundColor: "var(--bg-secondary)",
            padding: "50px 30px",
            transition: "background-color 200ms ease",
          }}
        >
          <div className="flex flex-col gap-[20px]">
            <p
              className="font-normal leading-[1.21]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.05em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              This project explores how digital tools can help people orient themselves
              whether in space or in time through the language of calendars, clocks, or
              compasses.
            </p>
            <div
              style={{
                height: "1px",
                backgroundColor: "var(--nav-border)",
                transition: "background-color 200ms ease",
              }}
            />
          </div>
          <div
            className="font-normal italic leading-[1.6]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1rem",
              letterSpacing: "-0.05em",
              color: "var(--text-tertiary)",
              transition: "color 200ms ease",
            }}
          >
            <p>Branding</p>
            <p>Website</p>
            <p>Interaction Design</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
