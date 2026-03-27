"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export default function WireframePrototypesBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section className="w-full bg-[#6f7142]" style={{ paddingTop: "72px", paddingBottom: "72px" }}>
      <motion.div
        ref={ref}
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex items-center gap-[48px] max-w-[1280px] mx-auto"
        style={{ paddingLeft: "clamp(20px, 6.25vw, 80px)", paddingRight: "clamp(20px, 6.25vw, 80px)" }}
      >
        {/* Large heading left */}
        <h2
          className="font-normal text-white leading-[1.0] tracking-[-0.03em] shrink-0"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
          }}
        >
          Wireframe<br />prototypes
        </h2>

        {/* Arrow circle */}
        <div
          className="shrink-0 rounded-full border-2 border-white flex items-center justify-center"
          style={{ width: "clamp(60px, 8vw, 100px)", height: "clamp(60px, 8vw, 100px)" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path
              d="M5.5 14H22.5M22.5 14L15.5 7M22.5 14L15.5 21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Purpose text right */}
        <div className="flex flex-col gap-[12px]">
          <p
            className="font-normal text-white leading-none tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1.25rem",
            }}
          >
            Purpose
          </p>
          <p
            className="font-normal text-white leading-[1.5] max-w-[460px]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "0.875rem",
              letterSpacing: "0.01em",
            }}
          >
            Wireframe prototypes allow me to test workflows, structure, and interactions early.
            This helps identify usability issues{" "}
            <strong>before</strong> visual design begins.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
