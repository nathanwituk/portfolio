"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];

export interface BeautyImage {
  src: string;
  alt: string;
}

interface Props {
  images: BeautyImage[];
  initialIndex: number;
  onClose: () => void;
}

function ChevronRight() {
  return (
    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true">
      <path
        d="M2 2L12 12L2 22"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BeautyLightbox({ images, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const prev = () => {
    if (index === 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  };

  const next = () => {
    if (index === images.length - 1) return;
    setDirection(1);
    setIndex((i) => i + 1);
  };

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

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  const current = images[index];

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }}
      onClick={onClose}
    >
      {/* Row: left arrow + image + right arrow */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "24px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous image"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: index === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: index === 0 ? "default" : "pointer",
            backdropFilter: "blur(6px)",
            opacity: index === 0 ? 0.3 : 1,
            transition: "opacity 150ms ease",
            flexShrink: 0,
          }}
        >
          {/* Flipped chevron for left */}
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true">
            <path
              d="M12 2L2 12L12 22"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Image with slide animation */}
        <div style={{ position: "relative", maxWidth: "80vw", maxHeight: "80vh", overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: EASE }}
              src={current.src}
              alt={current.alt}
              style={{
                maxWidth: "80vw",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "16px",
                display: "block",
              }}
            />
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next image"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: index === images.length - 1 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: index === images.length - 1 ? "default" : "pointer",
            backdropFilter: "blur(6px)",
            opacity: index === images.length - 1 ? 0.3 : 1,
            transition: "opacity 150ms ease",
            flexShrink: 0,
          }}
        >
          <ChevronRight />
        </button>
      </div>

      {/* Dot breadcrumbs */}
      <div
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((_, i) => (
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

      {/* X button */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <line x1="2" y1="2" x2="14" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="2" x2="2" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>,
    document.body
  );
}
