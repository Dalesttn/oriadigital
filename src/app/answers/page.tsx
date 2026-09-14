import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow, AnswerBlock } from "@/components/ui/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { articles, plannedQuestions } from "@/lib/content/answers";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema } from "@/lib/schema";

const title = "Answers — Straight Answers to Website, WordPress & AI Questions";
const description =
  "Plain answers to the questions Perth businesses ask before spending money on a website, WordPress support or AI automation: what things cost, what's included, and what to do first.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/answers",
  ogTitle: "Answers",
  ogEyebrow: "Real questions · plain answers",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Answers", path: "/answers" },
];

export default function AnswersPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/answers", name: title, description }),
          breadcrumbSchema(trail),
          {
            "@type": "CollectionPage",
            "@id": `${absoluteUrl("/answers")}#collection`,
            name: "Answers",
            hasPart: articles.map((a) => ({ "@type": "Article", "@id": `${absoluteUrl(`/answers/${a.slug}`)}#article` })),
          },
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)" }}>
        <Breadcrumbs trail={trail} />
        <Eyebrow className="mb-6">Answers</Eyebrow>
        <h1 style={{ fontSize: "clamp(38px,5.6vw,80px)", maxWidth: "16ch", margin: "0 0 28px" }}>
          The questions people ask before they <span className="ser grad">spend money.</span>
        </h1>
        <AnswerBlock>
          Each answer opens with the short version, then the detail: real price ranges, what changes the cost,
          what&rsquo;s included, common mistakes and a recommendation. Written from ten-plus years of building and
          fixing websites for Perth businesses — not generated filler.
        </AnswerBlock>
      </section>

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }} aria-labelledby="published-h">
        <h2 id="published-h" className="label" style={{ marginBottom: 18 }}>Published</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 18 }}>
          {articles.map((a) => (
            <Link key={a.slug} href={`/answers/${a.slug}`} className="ocard pad stack" style={{ gap: 12, textDecoration: "none", color: "inherit" }}>
              <h3 style={{ fontSize: "clamp(20px,2.2vw,24px)" }}>{a.question}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--color-neutral-800)" }}>{a.description}</p>
              <span className="lnk" style={{ marginTop: "auto", paddingTop: 6 }}>
                Read the answer <span className="arrow" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="coming-h">
        <h2 id="coming-h" className="label" style={{ marginBottom: 18 }}>Coming next</h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, columns: 2, columnGap: 32, borderTop: "1px solid var(--hairline)" }}>
          {plannedQuestions.map((q) => (
            <li key={q} style={{ padding: "12px 0", borderBottom: "1px solid var(--hairline)", fontSize: 16, color: "var(--color-neutral-800)", breakInside: "avoid" }}>
              {q}
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 18, fontSize: 14.5, color: "var(--muted)", maxWidth: "60ch" }}>
          Published in roughly this order. If one of these is your question right now, ask directly — the answer
          is faster than the article.
        </p>
      </section>

      <FinalCta />
    </>
  );
}
