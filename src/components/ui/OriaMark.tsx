/**
 * The Oria mark — "The Aperture O".
 *
 * Two shapes, drawable from memory: a continuous ring with a single opening,
 * and one radial inlet feeding into it — work entering the system. Geometry is
 * taken verbatim from the identity study (64×64 grid, r=22, stroke 6).
 *
 * The gradient lives once in the document (see GradientDefs, rendered in the
 * root layout) so every instance references the same paint rather than each
 * SVG carrying its own copy.
 */

export const ORIA_GRADIENT_ID = "oria-mark-gradient";

export type MarkTone = "gradient" | "ink" | "ivory" | "currentColor";

const tones: Record<MarkTone, string> = {
  gradient: `url(#${ORIA_GRADIENT_ID})`,
  ink: "var(--ink)",
  ivory: "var(--dark-fg)",
  currentColor: "currentColor",
};

/**
 * Document-level gradient definition. Rendered once, near the top of <body>.
 * A zero-size SVG so it never affects layout.
 */
export function OriaGradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        {/* Bottom-left to top-right, coral into violet — per the identity study. */}
        <linearGradient id={ORIA_GRADIENT_ID} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="52%" stopColor="var(--color-accent-mid)" />
          <stop offset="100%" stopColor="var(--color-accent-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function OriaMark({
  size = 32,
  tone = "gradient",
  className = "",
}: {
  size?: number;
  tone?: MarkTone;
  className?: string;
}) {
  const stroke = tones[tone];
  // Below 24px the strokes thicken slightly to hold optical weight.
  const weight = size < 24 ? 7 : size < 32 ? 6.5 : 6;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`mark ${className}`.trim()}
      aria-hidden="true"
      focusable="false"
    >
      {/* The ring: one continuous pathway, one opening. */}
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke={stroke}
        strokeWidth={weight}
        strokeLinecap="round"
        strokeDasharray="118.2 20"
      />
      {/* The inlet: work entering the system. */}
      <line
        x1="51.8"
        y1="22.4"
        x2="40.1"
        y2="28.1"
        stroke={stroke}
        strokeWidth={weight}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Horizontal lockup: mark + wordmark.
 *
 * Wordmark is set, not drawn: Archivo, uppercase, +0.2em tracking, with ORIA
 * at Semibold and DIGITAL at Regular in a lighter tone. Gap between symbol and
 * wordmark is 0.36 × symbol width, per the study's construction rules.
 */
export function OriaLockup({
  markSize = 32,
  fontSize = 15,
  tone = "gradient",
  onDark = false,
  className = "",
}: {
  markSize?: number;
  fontSize?: number;
  tone?: MarkTone;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span className={`lockup ${className}`.trim()} style={{ gap: markSize * 0.36 }}>
      <OriaMark size={markSize} tone={tone} />
      <span className="wordmark" style={{ fontSize }}>
        <span className="wm-oria">ORIA</span>{" "}
        <span className="wm-digital" style={onDark ? { color: "rgba(242,237,230,.7)" } : undefined}>
          DIGITAL
        </span>
      </span>
    </span>
  );
}
