"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FigmaButton from "@/components/ui/FigmaButton";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const imageVariant = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const textStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const textLine = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function SafeRideSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      id="saferide"
      className="flex items-center justify-center w-full"
      style={{ backgroundColor: "var(--bg-primary)", transition: "background-color 200ms ease, color 200ms ease" }}
    >
      {/* Desktop: side-by-side. Tablet/Mobile: stacked. */}
      <div
        ref={ref}
        className="flex flex-col lg:flex-row items-center w-full px-5 md:px-[80px] py-12 lg:py-[29px]"
        style={{
          maxWidth: "1280px",
          gap: "0",
        }}
      >
        {/* ── Speedster phone/animation video ──
            Desktop: 490.891×424.5px, shrink-0
            Tablet/mobile: full width, 297px tall
        ── */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative shrink-0 w-full lg:w-[490.891px]"
        >
          <div className="relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: "490.891 / 424.5", borderRadius: "7.344px" }}>
            <video
              src="/videos/SafeRide/FinalDemoVideoSafeRideHero.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              style={{ width: "70%", height: "70%", objectFit: "contain" }}
            />
          </div>
        </motion.div>

        {/* ── Text content ── */}
        <motion.div
          variants={textStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col w-full pt-6 pb-6 lg:p-[35px]"
          style={{
            flex: "1 0 0",
            gap: "37px",
            minWidth: "0",
          }}
        >
          {/* Category + Title */}
          <div className="flex flex-col" style={{ gap: "6px" }}>
            <motion.p
              variants={textLine}
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                lineHeight: "1.1",
                color: "var(--text-tertiary)",
              }}
            >
              User Safety &amp; Redesign
            </motion.p>
            <motion.p
              variants={textLine}
              className="font-normal"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
                letterSpacing: "-1.11px",
                lineHeight: "1",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              SafeRide
            </motion.p>
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col" style={{ gap: "22px" }}>
            <motion.p
              variants={textLine}
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
              The project shows how design solutions can be easily executed in
              new ways by eliminating how many tasks a user must complete before
              the desired end goal is achieved. In this study, I used interviews
              and evaluations to better understand how user goals were being met,
              and how to make them easier to attain.
            </motion.p>
            <motion.div variants={textLine}>
              <FigmaButton
                href="/work/saferide"
                external={false}
                accentColor="#6363ff"
                accentColorHover="#4f4fcc"
              >
                See Project
              </FigmaButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
