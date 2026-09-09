import type { ReactNode } from "react";

export function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span className={`eyebrow${onDark ? " on-dark" : ""} ${className}`.trim()}>{children}</span>
  );
}

/**
 * Centred section header: kicker, heading, optional standfirst.
 *
 * `as` exists so heading levels stay correct per page — a section that is the
 * page's subject uses h1, everything else h2. One H1 per page, always.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  as: Tag = "h2",
  onDark = false,
  maxWidth = "20ch",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  as?: "h1" | "h2";
  onDark?: boolean;
  maxWidth?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`.trim()}>
      {eyebrow && (
        <Eyebrow onDark={onDark} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className="mx-auto"
        style={{
          fontSize: "clamp(34px,4.5vw,60px)",
          maxWidth,
          marginBottom: lede ? 18 : 0,
          color: onDark ? "var(--dark-fg)" : undefined,
        }}
      >
        {title}
      </Tag>
      {lede && (
        <p
          className={onDark ? undefined : "lede"}
          style={{
            margin: "0 auto",
            maxWidth: "56ch",
            ...(onDark
              ? { fontSize: "17.5px", lineHeight: 1.72, color: "var(--dark-fg-mid)" }
              : {}),
          }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/**
 * A short, self-contained answer placed directly under a page's H1.
 *
 * This is the AEO primitive: search engines and LLMs quote the first
 * substantive passage after a heading, so every key page states its claim
 * once, plainly, in a block that reads correctly out of context.
 */
export function AnswerBlock({ children }: { children: ReactNode }) {
  return (
    <p
      className="lede"
      style={{
        maxWidth: "62ch",
        fontSize: "clamp(17px,1.8vw,20px)",
        color: "var(--ink)",
      }}
    >
      {children}
    </p>
  );
}
