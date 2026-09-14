import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { EntryOffers } from "@/components/sections/EntryOffers";
import { FinalCta } from "@/components/sections/FinalCta";
import { projectOffers, recurringOffers, wordpressTiers, pricingDisclaimer, type Offer } from "@/lib/content/pricing";
import { faqsByTopic } from "@/lib/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { graph, webPageSchema, breadcrumbSchema, pricingSchema, faqSchema } from "@/lib/schema";

const title = "Pricing — Websites, WordPress Support, AI Automation & Care Plans";
const description =
  "Oria Digital pricing, stated plainly: WordPress fixes from $149, Website Tune-Up $299, websites from $3,500, AI assistants from $1,500, automation from $2,500, and care plans from $249 a month. All + GST, fixed quotes in writing.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/pricing",
  keywords: ["website cost Perth", "web design pricing Perth", "WordPress support cost", "AI automation pricing", "website care plan"],
  ogTitle: "Pricing",
  ogEyebrow: "Stated plainly · + GST",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
];

const pricingFaqs = faqsByTopic("pricing");

function price(o: Offer) {
  return `${o.qualifier ? "from " : ""}$${o.price.toLocaleString("en-AU")}${o.unit ?? ""}`;
}

function OfferCard({ o, i }: { o: Offer; i: number }) {
  const dark = o.featured;
  return (
    <div id={o.slug} data-reveal data-d={i || undefined} className={`plan${dark ? " plan-hero" : ""}`}>
      {dark && <span className="badge">Most chosen</span>}
      <div>
        <span className={`label${dark ? " on-dark" : ""}`} style={{ marginBottom: 12 }}>{o.unit ? "Monthly" : "One-off"}</span>
        <h3 style={{ fontSize: 24, color: dark ? "var(--dark-fg)" : undefined }}>{o.name}</h3>
      </div>
      <div>
        <span className="plan-price" style={{ fontSize: 38 }}>{price(o)}</span>
        <span style={{ display: "block", fontSize: "14px", color: dark ? "var(--dark-fg-dim)" : "var(--muted)", marginTop: 8 }}>+ GST</span>
      </div>
      <p style={{ fontSize: "15.5px", lineHeight: 1.7, color: dark ? "var(--dark-fg-mid)" : "var(--color-neutral-800)" }}>{o.summary}</p>
      <ul className="plan-list">
        {o.includes.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p style={{ fontSize: "15px", lineHeight: 1.6, color: dark ? "var(--dark-fg-dim)" : "var(--muted)" }}>
        <strong style={{ color: dark ? "var(--dark-fg)" : "var(--ink)" }}>Best for</strong> {o.bestFor}
      </p>
      <Button href={o.cta.href} variant={dark ? "primary" : "secondary"} block arrow={dark} className="mt-auto" data-track={o.event} data-track-label={o.slug}>
        {o.cta.label}
      </Button>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/pricing", name: title, description }),
          breadcrumbSchema(trail),
          pricingSchema(),
          faqSchema(pricingFaqs, "/pricing"),
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <Breadcrumbs trail={trail} />
        <h1 style={{ fontSize: "clamp(38px,5.6vw,80px)", maxWidth: "16ch", margin: "0 0 28px" }}>
          What it <span className="ser grad">costs.</span>
        </h1>
        <AnswerBlock>
          Start small if you want to: a WordPress fix is $149 and a Website Tune-Up is $299. Website builds start
          at $3,500, an AI assistant at $1,500, an automation project at $2,500, and care plans at $249 a month.
          Everything is + GST, every project is fixed-quoted in writing, and every engagement can start with a free
          audit.
        </AnswerBlock>
      </section>

      {/* Entry */}
      <EntryOffers />

      {/* WordPress tiers, verbatim from the brief */}
      <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="wp-h">
        <SectionHead className="mb-8" eyebrow="WordPress support" title={<span id="wp-h">Small fixes, priced up front.</span>} maxWidth="20ch" />
        <div className="tbl-wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Package</th>
                <th>Price</th>
                <th>Scope</th>
              </tr>
            </thead>
            <tbody>
              {wordpressTiers.map((t) => (
                <tr key={t.name}>
                  <td className="lead">{t.name}</td>
                  <td className="price">{t.price}</td>
                  <td>{t.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="tbl-note" style={{ textAlign: "center" }}>No rebuild required. Prices + GST.</p>
      </section>

      {/* Project */}
      <section id="project" className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="project-h">
        <SectionHead className="mb-10" eyebrow="Projects" title={<span id="project-h">Build once, <span className="ser grad">properly.</span></span>} maxWidth="18ch" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))", gap: 18, alignItems: "stretch" }}>
          {projectOffers.map((o, i) => (
            <OfferCard key={o.slug} o={o} i={i} />
          ))}
        </div>
      </section>

      {/* Recurring */}
      <section id="recurring" className="wrap" style={{ paddingBottom: "clamp(40px,5vw,72px)" }} aria-labelledby="recurring-h">
        <SectionHead className="mb-10" eyebrow="Monthly" title={<span id="recurring-h">Run it. Then keep <span className="ser grad">improving it.</span></span>} maxWidth="20ch" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 18, alignItems: "stretch", maxWidth: 820, margin: "0 auto" }}>
          {recurringOffers.map((o, i) => (
            <OfferCard key={o.slug} o={o} i={i} />
          ))}
        </div>
        <p className="text-center" style={{ margin: "28px auto 0", fontSize: "15.5px", lineHeight: 1.75, color: "var(--muted)", maxWidth: "70ch" }}>
          {pricingDisclaimer}
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 var(--gut) var(--sec)" }} aria-labelledby="pricing-faq">
        <SectionHead className="mb-10" eyebrow="Pricing questions" title={<span id="pricing-faq">What people ask about the numbers.</span>} maxWidth="22ch" />
        <FaqList items={pricingFaqs} />
      </section>

      <FinalCta />
    </>
  );
}
