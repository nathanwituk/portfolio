"use client";

import { motion } from "framer-motion";

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
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE, delay: 0.15 } },
};

export default function SafeRideHero() {
  return (
    <section
      className="w-full flex flex-col lg:flex-row items-center justify-between gap-[48px]"
      style={{
        paddingTop: "110px",
        paddingBottom: "80px",
        paddingLeft: "clamp(20px, 6.25vw, 80px)",
        paddingRight: "clamp(20px, 6.25vw, 80px)",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      {/* Left: title + description card */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-[40px] shrink-0"
        style={{ maxWidth: "560px" }}
      >
        {/* Label + title */}
        <motion.div variants={fadeUp} className="flex flex-col gap-[10px]">
          <p
            className="font-normal uppercase"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1rem",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            IXD414 — Designing with Systems
          </p>
          <h1
            className="font-semibold leading-[1.05]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "clamp(2.5rem, 6.5vw, 4rem)",
              letterSpacing: "-0.05em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            SafeRide Redesign
          </h1>
        </motion.div>

        {/* Description card */}
        <motion.div
          variants={fadeUp}
          className="w-full flex flex-col gap-[44px] rounded-[20px]"
          style={{
            backgroundColor: "var(--bg-secondary)",
            padding: "36px 30px",
            transition: "background-color 200ms ease",
          }}
        >
          <div className="flex flex-col gap-[20px]">
            <p
              className="font-normal leading-[1.21]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.05em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              This project explores how digital tools can help people orient themselves
              whether in space or in time through the language of calendars, clocks, or
              compasses.
            </p>
            <div
              style={{
                height: "1px",
                backgroundColor: "var(--nav-border)",
                transition: "background-color 200ms ease",
              }}
            />
          </div>
          <div
            className="font-normal italic leading-[1.6]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1rem",
              letterSpacing: "-0.05em",
              color: "var(--text-tertiary)",
              transition: "color 200ms ease",
            }}
          >
            <p>Branding</p>
            <p>Website</p>
            <p>Interaction Design</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right: demo video */}
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate="visible"
        className="shrink-0 flex items-center justify-center"
        style={{ maxWidth: "300px", width: "100%" }}
      >
        <video
          src="/videos/SafeRide/SafeRideDemoVid.mov"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "28px",
            boxShadow: "0 12px 48px rgba(0,0,0,0.14)",
            display: "block",
          }}
        />
      </motion.div>
    </section>
  );
}
