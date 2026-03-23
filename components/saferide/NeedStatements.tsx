"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Matter from "matter-js";

// ── Constants ─────────────────────────────────────────────────────────────────

const WALL_T     = 60;
const STAGGER_MS = 200;

const QUESTIONS = [
  "How many tasks do I have left in my Bio class for this week?",
  "Is my GPA above 3.0?",
  "What does the ratio between studying and grades look like?",
  "How much time have I spent on assignments this week?",
  "How many classes do I need to take until I can graduate?",
];

// Pill dims scale with container width.
// Above 1280px everything grows by 30% for a more impactful desktop presence.
function pillDims(containerW: number) {
  if (containerW < 480)  return { h: 36, padX: 16, fontSize: 14 };
  if (containerW < 768)  return { h: 40, padX: 20, fontSize: 14 };
  if (containerW <= 1280) return { h: 44, padX: 24, fontSize: 14 };
  // > 1280px: +30%
  return                        { h: 57, padX: 31, fontSize: 18 };
}

// Measure actual rendered text widths — uses the runtime fontSize so measurement
// is accurate at every size tier (including the large desktop tier).
function measureTextWidths(texts: string[], padX: number, fontSize: number, maxW: number): number[] {
  const span = document.createElement("span");
  Object.assign(span.style, {
    position:      "absolute",
    top:           "-9999px",
    left:          "-9999px",
    visibility:    "hidden",
    whiteSpace:    "nowrap",
    fontFamily:    "'Instrument Sans', sans-serif",
    fontSize:      `${fontSize}px`,
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
  const sectionRef      = useRef<HTMLElement>(null);
  const containerRef    = useRef<HTMLDivElement>(null);
  const bubbleRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const cleanupRef      = useRef<() => void>(() => {});
  const hasRun          = useRef(false);
  const resetBodiesRef  = useRef<(() => void) | null>(null);
  const buttonRef       = useRef<HTMLButtonElement>(null);
  const [spinKey, setSpinKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive,  setIsActive]  = useState(false);

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

      // Responsive pill dimensions — 30% larger above 1280px
      const { h: PILL_H, padX: PAD_X, fontSize: FONT_PX } = pillDims(W);

      // Measure exact rendered text widths using the runtime font size
      const widths = measureTextWidths(QUESTIONS, PAD_X, FONT_PX, W);
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

      // ── Button — static physics body matching the DOM button exactly ─────────
      // buttonBounds is stored so the afterUpdate handler can resolve drag-through.
      let buttonBounds: { minX: number; maxX: number; minY: number; maxY: number } | null = null;
      const btnEl = buttonRef.current;
      if (btnEl) {
        const cRect = container.getBoundingClientRect();
        const bRect = btnEl.getBoundingClientRect();
        const bx = bRect.left - cRect.left + bRect.width  / 2;
        const by = bRect.top  - cRect.top  + bRect.height / 2;
        Matter.Composite.add(world, Matter.Bodies.rectangle(bx, by, bRect.width, bRect.height, {
          isStatic:    true,
          friction:    0.6,
          restitution: 0.3,
          label:       "button",
          chamfer:     { radius: 20 }, // matches the 20px border-radius
        }));
        buttonBounds = {
          minX: bx - bRect.width  / 2,
          maxX: bx + bRect.width  / 2,
          minY: by - bRect.height / 2,
          maxY: by + bRect.height / 2,
        };
      }

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

      const mc = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.9,   // high = pill follows pointer tightly
          damping:   0.2,
          render:    { visible: false },
        },
      });
      Matter.Composite.add(world, mc);

      // Re-add touchmove: restore position tracking + only block scroll during active drag.
      const onTouchMove = (e: TouchEvent) => {
        (mouse as any).mousemove(e);   // update Matter.js cursor position during touch drag
        if (mc.body) e.preventDefault(); // only block scroll when actively dragging
      };
      container.addEventListener("touchmove", onTouchMove, { passive: false });

      // ── Drag-through fix ─────────────────────────────────────────────────────
      //
      // The problem: MouseConstraint moves bodies by pulling them toward
      // mc.mouse.position each tick (a spring). When the mouse enters the button,
      // that target is now INSIDE the button. The afterUpdate handler pushes the
      // body back out, but the spring immediately yanks it in again — causing the
      // rapid shaking/oscillation the user sees.
      //
      // Root fix (beforeUpdate): clamp mc.mouse.position to never enter the button
      // bounds BEFORE the constraint spring is applied. The body then has no target
      // inside the button and simply rests against its edge — zero oscillation.
      //
      // Safety net (afterUpdate): if a body somehow still penetrates (e.g. from a
      // fast non-drag collision), push it back out. No velocity zeroing here —
      // that was the other half of the oscillation loop.
      Matter.Events.on(engine, "beforeUpdate", () => {
        if (!mc.body) return;

        const pos = mc.mouse.position;

        // 1 — Clamp drag target within container bounds.
        //     Root cause of wall escape: MouseConstraint applies a spring toward
        //     mc.mouse.position each tick, bypassing collision resolution. A fast
        //     drag near an edge places the spring target outside the wall, pulling
        //     the body through it in a single step. Clamping the target here keeps
        //     the spring always pointing to a valid interior position.
        const margin = PILL_H / 2 + 4;
        pos.x = Math.max(margin, Math.min(W - margin, pos.x));
        pos.y = Math.max(margin, Math.min(H - margin, pos.y));

        // 2 — Clamp to stay outside button bounds (same principle as above)
        if (!buttonBounds) return;
        if (pos.x <= buttonBounds.minX || pos.x >= buttonBounds.maxX ||
            pos.y <= buttonBounds.minY || pos.y >= buttonBounds.maxY) return;

        const dL = pos.x - buttonBounds.minX;
        const dR = buttonBounds.maxX - pos.x;
        const dT = pos.y - buttonBounds.minY;
        const dB = buttonBounds.maxY - pos.y;
        const minD = Math.min(dL, dR, dT, dB);

        if      (minD === dL) pos.x = buttonBounds.minX;
        else if (minD === dR) pos.x = buttonBounds.maxX;
        else if (minD === dT) pos.y = buttonBounds.minY;
        else                  pos.y = buttonBounds.maxY;
      });

      Matter.Events.on(engine, "afterUpdate", () => {
        if (!mc.body) return;

        const b = mc.body;

        // Safety net: push dragged body back inside container if it somehow escaped.
        {
          const { min, max } = b.bounds;
          let dx = 0, dy = 0;
          if      (min.x < 0)  dx = -min.x;
          else if (max.x > W)  dx =  W - max.x;
          if      (min.y < 0)  dy = -min.y;
          else if (max.y > H)  dy =  H - max.y;
          if (dx !== 0 || dy !== 0) {
            Matter.Body.setPosition(b, { x: b.position.x + dx, y: b.position.y + dy });
          }
        }

        // Safety net: push dragged body out of button if it somehow overlaps.
        if (!buttonBounds) return;
        {
          const { min, max } = b.bounds;
          if (max.x <= buttonBounds.minX || min.x >= buttonBounds.maxX ||
              max.y <= buttonBounds.minY || min.y >= buttonBounds.maxY) return;

          const overlapL = max.x - buttonBounds.minX;
          const overlapR = buttonBounds.maxX - min.x;
          const overlapT = max.y - buttonBounds.minY;
          const overlapB = buttonBounds.maxY - min.y;
          const minOv    = Math.min(overlapL, overlapR, overlapT, overlapB);

          let dx = 0, dy = 0;
          if      (minOv === overlapL) dx = -overlapL;
          else if (minOv === overlapR) dx =  overlapR;
          else if (minOv === overlapT) dy = -overlapT;
          else                         dy =  overlapB;

          Matter.Body.setPosition(b, { x: b.position.x + dx, y: b.position.y + dy });
        }
        // No velocity zeroing — that was causing the oscillation loop.
      });

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

          // Seed a small random spin so rotation is immediately visible
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);

          (body as any)._w = w;
          (body as any)._h = PILL_H;
          (body as any)._i = i;

          bodies.push(body);
          Matter.Composite.add(world, body);
        }, i * STAGGER_MS);

        timers.push(t);
      });

      // ── rAF sync loop ────────────────────────────────────────────────────────
      let raf = 0;
      const tick = () => {
        for (const body of bodies) {
          const idx = (body as any)._i as number;
          const w   = (body as any)._w as number;
          const h   = (body as any)._h as number;
          const el  = bubbleRefs.current[idx];
          if (!el) continue;

          const { x, y } = body.position;
          el.style.transform  = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${body.angle}rad)`;
          el.style.visibility = "visible";
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      // ── Reset callback — exposed to the button ────────────────────────────────
      // Respawns every bubble at a random x position just above the top of the
      // container (matching the initial drop), so they fall in fresh.
      resetBodiesRef.current = () => {
        bodies.forEach((body, idx) => {
          const w  = (body as any)._w as number;
          const lo = w / 2 + 8;
          const hi = W - w / 2 - 8;
          const x  = lo + Math.random() * Math.max(0, hi - lo);
          // Stagger above the top so they don't all collide mid-air
          const y  = -(PILL_H / 2 + 4) - idx * (PILL_H + 8);
          Matter.Body.setPosition(body, { x, y });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngle(body, 0);
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
        });
      };

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

        {/* ── Reset button — inlaid/recessed tactile feel ──────────────────────── */}
        <button
          ref={buttonRef}
          onClick={() => {
            setSpinKey((k) => k + 1);
            resetBodiesRef.current?.();
          }}
          onMouseEnter={() => { setIsHovered(true);  setIsActive(false); }}
          onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={()   => setIsActive(false)}
          onFocus={(e)    => { e.currentTarget.style.outline = "2px solid rgba(0,0,0,0.5)"; e.currentTarget.style.outlineOffset = "3px"; }}
          onBlur={(e)     => { e.currentTarget.style.outline = "none"; }}
          style={{
            // ── Layout ──────────────────────────────────────────────────────
            marginTop:     "clamp(20px, 3vw, 32px)",
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "15px",
            padding:       "13px 25px",
            borderRadius:  "20px",
            border:        "none",
            cursor:        "pointer",
            pointerEvents: "auto",
            userSelect:    "none",

            // ── Typography ──────────────────────────────────────────────────
            fontFamily:    "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize:      "20px",
            fontWeight:    400,
            letterSpacing: "-0.4px",
            lineHeight:    1.31,
            color:         "#000000",

            // ── Background — same green in all states; depth is shadows only ──
            backgroundColor: "#b2e639",

            // ── Lift / press transform ───────────────────────────────────────
            transform: isActive
              ? "translateY(1px)"
              : isHovered
              ? "translateY(-2px)"
              : "translateY(0px)",

            // ── Layered shadow system (4 layers, same count across states) ───
            //
            // Layers 1–2: inset  → recessed/carved feel (Figma "inner" spec)
            // Layers 3–4: outset → lifted/elevated feel  (Figma "outer" spec)
            // States cross-fade by zeroing whichever pair is inactive.
            //
            // Default → inset ON,  outset OFF
            // Hover   → inset OFF, outset ON
            // Active  → inset ON (stronger), outset OFF
            boxShadow: isActive
              ? [
                  "inset 0px -1px 40px 0px rgba(0,0,0,0.35)", // stronger bottom inset (pressed deeper)
                  "inset 0px 5px 6px 0px rgba(0,0,0,0.45)",   // stronger top inset
                  "0px 0px 0px 0px rgba(0,0,0,0)",            // outset ambient — off
                  "0px 0px 0px 0px rgba(0,0,0,0)",            // outset drop — off
                ].join(", ")
              : isHovered
              ? [
                  "inset 0px 0px 0px 0px rgba(0,0,0,0)",      // inset bottom — off
                  "inset 0px 0px 0px 0px rgba(0,0,0,0)",      // inset top — off
                  "0px 0px 53.6px 0px rgba(0,0,0,0.25)",      // outset ambient glow (Figma spec)
                  "0px 4px 7px 0px rgba(0,0,0,0.25)",         // outset drop shadow (Figma spec)
                ].join(", ")
              : [
                  "inset 0px -1px 40px 0px rgba(0,0,0,0.25)", // inset bottom spread (Figma spec)
                  "inset 0px 4px 4px 0px rgba(0,0,0,0.35)",   // inset top (Figma spec)
                  "0px 0px 0px 0px rgba(0,0,0,0)",            // outset ambient — off
                  "0px 0px 0px 0px rgba(0,0,0,0)",            // outset drop — off
                ].join(", "),

            // ── Transitions ─────────────────────────────────────────────────
            transition: [
              "box-shadow 200ms ease",
              "transform 130ms ease",
            ].join(", "),
          }}
        >
          {/* Reset icon — 300° circle arc + arrowhead, spins on click */}
          <motion.svg
            key={spinKey}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
            style={{ flexShrink: 0 }}
          >
            {/* 300° arc: from top (10,3), CCW on screen, ending upper-right (16,6.5) */}
            <path
              d="M10 3A7 7 0 1 0 16 6.5"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Arrowhead V at arc end (16,6.5) — tails point upper-left and upper-right */}
            <path
              d="M13.5 4.5L16 6.5L18 4.5"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>

          {/* Label — always underlined per Figma spec */}
          <span style={{ textDecoration: "underline" }}>
            Reset
          </span>
        </button>
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
                fontSize:      "14px",
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
