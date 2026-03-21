"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const FEATURES = [
  {
    img: "/images/StudySyncDash/Key Feature Images/KeyFeature1.jpg",
    title: "View Study Time",
    description: "See projected study time based on current grades and assignments.",
  },
  {
    img: "/images/StudySyncDash/Key Feature Images/KeyFeature2.jpg",
    title: "Track Time Spent",
    description: "Visualize how much time you've spent studying for your classes.",
  },
  {
    img: "/images/StudySyncDash/Key Feature Images/KeyFeature3.jpg",
    title: "Manage Tasks",
    description: "Keep users engaged with one task visible at a time, or view your full list.",
  },
  {
    img: "/images/StudySyncDash/Key Feature Images/KeyFeature4.jpg",
    title: "Monitor GPA",
    description: "Look at your projected GPA based on weekly data.",
  },
  {
    img: "/images/StudySyncDash/Key Feature Images/KeyFeature5.jpg",
    title: "View Overall Progress",
    description: "See how many classes you have left in the Core 34 graduation requirement.",
  },
];

export default function KeyFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--bg-secondary)", transition: "background-color 200ms ease" }}
    >
      <div
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "88px",
          paddingBottom: "88px",
        }}
      >
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex gap-[40px] overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="flex flex-col gap-[20px] items-center shrink-0 w-[260px]"
            >
              <div className="w-full h-[240px] rounded-[16px] overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={f.title}
                  src={f.img}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[8px] items-center w-full text-center">
                <p
                  className="font-normal leading-none text-center"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "2.3125rem",
                    letterSpacing: "-0.03em",
                    color: "var(--text-primary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {f.title}
                </p>
                <p
                  className="font-normal leading-[1.4] text-center"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "0.875rem",
                    letterSpacing: "0.02em",
                    color: "var(--text-secondary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
