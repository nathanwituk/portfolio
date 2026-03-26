"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BeautyLightbox from "@/components/case-study/BeautyLightbox";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";

const cards = [
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes desktop/MacBook Pro 16_ - 1.jpg",
    alt: "Welcome Screen desktop wireframe",
    title: "Welcome Screen",
  },
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes desktop/MacBook Pro 16_ - 2.jpg",
    alt: "Main Dashboard desktop wireframe",
    title: "Main Dashboard",
  },
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes desktop/MacBook Pro 16_ - 3.jpg",
    alt: "Edit Program desktop wireframe",
    title: "Edit Program",
  },
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes desktop/MacBook Pro 16_ - 4.jpg",
    alt: "Edit Student Names desktop wireframe",
    title: "Edit Student Names",
  },
  {
    src: "/images/Compose - IXD 414 Draft/Wireframes desktop/MacBook Pro 16_ - 5.jpg",
    alt: "Edit Summer Info desktop wireframe",
    title: "Edit Summer Info",
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

export default function ComposeDesktopWireframes() {
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
      {/* Same container as Overview — constrains scroll area and scrollbar */}
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
            className="flex gap-[9px]"
            style={{ width: "max-content" }}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="flex flex-col gap-[14px] items-start shrink-0"
                style={{ width: "501px" }}
              >
                {/* Screenshot with zoom overlay */}
                <div
                  className="group relative rounded-[8px] overflow-hidden shrink-0 cursor-pointer"
                  style={{ width: "428px", height: "276px", boxShadow: "10px 10px 45px 0px rgba(0,0,0,0.15)" }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className="object-cover"
                    sizes="428px"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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

                {/* Label + Title */}
                <div className="flex flex-col gap-[10px] w-full">
                  <p
                    className="font-semibold uppercase leading-none"
                    style={{
                      fontFamily: FONT,
                      fontSize: "0.613rem",
                      letterSpacing: "-0.48px",
                      color: "#a4a4a4",
                    }}
                  >
                    DESKTOP WIREFRAMES
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
