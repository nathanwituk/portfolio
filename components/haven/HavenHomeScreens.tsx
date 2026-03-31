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
  visible: { transition: { staggerChildren: 0.08 } },
};

const APP_SCREENS = [
  "/images/Haven/Homepage_Designs/HavenAppDesign1.jpg",
  "/images/Haven/Homepage_Designs/HavenAppDesign2.jpg",
  "/images/Haven/Homepage_Designs/HavenAppDesign3.jpg",
  "/images/Haven/Homepage_Designs/HavenAppDesign4.jpg",
  "/images/Haven/Homepage_Designs/HavenAppDesign5.jpg",
];

export default function HavenHomeScreens() {
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
        {/* Left: text */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(16px, 2.5vw, 28px)", flex: "0 0 auto", maxWidth: "400px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{ fontFamily: FONT, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "rgba(0,0,0,0.35)" }}
          >
            Home Screens
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.05]"
            style={{
              fontFamily: FONT,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              letterSpacing: "-0.05em",
              color: DARK,
            }}
          >
            Home Screens
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "0.9375rem",
              letterSpacing: "0.02em",
              lineHeight: 1.55,
              color: "rgba(0,0,0,0.65)",
            }}
          >
            After wire-framing our ideas, we began ideating on the overall style and feel of our app.
            We wanted a way to resemble your &ldquo;burn out&rdquo; getting &ldquo;put out&rdquo; like a fire, but we weren&apos;t
            sure what colors and styles accented that well.
          </motion.p>
        </motion.div>

        {/* Right: app mockups */}
        <motion.div
          variants={fadeUp}
          className="flex flex-1 items-center justify-center flex-wrap"
          style={{ gap: "clamp(8px, 1.2vw, 16px)" }}
        >
          {APP_SCREENS.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Haven home screen design ${i + 1}`}
              draggable={false}
              style={{
                width: "clamp(100px, 10.5vw, 170px)",
                height: "auto",
                display: "block",
                borderRadius: "clamp(10px, 1.2vw, 20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
