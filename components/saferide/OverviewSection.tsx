export default function OverviewSection() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--bg-primary)", transition: "background-color 200ms ease" }}
    >
      <div
        className="max-w-[1280px] mx-auto flex flex-col gap-[30px]"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "45px",
          paddingBottom: "29px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "4rem",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "-3.2px",
            color: "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          Overview
        </h2>
        <p
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1.25rem",
            fontWeight: 400,
            lineHeight: "24px",
            letterSpacing: "0.4px",
            color: "var(--text-secondary)",
            transition: "color 200ms ease",
          }}
        >
          This dashboard gives students the ability to track progress related to school work. The
          dashboard will give users the ability to connect their Canvas, Blackboard, or Google
          Classroom account in order to input data needed for key visualizations. These visuals help
          students break down how well they&apos;re doing in classes and in their degree progress.
        </p>
      </div>
    </section>
  );
}
