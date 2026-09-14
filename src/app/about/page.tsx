import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock, SectionHead } from "@/components/ui/Section";
import { FounderCredibility } from "@/components/sections/FounderCredibility";
import { WhyOria } from "@/components/sections/WhyOria";
import { Journey } from "@/components/sections/Journey";
import { FinalCta } from "@/components/sections/FinalCta";
import { FaqList } from "@/components/ui/Faq";
import { faqsByTopic } from "@/lib/content/faqs";
import { audiences } from "@/lib/content/home";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema, personSchema, faqSchema } from "@/lib/schema";

const title = "About Oria Digital — Perth Web Developer Dale Sutton";
const description = `${site.definition} Run by ${site.founder.name}, ${site.founder.experience} building and supporting websites, working with businesses in Perth and across Australia.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/about", type: "profile", ogTitle: "About Oria Digital", ogEyebrow: "Perth" });

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const aboutFaqs = faqsByTopic("working-together");

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/about", name: title, description }),
          breadcrumbSchema(trail),
          personSchema(),
          { "@type": "AboutPage", "@id": `${site.url}/about#aboutpage`, mainEntity: { "@id": `${site.url}/#organization` } },
          faqSchema(aboutFaqs, "/about"),
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <Breadcrumbs trail={trail} />
        <h1 style={{ fontSize: "clamp(38px,5.6vw,80px)", maxWidth: "16ch", margin: "0 0 28px" }}>
          One person. One system. From search to <span className="ser grad">booked customer.</span>
        </h1>
        <AnswerBlock>{site.definition}</AnswerBlock>
        <p className="lede" style={{ maxWidth: "62ch", marginTop: 20 }}>
          Many agencies build the website and stop there. Most businesses then end up coordinating a developer, a
          marketing person, an automation consultant and an IT provider — and the gaps between them are where
          enquiries quietly go missing. Oria Digital covers the whole path, so the website, the follow-up and the
          systems behind them are designed as one thing.
        </p>
      </section>

      <FounderCredibility />
      <WhyOria />

      <div style={{ paddingBottom: "var(--sec)" }}>
        <Journey compact />
      </div>

      <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="who-heading">
        <SectionHead className="mb-11" eyebrow="Who I work with" title={<span id="who-heading">Built for businesses that run on enquiries.</span>} lede="Perth trades, clinics, consultants and service businesses — usually two to thirty people, already getting enquiries, handling them by hand." maxWidth="22ch" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 18 }}>
          {audiences.map((a, i) => (
            <article key={a.name} data-reveal data-d={(i % 4) || undefined} className="ocard pad stack" style={{ gap: 10 }}>
              <h3 style={{ fontSize: 20 }}>{a.name}</h3>
              <p style={{ fontSize: "15.5px", lineHeight: 1.7, color: "var(--color-neutral-800)" }}>{a.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 var(--gut) var(--sec)" }} aria-labelledby="about-faq">
        <SectionHead className="mb-10" eyebrow="Working together" title={<span id="about-faq">How it works in practice.</span>} maxWidth="20ch" />
        <FaqList items={aboutFaqs} />
      </section>

      <FinalCta />
    </>
  );
}
