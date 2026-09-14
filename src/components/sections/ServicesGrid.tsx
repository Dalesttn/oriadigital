import Link from "next/link";
import { SectionHead } from "@/components/ui/Section";
import { homepageServices } from "@/lib/content/services";

/** Four services, one line each, one action each. */
export function ServicesGrid() {
  return (
    <section
      id="services"
      className="wrap"
      style={{ paddingTop: "var(--sec)", paddingBottom: "var(--sec)" }}
      aria-labelledby="services-heading"
    >
      <SectionHead
        className="mb-11"
        eyebrow="What I do"
        title={<span id="services-heading">Four ways to get more from your website.</span>}
        maxWidth="20ch"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))",
          gap: 18,
        }}
      >
        {homepageServices.map((s, i) => (
          <article
            key={s.slug}
            data-reveal
            data-d={i || undefined}
            className="ocard pad stack"
            style={{ gap: 12 }}
          >
            <span className="label">{s.name}</span>
            <h3 style={{ fontSize: 21, letterSpacing: "-.035em" }}>{s.summary}</h3>
            <ul className="ticklist" style={{ margin: "4px 0 0" }}>
              {s.includes.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p style={{ marginTop: 4, fontSize: 14, color: "var(--muted)" }}>
              From ${s.priceFrom.toLocaleString("en-AU")}
              {s.slug === "website-maintenance-perth" ? "/month" : ""} + GST
            </p>
            <Link href={`/${s.slug}`} className="lnk" style={{ marginTop: "auto", paddingTop: 8 }}>
              {s.cardCta}
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
