import { Eyebrow } from "@/components/ui/Section";
import { roadmap } from "@/lib/content/home";

/** What the monthly subscription actually buys, month by month. */
export function Roadmap() {
  return (
    <section style={{ padding: "0 var(--gut)" }} aria-labelledby="roadmap-heading">
      <div
        className="dark-panel"
        style={{
          maxWidth: "var(--content)",
          margin: "0 auto",
          padding: "clamp(44px,6vw,86px) clamp(24px,4vw,64px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
            gap: "clamp(32px,5vw,72px)",
            alignItems: "center",
          }}
        >
          <div>
            <Eyebrow onDark className="mb-[22px]">
              The subscription, explained
            </Eyebrow>
            <h2
              id="roadmap-heading"
              style={{
                fontSize: "clamp(32px,4.1vw,54px)",
                margin: "0 0 20px",
                color: "var(--dark-fg)",
              }}
            >
              Your website shouldn&rsquo;t be <span className="ser">finished.</span>
            </h2>
            <p
              style={{
                fontSize: "17.5px",
                lineHeight: 1.74,
                color: "var(--dark-fg-mid)",
                maxWidth: "44ch",
              }}
            >
              Every month I look at what customers are doing, where enquiries are dropping off and
              what can be automated next. That&rsquo;s the difference between a site you own and a
              system that improves.
            </p>
          </div>

          <div className="month" data-reveal>
            {roadmap.map((m, i) => (
              <div key={m.label} style={{ display: "contents" }}>
                <div className="month-rail" aria-hidden="true">
                  <span className="month-dot" />
                  {i < roadmap.length - 1 && <span className="month-line" />}
                </div>
                <div
                  className="month-body"
                  style={i === roadmap.length - 1 ? { paddingBottom: 0 } : undefined}
                >
                  <span className="month-lb">{m.label}</span>
                  <div className="month-tx">{m.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
