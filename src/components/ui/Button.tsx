import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "onDark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  onDark: "btn-onDark",
};

const sizes: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** The north-east arrow that lifts on hover. Reserved for forward actions. */
  arrow?: boolean;
  block?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/**
 * The site has exactly one button. External links and mailto: fall through to
 * a plain anchor so `next/link` never prefetches something off-site.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  block = false,
  className = "",
  ...rest
}: Props) {
  const classes = ["btn", variants[variant], sizes[size], block ? "btn-block" : "", className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {arrow && (
        <span className="ne" aria-hidden="true">
          &#8599;
        </span>
      )}
    </>
  );

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { rel: "noopener", target: "_blank" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
