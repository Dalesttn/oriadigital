import Image from "next/image";

/**
 * Image slot.
 *
 * Renders a real optimised <Image> when a source exists, and a designed,
 * clearly-labelled placeholder when it does not — so a missing asset is
 * obvious in review rather than shipping as a broken image. `width`/`height`
 * are always supplied so the box is reserved before the image loads and CLS
 * stays at zero either way.
 */
export function ImageSlot({
  src,
  alt,
  width,
  height,
  note,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 50vw",
  /** Focal point for the crop. Portraits usually want the face, not the centre. */
  objectPosition = "center",
  className = "",
  style,
}: {
  src?: string;
  alt: string;
  width: number;
  height: number;
  /** Shown in the placeholder to say what belongs here. */
  note?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={className}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, ...style }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={className}
      style={{
        aspectRatio: `${width} / ${height}`,
        width: "100%",
        height: "100%",
        minHeight: 260,
        display: "grid",
        placeItems: "center",
        padding: 24,
        textAlign: "center",
        background:
          "repeating-linear-gradient(135deg, var(--color-panel) 0 12px, rgba(23,23,23,.035) 12px 24px)",
        ...style,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".16em",
          textTransform: "uppercase",
          color: "var(--muted)",
          maxWidth: "28ch",
          lineHeight: 1.8,
        }}
      >
        {note ?? alt}
      </span>
    </div>
  );
}
