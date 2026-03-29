"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const TAGS = ["KU Student", "Forgetful", "Finance Major", "Panera Employee"];

export default function UserPersona() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{
        paddingTop: "var(--section-pt)",
        paddingBottom: "var(--section-pb)",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        {/* Card */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row gap-[48px] items-start rounded-[20px]"
          style={{
            backgroundColor: "var(--bg-secondary)",
            padding: "clamp(28px, 4vw, 54px)",
            transition: "background-color 200ms ease",
          }}
        >
          {/* Left: text content */}
          <div className="flex flex-col gap-[32px] flex-1 min-w-0">

            {/* Label + Name */}
            <div className="flex flex-col gap-[4px]">
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
                User Persona
              </p>
              <p
                className="font-normal leading-[1.1]"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  transition: "color 200ms ease",
                }}
              >
                Jordan Smith
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-[12px]">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-semibold leading-none whitespace-nowrap"
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
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-[16px]">
              <p
                className="font-normal leading-[1.5]"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "0.02em",
                  color: "var(--text-primary)",
                  transition: "color 200ms ease",
                }}
              >
                Jordan needs an app that is able to organize all his classes and projects in one
                spot. He has ADHD and trouble forgetting assignments and their due dates. He has to
                stay above a 3.0 GPA to maintain his scholarship.
              </p>
              <p
                className="font-normal leading-[1.5]"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "0.02em",
                  color: "var(--text-primary)",
                  transition: "color 200ms ease",
                }}
              >
                Because some professors use different applications, and because Canvas doesn&apos;t
                have a central dashboard, Jordan wants a place where he can input data and truly
                examine his academic success.
              </p>
            </div>
          </div>

          {/* Right: portrait */}
          <div
            className="relative shrink-0 rounded-[16px] overflow-hidden self-stretch md:self-auto"
            style={{ width: "clamp(180px, 22vw, 262px)", minHeight: "320px" }}
          >
            <Image
              src="/images/StudySyncDash/User Persona/UserImage.png"
              alt="Jordan Smith — user persona"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 262px"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
