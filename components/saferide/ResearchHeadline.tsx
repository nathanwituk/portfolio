export default function ResearchHeadline() {
  return (
    <section className="w-full flex items-center" style={{ backgroundColor: "#b2e639", height: "105px" }}>
      <div
        className="max-w-[1280px] mx-auto flex items-center justify-center gap-[40px]"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
        }}
      >
        <p
          className="font-normal leading-none"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "-0.03em",
            color: "#000000",
            whiteSpace: "nowrap",
          }}
        >
          Research
        </p>
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
