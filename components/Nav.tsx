"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <line x1="12" y1="2"  x2="12" y2="5"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="2"  y1="12" x2="5"  y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navLinks = [
  {
    label: "Speedster",
    href: "/work/speedster",
    iconDefault: "/images/nav/Icons/Grey_Speedster.svg",
    iconHover:   "/images/nav/Icons/Speedster.svg",
    hoverTextColor: "#1D1D1D",
  },
  {
    label: "Fearless Inventory",
    href: "/work/fearless-inventory",
    iconDefault: "/images/nav/Icons/Grey_Inventory.svg",
    iconHover:   "/images/nav/Icons/Inventory.svg",
    hoverTextColor: "#1D1D1D",
  },
  {
    label: "Study Sync Dashboard",
    href: "#study-sync",
    iconDefault: "/images/nav/Icons/Grey_Dashboard.svg",
    iconHover:   "/images/nav/Icons/Dashboard.svg",
    hoverTextColor: "#1D1D1D",
  },
  {
    label: "KU SafeRide Redesign",
    href: "#ku-saferide",
    iconDefault: "/images/nav/Icons/Grey_Saferide.svg",
    iconHover:   "/images/nav/Icons/Saferide.svg",
    hoverTextColor: "#6363FF",
  },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const diff = lastScrollY.current - current;
      if (diff > 10) {
        setVisible(true);
      } else if (diff < -10) {
        setVisible(false);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b"
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] }}
      style={{
        backgroundColor: "var(--nav-bg)",
        borderColor: "var(--nav-border)",
        transition: "background-color 200ms ease, border-color 200ms ease",
      }}
    >
      {/* ── Desktop nav ── */}
      <nav className="flex items-center justify-between h-[46px] px-5 md:pl-[80px] md:pr-[40px]">

        {/* Left side: theme toggle + wordmark */}
        <div className="flex items-center gap-[14px]">
          {/* Dark / light toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1.5px solid var(--nav-border)",
              backgroundColor: "transparent",
              color: "var(--nav-text)",
              cursor: "pointer",
              flexShrink: 0,
              transition: "border-color 200ms ease, color 200ms ease",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "sun" : "moon"}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex" }}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Wordmark */}
          <a
            href="/"
            className="shrink-0 flex items-center"
            style={{ height: "20.543px" }}
          >
            <span
              className="font-semibold leading-none whitespace-nowrap"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                fontSize: "1.0625rem",
                letterSpacing: "-0.34px",
                color: "var(--nav-text)",
                transition: "color 200ms ease",
              }}
            >
              Nathan Wituk
            </span>
          </a>
        </div>

        {/* Desktop project links */}
        <div className="hidden md:flex items-center">
          {navLinks.map(({ label, href, iconDefault, iconHover, hoverTextColor }, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <a
                key={label}
                href={href}
                className="flex items-center"
                style={{
                  height: "43px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                  paddingBottom: "4px",
                  gap: "10px",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={isHovered ? iconHover : iconDefault}
                  alt=""
                  aria-hidden="true"
                  className="shrink-0"
                  style={{ width: "18px", height: "18px" }}
                />
                <span
                  className="whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "-0.48px",
                    lineHeight: "1.1",
                    color: isHovered ? hoverTextColor : "var(--nav-text-muted)",
                    textDecoration: isHovered ? "underline" : "none",
                    transition: "color 0.15s ease, text-decoration-color 0.15s ease",
                  }}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center shrink-0"
          style={{ width: "40px", height: "40px", gap: "6px" }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          <motion.span
            className="block origin-center"
            style={{ width: "24px", height: "2px", backgroundColor: "var(--nav-text)" }}
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block"
            style={{ width: "24px", height: "2px", backgroundColor: "var(--nav-text)" }}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block origin-center"
            style={{ width: "24px", height: "2px", backgroundColor: "var(--nav-text)" }}
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: "var(--nav-bg)",
              borderTop: "1px solid var(--nav-border)",
            }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0, 0, 1] as [number, number, number, number],
            }}
          >
            <div className="flex flex-col px-5 py-4">
              {navLinks.map(({ label, href, iconDefault }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  className="flex items-center last:border-0"
                  style={{ height: "52px", gap: "12px", borderBottom: "1px solid color-mix(in srgb, var(--nav-border) 15%, transparent)" }}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <img
                    src={iconDefault}
                    alt=""
                    aria-hidden="true"
                    className="shrink-0"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <span
                    style={{
                      color: "var(--nav-text)",
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "1.25rem",
                      letterSpacing: "-0.6px",
                      lineHeight: "1",
                    }}
                  >
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
