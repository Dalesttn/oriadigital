import { SectionHead } from "@/components/ui/Section";
import { journey } from "@/lib/content/home";

/**
 * From search to booked customer — the core differentiator.
 *
 * Marked up as an ordered list so the path reads correctly to a screen reader
 * and to a text-only crawler. Connectors are decorative. Reuses the dark-panel
 * node styles from the original system diagram; only the steps changed.
 */
export function Journey({
  eyebrow = "One connected system",
  title,
  lede = "Many agencies build the website and stop there. This is the whole path a customer takes — and every step of it is something I build, connect and keep improving.",
  compact = false,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: string;
  /** Tighter version for service pages. */
  compact?: boolean;
}) {
  return (
    <section style={{ padding: "0 var(--gut)" }} aria-labelledby="journey-heading">
      <div className="dark-panel sys" style={{ maxWidth: "var(--content)", margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            padding: compact
              ? "clamp(40px,5vw,64px) clamp(24px,4vw,64px)"
              : "clamp(52px,7vw,104px) clamp(24px,4vw,64px)",
          }}
        >
          <SectionHead
            className={compact ? "mb-9" : "mb-[clamp(40px,5vw,68px)]"}
            onDark
            eyebrow={eyebrow}
            title={
              <span id="journey-heading">
                {title ?? (
                  <>
                    From search to <span className="ser">booked customer.</span>
                  </>
                )}
              </span>
            }
            lede={lede}
          />

          <ol className="journey" data-reveal>
            {journey.map((step, i) => (
              <li key={step.label} className={`journey-step${"key" in step && step.key ? " key" : ""}`}>
                <span className="journey-no" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="node">
                  <i aria-hidden="true" className={"key" in step && step.key ? "pulse" : undefined} />
                  {step.label}
                </span>
                <span className="journey-detail">{step.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
