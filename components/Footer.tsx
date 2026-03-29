"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const nameReveal = {
  hidden: { y: "100%", x: "-50%" },
  visible: {
    y: 0,
    x: "-50%",
    transition: { duration: 1.0, ease: EASE, delay: 0.15 },
  },
};

function BackToTopArrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 19V5M12 5L6 11M12 5L18 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "545px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="px-5 md:px-[80px]"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        {/* ── Top row: Contact + Social (left) | Back to Top (right) ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-row items-start justify-between"
          style={{ gap: "24px" }}
        >
          {/* Left: Contact + Social */}
          <div
            className="flex flex-col md:flex-row shrink-0"
            style={{ gap: "28px" }}
          >
            {/* Contact */}
            <div className="flex flex-col" style={{ gap: "30px" }}>
              <p
                className="font-semibold uppercase"
                style={{
                  fontFamily: FONT,
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
                  fontFamily: FONT,
                  fontSize: "0.9375rem",
                  letterSpacing: "-1px",
                  color: "var(--text-primary)",
                }}
              >
                nathan.wituk@ku.edu
              </a>
            </div>

            {/* Social */}
            <div className="flex flex-col" style={{ gap: "30px" }}>
              <p
                className="font-semibold uppercase"
                style={{
                  fontFamily: FONT,
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
                    fontFamily: FONT,
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
                    fontFamily: FONT,
                    fontSize: "0.9375rem",
                    letterSpacing: "-1px",
                    color: "var(--text-primary)",
                  }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right: Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center shrink-0 cursor-pointer bg-transparent border-none p-0 outline-none"
            style={{ gap: "12px" }}
            aria-label="Back to top"
          >
            <p
              className="font-semibold uppercase group-hover:underline"
              style={{
                fontFamily: FONT,
                fontSize: "0.9375rem",
                letterSpacing: "-0.6px",
                lineHeight: "1.1",
                color: "#ff5d00",
              }}
            >
              Back to Top
            </p>
            <span
              className="flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-1"
              style={{ color: "#ff5d00" }}
            >
              <BackToTopArrow />
            </span>
          </button>
        </motion.div>

      </motion.div>

      {/* ── Attribution — bottom-right, above giant name ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
        className="absolute px-5 md:px-[80px]"
        style={{
          right: 0,
          bottom: "calc(18.5vw + 14px)",
          fontFamily: FONT,
          fontSize: "0.6875rem",
          letterSpacing: "0.02em",
          color: "rgba(0,0,0,0.25)",
          textAlign: "right",
        }}
      >
        Designed and built by Nathan Wituk using Claude Code
      </motion.p>

      {/* ── Giant "Nathan.Wituk" ── */}
      <div
        className="absolute overflow-hidden w-full"
        style={{ bottom: "0", left: "0", height: "18.5vw" }}
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
            fontFamily: FONT,
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
