"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function SafeRidePersonaBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "#6363ff" }}
    >
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col gap-[6px] justify-center"
        style={{
          paddingTop: "50px",
          paddingBottom: "50px",
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          minHeight: "120px",
        }}
      >
        <p
          className="font-semibold uppercase leading-none"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1rem",
            letterSpacing: "-0.03em",
            color: "white",
          }}
        >
          User Persona
        </p>
        <p
          className="font-normal leading-none"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1.875rem",
            letterSpacing: "-0.02em",
            color: "white",
          }}
        >
          Who is using the app and how can we cater towards them?
        </p>
      </motion.div>
    </section>
  );
}
