"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const CARD_TRANSITION = "transform 500ms ease-out, box-shadow 500ms ease-out, background-color 500ms ease-out";
const ICON_TRANSITION = "transform 500ms ease-out, filter 500ms ease-out";

function QuoteIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="40"
      height="35"
      viewBox="0 0 40 35"
      fill="none"
      aria-hidden="true"
      style={{
        flexShrink: 0,
        transform: active ? "scale(1.08) rotate(6deg)" : "scale(1) rotate(0deg)",
        transition: ICON_TRANSITION,
        filter: active ? "drop-shadow(0 0 6px rgba(255,93,0,0.55))" : "none",
      }}
    >
      <path
        d="M2 19C2 9.6 6.8 3.4 15.2 0.4L17.2 3.8C11.8 5.8 9 9.6 8.6 14.6H14V35H2V19ZM22 19C22 9.6 26.8 3.4 35.2 0.4L37.2 3.8C31.8 5.8 29 9.6 28.6 14.6H34V35H22V19Z"
        fill="#ff5d00"
      />
    </svg>
  );
}

function LightbulbIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="32"
      height="34"
      viewBox="0 0 32 34"
      fill="none"
      aria-hidden="true"
      style={{
        flexShrink: 0,
        transform: active ? "scale(1.08) rotate(6deg)" : "scale(1) rotate(0deg)",
        transition: ICON_TRANSITION,
        filter: active ? "drop-shadow(0 0 8px rgba(255,255,255,0.6))" : "none",
      }}
    >
      <path
        d="M16 1C9.4 1 4 6.4 4 13C4 17.2 6.2 20.8 9.5 23V27H22.5V23C25.8 20.8 28 17.2 28 13C28 6.4 22.6 1 16 1Z"
        fill="white"
      />
      <rect x="9.5" y="28" width="13" height="2.5" rx="1.25" fill="white" />
      <rect x="10.5" y="31.5" width="11" height="2" rx="1" fill="white" />
    </svg>
  );
}

const ROWS = [
  {
    finding: {
      text: "Drivers consistently overestimate the time saved by speeding, often believing it saves significantly more time than it actually does.",
      source: "AAA Foundation for Traffic Safety",
    },
    insight: (
      <span>
        This creates a design opportunity for visual feedback. Showing real-time calculations or
        post-trip breakdowns can show users the reality of how much time they save, further
        reinforcing engagement with the data.
      </span>
    ),
  },
  {
    finding: {
      text: `"Gamification elements such as points, leaderboards, and feedback significantly improve user engagement with behavioral tracking systems."`,
      source: "Deterding et al., Gamification Research",
    },
    insight: (
      <span>
        This supports features like{" "}
        <strong>leaderboards, friend comparisons, and rankings in the app.</strong>{" "}
        Social comparison can transform a passive data tool into an interactive behavioral
        experience.
      </span>
    ),
  },
  {
    finding: {
      text: "Exceeding the speed limit by 5-10 mph typically saves only a few minutes over a 30-minute trip.",
      source: "U.S. Department of Transportation, Federal Highway Administration",
    },
    insight: (
      <span>
        The app&apos;s core value proposition should highlight the surprisingly small time saved.
        The UI should emphasize <strong>cumulative time saved</strong> over perceived time saved.
      </span>
    ),
  },
];

function FindingCard({ row }: { row: typeof ROWS[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  // Active while card is in the middle band: enters at 20% from bottom, exits at top 30%
  const active = useInView(ref, { margin: "-30% 0px -20% 0px" });

  return (
    <div
      ref={ref}
      className="flex-1 flex flex-col gap-[20px] rounded-[20px] relative overflow-hidden"
      style={{
        backgroundColor: "var(--bg-secondary)",
        padding: "21px 29px",
        transform: active ? "translateY(-7px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: active
          ? "0 16px 40px rgba(0,0,0,0.14)"
          : "0 0px 0px rgba(0,0,0,0)",
        transition: CARD_TRANSITION,
      }}
    >
      {/* Sweep highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          backgroundPosition: active ? "0% 0%" : "100% 0%",
          transition: "background-position 600ms ease-out",
          pointerEvents: "none",
          borderRadius: "20px",
        }}
      />

      <div className="flex gap-[22px] items-start relative">
        <QuoteIcon active={active} />
        <p
          className="font-normal leading-[1.4]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.02em",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          {row.finding.text}
        </p>
      </div>
      <p
        className="font-normal leading-[1.4] relative"
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          fontSize: "0.9375rem",
          letterSpacing: "0.02em",
          color: "var(--text-secondary)",
          transition: "color 200ms ease",
        }}
      >
        {row.finding.source}
      </p>
    </div>
  );
}

function InsightCard({ row }: { row: typeof ROWS[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  // Active while card is in the middle band: enters at 20% from bottom, exits at top 30%
  const active = useInView(ref, { margin: "-30% 0px -20% 0px" });

  return (
    <div
      ref={ref}
      className="flex-1 flex gap-[20px] items-start rounded-[20px] relative overflow-hidden"
      style={{
        backgroundColor: active ? "#ff6a14" : "#ff5d00",
        padding: "21px 29px",
        transform: active ? "translateY(-7px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: active
          ? "0 16px 40px rgba(255,93,0,0.35)"
          : "0 0px 0px rgba(255,93,0,0)",
        transition: CARD_TRANSITION,
      }}
    >
      {/* Sweep highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          backgroundPosition: active ? "0% 0%" : "100% 0%",
          transition: "background-position 600ms ease-out",
          pointerEvents: "none",
          borderRadius: "20px",
        }}
      />

      <div className="relative">
        <LightbulbIcon active={active} />
      </div>
      <p
        className="font-normal leading-[1.4] relative"
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          fontSize: "1rem",
          letterSpacing: "0.02em",
          color: "#ffffff",
        }}
      >
        {row.insight}
      </p>
    </div>
  );
}

function Row({ row }: { row: typeof ROWS[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  // Fade-up entrance triggers once at 20% from bottom
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col md:flex-row gap-[16px]"
    >
      <FindingCard row={row} />
      <InsightCard row={row} />
    </motion.div>
  );
}

export default function SpeedsterResearchInsights() {

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "var(--section-pt)",
        paddingBottom: "var(--section-pb)",
        transition: "background-color 200ms ease",
      }}
    >
      <div
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        {/* Column headers */}
        <div className="hidden md:flex gap-[60px] mb-[20px]">
          {["Research Finding", "Design Insight"].map((label) => (
            <div key={label} className="flex-1">
              <p
                className="font-semibold leading-none"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "1rem",
                  letterSpacing: "-0.03em",
                  color: "var(--text-tertiary)",
                  transition: "color 200ms ease",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Rows — each pair has its own scroll trigger */}
        <div className="flex flex-col gap-[16px]">
          {ROWS.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </div>
      </div>
    </section>
  );
}
