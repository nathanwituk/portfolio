"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const ACCENT = "#9747ff";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HavenHero() {
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
          gap: "clamp(32px, 5vw, 80px)",
        }}
      >
        {/* Demo video — 25% cropped left + right, center 50% visible */}
        <motion.div variants={fadeUp} className="shrink-0">
          {/*
            object-fit: cover on a 16:9 video inside an 8:9 container
            mathematically crops exactly 25% from left and right.
            The browser clips at the media layer — reliable across all browsers.
          */}
          <div
            style={{
              width: "clamp(360px, 50vw, 560px)",
              aspectRatio: "8 / 9",
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                display: "block",
              }}
            >
              <source src="/videos/Haven/HavenDemoVideo%20(1).mov" type="video/mp4" />
              <source src="/videos/Haven/HavenDemoVideo%20(1).mov" type="video/quicktime" />
            </video>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          variants={stagger}
          className="flex flex-col"
          style={{ gap: "clamp(16px, 2.5vw, 28px)", flex: "1 1 0" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{
              fontFamily: FONT,
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
              color: "#a4a4a4",
            }}
          >
            Health and Wellness · Case Study
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-normal leading-none"
            style={{
              fontFamily: FONT,
              fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)",
              letterSpacing: "-0.05em",
              color: "#12091c",
            }}
          >
            Haven
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              lineHeight: "1.4",
              color: "#12091c",
            }}
          >
            This project focuses on designing a digital wellness companion that
            helps college students recognize and manage early signs of burnout.
            The goal is to create a simple, supportive experience that encourages
            intentional breaks, tracks emotional patterns, and helps students
            maintain balance between productivity and mental health.
          </motion.p>

          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center font-semibold uppercase"
              style={{
                fontFamily: FONT,
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                color: ACCENT,
                border: `1.5px solid ${ACCENT}`,
                borderRadius: "20px",
                padding: "8px 20px",
              }}
            >
              Wellness App
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
