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

const APPS = [
  { src: "https://www.figma.com/api/mcp/asset/ee2f4e4f-e2e3-4cf8-8730-003569f019aa", alt: "Calm" },
  { src: "https://www.figma.com/api/mcp/asset/502acc9e-0a59-4d53-88a6-96853225abef", alt: "Headspace" },
  { src: "https://www.figma.com/api/mcp/asset/3bc5bec7-ff68-4cba-a0a1-fd0488ccfa3f", alt: "Stoic" },
  { src: "https://www.figma.com/api/mcp/asset/89ea57fe-3d87-444c-b19b-c58fad4c3aaa", alt: "Finch" },
  { src: "https://www.figma.com/api/mcp/asset/a746f381-8226-480f-8049-eb7b70895b2b", alt: "Forest" },
];

export default function HavenCompetition() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: ACCENT }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "clamp(48px, 8vw, 100px)",
          paddingBottom: "clamp(48px, 8vw, 100px)",
          gap: "clamp(24px, 3.5vw, 48px)",
        }}
      >
        <motion.p
          variants={fadeUp}
          className="font-semibold uppercase"
          style={{ fontFamily: FONT, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)" }}
        >
          Competitive Research
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-normal leading-[1.05]"
          style={{ fontFamily: FONT, fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)", letterSpacing: "-0.05em", color: "#ffffff" }}
        >
          The competition.
        </motion.h2>

        <motion.div variants={fadeUp} className="flex flex-wrap" style={{ gap: "clamp(10px, 1.5vw, 16px)" }}>
          {APPS.map((app) => (
            <img
              key={app.alt}
              src={app.src}
              alt={app.alt}
              draggable={false}
              style={{
                width: "clamp(52px, 5.5vw, 70px)",
                height: "clamp(52px, 5.5vw, 70px)",
                borderRadius: "clamp(10px, 1.2vw, 14px)",
                display: "block",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
