"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const slideIn = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 } },
};

interface Props {
  sectionLabel?: string;
  title: string;
  body: string;
  figmaHref?: string;
  embedSrc?: string;
  bg?: string;
  accentColor?: string;
  accentColorHover?: string;
}

export default function WireframePrototypeBlock({
  sectionLabel = "Creation and organization",
  title,
  body,
  figmaHref = "#",
  embedSrc,
  accentColor,
  accentColorHover,
  bg = "var(--bg-primary)",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{ backgroundColor: bg, paddingTop: "80px", paddingBottom: "80px", transition: "background-color 200ms ease, color 200ms ease" }}
    >
      <div
        ref={ref}
        className="flex flex-col md:flex-row items-center gap-[48px] max-w-[1280px] mx-auto"
        style={{ paddingLeft: "clamp(20px, 6.25vw, 80px)", paddingRight: "clamp(20px, 6.25vw, 80px)" }}
      >
        {/* Left: text column */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-[20px] shrink-0"
          style={{ width: "clamp(280px, 35vw, 388px)" }}
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-[6px]">
            <SectionLabel variant="muted">{sectionLabel}</SectionLabel>
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
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-normal leading-[1.4]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            {body}
          </motion.p>

          <motion.div variants={fadeUp}>
            <FigmaButton href={figmaHref} accentColor={accentColor} accentColorHover={accentColorHover} />
          </motion.div>
        </motion.div>

        {/* Right: embed or placeholder */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 rounded-[16px] overflow-hidden flex items-center justify-center"
          style={{
            backgroundColor: "var(--bg-secondary)",
            minHeight: "300px",
            width: "100%",
          }}
        >
          {embedSrc ? (
            <iframe
              src={embedSrc}
              style={{ border: "1px solid rgba(0,0,0,0.1)", width: "100%", height: "450px", display: "block" }}
              allowFullScreen
            />
          ) : (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
              <path
                d="M29 43L43 29M23.5 38.5L18 44C14.134 47.866 14.134 54.134 18 58C21.866 61.866 28.134 61.866 32 58L38 52M34 19.5L40 14C43.866 10.134 50.134 10.134 54 14C57.866 17.866 57.866 24.134 54 28L48 34"
                stroke="#6366f1"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </motion.div>
      </div>
    </section>
  );
}
