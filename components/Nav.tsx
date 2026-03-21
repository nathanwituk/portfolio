"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ── Inline SVG icons — all strokes use currentColor ────────────────────────

function SpeedsterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M0.5 9.57376C0.5 10.7653 0.7347 11.9453 1.1907 13.0461C1.6467 14.147 2.31507 15.1473 3.15764 15.9899C4.00022 16.8324 5.0005 17.5008 6.10138 17.9568C7.20226 18.4128 8.38217 18.6475 9.57376 18.6475C10.7653 18.6475 11.9453 18.4128 13.0461 17.9568C14.147 17.5008 15.1473 16.8324 15.9899 15.9899C16.8324 15.1473 17.5008 14.147 17.9568 13.0461C18.4128 11.9453 18.6475 10.7653 18.6475 9.57376C18.6475 8.38217 18.4128 7.20226 17.9568 6.10138C17.5008 5.0005 16.8324 4.00022 15.9899 3.15764C15.1473 2.31507 14.147 1.6467 13.0461 1.1907C11.9453 0.7347 10.7653 0.5 9.57376 0.5C8.38217 0.5 7.20226 0.7347 6.10138 1.1907C5.0005 1.6467 4.00022 2.31507 3.15764 3.15764C2.31507 4.00022 1.6467 5.0005 1.1907 6.10138C0.7347 7.20226 0.5 8.38217 0.5 9.57376Z" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M6.55112 9.57393C6.55112 10.3761 6.86978 11.1454 7.437 11.7126C8.00422 12.2799 8.77354 12.5985 9.57571 12.5985C10.3779 12.5985 11.1472 12.2799 11.7144 11.7126C12.2816 11.1454 12.6003 10.3761 12.6003 9.57393M6.55112 9.57393C6.55112 8.77176 6.86978 8.00244 7.437 7.43522C8.00422 6.868 8.77354 6.54934 9.57571 6.54934C10.3779 6.54934 11.1472 6.868 11.7144 7.43522C12.2816 8.00244 12.6003 8.77176 12.6003 9.57393M6.55112 9.57393H0.501953M12.6003 9.57393H18.6495M11.1888 6.95262L14.6167 2.11328M7.9626 12.1952L4.53473 17.0346M4.53473 2.11328L7.9626 6.95262M11.1888 12.1952L14.6167 17.0346" stroke="currentColor" strokeLinejoin="round"/>
    </svg>
  );
}

function InventoryIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <path d="M6.28674 18.1831H2.60427C1.44211 18.1831 0.5 17.241 0.5 16.0788V3.97927C0.5 2.81711 1.44211 1.875 2.60427 1.875H14.1777C15.3399 1.875 16.282 2.81711 16.282 3.97927V8.1878" stroke="currentColor"/>
      <path d="M8.91602 15.0255L12.0724 18.1819L18.3852 11.8691" stroke="currentColor"/>
      <path d="M5.28711 1.83819V4.10547H11.5851V1.83819" stroke="currentColor"/>
      <mask id="nav-inv-mask" fill="white">
        <path d="M10.7476 2.10427C10.7476 1.82793 10.6932 1.5543 10.5874 1.299C10.4817 1.0437 10.3267 0.811725 10.1313 0.616326C9.93587 0.420926 9.7039 0.265927 9.4486 0.160178C9.1933 0.0544285 8.91967 -1.2079e-08 8.64333 0C8.36699 1.2079e-08 8.09336 0.0544285 7.83806 0.160178C7.58276 0.265927 7.35079 0.420926 7.15539 0.616326C6.95999 0.811725 6.80499 1.0437 6.69924 1.299C6.59349 1.5543 6.53906 1.82793 6.53906 2.10427L8.64333 2.10427H10.7476Z"/>
      </mask>
      <path d="M10.7476 2.10427C10.7476 1.82793 10.6932 1.5543 10.5874 1.299C10.4817 1.0437 10.3267 0.811725 10.1313 0.616326C9.93587 0.420926 9.7039 0.265927 9.4486 0.160178C9.1933 0.0544285 8.91967 -1.2079e-08 8.64333 0C8.36699 1.2079e-08 8.09336 0.0544285 7.83806 0.160178C7.58276 0.265927 7.35079 0.420926 7.15539 0.616326C6.95999 0.811725 6.80499 1.0437 6.69924 1.299C6.59349 1.5543 6.53906 1.82793 6.53906 2.10427L8.64333 2.10427H10.7476Z" stroke="currentColor" strokeWidth="2" mask="url(#nav-inv-mask)"/>
      <path d="M2.88867 6.81836H14.225" stroke="currentColor"/>
      <path d="M2.88867 10.0938H14.225" stroke="currentColor"/>
      <path d="M2.88867 13.1172H8.17898" stroke="currentColor"/>
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" aria-hidden="true">
      <path d="M0.5 2.26883C0.5 1.79971 0.686358 1.3498 1.01808 1.01808C1.3498 0.686358 1.79971 0.5 2.26883 0.5H7.57532V16.4195H2.26883C1.79971 16.4195 1.3498 16.2331 1.01808 15.9014C0.686358 15.5697 0.5 15.1198 0.5 14.6506V2.26883ZM10.2394 0.5H15.5458C16.015 0.5 16.4649 0.686358 16.7966 1.01808C17.1283 1.3498 17.3147 1.79971 17.3147 2.26883V6.69091H10.2394V0.5ZM10.2394 10.2286H17.3147V14.6506C17.3147 15.1198 17.1283 15.5697 16.7966 15.9014C16.4649 16.2331 16.015 16.4195 15.5458 16.4195H10.2394V10.2286Z" stroke="currentColor" strokeLinejoin="round"/>
    </svg>
  );
}

function SafeRideIcon() {
  return (
    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" aria-hidden="true">
      <path d="M9.06864 15.7271H3.35847C2.30726 15.7271 1.45508 14.8749 1.45508 13.8237V4.30678C1.45508 2.20436 3.15943 0.5 5.26186 0.5H12.8754C14.9778 0.5 16.6822 2.20435 16.6822 4.30678V11.5845" stroke="currentColor"/>
      <path d="M10.3299 15.7266H9.07031" stroke="currentColor"/>
      <path d="M16.875 5.37598C17.403 5.57752 17.7783 6.08775 17.7783 6.68652C17.7783 7.28519 17.4028 7.79445 16.875 7.99609V5.37598Z" stroke="currentColor" strokeWidth="0.951695"/>
      <path d="M1.40332 7.99609C0.875554 7.79443 0.5 7.28516 0.5 6.68652C0.500029 6.08777 0.875378 5.57753 1.40332 5.37598V7.99609Z" stroke="currentColor" strokeWidth="0.951695"/>
      <path d="M6.58203 16.1152V16.5674C6.58179 17.3422 5.95363 17.9707 5.17871 17.9707C4.40382 17.9707 3.77563 17.3422 3.77539 16.5674V16.1152H6.58203Z" stroke="currentColor"/>
      <rect x="4.81055" y="10.5176" width="1.85509" height="1.85509" rx="0.927543" stroke="currentColor"/>
      <rect x="11.584" y="10.5742" width="1.85509" height="1.85509" rx="0.927543" stroke="currentColor"/>
      <path d="M9.19531 4.53125V8.93984" stroke="currentColor"/>
      <path d="M1.76367 8.8125L16.6269 8.8125" stroke="currentColor"/>
      <path d="M1.76367 4.7832L16.6269 4.7832" stroke="currentColor"/>
      <path d="M12.8477 14.151V14.9654C12.8477 16.5848 13.7121 18.081 15.1149 18.8898C16.5178 18.081 17.3822 16.5848 17.3822 14.9654V14.151L17.2442 14.1051C16.4523 13.842 15.7261 13.4119 15.1149 12.8438C14.5037 13.4119 13.7776 13.842 12.9857 14.1051L12.8477 14.151Z" stroke="currentColor"/>
    </svg>
  );
}

// ── Nav link data ───────────────────────────────────────────────────────────

const navLinks = [
  {
    label: "Speedster",
    href: "/work/speedster",
    icon: SpeedsterIcon,
    hoverColor: "#ff5d00",
    comingSoon: false,
  },
  {
    label: "Fearless Inventory",
    href: "/work/fearless-inventory",
    icon: InventoryIcon,
    hoverColor: "#6f7142",
    comingSoon: false,
  },
  {
    label: "Study Sync Dashboard",
    href: "/saferide",
    icon: DashboardIcon,
    hoverColor: "#1D1D1D",
    comingSoon: false,
  },
  {
    label: "KU SafeRide Redesign",
    href: "/work/saferide",
    icon: SafeRideIcon,
    hoverColor: "#6363FF",
    comingSoon: false,
  },
];

// ── Component ───────────────────────────────────────────────────────────────

const NAV_H = 46; // px — must match h-[46px] on the <nav> element

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      // Always visible at the very top
      if (current <= 10) {
        setVisible(true);
        setScrolled(false);
        lastScrollY.current = current;
        return;
      }

      setScrolled(true);

      const delta = current - lastScrollY.current; // positive = scrolling down

      if (delta > 6) {
        // Scrolling down with intent — hide
        setVisible(false);
      } else if (delta < -6) {
        // Scrolling up with intent — show
        setVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Spacer — keeps page content from sitting under the fixed nav */}
      <div style={{ height: NAV_H }} aria-hidden="true" />

    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full border-b"
      animate={{ y: visible ? 0 : "-110%" }}
      transition={{ duration: 0.28, ease: [0.25, 0, 0, 1] }}
      style={{
        backgroundColor: "var(--nav-bg)",
        borderColor: "var(--nav-border)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled && visible ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
        transition: "background-color 200ms ease, border-color 200ms ease, box-shadow 250ms ease",
      }}
    >
      {/* ── Desktop nav ── */}
      <nav className="flex items-center justify-between h-[46px] px-5 md:pl-[80px] md:pr-[40px]">

        {/* Wordmark */}
        <a href="/" className="shrink-0 flex items-center" style={{ height: "20.543px" }}>
          <span
            className="font-semibold leading-none whitespace-nowrap"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1.375rem",
              letterSpacing: "-0.34px",
              color: "var(--nav-text)",
              transition: "color 200ms ease",
            }}
          >
            Nathan Wituk
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center">
          {navLinks.map(({ label, href, icon: Icon, hoverColor, comingSoon }, i) => {
            const isHovered = hoveredIndex === i;
            const isGreyed = comingSoon;
            const isActive = !isGreyed && pathname.startsWith(href);
            // Pill state: active page — filled capsule, white text/icon
            // Hover state: accent color text/icon + underline, no pill
            const color = isActive ? "#f5f5f5" : isHovered ? hoverColor : "var(--nav-text-muted)";

            return (
              <a
                key={label}
                href={href}
                className="flex items-center"
                style={{
                  height: "28px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                  gap: "10px",
                  color,
                  backgroundColor: isActive ? hoverColor : "transparent",
                  borderRadius: isActive ? "14px" : "0",
                  pointerEvents: isGreyed ? "none" : "auto",
                  opacity: isGreyed ? 0.45 : 1,
                  transition: "color 0.15s ease, background-color 0.15s ease",
                }}
                onMouseEnter={() => !isGreyed && setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon inherits color via currentColor */}
                <span className="shrink-0 flex items-center">
                  <Icon />
                </span>
                <span
                  className="whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "-0.48px",
                    lineHeight: "1.1",
                    textDecoration: !isActive && isHovered ? "underline" : "none",
                  }}
                >
                  {label}
                </span>
                {comingSoon && (
                  <span
                    className="shrink-0"
                    style={{
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "0.625rem",
                      letterSpacing: "0.05em",
                      lineHeight: "1",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      backgroundColor: "var(--bg-secondary)",
                      padding: "3px 7px",
                      borderRadius: "4px",
                    }}
                  >
                    Soon
                  </span>
                )}
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
            transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] as [number, number, number, number] }}
          >
            <div className="flex flex-col px-5 py-4">
              {navLinks.map(({ label, href, icon: Icon, hoverColor, comingSoon }, i) => {
                const isActive = !comingSoon && pathname.startsWith(href);
                return (
                <motion.a
                  key={label}
                  href={href}
                  className="flex items-center"
                  style={{
                    height: "34px",
                    gap: "12px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    color: isActive ? "#f5f5f5" : comingSoon ? "var(--nav-text-muted)" : hoverColor,
                    backgroundColor: isActive ? hoverColor : "transparent",
                    borderRadius: isActive ? "9px" : "0",
                    borderBottom: !isActive && i < navLinks.length - 1
                      ? "1px solid color-mix(in srgb, var(--nav-border) 15%, transparent)"
                      : "none",
                    opacity: comingSoon ? 0.45 : 1,
                    pointerEvents: comingSoon ? "none" : "auto",
                  }}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: comingSoon ? 0.45 : 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <span className="shrink-0 flex items-center">
                    <Icon />
                  </span>
                  <span
                    style={{
                      color: isActive ? "#ffffff" : "var(--nav-text)",
                      fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                      fontSize: "1.25rem",
                      letterSpacing: "-0.6px",
                      lineHeight: "1",
                    }}
                  >
                    {label}
                  </span>
                  {comingSoon && (
                    <span
                      className="shrink-0"
                      style={{
                        fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                        fontSize: "0.625rem",
                        letterSpacing: "0.05em",
                        lineHeight: "1",
                        textTransform: "uppercase",
                        color: "var(--text-tertiary)",
                        backgroundColor: "var(--bg-secondary)",
                        padding: "3px 7px",
                        borderRadius: "4px",
                      }}
                    >
                      Soon
                    </span>
                  )}
                </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}
