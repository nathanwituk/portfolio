"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};


export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="w-full flex flex-col md:flex-row items-center px-5 md:px-[80px]"
      style={{
        backgroundColor: "var(--bg-tertiary)",
        justifyContent: "space-between",
        paddingTop: "56px",
        paddingBottom: "56px",
        gap: "32px",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      {/* ── Left: bio text (desktop) / right on tablet ── */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col shrink-0 order-2 md:order-1 lg:order-1"
        style={{ maxWidth: "568px", width: "100%", gap: "21px" }}
      >
        <motion.p
          variants={fadeUp}
          className="font-normal"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "2.3125rem",
            letterSpacing: "-1.11px",
            lineHeight: "1",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          About
        </motion.p>

        <div className="flex flex-col" style={{ gap: "6px" }}>
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1rem",
              letterSpacing: "-0.48px",
              lineHeight: "1.1",
              color: "var(--text-secondary)",
            }}
          >
            Junior | University of Kansas
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="font-normal"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "2.3125rem",
              letterSpacing: "-1.11px",
              lineHeight: "1",
              color: "var(--text-primary)",
            }}
          >
            Nathan Wituk
          </motion.p>
        </div>

        <motion.p
          variants={fadeUp}
          className="font-normal"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "0.875rem",
            letterSpacing: "0.28px",
            lineHeight: "1.4",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          is a Kansas-based UI/UX and visual designer who blends research,
          storytelling, and digital culture to shape thoughtful, user-centered
          experiences. He studies Interaction Design at the University of Kansas
          and brings a background in award-winning journalism, social content,
          and design.
        </motion.p>
      </motion.div>

    </section>
  );
}
