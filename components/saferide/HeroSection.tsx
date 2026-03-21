"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const TAGS = ["FIGMA", "UI/UX", "3 WEEKS"];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--bg-primary)", transition: "background-color 200ms ease" }}
    >
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto flex flex-col md:flex-row flex-wrap items-center justify-between gap-y-[46px]"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "clamp(60px, 6vw, 80px)",
          paddingBottom: "clamp(60px, 6vw, 80px)",
        }}
      >
        {/* Left: Mockup placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-full md:w-[534px] h-[338px] rounded-[20px] shrink-0 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          {/* Replace with actual app screenshot */}
          <p
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              color: "var(--text-tertiary)",
              fontSize: "0.875rem",
            }}
          >
            App Preview
          </p>
        </motion.div>

        {/* Right: Text content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="flex flex-col gap-[37px] flex-1 min-w-0"
          style={{ minWidth: "min(100%, 400px)" }}
        >
          {/* Label + Title */}
          <div className="flex flex-col gap-[6px]">
            <p
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.03em",
                color: "var(--text-tertiary)",
                transition: "color 200ms ease",
              }}
            >
              DESIGNING WITH SYSTEMS
            </p>
            <h1
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.05em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              StudySync
            </h1>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1.25rem",
              fontWeight: 400,
              lineHeight: "24px",
              letterSpacing: "0.4px",
              color: "var(--text-secondary)",
              transition: "color 200ms ease",
            }}
          >
            A productivity app that is focused on students&apos; success, deadlines and grades.
            Study Sync will make it easy to identify what assignments users need to focus on first
            and how to navigate their academic journey up to graduation.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-[15px]">
            {TAGS.map((tag) => (
              <div
                key={tag}
                className="flex items-center justify-center rounded-[29px]"
                style={{ padding: "5px 22px", backgroundColor: "#b2e639" }}
              >
                <span
                  className="font-semibold uppercase whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "-0.03em",
                    color: "#000000",
                    lineHeight: 1.1,
                  }}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
