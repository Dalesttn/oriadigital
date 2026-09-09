import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Social preview card.
 *
 * One renderer for every page: the title comes from the query string, which
 * `pageMetadata` fills in, so an Open Graph image can never fall out of sync
 * with the page it represents. Deliberately typographic — the brand's strength
 * is composition, not decoration.
 */

export const runtime = "nodejs";

const clamp = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = clamp(searchParams.get("title")?.trim() || site.name, 90);
  const eyebrow = clamp(searchParams.get("eyebrow")?.trim() || site.tagline, 40);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F1EA",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent edge — the gradient the whole brand hangs on. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(97deg,#F15A3A 0%,#E95C63 48%,#7657B8 100%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg viewBox="0 0 64 64" width={46} height={46}>
            <defs>
              <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#F15A3A" />
                <stop offset="52%" stopColor="#E95C63" />
                <stop offset="100%" stopColor="#7657B8" />
              </linearGradient>
            </defs>
            <circle
              cx="32"
              cy="32"
              r="22"
              fill="none"
              stroke="url(#g)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="118.2 20"
            />
            <line
              x1="51.8"
              y1="22.4"
              x2="40.1"
              y2="28.1"
              stroke="url(#g)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 5, color: "#171717" }}>
            <span style={{ fontWeight: 600 }}>ORIA</span>
            <span style={{ fontWeight: 400, color: "rgba(23,23,23,0.72)" }}>&nbsp;DIGITAL</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#716C65",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 52 ? 62 : 76,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.04,
              color: "#171717",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#716C65",
            borderTop: "1px solid rgba(23,23,23,0.12)",
            paddingTop: 24,
          }}
        >
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
          <span>Perth · Australia-wide</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
