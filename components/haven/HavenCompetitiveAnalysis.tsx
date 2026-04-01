"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";
const ACCENT = "#9747ff";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const APP_ICONS = [
  { src: "/images/Haven/CalmApp.svg", alt: "Calm", color: "#d9f4ff" },
  { src: "/images/Haven/HeadspaceApp.svg", alt: "Headspace", color: "#fdd9be" },
  { src: "/images/Haven/StoicApp.svg", alt: "Stoic", color: "#ffffff" },
  { src: "/images/Haven/FinchApp.svg", alt: "Finch", color: "#e0e2ea" },
  { src: "/images/Haven/ForestApp.svg", alt: "Forest", color: "#effad1" },
];

const ROWS = [
  {
    coreFocus: `Meditation, sleep, relaxation — "#1 app for sleep, meditation, and relaxation"`,
    keyFeatures: "Guided meditations; breathing exercises; mood tracker; sleep stories; nature soundscapes",
    uniqueStrengths: "Very strong brand, wide usage, both sleep & mindfulness verticals; high-quality content; trusted in wellness space",
    weaknesses: "Less student-specific; heavy subscription; content-rich but might be overwhelming; limited integration with academic routines",
    insights: "Good benchmark for quality of content; shows what premium wellness apps deliver. Our product can learn from their content but aim for the student niche",
  },
  {
    coreFocus: "Meditation & mindfulness with wide reach; also sleep support",
    keyFeatures: "Guided meditation sessions; sleepcasts; mood tracking features; personalization",
    uniqueStrengths: "Strong beginner onboarding; broad audience; strong visual/UX design and brand recognition",
    weaknesses: "Again, not specifically designed for burnout or student lifestyle; may lack short-micro-break focus or academic context",
    insights: "Helps understand how a strong wellness UX looks. Our app could adopt some of their onboarding and personalization strengths but tailor it towards the student burnout niche",
  },
  {
    coreFocus: "Journaling & mood tracking + guided journaling prompts & reflection",
    keyFeatures: "Morning planning & evening reflection; mood tracker; habit tracker; guided journal templates",
    uniqueStrengths: "Focused on reflection, habit build-in, minimalist UI; strong for self-awareness and inner work",
    weaknesses: "More oriented toward journaling than micro-breaks or energy tracking; may require consistent user discipline; less gamified or study-specific",
    insights: "Our product's emotion and burnout pattern features could borrow ideas from Stoic's reflective framework",
  },
  {
    coreFocus: `Habit-tracking + wellness + virtual pet gamification ("birb")`,
    keyFeatures: "Virtual companion; users care for pet by completing daily wellness tasks; habit tracking; social elements",
    uniqueStrengths: "Gamified self-care; fun, playful, less serious tone; good for engagement and habit formation",
    weaknesses: `Possibly less deep on the "burnout/energy" domain; more game-like so might not always convey serious wellness/science; broader audience than student-specific`,
    insights: "Our product could borrow gamification/habit-formation elements from Finch but ground it in serious burnout/energy awareness for students",
  },
  {
    coreFocus: "Productivity / focus tool; encourages staying off phone via growing trees while you focus",
    keyFeatures: "Timer/Pomodoro style focus sessions; gamified tree-growth; ability to tag sessions; statistics; optional phone-blocking mode",
    uniqueStrengths: "Strong focus on distraction reduction, visual reward system; good for students/academics looking to stay on task",
    weaknesses: "Focused more on productivity/task focus than emotional/energy tracking or micro-rest breaks; less wellness/mind-body integration",
    insights: "Shows value of gamified focus mechanics for students. Our product could incorporate focus-session awareness as part of burnout tracking",
  },
];

const COL_HEADERS = [
  "Core Focus / Value Proposition",
  "Key Features",
  "Unique Strengths",
  "Weaknesses / Gaps",
];

const cellText = {
  fontFamily: FONT,
  fontSize: "0.75rem",
  fontWeight: 400 as const,
  letterSpacing: "0.02em",
  lineHeight: 1.3,
};

export default function HavenCompetitiveAnalysis() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section style={{ backgroundColor: DARK }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "calc(var(--section-pt) + 25px)",
          paddingBottom: "calc(var(--section-pb) + 25px)",
          gap: "clamp(20px, 3vw, 40px)",
        }}
      >
        <motion.p
          variants={fadeUp}
          className="font-semibold uppercase"
          style={{ fontFamily: FONT, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)" }}
        >
          Competitive Analysis
        </motion.p>

        {/* Comparison table — 4 content columns */}
        <motion.div variants={fadeUp} style={{ overflowX: "auto" }}>
          <table
            style={{
              borderCollapse: "separate",
              borderSpacing: "6px 8px",
              minWidth: "700px",
              width: "100%",
              tableLayout: "fixed",
            }}
          >
            <colgroup>
              <col style={{ width: "36px" }} />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th />
                {COL_HEADERS.map((h) => (
                  <th
                    key={h}
                    style={{
                      ...cellText,
                      fontWeight: 700,
                      color: "#ffffff",
                      textAlign: "left",
                      paddingBottom: "8px",
                      paddingLeft: "11px",
                      verticalAlign: "bottom",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i}>
                  <td style={{ verticalAlign: "middle", paddingRight: "4px" }}>
                    <img
                      src={APP_ICONS[i].src}
                      alt={APP_ICONS[i].alt}
                      draggable={false}
                      style={{ width: "28px", height: "28px", borderRadius: "6px", display: "block" }}
                    />
                  </td>
                  {[row.coreFocus, row.keyFeatures, row.uniqueStrengths, row.weaknesses].map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        backgroundColor: APP_ICONS[i].color,
                        borderRadius: "12px",
                        padding: "11px",
                        verticalAlign: "top",
                      }}
                    >
                      <p style={{ ...cellText, color: "#000000", margin: 0 }}>{cell}</p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Insights — pulled out as a 5-card row */}
        <motion.div variants={stagger} className="flex flex-col" style={{ gap: "clamp(12px, 2vw, 16px)" }}>
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase"
            style={{ fontFamily: FONT, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)" }}
          >
            Insights for our app
          </motion.p>

          <div className="flex flex-col md:flex-row flex-wrap" style={{ gap: "clamp(8px, 1.2vw, 12px)" }}>
            {ROWS.map((row, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start"
                style={{
                  flex: "1 1 0",
                  minWidth: "180px",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  borderRadius: "14px",
                  padding: "clamp(14px, 1.8vw, 18px)",
                  gap: "10px",
                }}
              >
                <img
                  src={APP_ICONS[i].src}
                  alt={APP_ICONS[i].alt}
                  draggable={false}
                  style={{ width: "24px", height: "24px", borderRadius: "5px", display: "block", flexShrink: 0, marginTop: "1px" }}
                />
                <p style={{ ...cellText, color: "rgba(255,255,255,0.85)", margin: 0 }}>{row.insights}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
