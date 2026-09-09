import type { NextConfig } from "next";

/**
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

const nextConfig: NextConfig = {
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
