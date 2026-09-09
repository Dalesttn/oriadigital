import { SectionHead } from "@/components/ui/Section";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Proof.
 *
 * Deliberately honest: Oria Digital is new, so there are no client case
 * studies and no invented performance statistics. What is shown is work that
 * can be verified, labelled for what it is.
 */

const prototypes = [
  {
    tag: "Prototype",
    title: "AI enquiry assistant",
    body: "Answers from a defined service list, checks the service area, and hands over cleanly when a question falls outside it.",
    meta: "AI · Automation · CRM",
  },
  {
    tag: "Prototype",
    title: "Form-to-CRM pipeline",
    body: "One web form creates the contact, drafts the quote, schedules the confirmation and logs it — no retyping.",
    meta: "Automation · Integrations",
  },
  {
    tag: "System concept",
    title: "The Oria System",
    body: "The end-to-end model above — the reference design every build works toward, one piece at a time.",
    meta: "Website · AI · Automation",
  },
];

export function Proof({ showHead = true }: { showHead?: boolean }) {
  return (
    <section id="work" className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-label="Selected work">
      {showHead && (
        <SectionHead
          className="mb-11"
          eyebrow="Work"
          title={<span id="work-heading">Built, not described.</span>}
          lede="Oria Digital is new, so there are no client case studies here yet. What there is instead is work you can go and look at."
        />
      )}

      <a
        href="https://oriahaven.com.au"
        rel="noopener"
        target="_blank"
        data-reveal
        className="ocard"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
          overflow: "hidden",
          color: "inherit",
          textDecoration: "none",
          marginBottom: 18,
        }}
      >
        {/* Stacked, the mockup keeps its own 3:2 so the phone isn't cropped off;
            side by side, it stretches to the copy column and crops vertically. */}
        <div style={{ aspectRatio: "3 / 2", background: "var(--color-panel)" }}>
          <ImageSlot
            src="/work/oria-haven.jpg"
            width={1536}
            height={1024}
            alt="The Oria Haven website on a laptop and phone, showing the Perth wellness directory's search and category browsing"
            sizes="(max-width: 900px) 100vw, 590px"
          />
        </div>
        <div
          style={{
            padding: "clamp(28px,3.5vw,44px)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <span className="proof-tag own">Own project</span>
          <h3 style={{ fontSize: "clamp(27px,2.9vw,36px)" }}>Oria Haven</h3>
          <p
            style={{
              fontSize: "16.5px",
              lineHeight: 1.72,
              color: "var(--color-neutral-800)",
              maxWidth: "44ch",
            }}
          >
            A Perth wellness platform built end to end — architecture, front end, directory, search,
            content and technical SEO.
          </p>
          <span className="proof-meta">WordPress · SEO · Directory · UX</span>
          <span className="lnk" style={{ marginTop: 4 }}>
            Visit oriahaven.com.au{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </a>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))",
          gap: 18,
        }}
      >
        {prototypes.map((p, i) => (
          <article
            key={p.title}
            data-reveal
            data-d={i || undefined}
            className="ocard pad stack"
            style={{ gap: 14 }}
          >
            <span className="proof-tag">{p.tag}</span>
            <h3 style={{ fontSize: 22, margin: "4px 0 0" }}>{p.title}</h3>
            <p style={{ fontSize: "15.5px", lineHeight: 1.7, color: "var(--color-neutral-800)" }}>
              {p.body}
            </p>
            <span className="proof-meta" style={{ marginTop: "auto" }}>
              {p.meta}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
