import { ImageResponse } from "next/og";

/**
 * Apple touch icon — the Aperture O on ink.
 *
 * Drawn as inline SVG rather than shipped as a file so the geometry has a
 * single definition shared with OriaMark.tsx and icon.svg.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#171717",
        }}
      >
        <svg viewBox="0 0 64 64" width={112} height={112}>
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
      </div>
    ),
    size,
  );
}
