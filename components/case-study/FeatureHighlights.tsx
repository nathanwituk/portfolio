"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export interface Feature {
  number: number;
  title: string;
  description: string;
}

export interface FeatureHighlightsProps {
  features: Feature[];
  /** Three portrait phone screenshot images (top to bottom order) */
  screenshots: { src: string; alt: string }[];
}

function NumberBadge({ n }: { n: number }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-full bg-[#4a4a22] text-white font-bold"
      style={{
        width: "35px",
        height: "35px",
        fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
        fontSize: "0.875rem",
      }}
    >
      {n}
    </div>
  );
}

export default function FeatureHighlights({ features, screenshots }: FeatureHighlightsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section className="w-full bg-[#6f7142]" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-[80px] pt-[100px] pb-[110px]">

        {/* Feature columns — each: headline → body → image */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-[40px]"
        >
          {features.map((f, i) => (
            <motion.div key={f.number} variants={fadeUp} className="flex flex-col items-center gap-[24px]">
              {/* Headline + body grouped — 30% tighter than before (12px → 8px) */}
              <div className="flex flex-col items-center gap-[8px]">
                {/* Number badge */}
                <NumberBadge n={f.number} />
                {/* Title */}
                <p
                  className="font-normal text-white text-center leading-none"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "2.3125rem",
                    letterSpacing: "-1.11px",
                  }}
                >
                  {f.title}
                </p>
                {/* Description */}
                <p
                  className="font-normal text-white/80 leading-[1.4] text-center"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "14px",
                    letterSpacing: "0.28px",
                  }}
                >
                  {f.description}
                </p>
              </div>

              {/* Screenshot — below headline and body */}
              {screenshots[i] && (
                <div
                  className="w-full mx-auto"
                  style={{
                    maxWidth: "269px",
                    filter: "drop-shadow(8px 10px 24px rgba(0,0,0,0.18))",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshots[i].src}
                    alt={screenshots[i].alt}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "16px",
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
