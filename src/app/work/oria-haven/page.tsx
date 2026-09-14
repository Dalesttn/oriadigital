import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow, AnswerBlock } from "@/components/ui/Section";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FinalCta } from "@/components/sections/FinalCta";
import { oriaHaven } from "@/lib/content/work";
import { pageMetadata } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema } from "@/lib/schema";

const cs = oriaHaven;
const path = "/work/oria-haven";
const title = "Oria Haven Case Study — A Perth Wellness Discovery Platform";

export const metadata: Metadata = pageMetadata({
  title,
  description: cs.summary,
  path,
  image: cs.images[0].src,
  ogEyebrow: "Case study",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "Oria Haven", path },
];

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section style={{ paddingTop: "clamp(36px,4.5vw,64px)" }} aria-labelledby={`h-${heading.toLowerCase().replace(/\W+/g, "-")}`}>
      <h2 id={`h-${heading.toLowerCase().replace(/\W+/g, "-")}`} style={{ fontSize: "clamp(26px,3vw,38px)", marginBottom: 16 }}>
        {heading}
      </h2>
      {children}
    </section>
  );
}

export default function OriaHavenPage() {
  const hero = cs.images[0];
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: title, description: cs.summary }),
          breadcrumbSchema(trail),
          {
            "@type": "CreativeWork",
            "@id": `${absoluteUrl(path)}#casestudy`,
            name: cs.client,
            headline: cs.title,
            description: cs.summary,
            url: cs.url,
            image: absoluteUrl(hero.src),
            creator: { "@id": `${site.url}/#organization` },
            keywords: cs.technology.join(", "),
            genre: "Case study",
          },
        )}
      />

      <article className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "var(--sec)" }}>
        <Breadcrumbs trail={trail} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
          <Eyebrow>Case study</Eyebrow>
          <span className="badge-inline">{cs.badge}</span>
        </div>
        <h1 style={{ fontSize: "clamp(36px,5.4vw,76px)", maxWidth: "16ch", margin: "0 0 24px" }}>{cs.title}</h1>
        <AnswerBlock>{cs.summary}</AnswerBlock>

        <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 18, margin: "32px 0 0", padding: "22px 0", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
          {[
            ["Project", cs.client],
            ["Industry", cs.industry],
            ["Role", "Design, build, SEO — end to end"],
            ["Live at", cs.url.replace("https://", "")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label" style={{ marginBottom: 6 }}>{k}</dt>
              <dd style={{ margin: 0, fontSize: 15.5, fontWeight: 600 }}>
                {k === "Live at" ? <a href={cs.url} rel="noopener" target="_blank" style={{ color: "var(--accent-start)", textDecoration: "underline" }}>{v}</a> : v}
              </dd>
            </div>
          ))}
        </dl>

        <div style={{ marginTop: 36, borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--hairline)", background: "var(--color-panel)", aspectRatio: `${hero.w}/${hero.h}` }}>
          <ImageSlot src={hero.src} alt={hero.alt} width={hero.w} height={hero.h} sizes="(max-width: 1180px) 100vw, 1180px" priority />
        </div>

        <div className="article" style={{ maxWidth: "74ch" }}>
          <Block heading="The challenge"><p>{cs.problem}</p></Block>
          <Block heading="The goal"><p>{cs.goal}</p></Block>
          <Block heading="Strategy"><ul>{cs.strategy.map((s) => <li key={s}>{s}</li>)}</ul></Block>
          <Block heading="What was built"><ul className="ticklist" style={{ fontSize: 16 }}>{cs.built.map((b) => <li key={b}>{b}</li>)}</ul></Block>
          <Block heading="Technology"><ul className="chips">{cs.technology.map((t) => <li key={t}>{t}</li>)}</ul></Block>
          <Block heading="Key decisions"><ul>{cs.decisions.map((d) => <li key={d}>{d}</li>)}</ul></Block>
          <Block heading="Result"><p>{cs.result}</p></Block>
          <Block heading="Lessons and next steps"><ul>{cs.lessons.map((l) => <li key={l}>{l}</li>)}</ul></Block>
          <Block heading="Services used">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {cs.services.map((s) => (
                <Link key={s.href} href={s.href} className="btn btn-secondary btn-sm">{s.label}</Link>
              ))}
            </div>
          </Block>
        </div>
      </article>

      <FinalCta
        title={<>Want something built <span className="ser">properly?</span></>}
        body="A free website audit is the fastest way to find out whether your business needs a new site, a better one, or the system behind it. In writing, within two business days."
      />
    </>
  );
}
