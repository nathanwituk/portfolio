const FEATURES = [
  {
    img: "https://www.figma.com/api/mcp/asset/067c4cb1-23a1-447d-97f8-7a8d37629bd5",
    title: "View Study Time",
    description: "See projected study time based on current grades and assignments.",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/c75ecfc5-d183-4653-b26b-1cb3b7d72478",
    title: "Track Time Spent",
    description: "Visualize how much time you've spent studying for your classes",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/c502ac7b-ee21-41e0-812f-3ea43b89dd3c",
    title: "Manage Tasks",
    description: "Keep users engaged with one task visible at a time, or view your full list.",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/58851158-e0a4-4074-ad0a-be44b076979a",
    title: "Monitor GPA",
    description: "Look at your projected GPA based on weekly data.",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/9f71ff1e-ecc3-49de-ba08-d946aac48a2b",
    title: "View Overall Progress",
    description: "See how many classes you have left in the Core 34 graduation requirement.",
  },
];

export default function KeyFeatures() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--bg-secondary)", transition: "background-color 200ms ease" }}
    >
      <div
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "clamp(20px, 6.25vw, 80px)",
          paddingRight: "clamp(20px, 6.25vw, 80px)",
          paddingTop: "100px",
          paddingBottom: "55px",
        }}
      >
        <div
          className="flex gap-[54px] overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-[20px] items-center shrink-0 w-[275px]"
            >
              <div className="w-full h-[263px] rounded-[20px] overflow-hidden shrink-0">
                <img
                  alt={f.title}
                  src={f.img}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[11px] items-center w-full text-center">
                <p
                  className="font-bold whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1.73rem",
                    lineHeight: 1,
                    color: "var(--text-primary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {f.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 400,
                    lineHeight: 1.4,
                    letterSpacing: "0.4px",
                    color: "var(--text-secondary)",
                    transition: "color 200ms ease",
                  }}
                >
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
