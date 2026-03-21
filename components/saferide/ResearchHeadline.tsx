export default function ResearchHeadline() {
  return (
    <section className="w-full" style={{ backgroundColor: "#b2e639" }}>
      <div
        className="max-w-[1280px] mx-auto flex items-center justify-center gap-[40px]"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1.875rem",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "-0.6px",
            color: "#000000",
            whiteSpace: "nowrap",
          }}
        >
          Research
        </p>
        {/* Down arrow */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M14 4V24M14 24L6 16M14 24L22 16"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
