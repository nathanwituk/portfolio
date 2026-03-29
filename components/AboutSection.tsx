"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      id="about"
      className="w-full"
      style={{
        backgroundColor: "var(--bg-tertiary)",
        paddingTop: "80px",
        paddingBottom: "80px",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          gap: "32px",
        }}
      >
        {/* Identity — name + role, largest, reads first */}
        <motion.div variants={fadeUp} className="flex flex-col" style={{ gap: "8px" }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              letterSpacing: "-0.05em",
              lineHeight: "1",
              fontWeight: 400,
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            Nathan Wituk
          </p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "clamp(1rem, 2vw, 1.375rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
              fontWeight: 400,
              color: "#ff5d00",
            }}
          >
            UX Designer · IXD Student
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          style={{
            height: "1px",
            backgroundColor: "var(--border-subtle, rgba(0,0,0,0.1))",
            width: "100%",
          }}
        />

        {/* Supporting details in two columns on desktop */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row"
          style={{ gap: "clamp(24px, 4vw, 64px)" }}
        >
          {/* Bio */}
          <p
            style={{
              fontFamily: FONT,
              fontSize: "0.9375rem",
              letterSpacing: "0.02em",
              lineHeight: "1.4",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
              flex: "2 1 0",
              minWidth: 0,
            }}
          >
            Kansas-based designer who blends research, storytelling, and digital
            culture to shape thoughtful, user-centered experiences. Background in
            award-winning journalism, social content, and visual design.
          </p>

          {/* Quick facts */}
          <div
            className="flex flex-col shrink-0"
            style={{ flex: "1 1 0", minWidth: 0, gap: "12px" }}
          >
            {[
              ["School", "University of Kansas"],
              ["Program", "Interaction Design"],
              ["Year", "Junior"],
              ["Location", "Kansas"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col" style={{ gap: "2px" }}>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#a4a4a4",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "0.9375rem",
                    letterSpacing: "-0.01em",
                    lineHeight: "1.2",
                    color: "var(--text-primary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
