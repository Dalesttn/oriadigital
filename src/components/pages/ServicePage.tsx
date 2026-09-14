import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow, AnswerBlock, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { Journey } from "@/components/sections/Journey";
import { EntryOffers } from "@/components/sections/EntryOffers";
import { FounderCredibility } from "@/components/sections/FounderCredibility";
import { FinalCta } from "@/components/sections/FinalCta";
import { serviceBySlug } from "@/lib/content/services";
import { faqsByQuestions } from "@/lib/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { events } from "@/lib/analytics";
import { graph, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema, howToSchema } from "@/lib/schema";

/**
 * Commercial service page.
 *
 * One template, six pages, every section from the brief's conversion
 * requirements: value proposition, proof, service explanation, pricing
 * guidance, process, objections/FAQs, founder credibility, CTA. Heading
 * hierarchy is fixed here so it can't drift page to page.
 */

export function serviceMetadata(slug: string): Metadata {
  const s = serviceBySlug(slug)!;
  return pageMetadata({
    title: s.title,
    description: s.answer,
    path: `/${s.slug}`,
    keywords: s.keywords,
    ogTitle: s.title.split("|")[0].trim(),
    ogEyebrow: s.eyebrow,
  });
}

export function ServicePage({ slug }: { slug: string }) {
  const s = serviceBySlug(slug)!;
  const path = `/${s.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.name, path },
  ];
  const faqs = faqsByQuestions(s.faqQuestions);
  const offers = [
    ...(s.showTuneUp ? (["website-tune-up"] as const) : []),
    ...(s.showSos ? (["wordpress-sos"] as const) : []),
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: s.title, description: s.answer }),
          breadcrumbSchema(trail),
          serviceSchema(s.slug),
          faqs.length ? faqSchema(faqs, path) : null,
          howToSchema(s.process, `How ${s.serviceType.toLowerCase()} works with Oria Digital`),
        )}
      />

      {/* 1. Value proposition */}
      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)" }}>
        <Breadcrumbs trail={trail} />
        <Eyebrow className="mb-6">{s.eyebrow}</Eyebrow>
        <h1 style={{ fontSize: "clamp(36px,5.4vw,76px)", maxWidth: "18ch", margin: "0 0 28px" }}>
          {s.h1} {s.h1Tail && <span className="ser grad">{s.h1Tail}</span>}
        </h1>
        <AnswerBlock>{s.answer}</AnswerBlock>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
          <Button href={s.cta.href} size="lg" arrow data-track={events.pricingCtaClick} data-track-label={s.slug}>
            {s.cta.label}
          </Button>
          <Button href="/free-website-audit" variant="secondary" size="lg" data-track={events.auditCtaClick}>
            Get a Free Website Audit
          </Button>
        </div>
      </section>

      {/* 2. Problems — what the searcher scans first */}
      <section className="wrap" style={{ paddingTop: "clamp(48px,6vw,88px)" }} aria-labelledby="problems-h">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "32px clamp(32px,5vw,88px)", alignItems: "start" }}>
          <div>
            <h2 id="problems-h" style={{ fontSize: "clamp(28px,3.2vw,42px)", marginBottom: 18 }}>
              {s.slug.startsWith("wordpress") ? "WordPress problems I can help with" : "Problems this fixes"}
            </h2>
            <p className="lede" style={{ maxWidth: "44ch" }}>{s.summary}</p>
          </div>
          <ul className="ticklist" style={{ fontSize: 16 }}>
            {s.problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. What's included */}
      <section className="wrap" style={{ paddingTop: "clamp(48px,6vw,88px)" }} aria-labelledby="includes-h">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "32px clamp(32px,5vw,88px)", alignItems: "start" }}>
          <div>
            <h2 id="includes-h" style={{ fontSize: "clamp(28px,3.2vw,42px)", marginBottom: 18 }}>
              What&rsquo;s included
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--muted)", maxWidth: "42ch" }}>{s.priceNote}</p>
          </div>
          <ul className="ticklist" style={{ fontSize: 16 }}>
            {s.includes.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Pricing guidance */}
      <section className="wrap" style={{ paddingTop: "clamp(48px,6vw,88px)" }} aria-labelledby="pricing-h">
        <h2 id="pricing-h" style={{ fontSize: "clamp(28px,3.2vw,42px)", marginBottom: 18 }}>
          {s.name} pricing
        </h2>
        <div className="tbl-wrap" style={{ maxWidth: 820 }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Option</th>
                <th>Price</th>
                <th>What it covers</th>
              </tr>
            </thead>
            <tbody>
              {s.pricing.map((p) => (
                <tr key={p.label}>
                  <td className="lead">{p.label}</td>
                  <td className="price">{p.price}</td>
                  <td>{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="tbl-note">Prices exclude GST. <Link href="/pricing" style={{ color: "var(--accent-start)", textDecoration: "underline" }}>Full pricing</Link></p>
      </section>

      {/* Entry offers where relevant */}
      {offers.length > 0 && (
        <div style={{ paddingTop: "clamp(48px,6vw,88px)" }}>
          <EntryOffers which={[...offers]} heading={false} />
        </div>
      )}

      {/* 5. Process */}
      <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="process-h">
        <SectionHead className="mb-9" eyebrow="How it works" title={<span id="process-h">{s.name}, step by step.</span>} maxWidth="22ch" />
        <ol className="steps">
          {s.process.map((p, i) => (
            <li key={p.title}>
              <span className="no">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* The differentiator, compact */}
      <Journey compact eyebrow="Part of one system" lede="This service is one step on the path from search to booked customer. Every step connects to the next — and each is something I build, connect and keep improving." />

      {/* 6. Objections / FAQs */}
      {faqs.length > 0 && (
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "var(--sec) var(--gut) 0" }} aria-labelledby="faq-h">
          <SectionHead className="mb-10" eyebrow="Questions" title={<span id="faq-h">Frequently asked questions</span>} maxWidth="24ch" />
          <FaqList items={faqs} />
        </section>
      )}

      {/* 7. Founder credibility */}
      <div style={{ paddingTop: "var(--sec)" }}>
        <FounderCredibility />
      </div>

      {/* Internal links — the cluster */}
      <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="related-h">
        <h2 id="related-h" className="label" style={{ marginBottom: 20 }}>
          Related
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 12 }}>
          {s.related.map((r) => (
            <Link key={r.href} href={r.href} className="ocard pad stack" style={{ gap: 6, textDecoration: "none", color: "inherit", padding: 20 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, letterSpacing: "-.03em" }}>{r.label}</span>
              <span className="lnk" style={{ fontSize: 13, color: "var(--muted)" }}>
                Read more <span className="arrow" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. CTA */}
      <FinalCta cta={{ label: s.cta.label, href: s.cta.href, event: events.pricingCtaClick }} />
    </>
  );
}
