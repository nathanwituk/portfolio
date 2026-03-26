"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function ComposeOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "#f7f7f7",
        paddingTop: "80px",
        paddingBottom: "80px",
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
        <motion.h2
          variants={fadeUp}
          className="font-normal leading-none"
          style={{
            fontFamily: FONT,
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "-0.05em",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          Overview
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-normal leading-[1.4] w-full"
          style={{
            fontFamily: FONT,
            fontSize: "1rem",
            letterSpacing: "0.02em",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          Compose is a tool designed to simplify how complex performance
          programs are built, organized, and edited. It transforms deeply nested
          information, like sections, pieces, and performer groups, into a
          structured, intuitive interface that reduces cognitive load. The
          project focuses on making complex systems feel clear, flexible, and
          easy to manage without sacrificing control.
        </motion.p>
      </motion.div>
    </section>
  );
}
