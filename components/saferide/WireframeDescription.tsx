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

export default function WireframeDescription() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{
        paddingTop: "var(--section-pt)",
        paddingBottom: "48px",
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
        {/* Label */}
        <motion.p
          variants={fadeUp}
          className="font-semibold uppercase leading-none"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "0.6875rem",
            letterSpacing: "0.08em",
            color: "var(--text-tertiary)",
            marginBottom: "10px",
            transition: "color 200ms ease",
          }}
        >
          Ideation
        </motion.p>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="font-normal leading-none"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "32px",
            transition: "color 200ms ease",
          }}
        >
          Wireframes
        </motion.p>

        {/* Body */}
        <motion.p
          variants={fadeUp}
          className="font-normal leading-[1.5]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "0.875rem",
            letterSpacing: "0.02em",
            color: "var(--text-primary)",
            maxWidth: "72ch",
            transition: "color 200ms ease",
          }}
        >
          At first the idea of a dashboard is simple, but once the first wireframe was made, I knew
          that I would have to adjust color, hierarchy and other design principles to ensure the
          target user group would actually benefit from this tool.
        </motion.p>
      </motion.div>
    </section>
  );
}
