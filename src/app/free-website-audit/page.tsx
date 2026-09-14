import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";
import { AuditForm } from "@/components/sections/AuditForm";
import { auditChecklist } from "@/lib/content/home";
import { pageMetadata } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema } from "@/lib/schema";

const title = "Free Website Audit for Perth Businesses";
const description =
  "Get a free website audit from a Perth web developer. Ten checks — positioning, mobile, CTAs, speed, technical SEO, trust, lead capture, Google visibility, conversion, automation — and three to five priority recommendations in writing within two business days.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/free-website-audit",
  keywords: ["free website audit Perth", "website review Perth", "website audit"],
  ogTitle: "Free Website Audit",
  ogEyebrow: "Perth · in writing · two business days",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Free Website Audit", path: "/free-website-audit" },
];

export default function FreeAuditPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/free-website-audit", name: title, description }),
          breadcrumbSchema(trail),
          {
            "@type": "Offer",
            "@id": `${absoluteUrl("/free-website-audit")}#audit`,
            name: "Free Website Audit",
            description,
            price: 0,
            priceCurrency: site.currency,
            availability: "https://schema.org/InStock",
            seller: { "@id": `${site.url}/#organization` },
            areaServed: "AU",
          },
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "var(--sec)" }}>
        <Breadcrumbs trail={trail} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "52px clamp(32px,5vw,88px)", alignItems: "start" }}>
          <div>
            <Eyebrow className="mb-6">Free website audit</Eyebrow>
            <h1 style={{ fontSize: "clamp(38px,5.2vw,74px)", lineHeight: 1.04, margin: "0 0 26px", maxWidth: "14ch" }}>
              Find out what your website <span className="ser grad">isn&rsquo;t doing.</span>
            </h1>
            <p className="lede" style={{ maxWidth: "48ch", marginBottom: 30 }}>
              Send me the address. I&rsquo;ll review it and send back the three to five biggest opportunities I can
              see — in writing, within two business days, free. You keep the recommendations whether or not we work
              together.
            </p>

            <h2 className="label" style={{ marginBottom: 12 }}>What gets reviewed</h2>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--hairline)", columns: 2, columnGap: 24 }}>
              {auditChecklist.map((item, i) => (
                <li key={item} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 10, padding: "11px 0", borderBottom: "1px solid var(--hairline)", fontSize: 15, breakInside: "avoid" }}>
                  <span style={{ fontSize: 11.5, fontWeight: 800, fontFeatureSettings: "'tnum'", paddingTop: 3, color: "var(--color-neutral-500)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <p style={{ marginTop: 26, fontSize: 14.5, lineHeight: 1.7, color: "var(--muted)", maxWidth: "46ch" }}>
              If a recommendation is worth doing, I&rsquo;ll say what it would cost — usually a $149 fix, a $299
              Tune-Up, or a scoped project. No call unless you want one.
            </p>
          </div>

          <AuditForm />
        </div>
      </section>
    </>
  );
}
