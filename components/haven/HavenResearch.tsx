"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HavenResearch() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: "#12091c" }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "var(--section-pt)",
          paddingBottom: "var(--section-pb)",
          gap: "clamp(24px, 4vw, 64px)",
        }}
      >
        {/* Left col */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(16px, 2.5vw, 28px)", flex: "1 1 0" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{
              fontFamily: FONT,
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Competitive Research
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.05]"
            style={{
              fontFamily: FONT,
              fontSize: "1.875rem",
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Where do we start?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              lineHeight: "1.4",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Loudon Noukes and I worked as a team to evaluate existing solutions
            to this problem. Although some solutions weren&apos;t targeted towards
            college students, the solutions were ideal for aspects of our product.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
