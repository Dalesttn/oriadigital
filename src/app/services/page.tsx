import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow, AnswerBlock, SectionHead } from "@/components/ui/Section";
import { Journey } from "@/components/sections/Journey";
import { Process } from "@/components/sections/Process";
import { FinalCta } from "@/components/sections/FinalCta";
import { services } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";

const title = "Services — Web Design, WordPress, Optimisation, AI Automation & Care";
const description =
  "Oria Digital services for Perth businesses: web design from $3,500, WordPress support from $149, website optimisation from $299, AI automation from $1,500 and website care from $249 a month. One connected system from search to booked customer.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/services", ogTitle: "Services", ogEyebrow: "Perth" });

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
            itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.serviceType, url: absoluteUrl(`/${s.slug}`) })),
          },
          ...services.map((s) => serviceSchema(s.slug)),
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <Breadcrumbs trail={trail} />
        <Eyebrow className="mb-6">Services</Eyebrow>
        <h1 style={{ fontSize: "clamp(42px,6.2vw,92px)", lineHeight: 1.02, maxWidth: "14ch", margin: "0 0 28px" }}>
          Get found. Convert. <span className="ser grad">Follow up.</span>
        </h1>
        <AnswerBlock>
          Six services, one system. Take them separately or together — a free website audit tells you which part
          is holding your business back first. Every price below is a starting point, + GST, with a fixed quote
          in writing before any work starts.
        </AnswerBlock>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-label="Service list">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 18 }}>
          {services.map((s, i) => (
            <article key={s.slug} data-reveal data-d={(i % 4) || undefined} className="ocard pad stack" style={{ gap: 12 }}>
              <span className="label">{s.eyebrow}</span>
              <h2 style={{ fontSize: "clamp(22px,2.4vw,27px)", letterSpacing: "-.035em" }}>{s.summary}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--color-neutral-800)" }}>{s.answer.split(". ").slice(0, 2).join(". ")}.</p>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>From ${s.priceFrom.toLocaleString("en-AU")}{s.slug === "website-maintenance-perth" ? "/month" : ""} + GST</p>
              <Link href={`/${s.slug}`} className="lnk" style={{ marginTop: "auto", paddingTop: 8 }}>
                {s.cardCta} <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Journey />

      <div style={{ paddingTop: "var(--sec)" }}>
        <Process />
      </div>

      <section className="wrap" style={{ paddingBottom: "var(--sec)" }}>
        <SectionHead eyebrow="Not sure which?" title={<>That&rsquo;s what the audit is <span className="ser grad">for.</span></>} lede="Ten checks, three to five written recommendations, two business days, free." maxWidth="18ch" />
      </section>

      <FinalCta />
    </>
  );
}
