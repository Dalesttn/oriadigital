import Link from "next/link";
import { SectionHead } from "@/components/ui/Section";

/**
 * Editorial service chapters — three, alternating, with an oversized ghost
 * numeral behind each. Deliberately not a card grid: the brief asks for
 * editorial composition, and each chapter is a real internal link into the
 * matching /services/* page rather than decoration.
 */

function BuildVisual() {
  return (
    <div className="mini">
      <div className="mini-bar">
        <i />
        <i />
        <span style={{ marginLeft: 6 }}>yourbusiness.com.au</span>
      </div>
      <div className="mini-body">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            paddingBottom: 16,
            borderBottom: "1px solid var(--hairline)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          <span>Logo</span>
          <span>Services</span>
          <span
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: "var(--grad)",
              color: "#fff",
              letterSpacing: ".08em",
            }}
          >
            Book
          </span>
        </div>
        <div style={{ padding: "24px 0 20px" }}>
          <span className="label" style={{ marginBottom: 10 }}>
            Hero
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(21px,2.4vw,27px)",
              letterSpacing: "-.045em",
              lineHeight: 1.1,
              maxWidth: "16ch",
            }}
          >
            Your business needs more enquiries.
          </span>
          <span
            style={{
              display: "inline-block",
              marginTop: 16,
              padding: "9px 16px",
              borderRadius: 999,
              background: "var(--ink)",
              color: "#fff",
              fontSize: "12.5px",
              fontWeight: 700,
            }}
          >
            Get a quote
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {["Services", "Service area", "Reviews"].map((cell) => (
            <div
              key={cell}
              style={{
                padding: 12,
                border: "1px solid var(--hairline)",
                borderRadius: "var(--radius-sm)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--muted)",
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const workflow = [
  { n: "01", label: "New enquiry" },
  { n: "02", label: "AI assistant", on: true },
  { n: "03", label: "Qualified" },
  { n: "04", label: "CRM" },
  { n: "05", label: "Booking" },
  { n: "06", label: "Follow-up" },
];

function AutomateVisual() {
  return (
    <div className="mini">
      <div className="mini-bar">
        <span>Enquiry workflow · illustration</span>
      </div>
      <div className="mini-body stack">
        {workflow.map((row, i) => (
          <div key={row.n} style={{ display: "contents" }}>
            {i > 0 && <span className="wf-link" aria-hidden="true" />}
            <div className={`wf-row${row.on ? " on" : ""}`}>
              <span className="n">{row.n}</span>
              {row.label}
              <span className="s" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImproveVisual() {
  return (
    <div className="mini">
      <div className="mini-bar">
        <span>What Oria measures</span>
      </div>
      <div className="mini-body">
        {["Enquiry conversion", "Reply time", "Search visibility", "Page speed"].map((m, i, a) => (
          <div key={m} className="metric" style={i === a.length - 1 ? { borderBottom: 0 } : undefined}>
            <span>{m}</span>
            <b className="mono">Tracked</b>
          </div>
        ))}
        <div
          style={{
            marginTop: 20,
            padding: 16,
            border: "1px dashed var(--hairline)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <span className="label" style={{ marginBottom: 12 }}>
            Example optimisation — not client data
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "var(--muted)", width: 44 }}>Before</span>
            <span className="track" style={{ flex: 1 }}>
              <i style={{ width: "38%", background: "rgba(23,23,23,.24)" }} />
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: "var(--muted)", width: 44 }}>After</span>
            <span className="track" style={{ flex: 1 }}>
              <i style={{ width: "64%" }} />
            </span>
          </div>
          <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6, color: "var(--muted)" }}>
            An illustration of the kind of change an optimisation pass looks for. Your own numbers
            replace this once tracking is running.
          </p>
        </div>
      </div>
    </div>
  );
}

const chapters = [
  {
    no: "01",
    label: "Build",
    title: "A website that asks for the enquiry.",
    body: "Most local business sites are brochures. I design around the one action a customer needs to take next — call, quote or book — and build it fast and search-ready.",
    cta: "How I build",
    href: "/services/websites",
    visual: <BuildVisual />,
    flip: false,
  },
  {
    no: "02",
    label: "Automate",
    title: "The work that happens after someone gets in touch.",
    body: "An assistant trained on your own services, prices and area answers first. Then the workflows carry the result into your CRM, calendar and accounting — so nobody retypes anything.",
    cta: "How automation works",
    href: "/services/ai-automation",
    visual: <AutomateVisual />,
    flip: true,
  },
  {
    no: "03",
    label: "Improve",
    title: "Because the first version is never the best one.",
    body: "Search visibility, page speed, mobile experience and the forms people actually finish — reviewed against what actually comes in, and changed when the numbers say so.",
    cta: "What I measure",
    href: "/services/optimisation",
    visual: <ImproveVisual />,
    flip: false,
  },
];

export function ServiceChapters() {
  return (
    <section
      id="services"
      className="wrap"
      style={{ paddingTop: "var(--sec)", paddingBottom: "var(--sec)" }}
      aria-labelledby="services-heading"
    >
      <SectionHead
        className="mb-[clamp(20px,3vw,44px)]"
        eyebrow="What I do"
        title={
          <span id="services-heading">
            Build. Automate. <span className="ser grad">Improve.</span>
          </span>
        }
      />

      {chapters.map((c) => (
        <div key={c.no} className={`chapter${c.flip ? " chapter-flip" : ""}`} data-reveal>
          <span className="chapter-no" aria-hidden="true">
            {c.no}
          </span>
          <div className="chapter-copy">
            <span className="label" style={{ marginBottom: 16 }}>
              {c.no} &nbsp;—&nbsp; {c.label}
            </span>
            <h3>{c.title}</h3>
            <p className="lede" style={{ margin: "0 0 22px", maxWidth: "46ch" }}>
              {c.body}
            </p>
            <Link href={c.href} className="lnk">
              {c.cta}{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
          <div className="chapter-media">{c.visual}</div>
        </div>
      ))}
    </section>
  );
}
