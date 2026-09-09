import { SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { plans, setup, pricingDisclaimer } from "@/lib/content/pricing";

/**
 * Pricing.
 *
 * One setup cost to install the system, then a monthly plan to run and improve
 * it. Prices are stated plainly and in full — the brief asks for practical
 * rather than "contact us for pricing", and stated prices are also what answer
 * engines can actually quote.
 */
export function Pricing({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section
      id="pricing"
      className="wrap"
      style={{ paddingTop: "var(--sec)", paddingBottom: "var(--sec)" }}
      aria-labelledby="pricing-heading"
    >
      <SectionHead
        className="mb-12"
        as={heading}
        eyebrow="Pricing"
        title={
          <span id="pricing-heading">
            Build once. Run continuously. <span className="ser grad">Improve every month.</span>
          </span>
        }
        lede="One setup cost to install the system, then a monthly plan to run and improve it. Every engagement starts with the free audit and ends with a written quote."
        maxWidth="24ch"
      />

      <div className="text-center" style={{ marginBottom: 24 }}>
        <span className="label">Setup — build the system</span>
      </div>

      <div
        data-reveal
        className="ocard"
        style={{
          padding: "clamp(26px,3.5vw,42px)",
          marginBottom: "clamp(44px,5vw,68px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,290px),1fr))",
          gap: "30px clamp(32px,5vw,64px)",
          alignItems: "start",
        }}
      >
        <div>
          <span className="label" style={{ marginBottom: 14 }}>
            One-off
          </span>
          <h3 style={{ fontSize: "clamp(26px,2.8vw,34px)", margin: "0 0 14px" }}>{setup.name}</h3>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-heading)",
              fontSize: 46,
              fontWeight: 800,
              letterSpacing: "-.05em",
              lineHeight: 1,
              fontFeatureSettings: "'tnum'",
            }}
          >
            From ${setup.priceFrom.toLocaleString("en-AU")}
          </span>
          <p
            style={{
              margin: "16px 0 22px",
              fontSize: "17.5px",
              lineHeight: 1.72,
              color: "var(--color-neutral-800)",
              maxWidth: "42ch",
            }}
          >
            {setup.summary}
          </p>
          <Button href="/contact" variant="secondary" arrow>
            Start with the free audit
          </Button>
        </div>

        <ul className="plan-list" style={{ borderTop: "1px solid var(--hairline)" }}>
          {setup.lines.map((line) => (
            <li key={line.label} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16 }}>
              <span>{line.label}</span>
              <b className="mono">{line.price}</b>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center" style={{ marginBottom: 24 }}>
        <span className="label">Monthly — run, maintain and improve it</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,270px),1fr))",
          gap: 18,
          alignItems: "stretch",
        }}
      >
        {plans.map((plan, i) => {
          const dark = plan.featured;
          return (
            <div
              key={plan.slug}
              id={plan.slug}
              data-reveal
              data-d={i || undefined}
              className={`plan${dark ? " plan-hero" : ""}`}
            >
              {dark && <span className="badge">Recommended</span>}

              <div>
                <span className={`label${dark ? " on-dark" : ""}`} style={{ marginBottom: 12 }}>
                  {plan.kicker}
                </span>
                <h3 style={{ fontSize: 25, color: dark ? "var(--dark-fg)" : undefined }}>
                  {plan.name}
                </h3>
              </div>

              <div>
                <span className="plan-price">${plan.price}</span>
                <span
                  style={{
                    display: "block",
                    fontSize: "14.5px",
                    color: dark ? "var(--dark-fg-dim)" : "var(--muted)",
                    marginTop: 8,
                  }}
                >
                  {plan.priceSuffix}
                  {plan.priceNote ? ` · ${plan.priceNote}` : ""}
                </span>
              </div>

              <p
                style={{
                  fontSize: "15.5px",
                  lineHeight: 1.7,
                  color: dark ? "var(--dark-fg-mid)" : "var(--color-neutral-800)",
                }}
              >
                {plan.summary}
              </p>

              <ul className="plan-list">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <p
                style={{
                  fontSize: "15.5px",
                  lineHeight: 1.6,
                  color: dark ? "var(--dark-fg-dim)" : "var(--muted)",
                }}
              >
                <strong style={{ color: dark ? "var(--dark-fg)" : "var(--ink)" }}>Best for</strong>{" "}
                {plan.bestFor}
              </p>

              <Button
                href="/contact"
                variant={dark ? "primary" : "secondary"}
                block
                arrow={dark}
                className="mt-auto"
              >
                {plan.cta}
              </Button>
            </div>
          );
        })}
      </div>

      <p
        className="text-center"
        style={{
          margin: "28px auto 0",
          fontSize: "16.5px",
          lineHeight: 1.75,
          color: "var(--muted)",
          maxWidth: "66ch",
        }}
      >
        {pricingDisclaimer}
      </p>
    </section>
  );
}
