"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/reportError";

/**
 * Root-level error boundary.
 * Catches errors thrown in the root layout (app/layout.tsx) itself.
 * Must render its own <html> and <body> since the root layout has failed.
 * Keep this minimal — CSS variables and fonts are unavailable here.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, "global-error-boundary");
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "40px 20px",
          backgroundColor: "#111111",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 400, margin: 0 }}>
          Something went wrong
        </h1>
        {error.digest && (
          <p style={{ color: "#888888", fontSize: "0.875rem", margin: 0 }}>
            Error ID: {error.digest}
          </p>
        )}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={reset}
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              border: "none",
              backgroundColor: "#ff5d00",
              color: "#ffffff",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              border: "1.5px solid #444444",
              color: "#ffffff",
              fontSize: "1rem",
              textDecoration: "none",
            }}
          >
            Return home
          </a>
        </div>
      </body>
    </html>
  );
}
