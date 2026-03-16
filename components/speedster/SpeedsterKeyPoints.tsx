"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

interface KeyPoint {
  number: number;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

const KEY_POINTS: KeyPoint[] = [
  {
    number: 1,
    title: "Track Data",
    description: "See the cumulative amount of time you've saved by speeding.",
    imageSrc: "/images/speedster/Track Data.jpg",
    imageAlt: "Track Data screen showing lifetime time saved",
  },
  {
    number: 2,
    title: "Manage Trips",
    description: "Start new trips in-app while data updates in real time.",
    imageSrc: "/images/speedster/Manage Trips.jpg",
    imageAlt: "Manage Trips screen showing live map",
  },
  {
    number: 3,
    title: "Race Friends",
    description: "Connect with friends to see where you're at in the ranks.",
    imageSrc: "/images/speedster/Race Friends.jpg",
    imageAlt: "Race Friends leaderboard screen",
  },
];

export default function SpeedsterKeyPoints() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--bg-secondary)",
        paddingTop: "96px",
        paddingBottom: "96px",
        transition: "background-color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start justify-center gap-[40px] md:gap-[32px]"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        {KEY_POINTS.map((point) => (
          <motion.div
            key={point.number}
            variants={fadeUp}
            className="flex flex-col items-center gap-[20px] flex-1 min-w-0"
          >
            {/* Number badge + title row */}
            <div className="flex items-center gap-[10px]">
              <span
                className="flex items-center justify-center shrink-0 font-semibold leading-none"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "#ff5d00",
                  color: "#ffffff",
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "0.875rem",
                }}
              >
                {point.number}
              </span>
              <h3
                className="font-semibold leading-none"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "1.25rem",
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  transition: "color 200ms ease",
                }}
              >
                {point.title}
              </h3>
            </div>

            {/* Description */}
            <p
              className="font-normal leading-[1.45] text-center"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.01em",
                color: "var(--text-secondary)",
                transition: "color 200ms ease",
                maxWidth: "280px",
              }}
            >
              {point.description}
            </p>

            {/* Phone mockup */}
            <div
              className="relative rounded-[20px] overflow-hidden"
              style={{
                width: "100%",
                maxWidth: "280px",
                aspectRatio: "9/16",
                backgroundColor: "#1e1208",
                boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
              }}
            >
              {point.imageSrc && (
                <Image
                  src={point.imageSrc}
                  alt={point.imageAlt ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 26vw"
                />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
