"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Giant name slides up from below footer overflow-clip
const nameReveal = {
  hidden: { y: "100%", x: "-50%" },
  visible: {
    y: 0,
    x: "-50%",
    transition: { duration: 1.0, ease: EASE, delay: 0.15 },
  },
};

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "545px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      {/* ── Contact + Social columns ── */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="px-5 md:px-[80px]"
        style={{
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div
          className="flex flex-col md:flex-row shrink-0"
          style={{ maxWidth: "552px", gap: "28px" }}
        >
          {/* Contact */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col"
            style={{ flex: "1 0 0", gap: "30px" }}
          >
            <p
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.9375rem",
                letterSpacing: "-0.6px",
                lineHeight: "1.1",
                color: "#ff5d00",
              }}
            >
              Contact
            </p>
            <a
              href="mailto:nathan.wituk@ku.edu"
              className="font-normal leading-none underline decoration-solid hover:text-[#ff5d00] transition-colors duration-200"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.9375rem",
                letterSpacing: "-1px",
                color: "var(--text-primary)",
              }}
            >
              nathan.wituk@ku.edu
            </a>
          </motion.div>

          {/* Social */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col"
            style={{ flex: "1 0 0", gap: "30px" }}
          >
            <p
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.9375rem",
                letterSpacing: "-0.6px",
                lineHeight: "1.1",
                color: "#ff5d00",
              }}
            >
              Social
            </p>
            <div className="flex flex-col" style={{ gap: "10px" }}>
              <a
                href="https://www.behance.net/nathanwituk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-normal leading-none underline decoration-solid hover:text-[#ff5d00] transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.9375rem",
                  letterSpacing: "-1px",
                  color: "var(--text-primary)",
                }}
              >
                Behance
              </a>
              <a
                href="https://www.linkedin.com/in/nathan-wituk/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-normal leading-none underline decoration-solid hover:text-[#ff5d00] transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.9375rem",
                  letterSpacing: "-1px",
                  color: "var(--text-primary)",
                }}
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Giant "Nathan.Wituk" ──
          Figma: bottom-[195.27px], left-[calc(50%-664px)], translate-y-full
          We animate it from translateY(100%) → translateY(0).
          The container has overflow-hidden so the entrance is a reveal.
          left: calc(50% - 664px) = slightly past the left edge at 1280px wide.
      ── */}
      {/* Parent height = font-size so overflow-hidden clips the reveal correctly.
          motion.p is absolutely positioned with left:50% + x:-50% so the
          text center is always exactly at the viewport center — guaranteed
          equal bleed on N (left) and K (right) at every viewport width. */}
      <div
        className="absolute overflow-hidden w-full"
        style={{
          bottom: "0",
          left: "0",
          height: "18.5vw",
        }}
      >
        <motion.p
          variants={nameReveal}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-semibold whitespace-nowrap select-none"
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "18.5vw",
            letterSpacing: "-0.06em",
            lineHeight: "1",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          Nathan.Wituk
        </motion.p>
      </div>
    </footer>
  );
}
