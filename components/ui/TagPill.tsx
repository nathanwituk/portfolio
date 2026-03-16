interface TagPillProps {
  children: React.ReactNode;
}

export default function TagPill({ children }: TagPillProps) {
  return (
    <div
      className="flex items-center justify-center shrink-0 bg-[#6f7142] rounded-[29px]"
      style={{ paddingLeft: "22px", paddingRight: "22px", paddingTop: "5px", paddingBottom: "5px" }}
    >
      <p
        className="font-semibold uppercase whitespace-nowrap text-white leading-[1.1] text-[1rem] tracking-[-0.03em]"
        style={{ fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif" }}
      >
        {children}
      </p>
    </div>
  );
}
