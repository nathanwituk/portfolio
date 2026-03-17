"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FigmaButton from "@/components/ui/FigmaButton";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const slideIn = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 } },
};

const FIGMA_HREF =
  "https://www.figma.com/proto/JdpialVoK0AnVhnm4Lp8bR/Untitled?page-id=0%3A1&node-id=21-121&viewport=1275%2C1182%2C0.6&t=AIWvgSE5gKSg7P9H-1&scaling=scale-down&content-scaling=responsive&starting-point-node-id=21%3A121";

export default function SpeedsterFirstPrototype() {
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
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[60px]"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        {/* Left: text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-[40px] shrink-0"
          style={{ maxWidth: "520px" }}
        >
          {/* Label + title */}
          <motion.div variants={fadeUp} className="flex flex-col gap-[6px]">
            <p
              className="font-semibold leading-none uppercase"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.03em",
                color: "var(--text-tertiary)",
                transition: "color 200ms ease",
              }}
            >
              USER TESTING
            </p>
            <h2
              className="font-normal leading-none"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1.875rem",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              First Prototype
            </h2>
          </motion.div>

          {/* Body */}
          <motion.div variants={fadeUp} className="flex flex-col gap-[16px]">
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
              Meant for user testing, this prototype showcases onboarding screens, the main
              dashboard, and even friend group and global rankings.
            </p>
            <p
              className="font-normal italic leading-[1.4]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.01em",
                color: "var(--text-secondary)",
                transition: "color 200ms ease",
              }}
            >
              *Note: No user testing was conducted for this app design.{" "}
              <a
                href="/work/fearless-inventory"
                style={{
                  color: "#ff5d00",
                  textDecoration: "underline",
                  fontStyle: "italic",
                }}
              >
                Check out other pages for projects that contain user testing.
              </a>
            </p>
          </motion.div>

          {/* Figma link */}
          <motion.div variants={fadeUp}>
            <FigmaButton href={FIGMA_HREF} accentColor="#ff5d00" accentColorHover="#e05200">
              View in Figma
            </FigmaButton>
          </motion.div>
        </motion.div>

        {/* Right: prototype video */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 flex items-center justify-center"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "340px",
              borderRadius: "25px 25px 0px 0px",
              overflow: "hidden",
            }}
          >
            <video
              src="/images/speedster/Prototype First.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", display: "block" }}
            />
            {/* Bottom fade */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "25px",
                background: "linear-gradient(to bottom, transparent, var(--bg-primary))",
                pointerEvents: "none",
                transition: "background 200ms ease",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
