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
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 } },
};

const FIGMA_HREF =
  "https://www.figma.com/proto/JdpialVoK0AnVhnm4Lp8bR/Untitled?page-id=423%3A11671&node-id=423-12806&viewport=1390%2C117%2C0.14&t=8FmjlylzYZl90nPw-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=423%3A11985";

const COLORS = ["#424242", "#ff5d00", "#6a6a6a", "#4a4a4a", "#2e2e2e", "#151515"];

const TYPE_SCALE = [
  { label: "Big title", size: "1.25rem", weight: 700 },
  { label: "Title", size: "0.9rem", weight: 700 },
  { label: "Subhead", size: "0.7rem", weight: 500 },
  { label: "Body Bold", size: "0.6rem", weight: 600 },
  { label: "Body", size: "0.6rem", weight: 300 },
  { label: "Details", size: "0.5rem", weight: 300 },
];

export default function SpeedsterDesignSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "var(--section-pt)",
        paddingBottom: "var(--section-pb)",
        transition: "background-color 200ms ease",
      }}
    >
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[30px]"
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
          className="flex flex-col gap-[20px] shrink-0"
          style={{ maxWidth: "440px" }}
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-[6px]">
            <p
              className="font-semibold leading-none uppercase"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                color: "var(--text-tertiary)",
                transition: "color 200ms ease",
              }}
            >
              Creation and organization
            </p>
            <h2
              className="font-normal leading-none"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1.875rem",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Design System
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-normal leading-[1.4]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            Combining alike colors, font size, buttons sizes for brand and app consistency across
            screens.
          </motion.p>

        </motion.div>

        {/* Right: design system preview */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 min-w-0 overflow-hidden"
          style={{ maxWidth: "580px" }}
        >
        <div className="flex gap-[32px] items-start" style={{ zoom: 0.9 }}>
          {/* Colors */}
          <div className="flex flex-col gap-[10px]">
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-instrument-sans), sans-serif" }}>Colors</p>
            <div className="grid gap-[6px]" style={{ gridTemplateColumns: "repeat(2, 40px)" }}>
              {COLORS.map((c) => (
                <div
                  key={c}
                  style={{
                    width: "40px",
                    height: "42px",
                    borderRadius: "6px",
                    backgroundColor: c,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Type */}
          <div className="flex flex-col gap-[6px]">
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-instrument-sans), sans-serif" }}>Type</p>
            <div className="flex flex-col gap-[4px]">
              {TYPE_SCALE.map((t) => (
                <p
                  key={t.label}
                  style={{
                    fontSize: t.size,
                    fontWeight: t.weight,
                    color: "var(--text-primary)",
                    fontFamily: "Inter, sans-serif",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    transition: "color 200ms ease",
                  }}
                >
                  {t.label}
                </p>
              ))}
            </div>
          </div>

          {/* Widgets preview */}
          <div className="flex flex-col gap-[10px]">
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-instrument-sans), sans-serif" }}>Widgets</p>
            <div
              className="rounded-[10px] overflow-hidden"
              style={{ backgroundColor: "#2f2f2f", padding: "10px 12px", width: "110px" }}
            >
              {/* Mini bar chart */}
              <div className="flex items-end gap-[3px]" style={{ height: "50px" }}>
                {[18, 30, 30, 60, 92, 44, 36, 36, 36, 26, 26, 36].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: "4px",
                      height: `${h}%`,
                      backgroundColor: i === 4 ? "#ff5d00" : "#6a6a6a",
                      borderRadius: "2px",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
              <div style={{ height: "1px", backgroundColor: "#444", margin: "6px 0" }} />
              <div className="flex justify-between">
                <span style={{ fontSize: "0.5rem", color: "#f5f5f5", fontFamily: "Inter, sans-serif" }}>9:09 AM</span>
                <span style={{ fontSize: "0.5rem", color: "#f5f5f5", fontFamily: "Inter, sans-serif" }}>10:28 AM</span>
              </div>
            </div>
          </div>

          {/* Buttons preview */}
          <div className="flex flex-col gap-[10px]">
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-instrument-sans), sans-serif" }}>Buttons</p>
            <div
              className="flex flex-col gap-[8px] rounded-[10px]"
              style={{ backgroundColor: "#202020", padding: "10px 12px" }}
            >
              <div style={{ height: "20px", borderRadius: "20px", backgroundColor: "#ff5d00", width: "80px" }} />
              <div style={{ height: "20px", borderRadius: "20px", backgroundColor: "#353535", width: "80px" }} />
              <div style={{ height: "20px", borderRadius: "20px", backgroundColor: "#4a4a4a", width: "80px" }} />
              <div style={{ height: "20px", borderRadius: "20px", backgroundColor: "rgba(255,255,255,0.15)", width: "80px" }} />
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
