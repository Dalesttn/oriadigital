import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemCards } from "@/components/sections/ProblemCards";
import { Journey } from "@/components/sections/Journey";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { EntryOffers } from "@/components/sections/EntryOffers";
import { CaseStudyFeature } from "@/components/sections/CaseStudyFeature";
import { FounderCredibility } from "@/components/sections/FounderCredibility";
import { AiDemo } from "@/components/sections/AiDemo";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionHead } from "@/components/ui/Section";
import { FaqList } from "@/components/ui/Faq";
import { JsonLd } from "@/components/seo/JsonLd";

import { faqsByQuestions } from "@/lib/content/faqs";
import { entryOffers } from "@/lib/content/pricing";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { graph, webPageSchema, faqSchema, serviceSchema, singleOfferSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Web Design & AI Automation Perth | Oria Digital",
  description: site.description,
  path: "/",
  keywords: [
    "web design Perth",
    "AI automation Perth",
    "WordPress support Perth",
    "website optimisation Perth",
    "Perth web developer",
  ],
  ogTitle: "Web Design & AI Automation for Perth Businesses",
  ogEyebrow: "Perth · Web · AI · Automation",
});

/**
 * Homepage, in the brief's order: hero, trust, problem/outcome, the system,
 * four services, entry offers, case study, founder, automation example, FAQ,
 * CTA. Substantially shorter than before, and every section leads to one of
 * two actions: the free audit, or a specific service page.
 */
const homeFaqs = faqsByQuestions([
  "How much does a website cost in Perth?",
  "Should I rebuild my website or improve it?",
  "How much does WordPress support cost?",
  "What can AI actually automate in a small business?",
  "What happens in the free website audit?",
  "Who am I actually dealing with?",
]);

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/", name: "Web Design & AI Automation for Perth Businesses", description: site.description }),
          faqSchema(homeFaqs, "/"),
          ...["web-design-perth", "website-optimisation-perth", "ai-automation-perth", "website-maintenance-perth"].map(serviceSchema),
          ...entryOffers.map((o) => singleOfferSchema(o, "/")),
        )}
      />

      <Hero />
      <TrustBar />
      <ProblemCards />
      <Journey />
      <ServicesGrid />
      <EntryOffers />
      <CaseStudyFeature />
      <FounderCredibility />
      <AiDemo />

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 var(--gut) var(--sec)" }} aria-labelledby="faq-heading">
        <SectionHead className="mb-11" eyebrow="FAQ" title={<span id="faq-heading">The things people ask before booking.</span>} />
        <FaqList items={homeFaqs} />
        <p style={{ marginTop: 28, fontSize: 15.5, color: "var(--muted)" }}>
          More questions are answered in{" "}
          <Link href="/answers" style={{ color: "var(--accent-start)", textDecoration: "underline" }}>Answers</Link> and the{" "}
          <Link href="/faq" style={{ color: "var(--accent-start)", textDecoration: "underline" }}>full FAQ</Link>.
        </p>
      </section>

      <FinalCta />
    </>
  );
}
