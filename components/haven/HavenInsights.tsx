"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const ACCENT = "#9747ff";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const QUOTES: { text: string; bold: string }[] = [
  {
    text: "When you experience burnout, your self-control wanes...",
    bold: "compromises your decision-making and self-control",
  },
  {
    text: "Burnout tends to come from trying to do too much. So the first step is to figure out what you can live with removing from your plate.",
    bold: "trying to do too much",
  },
  {
    text: "What I often find with college students when they're burnt out with school is that something else is going on that compounds that feeling.",
    bold: "compounds that feeling",
  },
  {
    text: '"Pushing through" will only make things much worse. The longer you burn, the harder it will be to recuperate.',
    bold: "The longer you burn, the harder it will be to recuperate",
  },
  {
    text: "While in college, students often experience something entirely different than their past experiences in school.",
    bold: "entirely different than their past experiences",
  },
  {
    text: "Disconnecting is the most important burnout strategy on this list, because if you can't find time to remove yourself electronically from your work, you've never really left work.",
    bold: "Disconnecting is the most important burnout strategy",
  },
  {
    text: "You don't push through it. That's the trap of burnout mentality — you retreat and rest.",
    bold: "you retreat and rest",
  },
  {
    text: "This dip in satisfaction makes work very difficult, because no matter what you're putting in, you don't feel like you're getting much out of it.",
    bold: "you don't feel like you're getting much out of it",
  },
];

function InsightCard({ text, bold, index }: { text: string; bold: string; index: number }) {
  const highlighted = text.includes(bold)
    ? text.split(bold)
    : [text, ""];

  return (
    <motion.div
      variants={fadeUp}
      style={{
        backgroundColor: ACCENT,
        borderRadius: "7px",
        padding: "clamp(16px, 1.8vw, 22px)",
        lineHeight: "1.4",
      }}
    >
      <p
        style={{
          fontFamily: FONT,
          fontSize: "0.875rem",
          color: "#ffffff",
          letterSpacing: "0.02em",
        }}
      >
        {highlighted[0]}
        {highlighted[1] !== undefined && (
          <>
            <strong>{bold}</strong>
            {highlighted[1]}
          </>
        )}
      </p>
    </motion.div>
  );
}

export default function HavenInsights() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: "#12091c" }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "calc(var(--section-pt) + 25px)",
          paddingBottom: "calc(var(--section-pb) + 25px)",
          gap: "clamp(32px, 5vw, 64px)",
          alignItems: "flex-start",
        }}
      >
        {/* Left: heading + intro */}
        <motion.div
          variants={stagger}
          className="flex flex-col shrink-0"
          style={{
            gap: "clamp(16px, 2.5vw, 28px)",
            width: "clamp(200px, 30%, 360px)",
          }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{
              fontFamily: FONT,
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Research Insights
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-normal leading-[1.05]"
            style={{
              fontFamily: FONT,
              fontSize: "1.875rem",
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Insights
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              lineHeight: "1.4",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            From our research we pulled quotes of specific ideas or topics that
            our product should address and solve for.
          </motion.p>
        </motion.div>

        {/* Right: 2-column quote grid */}
        <div
          className="flex-1 grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "clamp(10px, 1.2vw, 16px)" }}
        >
          {QUOTES.map((q, i) => (
            <InsightCard key={i} index={i} text={q.text} bold={q.bold} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
