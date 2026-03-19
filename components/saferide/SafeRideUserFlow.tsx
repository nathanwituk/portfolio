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

// Valid 7 days — replace with local asset if expired
const FLOW_IMG = "https://www.figma.com/api/mcp/asset/1fcc76c4-8fed-481f-b8c8-d2b06b762fca";

export default function SafeRideUserFlow() {
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
          className="flex flex-col gap-[50px] flex-1 min-w-0"
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
              User Flow
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-[16px]">
            <p
              className="font-normal leading-[1.21]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.025em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Way too many screens for intoxicated or unsafe students to navigate through
            </p>
            <p
              className="font-normal leading-[1.21]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.025em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              With today's tech, safe ride should be able to use your current location to
              minimize time spent on requests.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: flow diagram card */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="shrink-0 flex items-center justify-center rounded-[20px] overflow-hidden"
          style={{
            backgroundColor: "var(--bg-secondary)",
            padding: "32px",
            maxWidth: "600px",
            width: "100%",
            transition: "background-color 200ms ease",
          }}
        >
          <img
            src={FLOW_IMG}
            alt="SafeRide current user flow diagram"
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
