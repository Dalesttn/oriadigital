import { Button } from "@/components/ui/Button";
import { primaryCta } from "@/lib/nav";
import { site } from "@/lib/site";
import { events } from "@/lib/analytics";

/**
 * The closing call to action. Same ask as the hero — one dominant CTA on
 * the site, restated where the visitor has finished reading.
 */
export function FinalCta({
  title,
  body,
  cta,
  className = "",
}: {
  title?: React.ReactNode;
  body?: string;
  /** Page-specific primary action; defaults to the free audit. */
  cta?: { label: string; href: string; event?: string };
  className?: string;
}) {
  const primary = cta ?? { label: primaryCta.labelLong, href: primaryCta.href, event: events.auditCtaClick };

  return (
    <section style={{ padding: "0 var(--gut) var(--sec)" }} className={className} aria-labelledby="cta-heading">
      <div className="dark-panel sys" style={{ maxWidth: "var(--content)", margin: "0 auto", overflow: "hidden" }}>
        <div
          style={{
            position: "relative",
            padding: "clamp(52px,7vw,104px) clamp(24px,4vw,64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
            gap: "32px clamp(32px,5vw,72px)",
            alignItems: "end",
          }}
        >
          <h2
            id="cta-heading"
            data-reveal
            style={{ fontSize: "clamp(36px,5vw,74px)", maxWidth: "16ch", color: "var(--dark-fg)" }}
          >
            {title ?? (
              <>
                Not sure what your website <span className="ser">needs?</span>
              </>
            )}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "start" }}>
            <p style={{ fontSize: "17.5px", lineHeight: 1.74, maxWidth: "42ch", color: "var(--dark-fg-mid)" }}>
              {body ??
                "I'll review it and send you the three biggest opportunities I can see — in writing, within two business days, free. You keep the plan whether or not we work together."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button href={primary.href} size="lg" arrow data-track={primary.event}>
                {primary.label}
              </Button>
              <Button href={`mailto:${site.contact.email}`} variant="onDark" size="lg">
                Email Oria Digital
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
