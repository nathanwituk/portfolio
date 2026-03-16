"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/reportError";

/**
 * Route-level error boundary.
 * Catches render errors thrown inside any page or layout below the root.
 * Automatically logs the error and offers recovery options.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, "route-error-boundary");
  }, [error]);

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
          }}
        >
          Something went wrong
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
          Unexpected error
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
          An error occurred while rendering this page. You can try again or
          return to the home page.
          {error.digest && (
            <span style={{ display: "block", marginTop: "8px", fontSize: "0.8125rem", opacity: 0.5 }}>
              Error ID: {error.digest}
            </span>
          )}
        </p>
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            padding: "10px 24px",
            borderRadius: "9999px",
            border: "none",
            backgroundColor: "#ff5d00",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <a
          href="/"
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            padding: "10px 24px",
            borderRadius: "9999px",
            border: "1.5px solid var(--text-tertiary)",
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          Return home
        </a>
      </div>
    </main>
  );
}
