"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE = [0.25, 0, 0, 1] as [number, number, number, number];
const FONT = "var(--font-instrument-sans), 'Instrument Sans', sans-serif";
const CHAR_LIMIT = 280;
const STORAGE_KEY = "portfolio_feedback_v1";
const DUPLICATE_COOLDOWN_MS = 8000;

// ── Types ────────────────────────────────────────────────────────────────────

export interface FeedbackItem {
  id: string;
  message: string;
  timestamp: number;
}

// ── Data layer (swap this for a real API call later) ─────────────────────────

function loadFromStorage(): FeedbackItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FeedbackItem[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: FeedbackItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota exceeded — fail silently
  }
}

// Replace the body of this function with an API call when a backend exists.
async function submitFeedback(message: string): Promise<FeedbackItem> {
  const item: FeedbackItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    message,
    timestamp: Date.now(),
  };
  const existing = loadFromStorage();
  saveToStorage([item, ...existing]);
  return item;
}

// ── Sanitize ─────────────────────────────────────────────────────────────────

function sanitize(raw: string): string {
  return raw
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, (m, offset, str) =>
      str.slice(offset, offset + 4) === "&lt;" || str.slice(offset, offset + 4) === "&gt;"
        ? m
        : "&amp;"
    )
    .trim();
}

// ── Time formatting ───────────────────────────────────────────────────────────

function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// ── Card ──────────────────────────────────────────────────────────────────────

function FeedbackCard({ item }: { item: FeedbackItem }) {
  const [time, setTime] = useState(() => formatTime(item.timestamp));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(item.timestamp)), 30_000);
    return () => clearInterval(id);
  }, [item.timestamp]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))",
        borderRadius: "16px",
        padding: "18px 22px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transition: "background-color 200ms ease",
      }}
    >
      <p
        style={{
          fontFamily: FONT,
          fontSize: "0.9375rem",
          lineHeight: "1.5",
          letterSpacing: "0.01em",
          color: "var(--text-primary)",
          wordBreak: "break-word",
          transition: "color 200ms ease",
        }}
        dangerouslySetInnerHTML={{ __html: item.message }}
      />
      <p
        style={{
          fontFamily: FONT,
          fontSize: "0.7rem",
          letterSpacing: "0.03em",
          color: "#a4a4a4",
          fontWeight: 500,
          textTransform: "uppercase",
        }}
      >
        {time}
      </p>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function QuickFeedback() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [lastSubmitText, setLastSubmitText] = useState("");
  const [hovered, setHovered] = useState(false);

  // Load persisted feedback on mount
  useEffect(() => {
    setItems(loadFromStorage());
  }, []);

  const remaining = CHAR_LIMIT - value.length;
  const canSubmit = value.trim().length > 0 && remaining >= 0 && status !== "submitting";

  const handleSubmit = useCallback(async () => {
    const trimmed = value.trim();

    if (!trimmed) {
      setErrorMsg("Please write something before submitting.");
      return;
    }
    if (trimmed.length > CHAR_LIMIT) {
      setErrorMsg(`Keep it under ${CHAR_LIMIT} characters.`);
      return;
    }

    const now = Date.now();
    if (now - lastSubmitTime < DUPLICATE_COOLDOWN_MS && trimmed === lastSubmitText) {
      setErrorMsg("You already sent that — wait a moment before resubmitting.");
      return;
    }

    setErrorMsg("");
    setStatus("submitting");

    try {
      const sanitized = sanitize(trimmed);
      const newItem = await submitFeedback(sanitized);
      setItems((prev) => [newItem, ...prev]);
      setValue("");
      setLastSubmitTime(now);
      setLastSubmitText(trimmed);
      textareaRef.current?.focus();
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setStatus("idle");
    }
  }, [value, lastSubmitTime, lastSubmitText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <section
      style={{
        backgroundColor: "var(--bg-tertiary)",
        paddingTop: "80px",
        paddingBottom: "80px",
        transition: "background-color 200ms ease",
      }}
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              letterSpacing: "-0.05em",
              lineHeight: "1",
              fontWeight: 400,
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            Leave a Note
          </p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "1rem",
              letterSpacing: "0.02em",
              lineHeight: "1.5",
              color: "var(--text-secondary, #535353)",
              maxWidth: "560px",
              transition: "color 200ms ease",
            }}
          >
            Got thoughts on the work? Say hi, leave feedback, or drop a compliment. This is a public board — keep it kind.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "640px",
          }}
        >
          {/* Disclaimer */}
          <div
            style={{
              backgroundColor: "rgba(68,56,202,0.07)",
              border: "1px solid rgba(68,56,202,0.15)",
              borderRadius: "10px",
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {[
              "This is a public feedback board.",
              "Do not share personal or sensitive information.",
              "Keep comments respectful.",
              "By submitting, your message may be publicly visible.",
            ].map((line) => (
              <p
                key={line}
                style={{
                  fontFamily: FONT,
                  fontSize: "0.75rem",
                  letterSpacing: "0.01em",
                  lineHeight: "1.4",
                  color: "#4438ca",
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Textarea */}
          <div style={{ position: "relative" }}>
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value.slice(0, CHAR_LIMIT + 10));
                if (errorMsg) setErrorMsg("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Write something…"
              rows={4}
              style={{
                width: "100%",
                resize: "vertical",
                borderRadius: "12px",
                border: `1.5px solid ${errorMsg ? "#ef4444" : "rgba(0,0,0,0.12)"}`,
                padding: "14px 16px",
                fontFamily: FONT,
                fontSize: "0.9375rem",
                lineHeight: "1.5",
                letterSpacing: "0.01em",
                color: "var(--text-primary)",
                backgroundColor: "var(--bg-primary)",
                outline: "none",
                transition: "border-color 150ms ease, background-color 200ms ease, color 200ms ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#4438ca")}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = errorMsg ? "#ef4444" : "rgba(0,0,0,0.12)")
              }
            />
            {/* Char count */}
            <span
              style={{
                position: "absolute",
                bottom: "10px",
                right: "14px",
                fontFamily: FONT,
                fontSize: "0.7rem",
                letterSpacing: "0.02em",
                color: remaining < 20 ? (remaining < 0 ? "#ef4444" : "#f59e0b") : "#a4a4a4",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {remaining}
            </span>
          </div>

          {/* Error */}
          <AnimatePresence>
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                style={{
                  fontFamily: FONT,
                  fontSize: "0.8rem",
                  color: "#ef4444",
                  letterSpacing: "0.01em",
                }}
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "0.7rem",
                color: "#a4a4a4",
                letterSpacing: "0.01em",
              }}
            >
              ⌘ + Enter to submit
            </p>
            <motion.button
              onClick={handleSubmit}
              disabled={!canSubmit}
              whileTap={canSubmit ? { scale: 0.96 } : {}}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                fontFamily: FONT,
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "white",
                backgroundColor: canSubmit
                  ? hovered
                    ? "#3730a3"
                    : "#4438ca"
                  : "rgba(68,56,202,0.35)",
                border: "none",
                borderRadius: "10px",
                padding: "10px 22px",
                cursor: canSubmit ? "pointer" : "not-allowed",
                transition: "background-color 160ms ease",
                outline: "none",
                flexShrink: 0,
              }}
            >
              {status === "submitting" ? "Posting…" : "Post"}
            </motion.button>
          </div>
        </motion.div>

        {/* Comments */}
        {items.length > 0 && (
          <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#a4a4a4",
              }}
            >
              {items.length} {items.length === 1 ? "note" : "notes"}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "12px",
              }}
            >
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <FeedbackCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
