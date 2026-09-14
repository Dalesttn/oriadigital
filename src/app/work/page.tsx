import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow, AnswerBlock } from "@/components/ui/Section";
import { CaseStudyFeature } from "@/components/sections/CaseStudyFeature";
import { FinalCta } from "@/components/sections/FinalCta";
import { projects } from "@/lib/content/work";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema } from "@/lib/schema";

const title = "Recent Work, Builds & Experiments";
const description =
  "Websites, platforms, automation workflows and digital systems built by Oria Digital — including Oria Haven, a Perth wellness discovery platform. Every project labelled for exactly what it is.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/work", ogEyebrow: "Work" });

const trail = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/work", name: title, description }),
          breadcrumbSchema(trail),
          {
            "@type": "ItemList",
            "@id": `${absoluteUrl("/work")}#list`,
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              ...(p.href ? { url: absoluteUrl(p.href) } : {}),
            })),
          },
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(36px,4vw,64px)" }}>
        <Breadcrumbs trail={trail} />
        <Eyebrow className="mb-6">Work</Eyebrow>
        <h1 style={{ fontSize: "clamp(38px,5.6vw,80px)", maxWidth: "14ch", margin: "0 0 28px" }}>
          Recent work, builds &amp; <span className="ser grad">experiments.</span>
        </h1>
        <AnswerBlock>
          Explore websites, platforms, automation workflows and digital systems built by Oria Digital. Every
          project carries a badge that says exactly what it is — client project, Oria-owned project, prototype,
          experiment or concept — and no result appears here that wasn&rsquo;t measured.
        </AnswerBlock>
      </section>

      <CaseStudyFeature />

      <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="more-h">
        <h2 id="more-h" className="label" style={{ marginBottom: 18 }}>Prototypes and concepts</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 18 }}>
          {projects
            .filter((p) => p.slug !== "oria-haven")
            .map((p, i) => (
              <article key={p.title} data-reveal data-d={i || undefined} className="ocard pad stack" style={{ gap: 14 }}>
                <span className="badge-inline" style={{ alignSelf: "flex-start", borderColor: "var(--hairline)", color: "var(--muted)" }}>{p.badge}</span>
                <h3 style={{ fontSize: 22 }}>{p.title}</h3>
                <p style={{ fontSize: "15.5px", lineHeight: 1.7, color: "var(--color-neutral-800)" }}>{p.summary}</p>
                <ul className="chips" style={{ marginTop: "auto", paddingTop: 6 }}>
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {p.href && (
                  <Link href={p.href} className="lnk">
                    Read more <span className="arrow" aria-hidden="true">→</span>
                  </Link>
                )}
              </article>
            ))}
        </div>
        <p style={{ marginTop: 24, fontSize: 14.5, color: "var(--muted)", maxWidth: "62ch" }}>
          Client case studies are added here as projects complete and clients agree to them, using the same
          template: challenge, strategy, what was built, technology, key decisions, result, screenshots, lessons.
        </p>
      </section>

      <FinalCta
        title={<>Want to be the next <span className="ser">case study?</span></>}
        body="Start with a free website audit. If there's a project in it, you'll get a fixed written quote — and, if you're happy to, a case study at the end."
      />
    </>
  );
}
