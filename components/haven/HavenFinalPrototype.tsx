"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function FigmaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 38 57" fill="none" aria-hidden="true">
      <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="white"/>
      <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="white"/>
      <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="white"/>
      <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="white"/>
      <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="white"/>
    </svg>
  );
}

export default function HavenFinalPrototype() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start lg:items-center"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "var(--section-pt)",
          paddingBottom: "var(--section-pb)",
          gap: "clamp(40px, 6vw, 80px)",
        }}
      >
        {/* ── Left: text ── */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(16px, 2.5vw, 28px)", flex: "0 0 auto", maxWidth: "480px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{ fontFamily: FONT, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "rgba(0,0,0,0.35)" }}
          >
            Final Prototype
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.05]"
            style={{
              fontFamily: FONT,
              fontSize: "1.875rem",
              letterSpacing: "-0.03em",
              color: DARK,
            }}
          >
            Final prototype
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              lineHeight: 1.5,
              color: "rgba(0,0,0,0.65)",
            }}
          >
            This final prototype delivers a calm and intuitive wellness experience that guides
            users through daily check-ins, reflections, and personalized emotion tracking.
          </motion.p>

          {/* Figma link button */}
          <motion.div variants={fadeUp}>
            <a
              href="https://www.figma.com/proto/Y6kw9BXSfq1enc3tIQ7XZl/Loudon-and-Nathan?page-id=383%3A4180&node-id=383-8933&viewport=512%2C221%2C0.17&t=G6V7YOf9hAKHTXzT-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=463%3A3249"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{
                gap: "10px",
                backgroundColor: DARK,
                borderRadius: "20px",
                padding: "16px 28px",
                textDecoration: "none",
              }}
            >
              <FigmaIcon />
              <span
                className="font-semibold uppercase"
                style={{
                  fontFamily: FONT,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.04em",
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                Figma Link
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: video ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-1 items-center justify-center"
        >
          <video
            src="/videos/Haven/FinalPrototypevideo.mov"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              maxWidth: "560px",
              height: "auto",
              display: "block",
              borderRadius: "clamp(12px, 1.5vw, 20px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
