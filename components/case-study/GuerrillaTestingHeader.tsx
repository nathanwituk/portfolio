"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export default function GuerrillaTestingHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section className="w-full bg-[#6f7142]" style={{ paddingTop: "56px", paddingBottom: "56px" }}>
      <motion.div
        ref={ref}
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto flex flex-col gap-[8px]"
        style={{ paddingLeft: "clamp(20px, 6.25vw, 80px)", paddingRight: "clamp(20px, 6.25vw, 80px)" }}
      >
        <SectionLabel variant="light">User Testing</SectionLabel>
        <h2
          className="font-normal text-white leading-none tracking-[-0.03em]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          Guerrilla Rapid Testing
        </h2>
      </motion.div>
    </section>
  );
}
