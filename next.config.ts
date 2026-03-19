import type { NextConfig } from "next";

// ── Content-Security-Policy ───────────────────────────────────────────────────
//
// Every directive is listed explicitly. Exceptions from 'none' are justified
// below and cross-referenced in SECURITY_AUDIT.md § Security Headers.
//
// EXCEPTION  script-src 'unsafe-inline'
//   Two unavoidable sources of inline scripts:
//   (1) The anti-FOUC theme script in app/layout.tsx (static, hashable —
//       SHA-256: sha256-b8gQUaRzu5dP+/0zQJl4vk5wzo+Fq2JJ7SRmx9HppLc=).
//   (2) Next.js App Router streams RSC (React Server Component) payload as
//       inline <script> tags whose content changes every build and cannot be
//       pre-hashed. Removing this exception requires adding middleware.ts to
//       generate a per-request nonce and passing it to both Next.js and the
//       inline script — see SECURITY_AUDIT.md § Follow-up for the nonce plan.
//
// EXCEPTION  style-src 'unsafe-inline'
//   Framer Motion applies all animation state as inline style="" attributes
//   on DOM elements at runtime. These are dynamic and cannot be hashed.
//   Removing this exception would require rewriting all Framer Motion
//   animations to use CSS classes — a significant refactor.
//
// EXCEPTION  frame-src embed.figma.com www.figma.com
//   WireframePrototypeBlock and SafeRide sections render <iframe src="embed.figma.com/proto/...">
//   for interactive Figma prototype embeds. www.figma.com is included because
//   Figma's embed CDN may redirect through it before settling on embed.figma.com.
//
// EXCEPTION  img-src data:
//   Next.js Image component may emit data: URIs for blur-up placeholder
//   previews. No external image domains are needed: all remaining Figma CDN
//   images are either replaced with local files or proxied through
//   /_next/image (which the browser fetches as 'self').
//
// NOT NEEDED  fonts.googleapis.com / fonts.gstatic.com
//   next/font/google downloads Instrument Sans at build time and serves the
//   font files from /_next/static/. No runtime requests leave the origin.
//
// NOT NEEDED  analytics, tracking, or ad domains
//   None are present in this project.
//
const ContentSecurityPolicy = [
  "default-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "media-src 'self'",
  "frame-src https://embed.figma.com https://www.figma.com",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // ── Content-Security-Policy ─────────────────────────────────────────────────
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },

  // ── HSTS ────────────────────────────────────────────────────────────────────
  // 2-year max-age. includeSubDomains protects any subdomains of the origin.
  // preload opts the domain into browser HSTS preload lists — only submit to
  // https://hstspreload.org once the site is confirmed HTTPS-only on all paths.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // ── MIME-type sniffing ───────────────────────────────────────────────────────
  // Prevents browsers from interpreting files as a different MIME type than
  // declared — stops content-sniffing attacks on uploaded or served assets.
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },

  // ── Referrer ─────────────────────────────────────────────────────────────────
  // Same-origin navigation: full URL in Referer header.
  // Cross-origin navigation: origin only (no path or query string).
  // Downgrade (HTTPS → HTTP): no Referer header sent.
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },

  // ── Permissions Policy ───────────────────────────────────────────────────────
  // Explicitly deny every browser capability this site does not use.
  // fullscreen is allowed for embed.figma.com — Figma prototype iframes
  // declare allowfullscreen and will show a blocked state without this.
  {
    key: "Permissions-Policy",
    value: [
      "fullscreen=(self \"https://embed.figma.com\")",
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "bluetooth=()",
      "accelerometer=()",
      "gyroscope=()",
      "magnetometer=()",
      "interest-cohort=()",
    ].join(", "),
  },

  // ── Clickjacking fallback ────────────────────────────────────────────────────
  // X-Frame-Options is honoured by older browsers that do not support the CSP
  // frame-ancestors directive. Both are set for belt-and-suspenders coverage.
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

const nextConfig: NextConfig = {

  async headers() {
    // Security headers only in production — dev runs over plain HTTP which
    // causes upgrade-insecure-requests (and HSTS) to break asset loading.
    if (process.env.NODE_ENV !== "production") return [];
    return [
      {
        // Apply to every route including _next/static assets
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
