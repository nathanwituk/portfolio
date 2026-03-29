"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// Trend-up icon inside olive circle (Ops Manager)
function OpsIcon() {
  return (
    <div
      className="flex items-center justify-center bg-[#6f7142] rounded-full shrink-0"
      style={{ width: "35px", height: "35px", padding: "10px" }}
    >
      <svg width="15" height="18" viewBox="0 0 15 18" fill="none" aria-hidden="true">
        <path
          d="M1 14L6 8L9 11L14 4"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10 4H14V8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Fulfillment icon — uses /public/images/fearless-inventory/Inventory Icon.svg
function FulfillmentIcon() {
  return (
    <div
      className="flex items-center justify-center bg-[#6f7142] rounded-full shrink-0"
      style={{ width: "35px", height: "35px", padding: "7px" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/fearless-inventory/Inventory Icon.svg"
        alt=""
        aria-hidden="true"
        width={19}
        height={19}
        style={{ transform: "translate(1px, -1px)" }}
      />
    </div>
  );
}

export interface UserStory {
  label: string;
  icon: "ops" | "fulfillment";
  name: string;
  items: string[];
  /** Optional nested sub-items under the first item */
  subItems?: string[];
}

interface Props {
  stories: UserStory[];
}

function StoryCard({ story }: { story: UserStory }) {
  return (
    <div
      className="flex flex-1 flex-col gap-[40px] rounded-[20px] min-w-0"
      style={{
        padding: "21px 29px",
        backgroundColor: "var(--bg-secondary)",
        transition: "background-color 200ms ease",
      }}
    >
      {/* Header */}
      <div className="flex flex-col gap-[10px]">
        <SectionLabel>{story.label}</SectionLabel>
        <div className="flex items-center gap-[10px]">
          {story.icon === "ops" ? <OpsIcon /> : <FulfillmentIcon />}
          <p
            className="font-normal leading-none whitespace-nowrap tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1.875rem",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            {story.name}
          </p>
        </div>
      </div>

      {/* List */}
      <ol
        className="list-decimal font-normal leading-[1.4] tracking-[0.02em] flex flex-col gap-0"
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          fontSize: "0.875rem",
          paddingLeft: "21px",
          color: "var(--text-primary)",
          transition: "color 200ms ease",
        }}
      >
        {story.items.map((item, i) => (
          <li key={i} className="mb-0">
            <span className="leading-[1.4]">{item}</span>
            {i === 0 && story.subItems && (
              <ol
                className="list-[lower-alpha]"
                style={{ paddingLeft: "21px" }}
              >
                {story.subItems.map((sub, j) => (
                  <li key={j}>
                    <span className="leading-[1.4]">{sub}</span>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function UserStoriesSection({ stories }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full px-5 md:px-[72px]"
      style={{
        paddingTop: "40px",
        paddingBottom: "var(--section-pb)",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col md:flex-row gap-[22px] items-stretch w-full max-w-[1280px] mx-auto"
      >
        {stories.map((s) => (
          <motion.div key={s.name} variants={fadeUp} className="flex flex-1 min-w-0">
            <StoryCard story={s} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
