"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import BeautyLightbox from "@/components/case-study/BeautyLightbox";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

// iPhone 16 Pro ratio: 393 × 852pt → at 165px wide = 165 × (852/393) ≈ 358px
const PHONE_W = 165;
const PHONE_H = 358;

const cards = [
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes Mobile/Welcome.jpg",
    alt: "Welcome Screen mobile wireframe",
    title: "Welcome Screen",
    bullets: [],
  },
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes Mobile/Please center barcode.jpg",
    alt: "Scan Barcode mobile wireframe",
    title: "Scan Barcode",
    bullets: ["Use camera", "Upload photo of QR code"],
  },
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes Mobile/Event Found.jpg",
    alt: "Event Found mobile wireframe",
    title: "Event Found",
    bullets: [
      "View Program",
      "Find your student",
      "Summer Schedules",
      "Search for alternative event",
      "Upcoming events",
    ],
  },
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes Mobile/Program.jpg",
    alt: "Program mobile wireframe",
    title: "Program",
    bullets: ["Find your student", "Summer schedules", "Songs, conductor, band playing"],
  },
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes Mobile/Summer Schedule.jpg",
    alt: "Summer Schedule mobile wireframe",
    title: "Summer Schedule",
    bullets: [],
  },
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes Mobile/Find your student.jpg",
    alt: "Find Your Student mobile wireframe",
    title: "Find Your Student",
    bullets: [
      "Search Function",
      "Filter by bands and ensembles",
      "Scroll feature with regular list",
    ],
  },
];

const lightboxImages = cards.map(({ src, alt }) => ({ src, alt }));

function ZoomIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="9.5" r="6.5" stroke="white" strokeWidth="1.5" />
      <path d="M14.5 14.5L20 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 6.5v6M6.5 9.5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ComposeMobileWireframes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
        paddingTop: "48px",
        paddingBottom: "48px",
      }}
    >
      {/* Hide scrollbars inside phone frames globally for this component */}
      <style>{`
        .compose-phone-inner::-webkit-scrollbar { display: none; }
        .compose-phone-inner { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        <div className="overflow-x-auto" style={{ paddingBottom: "32px" }}>
          <motion.div
            ref={ref}
            className="flex gap-[26px]"
            style={{ width: "max-content" }}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {cards.map((card, i) => (
              <motion.div
                key={card.title + i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="flex gap-[20px] items-start rounded-[20px] shrink-0"
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "21px 29px",
                  width: "489px",
                }}
              >
                {/* Phone frame — fixed iPhone 16 Pro ratio, image scrolls inside */}
                <div
                  className="group relative shrink-0 cursor-pointer"
                  style={{
                    width: `${PHONE_W}px`,
                    height: `${PHONE_H}px`,
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "10px 10px 45px 0px rgba(0,0,0,0.15)",
                    flexShrink: 0,
                  }}
                  onClick={() => setLightboxIndex(i)}
                >
                  {/* Scrollable image content — fills the phone frame */}
                  <div
                    className="compose-phone-inner absolute inset-0"
                    style={{ overflowY: "auto", overflowX: "hidden" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.src}
                      alt={card.alt}
                      draggable={false}
                      style={{ width: `${PHONE_W}px`, height: "auto", display: "block" }}
                    />
                  </div>

                  {/* Zoom overlay — pointer-events-none so scroll is never blocked */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "44px",
                        height: "44px",
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.4)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <ZoomIcon />
                    </div>
                  </div>
                </div>

                {/* Label + Title + Bullets */}
                <div className="flex flex-col gap-[10px] flex-1 min-w-0">
                  <p
                    className="font-semibold uppercase leading-none"
                    style={{
                      fontFamily: FONT,
                      fontSize: "0.613rem",
                      letterSpacing: "-0.48px",
                      color: "#a4a4a4",
                    }}
                  >
                    MOBILE WIREFRAMES
                  </p>
                  <p
                    className="font-normal leading-none"
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(0.875rem, 1.75vw, 1.3125rem)",
                      letterSpacing: "-0.04em",
                      color: "var(--text-primary)",
                      transition: "color 200ms ease",
                    }}
                  >
                    {card.title}
                  </p>
                  {card.bullets.length > 0 && (
                    <ul
                      className="list-disc"
                      style={{
                        fontFamily: FONT,
                        fontSize: "0.613rem",
                        letterSpacing: "0.02em",
                        lineHeight: "1.4",
                        color: "var(--text-primary)",
                        paddingLeft: "21px",
                        transition: "color 200ms ease",
                      }}
                    >
                      {card.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <BeautyLightbox
            images={lightboxImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
