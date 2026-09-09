import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock, SectionHead } from "@/components/ui/Section";
import { Pricing } from "@/components/sections/Pricing";
import { FaqList } from "@/components/ui/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqsByTopic } from "@/lib/content/faqs";
import { pageMetadata } from "@/lib/seo";
import {
  graph,
  webPageSchema,
  breadcrumbSchema,
  pricingSchema,
  setupOfferSchema,
  faqSchema,
} from "@/lib/schema";

const title = "Pricing — Website, AI & Automation Plans";
const description =
  "Oria Digital pricing: a one-off Digital System Setup from $3,500, then a monthly plan — Oria Care $249, Oria Grow $499 or Oria System $899 a month, all excluding GST.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/pricing",
  keywords: [
    "website cost Australia",
    "web design pricing Perth",
    "AI automation pricing",
    "website maintenance plans Australia",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
];

const pricingFaqs = faqsByTopic("pricing");

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/pricing", name: title, description }),
          breadcrumbSchema(trail),
          pricingSchema(),
          setupOfferSchema(),
          faqSchema(pricingFaqs, "/pricing"),
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)" }}>
        <Breadcrumbs trail={trail} />
        <h1 style={{ fontSize: "clamp(38px,5.6vw,80px)", maxWidth: "16ch", margin: "0 0 28px" }}>
          What Oria Digital <span className="ser grad">costs.</span>
        </h1>
        <AnswerBlock>
          Oria Digital charges a one-off setup fee to build the system, then a monthly plan to run
          and improve it. Setup starts at $3,500. Monthly plans are Oria Care at $249, Oria Grow at
          $499 and Oria System at $899, all excluding GST. Every engagement starts with a free audit
          and a written quote.
        </AnswerBlock>
      </section>

      <Pricing />

      <section
        style={{ maxWidth: 900, margin: "0 auto", padding: "0 var(--gut) var(--sec)" }}
        aria-labelledby="pricing-faq"
      >
        <SectionHead
          className="mb-10"
          eyebrow="Pricing questions"
          title={<span id="pricing-faq">What people ask about the plans.</span>}
          maxWidth="22ch"
        />
        <FaqList items={pricingFaqs} />
      </section>

      <FinalCta />
    </>
  );
}
