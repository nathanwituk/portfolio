/**
 * Lightweight error reporting utility.
 *
 * In development  → logs to console with full detail.
 * In production   → logs structured JSON to console (Vercel captures these
 *                   as runtime logs visible in the Vercel dashboard).
 *
 * Sentry upgrade path — when you're ready to add Sentry:
 *   1. npm install @sentry/nextjs
 *   2. Run `npx @sentry/wizard@latest -i nextjs` to generate sentry.*.config.ts
 *   3. Replace the console.error block below with Sentry.captureException(error)
 *   4. Add your DSN to .env.local: NEXT_PUBLIC_SENTRY_DSN=https://...
 *   5. Update next.config.ts to wrap with withSentryConfig(nextConfig, ...)
 *   6. Add https://*.ingest.sentry.io to connect-src in the CSP header
 */

type ReportableError = Error | string | unknown;

export function reportError(error: ReportableError, context = "app"): void {
  const message =
    error instanceof Error ? error.message : String(error ?? "unknown error");
  const stack = error instanceof Error ? error.stack : undefined;
  const digest = (error as { digest?: string })?.digest;

  if (process.env.NODE_ENV !== "production") {
    // Development: human-readable output
    console.error(`[${context}]`, error);
    return;
  }

  // Production: structured log — Vercel's runtime log pipeline picks this up
  // and makes it searchable in the Vercel dashboard under Functions → Logs.
  console.error(
    JSON.stringify({
      level: "error",
      context,
      message,
      digest,
      stack,
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : undefined,
    })
  );
}
