import Link from "next/link";
import { Eyebrow } from "@/components/ui/Section";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { oriaHaven } from "@/lib/content/work";
import { events } from "@/lib/analytics";

/**
 * The flagship proof piece. Not a portfolio thumbnail: the challenge, what
 * was built, and a route into the full case study.
 */
export function CaseStudyFeature() {
  const hero = oriaHaven.images[0];

  return (
    <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="case-heading">
      <div
        data-reveal
        className="ocard"
        style={{
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
          alignItems: "stretch",
        }}
      >
        <div style={{ aspectRatio: `${hero.w} / ${hero.h}`, background: "var(--color-panel)" }}>
          <ImageSlot src={hero.src} alt={hero.alt} width={hero.w} height={hero.h} sizes="(max-width: 900px) 100vw, 590px" />
        </div>

        <div
          style={{
            padding: "clamp(28px,3.5vw,48px)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <Eyebrow>Built by Oria Digital</Eyebrow>
            <span className="badge-inline">{oriaHaven.badge}</span>
          </div>
          <h2 id="case-heading" style={{ fontSize: "clamp(26px,3vw,38px)" }}>
            {oriaHaven.title}
          </h2>
          <p style={{ fontSize: "16.5px", lineHeight: 1.72, color: "var(--color-neutral-800)", maxWidth: "46ch" }}>
            {oriaHaven.client}: a scalable wellness discovery platform built around search, local
            content, user intent and custom WordPress functionality.
          </p>
          <ul className="ticklist" style={{ maxWidth: "46ch" }}>
            {oriaHaven.built.slice(0, 5).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginTop: 6 }}>
            <Link href="/work/oria-haven" className="lnk" data-track={events.caseStudyView}>
              View the Oria Haven case study
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a
              href={oriaHaven.url}
              rel="noopener"
              target="_blank"
              style={{ fontSize: 14, color: "var(--muted)", textDecoration: "underline" }}
            >
              Visit the live site
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
