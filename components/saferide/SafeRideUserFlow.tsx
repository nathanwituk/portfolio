"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SafeRideFlowSVG from "./SafeRideFlowSVG";
import BeautyLightbox from "@/components/case-study/BeautyLightbox";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// Single-image array — the static SVG file (colors match the inline component)
const FLOW_IMAGE = [
  { src: "/images/Saferide/UserFlowDiagram.svg", alt: "SafeRide user flow diagram" },
];

function RestartButton({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      className="group inline-flex w-fit items-center gap-[10px] rounded-[10px] text-white"
      style={{
        padding: "12px 20px",
        border: "none",
        cursor: "pointer",
        userSelect: "none",
        fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
        fontSize: "0.875rem",
        backgroundColor: hovered ? "#5252e0" : "#6363ff",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.22)" : "0 2px 6px rgba(0,0,0,0.0)",
        transition: "background-color 180ms ease, box-shadow 180ms ease",
        outline: "none",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74" />
        <path d="M3 3v5h5" />
      </svg>
      <span className="relative">
        Restart
        <span
          className="absolute bottom-0 left-0 w-full h-px bg-white origin-left scale-x-0 group-hover:scale-x-100"
          style={{ transition: "transform 150ms ease-out" }}
        />
      </span>
    </motion.button>
  );
}

export default function SafeRideUserFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 220px 0px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "calc(var(--section-pt) + 25px)",
        paddingBottom: "calc(var(--section-pb) + 25px)",
        transition: "background-color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          gap: "40px",
        }}
      >
        {/* ── Text above ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col"
          style={{ gap: "16px" }}
        >
          <div className="flex flex-col" style={{ gap: "6px" }}>
            <p
              className="font-semibold uppercase leading-none"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.03em",
                color: "var(--text-tertiary)",
                transition: "color 200ms ease",
              }}
            >
              Analyzing the App
            </p>
            <h2
              className="font-normal leading-none"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1.875rem",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              User Flow
            </h2>
          </div>

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
            There were far too many screens for intoxicated or unsafe students to navigate
            through. With today's tech, safe ride should be able to use your current location
            to minimize time spent on requests, therefore eliminating the need for certain
            screens within the user flow
          </p>
        </motion.div>

        {/* ── Flow diagram — full width ── */}
        <motion.div
          variants={fadeUp}
          className="w-full"
          style={{ position: "relative", cursor: "zoom-in" }}
          onClick={() => setLightboxOpen(true)}
        >
          <SafeRideFlowSVG key={restartKey} />

          {/* ── Restart button — bottom-left ── */}
          <div
            style={{ position: "absolute", bottom: "clamp(10px, 1.5vw, 18px)", left: "clamp(10px, 1.5vw, 18px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <RestartButton onClick={(e) => { e.stopPropagation(); setRestartKey((k) => k + 1); }} />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <BeautyLightbox
            images={FLOW_IMAGE}
            initialIndex={0}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
