"use client";

import { useState, useEffect, useRef } from "react";

// ── Nav icons (local — permanent) ─────────────────────────────────────────
const IMG_MAIN_DASH     = "/images/compose/icons/main-dash.svg";
const IMG_PROJECTS      = "/images/compose/icons/project.svg";
const IMG_PROFILE       = "/images/compose/icons/profile.svg";
const IMG_SETTINGS      = "/images/compose/icons/settings.svg";
const IMG_PLUS_NEW      = "/images/compose/icons/plus.svg";
const IMG_PLUS          = "/images/compose/icons/plus.svg";
const IMG_PLUS_TILE     = "/images/compose/icons/plus.svg";
const IMG_ADD_ICON      = "/images/compose/icons/plus.svg";
const IMG_PLUS_CIRCLE   = "/images/compose/icons/plus.svg";
// ── Figma asset URLs (valid 7 days — replace if stale) ────────────────────
const IMG_GOOGLE        = "/images/compose/icons/google-logo.svg";
const IMG_GOOGLE_NEW    = "/images/compose/icons/google-logo.svg";
const IMG_UPGRADE_NEW   = "https://www.figma.com/api/mcp/asset/35ae6aa9-81bb-43bc-b1d4-9b17b46a2994";
const IMG_HISTORY_RND   = "https://www.figma.com/api/mcp/asset/ac8fa52e-436a-4f6c-ae8b-b7cf2ee46e55";
const IMG_PROJECTS_LINE = "https://www.figma.com/api/mcp/asset/a1543df7-078e-4e17-a3d0-41113e95804f";
const IMG_EVENT_OUTLINE = "https://www.figma.com/api/mcp/asset/d75b74f0-9d2c-4bc5-b607-5a503684574e";
const IMG_EDIT_OUTLINE  = "https://www.figma.com/api/mcp/asset/b0f7c2c2-d4c6-48fb-af4c-05606664990b";
const IMG_DUPLICATE_VEC = "https://www.figma.com/api/mcp/asset/d970fabb-9486-434e-a09b-f640d0adaffc";
const IMG_CARET_DOWN    = "https://www.figma.com/api/mcp/asset/5804cbb2-1d1e-47fa-a3fc-b62f9e074ae1";
const IMG_LOADING_ICON  = "https://www.figma.com/api/mcp/asset/c3522668-4551-40e3-b2a2-4088f2f4de07";
const IMG_LOGOUT_RND    = "https://www.figma.com/api/mcp/asset/45804497-5413-4877-ab3d-aed7e33e75ce";
const IMG_PROFILE_ICON  = "https://www.figma.com/api/mcp/asset/becd4ada-7f28-4c43-9ac6-94616e9edba0";
const IMG_BAND_LOGO_ED  = "/images/compose/icons/band-logo.png";
const IMG_DIVIDER_LINE  = "https://www.figma.com/api/mcp/asset/32185413-237f-4dbc-bd8e-cfe5eb3b2011";
const IMG_APPLE_LOGO    = "/images/compose/icons/apple-logo.svg";
const IMG_EDIT_BTN_ICON = "https://www.figma.com/api/mcp/asset/7ce5aaba-ceaa-4020-a6a0-ae0545b2af43";
const IMG_PROJECTS_TILE = "https://www.figma.com/api/mcp/asset/0232f7d4-083b-47b9-b907-e6b4f14abee9";
const IMG_HISTORY       = "https://www.figma.com/api/mcp/asset/944e33f1-faeb-4259-b9b1-2a08904ae5e2";
const IMG_LOGOUT        = "https://www.figma.com/api/mcp/asset/2ac9ac49-2888-4ec7-83fc-81a01d1f84dc";
const IMG_UPGRADE       = "https://www.figma.com/api/mcp/asset/c29709ce-70a2-40b7-b222-d6ebfc183441";
const IMG_EDIT          = "https://www.figma.com/api/mcp/asset/b169f7f2-9d1d-466b-b196-ec583cdcdfd7";
const IMG_BAND_LOGO     = "/images/compose/icons/band-logo.png";
const IMG_CALENDAR      = "https://www.figma.com/api/mcp/asset/b0b10f69-f24d-4d14-91f0-c8f4772789b9";
const IMG_DUPLICATE     = "https://www.figma.com/api/mcp/asset/03875553-d699-463c-be2d-56ade500f231";
// Field category icons
const IMG_CAT_CORE    = "https://www.figma.com/api/mcp/asset/b6547287-d285-497a-9287-1341d48af809";
const IMG_CAT_SECTION = "https://www.figma.com/api/mcp/asset/0487798e-5f74-445d-86be-24a47982fab0";
const IMG_CAT_MUSIC   = "https://www.figma.com/api/mcp/asset/62973c52-a44a-4c92-9123-bd5e79102feb";

// ── Design constants ──────────────────────────────────────────────────────
const ROBOTO  = "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif";
const SF      = "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif";
const CANVAS_W = 1440;
const CANVAS_H = 900;

// ── Scaled canvas wrapper ─────────────────────────────────────────────────
function ScaledCanvas({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const s = Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "relative",
          backgroundColor: "#ffffff",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Apple logo (Figma asset) ───────────────────────────────────────────────
function AppleLogo() {
  return <img src={IMG_APPLE_LOGO} alt="" aria-hidden="true" style={{ width: 19, height: 22, display: "block" }} />;
}

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 1 — LOGIN
// ─────────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [signingIn, setSigningIn] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleLogin = () => {
    if (signingIn) return;
    setSigningIn(true);
    setProgress(8);

    let p = 8;
    intervalRef.current = setInterval(() => {
      p += 5 + Math.random() * 9;
      if (p >= 100) {
        p = 100;
        setProgress(p);
        clearInterval(intervalRef.current!);
        setTimeout(onLogin, 420);
      } else {
        setProgress(p);
      }
    }, 110);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const EASE = "cubic-bezier(0.25, 0, 0, 1)";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: 1037,
          height: 351,
          backgroundColor: "#f1f5f9",
          borderRadius: 20,
          boxShadow: "20px 20px 0px 0px #cbd5e1",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left: welcome copy */}
        <div
          style={{
            position: "absolute",
            left: 55,
            top: "50%",
            transform: "translateY(-50%)",
            width: 394,
          }}
        >
          <h1 style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 48, lineHeight: "54px", color: "#374151", margin: "0 0 4px", letterSpacing: "-0.5px" }}>
            Welcome, Scotty
          </h1>
          <p style={{ fontFamily: ROBOTO, fontWeight: 400, fontSize: 21, lineHeight: "32px", color: "rgba(55,65,81,0.6)", margin: 0 }}>
            Please choose from the following options
          </p>
        </div>

        {/* Right: auth buttons — slide down & fade out on sign-in */}
        <div
          style={{
            position: "absolute",
            left: 507,
            top: 102.5,
            width: 475,
            display: "flex",
            flexDirection: "column",
            gap: 9,
            transform: signingIn ? "translateY(300px)" : "translateY(0)",
            opacity: signingIn ? 0 : 1,
            transition: `transform 440ms ${EASE}, opacity 260ms ease`,
          }}
        >
          {/* Apple */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%", height: 54, backgroundColor: "#000", border: "1px solid #4d4d4d",
              borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative", padding: "0 15px",
            }}
          >
            <span style={{ position: "absolute", left: 15, display: "flex", alignItems: "center" }}>
              <AppleLogo />
            </span>
            <span style={{ fontFamily: SF, fontWeight: 600, fontSize: 17, color: "#fff", whiteSpace: "nowrap" }}>
              Continue with Apple
            </span>
          </button>

          {/* Google */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%", height: 54, backgroundColor: "#f7f7f7", border: "1px solid #4d4d4d",
              borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative", padding: "0 15px",
            }}
          >
            <span style={{ position: "absolute", left: 13, width: 22, height: 22, display: "flex", alignItems: "center" }}>
              <img src={IMG_GOOGLE_NEW} alt="Google" style={{ width: 22, height: 22 }} />
            </span>
            <span style={{ fontFamily: SF, fontWeight: 600, fontSize: 17, color: "#000", whiteSpace: "nowrap" }}>
              Continue with Google
            </span>
          </button>

          {/* Email */}
          <button
            onClick={handleLogin}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "right" }}
          >
            <span style={{ fontFamily: ROBOTO, fontSize: 14, lineHeight: "20px", color: "#334155", textDecoration: "underline" }}>
              Use email instead
            </span>
          </button>
        </div>

        {/* Loading bar — slides down from above, centered on sign-in */}
        <div
          style={{
            position: "absolute",
            right: 97,
            top: "50%",
            width: 387,
            height: 41,
            transform: signingIn ? "translateY(-50%)" : "translateY(calc(-50% - 300px))",
            opacity: signingIn ? 1 : 0,
            transition: `transform 440ms ${EASE} 60ms, opacity 220ms ease 80ms`,
          }}
        >
          {/* Progress track */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 10,
              backgroundColor: "#e5e7eb",
              borderRadius: 9999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                backgroundColor: "#1f2937",
                borderRadius: 9999,
                transition: "width 110ms linear",
              }}
            />
          </div>
          {/* Label */}
          <div
            style={{
              position: "absolute",
              top: "37%",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p style={{ fontFamily: ROBOTO, fontSize: 17.6, color: "#1f2937", margin: 0, whiteSpace: "nowrap" }}>
              Signing in...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 2 — MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────

// Sidebar nav item
function NavItem({
  icon, label, active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 4, padding: 4,
        borderRadius: 8, cursor: "pointer",
        backgroundColor: active ? "#cbd5e1" : "transparent",
      }}
    >
      <span style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </span>
      <span style={{ fontFamily: ROBOTO, fontSize: 16, lineHeight: "16px", color: "#1f2937", whiteSpace: "nowrap" }}>
        {label}
      </span>
    </div>
  );
}

function Sidebar({
  onLogout, onMainDash, onGoToEditor, onContextMenuEvent, events = [], activeEventId, mainDashActive = true,
}: {
  onLogout: () => void;
  onMainDash?: () => void;
  onGoToEditor?: (eventId: string) => void;
  onContextMenuEvent?: (e: React.MouseEvent, eventId: string) => void;
  events?: EventData[];
  activeEventId?: string;
  mainDashActive?: boolean;
}) {
  return (
    <div
      style={{
        width: 259, flexShrink: 0, height: "100%",
        backgroundColor: "#f1f5f9",
        borderRadius: "0 20px 20px 0",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "30px 40px",
        boxSizing: "border-box" as const,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        {/* Main Dash */}
        <div onClick={onMainDash} style={{ cursor: onMainDash ? "pointer" : "default" }}>
          <NavItem
            active={mainDashActive}
            icon={<img src={IMG_MAIN_DASH} alt="" style={{ width: 24, height: 24 }} />}
            label="Main Dash"
          />
        </div>

        {/* Events section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 20, lineHeight: "16px", color: "#1f2937" }}>
            Events
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {events.map(ev => (
              <div
                key={ev.id}
                onClick={() => onGoToEditor?.(ev.id)}
                onContextMenu={onContextMenuEvent ? e => onContextMenuEvent(e, ev.id) : undefined}
                style={{ cursor: onGoToEditor ? "pointer" : "default" }}
              >
                <NavItem
                  active={activeEventId === ev.id}
                  icon={<img src={IMG_PROJECTS} alt="" style={{ width: 24, height: 24 }} />}
                  label={ev.title || "Untitled"}
                />
              </div>
            ))}
          </div>
        </div>

        <NavItem icon={<img src={IMG_PROFILE} alt="" style={{ width: 24, height: 24 }} />} label="Profile" />
        <NavItem icon={<img src={IMG_SETTINGS} alt="" style={{ width: 24, height: 24 }} />} label="Settings" />
      </div>

      {/* Log Out */}
      <button
        onClick={onLogout}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
      >
        <img src={IMG_LOGOUT} alt="" style={{ width: 24, height: 24 }} />
        <span style={{ fontFamily: ROBOTO, fontSize: 16, color: "#1f2937" }}>Log Out</span>
      </button>
    </div>
  );
}

// Action button — 3 Figma variants: default #e2e8f0 → hover #cbd5e1 → pressed #94a3b8
function ActionBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  const [state, setState] = useState<"default" | "hover" | "pressed">("default");
  const bg = state === "pressed" ? "#94a3b8" : state === "hover" ? "#cbd5e1" : "#e2e8f0";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onMouseDown={() => setState("pressed")}
      onMouseUp={() => setState("hover")}
      style={{
        flex: 1, height: 64,
        backgroundColor: bg,
        border: "1px solid #d1d5db",
        borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 8, cursor: "pointer", padding: "0 24px",
        transition: "background-color 180ms cubic-bezier(0.25, 0, 0, 1)",
      }}
    >
      <img src={IMG_EDIT_BTN_ICON} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
      <span style={{ fontFamily: ROBOTO, fontSize: 16, color: "#0f172a", whiteSpace: "nowrap" }}>
        {label}
      </span>
    </button>
  );
}

// ── Shared type for edit tabs ─────────────────────────────────────────────
type EditMode = "program" | "students" | "summer";

// ── New project card (3 variants: default → hover → pressed) ─────────────
function NewProjectCard({ onClick }: { onClick?: () => void }) {
  const [state, setState] = useState<"default" | "hover" | "pressed">("default");

  const bg = state === "pressed" ? "#94a3b8" : state === "hover" ? "#cbd5e1" : "#f1f5f9";
  const textColor = state === "pressed" ? "#f8fafc" : "#0f172a";
  const subColor  = state === "pressed" ? "#f8fafc" : "#1f2937";
  const btnBg     = state === "pressed" ? "#e2e8f0" : "#1e293b";
  const btnText   = state === "pressed" ? "#1e293b" : "#c7d2fe";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("default")}
      onMouseDown={() => setState("pressed")}
      onMouseUp={() => setState("hover")}
      style={{
        flex: 1, width: "100%", backgroundColor: bg,
        borderRadius: 20, border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 45, padding: 16,
        transition: "background-color 200ms cubic-bezier(0.25, 0, 0, 1)",
      }}
    >
      <img src={IMG_PLUS_NEW} alt="" style={{ width: 72, height: 72 }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30, width: "100%" }}>
        <span style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 36, lineHeight: "40px", color: textColor, whiteSpace: "nowrap", transition: "color 200ms ease" }}>
          Start New Project
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
          <span style={{ fontFamily: ROBOTO, fontSize: 16, color: subColor, whiteSpace: "nowrap", transition: "color 200ms ease" }}>
            You have 3 free projects remaining.
          </span>
          <div
            style={{
              width: "100%", backgroundColor: btnBg, borderRadius: 8,
              padding: "6px 12px", display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, transition: "background-color 200ms ease",
            }}
          >
            <img src={IMG_UPGRADE_NEW} alt="" style={{ width: 24, height: 24 }} />
            <span style={{ fontFamily: ROBOTO, fontSize: 14, lineHeight: "20px", color: btnText, transition: "color 200ms ease" }}>
              Upgrade to Pro to create more.
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function DashboardScreen({
  onLogout, onGoToEditor, events, onDuplicateEvent, onCreateEvent,
}: {
  onLogout: () => void;
  onGoToEditor: (tab: EditMode, eventId?: string) => void;
  events: EventData[];
  onDuplicateEvent: (id: string) => void;
  onCreateEvent: () => void;
}) {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#ffffff", display: "flex", overflow: "hidden" }}>
      <Sidebar onLogout={onLogout} onMainDash={() => {}} onGoToEditor={id => onGoToEditor("program", id)} events={events} />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "28px 32px", gap: 20, overflow: "hidden" }}>

        {/* Header card */}
        <div style={{ backgroundColor: "#f1f5f9", borderRadius: 20, padding: "36px 45px", flexShrink: 0 }}>
          <h1 style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 48, lineHeight: "54px", color: "#374151", margin: "0 0 4px", letterSpacing: "-0.4px" }}>
            Good Afternoon, Scotty
          </h1>
          <p style={{ fontFamily: ROBOTO, fontSize: 21, lineHeight: "32px", color: "rgba(55,65,81,0.6)", margin: 0 }}>
            Start a new project or edit an existing one
          </p>
        </div>

        {/* Two-column content */}
        <div style={{ flex: 1, display: "flex", gap: 20, minHeight: 0 }}>

          {/* Left: Start Fresh */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 362, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ backgroundColor: "#f1f5f9", borderRadius: 200, padding: 5, display: "flex" }}>
                <img src={IMG_HISTORY} alt="" style={{ width: 20, height: 20 }} />
              </div>
              <span style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 24, lineHeight: "32px", color: "#1f2937" }}>Start Fresh</span>
            </div>
            <NewProjectCard onClick={onCreateEvent} />
          </div>

          {/* Right: My Events — dynamic, one card per event */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <div style={{ backgroundColor: "#f1f5f9", borderRadius: 200, padding: 5, display: "flex" }}>
                <img src={IMG_CALENDAR} alt="" style={{ width: 24, height: 24 }} />
              </div>
              <span style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 24, lineHeight: "32px", color: "#1f2937" }}>My Events</span>
            </div>

            {/* Scrollable event cards */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, paddingRight: 4 }}>
              {events.map(ev => (
                <div
                  key={ev.id}
                  style={{ backgroundColor: "#f1f5f9", borderRadius: 20, padding: 30, display: "flex", flexDirection: "column", gap: 24, flexShrink: 0 }}
                >
                  {/* Top bar */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#e2e8f0", borderRadius: 9999, padding: "6px 12px 6px 8px" }}>
                      <img src={IMG_EDIT} alt="" style={{ width: 22, height: 22 }} />
                      <span style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" as const }}>
                        {ev.time && (
                          <span style={{ fontFamily: ROBOTO, fontSize: 15, color: "#64748b", border: "1px solid #64748b", borderRadius: 9999, padding: "2px 14px" }}>
                            {ev.time}
                          </span>
                        )}
                        {ev.location && (
                          <span style={{ fontFamily: ROBOTO, fontSize: 15, color: "#64748b", border: "1px solid #64748b", borderRadius: 9999, padding: "2px 14px" }}>
                            {ev.location}
                          </span>
                        )}
                      </span>
                    </div>
                    <button
                      onClick={() => onDuplicateEvent(ev.id)}
                      style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#f1f5f9", border: "1px solid #64748b", borderRadius: 100, padding: "8px 14px", cursor: "pointer" }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#e2e8f0"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                    >
                      <span style={{ fontFamily: ROBOTO, fontSize: 15, color: "#64748b" }}>Duplicate</span>
                      <img src={IMG_DUPLICATE} alt="" style={{ width: 16, height: 16 }} />
                    </button>
                  </div>

                  {/* Program info */}
                  <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
                    <img src={ev.logoUrl ?? IMG_BAND_LOGO} alt={ev.title} style={{ width: 100, height: 100, objectFit: "contain", flexShrink: 0, borderRadius: 8 }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {ev.subtitle && <span style={{ fontFamily: ROBOTO, fontSize: 16, color: "#475569" }}>{ev.subtitle}</span>}
                      <span style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 36, lineHeight: "42px", color: "#0f172a", letterSpacing: "-0.5px" }}>{ev.title || "Untitled"}</span>
                      {ev.description && <span style={{ fontFamily: ROBOTO, fontSize: 14, color: "#1f2937" }}>{ev.description}</span>}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", gap: 10 }}>
                      <ActionBtn label="Edit Program"      onClick={() => onGoToEditor("program",  ev.id)} />
                      <ActionBtn label="Edit More Info"    onClick={() => onGoToEditor("program",  ev.id)} />
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <ActionBtn label="Edit Student Names" onClick={() => onGoToEditor("students", ev.id)} />
                      <ActionBtn label="Add new section"    onClick={() => onGoToEditor("program",  ev.id)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 3 — EDIT PROGRAM (field-based customization system)
// ─────────────────────────────────────────────────────────────────────────

// ── Data types ─────────────────────────────────────────────────────────────
type FieldType =
  | "ensemble_name" | "director_conductor" | "program_notes"
  | "section_title" | "section_subtitle"
  | "piece_title" | "composer" | "arranger" | "movements" | "duration" | "piece_program_notes";

interface FieldInstance { id: string; type: FieldType; value: string; }
interface Section  { id: string; fields: FieldInstance[]; }
interface EventData {
  id: string; title: string; subtitle: string; location: string;
  description: string; time: string; programTitle: string; logoUrl: string | null; sections: Section[];
}
function uid() { return Math.random().toString(36).slice(2, 9); }

// ── Field catalog ─────────────────────────────────────────────────────────
interface FieldDef { type: FieldType; label: string; placeholder: string; multiline?: boolean; }
interface FieldCategory { category: string; icon: string; fields: FieldDef[]; }

const FIELD_CATALOG: FieldCategory[] = [
  {
    category: "Core Info",
    icon: IMG_CAT_CORE,
    fields: [
      { type: "ensemble_name",      label: "Ensemble Name",        placeholder: "LHS Concert Band" },
      { type: "director_conductor", label: "Director / Conductor", placeholder: "Mike Jones" },
      { type: "program_notes",      label: "Program Notes",        placeholder: "Notes about this section...", multiline: true },
    ],
  },
  {
    category: "Section Info",
    icon: IMG_CAT_SECTION,
    fields: [
      { type: "section_title",    label: "Section Title",    placeholder: "Concert Band" },
      { type: "section_subtitle", label: "Section Subtitle", placeholder: "Opening Set" },
    ],
  },
  {
    category: "Music Info",
    icon: IMG_CAT_MUSIC,
    fields: [
      { type: "piece_title",         label: "Piece Title",  placeholder: "The Darklands Symphony for band" },
      { type: "composer",            label: "Composer",     placeholder: "Randall D. Standridge" },
      { type: "arranger",            label: "Arranger",     placeholder: "Arr. by..." },
      { type: "movements",           label: "Movements",    placeholder: "I. First Movement\nII. Second Movement", multiline: true },
      { type: "duration",            label: "Duration",     placeholder: "4:30" },
      { type: "piece_program_notes", label: "Piece Notes",  placeholder: "Program notes for this piece...", multiline: true },
    ],
  },
];

function getFieldDef(type: FieldType): FieldDef {
  return FIELD_CATALOG.flatMap(c => c.fields).find(f => f.type === type)!;
}

// ── Seed data ──────────────────────────────────────────────────────────────
const SEED_EVENTS: EventData[] = [
  {
    id: "feb", title: "February Concert",
    subtitle: "The Lawrence High School Band Presents,",
    location: "Lawrence High School Auditorium",
    description: "A Tradition of Excellence Since 1922",
    time: "7:30 PM", programTitle: "Program", logoUrl: IMG_BAND_LOGO_ED,
    sections: [
      {
        id: "s1",
        fields: [
          { id: "f1",  type: "ensemble_name",      value: "LHS Concert Band" },
          { id: "f2",  type: "director_conductor",  value: "Mike Jones" },
          { id: "f3",  type: "piece_title",         value: "The Darklands Symphony for band" },
          { id: "f4",  type: "composer",            value: "Randall D. Standridge" },
          { id: "f5",  type: "movements",           value: "I. Darklands March\nII. Dance of the mad Prince\nIII. The Serpent Priest and the Black Bell\nIV. The Queen's Masque\nV. DarkHeart (Escape from DarkHeart Castle)" },
        ],
      },
      {
        id: "s2",
        fields: [
          { id: "f6",  type: "ensemble_name",      value: "LHS Symphonic Band" },
          { id: "f7",  type: "director_conductor",  value: "Sam Parrilla" },
          { id: "f8",  type: "piece_title",         value: "Shadow Cove March" },
          { id: "f9",  type: "composer",            value: "Randall D. Standridge" },
          { id: "f10", type: "piece_title",         value: "A Shaker Gift Song" },
          { id: "f11", type: "composer",            value: "Frank Ticheli" },
          { id: "f12", type: "piece_title",         value: "Stone Mountain Fantasy" },
          { id: "f13", type: "composer",            value: "Ed Huckeby" },
        ],
      },
      {
        id: "s3",
        fields: [
          { id: "f14", type: "ensemble_name",      value: "LHS Wind Ensemble" },
          { id: "f15", type: "director_conductor",  value: "Mike Jones" },
          { id: "f16", type: "piece_title",         value: "Fanfare for the Old School" },
          { id: "f17", type: "composer",            value: "Mike Jones" },
          { id: "f18", type: "piece_title",         value: "Amazing Grace" },
          { id: "f19", type: "composer",            value: "Frank Tichel" },
          { id: "f20", type: "piece_title",         value: "Selections from \"Princess Mononoke\"" },
          { id: "f21", type: "composer",            value: "Joe Hisaishi / arr. Kazuhiro Morita" },
          { id: "f22", type: "piece_title",         value: "Emblem of Unity" },
          { id: "f23", type: "composer",            value: "J.J. Richards / ed. James Swearingen" },
        ],
      },
    ],
  },
  {
    id: "oct", title: "October 2025",
    subtitle: "The Lawrence High School Band Presents,",
    location: "Lawrence High School Auditorium",
    description: "",
    time: "7:00 PM", programTitle: "Program", logoUrl: IMG_BAND_LOGO_ED,
    sections: [],
  },
];

// ── Style constants ─────────────────────────────────────────────────────────
const fieldStyle: React.CSSProperties = {
  fontFamily: "'Roboto', sans-serif", fontSize: 14, color: "#1e293b",
  backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 11,
  padding: "12px 14px", outline: "none", boxSizing: "border-box" as const, width: "100%",
};
const darkBtnStyle: React.CSSProperties = {
  backgroundColor: "#1e293b", border: "none", borderRadius: 8,
  padding: "6px 12px", cursor: "pointer", width: "100%",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  fontFamily: "'Roboto', sans-serif", fontSize: 14, color: "#ffffff",
  transition: "background-color 150ms ease",
};
const darkBtnHover = (e: React.MouseEvent<HTMLButtonElement>, hover: boolean) => {
  (e.currentTarget as HTMLButtonElement).style.backgroundColor = hover ? "#334155" : "#1e293b";
};

// ── TxtInput ───────────────────────────────────────────────────────────────
function TxtInput({ value, onChange, onFocus, placeholder, label, style }: {
  value: string; onChange: (v: string) => void; onFocus?: () => void;
  placeholder?: string; label?: string; style?: React.CSSProperties;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
      {label && <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 11, fontWeight: 500, color: "#64748b", letterSpacing: "0.01em" }}>{label}</span>}
      <input
        type="text" value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        style={{ ...fieldStyle, ...style }}
      />
    </div>
  );
}

// ── ProgramPhonePreview ────────────────────────────────────────────────────
function ProgramPhonePreview({ event, highlightId }: { event: EventData; highlightId: string | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs  = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!highlightId) return;
    const el        = cardRefs.current[highlightId];
    const container = scrollRef.current;
    if (!el || !container) return;
    container.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
  }, [highlightId]);

  const cardStyle = (id: string): React.CSSProperties => {
    const lit = highlightId === id;
    return {
      backgroundColor: lit ? "#e0e7ff" : "#f1f5f9",
      borderRadius: 8,
      boxShadow: lit ? "0 0 0 3px #4338ca" : "none",
      transition: "background-color 400ms ease, box-shadow 400ms ease",
    };
  };

  const outlineBadge: React.CSSProperties = {
    border: "1px solid #64748b", borderRadius: 9999, padding: "0 8px",
    fontFamily: ROBOTO, fontSize: 12, color: "#64748b", lineHeight: "20px",
    whiteSpace: "nowrap" as const, display: "inline-block",
  };
  const darkBadge: React.CSSProperties = {
    backgroundColor: "#334155", borderRadius: 9999, padding: "0 10px",
    fontFamily: ROBOTO, fontSize: 12, color: "#c7d2fe", lineHeight: "20px",
    whiteSpace: "nowrap" as const, display: "inline-block",
  };
  const previewBtn: React.CSSProperties = {
    flex: 1, backgroundColor: "#1e293b", border: "1px solid #4338ca",
    borderRadius: 8, padding: "14px 16px", cursor: "default",
    fontFamily: ROBOTO, fontSize: 14, color: "#c7d2fe", textAlign: "center" as const,
  };

  // Badge-type fields rendered as dark pills
  const BADGE_TYPES: FieldType[] = ["ensemble_name", "director_conductor"];

  return (
    <div style={{
      width: 402,
      backgroundColor: "#fff", borderRadius: 30,
      boxShadow: "5px 8px 31.8px 0px rgba(0,0,0,0.25)",
      overflow: "hidden",
    }}>
      <div ref={scrollRef} style={{ overflowY: "auto", maxHeight: 840, padding: "50px 16px 95px" }}>

        {/* Breadcrumbs */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 20 }}>
          <span style={{ fontFamily: ROBOTO, fontSize: 14, color: "#374151" }}>{event.title || "Event"}</span>
          <span style={{ fontFamily: ROBOTO, fontSize: 14, color: "#9ca3af", margin: "0 2px" }}>›</span>
          <span style={{ fontFamily: ROBOTO, fontSize: 14, color: "#374151" }}>Program</span>
        </div>

        {/* Hero card */}
        <div
          ref={el => { cardRefs.current["hero"] = el; }}
          style={{ ...cardStyle("hero"), padding: 16, display: "flex", flexDirection: "column", gap: 45, marginBottom: 16 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            <img src={event.logoUrl ?? IMG_BAND_LOGO_ED} alt="" style={{ width: 113, height: 120, objectFit: "contain" }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {event.time     && <span style={outlineBadge}>{event.time}</span>}
              {event.location && <span style={outlineBadge}>{event.location}</span>}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
            {event.subtitle    && <p style={{ fontFamily: ROBOTO, fontSize: 16, color: "#475569", textAlign: "center" as const, margin: 0 }}>{event.subtitle}</p>}
            <p style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 36, lineHeight: "40px", color: "#0f172a", margin: 0 }}>{event.programTitle || "Program"}</p>
            {event.description && <p style={{ fontFamily: ROBOTO, fontSize: 12, color: "#475569", margin: 0 }}>{event.description}</p>}
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <button style={previewBtn}>Find Your Student</button>
            <button style={previewBtn}>Summer Schedules</button>
          </div>
        </div>

        {/* Per-section cards */}
        {event.sections.map(section => {
          const hasContent = section.fields.some(f => f.value);
          if (!hasContent) return null;

          const badgeFields = section.fields.filter(f => BADGE_TYPES.includes(f.type) && f.value);
          const bodyFields  = section.fields.filter(f => !BADGE_TYPES.includes(f.type));

          return (
            <div
              key={section.id}
              ref={el => { cardRefs.current[section.id] = el; }}
              style={{ ...cardStyle(section.id), padding: "34px 16px", marginBottom: 16 }}
            >
              {/* Badge row */}
              {badgeFields.length > 0 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                  {badgeFields.map(f => <span key={f.id} style={darkBadge}>{f.value}</span>)}
                </div>
              )}

              {/* Body fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {bodyFields.map(f => {
                  if (!f.value) return null;

                  if (f.type === "section_title") {
                    return <p key={f.id} style={{ fontFamily: ROBOTO, fontWeight: 700, fontSize: 20, color: "#0f172a", margin: 0 }}>{f.value}</p>;
                  }
                  if (f.type === "section_subtitle") {
                    return <p key={f.id} style={{ fontFamily: ROBOTO, fontSize: 14, color: "#475569", margin: 0 }}>{f.value}</p>;
                  }
                  if (f.type === "piece_title") {
                    return <p key={f.id} style={{ fontFamily: ROBOTO, fontWeight: 500, fontSize: 28, lineHeight: "36px", color: "#0f172a", margin: "8px 0 0" }}>{f.value}</p>;
                  }
                  if (f.type === "composer") {
                    return <p key={f.id} style={{ fontFamily: ROBOTO, fontSize: 12, color: "#475569", margin: 0 }}>Composed by: {f.value}</p>;
                  }
                  if (f.type === "arranger") {
                    return <p key={f.id} style={{ fontFamily: ROBOTO, fontSize: 12, color: "#475569", margin: 0 }}>Arr. by: {f.value}</p>;
                  }
                  if (f.type === "duration") {
                    return <p key={f.id} style={{ fontFamily: ROBOTO, fontSize: 11, color: "#94a3b8", margin: 0 }}>{f.value}</p>;
                  }
                  if (f.type === "movements") {
                    return (
                      <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {f.value.split("\n").filter(Boolean).map((line, i) => (
                          <p key={i} style={{ fontFamily: ROBOTO, fontSize: 15, lineHeight: "24px", color: "#1f2937", margin: 0 }}>{line}</p>
                        ))}
                      </div>
                    );
                  }
                  // program_notes, piece_program_notes
                  return <p key={f.id} style={{ fontFamily: ROBOTO, fontSize: 13, color: "#475569", margin: 0, fontStyle: "italic" }}>{f.value}</p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Header-pair grouping: ensemble_name + director_conductor render side-by-side ──
const HEADER_PAIR_TYPES: FieldType[] = ["ensemble_name", "director_conductor"];

type FieldRenderGroup =
  | { kind: "pair";   left: FieldInstance; right: FieldInstance }
  | { kind: "single"; field: FieldInstance };

function buildFieldGroups(fields: FieldInstance[]): FieldRenderGroup[] {
  const groups: FieldRenderGroup[] = [];
  let i = 0;
  while (i < fields.length) {
    const f = fields[i];
    if (
      HEADER_PAIR_TYPES.includes(f.type) &&
      i + 1 < fields.length &&
      HEADER_PAIR_TYPES.includes(fields[i + 1].type)
    ) {
      groups.push({ kind: "pair", left: f, right: fields[i + 1] });
      i += 2;
    } else {
      groups.push({ kind: "single", field: f });
      i++;
    }
  }
  return groups;
}

// ── TileEditor ─────────────────────────────────────────────────────────────
function TileEditor({ section, onUpdate, onHighlight }: {
  section: Section;
  onUpdate: (s: Section) => void;
  onHighlight: (id: string) => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [freshIds, setFreshIds]         = useState<Set<string>>(new Set());
  const dropdownRef                     = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const addField = (type: FieldType) => {
    const id = uid();
    onUpdate({ ...section, fields: [...section.fields, { id, type, value: "" }] });
    setFreshIds(prev => new Set([...prev, id]));
    setTimeout(() => {
      setFreshIds(prev => { const next = new Set(prev); next.delete(id); return next; });
    }, 500);
    setDropdownOpen(false);
    onHighlight(section.id);
  };

  const removeField = (id: string) => {
    onUpdate({ ...section, fields: section.fields.filter(f => f.id !== id) });
  };

  const updateField = (id: string, value: string) => {
    onUpdate({ ...section, fields: section.fields.map(f => f.id === id ? { ...f, value } : f) });
  };

  // Shared renderer for one field cell (label above input, with remove button)
  const renderFieldCell = (field: FieldInstance) => {
    const def   = getFieldDef(field.type);
    const isNew = freshIds.has(field.id);
    return (
      <div
        key={field.id}
        style={{
          display: "flex", flexDirection: "column", gap: 7, flex: 1, minWidth: 0,
          animation: isNew ? "fieldSlideIn 0.28s cubic-bezier(0.25, 0, 0, 1) both" : "none",
        }}
      >
        {/* Label + remove */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: ROBOTO, fontSize: 11, fontWeight: 500, color: "#64748b", letterSpacing: "0.01em" }}>{def.label}</span>
          <button
            onClick={() => removeField(field.id)}
            title="Remove field"
            style={{
              background: "none", border: "none", padding: "0 2px", cursor: "pointer",
              fontSize: 16, lineHeight: 1, color: "#94a3b8",
              transition: "color 120ms ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
            onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
          >
            ×
          </button>
        </div>

        {/* Input */}
        {def.multiline ? (
          <textarea
            value={field.value}
            onChange={e => updateField(field.id, e.target.value)}
            onFocus={() => onHighlight(section.id)}
            placeholder={def.placeholder}
            rows={def.type === "movements" ? 4 : 3}
            style={{ ...fieldStyle, resize: "vertical", lineHeight: "20px" }}
          />
        ) : (
          <input
            type="text"
            value={field.value}
            onChange={e => updateField(field.id, e.target.value)}
            onFocus={() => onHighlight(section.id)}
            placeholder={def.placeholder}
            style={fieldStyle}
          />
        )}
      </div>
    );
  };

  const groups = buildFieldGroups(section.fields);

  return (
    <div
      style={{
        backgroundColor: "#f1f5f9",
        border: "1px solid #e2e8f0",
        borderRadius: 18, padding: "20px 18px",
      }}
    >
      {/* Card top row: + circle button (right-aligned) + dropdown */}
      <div ref={dropdownRef} style={{ position: "relative", display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button
          onClick={() => setDropdownOpen(o => !o)}
          style={{
            width: 32, height: 32, borderRadius: "50%",
            backgroundColor: dropdownOpen ? "#1e3a8a" : "#1e293b",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.22)",
            transition: "background-color 150ms ease, transform 150ms ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#1e3a8a";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = dropdownOpen ? "#1e3a8a" : "#1e293b";
            e.currentTarget.style.transform = "scale(1)";
          }}
          title="Add field"
        >
          <img src={IMG_ADD_ICON} alt="Add field" style={{ width: 14, height: 14, filter: "brightness(0) invert(1)" }} />
        </button>

        {dropdownOpen && (
          <div
            style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0, width: 220, zIndex: 30,
              backgroundColor: "#ffffff", borderRadius: 16,
              boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #e2e8f0",
              padding: "16px",
              display: "flex", flexDirection: "column", gap: 18,
            }}
          >
            {FIELD_CATALOG.map(cat => (
              <div key={cat.category} style={{ display: "flex", flexDirection: "column", gap: 8 }}>

                {/* Category title */}
                <div style={{ display: "flex", alignItems: "center", gap: 7, paddingBottom: 2 }}>
                  <img src={cat.icon} alt="" style={{ width: 14, height: 14, opacity: 0.65 }} />
                  <span style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 11, color: "#475569", textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>
                    {cat.category}
                  </span>
                </div>

                {/* Field pills */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {cat.fields.map(def => (
                    <button
                      key={def.type}
                      onClick={() => addField(def.type)}
                      style={{
                        display: "block", width: "100%",
                        textAlign: "left", padding: "9px 12px",
                        backgroundColor: "#f1f5f9",
                        border: "1px solid transparent",
                        borderRadius: 8, cursor: "pointer",
                        fontFamily: ROBOTO, fontSize: 13, color: "#1e293b",
                        transition: "background-color 100ms ease, border-color 100ms ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = "#e0e7ff";
                        e.currentTarget.style.borderColor = "#a5b4fc";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = "#f1f5f9";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      {def.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fields list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {section.fields.length === 0 && (
          <p style={{ fontFamily: ROBOTO, fontSize: 12, color: "#94a3b8", margin: 0 }}>
            No fields yet — click + to add fields to this tile
          </p>
        )}
        {groups.map((group) => {
          if (group.kind === "pair") {
            return (
              <div key={`pair-${group.left.id}`} style={{ display: "flex", gap: 12 }}>
                {renderFieldCell(group.left)}
                {renderFieldCell(group.right)}
              </div>
            );
          }
          return renderFieldCell(group.field);
        })}
      </div>
    </div>
  );
}

// ── ProgramBuilder ─────────────────────────────────────────────────────────
function ProgramBuilder({ event, onUpdate, onHighlight }: {
  event: EventData; onUpdate: (e: EventData) => void; onHighlight: (id: string) => void;
}) {
  const addSection = () => {
    const id = uid();
    onUpdate({ ...event, sections: [...event.sections, { id, fields: [] }] });
    onHighlight(id);
  };
  const updSection = (id: string, s: Section) =>
    onUpdate({ ...event, sections: event.sections.map(sec => sec.id === id ? s : sec) });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {event.sections.length === 0 && (
        <div style={{ backgroundColor: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: 12, padding: "28px 20px", textAlign: "center" as const }}>
          <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 13, color: "#94a3b8", margin: 0 }}>
            No tiles yet. Click "+ Add New Tile" to get started.
          </p>
        </div>
      )}
      {event.sections.map(sec => (
        <TileEditor
          key={sec.id}
          section={sec}
          onUpdate={s => updSection(sec.id, s)}
          onHighlight={onHighlight}
        />
      ))}
      <button
        onClick={addSection}
        style={{
          width: "100%", height: 56, border: "none", borderRadius: 14,
          backgroundColor: "#e2e8f0", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "background-color 120ms ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#cbd5e1")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#e2e8f0")}
      >
        <img src={IMG_PROJECTS_TILE} alt="" style={{ width: 18, height: 18 }} />
        <img src={IMG_PLUS_TILE} alt="" style={{ width: 11, height: 11 }} />
        <span style={{ fontFamily: ROBOTO, fontSize: 14, color: "#0f172a" }}>Add New Tile</span>
      </button>
    </div>
  );
}

// ── EditorScreen ────────────────────────────────────────────────────────────
function EditorScreen({
  onBack, initialTab = "program",
  events, setEvents, activeId, setActiveId,
}: {
  onBack: () => void; initialTab?: EditMode;
  events: EventData[];
  setEvents: React.Dispatch<React.SetStateAction<EventData[]>>;
  activeId: string;
  setActiveId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [activeTab,    setActiveTab]    = useState<EditMode>(initialTab);
  const [saved,        setSaved]        = useState(true);
  const [highlightId,  setHighlightId]  = useState<string | null>(null);
  const [menuEventId,  setMenuEventId]  = useState<string | null>(null);
  const saveTimer      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoInput      = useRef<HTMLInputElement>(null);

  const triggerHighlight = (id: string) => {
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    setHighlightId(id);
    highlightTimer.current = setTimeout(() => setHighlightId(null), 2000);
  };

  const event = events.find(e => e.id === activeId) ?? events[0];

  const updateEvent = (fn: (ev: EventData) => EventData) => {
    setSaved(false);
    setEvents(evs => evs.map(ev => ev.id === activeId ? fn(ev) : ev));
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaved(true), 1400);
  };

  useEffect(() => () => {
    if (saveTimer.current)      clearTimeout(saveTimer.current);
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
  }, []);

  const updField = <K extends keyof EventData>(field: K, value: EventData[K]) =>
    updateEvent(ev => ({ ...ev, [field]: value }));

  const duplicateEventById = (id: string) => {
    setEvents(evs => {
      const src = evs.find(e => e.id === id);
      if (!src) return evs;
      const cloned: EventData = {
        ...src, id: uid(), title: src.title + " (Copy)",
        sections: src.sections.map(s => ({
          ...s, id: uid(),
          fields: s.fields.map(f => ({ ...f, id: uid() })),
        })),
      };
      setActiveId(cloned.id);
      return [...evs, cloned];
    });
  };

  const deleteEvent = (id: string) => {
    setEvents(evs => {
      const remaining = evs.filter(ev => ev.id !== id);
      if (remaining.length === 0) return evs;
      setActiveId(prev => prev === id ? remaining[0].id : prev);
      return remaining;
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateEvent(ev2 => ({ ...ev2, logoUrl: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const ACCENT = "#4338ca";

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#fff", display: "flex" }}>

      {/* Main — sidebar + content side by side, full height */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Sidebar — shared component, active event highlighted */}
        {menuEventId && (
          <div style={{ position: "fixed", inset: 0, zIndex: 49 }} onClick={() => setMenuEventId(null)} />
        )}
        <div style={{ position: "relative" as const, zIndex: 1 }}>
          <Sidebar
            onLogout={onBack}
            onMainDash={onBack}
            onGoToEditor={id => { setActiveId(id); setActiveTab("program"); setMenuEventId(null); }}
            onContextMenuEvent={(e, id) => { e.preventDefault(); setMenuEventId(menuEventId === id ? null : id); }}
            events={events}
            activeEventId={activeId}
            mainDashActive={false}
          />
          {/* Context-menu dropdowns — rendered over the sidebar */}
          {events.map(ev => (
            menuEventId === ev.id ? (
              <div
                key={ev.id}
                style={{
                  position: "absolute" as const, left: 259, top: 0, zIndex: 50,
                  backgroundColor: "#fff", borderRadius: 8,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)", border: "1px solid #e2e8f0",
                  overflow: "hidden", minWidth: 148,
                }}
              >
                {[
                  { label: "Duplicate", action: () => { duplicateEventById(ev.id); setMenuEventId(null); } },
                  { label: "Delete",    action: () => { deleteEvent(ev.id);         setMenuEventId(null); }, danger: true },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    style={{ display: "block", width: "100%", textAlign: "left" as const, padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: ROBOTO, fontSize: 13, color: item.danger ? "#ef4444" : "#1f2937" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = item.danger ? "#fef2f2" : "#f1f5f9")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null
          ))}
        </div>

        {/* Right column: save indicator + scrollable content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Save indicator bar */}
          <div style={{ height: 52, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 28, borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                src={IMG_LOADING_ICON}
                alt=""
                style={{
                  width: 16, height: 16,
                  opacity: saved ? 0.4 : 1,
                  transition: "opacity 300ms ease",
                  animation: saved ? "none" : "spin 0.8s linear infinite",
                }}
              />
              <span style={{ fontFamily: ROBOTO, fontSize: 13, color: saved ? "#94a3b8" : "#1f2937", transition: "color 300ms ease" }}>
                {saved ? "All changes saved" : "Saving…"}
              </span>
            </div>
          </div>

          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "30px" }}>
            <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>

              {/* Left: form column */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>

                {/* Overview card */}
                <div style={{ backgroundColor: "#f1f5f9", borderRadius: 12, padding: "20px 20px 16px" }}>
                  {/* Card header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <span style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 13, color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>Event Overview</span>
                    <button
                      onClick={() => duplicateEventById(activeId)}
                      style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "#fff", border: "1px solid #cbd5e1", borderRadius: 100, padding: "5px 10px", cursor: "pointer", flexShrink: 0 }}
                    >
                      <span style={{ fontFamily: ROBOTO, fontSize: 12, color: "#64748b" }}>Duplicate</span>
                      <img src={IMG_DUPLICATE_VEC} alt="" style={{ width: 11, height: 11 }} />
                    </button>
                  </div>

                  {/* Fields in order */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <TxtInput value={event.title}       onChange={v => updField("title", v)}       onFocus={() => triggerHighlight("hero")} placeholder="February Concert"                      label="Event Title" />
                    <TxtInput value={event.subtitle}    onChange={v => updField("subtitle", v)}    onFocus={() => triggerHighlight("hero")} placeholder="The Lawrence High School Band Presents," label="School Presenting Title" />
                    <TxtInput value={event.description} onChange={v => updField("description", v)} onFocus={() => triggerHighlight("hero")} placeholder="Spring Season"                          label="Subtitle" />
                    <div style={{ display: "flex", gap: 10 }}>
                      <TxtInput value={event.time}     onChange={v => updField("time", v)}     onFocus={() => triggerHighlight("hero")} placeholder="7:30 PM"         label="Time" />
                      <TxtInput value={event.location} onChange={v => updField("location", v)} onFocus={() => triggerHighlight("hero")} placeholder="Venue / location" label="Location" />
                    </div>

                    {/* Upload file button */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ fontFamily: ROBOTO, fontSize: 11, fontWeight: 500, color: "#64748b", letterSpacing: "0.01em" }}>Program Cover / Logo</span>
                      <input type="file" ref={logoInput} accept=".png,.jpg,.jpeg,.webp,.gif,image/*" style={{ display: "none" }} onChange={handleLogoUpload} />
                      <button
                        onClick={() => logoInput.current?.click()}
                        style={{ display: "flex", alignItems: "center", gap: 10, backgroundColor: "#fff", border: "1.5px dashed #cbd5e1", borderRadius: 8, padding: "10px 14px", cursor: "pointer", width: "100%", boxSizing: "border-box" as const }}
                      >
                        {event.logoUrl
                          ? <img src={event.logoUrl} alt="" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 4, flexShrink: 0 }} />
                          : <img src={IMG_PLUS} alt="" style={{ width: 14, height: 14, opacity: 0.5, flexShrink: 0 }} />
                        }
                        <span style={{ fontFamily: ROBOTO, fontSize: 13, color: "#64748b" }}>
                          {event.logoUrl ? "Replace image" : "Upload PNG, JPEG, or other image"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <ProgramBuilder event={event} onUpdate={updated => updateEvent(() => updated)} onHighlight={triggerHighlight} />
              </div>

              {/* Right: phone preview */}
              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 10, alignSelf: "flex-start", position: "sticky" as const, top: 0 }}>
                <span style={{ fontFamily: ROBOTO, fontWeight: 600, fontSize: 13, color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>Mobile Preview:</span>
                <ProgramPhonePreview event={event} highlightId={highlightId} />
              </div>

            </div>
          </div>
        </div>{/* end right column */}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────
type Screen = "login" | "dashboard" | "editor";

export default function ComposePrototypePage() {
  const [screen,    setScreen]    = useState<Screen>("login");
  const [editorTab, setEditorTab] = useState<EditMode>("program");
  const [events,    setEvents]    = useState<EventData[]>(SEED_EVENTS);
  const [activeId,  setActiveId]  = useState<string>(SEED_EVENTS[0].id);

  const goToEditor = (tab: EditMode, eventId?: string) => {
    setEditorTab(tab);
    if (eventId) setActiveId(eventId);
    setScreen("editor");
  };

  const duplicateEvent = (id: string) => {
    setEvents(evs => {
      const src = evs.find(e => e.id === id);
      if (!src) return evs;
      const cloned: EventData = {
        ...src, id: uid(), title: src.title + " (Copy)",
        sections: src.sections.map(s => ({
          ...s, id: uid(),
          fields: s.fields.map(f => ({ ...f, id: uid() })),
        })),
      };
      return [...evs, cloned];
    });
  };

  const createEvent = () => {
    const id = uid();
    setEvents(evs => [...evs, { id, title: "New Event", subtitle: "", location: "", description: "", time: "", programTitle: "Program", logoUrl: null, sections: [] }]);
    setActiveId(id);
    setScreen("editor");
    setEditorTab("program");
  };

  return (
    <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes fieldSlideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      input::placeholder, textarea::placeholder { opacity: 0.55; }
    `}</style>
    <ScaledCanvas>
      {screen === "login" && (
        <LoginScreen onLogin={() => setScreen("dashboard")} />
      )}
      {screen === "dashboard" && (
        <DashboardScreen
          onLogout={() => setScreen("login")}
          onGoToEditor={goToEditor}
          events={events}
          onDuplicateEvent={duplicateEvent}
          onCreateEvent={createEvent}
        />
      )}
      {screen === "editor" && (
        <EditorScreen
          onBack={() => setScreen("dashboard")}
          initialTab={editorTab}
          events={events}
          setEvents={setEvents}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      )}
    </ScaledCanvas>

    {/* Floating exit button — fixed over the prototype canvas */}
    <a
      href="/work/compose"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 9999,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 20px",
        backgroundColor: "#4338ca",
        color: "#ffffff",
        borderRadius: 10,
        textDecoration: "none",
        fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
        fontSize: "0.875rem",
        fontWeight: 500,
        letterSpacing: "0.01em",
        boxShadow: "0 4px 20px rgba(67, 56, 202, 0.40)",
        transition: "background-color 180ms ease, box-shadow 180ms ease, transform 150ms ease",
        userSelect: "none",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = "#3730a3";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(67, 56, 202, 0.55)";
        e.currentTarget.style.transform = "scale(1.04)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = "#4338ca";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(67, 56, 202, 0.40)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* Exit icon */}
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6.5 2.5H3A1.5 1.5 0 0 0 1.5 4v7A1.5 1.5 0 0 0 3 12.5h3.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 10.5L13 7.5L10 4.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 7.5H6" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
      Exit Prototype
    </a>
    </>
  );
}
