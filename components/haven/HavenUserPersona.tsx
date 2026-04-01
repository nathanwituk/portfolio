"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";
const ACCENT = "#9747ff";
const CARD_BG = "#1f132e";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const TRAITS = ["Passionate", "Driven", "Organized", "Hard Working", "Anxious", "Stressed"];

const SLIDERS: { left: string; right: string; pct: number }[] = [
  { left: "Introvert", right: "Extrovert", pct: 58 },
  { left: "Analytical", right: "Creative", pct: 38 },
  { left: "Busy", right: "Time rich", pct: 16 },
  { left: "Messy", right: "Organized", pct: 36 },
  { left: "Independent", right: "Team player", pct: 38 },
];

const pillText = {
  fontFamily: FONT,
  fontSize: "0.875rem",
  fontWeight: 600 as const,
  letterSpacing: "-0.03em",
  textTransform: "uppercase" as const,
  color: "#ffffff",
};

const labelText = {
  fontFamily: FONT,
  fontSize: "0.75rem",
  fontWeight: 400 as const,
  letterSpacing: "0.01em",
  color: "rgba(255,255,255,0.75)",
};

export default function HavenUserPersona() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: ACCENT }}>
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "calc(var(--section-pt) + 25px)",
          paddingBottom: "calc(var(--section-pb) + 25px)",
          gap: "clamp(40px, 6vw, 80px)",
        }}
      >
        {/* Left: combined text block */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col"
          style={{ gap: "clamp(16px, 2.5vw, 24px)", flex: "0 0 auto", maxWidth: "460px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{ fontFamily: FONT, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)" }}
          >
            User Persona
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.05]"
            style={{ fontFamily: FONT, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", color: "#ffffff" }}
          >
            Emily Clifton
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{ fontFamily: FONT, fontSize: "0.9375rem", letterSpacing: "0.02em", lineHeight: 1.5, color: "rgba(255,255,255,0.9)" }}
          >
            Meet Emily Clifton! A Sophomore in college studying pre-med. With the balance between
            lectures and labs that can last hours, she has started to feel burnout and needs a way
            to cope with this stressed feeling so it doesn&apos;t worsen.
          </motion.p>

          <motion.p
            variants={fadeUp}
            style={{ fontFamily: FONT, fontSize: "0.9375rem", fontStyle: "italic", letterSpacing: "0.01em", lineHeight: 1.4, color: "rgba(255,255,255,0.75)" }}
          >
            &ldquo;Pre-med is my favorite thing ever but even your favorite things can get tiring.&rdquo;
          </motion.p>
        </motion.div>

        {/* Right: persona card area */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col flex-1"
          style={{ gap: "clamp(16px, 2.5vw, 24px)", minWidth: 0 }}
        >
          <div className="flex flex-col md:flex-row" style={{ gap: "clamp(12px, 2vw, 20px)" }}>
            {/* Info card */}
            <motion.div
              variants={fadeUp}
              style={{ backgroundColor: CARD_BG, borderRadius: "20px", padding: "clamp(16px, 2vw, 24px)", flex: "1 1 0", minWidth: "180px" }}
            >
              {[
                { label: "Age:", value: "20" },
                { label: "Job Title:", value: "Student" },
                { label: "Status:", value: "Single" },
                { label: "Location:", value: "San Diego, CA" },
              ].map(({ label, value }, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between"
                  style={{ paddingTop: i === 0 ? 0 : "10px", gap: "8px" }}
                >
                  <span style={{ ...labelText, flexShrink: 0 }}>{label}</span>
                  <span style={{ ...labelText, fontStyle: "italic", flexShrink: 0 }}>{value}</span>
                </div>
              ))}
            </motion.div>

            {/* Trait pills */}
            <motion.div
              variants={fadeUp}
              style={{ backgroundColor: CARD_BG, borderRadius: "20px", padding: "clamp(16px, 2vw, 24px)", flex: "1 1 0", minWidth: "180px" }}
              className="flex flex-col"
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {TRAITS.map((trait) => (
                  <span
                    key={trait}
                    style={{
                      ...pillText,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      textAlign: "center",
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Personality sliders */}
          <motion.div
            variants={fadeUp}
            style={{ backgroundColor: CARD_BG, borderRadius: "20px", padding: "clamp(16px, 2vw, 24px)" }}
            className="flex flex-col"
          >
            <div className="flex flex-col" style={{ gap: "clamp(12px, 1.5vw, 16px)" }}>
              {SLIDERS.map(({ left, right, pct }) => (
                <div key={left} className="flex items-center" style={{ gap: "12px" }}>
                  <span style={{ ...labelText, textAlign: "right", minWidth: "80px", flexShrink: 0 }}>{left}</span>
                  <div style={{ flex: 1, position: "relative", height: "12px" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        right: 0,
                        height: "1px",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: `${pct}%`,
                        transform: "translate(-50%, -50%)",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: ACCENT,
                        border: "2px solid rgba(255,255,255,0.6)",
                      }}
                    />
                  </div>
                  <span style={{ ...labelText, minWidth: "80px", flexShrink: 0 }}>{right}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
