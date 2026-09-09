/**
 * Plain JavaScript, deliberately — see the note at the bottom of this file.
 *
 * Security headers.
 *
 * No CSP yet: a correct one has to be written against the real analytics and
 * embed set once those are decided, and a wrong CSP silently breaks the site.
 * Everything here is safe to ship as-is.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Trailing-slash consistency matters for canonical URLs: pick one and keep it.
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // A year — images are content-addressed by the optimiser.
    minimumCacheTTL: 31_536_000,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // The generated social card is deterministic for a given query.
        source: "/og",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }],
      },
    ];
  },
};

export default nextConfig;

/*
 * Why .mjs and not .ts
 *
 * Hostinger's build container runs glibc 2.28. Next's native SWC binary
 * (@next/swc-linux-x64-gnu) needs GLIBC_2.29, so it fails to load and Next
 * falls back to @next/swc-wasm-nodejs. Under that fallback, compiling a
 * TypeScript next.config emits a next.config.compiled.js that imports a
 * hashed temp module which never gets written, and the build dies with
 * ERR_MODULE_NOT_FOUND before it reads a single page.
 *
 * A plain-JS config needs no compilation, so the config loads either way.
 * The JSDoc annotation above keeps full type checking in the editor.
 */
