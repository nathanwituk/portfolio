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
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 } },
};

// Replace with actual Figma prototype embed URL when available
const FIGMA_EMBED_SRC =
  "https://embed.figma.com/proto/nb7kLRXiAVeezPVWRQCUkX/Playground---Portfolio?node-id=396-50709&embed-host=share";
const FIGMA_HREF =
  "https://www.figma.com/design/nb7kLRXiAVeezPVWRQCUkX/Playground---Portfolio?node-id=396-50709";

export default function SafeRideFinalPrototype() {
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
        className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-[60px] md:gap-[80px]"
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
          className="flex flex-col gap-[40px] flex-1 min-w-0"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-[6px]">
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
              Prototype
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
              Final Figma Prototype
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-normal leading-[1.4]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.02em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            Through the final prototype, I was able to successfully lessen the amount of
            interactions between screens of the experience, reducing friction for users who
            may be in vulnerable or unsafe situations.
          </motion.p>

          <motion.div variants={fadeUp}>
            <FigmaButton
              href={FIGMA_HREF}
              accentColor="#6363ff"
              accentColorHover="#5252e0"
              external
            >
              View in Figma
            </FigmaButton>
          </motion.div>
        </motion.div>

        {/* Right: prototype embed */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="shrink-0"
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "600 / 400",
              borderRadius: "20px",
              overflow: "hidden",
              backgroundColor: "var(--bg-secondary)",
              transition: "background-color 200ms ease",
            }}
          >
            <iframe
              src={FIGMA_EMBED_SRC}
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="SafeRide Final Prototype"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
