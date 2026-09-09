import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock } from "@/components/ui/Section";
import { Proof } from "@/components/sections/Proof";
import { FinalCta } from "@/components/sections/FinalCta";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema } from "@/lib/schema";

const title = "Work — Projects Built by Oria Digital";
const description =
  "Selected work from Oria Digital, including Oria Haven, a Perth wellness discovery platform built end to end — architecture, front end, directory, search, content and technical SEO.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/work",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/work", name: title, description }),
          breadcrumbSchema(trail),
          {
            "@type": "CreativeWork",
            "@id": `${absoluteUrl("/work")}#oria-haven`,
            name: "Oria Haven",
            description:
              "A Perth wellness discovery platform combining directory functionality, content, search and technical SEO.",
            url: "https://oriahaven.com.au",
            image: absoluteUrl("/work/oria-haven.jpg"),
            creator: { "@id": `${absoluteUrl("/")}#organization` },
            keywords: ["WordPress", "SEO", "Directory", "UX"],
          },
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: 8 }}>
        <Breadcrumbs trail={trail} />
        <h1 style={{ fontSize: "clamp(38px,5.6vw,80px)", maxWidth: "14ch", margin: "0 0 28px" }}>
          Built, not <span className="ser grad">described.</span>
        </h1>
        <AnswerBlock>
          Oria Digital is a new studio, so there are no client case studies and no invented
          performance statistics on this page. What there is instead is work you can go and look at,
          labelled for exactly what it is.
        </AnswerBlock>
      </section>

      <div style={{ paddingTop: "clamp(36px,4vw,64px)" }}>
        <Proof showHead={false} />
      </div>

      <FinalCta
        title={
          <>
            Want to be the first <span className="ser">case study?</span>
          </>
        }
        body="Book a free audit and I'll show you the highest-impact improvements I'd make to your digital presence. Thirty minutes, no pitch — you keep the written plan either way."
      />
    </>
  );
}
