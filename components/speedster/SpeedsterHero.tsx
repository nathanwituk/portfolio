"use client";

import { motion } from "framer-motion";
import { PROJECT_ASSETS } from "@/lib/assets";

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

const TAGS = ["FIGMA", "UI/UX", "3 WEEKS"];

export default function SpeedsterHero() {

  return (
    <section
      className="w-full flex flex-col lg:flex-row flex-wrap items-center justify-between gap-y-[46px] px-5 md:px-[80px]"
      style={{
        paddingTop: "110px",
        paddingBottom: "110px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      {/* Mockup video — 25% clipped on both left and right, showing center 50% */}
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate="visible"
        className="shrink-0 w-full lg:w-[442px]"
        style={{ height: "510px", position: "relative", overflow: "hidden" }}
      >
        {/* Anchored to center: left:50% + translateX(-50%) aligns the
            element's midpoint with the container's midpoint, then
            width:200% expands equally left and right — cropping 25%
            on each side and showing exactly the center 50%. */}
        <video
          src={PROJECT_ASSETS.speedsterHeroVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200%",
            height: "140%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </motion.div>

      {/* Text */}
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
            Designing with Systems
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
            Speedster
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
            A mobile app designed to show how much time drivers actually save by
            speeding, turning everyday driving behavior into measurable data. By
            visualizing trip data, cumulative time saved, and social comparisons
            with friends, the app transforms an invisible habit into a fun
            gamified experience.
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-[15px]">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="font-semibold uppercase leading-none whitespace-nowrap"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.08em",
                color: "#ffffff",
                backgroundColor: "#ff5d00",
                padding: "5px 22px",
                borderRadius: "29px",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
