import { SectionHead } from "@/components/ui/Section";

/**
 * The Oria System — the site's centrepiece diagram.
 *
 * Marked up as an ordered list so the path reads correctly to a screen reader
 * and to a text-only crawler: Website → AI assistant → Qualification →
 * CRM/Booking → Follow-up/Calendar → Customer. The connectors are decorative.
 */
export function OriaSystem() {
  return (
    <section style={{ padding: "0 var(--gut)" }} aria-labelledby="system-heading">
      <div className="dark-panel sys" style={{ maxWidth: "var(--content)", margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            padding: "clamp(52px,7vw,104px) clamp(24px,4vw,64px)",
          }}
        >
          <SectionHead
            className="mb-[clamp(40px,5vw,68px)]"
            onDark
            eyebrow="The Oria System"
            title={
              <span id="system-heading">
                One system. <span className="ser">Every customer touchpoint.</span>
              </span>
            }
            lede="A website is one part. This is the whole path a customer takes — and every step of it is something I build, connect and keep improving."
          />

          <div className="sys-in" data-reveal>
            <span className="node">
              <i aria-hidden="true" />
              Website
            </span>
            <span className="drop" aria-hidden="true" />
            <span className="node key">
              <i className="pulse" aria-hidden="true" />
              AI assistant
            </span>
            <span className="drop" aria-hidden="true" />
            <span className="node">
              <i aria-hidden="true" />
              Qualification
            </span>
            <span className="split" aria-hidden="true">
              <i />
              <i />
            </span>
            <div className="pair">
              <span className="node">
                <i aria-hidden="true" />
                CRM
              </span>
              <span className="node">
                <i aria-hidden="true" />
                Booking
              </span>
            </div>
            <div className="pair" aria-hidden="true">
              <span className="drop" />
              <span className="drop" />
            </div>
            <div className="pair">
              <span className="node">
                <i aria-hidden="true" />
                Follow-up
              </span>
              <span className="node">
                <i aria-hidden="true" />
                Calendar
              </span>
            </div>
            <span className="split up" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="node out">
              <i aria-hidden="true" />
              Customer
            </span>
          </div>

          <p
            className="text-center"
            style={{
              margin: "clamp(36px,4vw,56px) auto 0",
              fontSize: "16.5px",
              lineHeight: 1.7,
              color: "var(--dark-fg-dim)",
              maxWidth: "52ch",
            }}
          >
            Build the parts you need first. The rest connects to it later — that is what the monthly
            plan is for.
          </p>
        </div>
      </div>
    </section>
  );
}
