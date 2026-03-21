"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

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

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="w-full flex flex-col lg:flex-row flex-wrap items-center gap-x-[75px] gap-y-[46px] px-5 md:px-[80px]"
      style={{
        paddingTop: "110px",
        paddingBottom: "129px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      {/* Mockup */}
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative shrink-0 w-full lg:w-[595px]"
        style={{ height: "522px" }}
      >
        <Image
          src="/images/StudySyncDash/Dashboard Screens/MacBook Pro 16_ - 1.jpg"
          alt="StudySync dashboard mockup"
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 595px"
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
            className="font-semibold uppercase leading-none"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1rem",
              letterSpacing: "-0.03em",
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
            StudySync
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
            A productivity app that is focused on students&apos; success, deadlines and grades.
            Study Sync will make it easy to identify what assignments users need to focus on first
            and how to navigate their academic journey up to graduation.
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
                fontSize: "1rem",
                letterSpacing: "-0.03em",
                color: "#000000",
                backgroundColor: "#b2e639",
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
