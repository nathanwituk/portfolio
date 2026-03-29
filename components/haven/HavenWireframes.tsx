"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const DARK = "#12091c";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const SCREENS: { label: string; bg: string; content: "home" | "meditate" | "journal" | "calendar" | "calendar-styled" }[] = [
  { label: "Home", bg: "#f5f5f5", content: "home" },
  { label: "Meditate", bg: "#f5f5f5", content: "meditate" },
  { label: "Journal", bg: "#f5f5f5", content: "journal" },
  { label: "Calendar", bg: "#f5f5f5", content: "calendar" },
  { label: "Calendar", bg: "#f9f5e6", content: "calendar-styled" },
];

function WireframeScreen({ label, bg, content }: typeof SCREENS[0]) {
  const isStyled = content === "calendar-styled";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flexShrink: 0 }}>
      <div
        style={{
          width: "clamp(100px, 10vw, 160px)",
          aspectRatio: "9/16",
          backgroundColor: bg,
          borderRadius: "clamp(8px, 1vw, 14px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          padding: "clamp(6px, 0.8vw, 10px)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          overflow: "hidden",
        }}
      >
        {/* Top nav bar */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <div style={{ height: "3px", width: "30%", backgroundColor: isStyled ? "#c4a265" : "#ccc", borderRadius: "2px" }} />
          <div style={{ height: "3px", width: "20%", backgroundColor: isStyled ? "#c4a265" : "#ccc", borderRadius: "2px" }} />
        </div>

        {/* Title bar */}
        <div style={{ height: "4px", backgroundColor: isStyled ? "#8b6914" : "#888", borderRadius: "2px", width: "60%", alignSelf: "center", marginBottom: "4px" }} />

        {content === "home" && (
          <>
            <div style={{ height: "40%", backgroundColor: "#ddd", borderRadius: "4px", marginBottom: "4px" }} />
            <div style={{ height: "3px", backgroundColor: "#ddd", borderRadius: "2px", width: "90%" }} />
            <div style={{ height: "3px", backgroundColor: "#ddd", borderRadius: "2px", width: "70%" }} />
          </>
        )}

        {content === "meditate" && (
          <>
            <div style={{ display: "flex", gap: "3px", marginBottom: "4px" }}>
              {["#888", "#ccc", "#ccc", "#ccc"].map((c, i) => (
                <div key={i} style={{ flex: 1, height: "8px", backgroundColor: c, borderRadius: "3px" }} />
              ))}
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", gap: "4px", marginBottom: "3px" }}>
                <div style={{ width: "35%", height: "18px", backgroundColor: "#ddd", borderRadius: "3px" }} />
                <div style={{ width: "35%", height: "18px", backgroundColor: "#ddd", borderRadius: "3px" }} />
              </div>
            ))}
          </>
        )}

        {content === "journal" && (
          <>
            <div style={{ flex: 1, backgroundColor: "#ebebeb", borderRadius: "4px", marginBottom: "6px" }} />
            <div style={{ height: "3px", backgroundColor: "#999", borderRadius: "2px", width: "50%", alignSelf: "center" }} />
          </>
        )}

        {content === "calendar" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} style={{ height: "6px", backgroundColor: i === 0 ? "#555" : "#ddd", borderRadius: "1px" }} />
              ))}
            </div>
            <div style={{ height: "8px", backgroundColor: "#ccc", borderRadius: "3px" }} />
            <div style={{ height: "8px", backgroundColor: "#ccc", borderRadius: "3px" }} />
          </>
        )}

        {content === "calendar-styled" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} style={{ height: "6px", backgroundColor: i === 0 ? "#c4a265" : "#e8d9b8", borderRadius: "1px" }} />
              ))}
            </div>
            {["Sept 1", "Sept 4", "Sept 10", "Sept 15", "Sept 21"].map((d) => (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#c4a265", flexShrink: 0 }} />
                <div style={{ flex: 1, height: "3px", backgroundColor: "#e8d9b8", borderRadius: "2px" }} />
              </div>
            ))}
          </>
        )}

        {/* Bottom nav */}
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-around", paddingTop: "4px" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: isStyled ? "#c4a265" : "#ccc" }} />
          ))}
        </div>
      </div>

      <p style={{ fontFamily: FONT, fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>{label}</p>
    </div>
  );
}

export default function HavenWireframes() {
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
          paddingTop: "clamp(48px, 8vw, 100px)",
          paddingBottom: "clamp(48px, 8vw, 100px)",
          gap: "clamp(32px, 4vw, 48px)",
        }}
      >
        <motion.p
          variants={fadeUp}
          className="font-semibold uppercase"
          style={{ fontFamily: FONT, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)" }}
        >
          Wireframes
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center"
          style={{ gap: "clamp(16px, 2.5vw, 32px)" }}
        >
          {SCREENS.map((screen) => (
            <WireframeScreen key={screen.label + screen.content} {...screen} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
