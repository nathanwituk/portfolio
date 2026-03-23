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
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="study-sync"
      className="lg:hidden w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      <div
        ref={ref}
        className="flex flex-col lg:flex-row items-center justify-between w-full mx-auto px-5 md:px-[80px] py-12 lg:py-[40px]"
        style={{ maxWidth: "1280px", gap: "46px" }}
      >
        {/* ── Left: text — below video on mobile, left on desktop ── */}
        <motion.div
          variants={textStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col order-last lg:order-first"
          style={{ flex: "1 0 0", gap: "37px", minWidth: "0" }}
        >
          {/* Category + Title */}
          <motion.div variants={fadeUp} className="flex flex-col" style={{ gap: "6px" }}>
            <p
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.48px",
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
                fontSize: "2.3125rem",
                letterSpacing: "-1.11px",
                lineHeight: "1",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Study Sync Dashboard
            </p>
          </motion.div>

          {/* Description */}
          <motion.div variants={fadeUp}>
            <p
              className="font-normal"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "14px",
                letterSpacing: "0.28px",
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

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <FigmaButton
              href="/work/studysync"
              external={false}
              accentColor="#b2e639"
              accentColorHover="#c5f53f"
              inkColor="#000000"
            >
              See Project
            </FigmaButton>
          </motion.div>
        </motion.div>

        {/* ── Right: video — above text on mobile, right on desktop ── */}
        <motion.div
          variants={videoVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="shrink-0 order-first lg:order-last w-full lg:w-auto"
        >
          <div
            className="relative overflow-hidden w-full lg:w-[490px]"
            style={{ aspectRatio: "490 / 424", borderRadius: "7.344px" }}
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
      </div>
    </section>
  );
}
