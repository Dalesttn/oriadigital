import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema } from "@/lib/schema";

const title = "Contact Oria Digital — Perth Web Design & Automation";
const description =
  "Tell Oria Digital what you need — a new website, an improvement to the one you have, a WordPress fix, AI automation or ongoing care — and get a reply from the developer within one business day.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact", ogTitle: "Contact", ogEyebrow: "Reply within one business day" });

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/contact", name: title, description }),
          breadcrumbSchema(trail),
          { "@type": "ContactPage", "@id": `${absoluteUrl("/contact")}#contactpage`, mainEntity: { "@id": `${site.url}/#organization` } },
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "var(--sec)" }}>
        <Breadcrumbs trail={trail} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "52px clamp(32px,5vw,88px)", alignItems: "start" }}>
          <div>
            <Eyebrow className="mb-6">Contact</Eyebrow>
            <h1 style={{ fontSize: "clamp(38px,5.2vw,74px)", lineHeight: 1.04, margin: "0 0 26px", maxWidth: "15ch" }}>
              Tell me what you&rsquo;re <span className="ser grad">working on.</span>
            </h1>
            <p className="lede" style={{ maxWidth: "46ch", marginBottom: 30 }}>
              Two short steps. Pick what you need, add your details, and you&rsquo;ll hear back from me — not an
              account manager — within one business day.
            </p>

            <div style={{ borderTop: "1px solid var(--hairline)", fontSize: 15, lineHeight: 1.75, color: "var(--color-neutral-800)" }}>
              <div style={{ padding: "18px 0", borderBottom: "1px solid var(--hairline)" }}>
                <span className="label" style={{ marginBottom: 6 }}>Not sure what you need?</span>
                The <a href="/free-website-audit" style={{ color: "var(--accent-start)", textDecoration: "underline" }}>free website audit</a> is the better starting point. Send the address and get written recommendations back.
              </div>
              <div style={{ padding: "18px 0", borderBottom: "1px solid var(--hairline)" }}>
                <span className="label" style={{ marginBottom: 6 }}>Prefer to call or email?</span>
                <a href={`mailto:${site.contact.email}`} style={{ color: "var(--accent-start)", textDecoration: "underline" }}>{site.contact.email}</a>
                <br />
                <a href={`tel:${site.contact.phone}`} style={{ color: "var(--accent-start)", textDecoration: "underline" }}>{site.contact.phoneDisplay}</a>
                <br />
                {site.address.locality}, {site.serviceArea.state} · working with businesses Australia-wide
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="ocard" style={{ minHeight: 420 }} aria-busy="true" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
