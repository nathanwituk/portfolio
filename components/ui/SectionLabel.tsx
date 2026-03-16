interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  /** Use "muted" for #868686, "light" for white text on dark backgrounds */
  variant?: "gray" | "muted" | "light";
}

export default function SectionLabel({
  children,
  className = "",
  variant = "gray",
}: SectionLabelProps) {
  return (
    <p
      className={`font-semibold uppercase leading-none tracking-[0em] text-[1rem] shrink-0 w-full ${
        variant === "light" ? "text-white" : ""
      } ${className}`}
      style={{
        fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
        color: variant === "light" ? undefined : "var(--text-tertiary)",
        transition: "color 200ms ease",
      }}
    >
      {children}
    </p>
  );
}
