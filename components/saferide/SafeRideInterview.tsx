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

function QuoteMark() {
  return (
    <span
      aria-hidden="true"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "5rem",
        lineHeight: 1,
        color: "#6363ff",
        opacity: 0.7,
        display: "block",
        userSelect: "none",
      }}
    >
      &ldquo;
    </span>
  );
}

export default function SafeRideInterview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

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
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-[32px] lg:gap-[80px]"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        {/* Left: label + title */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-[6px] shrink-0 lg:w-[280px]"
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase leading-none"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1rem",
              letterSpacing: "-0.03em",
              color: "var(--text-tertiary)",
              transition: "color 200ms ease",
            }}
          >
            Diving Deeper
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-normal leading-none"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1.875rem",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            Interview with SafeRide Driver
          </motion.h2>
        </motion.div>

        {/* Right: quote card */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 flex items-center gap-[32px] rounded-[20px] min-w-0"
          style={{
            backgroundColor: "var(--bg-secondary)",
            padding: "36px clamp(20px, 4vw, 40px)",
            transition: "background-color 200ms ease",
          }}
        >
          {/* Quote mark + body */}
          <div className="flex flex-col gap-[16px] min-w-0 flex-1">
            <QuoteMark />
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
              Before there was an app... you would call us, and you could plead your case,
              like, if you were a lost girl that just got abandoned by all your friends, you
              could tell the dispatcher, and she would send the very closest or next available
              car, and we were there in five minutes.
            </p>
          </div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block self-stretch shrink-0"
            style={{
              width: "1px",
              backgroundColor: "#6363ff",
              opacity: 0.3,
              borderRadius: "1px",
            }}
          />

          {/* Insight question */}
          <div className="flex-1 min-w-0 hidden lg:block">
            <p
              className="font-normal leading-[1.1]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "2.3125rem",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              How can SafeRide prioritize their rider queue based on circumstance?
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mobile insight question */}
      <div
        className="lg:hidden max-w-[1280px] mx-auto mt-[24px]"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        <p
          className="font-normal leading-[1.1]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1.875rem",
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          How can SafeRide prioritize their rider queue based on circumstance?
        </p>
      </div>
    </section>
  );
}
