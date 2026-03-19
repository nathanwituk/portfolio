"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Valid 7 days — replace with local asset if expired
const RILEY_IMG = "https://www.figma.com/api/mcp/asset/6296fea2-d813-40f6-9897-772791eaf3a4";

const PILLS = ["No Job", "18 years old", "Finance Major", "Alpha Chi Omega"];

const GRID_ITEMS = [
  {
    title: "Travel habits:",
    bullets: [
      "Has her own car",
      "Drives to and from school",
      "Doesn't like spending money on Uber",
    ],
  },
  {
    title: "Frustrations",
    bullets: [
      "Doesn't want to walk home 3 miles",
      "Doesn't like paying fees",
      "Doesn't want to drunk drive",
    ],
  },
  {
    title: "Tech Habits",
    bullets: ["Constantly on phone", "Battery drains quickly"],
  },
  {
    title: "Goals and wants:",
    bullets: [
      "Wants to be able to get home without paying a hefty fee",
      "Want's to get home with a press of the button.",
    ],
  },
];

export default function SafeRidePersonaChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "80px",
        paddingBottom: "80px",
        transition: "background-color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        <div
          className="w-full rounded-[20px] overflow-hidden"
          style={{
            backgroundColor: "var(--bg-secondary)",
            transition: "background-color 200ms ease",
          }}
        >
          {/* Top: photo + name + pills */}
          <div
            className="flex flex-col md:flex-row items-start md:items-center gap-[28px] md:gap-[60px]"
            style={{
              padding: "40px clamp(20px, 4vw, 60px)",
              borderBottom: "1px solid color-mix(in srgb, var(--nav-border) 50%, transparent)",
            }}
          >
            {/* Photo */}
            <div
              className="shrink-0"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <img
                src={RILEY_IMG}
                alt="Riley Thompson"
                style={{ width: "100%", height: "168%", objectFit: "cover", objectPosition: "top", marginTop: "-40%" }}
              />
            </div>

            {/* Name + pills */}
            <div className="flex flex-col gap-[18px]">
              <div className="flex flex-col gap-[6px]">
                <p
                  className="font-semibold uppercase leading-none"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "-0.03em",
                    color: "var(--text-tertiary)",
                    transition: "color 200ms ease",
                  }}
                >
                  Freshmen
                </p>
                <p
                  className="font-normal leading-none"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1.875rem",
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    transition: "color 200ms ease",
                  }}
                >
                  Riley Thompson
                </p>
              </div>
              <div className="flex flex-wrap gap-[12px]">
                {PILLS.map((pill) => (
                  <span
                    key={pill}
                    className="font-normal leading-none whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "0.875rem",
                      letterSpacing: "-0.025em",
                      color: "white",
                      backgroundColor: "#6363ff",
                      padding: "6px 18px",
                      borderRadius: "60px",
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: 2×2 grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-[32px]"
            style={{ padding: "40px clamp(20px, 4vw, 60px)" }}
          >
            {GRID_ITEMS.map((item) => (
              <div key={item.title} className="flex flex-col gap-[8px]">
                <p
                  className="font-normal leading-none"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "2.3125rem",
                    letterSpacing: "-0.03em",
                    color: "var(--text-primary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {item.title}
                </p>
                {item.bullets.map((b) => (
                  <p
                    key={b}
                    className="font-normal leading-[1.21]"
                    style={{
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "1rem",
                      letterSpacing: "-0.025em",
                      color: "var(--text-secondary)",
                      transition: "color 200ms ease",
                    }}
                  >
                    {b}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
