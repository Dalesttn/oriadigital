"use client";

import { useId, useState } from "react";
import { SectionHead } from "@/components/ui/Section";
import { demos } from "@/lib/content/home";

/**
 * AI demo.
 *
 * The only genuinely interactive section on the homepage. All four
 * conversations are real strings in the bundle, so switching tabs is instant
 * and the default tab's content is in the server-rendered HTML for crawlers.
 * Labelled clearly as an illustration — no invented client conversations.
 */
export function AiDemo() {
  const [active, setActive] = useState(0);
  const id = useId();
  const demo = demos[active];

  return (
    <section
      className="wrap"
      style={{ paddingTop: "var(--sec)", paddingBottom: "var(--sec)" }}
      aria-labelledby="ai-demo-heading"
    >
      <SectionHead
        className="mb-10"
        eyebrow="Oria AI"
        title={<span id="ai-demo-heading">The first conversation, handled properly.</span>}
        lede="Pick a trade to see how the same system adapts. These are illustrations of the workflow, not client conversations."
        maxWidth="22ch"
      />

      <div className="dark-panel" style={{ padding: "clamp(22px,3vw,36px)" }}>
        <div className="tabs" style={{ marginBottom: 26 }} role="tablist" aria-label="Example business type">
          {demos.map((d, i) => (
            <button
              key={d.label}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              className="tab"
              onClick={() => setActive(i)}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
            gap: "clamp(20px,3vw,32px)",
            alignItems: "start",
          }}
        >
          <div className="ocard on-dark" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                padding: "15px 18px",
                borderBottom: "1px solid var(--dark-hair)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "14.5px",
                    letterSpacing: ".06em",
                    color: "var(--dark-fg)",
                  }}
                >
                  ORIA AI
                </span>
                <span style={{ display: "block", fontSize: 12, color: "var(--dark-fg-dim)", marginTop: 3 }}>
                  Customer assistant
                </span>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--accent-lift)",
                }}
              >
                <i
                  className="pulse"
                  aria-hidden="true"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "var(--accent-lift)",
                    display: "inline-block",
                  }}
                />
                Online
              </span>
            </div>
            <div className="chat" style={{ padding: 20 }}>
              <p className="bub bub-c">{demo.q}</p>
              <p className="bub bub-o">{demo.a}</p>
              <p className="bub bub-c">{demo.q2}</p>
            </div>
          </div>

          <div className="stack" style={{ gap: 18 }}>
            <div className="ocard on-dark" style={{ padding: "22px 24px" }}>
              <span className="label on-dark" style={{ marginBottom: 14 }}>
                Lead detected
              </span>
              <dl style={{ margin: 0 }}>
                <div className="lead-row">
                  <dt>Location</dt>
                  <dd>{demo.loc}</dd>
                </div>
                <div className="lead-row">
                  <dt>Service</dt>
                  <dd>{demo.svc}</dd>
                </div>
                <div className="lead-row">
                  <dt>Urgency</dt>
                  <dd>{demo.urg}</dd>
                </div>
                <div className="lead-row" style={{ borderBottom: 0 }}>
                  <dt>Status</dt>
                  <dd style={{ color: "var(--accent-lift)" }}>Qualified</dd>
                </div>
              </dl>
            </div>

            <div className="ocard on-dark" style={{ padding: "22px 24px" }}>
              <span className="label on-dark" style={{ marginBottom: 12 }}>
                Then, automatically
              </span>
              {["CRM updated", "Customer notified", "Booking offered"].map((t) => (
                <div className="tick" key={t}>
                  <i aria-hidden="true">✓</i>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
