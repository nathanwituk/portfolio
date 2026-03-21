"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import Matter from "matter-js";

// ── Constants ────────────────────────────────────────────────────────────────

const PILL_H        = 44;       // pill height in px
const PAD_X         = 26;       // horizontal padding inside pill (each side)
const CHAR_W        = 8.6;      // avg character width at 0.875rem Instrument Sans
const PHYSICS_H     = 340;      // height of physics sandbox
const WALL_T        = 80;       // thickness of invisible boundary walls
const STAGGER_MS    = 220;      // ms between each bubble drop
const GRAVITY_Y     = 2.8;      // strong downward gravity
const BOUNCE        = 0.04;     // near-zero restitution — concrete landing
const FRICTION      = 0.88;
const FRICTION_STAT = 0.65;
const FRICTION_AIR  = 0.018;
const DENSITY       = 0.0035;
const DRAG_STIFF    = 0.15;
const DRAG_DAMP     = 0.12;

const QUESTIONS = [
  "How many tasks do I have left in my Bio class for this week?",
  "Is my GPA above 3.0?",
  "What does the ratio between studying and grades look like?",
  "How much time have I spent on assignments this week?",
  "How many classes do I need to take until I can graduate?",
];

function pillW(text: string, maxW: number): number {
  return Math.min(Math.ceil(text.length * CHAR_W + PAD_X * 2), maxW - 16);
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

    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.offsetWidth;
    const H = PHYSICS_H;

    // Size the event-capture canvas to match the physics world exactly
    canvas.width  = W;
    canvas.height = H;

    // ── Engine ───────────────────────────────────────────────────────────────
    const engine = Matter.Engine.create({
      gravity:           { x: 0, y: GRAVITY_Y },
      positionIterations: 12,
      velocityIterations: 12,
      constraintIterations: 4,
    });
    const world = engine.world;

    // ── Static boundary walls ─────────────────────────────────────────────
    const wallOpts = { isStatic: true, friction: FRICTION, restitution: BOUNCE, label: "wall" };
    const floor = Matter.Bodies.rectangle(W / 2,         H + WALL_T / 2, W + WALL_T * 2, WALL_T, wallOpts);
    const wallL = Matter.Bodies.rectangle(-WALL_T / 2,   H / 2,          WALL_T,         H * 3,  wallOpts);
    const wallR = Matter.Bodies.rectangle(W + WALL_T / 2, H / 2,          WALL_T,         H * 3,  wallOpts);
    Matter.Composite.add(world, [floor, wallL, wallR]);

    // ── Mouse constraint (uses the invisible canvas for coordinate mapping) ──
    const mouse = Matter.Mouse.create(canvas);
    mouse.pixelRatio = window.devicePixelRatio || 1;

    const mc = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: DRAG_STIFF,
        damping:   DRAG_DAMP,
        render:    { visible: false },
      },
    });
    Matter.Composite.add(world, mc);

    // Cursor feedback
    Matter.Events.on(mc, "startdrag", () => { canvas.style.cursor = "grabbing"; });
    Matter.Events.on(mc, "enddrag",   () => { canvas.style.cursor = "grab";     });

    // Prevent touchmove from scrolling the page while dragging inside canvas
    const noScroll = (e: TouchEvent) => e.preventDefault();
    canvas.addEventListener("touchmove", noScroll, { passive: false });

    // ── Drop bubbles with stagger ─────────────────────────────────────────
    const bodies: Matter.Body[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];

    QUESTIONS.forEach((text, i) => {
      const t = setTimeout(() => {
        const w  = pillW(text, W);
        const lo = w / 2 + 8;
        const hi = W - w / 2 - 8;
        const x  = lo + Math.random() * Math.max(0, hi - lo);
        const y  = -(PILL_H / 2) - 10;

        const body = Matter.Bodies.rectangle(x, y, w, PILL_H, {
          chamfer:       { radius: PILL_H / 2 - 1 },
          friction:      FRICTION,
          frictionStatic: FRICTION_STAT,
          frictionAir:   FRICTION_AIR,
          restitution:   BOUNCE,
          density:       DENSITY,
          label:         `bubble-${i}`,
        });

        (body as any)._w = w;
        (body as any)._i = i;

        bodies.push(body);
        Matter.Composite.add(world, body);
      }, i * STAGGER_MS);

      timers.push(t);
    });

    // ── Runner ────────────────────────────────────────────────────────────
    const runner = Matter.Runner.create({ delta: 1000 / 60 });
    Matter.Runner.run(runner, engine);

    // ── Animation loop — direct DOM writes, zero React re-renders ────────
    let raf = 0;
    const tick = () => {
      for (const body of bodies) {
        const i  = (body as any)._i as number;
        const w  = (body as any)._w as number;
        const el = bubbleRefs.current[i];
        if (!el) continue;

        const { x, y } = body.position;
        const a = body.angle;

        el.style.transform   = `translate(${x - w / 2}px,${y - PILL_H / 2}px) rotate(${a}rad)`;
        el.style.visibility  = "visible";

        // Counter-rotate the text label so it stays upright
        const span = el.firstElementChild as HTMLElement | null;
        if (span) span.style.transform = `rotate(${-a}rad)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ── Cleanup ───────────────────────────────────────────────────────────
    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      canvas.removeEventListener("touchmove", noScroll);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(world, false);
    };
  }, [inView]);

  // Run cleanup on unmount
  useEffect(() => () => cleanupRef.current(), []);

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: "#b2e639" }}
    >
      <div
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft:   "clamp(20px, 6.25vw, 80px)",
          paddingRight:  "clamp(20px, 6.25vw, 80px)",
          paddingTop:    "88px",
          paddingBottom: "88px",
        }}
      >
        {/* Headline — lives above the physics sandbox */}
        <p
          className="font-normal leading-[1.1]"
          style={{
            fontFamily:    "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize:      "clamp(3.5rem, 8.2vw, 6.5625rem)",
            letterSpacing: "-0.05em",
            color:         "#000000",
            maxWidth:      "16ch",
            marginBottom:  "56px",
          }}
        >
          Jordan needs to be able to answer the following:
        </p>

        {/* ── Physics sandbox ─────────────────────────────────────────── */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            height:   PHYSICS_H,
            overflow: "hidden",
            borderRadius: "20px",
          }}
        >
          {/* Invisible canvas — sole purpose: capture mouse/touch for Matter.js */}
          <canvas
            ref={canvasRef}
            style={{
              position:  "absolute",
              inset:     0,
              width:     "100%",
              height:    "100%",
              opacity:   0,
              zIndex:    2,
              cursor:    "grab",
              touchAction: "none",
            }}
          />

          {/* Pill DOM elements — positioned by the physics tick loop */}
          {QUESTIONS.map((text, i) => (
            <div
              key={i}
              ref={(el) => { bubbleRefs.current[i] = el; }}
              style={{
                position:        "absolute",
                top:             0,
                left:            0,
                width:           pillW(text, 9999),   // clamped properly at runtime
                height:          PILL_H,
                backgroundColor: "#000000",
                borderRadius:    PILL_H / 2,
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
              <span
                style={{
                  display:       "block",
                  fontFamily:    "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                  fontSize:      "0.875rem",
                  letterSpacing: "0.02em",
                  lineHeight:    1,
                  color:         "#ffffff",
                  whiteSpace:    "nowrap",
                  userSelect:    "none",
                  pointerEvents: "none",
                  paddingLeft:   PAD_X,
                  paddingRight:  PAD_X,
                  transformOrigin: "center",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
