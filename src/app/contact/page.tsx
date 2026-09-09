import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema } from "@/lib/schema";

const title = "Book a Free Website & AI Audit";
const description =
  "Request a free thirty-minute digital system audit from Oria Digital. A review of your website, your enquiry path and the repetitive work worth automating first — with a short written plan within two business days.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/contact",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const auditSteps = [
  {
    no: "01",
    title: "Website review",
    body: "speed, search visibility, and whether it asks for the enquiry.",
  },
  {
    no: "02",
    title: "Enquiry path",
    body: "what happens between “someone's interested” and “job booked”.",
  },
  {
    no: "03",
    title: "Automation shortlist",
    body: "the three repetitive tasks worth removing first.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/contact", name: title, description }),
          breadcrumbSchema(trail),
          {
            "@type": "ContactPage",
            "@id": `${absoluteUrl("/contact")}#contactpage`,
            mainEntity: { "@id": `${site.url}/#organization` },
          },
          {
            "@type": "Offer",
            "@id": `${absoluteUrl("/contact")}#audit`,
            name: "Free Website & AI Audit",
            description:
              "A free thirty-minute review of a business website, enquiry path and automation opportunities, followed by a short written plan within two business days.",
            price: 0,
            priceCurrency: site.currency,
            availability: "https://schema.org/InStock",
            seller: { "@id": `${site.url}/#organization` },
            areaServed: "AU",
          },
        )}
      />

      <section
        className="wrap"
        style={{
          paddingTop: "clamp(40px,5vw,72px)",
          paddingBottom: "var(--sec)",
        }}
      >
        <Breadcrumbs trail={trail} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
            gap: "52px clamp(32px,5vw,88px)",
            alignItems: "start",
          }}
        >
          <div>
            <Eyebrow className="mb-6">Free Digital System Audit</Eyebrow>
            <h1 style={{ fontSize: "clamp(38px,5.2vw,74px)", lineHeight: 1.04, margin: "0 0 26px", maxWidth: "15ch" }}>
              Tell me what you&rsquo;re <span className="ser grad">working on.</span>
            </h1>
            <p
              style={{
                fontSize: "16.5px",
                lineHeight: 1.75,
                margin: "0 0 34px",
                color: "var(--color-neutral-800)",
                maxWidth: "48ch",
              }}
            >
              Thirty minutes, no pitch. I look at your site, how enquiries reach you and what
              you&rsquo;re doing by hand — then you get a short written plan within two business
              days.
            </p>

            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                borderTop: "1px solid var(--hairline)",
              }}
            >
              {auditSteps.map((step) => (
                <li
                  key={step.no}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "30px 1fr",
                    gap: 12,
                    padding: "16px 0",
                    borderBottom: "1px solid var(--hairline)",
                    fontSize: 15,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      fontFeatureSettings: "'tnum'",
                      paddingTop: 3,
                      color: "var(--color-neutral-500)",
                    }}
                  >
                    {step.no}
                  </span>
                  <span>
                    <strong>{step.title}</strong> — {step.body}
                  </span>
                </li>
              ))}
            </ol>

            <div style={{ marginTop: 34, fontSize: 14, lineHeight: 1.75, color: "var(--color-neutral-800)" }}>
              <span className="label" style={{ marginBottom: 8 }}>
                Prefer to call or email?
              </span>
              <a
                href={`mailto:${site.contact.email}`}
                style={{ color: "var(--accent-start)", textDecoration: "underline" }}
              >
                {site.contact.email}
              </a>
              <br />
              {site.contact.phone && (
                <>
                  <a
                    href={`tel:${site.contact.phone}`}
                    style={{ color: "var(--accent-start)", textDecoration: "underline" }}
                  >
                    {site.contact.phoneDisplay}
                  </a>
                  <br />
                </>
              )}
              {site.address.locality} · working with businesses Australia-wide
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
