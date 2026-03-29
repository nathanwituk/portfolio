"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";
const ACCENT = "#9747ff";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const RESEARCH_CARDS = [
  "Encouraging mindfulness practices, such as meditation, deep breathing exercises, and yoga.",
  "Ask for system change: individual coping helps, but organizational and institutional reform are essential for sustained change.",
  "\"Teaching students effective time management skills can help them balance academic, clinical, and personal responsibilities.\"",
  "Encouraging educators to prioritize self‑care and participate in wellness programs.",
  "\"If you feel like you're being tasked with too much, have a conversation with your manager about working on high‑priority items exclusively.\"",
  "Reconnect with purpose: when you remember why you started, you fuel resilience.",
  "\"Offering academic support services, such as tutoring, study groups, and skills workshops, can help students feel more confident and capable in their studies.\"",
  "Delegate or say no: learning to decline or ask for help is a core part of recovery.",
  "\"Place a hold in your calendar for lunch or breaks. Take your vacation days.\"",
  "\"Establishing peer mentoring programs can provide students with guidance and support from upperclassmen.\"",
  "Providing creative outlets and ensuring your strengths are magnified helps prevent burnout.",
  "Engage in reflection: check in with yourself regularly. Are you aligned? Are you rested? Are you still motivated?",
  "Promoting regular physical activity, balanced nutrition, and adequate sleep to enhance students' resilience to stress.",
  "Institutions should distribute workloads more equitably and implement policies that limit excessive administrative tasks.",
  "Cultivate rest as an active practice, not a passive by‑product of exhaustion.",
  "Build creativity into your life — not just as a hobby, but as a way to express, recharge, and reset.",
  "Active recovery practices are needed to support our well‑being… we need routines that allow us to recover while working, not just when exhausted.",
  "Scheduling relaxing activities makes certain they happen as well as gives you something to look forward to.",
  "You need to intentionally push everything to the side and just exist (and I say intentionally because we all know the wonders of procrastination and unintentional distraction).",
  "It sounds simple but all you need to do is sleep. Meditate. Walk outside. Listen to music. Just ignore your surroundings and enjoy the moment of peace you have at that time.",
];

const SOLUTION_CARDS = [
  "Encouraging mindfulness practices, such as meditation, deep breathing exercises, and yoga.",
  "\"If you feel like you're being tasked with too much, have a conversation with your manager about working on high‑priority items exclusively.\"",
  "It sounds simple but all you need to do is sleep. Meditate. Walk outside. Listen to music. Just ignore your surroundings and enjoy the moment of peace you have at that time.",
  "Engage in reflection: check in with yourself regularly. Are you aligned? Are you rested? Are you still motivated?",
];

const cardText = {
  fontFamily: FONT,
  fontSize: "0.875rem",
  fontWeight: 400 as const,
  letterSpacing: "0.02em",
  lineHeight: 1.4,
};

const pillLabel = {
  fontFamily: FONT,
  fontSize: "0.6875rem",
  fontWeight: 600 as const,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

export default function HavenSolutionsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "var(--section-pt)",
          paddingBottom: "var(--section-pb)",
          gap: "clamp(16px, 2.5vw, 24px)",
        }}
      >
        {/* Header row */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col lg:flex-row"
          style={{ gap: "clamp(10px, 1.5vw, 16px)" }}
        >
          <div
            className="flex-1 flex items-center justify-center"
            style={{
              backgroundColor: DARK,
              borderRadius: "16px",
              padding: "clamp(14px, 2vw, 20px) clamp(24px, 3vw, 40px)",
            }}
          >
            <p style={{ ...pillLabel, color: "#ffffff" }}>Solutions from Research</p>
          </div>
          <div
            className="lg:w-[30%] flex items-center justify-center"
            style={{
              backgroundColor: DARK,
              borderRadius: "16px",
              padding: "clamp(14px, 2vw, 20px) clamp(24px, 3vw, 40px)",
            }}
          >
            <p style={{ ...pillLabel, color: "#ffffff" }}>Solutions to Implement</p>
          </div>
        </motion.div>

        {/* Cards row */}
        <div className="flex flex-col lg:flex-row" style={{ gap: "clamp(10px, 1.5vw, 16px)", alignItems: "flex-start" }}>
          {/* Research cards — 3-column grid */}
          <div
            className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "clamp(8px, 1.2vw, 12px)" }}
          >
            {RESEARCH_CARDS.map((text, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  backgroundColor: DARK,
                  borderRadius: "14px",
                  padding: "clamp(14px, 1.8vw, 18px)",
                }}
              >
                <p style={{ ...cardText, color: "#ffffff", margin: 0 }}>{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Solutions to implement cards — 1 column */}
          <div
            className="lg:w-[30%] flex flex-col"
            style={{ gap: "clamp(8px, 1.2vw, 12px)" }}
          >
            {SOLUTION_CARDS.map((text, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  backgroundColor: ACCENT,
                  border: "2px solid #ffffff",
                  borderRadius: "14px",
                  padding: "clamp(14px, 1.8vw, 18px)",
                }}
              >
                <p style={{ ...cardText, color: "#ffffff", margin: 0 }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
