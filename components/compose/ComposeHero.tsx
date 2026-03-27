"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

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

const TAGS = ["FIGMA", "UI UX", "3 WEEKS"];

export default function ComposeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{
        paddingTop: "110px",
        paddingBottom: "129px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row flex-wrap items-center justify-between gap-y-[46px]"
        style={{
          paddingLeft: "clamp(14px, 4.375vw, 56px)",
          paddingRight: "clamp(14px, 4.375vw, 56px)",
        }}
      >
      {/* Mockup */}
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative shrink-0 w-full lg:w-[486px]"
        style={{ height: "452px" }}
      >
        <Image
          src="/images/Compose - IXD 414 Draft/HeroSection/Mock-upImage.png"
          alt="Compose app mockup on a laptop"
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 486px"
          priority
        />
      </motion.div>

      {/* Text */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col gap-[37px] flex-1 min-w-0"
      >
        {/* Label + Title */}
        <motion.div variants={fadeUp} className="flex flex-col gap-[6px]">
          <p
            className="font-semibold uppercase leading-[1.1]"
            style={{
              fontFamily: FONT,
              fontSize: "1rem",
              letterSpacing: "-0.48px",
              color: "var(--text-tertiary)",
              transition: "color 200ms ease",
            }}
          >
            DESIGNING WITH SYSTEMS
          </p>
          <p
            className="font-normal leading-[1.1]"
            style={{
              fontFamily: FONT,
              fontSize: "clamp(3.5rem, 8.2vw, 6.5625rem)",
              letterSpacing: "-0.05em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            Compose
          </p>
        </motion.div>

        {/* Body */}
        <motion.div variants={fadeUp}>
          <p
            className="font-normal leading-[1.4]"
            style={{
              fontFamily: FONT,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            A tool designed to simplify how performance programs are created,
            organized, and edited. It focuses on a niche problem, having to
            structure sections of performances into a system that feels
            intuitive instead of overwhelming.
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-[15px]">
          {TAGS.map((tag) => (
            <div
              key={tag}
              className="flex items-center justify-center shrink-0 rounded-[29px]"
              style={{
                backgroundColor: "#4438ca",
                paddingLeft: "22px",
                paddingRight: "22px",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <p
                className="font-semibold uppercase whitespace-nowrap text-white leading-[1.1]"
                style={{
                  fontFamily: FONT,
                  fontSize: "1rem",
                  letterSpacing: "-0.48px",
                }}
              >
                {tag}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
