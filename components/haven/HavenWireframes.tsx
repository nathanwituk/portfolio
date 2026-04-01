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

const WIREFRAMES = [
  "/images/Haven/Wireframes/Wireframe1.jpg",
  "/images/Haven/Wireframes/Wireframe2.jpg",
  "/images/Haven/Wireframes/Wireframe3.jpg",
  "/images/Haven/Wireframes/Wireframe4.jpg",
  "/images/Haven/Wireframes/Wireframe5.jpg",
];

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
          paddingTop: "calc(var(--section-pt) + 25px)",
          paddingBottom: "calc(var(--section-pb) + 25px)",
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
          style={{ gap: "clamp(12px, 2vw, 24px)" }}
        >
          {WIREFRAMES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Haven wireframe screen ${i + 1}`}
              draggable={false}
              style={{
                width: "clamp(100px, 12vw, 180px)",
                height: "auto",
                display: "block",
                borderRadius: "clamp(8px, 1vw, 14px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
