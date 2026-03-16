"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export interface BrandingSectionProps {
  sectionLabel: string;
  title: string;
  bullets: string[];
  note?: string;
  screenshots: { src: string; alt: string }[];
}

// mdi:palette icon (24×24 viewBox)
function PaletteIcon() {
  return (
    <div
      className="flex items-center justify-center bg-[#6f7142] shrink-0"
      style={{ width: "44px", height: "44px", padding: "10px", borderRadius: "38px" }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M17.5 12A1.5 1.5 0 0 1 16 10.5A1.5 1.5 0 0 1 17.5 9A1.5 1.5 0 0 1 19 10.5A1.5 1.5 0 0 1 17.5 12M14.5 8A1.5 1.5 0 0 1 13 6.5A1.5 1.5 0 0 1 14.5 5A1.5 1.5 0 0 1 16 6.5A1.5 1.5 0 0 1 14.5 8M9.5 8A1.5 1.5 0 0 1 8 6.5A1.5 1.5 0 0 1 9.5 5A1.5 1.5 0 0 1 11 6.5A1.5 1.5 0 0 1 9.5 8M6.5 12A1.5 1.5 0 0 1 5 10.5A1.5 1.5 0 0 1 6.5 9A1.5 1.5 0 0 1 8 10.5A1.5 1.5 0 0 1 6.5 12M12 3A9 9 0 0 0 3 12A9 9 0 0 0 12 21A1.5 1.5 0 0 0 13.5 19.5C13.5 19.11 13.35 18.76 13.11 18.5C12.88 18.23 12.73 17.88 12.73 17.5A1.5 1.5 0 0 1 14.23 16H16A5 5 0 0 0 21 11C21 6.58 16.97 3 12 3Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

// Fixed widths per gallery slot
const SLOT_WIDTHS = [180, 480, 560, 420, 180, 560, 480, 560, 240, 240, 240];
const CARD_HEIGHT = 379;
const TOP_HEIGHT = 275;
const BOTTOM_HEIGHT = 54;

export default function BrandingSection({
  sectionLabel,
  title,
  bullets,
  note,
  screenshots,
}: BrandingSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [thumbLeft, setThumbLeft] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0);

  const updateThumb = useCallback(() => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const trackW = track.offsetWidth;
    const tw = Math.max((el.clientWidth / el.scrollWidth) * trackW, 40);
    const maxScroll = el.scrollWidth - el.clientWidth;
    const tl = maxScroll > 0 ? (el.scrollLeft / maxScroll) * (trackW - tw) : 0;
    setThumbWidth(tw);
    setThumbLeft(tl);
  }, []);

  // Set initial thumb size after mount
  useEffect(() => {
    updateThumb();
    window.addEventListener("resize", updateThumb);
    return () => window.removeEventListener("resize", updateThumb);
  }, [updateThumb]);

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startScrollLeft = scrollRef.current?.scrollLeft ?? 0;

    const onMouseMove = (ev: MouseEvent) => {
      const el = scrollRef.current;
      const track = trackRef.current;
      if (!el || !track) return;
      const trackW = track.offsetWidth;
      const tw = Math.max((el.clientWidth / el.scrollWidth) * trackW, 40);
      const maxScroll = el.scrollWidth - el.clientWidth;
      const scrollDelta = ((ev.clientX - startX) / (trackW - tw)) * maxScroll;
      el.scrollLeft = Math.max(0, Math.min(maxScroll, startScrollLeft + scrollDelta));
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, []);

  // Auto-scroll 200px on first entry
  useEffect(() => {
    if (!inView || !scrollRef.current) return;
    animate(0, 200, {
      duration: 0.85,
      ease: "easeInOut",
      onUpdate: (v) => {
        if (scrollRef.current) scrollRef.current.scrollLeft = v;
      },
    });
  }, [inView]);

  return (
    <section
      className="w-full"
      style={{
        paddingTop: "88px",
        paddingBottom: "88px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex items-center"
        style={{
          gap: "77px",
          // Match the left edge of max-w-[1280px] mx-auto containers:
          // at vw ≤ 1280px → same as clamp(20px,6.25vw,80px)
          // at vw > 1280px → shifts right with the centered container
          paddingLeft: "max(clamp(20px, 6.25vw, 80px), calc((100% - 1280px) / 2 + 80px))",
          // No paddingRight — images bleed to the right edge
        }}
      >
        {/* ── Left info card ── */}
        <motion.div
          variants={fadeUp}
          className="shrink-0 flex flex-col"
          style={{ width: "clamp(260px, 30vw, 400px)", minHeight: `${CARD_HEIGHT}px` }}
        >
          {/* Grey top section */}
          <div
            className="flex flex-col gap-[22px]"
            style={{
              minHeight: `${TOP_HEIGHT}px`,
              padding: "21px 29px",
              borderRadius: "20px 20px 0 0",
              backgroundColor: "var(--bg-secondary)",
              transition: "background-color 200ms ease",
            }}
          >
            {/* Label + icon row + title */}
            <div className="flex flex-col gap-[10px]">
              <p
                className="font-semibold leading-none"
                style={{
                  fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize: "1rem",
                  letterSpacing: "-0.48px",
                  color: "var(--text-tertiary)",
                }}
              >
                {sectionLabel.toUpperCase()}
              </p>
              <div className="flex items-center gap-[10px]">
                <PaletteIcon />
                <p
                  className="font-normal leading-none"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1.875rem",
                    letterSpacing: "-0.6px",
                    color: "var(--text-primary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {title}
                </p>
              </div>
            </div>

            {/* Bullets */}
            <div
              className="flex flex-col gap-[8px] font-normal"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.28px",
                lineHeight: "1.4",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              {bullets.map((b, i) => (
                <div key={i} className="flex gap-[8px] items-start">
                  <span className="shrink-0 mt-0.5">·</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Olive note bar */}
          <div
            className="bg-[#6f7142] flex items-start gap-[10px]"
            style={{
              minHeight: `${BOTTOM_HEIGHT}px`,
              padding: "12px 20px 16px",
              borderRadius: "0 0 12px 12px",
            }}
          >
            {/* Info icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
              style={{ marginTop: "1px" }}
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
              <line x1="12" y1="11" x2="12" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="7.5" r="1" fill="white" />
            </svg>
            <p
              className="font-normal text-white leading-[1.3]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.625rem",
                letterSpacing: "0.3px",
              }}
            >
              {note}
            </p>
          </div>
        </motion.div>

        {/* ── Scrollable image rail + custom scrollbar ── */}
        <motion.div
          variants={fadeUp}
          className="flex-1 min-w-0 flex flex-col"
          style={{ gap: "10px" }}
        >
          {/* Image rail — native scrollbar hidden, custom one below */}
          <div
            ref={scrollRef}
            className="overflow-x-scroll branding-rail"
            style={{
              height: `${CARD_HEIGHT}px`,
              scrollbarWidth: "none",
            }}
            onScroll={updateThumb}
          >
            <div
              className="flex h-full"
              style={{ gap: "12px", width: "max-content", paddingRight: "80px" }}
            >
              {screenshots.map((s, i) => {
                const w = SLOT_WIDTHS[i] ?? 300;
                return (
                  <div
                    key={i}
                    className="shrink-0 relative rounded-[14px] overflow-hidden"
                    style={{ width: `${w}px`, height: `${CARD_HEIGHT}px` }}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      className="object-cover"
                      sizes={`${w}px`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom scrollbar — always visible */}
          <div
            ref={trackRef}
            style={{
              position: "relative",
              height: "14px",
              backgroundColor: "var(--bg-tan)",
              borderRadius: "6px",
              transition: "background-color 200ms ease",
              flexShrink: 0,
            }}
          >
            <div
              onMouseDown={handleThumbMouseDown}
              style={{
                position: "absolute",
                top: 0,
                left: `${thumbLeft}px`,
                width: `${thumbWidth}px`,
                height: "100%",
                backgroundColor: "#6f7142",
                borderRadius: "6px",
                cursor: "grab",
                userSelect: "none",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
