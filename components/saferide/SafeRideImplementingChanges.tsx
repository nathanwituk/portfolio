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

export default function SafeRideImplementingChanges() {
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
          className="flex flex-col gap-[40px] flex-1 min-w-0"
        >
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
              Fixing the Flow
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
              Implementing changes
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-[12px]">
            <p
              className="font-normal leading-[1.4]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.02em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Way too many screens for intoxicated or unsafe students to navigate through.
            </p>
            <p
              className="font-normal leading-[1.4]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.02em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              With today's tech, safe ride should be able to use your current location to
              minimize time spent on requests.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Changes.png */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="shrink-0 flex items-center justify-center"
          style={{ maxWidth: "480px", width: "100%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Saferide/Changes.png"
            alt="Implementing changes — SafeRide redesign"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "16px",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
