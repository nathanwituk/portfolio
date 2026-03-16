"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const IPHONE_IMG = "/images/projects/hero-mockup copy.png";

const imageVariant = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 } },
};

// Olive-green tag pill data — Figma: bg #6f7142, rounded-[29px], px-22 py-5
const TAGS = ["research", "user testing", "figma"] as const;

/* ── Animation variants ──────────────────────────────────────────────────── */
const textStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};


/* ── Component ───────────────────────────────────────────────────────────── */
export default function FearlessInventorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="fearless-inventory"
      className="w-full"
      style={{ backgroundColor: "var(--bg-primary)", transition: "background-color 200ms ease, color 200ms ease" }}
      // Figma: pt-[10px] pb-[29px] px-[80px], items-center, justify-between
      // Height determined by content (iPhone is 522px + padding ≈ 561px)
    >
      <div
        ref={ref}
        className="flex flex-col lg:flex-row items-center justify-between w-full mx-auto px-5 md:px-[80px] py-12 lg:py-[40px]"
        style={{
          maxWidth: "1280px",
          gap: "46px",
        }}
      >
        {/* ── Left: text column ── */}
        <motion.div
          variants={textStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col"
          style={{ flex: "1 0 0", gap: "37px", minWidth: "0" }}
        >
          {/* Category + Title */}
          <motion.div variants={fadeUp} className="flex flex-col" style={{ gap: "6px" }}>
            <p
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.48px",
                lineHeight: "1.1",
                color: "var(--text-tertiary)",
              }}
            >
              research, user testing and implementation
            </p>
            <p
              className="font-normal"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "2.3125rem",
                letterSpacing: "-1.11px",
                lineHeight: "1",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Inventory System
            </p>
          </motion.div>

          {/* Description — 14px, positive tracking +0.28px, leading 1.4
              "should have" is bold within the paragraph */}
          <motion.div variants={fadeUp}>
            <p
              className="font-normal"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.28px",
                lineHeight: "1.4",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              This project focuses on designing a digital inventory tool that
              helps warehouse workers quickly compare what the system says they{" "}
              <strong className="font-bold">should have</strong> with what&apos;s
              actually sitting on the shelf. The goal is to make the inventory
              process faster, reduce mistakes, and create a clear workflow for
              recording counts and updating product inventory for the coffee
              warehouse.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.a
            variants={fadeUp}
            href="/work/fearless-inventory"
            className="flex items-center font-medium group w-fit"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1rem",
              letterSpacing: "-0.48px",
              lineHeight: "1.1",
              color: "#ff5d00",
              gap: "3px",
            }}
          >
            <span>See Project</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </motion.a>

          {/* Olive-green tag pills — Figma: bg #6f7142, rounded-[29px], px-22 py-5 */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap"
            style={{ gap: "15px" }}
          >
            {TAGS.map((tag) => (
              <div
                key={tag}
                className="flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "#6f7142",
                  borderRadius: "29px",
                  paddingLeft: "22px",
                  paddingRight: "22px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                <p
                  className="font-semibold uppercase text-white whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "-0.48px",
                    lineHeight: "1.1",
                  }}
                >
                  {tag}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: mockup image ── */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="shrink-0 hidden md:block"
        >
          <div className="relative w-[300px] h-[262px] md:w-[420px] md:h-[368px] lg:w-[595px] lg:h-[522px]">
            <Image
              src={IPHONE_IMG}
              alt="Fearless Inventory app mockup"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 420px, 595px"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
