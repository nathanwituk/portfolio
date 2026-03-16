interface InsightCardProps {
  /** "light" = #f5f5f5 bg, dark text. "dark" = #6f7142 bg, white text. */
  variant: "light" | "dark";
  children: React.ReactNode;
}

function LightbulbIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/fearless-inventory/Lightbulb-Icon.svg"
      alt=""
      aria-hidden="true"
      width={32}
      height={34}
      className="shrink-0"
    />
  );
}

function InformationInsightIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/fearless-inventory/InformationInsight-Icon.svg"
      alt=""
      aria-hidden="true"
      width={30}
      height={37}
      className="shrink-0"
    />
  );
}

export default function InsightCard({ variant, children }: InsightCardProps) {
  const isDark = variant === "dark";
  return (
    <div
      className={`flex flex-1 items-start gap-[22px] rounded-[20px] ${
        isDark ? "bg-[#6f7142]" : ""
      }`}
      style={{
        padding: "21px 29px",
        backgroundColor: isDark ? undefined : "var(--bg-secondary)",
        transition: isDark ? undefined : "background-color 200ms ease",
      }}
    >
      <div className="shrink-0 mt-0.5">
        {isDark ? <InformationInsightIcon /> : <LightbulbIcon />}
      </div>
      <p
        className={`flex-1 text-[0.875rem] leading-[1.4] tracking-[0.02em] ${
          isDark ? "text-white" : ""
        }`}
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          color: isDark ? undefined : "var(--text-primary)",
          transition: isDark ? undefined : "color 200ms ease",
        }}
      >
        {children}
      </p>
    </div>
  );
}
