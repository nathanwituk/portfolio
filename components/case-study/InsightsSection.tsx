"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InsightCard from "@/components/ui/InsightCard";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export interface InsightRow {
  positive: string;
  negative: string;
}

interface Props {
  rows: InsightRow[];
}

export default function InsightsSection({ rows }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full px-5 md:px-[80px]"
      style={{
        paddingTop: "88px",
        paddingBottom: "65px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-[8px]">

        {/* Column headers */}
        <div
          ref={ref}
          className="flex gap-[94px] items-center"
        >
          <div className="flex items-center gap-[10px] flex-1">
            <img src="/images/fearless-inventory/Lightbulb-Icon.svg" alt="" aria-hidden="true" width={32} height={34} className="shrink-0" />
            <p
              className="font-semibold leading-none tracking-[-0.03em] text-[1rem]"
              style={{ fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif", color: "var(--text-tertiary)", transition: "color 200ms ease" }}
            >
              Strong Design Insight
            </p>
          </div>
          <div className="flex items-center gap-[10px] flex-1">
            <img src="/images/fearless-inventory/InformationInsight-Icon-Olive.svg" alt="" aria-hidden="true" width={30} height={37} className="shrink-0" />
            <p
              className="font-semibold leading-none tracking-[-0.03em] text-[1rem]"
              style={{ fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif", color: "var(--text-tertiary)", transition: "color 200ms ease" }}
            >
              Areas for Improvement
            </p>
          </div>
        </div>

        {/* Card rows */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-[8px]"
        >
          {rows.map((row, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col md:flex-row gap-[30px]"
            >
              <InsightCard variant="light">{row.positive}</InsightCard>
              <InsightCard variant="dark">{row.negative}</InsightCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
