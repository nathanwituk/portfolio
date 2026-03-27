"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
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
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [lastSubmitText, setLastSubmitText] = useState("");
  const [hovered, setHovered] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Load persisted feedback on mount
  useEffect(() => {
    setItems(loadFromStorage());
  }, []);

  const remaining = CHAR_LIMIT - value.length;
  const canSubmit = value.trim().length > 0 && remaining >= 0 && status !== "submitting";

  const handlePostClick = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) { setErrorMsg("Please write something before submitting."); return; }
    if (trimmed.length > CHAR_LIMIT) { setErrorMsg(`Keep it under ${CHAR_LIMIT} characters.`); return; }
    const now = Date.now();
    if (now - lastSubmitTime < DUPLICATE_COOLDOWN_MS && trimmed === lastSubmitText) {
      setErrorMsg("You already sent that — wait a moment before resubmitting.");
      return;
    }
    setErrorMsg("");
    setShowConfirm(true);
  }, [value, lastSubmitTime, lastSubmitText]);

  const handleConfirm = useCallback(async () => {
    setShowConfirm(false);
    setStatus("submitting");
    try {
      const sanitized = sanitize(value.trim());
      const newItem = await submitFeedback(sanitized);
      setItems((prev) => [newItem, ...prev]);
      setLastSubmitTime(Date.now());
      setLastSubmitText(value.trim());
      setValue("");
      textareaRef.current?.focus();
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setStatus("idle");
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handlePostClick();
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
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "clamp(32px, 5vw, 72px)",
        }}
      >
        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="shrink-0 hidden md:block"
          style={{
            width: "clamp(180px, 22vw, 320px)",
            aspectRatio: "1 / 1",
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/Compose - IXD 414 Draft/extended.svg"
            alt="QR code"
            fill
            className="object-contain"
            sizes="320px"
          />
        </motion.div>

        {/* Right: title + form + comments */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            flex: "1 1 0",
            minWidth: 0,
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
            Nathan is absent today :(
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
            Leave some critique below.
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
              onClick={handlePostClick}
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
      </div>

      {/* Confirmation modal */}
      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {showConfirm && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22, ease: [0.25, 0, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "var(--bg-primary)",
                borderRadius: "20px",
                padding: "32px",
                maxWidth: "420px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={{
                  fontFamily: FONT,
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  lineHeight: "1.2",
                }}>
                  Post this message?
                </p>
                <p style={{
                  fontFamily: FONT,
                  fontSize: "0.9375rem",
                  letterSpacing: "0.01em",
                  lineHeight: "1.5",
                  color: "var(--text-secondary, #535353)",
                }}>
                  By submitting, you understand this message may be publicly visible.
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowConfirm(false)}
                  style={{
                    fontFamily: FONT,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--text-secondary, #535353)",
                    background: "rgba(0,0,0,0.06)",
                    border: "none",
                    borderRadius: "10px",
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  style={{
                    fontFamily: FONT,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "white",
                    backgroundColor: "#4438ca",
                    border: "none",
                    borderRadius: "10px",
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                >
                  Post it
                </button>
              </div>
            </motion.div>
          </motion.div>}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
