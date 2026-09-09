import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow, AnswerBlock } from "@/components/ui/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { services } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";

const title = "Services — Websites, AI, Automation & Optimisation";
const description =
  "Oria Digital services for Australian businesses: website design and development from $3,500, AI enquiry assistants and automation from $1,500, website optimisation from $299, and website care from $249 a month.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/services",
  keywords: [
    "web design services Perth",
    "AI automation services Australia",
    "website optimisation",
    "website maintenance Australia",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/services", name: title, description }),
          breadcrumbSchema(trail),
          {
            "@type": "ItemList",
            "@id": `${absoluteUrl("/services")}#list`,
            name: "Oria Digital services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.serviceType,
              url: absoluteUrl(`/services/${s.slug}`),
            })),
          },
          ...services.map((s) => serviceSchema(s.slug)),
        )}
      />

      <section
        className="wrap"
        style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(36px,5vw,64px)" }}
      >
        <Breadcrumbs trail={trail} />
        <div className="text-center">
          <Eyebrow className="mb-6">Services</Eyebrow>
          <h1 style={{ fontSize: "clamp(42px,6.6vw,98px)", lineHeight: 1.02, margin: "0 auto" }}>
            Build. Automate. <span className="ser grad">Improve.</span>
          </h1>
        </div>
        <div style={{ display: "grid", placeItems: "center", marginTop: 30 }}>
          <AnswerBlock>
            Oria Digital offers four services for Australian small businesses: website design and
            development, AI assistants and business automation, website and search optimisation, and
            ongoing website care. Take them separately or together — the free audit tells you which
            part is holding your business back first.
          </AnswerBlock>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-label="Service list">
        {services.map((s) => (
          <article key={s.slug} className="chapter" data-reveal>
            <span className="chapter-no" aria-hidden="true">
              {s.number}
            </span>
            <div className="chapter-copy">
              <span className="label" style={{ marginBottom: 16 }}>
                {s.number} &nbsp;—&nbsp; {s.chapter}
              </span>
              <h2>
                {s.headline} {s.headlineTail && <span className="ser grad">{s.headlineTail}</span>}
              </h2>
              <p className="lede" style={{ margin: "0 0 22px", maxWidth: "46ch" }}>
                {s.intro}
              </p>
              <Link href={`/services/${s.slug}`} className="lnk">
                {s.name}{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="chapter-media">
              <div className="ocard pad">
                <span className="label" style={{ marginBottom: 16 }}>
                  What&rsquo;s included
                </span>
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "14.5px",
                    borderTop: "1px solid var(--hairline)",
                  }}
                >
                  {s.rows.map((row) => (
                    <li
                      key={row.label}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: 16,
                        padding: "12px 0",
                        borderBottom: "1px solid var(--hairline)",
                      }}
                    >
                      <span>{row.label}</span>
                      <span style={{ color: "var(--muted)", fontSize: 12 }}>{row.note}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: 18, fontSize: 14.5, color: "var(--muted)" }}>
                  {s.priceNote}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <FinalCta
        title={
          <>
            Not sure which one you need? That&rsquo;s what the audit is{" "}
            <span className="ser">for.</span>
          </>
        }
      />
    </>
  );
}
