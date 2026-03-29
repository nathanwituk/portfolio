"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HavenDesignProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: DARK }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "clamp(48px, 8vw, 100px)",
          paddingBottom: "clamp(48px, 8vw, 100px)",
          gap: "clamp(24px, 3.5vw, 40px)",
        }}
      >
        <motion.p
          variants={fadeUp}
          className="font-semibold uppercase"
          style={{ fontFamily: FONT, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)" }}
        >
          Wireframes
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-normal leading-[1.05]"
          style={{
            fontFamily: FONT,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            letterSpacing: "-0.05em",
            color: "#ffffff",
          }}
        >
          The Design Process
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: FONT,
            fontSize: "0.9375rem",
            letterSpacing: "0.02em",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.75)",
            maxWidth: "560px",
          }}
        >
          Now that we knew what features were needed and would be used by our target audience, we
          started putting our words into wireframes.
        </motion.p>
      </motion.div>
    </section>
  );
}
