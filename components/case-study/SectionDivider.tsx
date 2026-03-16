"use client";

interface SectionDividerProps {
  /**
   * "arrow"  — dark olive bar with a centred ↓ arrow (between major sections)
   * "jump"   — tan #ebe8de bar with "Jump to final prototype" text + arrow (anchor link)
   */
  variant?: "arrow" | "jump";
  /** Only used for "jump" variant — scroll target href */
  href?: string;
}

export default function SectionDivider({ variant = "arrow", href = "#final-prototype" }: SectionDividerProps) {
  if (variant === "jump") {
    return (
      <a
        href={href}
        className="group w-full flex items-center justify-center"
        style={{
          height: "82px",
          backgroundColor: "var(--bg-tan)",
          color: "#6f7142",
          textDecoration: "none",
          transition: "background-color 200ms ease-out, color 200ms ease-out",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.backgroundColor = "#6f7142";
          el.style.color = "var(--bg-tan)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.backgroundColor = "var(--bg-tan)";
          el.style.color = "#6f7142";
        }}
      >
        <div className="flex items-center gap-[16px]">
          <p
            className="font-normal leading-none whitespace-nowrap tracking-[-0.03em] group-hover:underline"
            style={{
              fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              fontSize: "1.875rem",
            }}
          >
            Jump to final prototype
          </p>
          {/* Arrow rotated 90° = pointing down, inherits color */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="rotate-90"
          >
            <path
              d="M5.5 14H22.5M22.5 14L15.5 7M22.5 14L15.5 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </a>
    );
  }

  // "arrow" variant — simple olive divider
  return (
    <div
      className="w-full bg-[#6f7142] flex items-center justify-center"
      style={{ height: "82px" }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="rotate-90"
      >
        <path
          d="M5.5 14H22.5M22.5 14L15.5 7M22.5 14L15.5 21"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
