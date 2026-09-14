import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { articles, articleBySlug, type ArticleSection } from "@/lib/content/answers";
import { faqsByQuestions } from "@/lib/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { events } from "@/lib/analytics";
import { graph, webPageSchema, breadcrumbSchema, articleSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.question,
    description: a.description,
    path: `/answers/${a.slug}`,
    keywords: a.keywords,
    type: "article",
    modified: a.modified,
    ogEyebrow: "Answers",
  });
}

function Section({ s }: { s: ArticleSection }) {
  if (s.type === "paragraphs") {
    return (
      <>
        {s.heading && <h2>{s.heading}</h2>}
        {s.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </>
    );
  }
  if (s.type === "list") {
    return (
      <>
        <h2>{s.heading}</h2>
        {s.intro && <p>{s.intro}</p>}
        <ul>
          {s.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </>
    );
  }
  return (
    <>
      <h2>{s.heading}</h2>
      {s.intro && <p>{s.intro}</p>}
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              {s.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {s.note && <p className="tbl-note">{s.note}</p>}
    </>
  );
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();

  const path = `/answers/${a.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Answers", path: "/answers" },
    { name: a.question, path },
  ];
  const faqs = faqsByQuestions(a.faqQuestions);
  const date = new Date(a.modified).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: a.question, description: a.description, modified: a.modified }),
          breadcrumbSchema(trail),
          articleSchema(a),
          faqs.length ? faqSchema(faqs, path) : null,
        )}
      />

      <article className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "var(--sec)" }}>
        <Breadcrumbs trail={trail} />
        <Eyebrow className="mb-6">Answers</Eyebrow>
        <h1 style={{ fontSize: "clamp(34px,4.8vw,66px)", maxWidth: "20ch", margin: "0 0 20px" }}>{a.question}</h1>
        <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 28 }}>
          By {site.founder.name} · Updated {date}
        </p>

        <div className="article">
          {/* Quick answer — the citable block */}
          <p className="quick">{a.quickAnswer}</p>

          {a.sections.map((s, i) => (
            <Section key={i} s={s} />
          ))}

          {faqs.length > 0 && (
            <>
              <h2>Related questions</h2>
              <FaqList items={faqs} defaultOpen={-1} group="article" />
            </>
          )}

          <div style={{ marginTop: 44, padding: "26px 28px", borderRadius: "var(--radius-md)", background: "var(--color-panel)", display: "flex", flexDirection: "column", gap: 14 }}>
            <span className="label">Next step</span>
            <p style={{ margin: 0 }}>
              Want this applied to your own site? Start with the free audit, or go straight to{" "}
              <Link href={a.service.href} style={{ color: "var(--accent-start)", textDecoration: "underline" }}>{a.service.label}</Link>.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button href="/free-website-audit" arrow data-track={events.auditCtaClick}>Get a Free Website Audit</Button>
              <Button href={a.service.href} variant="secondary">{a.service.cta}</Button>
            </div>
          </div>
        </div>
      </article>

      <FinalCta />
    </>
  );
}
