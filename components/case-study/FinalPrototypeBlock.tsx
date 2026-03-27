"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
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

const slideIn = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 } },
};

interface PillButton {
  label: string;
  variant?: "olive" | "dark" | "light";
}

interface DetailRow {
  text: string;
  button?: PillButton;
}

interface Props {
  id?: string;
  sectionLabel?: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  /** "left" = image on left, text on right. "right" = text on left, image on right */
  imagePosition?: "left" | "right";
  bg?: string;
  detailRow?: DetailRow;
  pillButtons?: PillButton[];
  /** If true, the image is displayed larger */
  largeImage?: boolean;
  /** PNG to render below the description in place of detail row / pill buttons */
  beautyImageSrc?: string;
  /** If true, vertically center the image instead of aligning to bottom */
  centerImage?: boolean;
  /** If true, apply rounded corners and drop shadow to the mockup image, and scale down by 30% */
  roundedImage?: boolean;
  /** Called when the user clicks the mockup image — use to open a shared carousel */
  onImageClick?: () => void;
  /** Crop this percentage from the left side of the image (0–100) */
  cropLeft?: number;
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function FinalPrototypeBlock({
  id,
  sectionLabel = "Final Prototype",
  title,
  body,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  bg = "var(--bg-primary)",
  detailRow,
  pillButtons,
  largeImage = false,
  centerImage = false,
  roundedImage = false,
  beautyImageSrc,
  onImageClick,
  cropLeft = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  const imageVariant = imagePosition === "left" ? slideInLeft : slideIn;

  // All beauty/large sections use the same consistent sizing
  const imgWidth = largeImage
    ? "clamp(200px, 26vw, 400px)"
    : "clamp(180px, 20vw, 340px)";

  const imgHeight = largeImage
    ? "clamp(340px, 44vw, 660px)"
    : "clamp(260px, 34vw, 520px)";

  const imageEl = (
    <motion.div
      variants={imageVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex ${centerImage ? "items-center" : "items-end"} justify-center shrink-0`}
      style={{ width: imgWidth }}
    >
      {/* Outer div carries the drop-shadow; inner div clips with border-radius */}
      <div
        className="relative w-full"
        style={{
          height: imgHeight,
          ...(roundedImage && { filter: "drop-shadow(8px 10px 24px rgba(0,0,0,0.18))" }),
          ...(onImageClick && { cursor: "zoom-in" }),
        }}
        onClick={onImageClick}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: cropLeft > 0 ? "hidden" : undefined,
            ...(roundedImage && { borderRadius: "16px", overflow: "hidden" }),
          }}
        >
          {/* Crop-left: widen inner div and shift it left so the left cropLeft% overflows and is clipped */}
          <div style={cropLeft > 0 ? {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${-(cropLeft / (100 - cropLeft)) * 100}%`,
            width: `${100 / (1 - cropLeft / 100)}%`,
          } : { position: "absolute", inset: 0 }}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className={`object-contain ${centerImage ? "object-center" : "object-bottom"}`}
              sizes="(max-width: 768px) 80vw, 38vw"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const textEl = (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col gap-[20px] flex-1 min-w-0"
      style={{ minWidth: "clamp(240px, 32vw, 460px)", maxWidth: "520px" }}
    >
      <motion.div variants={fadeUp} className="flex flex-col gap-[6px]">
        {sectionLabel && <SectionLabel variant="muted">{sectionLabel}</SectionLabel>}
        <h2
          className="font-normal leading-none tracking-[-0.03em]"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1.875rem",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          {title}
        </h2>
      </motion.div>

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
        {body}
      </motion.p>

      {beautyImageSrc && (
        <motion.div variants={fadeUp}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beautyImageSrc}
            alt=""
            aria-hidden="true"
            style={{ width: "clamp(160px, 18vw, 400px)", height: "auto", display: "block" }}
          />
        </motion.div>
      )}

      {!beautyImageSrc && pillButtons && pillButtons.length > 0 && (
        <motion.div variants={fadeUp} className="flex gap-[10px] flex-wrap">
          {pillButtons.map((btn, i) => (
            <span
              key={i}
              className="rounded-full text-sm"
              style={{
                padding: "8px 18px",
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.8125rem",
                backgroundColor: btn.variant === "dark" ? "#2a2a2a" : btn.variant === "light" ? "var(--bg-tan)" : "#6f7142",
                color: btn.variant === "light" ? "var(--text-primary)" : "#ffffff",
                border: btn.variant === "light" ? "1px solid var(--border-subtle)" : "none",
                transition: "background-color 200ms ease, color 200ms ease",
              }}
            >
              {btn.label}
            </span>
          ))}
        </motion.div>
      )}

      {!beautyImageSrc && detailRow && (
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-[12px] rounded-[10px] flex-wrap"
          style={{ backgroundColor: "#6f7142", padding: "14px 20px" }}
        >
          <span
            className="text-white flex-1"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "0.875rem",
            }}
          >
            {detailRow.text}
          </span>
          {detailRow.button && (
            <span
              className="text-white rounded-[8px] shrink-0"
              style={{
                padding: "8px 16px",
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.8125rem",
                backgroundColor: detailRow.button.variant === "dark" ? "#2a1a0a" : "#6f7142",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {detailRow.button.label}
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <>
      <section
        id={id}
        className="w-full"
        style={{ backgroundColor: bg, paddingTop: "80px", paddingBottom: "80px", transition: "background-color 200ms ease, color 200ms ease" }}
      >
        <div
          ref={ref}
          className="flex flex-col md:flex-row items-center justify-center gap-[64px] max-w-[1280px] mx-auto"
          style={{
            paddingLeft: "clamp(20px, 6.25vw, 80px)",
            paddingRight: "clamp(20px, 6.25vw, 80px)",
          }}
        >
          {imagePosition === "left" ? (
            <>
              {imageEl}
              {textEl}
            </>
          ) : (
            <>
              {textEl}
              {imageEl}
            </>
          )}
        </div>
      </section>
    </>
  );
}
