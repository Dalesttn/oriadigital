import { Button } from "@/components/ui/Button";
import { primaryCta } from "@/lib/nav";
import { site } from "@/lib/site";

export function FinalCta({
  title,
  body,
  className = "",
}: {
  title?: React.ReactNode;
  body?: string;
  className?: string;
}) {
  return (
    <section style={{ padding: "0 var(--gut) var(--sec)" }} className={className} aria-labelledby="cta-heading">
      <div
        className="dark-panel sys"
        style={{ maxWidth: "var(--content)", margin: "0 auto", overflow: "hidden" }}
      >
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
            style={{
              fontSize: "clamp(36px,5vw,74px)",
              maxWidth: "16ch",
              color: "var(--dark-fg)",
            }}
          >
            {title ?? (
              <>
                Let&rsquo;s find what&rsquo;s holding your business{" "}
                <span className="ser">back.</span>
              </>
            )}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "start" }}>
            <p
              style={{
                fontSize: "17.5px",
                lineHeight: 1.74,
                maxWidth: "42ch",
                color: "var(--dark-fg-mid)",
              }}
            >
              {body ??
                "Get a free audit and I'll show you the highest-impact improvements I'd make to your digital presence. Thirty minutes, no pitch — you keep the written plan either way."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button href={primaryCta.href} size="lg" arrow>
                Book my Digital System Audit
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
