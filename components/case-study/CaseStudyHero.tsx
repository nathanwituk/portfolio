"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import TagPill from "@/components/ui/TagPill";

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

export interface CaseStudyHeroProps {
  label: string;
  title: string;
  /** Body text — supports a boldText segment */
  body: string;
  boldText?: string;
  /** Tag pills */
  tags: string[];
  /** Left-side mockup image */
  mockupSrc: string;
  mockupAlt: string;
}

export default function CaseStudyHero({
  label,
  title,
  body,
  boldText,
  tags,
  mockupSrc,
  mockupAlt,
}: CaseStudyHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Split body around boldText for inline bold rendering
  const renderBody = () => {
    if (!boldText || !body.includes(boldText)) {
      return <span className="leading-[1.4]">{body}</span>;
    }
    const [before, after] = body.split(boldText);
    return (
      <>
        <span className="leading-[1.4]">{before}</span>
        <strong className="font-bold leading-[1.4]">{boldText}</strong>
        <span className="leading-[1.4]">{after}</span>
      </>
    );
  };

  return (
    <section
      ref={ref}
      className="w-full flex flex-col lg:flex-row flex-wrap items-center justify-between gap-y-[46px] px-5 md:px-[80px]"
      style={{
        paddingTop: "110px",
        paddingBottom: "129px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
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
          src={mockupSrc}
          alt={mockupAlt}
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
          <SectionLabel>{label}</SectionLabel>
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
            {title}
          </p>
        </motion.div>

        {/* Body */}
        <motion.div variants={fadeUp}>
          <p
            className="font-normal leading-[0]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            {renderBody()}
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-[15px]">
          {tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
