"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const TESTERS = ["Logan", "Maya", "Syd", "Maya W", "Sophia"];

// [soberOld, soberNew, intoOld, intoNew, usedNewBtn]
const DATA: [number, number, number, number, boolean][] = [
  [7, 10, 4, 9, true],
  [9, 10, 7, 8, true],
  [8, 10, 7, 10, false],
  [7, 9, 4, 7, false],
  [8, 9, 7, 8, false],
];

const RED = "#e16a6a";
const GREEN = "#86d37a";

function Cell({
  value,
  bg,
  isFirst = false,
  isLast = false,
  isTopLeft = false,
  isTopRight = false,
  isBottomLeft = false,
  isBottomRight = false,
}: {
  value: string | number;
  bg: string;
  isFirst?: boolean;
  isLast?: boolean;
  isTopLeft?: boolean;
  isTopRight?: boolean;
  isBottomLeft?: boolean;
  isBottomRight?: boolean;
}) {
  const radius = {
    borderTopLeftRadius: isTopLeft ? "10px" : 0,
    borderTopRightRadius: isTopRight ? "10px" : 0,
    borderBottomLeftRadius: isBottomLeft ? "10px" : 0,
    borderBottomRightRadius: isBottomRight ? "10px" : 0,
  };
  return (
    <div
      style={{
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 8px",
        ...radius,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          fontSize: "1rem",
          fontWeight: 400,
          color: "white",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function SafeRideQuantChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "0",
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
            padding: "40px clamp(16px, 4vw, 48px)",
            transition: "background-color 200ms ease",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "640px" }}>
              <thead>
                {/* Top header row: Sober | Intoxicated | Used new button */}
                <tr>
                  <th style={{ width: "100px" }} />
                  <th
                    colSpan={2}
                    style={{
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      textAlign: "center",
                      paddingBottom: "8px",
                      transition: "color 200ms ease",
                    }}
                  >
                    Sober
                  </th>
                  <th
                    colSpan={2}
                    style={{
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      textAlign: "center",
                      paddingBottom: "8px",
                      transition: "color 200ms ease",
                    }}
                  >
                    Intoxicated
                  </th>
                  <th style={{ width: "140px" }} />
                </tr>
                {/* Sub-header: col labels */}
                <tr>
                  <th style={{ width: "100px" }} />
                  {/* Sober Old */}
                  <th
                    style={{
                      backgroundColor: "white",
                      padding: "10px 8px",
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      color: "#1d1d1d",
                      textAlign: "center",
                      borderTopLeftRadius: "10px",
                    }}
                  >
                    Old Interface Ease
                  </th>
                  {/* Sober New */}
                  <th
                    style={{
                      backgroundColor: "white",
                      padding: "10px 8px",
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      color: "#1d1d1d",
                      textAlign: "center",
                    }}
                  >
                    New Interface Ease
                  </th>
                  {/* Intox Old */}
                  <th
                    style={{
                      backgroundColor: "white",
                      padding: "10px 8px",
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      color: "#1d1d1d",
                      textAlign: "center",
                    }}
                  >
                    Old Interface Ease
                  </th>
                  {/* Intox New */}
                  <th
                    style={{
                      backgroundColor: "white",
                      padding: "10px 8px",
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      color: "#1d1d1d",
                      textAlign: "center",
                    }}
                  >
                    New Interface Ease
                  </th>
                  {/* Used new button */}
                  <th
                    style={{
                      backgroundColor: "white",
                      padding: "10px 8px",
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      color: "#1d1d1d",
                      textAlign: "center",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    Used new button
                  </th>
                </tr>
              </thead>
              <tbody>
                {DATA.map(([soberOld, soberNew, intoOld, intoNew, usedNew], i) => {
                  const isFirst = i === 0;
                  const isLast = i === DATA.length - 1;
                  return (
                    <tr key={TESTERS[i]}>
                      {/* Tester name */}
                      <td
                        style={{
                          paddingRight: "16px",
                          paddingTop: "2px",
                          paddingBottom: "2px",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            padding: "4px 16px",
                            borderRadius: "40px",
                            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                            fontSize: "0.875rem",
                            color: "#1d1d1d",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {TESTERS[i]}
                        </div>
                      </td>
                      {/* Sober Old — red */}
                      <td style={{ padding: "2px 0" }}>
                        <Cell
                          value={soberOld}
                          bg={RED}
                          isTopLeft={isFirst}
                          isBottomLeft={isLast}
                        />
                      </td>
                      {/* Sober New — green */}
                      <td style={{ padding: "2px 0" }}>
                        <Cell value={soberNew} bg={GREEN} />
                      </td>
                      {/* Intox Old — red */}
                      <td style={{ padding: "2px 0" }}>
                        <Cell value={intoOld} bg={RED} />
                      </td>
                      {/* Intox New — green */}
                      <td style={{ padding: "2px 0" }}>
                        <Cell value={intoNew} bg={GREEN} />
                      </td>
                      {/* Used new button */}
                      <td style={{ padding: "2px 0" }}>
                        <Cell
                          value={usedNew ? "Yes" : "No"}
                          bg={usedNew ? GREEN : RED}
                          isTopRight={isFirst}
                          isBottomRight={isLast}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
