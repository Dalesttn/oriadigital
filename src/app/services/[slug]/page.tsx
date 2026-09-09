import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow, AnswerBlock, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { services, serviceBySlug } from "@/lib/content/services";
import { faqs } from "@/lib/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { graph, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";

/** Fully static — every service page is prerendered at build time. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  return pageMetadata({
    title: `${service.serviceType} for Australian Businesses`,
    description: service.answer,
    path: `/services/${service.slug}`,
    keywords: service.answers,
  });
}

/** Two FAQs per page, chosen so each service page carries relevant Q&A. */
const faqTopicForSlug: Record<string, string[]> = {
  websites: ["How much does a website cost in Perth?", "How long does a website take to build?"],
  "ai-automation": [
    "What can AI actually automate in a small business?",
    "Will the AI say something wrong to my customers?",
    "Do I pay extra for AI usage?",
  ],
  optimisation: ["Can you improve my existing website?", "Do you work with WordPress?"],
  "website-care": ["Do you provide ongoing support?", "Is there a minimum commitment?"],
};

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ];
  const pageFaqs = faqs.filter((f) => (faqTopicForSlug[service.slug] ?? []).includes(f.q));
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path,
            name: service.serviceType,
            description: service.answer,
            about: service.serviceType,
          }),
          breadcrumbSchema(trail),
          serviceSchema(service.slug),
          pageFaqs.length ? faqSchema(pageFaqs, path) : null,
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)" }}>
        <Breadcrumbs trail={trail} />
        <Eyebrow className="mb-6">
          {service.number} — {service.chapter}
        </Eyebrow>
        <h1 style={{ fontSize: "clamp(36px,5.4vw,76px)", maxWidth: "18ch", margin: "0 0 28px" }}>
          {service.headline}{" "}
          {service.headlineTail && <span className="ser grad">{service.headlineTail}</span>}
        </h1>
        <AnswerBlock>{service.answer}</AnswerBlock>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
          <Button href="/contact" size="lg" arrow>
            Book a Free Digital System Audit
          </Button>
          <Button href="/pricing" variant="secondary" size="lg">
            See pricing
          </Button>
        </div>
      </section>

      <section
        className="wrap"
        style={{ paddingTop: "clamp(48px,6vw,88px)", paddingBottom: "clamp(48px,6vw,88px)" }}
        aria-labelledby="includes-heading"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
            gap: "44px clamp(32px,5vw,88px)",
            alignItems: "start",
          }}
        >
          <div>
            <h2 id="includes-heading" style={{ fontSize: "clamp(28px,3.2vw,42px)", marginBottom: 20 }}>
              What&rsquo;s included
            </h2>
            <p className="lede" style={{ maxWidth: "46ch", marginBottom: 26 }}>
              {service.intro}
            </p>
            <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: "42ch" }}>
              {service.priceNote}
            </p>
          </div>

          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid var(--hairline)",
            }}
          >
            {service.includes.map((item) => (
              <li
                key={item}
                style={{
                  display: "grid",
                  gridTemplateColumns: "22px 1fr",
                  gap: 14,
                  padding: "16px 0",
                  borderBottom: "1px solid var(--hairline)",
                  fontSize: "15.5px",
                  lineHeight: 1.6,
                }}
              >
                <span aria-hidden="true" style={{ color: "var(--accent-start)", fontWeight: 800 }}>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {pageFaqs.length > 0 && (
        <section
          style={{ maxWidth: 900, margin: "0 auto", padding: "0 var(--gut) clamp(48px,6vw,88px)" }}
          aria-labelledby="service-faq-heading"
        >
          <SectionHead
            className="mb-10"
            eyebrow="Questions"
            title={<span id="service-faq-heading">{service.name} — common questions</span>}
            maxWidth="24ch"
          />
          <FaqList items={pageFaqs} />
        </section>
      )}

      <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="other-services">
        <h2 id="other-services" className="label" style={{ marginBottom: 20 }}>
          Other services
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
            gap: 16,
          }}
        >
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="ocard pad stack"
              style={{ gap: 10, textDecoration: "none", color: "inherit" }}
            >
              <span className="label">{s.chapter}</span>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: 20,
                  letterSpacing: "-.035em",
                }}
              >
                {s.name}
              </span>
              <span style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.6 }}>
                From ${s.priceFrom.toLocaleString("en-AU")}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
