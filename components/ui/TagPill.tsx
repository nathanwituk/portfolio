interface TagPillProps {
  children: React.ReactNode;
  /** Background color of the pill. Defaults to olive #6f7142. Pass a project accent color for page-specific heroes. */
  color?: string;
}

export default function TagPill({ children, color = "#6f7142" }: TagPillProps) {
  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-[29px]"
      style={{
        backgroundColor: color,
        paddingLeft: "22px",
        paddingRight: "22px",
        paddingTop: "5px",
        paddingBottom: "5px",
      }}
    >
      <p
        className="font-semibold uppercase whitespace-nowrap text-white leading-[1.1] text-[0.875rem] tracking-[-0.03em]"
        style={{ fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif" }}
      >
        {children}
      </p>
    </div>
  );
}
