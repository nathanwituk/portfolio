import Link from "next/link";

/**
 * Custom 404 page.
 * Rendered by Next.js when no route matches the requested URL.
 * This is a Server Component — no "use client" needed.
 */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "40px 20px",
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 200ms ease",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          maxWidth: "480px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "#ff5d00",
            margin: 0,
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400,
            letterSpacing: "-0.05em",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.5,
            letterSpacing: "0.02em",
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
      </div>

      <Link
        href="/"
        style={{
          fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
          fontSize: "1rem",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          padding: "10px 24px",
          borderRadius: "20px",
          border: "none",
          backgroundColor: "#ff5d00",
          color: "#ffffff",
          textDecoration: "none",
        }}
      >
        Return home
      </Link>
    </main>
  );
}
