"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export interface TesterFeedback {
  name: string;
  feedback: string[];
}

interface Props {
  sectionLabel?: string;
  testers: TesterFeedback[];
}

function TesterCard({ tester }: { tester: TesterFeedback }) {
  return (
    <div className="flex flex-col gap-0 min-w-0 flex-1">
      {/* Name label */}
      <p
        className="font-normal text-[#6f7142] leading-none tracking-[-0.03em]"
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          fontSize: "2.3125rem",
          paddingBottom: "12px",
        }}
      >
        {tester.name}
      </p>

      {/* Feedback card */}
      <div
        className="rounded-br-[20px] rounded-tr-[20px] flex flex-col gap-[8px] h-full"
        style={{
          padding: "21px 24px",
          backgroundColor: "var(--bg-secondary)",
          transition: "background-color 200ms ease",
        }}
      >
        <ul
          className="flex flex-col gap-[8px] font-normal leading-[1.4]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "0.875rem",
            letterSpacing: "0.02em",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          {tester.feedback.map((item, i) => (
            <li key={i} className="flex gap-[8px] items-start">
              <span className="shrink-0 mt-0.5">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function UserTestingSection({ sectionLabel = "User Testing", testers }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full px-5 md:px-[72px]"
      style={{
        paddingTop: "40px",
        paddingBottom: "88px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-[24px]">
        <SectionLabel>{sectionLabel}</SectionLabel>

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-[12px] items-stretch w-full"
        >
          {testers.map((tester) => (
            <motion.div key={tester.name} variants={fadeUp} className="flex flex-1 min-w-0">
              <TesterCard tester={tester} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
