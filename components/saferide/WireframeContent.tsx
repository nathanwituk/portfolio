"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// Figma order: 1, 2, 3, 6, 4, 10, 11
const SCREENS = [
  { src: "/images/StudySyncDash/Dashboard Screens/MacBook Pro 16_ - 1.jpg",  alt: "StudySync wireframe — initial layout" },
  { src: "/images/StudySyncDash/Dashboard Screens/MacBook Pro 16_ - 2.jpg",  alt: "StudySync wireframe — time spent" },
  { src: "/images/StudySyncDash/Dashboard Screens/MacBook Pro 16_ - 3.jpg",  alt: "StudySync wireframe — task list" },
  { src: "/images/StudySyncDash/Dashboard Screens/MacBook Pro 16_ - 6.jpg",  alt: "StudySync wireframe — progress overview" },
  { src: "/images/StudySyncDash/Dashboard Screens/MacBook Pro 16_ - 4.jpg",  alt: "StudySync wireframe — GPA projector" },
  { src: "/images/StudySyncDash/Dashboard Screens/MacBook Pro 16_ - 10.jpg", alt: "StudySync wireframe — settings" },
  { src: "/images/StudySyncDash/Dashboard Screens/MacBook Pro 16_ - 11.jpg", alt: "StudySync wireframe — calendar" },
];

export default function WireframeContent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{
        paddingTop: "40px",
        paddingBottom: "var(--section-pb)",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {SCREENS.map((screen, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative w-full overflow-hidden rounded-[16px]"
              style={{ aspectRatio: "487 / 326" }}
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
