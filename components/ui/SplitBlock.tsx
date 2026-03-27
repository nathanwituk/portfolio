"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

export interface SplitBlockCta {
  label: string;
  href: string;
}

export interface SplitBlockProps {
  /** Small label above the title */
  label?: string;
  /** Section title */
  title: string;
  /** Body description */
  body: React.ReactNode;
  /** Optional CTA button */
  cta?: SplitBlockCta;
  /** Media slot — image, video, embed, or placeholder */
  media: React.ReactNode;
  /** Which side the media lives on. Default: "right" */
  mediaPosition?: "left" | "right";
  /** Section background color. Default: white */
  bg?: string;
  /** Horizontal section padding override (Tailwind class string). Default: "px-[80px]" */
  paddingX?: string;
  /** Vertical section padding override. Default: "pt-[88px] pb-[20px]" */
  paddingY?: string;
  /** Align items. Default: "end" (items-end) */
  align?: "start" | "center" | "end";
}

export default function SplitBlock({
  label,
  title,
  body,
  cta,
  media,
  mediaPosition = "right",
  bg = "var(--bg-primary)",
  paddingX = "px-[80px]",
  paddingY = "pt-[60px] pb-[60px]",
  align = "center",
}: SplitBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  const textCol = (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col gap-[40px] py-[21px] shrink-0 w-full md:w-[388px]"
    >
      {label && (
        <motion.div variants={fadeUp}>
          <SectionLabel variant="muted">{label}</SectionLabel>
        </motion.div>
      )}
      <motion.div variants={fadeUp} className="flex flex-col gap-[22px]">
        <p
          className="font-normal leading-none tracking-[-0.03em]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1.875rem",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          {title}
        </p>
        <div
          className="font-normal leading-[1.4] tracking-[0.02em]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "0.875rem",
          }}
        >
          {body}
        </div>
      </motion.div>
      {cta && (
        <motion.div variants={fadeUp}>
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[5px] bg-[#6f7142] text-white rounded-[10px] font-normal leading-none tracking-[-0.05em]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1.25rem",
              padding: "10px 18px",
            }}
          >
            {/* Eye / view icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none" />
            </svg>
            {cta.label}
          </a>
        </motion.div>
      )}
    </motion.div>
  );

  const mediaCol = (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="shrink-0 w-full md:w-[588px]"
    >
      {media}
    </motion.div>
  );

  const alignClass =
    align === "start" ? "items-start" : align === "end" ? "items-end" : "items-center";

  return (
    <section
      ref={ref}
      className={`w-full ${paddingX} ${paddingY}`}
      style={{ backgroundColor: bg, transition: "background-color 200ms ease, color 200ms ease" }}
    >
      <div className={`flex flex-col md:flex-row ${alignClass} gap-[48px] w-full max-w-[1280px] mx-auto`}>
        {mediaPosition === "left" ? (
          <>
            {mediaCol}
            {textCol}
          </>
        ) : (
          <>
            {textCol}
            {mediaCol}
          </>
        )}
      </div>
    </section>
  );
}
