"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const ACCENT = "#9747ff";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* Simplified wireframe phone component */
function WireframePhone({ variant }: { variant: "checkin" | "mood" }) {
  return (
    <div
      style={{
        width: "clamp(120px, 14vw, 200px)",
        aspectRatio: "9/16",
        backgroundColor: "#ffffff",
        borderRadius: "clamp(12px, 1.5vw, 20px)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
        padding: "clamp(10px, 1.2vw, 16px)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        flexShrink: 0,
      }}
    >
      {/* Top bar */}
      <div style={{ height: "3px", backgroundColor: "#e0e0e0", borderRadius: "2px", width: "60%" }} />
      <div style={{ height: "3px", backgroundColor: "#e0e0e0", borderRadius: "2px", width: "40%", marginBottom: "4px" }} />

      {/* Heart icon placeholder */}
      <div
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          backgroundColor: "#f0f0f0",
          alignSelf: "center",
          marginBottom: "2px",
        }}
      />

      {/* Title */}
      <div style={{ height: "4px", backgroundColor: "#333", borderRadius: "2px", width: "70%", alignSelf: "center" }} />
      <div style={{ height: "3px", backgroundColor: "#ccc", borderRadius: "2px", width: "85%", alignSelf: "center", marginBottom: "4px" }} />

      {variant === "checkin" ? (
        /* Check-in sliders */
        <>
          {[0.9, 0.7, 0.85, 0.75].map((w, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <div style={{ height: "2.5px", backgroundColor: "#d0d0d0", borderRadius: "2px", width: `${w * 100}%`, marginBottom: "3px" }} />
              <div className="flex" style={{ gap: "3px" }}>
                {Array.from({ length: 10 }).map((_, j) => (
                  <div
                    key={j}
                    style={{
                      width: "8%",
                      aspectRatio: "1",
                      borderRadius: "50%",
                      backgroundColor: j < 6 ? "#bbb" : "#e8e8e8",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        /* Mood picker */
        <>
          {["😊 Great", "🙂 Good", "😐 Okay", "😟 Not great", "😰 Struggling"].map((item) => (
            <div
              key={item}
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                padding: "5px 8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "0.5rem", color: "#555" }}>{item}</span>
            </div>
          ))}
        </>
      )}

      {/* Bottom button */}
      <div
        style={{
          marginTop: "auto",
          height: "12px",
          backgroundColor: "#999",
          borderRadius: "4px",
          width: "80%",
          alignSelf: "center",
        }}
      />
    </div>
  );
}

export default function HavenWireframesOnboarding() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: ACCENT }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "clamp(48px, 8vw, 100px)",
          paddingBottom: "clamp(48px, 8vw, 100px)",
          gap: "clamp(40px, 6vw, 80px)",
        }}
      >
        {/* Left: text */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(16px, 2.5vw, 28px)", flex: "0 0 auto", maxWidth: "480px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{ fontFamily: FONT, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)" }}
          >
            Wireframes
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.05]"
            style={{
              fontFamily: FONT,
              fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)",
              letterSpacing: "-0.05em",
              color: "#ffffff",
            }}
          >
            Onboarding
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "0.9375rem",
              letterSpacing: "0.02em",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            From our research, we learned that daily check-ins can be super beneficial in creating
            better habits for individuals struggling with burnout or academic stress in College.
          </motion.p>
        </motion.div>

        {/* Right: wireframe phones */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center"
          style={{ flex: 1, gap: "clamp(16px, 2.5vw, 32px)" }}
        >
          <WireframePhone variant="checkin" />
          <WireframePhone variant="mood" />
        </motion.div>
      </motion.div>
    </section>
  );
}
