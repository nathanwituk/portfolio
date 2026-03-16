"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import FigmaButton from "@/components/ui/FigmaButton";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

interface PhoneScreen {
  src: string;
  alt: string;
}

interface Props {
  sectionLabel?: string;
  title?: string;
  figmaHref?: string;
  screens: PhoneScreen[];
}

export default function FigmaMakeSection({
  sectionLabel = "AI Research",
  title = "Figma Make Design",
  figmaHref = "#",
  screens,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full"
      style={{
        paddingTop: "60px",
        paddingBottom: "60px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto"
        style={{ paddingLeft: "clamp(20px, 6.25vw, 80px)", paddingRight: "clamp(20px, 6.25vw, 80px)" }}
      >
        {/* Header row */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between mb-[48px]"
        >
          <div className="flex flex-col gap-[6px]">
            <SectionLabel>{sectionLabel}</SectionLabel>
            <h2
              className="font-normal leading-none tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1.875rem",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              {title}
            </h2>
          </div>

          <FigmaButton href={figmaHref} />
        </motion.div>

        {/* Phone screens row */}
        <motion.div
          variants={fadeUp}
          className="flex gap-[20px] items-end justify-between flex-wrap md:flex-nowrap"
        >
          {screens.map((s, i) => (
            <div
              key={i}
              className="relative shrink-0 rounded-[12px] overflow-hidden flex-1"
              style={{
                minWidth: "160px",
                height: "340px",
                boxShadow: "8px 10px 24px 0px rgba(0,0,0,0.18)",
              }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                className="object-contain"
                sizes="220px"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
