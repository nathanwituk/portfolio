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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const slideIn = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const FIGMA_HREF =
  "https://www.figma.com/proto/5mzzst8foMp9AKcygp4ZPJ/Nathan-Wituk---Dashboard?page-id=194%3A435&node-id=274-1044&viewport=52%2C149%2C0.11&t=iezp9RfL8at96e8q-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=274%3A1044";

export default function FullPrototype() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full"
      style={{
        paddingTop: "88px",
        paddingBottom: "88px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-x-[75px] gap-y-[48px]"
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
          className="flex flex-col gap-[24px] shrink-0 w-full lg:w-[388px]"
        >
          {/* Label + heading */}
          <motion.div variants={fadeUp} className="flex flex-col gap-[10px]">
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
              Final
            </p>
            <p
              className="font-normal leading-none"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Full Prototype
            </p>
          </motion.div>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="font-normal leading-[1.5]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            Adding other pages onto the dashboard, prototyping, adding key goal features.
          </motion.p>

          {/* Figma link button */}
          <motion.div variants={fadeUp}>
            <a
              href={FIGMA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[8px] rounded-[10px] font-semibold"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "-0.03em",
                color: "#000000",
                backgroundColor: "#b2e639",
                padding: "10px 20px",
                transition: "background-color 150ms ease, box-shadow 150ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#c5f53f";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 20px rgba(178,230,57,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#b2e639";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              {/* Figma logo icon */}
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
                <path d="M3.5 20C5.43 20 7 18.43 7 16.5V13H3.5C1.57 13 0 14.57 0 16.5C0 18.43 1.57 20 3.5 20Z" fill="#0ACF83"/>
                <path d="M0 10C0 8.07 1.57 6.5 3.5 6.5H7V13.5H3.5C1.57 13.5 0 11.93 0 10Z" fill="#A259FF"/>
                <path d="M0 3.5C0 1.57 1.57 0 3.5 0H7V7H3.5C1.57 7 0 5.43 0 3.5Z" fill="#F24E1E"/>
                <path d="M7 0H10.5C12.43 0 14 1.57 14 3.5C14 5.43 12.43 7 10.5 7H7V0Z" fill="#FF7262"/>
                <path d="M14 10C14 11.93 12.43 13.5 10.5 13.5C8.57 13.5 7 11.93 7 10C7 8.07 8.57 6.5 10.5 6.5C12.43 6.5 14 8.07 14 10Z" fill="#1ABCFE"/>
              </svg>
              View in Figma
            </a>
          </motion.div>
        </motion.div>

        {/* Right: mockup image */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative flex-1 w-full min-w-0 rounded-[16px] overflow-hidden"
          style={{ aspectRatio: "707 / 412" }}
        >
          <Image
            src="/images/StudySyncDash/Dashboard Screens/MacBook Pro 16_ - 2.jpg"
            alt="StudySync full prototype — dashboard walkthrough"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 707px"
          />
        </motion.div>
      </div>
    </section>
  );
}
