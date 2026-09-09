import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServiceChapters } from "@/components/sections/ServiceChapters";
import { SixJobs } from "@/components/sections/SixJobs";
import { OriaSystem } from "@/components/sections/OriaSystem";
import { AiDemo } from "@/components/sections/AiDemo";
import { Proof } from "@/components/sections/Proof";
import { WhyOria } from "@/components/sections/WhyOria";
import { Process } from "@/components/sections/Process";
import { Roadmap } from "@/components/sections/Roadmap";
import { Pricing } from "@/components/sections/Pricing";
import { Founder } from "@/components/sections/Founder";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionHead } from "@/components/ui/Section";
import { FaqList } from "@/components/ui/Faq";
import { JsonLd } from "@/components/seo/JsonLd";

import { faqs } from "@/lib/content/faqs";
import { processSteps } from "@/lib/content/home";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  graph,
  webPageSchema,
  faqSchema,
  howToSchema,
  pricingSchema,
  serviceSchema,
} from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} | Websites, AI & Automation for Australian Businesses`,
  description: site.description,
  path: "/",
  keywords: [
    "web design Perth",
    "website development Australia",
    "AI automation for small business",
    "business automation Perth",
    "AI chatbot for tradies",
    "digital systems agency",
  ],
});

/** The homepage FAQ shows the six most-asked; the full set lives on /faq. */
const homeFaqs = faqs.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/",
            name: `${site.name} — Websites, AI & Automation`,
            description: site.description,
          }),
          faqSchema(homeFaqs, "/"),
          howToSchema(processSteps.map((s) => ({ title: s.title, body: s.body }))),
          pricingSchema(),
          ...["websites", "ai-automation", "optimisation", "website-care"].map(serviceSchema),
        )}
      />

      <Hero />
      <ServiceChapters />
      <SixJobs />
      <OriaSystem />
      <AiDemo />
      <Proof />
      <WhyOria />
      <Process />
      <Roadmap />
      <Pricing />
      <Founder />

      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 var(--gut) var(--sec)",
        }}
        aria-labelledby="faq-heading"
      >
        <SectionHead
          className="mb-11"
          eyebrow="FAQ"
          title={<span id="faq-heading">The things people ask before booking.</span>}
        />
        <FaqList items={homeFaqs} />
        <p style={{ marginTop: 28, fontSize: 15.5, color: "var(--muted)" }}>
          More questions are answered on the{" "}
          <a href="/faq" style={{ color: "var(--accent-start)", textDecoration: "underline" }}>
            full FAQ page
          </a>
          .
        </p>
      </section>

      <FinalCta />
    </>
  );
}
