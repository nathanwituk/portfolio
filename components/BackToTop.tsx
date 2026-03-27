"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

export default function BackToTop({ accentColor = "#ff5d00" }: { accentColor?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      ref={ref}
      onClick={scrollToTop}
      className="w-full overflow-hidden shrink-0 cursor-pointer group"
      style={{ height: "105px", backgroundColor: "var(--bg-primary)", transition: "background-color 200ms ease" }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, ease: EASE }}
      whileHover="hovered"
    >
      {/* Mobile: no top margin (64px bar only), desktop: 19px top space */}
      <div className="h-[64px] mt-0 md:mt-[19px]">
        <motion.div
          className="bg-black w-full h-full flex items-center justify-between px-5 md:px-[80px]"
          variants={{
            hovered: { backgroundColor: accentColor },
          }}
          transition={{ duration: 0.25 }}
        >
          <p
            className="font-normal text-white leading-none whitespace-nowrap"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1.125rem",
              letterSpacing: "-0.6px",
            }}
          >
            Back to Top
          </p>
          <motion.div
            className="flex items-center justify-center w-[28px] h-[28px]"
            variants={{
              hovered: { y: -4 },
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Arrow SVG — rotated -90deg to point up */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="-rotate-90"
              style={{ color: "white" }}
            >
              <path
                d="M5.5 14H22.5M22.5 14L15.5 7M22.5 14L15.5 21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.button>
  );
}
