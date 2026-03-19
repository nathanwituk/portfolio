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

// Valid 7 days — replace with local assets if expired
const PHONE_MAIN = "https://www.figma.com/api/mcp/asset/88eab329-4c3e-44e1-9596-bc9215369727";
const PHONE_CARD = "https://www.figma.com/api/mcp/asset/087cda90-d555-4072-b4e3-e486caff8148";

const ANNOTATIONS = [
  "Added Schedule ride now button",
  'Added an "Active Trips" button so users can get back to their previous scheduled rides.',
  "Red highlight increases legibility and promotes a sense of urgency",
];

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
              className="font-normal leading-[1.21]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.025em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Way too many screens for intoxicated or unsafe students to navigate through.
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

        {/* Right: annotated phone mockups */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="shrink-0 flex flex-col gap-[32px]"
          style={{ maxWidth: "380px", width: "100%" }}
        >
          {/* Main phone with annotations */}
          <div className="flex flex-col gap-[16px]">
            {/* Annotation 1 */}
            <div className="flex items-center gap-[10px]">
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "1px",
                  backgroundColor: "var(--text-tertiary)",
                  flexShrink: 0,
                }}
              />
              <p
                className="font-normal leading-[1.21]"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "-0.025em",
                  color: "var(--text-secondary)",
                  transition: "color 200ms ease",
                }}
              >
                {ANNOTATIONS[0]}
              </p>
            </div>

            {/* Main phone mockup */}
            <div
              style={{
                borderRadius: "26px",
                overflow: "hidden",
                boxShadow: "0 0 21px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={PHONE_MAIN}
                alt="SafeRide redesigned home screen with Schedule ride now button"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            {/* Annotation 2 */}
            <div className="flex items-center gap-[10px]">
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "1px",
                  backgroundColor: "var(--text-tertiary)",
                  flexShrink: 0,
                }}
              />
              <p
                className="font-normal leading-[1.21]"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "-0.025em",
                  color: "var(--text-secondary)",
                  transition: "color 200ms ease",
                }}
              >
                {ANNOTATIONS[1]}
              </p>
            </div>
          </div>

          {/* Annotation 3 + small card mockup */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[10px]">
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "1px",
                  backgroundColor: "var(--text-tertiary)",
                  flexShrink: 0,
                }}
              />
              <p
                className="font-normal leading-[1.21]"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "-0.025em",
                  color: "var(--text-secondary)",
                  transition: "color 200ms ease",
                }}
              >
                {ANNOTATIONS[2]}
              </p>
            </div>
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 0 21px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={PHONE_CARD}
                alt="SafeRide driver is arriving card with red highlight"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
