"use client";

import { motion } from "framer-motion";
import TagPill from "@/components/ui/TagPill";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const TAGS = ["REDESIGN", "USER SAFETY", "REAL WORLD"];

export default function SafeRideHero() {
  return (
    <section
      className="w-full flex flex-col lg:flex-row flex-wrap items-center justify-between gap-y-[80px] lg:gap-y-[46px] px-5 md:px-[80px]"
      style={{
        paddingTop: "110px",
        paddingBottom: "110px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      {/* Left / Top: video — padding creates invisible breathing room without clipping shadow */}
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate="visible"
        className="shrink-0 w-full lg:w-[400px] flex items-center justify-center"
        style={{ padding: "8px" }}
      >
        <video
          src="/videos/SafeRide/FinalDemoVideoSafeRideHero.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            height: "560px",
            width: "auto",
            borderRadius: "35px",
            display: "block",
            boxShadow: "0 20px 42px rgba(0,0,0,0.25)",
          }}
        />
      </motion.div>

      {/* Right / Bottom: text */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-[37px] flex-1 min-w-0"
      >
        {/* Label + Title */}
        <motion.div variants={fadeUp} className="flex flex-col gap-[6px]">
          <p
            className="font-semibold uppercase leading-none"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
              color: "var(--text-tertiary)",
              transition: "color 200ms ease",
            }}
          >
            Designing for Safety — Redesign
          </p>
          <p
            className="font-normal leading-[1.1]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)",
              letterSpacing: "-0.05em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            SafeRide
          </p>
        </motion.div>

        {/* Body */}
        <motion.div variants={fadeUp}>
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
            The project shows how design solutions can be easily executed in new ways by
            eliminating how many tasks a user must complete before the desired end goal is
            achieved. In this study, I used interviews and evaluations to better understand
            how user goals were being met, and how to make them easier to attain.
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-[15px]">
          {TAGS.map((tag) => (
            <TagPill key={tag} color="#6363ff">{tag}</TagPill>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
