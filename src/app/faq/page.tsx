import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock } from "@/components/ui/Section";
import { FaqList } from "@/components/ui/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqs, faqsByTopic, type Faq } from "@/lib/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { graph, webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

const title = "Frequently Asked Questions";
const description =
  "Answers to the questions Australian businesses ask Oria Digital: what a website costs, what AI can actually automate, whether an existing site can be improved, minimum terms, and what happens in the free audit.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/faq",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

const groups: { heading: string; topic: Faq["topic"] }[] = [
  { heading: "Pricing and plans", topic: "pricing" },
  { heading: "Services", topic: "service" },
  { heading: "AI and automation", topic: "ai" },
  { heading: "Working together", topic: "working-together" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/faq", name: title, description }),
          breadcrumbSchema(trail),
          // The whole set on one page — the strongest single FAQPage signal.
          faqSchema(faqs, "/faq"),
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)" }}>
        <Breadcrumbs trail={trail} />
        <h1 style={{ fontSize: "clamp(38px,5.6vw,80px)", maxWidth: "15ch", margin: "0 0 28px" }}>
          The things people ask before <span className="ser grad">booking.</span>
        </h1>
        <AnswerBlock>
          Everything below is answered plainly and in full — pricing, minimum terms, what AI can
          realistically automate, and what happens in the free audit. If something you need to know
          is not here, email or book the audit and ask directly.
        </AnswerBlock>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(40px,5vw,72px) var(--gut) var(--sec)" }}>
        {groups.map((group) => {
          const items = faqsByTopic(group.topic);
          if (!items.length) return null;
          return (
            <section key={group.topic} style={{ marginBottom: 56 }} aria-labelledby={`faq-${group.topic}`}>
              <h2
                id={`faq-${group.topic}`}
                style={{ fontSize: "clamp(24px,2.8vw,34px)", marginBottom: 12 }}
              >
                {group.heading}
              </h2>
              <FaqList items={items} defaultOpen={-1} group={group.topic} />
            </section>
          );
        })}
      </div>

      <FinalCta />
    </>
  );
}
