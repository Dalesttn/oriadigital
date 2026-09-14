import Link from "next/link";
import { SectionHead } from "@/components/ui/Section";
import { problemCards } from "@/lib/content/home";

/** Problem → outcome. Three cards, each naming a pain and pointing at the fix. */
export function ProblemCards() {
  return (
    <section
      className="wrap"
      style={{ paddingTop: "var(--sec)", paddingBottom: "var(--sec)" }}
      aria-labelledby="problems-heading"
    >
      <SectionHead
        className="mb-11"
        eyebrow="Sound familiar?"
        title={
          <span id="problems-heading">
            Your website should do more than <span className="ser grad">sit there.</span>
          </span>
        }
        lede="It should help people find you, understand what you do, trust your business and take the next step — and then make sure the enquiry doesn't disappear into an inbox."
        maxWidth="22ch"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
          gap: 18,
        }}
      >
        {problemCards.map((card, i) => (
          <article
            key={card.title}
            data-reveal
            data-d={i || undefined}
            className="ocard pad stack"
            style={{ gap: 14 }}
          >
            <h3 style={{ fontSize: "clamp(22px,2.2vw,26px)" }}>{card.title}</h3>
            <p style={{ fontSize: "15.5px", lineHeight: 1.7, color: "var(--color-neutral-800)" }}>
              {card.body}
            </p>
            <Link href={card.cta.href} className="lnk" data-track={card.event} style={{ marginTop: "auto", paddingTop: 8 }}>
              {card.cta.label}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
