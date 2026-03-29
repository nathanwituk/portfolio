"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

// iPhone 16 Pro ratio: 393 × 852pt → at 165px wide ≈ 358px tall
const PHONE_W = 165;
const PHONE_H = 358;
// Lightbox phone frame — same ratio, larger
const LB_PHONE_W = 320;
const LB_PHONE_H = Math.round(320 * (852 / 393)); // ≈ 694px

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

// ── Custom lightbox with iPhone-ratio crop + in-frame scroll ────────────────

interface LightboxProps {
  initialIndex: number;
  onClose: () => void;
}

function MobileLightbox({ initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const prev = () => { if (index > 0) { setDirection(-1); setIndex(i => i - 1); } };
  const next = () => { if (index < cards.length - 1) { setDirection(1); setIndex(i => i + 1); } };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }}
      onClick={onClose}
    >
      {/* Scrollbar styling for lightbox phone frame */}
      <style>{`
        .compose-lb-phone::-webkit-scrollbar { width: 4px; }
        .compose-lb-phone::-webkit-scrollbar-track { background: rgba(255,255,255,0.08); }
        .compose-lb-phone::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.45); border-radius: 4px; }
      `}</style>

      {/* Arrow row + phone */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "24px" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous image"
          style={{
            width: 48, height: 48, borderRadius: "50%",
            background: index === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: index === 0 ? "default" : "pointer",
            backdropFilter: "blur(6px)",
            opacity: index === 0 ? 0.3 : 1,
            transition: "opacity 150ms ease",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
            <path d="M12 2L2 12L12 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* iPhone-ratio frame with scrollable image */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              width: LB_PHONE_W,
              height: LB_PHONE_H,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <div
              className="compose-lb-phone"
              style={{
                width: "100%",
                height: "100%",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cards[index].src}
                alt={cards[index].alt}
                draggable={false}
                style={{ width: LB_PHONE_W, height: "auto", display: "block" }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next image"
          style={{
            width: 48, height: 48, borderRadius: "50%",
            background: index === cards.length - 1 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: index === cards.length - 1 ? "default" : "pointer",
            backdropFilter: "blur(6px)",
            opacity: index === cards.length - 1 ? 0.3 : 1,
            transition: "opacity 150ms ease",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
            <path d="M2 2L12 12L2 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dot breadcrumbs */}
      <div
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
        onClick={e => e.stopPropagation()}
      >
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: i === index ? "24px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background: i === index ? "white" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 250ms ease",
            }}
          />
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "fixed", top: "24px", right: "24px",
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="2" y1="2" x2="14" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="2" x2="2" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>,
    document.body
  );
}

// ── Zoom icon ────────────────────────────────────────────────────────────────

function ZoomIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="9.5" r="6.5" stroke="white" strokeWidth="1.5" />
      <path d="M14.5 14.5L20 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 6.5v6M6.5 9.5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function ComposeMobileWireframes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });
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
      {/* Thin visible scrollbar inside phone frames */}
      <style>{`
        .compose-phone-inner::-webkit-scrollbar { width: 3px; }
        .compose-phone-inner::-webkit-scrollbar-track { background: transparent; }
        .compose-phone-inner::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.25); border-radius: 3px; }
        .compose-phone-inner { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.25) transparent; }
      `}</style>

      <div
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(14px, 4.375vw, 56px)",
          paddingRight: "clamp(14px, 4.375vw, 56px)",
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
                className="flex flex-col items-start shrink-0"
                style={{
                  width: "240px",
                  gap: "14px",
                }}
              >
                {/* Phone frame */}
                <div
                  className="group relative shrink-0 cursor-pointer"
                  style={{
                    width: `${PHONE_W}px`,
                    height: `${PHONE_H}px`,
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "10px 10px 45px 0px rgba(0,0,0,0.15)",
                  }}
                  onClick={() => setLightboxIndex(i)}
                >
                  {/* Scrollable image */}
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

                  {/* Zoom overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "44px", height: "44px",
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
                <div className="flex flex-col gap-[8px] w-full items-start">
                  <p
                    className="font-semibold uppercase leading-none"
                    style={{
                      fontFamily: FONT,
                      fontSize: "0.6875rem",
                      letterSpacing: "0.08em",
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
                      className="list-disc text-left"
                      style={{
                        fontFamily: FONT,
                        fontSize: "0.6875rem",
                        letterSpacing: "0.02em",
                        lineHeight: "1.4",
                        color: "var(--text-primary)",
                        paddingLeft: "16px",
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
          <MobileLightbox
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
