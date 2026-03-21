"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import Matter from "matter-js";

// ── Constants ─────────────────────────────────────────────────────────────────

const WALL_T     = 60;
const STAGGER_MS = 200;
const FONT_PX    = 14;   // fixed — never changes with viewport

const QUESTIONS = [
  "How many tasks do I have left in my Bio class for this week?",
  "Is my GPA above 3.0?",
  "What does the ratio between studying and grades look like?",
  "How much time have I spent on assignments this week?",
  "How many classes do I need to take until I can graduate?",
];

// Pill height + padding scale slightly with container width (font stays fixed)
function pillDims(containerW: number) {
  if (containerW < 480)  return { h: 36, padX: 16 };
  if (containerW < 768)  return { h: 40, padX: 20 };
  return                        { h: 44, padX: 24 };
}

// Measure actual rendered text widths so pills hug text precisely on every screen size
function measureTextWidths(texts: string[], padX: number, maxW: number): number[] {
  const span = document.createElement("span");
  Object.assign(span.style, {
    position:      "absolute",
    top:           "-9999px",
    left:          "-9999px",
    visibility:    "hidden",
    whiteSpace:    "nowrap",
    fontFamily:    "'Instrument Sans', sans-serif",
    fontSize:      `${FONT_PX}px`,
    letterSpacing: "0.02em",
    pointerEvents: "none",
  });
  document.body.appendChild(span);
  const widths = texts.map((t) => {
    span.textContent = t;
    const w = span.getBoundingClientRect().width;
    return Math.min(Math.ceil(w + padX * 2), maxW - 16);
  });
  document.body.removeChild(span);
  return widths;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function NeedStatements() {
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const cleanupRef   = useRef<() => void>(() => {});
  const hasRun       = useRef(false);

  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    // Wait one frame for layout to settle
    const frameId = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const W = container.offsetWidth;
      const H = container.offsetHeight;

      // Responsive pill dimensions — font stays fixed, body/padding scale with W
      const { h: PILL_H, padX: PAD_X } = pillDims(W);

      // Measure exact rendered text widths — no char-width estimation needed
      const widths = measureTextWidths(QUESTIONS, PAD_X, W);
      bubbleRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.width        = `${widths[i]}px`;
        el.style.height       = `${PILL_H}px`;
        el.style.borderRadius = `${PILL_H / 2}px`;
        const span = el.firstElementChild as HTMLElement | null;
        if (span) span.style.fontSize = `${FONT_PX}px`;
      });

      // ── Engine ──────────────────────────────────────────────────────────────
      const engine = Matter.Engine.create({
        gravity:            { x: 0, y: 1.1 },
        positionIterations: 10,
        velocityIterations: 8,
      });
      const world = engine.world;

      // ── Walls ───────────────────────────────────────────────────────────────
      const wo = { isStatic: true, friction: 0.8, restitution: 0.0, label: "wall" };
      Matter.Composite.add(world, [
        Matter.Bodies.rectangle(W / 2,          H + WALL_T / 2, W * 2,  WALL_T, wo), // floor
        Matter.Bodies.rectangle(W / 2,         -WALL_T / 2,     W * 2,  WALL_T, wo), // ceiling
        Matter.Bodies.rectangle(-WALL_T / 2,    H / 2,          WALL_T, H * 3,  wo), // left
        Matter.Bodies.rectangle(W + WALL_T / 2, H / 2,          WALL_T, H * 3,  wo), // right
      ]);

      // ── Mouse / touch — attached directly to the container div ──────────────
      //
      // Key fix: no invisible canvas needed. Matter.Mouse.create works on any
      // DOM element. The pill divs are pointerEvents:none so all clicks/touches
      // fall through to this container. pixelRatio is NOT set (defaults to 1)
      // because the container div uses CSS pixels, not device pixels.
      //
      const mouse = Matter.Mouse.create(container);

      // Matter.Mouse.create registers two non-passive listeners that call
      // preventDefault(), blocking ALL scroll while the mouse is in the section:
      //   • 'wheel'      → mouse.mousewheel  (blocks mouse-wheel + trackpad scroll)
      //   • 'touchmove'  → mouse.mousemove   (blocks two-finger trackpad + touch scroll)
      //
      // clearSourceEvents() only nulls the sourceEvents record — it never calls
      // removeEventListener, so the DOM listeners remain. We must remove them by
      // their actual handler references stored directly on the mouse object.
      container.removeEventListener("wheel",     (mouse as any).mousewheel);
      container.removeEventListener("touchmove", (mouse as any).mousemove);

      // Re-add touchmove with conditional preventDefault — only block scroll
      // when a pill is actively being dragged.
      const onTouchMove = (e: TouchEvent) => { if (mc.body) e.preventDefault(); };
      container.addEventListener("touchmove", onTouchMove, { passive: false });

      const mc = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.9,   // high = pill follows pointer tightly
          damping:   0.2,
          render:    { visible: false },
        },
      });
      Matter.Composite.add(world, mc);

      // ── Cursor feedback ──────────────────────────────────────────────────────
      const onMouseMove = (e: MouseEvent) => {
        if (mc.body) {
          container.style.cursor = "grabbing";
          return;
        }
        const rect = container.getBoundingClientRect();
        const pt   = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        const over = Matter.Query.point(
          Matter.Composite.allBodies(world).filter((b) => !b.isStatic),
          pt,
        ).length > 0;
        container.style.cursor = over ? "grab" : "default";
      };
      container.addEventListener("mousemove", onMouseMove);

      // ── Runner ───────────────────────────────────────────────────────────────
      const runner = Matter.Runner.create({ delta: 1000 / 60 });
      Matter.Runner.run(runner, engine);

      // ── Drop pills with stagger ──────────────────────────────────────────────
      const bodies: Matter.Body[] = [];
      const timers: ReturnType<typeof setTimeout>[] = [];

      QUESTIONS.forEach((_, i) => {
        const t = setTimeout(() => {
          const w  = widths[i];
          const lo = w / 2 + 8;
          const hi = W - w / 2 - 8;
          const x  = lo + Math.random() * Math.max(0, hi - lo);
          const y  = -(PILL_H / 2 + 4);

          const body = Matter.Bodies.rectangle(x, y, w, PILL_H, {
            chamfer:        { radius: PILL_H / 2 - 2 },
            friction:       0.9,
            frictionStatic: 0.7,
            frictionAir:    0.025,
            restitution:    0.02,
            density:        0.004,
            label:          `bubble-${i}`,
          });

          Matter.Body.setInertia(body, Infinity);

          (body as any)._w = w;
          (body as any)._h = PILL_H;
          (body as any)._i = i;

          bodies.push(body);
          Matter.Composite.add(world, body);
        }, i * STAGGER_MS);

        timers.push(t);
      });

      // ── rAF sync loop ────────────────────────────────────────────────────────
      // No rotation to handle — just translate each DOM pill to the body center.
      let raf = 0;
      const tick = () => {
        for (const body of bodies) {
          const idx = (body as any)._i as number;
          const w   = (body as any)._w as number;
          const h   = (body as any)._h as number;
          const el  = bubbleRefs.current[idx];
          if (!el) continue;

          const { x, y } = body.position;
          el.style.transform  = `translate(${x - w / 2}px, ${y - h / 2}px)`;
          el.style.visibility = "visible";
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      // ── Cleanup ──────────────────────────────────────────────────────────────
      cleanupRef.current = () => {
        cancelAnimationFrame(raf);
        timers.forEach(clearTimeout);
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("touchmove", onTouchMove);
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
      {/* ── Headline — above physics, pointer-events off so drag passes through */}
      <div
        className="relative max-w-[1280px] mx-auto"
        style={{
          paddingLeft:   "clamp(20px, 6.25vw, 80px)",
          paddingRight:  "clamp(20px, 6.25vw, 80px)",
          paddingTop:    "88px",
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

      {/* ── Physics container — absolute fill, receives all pointer events ──── */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset:    0,
          zIndex:   1,
          cursor:   "default",
        }}
      >
        {QUESTIONS.map((text, i) => (
          <div
            key={i}
            ref={(el) => { bubbleRefs.current[i] = el; }}
            style={{
              position:        "absolute",
              top:             0,
              left:            0,
              // Placeholder — overwritten by the effect before becoming visible
              width:           200,
              height:          44,
              backgroundColor: "#000000",
              borderRadius:    22,
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              overflow:        "hidden",
              pointerEvents:   "none",
              userSelect:      "none",
              willChange:      "transform",
              visibility:      "hidden",
            }}
          >
            <span
              style={{
                fontFamily:    "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize:      `${FONT_PX}px`,
                letterSpacing: "0.02em",
                lineHeight:    1,
                color:         "#ffffff",
                whiteSpace:    "nowrap",
                userSelect:    "none",
                pointerEvents: "none",
              }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
