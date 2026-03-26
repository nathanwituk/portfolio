"use client";

export default function ComposeDesignProcessDivider() {
  return (
    <div
      className="w-full flex items-center justify-center gap-[29px]"
      style={{ backgroundColor: "#4438ca", padding: "18px 80px" }}
    >
      <span
        className="font-normal leading-none whitespace-nowrap"
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          fontSize: "1.875rem",
          letterSpacing: "-0.02em",
          color: "#ffffff",
        }}
      >
        Design Process
      </span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 5v14M5 12l7 7 7-7"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
