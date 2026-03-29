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
  {
    gradient: "linear-gradient(189deg, rgb(254,161,86) 6%, rgb(130,20,41) 59%, rgb(84,1,50) 105%)",
    navActive: "#9747ff",
  },
  {
    gradient: "linear-gradient(180deg, #8ec3cd 0%, #10454f 100%)",
    navActive: "#eb8c67",
  },
  {
    gradient: "linear-gradient(180deg, rgba(113,156,164,0.85) 0%, rgba(28,89,100,0.85) 100%)",
    navActive: "#eb8c67",
    hasOverlay: true,
  },
  {
    gradient: "linear-gradient(180deg, rgba(142,195,205,0.9) 0%, rgba(16,69,79,0.9) 100%)",
    navActive: "#ffffff",
  },
  {
    gradient: "linear-gradient(180deg, #220f3a 0%, #12091c 100%)",
    navActive: "#9747ff",
  },
];

function AppPhone({ gradient, navActive }: typeof APP_SCREENS[0]) {
  return (
    <div
      style={{
        width: "clamp(100px, 10.5vw, 170px)",
        aspectRatio: "9/19",
        borderRadius: "clamp(10px, 1.2vw, 20px)",
        background: gradient,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        padding: "clamp(6px, 0.8vw, 12px)",
      }}
    >
      {/* Top bar: HAVEN title */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "4px" }}>
        <span
          style={{
            fontFamily: FONT,
            fontSize: "clamp(0.5rem, 0.6vw, 0.75rem)",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.9)",
            textTransform: "uppercase",
          }}
        >
          HAVEN
        </span>
      </div>

      {/* Burnout indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "4px",
          marginBottom: "6px",
          opacity: 0.7,
        }}
      >
        <div style={{ width: "30%", height: "2px", backgroundColor: "rgba(255,255,255,0.4)", borderRadius: "1px" }} />
      </div>

      {/* Flame placeholder */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "35%",
            aspectRatio: "1",
            borderRadius: "50% 50% 40% 40%",
            background: "linear-gradient(180deg, rgba(255,200,80,0.9) 0%, rgba(255,100,30,0.9) 100%)",
            boxShadow: "0 0 20px rgba(255,140,0,0.4)",
          }}
        />
      </div>

      {/* Task cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "6px" }}>
        {["To-Do", ""].map((label, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "4px",
              height: "16px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "0 6px",
            }}
          >
            {label && (
              <span style={{ fontFamily: FONT, fontSize: "0.4rem", color: "rgba(255,255,255,0.8)" }}>
                {label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "6px",
          padding: "4px 0",
          backdropFilter: "blur(4px)",
        }}
      >
        {[navActive, "rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)"].map((c, i) => (
          <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

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
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "clamp(48px, 8vw, 100px)",
          paddingBottom: "clamp(48px, 8vw, 100px)",
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
              fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)",
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
          {APP_SCREENS.map((screen, i) => (
            <AppPhone key={i} {...screen} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
