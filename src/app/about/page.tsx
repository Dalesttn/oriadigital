import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock, SectionHead } from "@/components/ui/Section";
import { Founder } from "@/components/sections/Founder";
import { WhyOria } from "@/components/sections/WhyOria";
import { FinalCta } from "@/components/sections/FinalCta";
import { FaqList } from "@/components/ui/Faq";
import { faqsByTopic } from "@/lib/content/faqs";
import { audiences } from "@/lib/content/home";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema, personSchema, faqSchema } from "@/lib/schema";

const title = "About Oria Digital";
const description = `${site.definition} Founded in ${site.founded} by ${site.founder.name}, working with businesses in Perth and across Australia.`;

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/about",
  type: "profile",
});

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
          {
            "@type": "AboutPage",
            "@id": `${site.url}/about#aboutpage`,
            mainEntity: { "@id": `${site.url}/#organization` },
          },
          faqSchema(aboutFaqs, "/about"),
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <Breadcrumbs trail={trail} />
        <h1 style={{ fontSize: "clamp(38px,5.6vw,80px)", maxWidth: "16ch", margin: "0 0 28px" }}>
          One person. Web, digital, IT and <span className="ser grad">AI.</span>
        </h1>
        <AnswerBlock>{site.definition}</AnswerBlock>
        <p className="lede" style={{ maxWidth: "62ch", marginTop: 20 }}>
          Most businesses end up coordinating a web developer, a marketing person, an automation
          consultant and an IT provider — and the gaps between them are where things quietly stop
          working. Oria Digital covers all four, so the website, the enquiry path and the systems
          behind them are designed as one thing.
        </p>
      </section>

      <Founder />
      <WhyOria />

      <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="who-heading">
        <SectionHead
          className="mb-11"
          eyebrow="Who I work with"
          title={<span id="who-heading">Built for businesses that want to move forward.</span>}
          lede="Oria Digital works with Australian small businesses where enquiries matter and admin is eating time that should go into the work itself."
          maxWidth="22ch"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))",
            gap: 18,
          }}
        >
          {audiences.map((a, i) => (
            <article
              key={a.name}
              data-reveal
              data-d={(i % 4) || undefined}
              className="ocard pad stack"
              style={{ gap: 10 }}
            >
              <h3 style={{ fontSize: 20 }}>{a.name}</h3>
              <p style={{ fontSize: "15.5px", lineHeight: 1.7, color: "var(--color-neutral-800)" }}>
                {a.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        style={{ maxWidth: 900, margin: "0 auto", padding: "0 var(--gut) var(--sec)" }}
        aria-labelledby="about-faq"
      >
        <SectionHead
          className="mb-10"
          eyebrow="Working together"
          title={<span id="about-faq">How it works in practice.</span>}
          maxWidth="20ch"
        />
        <FaqList items={aboutFaqs} />
      </section>

      <FinalCta />
    </>
  );
}
