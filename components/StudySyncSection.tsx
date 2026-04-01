"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECT_ASSETS } from "@/lib/assets";
import FigmaButton from "@/components/ui/FigmaButton";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const videoVariant = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 } },
};

const textStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function StudySyncSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      id="study-sync"
      ref={ref}
      className="lg:hidden w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      {/* ── Video — flush to left edge, no horizontal padding ── */}
      <motion.div
        variants={videoVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full"
      >
        <div
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: "490 / 424", borderRadius: "0 7.344px 7.344px 0" }}
        >
          <video
            src={PROJECT_ASSETS.studySyncVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* ── Text — padded to match the rest of the page ── */}
      <motion.div
        variants={textStagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col px-5 md:px-[80px] pt-8 pb-12"
        style={{ gap: "37px" }}
      >
        {/* Category + Title */}
        <motion.div variants={fadeUp} className="flex flex-col" style={{ gap: "6px" }}>
          <p
            className="font-semibold uppercase"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
              lineHeight: "1.1",
              color: "var(--text-tertiary)",
            }}
          >
            User Interface &amp; Experience
          </p>
          <p
            className="font-normal"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            Study Sync Dashboard
          </p>
        </motion.div>

        {/* Description + CTA */}
        <div className="flex flex-col" style={{ gap: "22px" }}>
          <motion.div variants={fadeUp}>
            <p
              className="font-normal"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.02em",
                lineHeight: "1.4",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Designing an intuitive quick-glance dashboard for college students
              who have trouble tracking and managing their academic schedule and
              workload.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <FigmaButton
              href="/work/studysync"
              external={false}
              accentColor="#b2e639"
              accentColorHover="#c5f53f"
              inkColor="#000000"
            >
              View Project
            </FigmaButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
