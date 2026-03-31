"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  MotionValue,
} from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";
const ACCENT = "#9747ff";

const RESEARCH_CARDS = [
  "Encouraging mindfulness practices, such as meditation, deep breathing exercises, and yoga.",
  "Ask for system change: individual coping helps, but organizational and institutional reform are essential for sustained change.",
  "\"Teaching students effective time management skills can help them balance academic, clinical, and personal responsibilities.\"",
  "Encouraging educators to prioritize self\u2011care and participate in wellness programs.",
  "\"If you feel like you're being tasked with too much, have a conversation with your manager about working on high\u2011priority items exclusively.\"",
  "Reconnect with purpose: when you remember why you started, you fuel resilience.",
  "\"Offering academic support services, such as tutoring, study groups, and skills workshops.\"",
  "Delegate or say no: learning to decline or ask for help is a core part of recovery.",
  "\"Place a hold in your calendar for lunch or breaks. Take your vacation days.\"",
  "\"Establishing peer mentoring programs can provide students with guidance and support from upperclassmen.\"",
  "Providing creative outlets and ensuring your strengths are magnified helps prevent burnout.",
  "Engage in reflection: check in with yourself regularly. Are you aligned? Are you rested?",
  "Promoting regular physical activity, balanced nutrition, and adequate sleep to enhance resilience to stress.",
  "Institutions should distribute workloads more equitably and limit excessive administrative tasks.",
  "Cultivate rest as an active practice, not a passive by\u2011product of exhaustion.",
  "Build creativity into your life \u2014 not just as a hobby, but as a way to express, recharge, and reset.",
  "Active recovery practices are needed to support our well\u2011being.",
  "Scheduling relaxing activities makes certain they happen and gives you something to look forward to.",
  "You need to intentionally push everything to the side and just exist.",
  "Sleep. Meditate. Walk outside. Listen to music. Just enjoy the moment of peace you have.",
];

const SOLUTION_CARDS = [
  "Encouraging mindfulness practices, such as meditation, deep breathing exercises, and yoga.",
  "\"If you feel like you're being tasked with too much, have a conversation with your manager about working on high\u2011priority items exclusively.\"",
  "It sounds simple but all you need to do is sleep. Meditate. Walk outside. Listen to music.",
  "Engage in reflection: check in with yourself regularly. Are you aligned? Are you rested? Are you still motivated?",
];

// ── Deterministic pseudo-random (stable across SSR/client — no Math.random) ─
function rng(i: number, slot: number): number {
  const v = Math.sin(i * 127.1 + slot * 311.7) * 43758.5453;
  return Math.abs(v) - Math.floor(Math.abs(v)); // 0..1
}

// ── Grid geometry (4 cols × 5 rows, cards centered in viewport) ─────────────
//   cardW=200  colGap=10  →  rowSpan = 210
//   cardH=80   rowGap=8   →  colSpan = 88
//
//   gridW = 4*200 + 3*10 = 830   half = 415
//   gridH = 5*80  + 4*8  = 432   half = 216
//
//   card center x = -415 + 100 + col*210 = -315 + col*210
//   card center y = -216 +  40 + row*88  = -176 + row*88
const CARD_W = 200;
const CARD_H = 80;

const CARD_DATA = RESEARCH_CARDS.map((_, i) => {
  const col = i % 4;
  const row = Math.floor(i / 4);

  // Phase 1 — organised grid
  const gridX = -315 + col * 210;
  const gridY = -176 + row * 88;

  // Phase 2 — scattered (tornado)
  const angle    = (i / RESEARCH_CARDS.length) * Math.PI * 2;
  const radius   = 260 + rng(i, 0) * 200;           // 260–460 px
  const scatterX = Math.cos(angle) * radius;
  const scatterY = Math.sin(angle) * radius * 0.52; // flatten to ellipse
  const scatterR = (rng(i, 2) - 0.5) * 150;        // ±75°

  // Phase 3 — central stack (small random offsets + rotations so cards peek)
  const stackX = (rng(i, 3) - 0.5) * 36;           // ±18 px
  const stackY = (rng(i, 4) - 0.5) * 36;           // ±18 px
  const stackR = (rng(i, 5) - 0.5) * 28;           // ±14°

  return { gridX, gridY, scatterX, scatterY, scatterR, stackX, stackY, stackR, zIndex: i + 1 };
});

// ── Per-card component ───────────────────────────────────────────────────────
function ScatterCard({
  text,
  progress,
  data,
}: {
  text: string;
  progress: MotionValue<number>;
  data: (typeof CARD_DATA)[number];
}) {
  const { gridX, gridY, scatterX, scatterY, scatterR, stackX, stackY, stackR, zIndex } = data;

  // grid  ──0.08──► scatter  ──0.50──► stack
  const x      = useTransform(progress, [0.08, 0.42, 0.64], [gridX,  scatterX, stackX]);
  const y      = useTransform(progress, [0.08, 0.42, 0.64], [gridY,  scatterY, stackY]);
  const rotate = useTransform(progress, [0.08, 0.42, 0.64], [0,      scatterR, stackR]);
  const scale  = useTransform(progress, [0.08, 0.64],        [1,      1]);
  const opacity = useTransform(progress, [0, 0.06, 0.64, 0.72], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -CARD_W / 2,
        marginTop:  -CARD_H / 2,
        width: CARD_W,
        x, y, rotate, scale, opacity,
        zIndex,
      }}
    >
      <div
        style={{
          backgroundColor: DARK,
          borderRadius: "12px",
          padding: "12px 14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <p
          style={{
            fontFamily: FONT,
            fontSize: "0.75rem",
            fontWeight: 400,
            letterSpacing: "0.02em",
            lineHeight: 1.4,
            color: "#ffffff",
            margin: 0,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical" as const,
          }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}

// ── "Solutions from Research" label (fades out as tornado begins) ────────────
function ResearchLabel({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.06, 0.22, 0.36], [0, 1, 1, 0]);
  const y       = useTransform(progress, [0, 0.06], [10, 0]);
  return (
    <motion.div
      style={{
        position: "absolute",
        top: "clamp(28px, 6vh, 60px)",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        y,
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      <div style={{ backgroundColor: DARK, borderRadius: "20px", padding: "14px 32px" }}>
        <span
          style={{
            fontFamily: FONT,
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "#ffffff",
          }}
        >
          Solutions from Research
        </span>
      </div>
    </motion.div>
  );
}

// ── Per-card solution pop ────────────────────────────────────────────────────
function SolutionCard({
  text,
  progress,
  index,
}: {
  text: string;
  progress: MotionValue<number>;
  index: number;
}) {
  const d       = index * 0.05;
  const opacity = useTransform(progress, [0.74 + d, 0.88 + d], [0, 1]);
  const scale   = useTransform(progress, [0.74 + d, 0.88 + d], [0.72, 1]);
  const y       = useTransform(progress, [0.74 + d, 0.88 + d], [28, 0]);
  return (
    <motion.div style={{ opacity, scale, y }}>
      <div
        style={{
          backgroundColor: ACCENT,
          border: "2px solid rgba(255,255,255,0.22)",
          borderRadius: "16px",
          padding: "clamp(16px, 2.5vw, 28px)",
        }}
      >
        <p
          style={{
            fontFamily: FONT,
            fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)",
            fontWeight: 400,
            letterSpacing: "0.02em",
            lineHeight: 1.5,
            color: "#ffffff",
            margin: 0,
          }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}

// ── Solutions layer (appears after stack fades) ──────────────────────────────
function SolutionsLayer({ progress }: { progress: MotionValue<number> }) {
  const labelOpacity = useTransform(progress, [0.70, 0.80], [0, 1]);
  const labelY       = useTransform(progress, [0.70, 0.80], [16, 0]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 40,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px, 2vw, 20px)",
        }}
      >
        <motion.div style={{ opacity: labelOpacity, y: labelY }}>
          <div
            style={{
              backgroundColor: ACCENT,
              borderRadius: "14px",
              padding: "clamp(12px, 1.6vw, 18px) clamp(20px, 2.5vw, 36px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: "#ffffff",
                margin: 0,
              }}
            >
              Solutions to Implement
            </p>
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(10px, 1.5vw, 20px)",
          }}
        >
          {SOLUTION_CARDS.map((text, i) => (
            <SolutionCard key={i} text={text} progress={progress} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Reduced-motion fallback ──────────────────────────────────────────────────
function FallbackLayout() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });
  const pill: React.CSSProperties = {
    fontFamily: FONT, fontSize: "0.6875rem", fontWeight: 600,
    letterSpacing: "0.08em", textTransform: "uppercase", color: "#ffffff", margin: 0,
  };
  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          maxWidth: "1280px", margin: "0 auto",
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "var(--section-pt)",
          paddingBottom: "var(--section-pb)",
          display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 20px)",
        }}
      >
        <div style={{ backgroundColor: DARK, borderRadius: "16px", padding: "clamp(14px,2vw,20px) clamp(24px,3vw,40px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={pill}>Solutions from Research</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "clamp(8px,1.2vw,12px)" }}>
          {RESEARCH_CARDS.map((text, i) => (
            <div key={i} style={{ backgroundColor: DARK, borderRadius: "12px", padding: "clamp(10px,1.4vw,14px)" }}>
              <p style={{ fontFamily: FONT, fontSize: "0.75rem", lineHeight: 1.4, color: "#ffffff", margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "clamp(16px,2.5vw,32px)", backgroundColor: ACCENT, borderRadius: "16px", padding: "clamp(14px,2vw,20px) clamp(24px,3vw,40px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={pill}>Solutions to Implement</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "clamp(10px,1.5vw,16px)" }}>
          {SOLUTION_CARDS.map((text, i) => (
            <div key={i} style={{ backgroundColor: ACCENT, border: "2px solid rgba(255,255,255,0.25)", borderRadius: "16px", padding: "clamp(16px,2vw,24px)" }}>
              <p style={{ fontFamily: FONT, fontSize: "0.875rem", lineHeight: 1.5, color: "#ffffff", margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function HavenSolutionsFunnel() {
  const sectionRef     = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  if (prefersReduced) return <FallbackLayout />;

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#ffffff", height: "360vh", position: "relative" }}
    >
      {/* Sticky full-viewport frame */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <ResearchLabel progress={scrollYProgress} />

        {RESEARCH_CARDS.map((text, i) => (
          <ScatterCard
            key={i}
            text={text}
            progress={scrollYProgress}
            data={CARD_DATA[i]}
          />
        ))}

        <SolutionsLayer progress={scrollYProgress} />
      </div>
    </section>
  );
}
