"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TEXT =
  "**While the concept explores speeding behavior in a playful way, the project is intended as a design study on how gamification and data visualization can make hidden behavioral patterns more visible to users.**";

const WORDS = TEXT.split(" ");

function AnimatedWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each word occupies a staggered window of the scroll range [0.05, 0.75]
  const REVEAL_START = 0.05;
  const REVEAL_END = 0.75;
  const range = REVEAL_END - REVEAL_START;
  const wordStart = REVEAL_START + (index / total) * range;
  const wordEnd = wordStart + range / total + 0.08; // slight overlap for smoothness

  const color = useTransform(
    scrollYProgress,
    [wordStart, Math.min(wordEnd, 0.9)],
    ["#ff5d00", "#ffffff"]
  );

  return (
    <motion.span style={{ color }} className="inline">
      {word}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
}

export default function SpeedsterStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="w-full"
      style={{
        backgroundColor: "#ff5d00",
        paddingTop: "55px",
        paddingBottom: "55px",
      }}
      aria-label="Project statement"
    >
      <div
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        <p
          className="font-semibold leading-[1.06]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "clamp(2.25rem, 7vw, 6.25rem)",
            letterSpacing: "-0.05em",
            color: "#ff5d00", // fallback — motion spans override
          }}
          aria-label={TEXT.replace(/\*\*/g, "")}
        >
          {WORDS.map((word, i) => (
            <AnimatedWord
              key={i}
              word={word}
              index={i}
              total={WORDS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
