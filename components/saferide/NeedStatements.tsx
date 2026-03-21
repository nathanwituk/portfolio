"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import Matter from "matter-js";

// ── Physics constants ────────────────────────────────────────────────────────

const PILL_H     = 44;
const PAD_X      = 26;
const CHAR_W     = 8.6;   // avg px per char at 0.875rem Instrument Sans
const WALL_T     = 80;
const STAGGER_MS = 220;

const QUESTIONS = [
  "How many tasks do I have left in my Bio class for this week?",
  "Is my GPA above 3.0?",
  "What does the ratio between studying and grades look like?",
  "How much time have I spent on assignments this week?",
  "How many classes do I need to take until I can graduate?",
];

function calcPillW(text: string, maxW: number): number {
  return Math.min(Math.ceil(text.length * CHAR_W + PAD_X * 2), maxW - 20);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function NeedStatements() {
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const bubbleRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const cleanupRef   = useRef<() => void>(() => {});
  const hasRun       = useRef(false);

  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    // Wait one frame so the section has finished laying out
    const frameId = requestAnimationFrame(() => {
      const container = containerRef.current;
      const canvas    = canvasRef.current;
      if (!container || !canvas) return;

      const W = container.offsetWidth;
      const H = container.offsetHeight;

      // Match canvas resolution to physics world exactly
      canvas.width  = W;
      canvas.height = H;

      // ── Pre-compute each pill width and sync to DOM elements ─────────────
      const widths = QUESTIONS.map((t) => calcPillW(t, W));
      bubbleRefs.current.forEach((el, i) => {
        if (el) el.style.width = `${widths[i]}px`;
      });

      // ── Engine ────────────────────────────────────────────────────────────
      const engine = Matter.Engine.create({
        gravity:            { x: 0, y: 2.6 },
        positionIterations: 12,
        velocityIterations: 12,
      });
      const world = engine.world;

      // ── Static boundary walls — all four sides ───────────────────────────
      const wo = { isStatic: true, friction: 0.9, restitution: 0.02, label: "wall" };
      Matter.Composite.add(world, [
        Matter.Bodies.rectangle(W / 2,          H + WALL_T / 2,  W + WALL_T * 2, WALL_T, wo), // floor
        Matter.Bodies.rectangle(W / 2,         -WALL_T / 2,      W + WALL_T * 2, WALL_T, wo), // ceiling
        Matter.Bodies.rectangle(-WALL_T / 2,    H / 2,           WALL_T,         H * 3,  wo), // left
        Matter.Bodies.rectangle(W + WALL_T / 2, H / 2,           WALL_T,         H * 3,  wo), // right
      ]);

      // ── Mouse / touch constraint ──────────────────────────────────────────
      const mouse = Matter.Mouse.create(canvas);
      mouse.pixelRatio = window.devicePixelRatio || 1;

      const mc = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.3,   // firm enough to push other bodies
          damping:   0.12,
          render:    { visible: false },
        },
      });
      Matter.Composite.add(world, mc);

      // ── Cursor: grab only when hovering a bubble body ─────────────────────
      const onMouseMove = (e: MouseEvent) => {
        if (mc.body) { canvas.style.cursor = "grabbing"; return; }
        const rect = canvas.getBoundingClientRect();
        const pt   = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        const over = Matter.Query.point(
          Matter.Composite.allBodies(world).filter((b) => !b.isStatic),
          pt,
        ).length > 0;
        canvas.style.cursor = over ? "grab" : "default";
      };
      canvas.addEventListener("mousemove", onMouseMove);

      // Prevent page scroll while touch-dragging on mobile
      const noScroll = (e: TouchEvent) => e.preventDefault();
      canvas.addEventListener("touchmove", noScroll, { passive: false });

      // ── Runner ────────────────────────────────────────────────────────────
      const runner = Matter.Runner.create({ delta: 1000 / 60 });
      Matter.Runner.run(runner, engine);

      // ── Drop bubbles with stagger ─────────────────────────────────────────
      const bodies: Matter.Body[] = [];
      const timers: ReturnType<typeof setTimeout>[] = [];

      QUESTIONS.forEach((_, i) => {
        const t = setTimeout(() => {
          const w   = widths[i];
          const lo  = w / 2 + 8;
          const hi  = W - w / 2 - 8;
          const x   = lo + Math.random() * Math.max(0, hi - lo);
          const y   = -(PILL_H / 2 + 10);

          const body = Matter.Bodies.rectangle(x, y, w, PILL_H, {
            chamfer:       { radius: PILL_H / 2 - 1 },
            friction:      0.88,
            frictionStatic: 0.65,
            frictionAir:   0.018,
            restitution:   0.04,
            density:       0.0035,
            label:         `bubble-${i}`,
          });

          (body as any)._w = w;
          (body as any)._i = i;

          bodies.push(body);
          Matter.Composite.add(world, body);
        }, i * STAGGER_MS);

        timers.push(t);
      });

      // ── rAF loop — direct DOM writes only, no React state ────────────────
      let raf = 0;
      const tick = () => {
        for (const body of bodies) {
          const idx  = (body as any)._i as number;
          const w    = (body as any)._w as number;
          const el   = bubbleRefs.current[idx];
          if (!el) continue;

          const { x, y } = body.position;
          const a = body.angle;

          // Move & rotate the pill shell
          el.style.transform  = `translate(${x - w / 2}px,${y - PILL_H / 2}px) rotate(${a}rad)`;
          el.style.visibility = "visible";

          // Counter-rotate the inner text div so it stays upright
          const inner = el.firstElementChild as HTMLElement | null;
          if (inner) inner.style.transform = `rotate(${-a}rad)`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      // ── Cleanup ───────────────────────────────────────────────────────────
      cleanupRef.current = () => {
        cancelAnimationFrame(raf);
        timers.forEach(clearTimeout);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("touchmove", noScroll);
        Matter.Runner.stop(runner);
        Matter.Engine.clear(engine);
        Matter.Composite.clear(world, false);
      };
    });

    return () => cancelAnimationFrame(frameId);
  }, [inView]);

  useEffect(() => () => cleanupRef.current(), []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden"
      style={{ backgroundColor: "#b2e639" }}
    >
      {/* ── Headline — z-index above physics, pointer-events off so clicks
           pass through to the canvas beneath ──────────────────────────────── */}
      <div
        className="relative max-w-[1280px] mx-auto"
        style={{
          paddingLeft:   "clamp(20px, 6.25vw, 80px)",
          paddingRight:  "clamp(20px, 6.25vw, 80px)",
          paddingTop:    "88px",
          // paddingBottom creates the height for the bubble pile area
          paddingBottom: "clamp(300px, 38vw, 420px)",
          zIndex:        10,
          pointerEvents: "none",
          position:      "relative",
        }}
      >
        <p
          className="font-normal leading-[1.1]"
          style={{
            fontFamily:    "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize:      "clamp(3.5rem, 8.2vw, 6.5625rem)",
            letterSpacing: "-0.05em",
            color:         "#000000",
            maxWidth:      "16ch",
          }}
        >
          Jordan needs to be able to answer the following:
        </p>
      </div>

      {/* ── Physics sandbox — absolute, fills the entire green section ───────
           The invisible canvas captures all events; bubble divs are purely
           visual and positioned by the physics tick loop each frame. ──────── */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset:    0,
          zIndex:   1,
        }}
      >
        {/* Invisible canvas — sole purpose: Matter.js mouse/touch input */}
        <canvas
          ref={canvasRef}
          style={{
            position:    "absolute",
            inset:       0,
            width:       "100%",
            height:      "100%",
            opacity:     0,
            zIndex:      2,
            cursor:      "default",
            touchAction: "none",
          }}
        />

        {/* Pill DOM elements — width synced to physics body in the effect */}
        {QUESTIONS.map((text, i) => (
          <div
            key={i}
            ref={(el) => { bubbleRefs.current[i] = el; }}
            style={{
              position:        "absolute",
              top:             0,
              left:            0,
              // Initial width — overwritten to the correct clamped value in the effect
              width:           Math.ceil(text.length * CHAR_W + PAD_X * 2),
              height:          PILL_H,
              backgroundColor: "#000000",
              borderRadius:    PILL_H / 2,
              overflow:        "hidden",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              pointerEvents:   "none",
              userSelect:      "none",
              transformOrigin: "center",
              willChange:      "transform",
              visibility:      "hidden",
              zIndex:          1,
            }}
          >
            {/* Inner div fills pill exactly — counter-rotated in tick to stay upright */}
            <div
              style={{
                width:           "100%",
                height:          "100%",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                transformOrigin: "center",
                fontFamily:      "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize:        "0.875rem",
                letterSpacing:   "0.02em",
                lineHeight:      1,
                color:           "#ffffff",
                whiteSpace:      "nowrap",
                userSelect:      "none",
                pointerEvents:   "none",
                flexShrink:      0,
              }}
            >
              {text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
