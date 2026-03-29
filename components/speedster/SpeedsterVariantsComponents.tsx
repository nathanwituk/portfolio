"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

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
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 } },
};

// Single image scrolled to reveal top (State A) then bottom (State B)
const IMG_STATE_A = "/images/speedster/variants-state.jpg";
const IMG_STATE_B = "/images/speedster/variants-state.jpg";

// Scroll positions derived from Figma (panel: 639×419px, each image: 639×1134.487px):
//
//  State A — shows top of IMG_STATE_A, IMG_STATE_B hidden below:
//    IMG_A bottom: -715.47px  (-170.76% of panel h)
//    IMG_B bottom: -1849.96px (-441.52% of panel h)  ← seamlessly below IMG_A
//
//  State B — shows bottom of IMG_STATE_B, IMG_STATE_A scrolled off top:
//    IMG_A bottom:  1138.02px ( 271.61% of panel h)  ← scrolled off top
//    IMG_B bottom:     4.53px (   1.08% of panel h)
//
//  Both images move by the same Δ (~1853px) so the strip scrolls as one.
//  Image height as % of panel height: 1134.487 / 419 = 270.76%

function VariantsScrollPanel({ active }: { active: boolean }) {
  const [stateB, setStateB] = useState(false);

  useEffect(() => {
    if (!active) return;

    let id: ReturnType<typeof setTimeout>;
    let current = false; // false = State A, true = State B

    function tick() {
      // Hold State A for 2 s, State B for 3.6 s (both include the 2.2 s scroll time)
      const hold = current ? 3600 : 2000;
      id = setTimeout(() => {
        current = !current;
        setStateB(current);
        tick();
      }, hold);
    }

    tick();
    return () => clearTimeout(id);
  }, [active]);

  const T = {
    duration: 2.2,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "639 / 419",
        backgroundColor: "#000",
        overflow: "hidden",
        borderRadius: 18,
      }}
    >
      {/* IMG_STATE_A — top half of the strip */}
      <motion.div
        animate={{ bottom: stateB ? "271.61%" : "-170.76%" }}
        transition={T}
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "270.76%",
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={IMG_STATE_A}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      </motion.div>

      {/* IMG_STATE_B — bottom half of the strip, seamlessly below IMG_STATE_A */}
      <motion.div
        animate={{ bottom: stateB ? "1.08%" : "-441.52%" }}
        transition={T}
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "270.76%",
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={IMG_STATE_B}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      </motion.div>
    </div>
  );
}

export default function SpeedsterVariantsComponents() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "80px",
        paddingBottom: "80px",
        transition: "background-color 200ms ease",
      }}
    >
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[60px]"
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
          className="flex flex-col gap-[40px] shrink-0"
          style={{ maxWidth: "440px" }}
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-[6px]">
            <p
              className="font-semibold leading-none uppercase"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                color: "var(--text-tertiary)",
                transition: "color 200ms ease",
              }}
            >
              Creation and organization
            </p>
            <h2
              className="font-normal leading-none"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1.875rem",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                transition: "color 200ms ease",
              }}
            >
              Variants and Components
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-normal leading-[1.4]"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "0.6875rem",
              letterSpacing: "0.02em",
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            Adding new states and animating between states.
          </motion.p>
        </motion.div>

        {/* Right: animated scroll panel */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1"
          style={{ maxWidth: "580px", width: "100%" }}
        >
          <VariantsScrollPanel active={inView} />
        </motion.div>
      </div>
    </section>
  );
}
