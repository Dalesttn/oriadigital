import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { pricingDisclaimer } from "@/lib/content/pricing";
import { graph, webPageSchema, breadcrumbSchema } from "@/lib/schema";

const title = "Terms of Use";
const description = `The terms that apply to this website and to engagements with ${site.name}, including quotes, pricing, minimum terms and intellectual property.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/terms" });

const trail = [
  { name: "Home", path: "/" },
  { name: "Terms", path: "/terms" },
];

/**
 * NOTE(launch): a working draft describing how the business actually operates.
 * Have it reviewed by a lawyer before launch — in particular the liability and
 * Australian Consumer Law sections.
 */
export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/terms", name: title, description }),
          breadcrumbSchema(trail),
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "var(--sec)" }}>
        <Breadcrumbs trail={trail} />
        <h1 style={{ fontSize: "clamp(36px,4.6vw,64px)", marginBottom: 24 }}>Terms of Use</h1>

        <div className="prose">
          <p>
            These terms apply to this website. Client work is governed by the written proposal and
            quote for that engagement, which takes precedence over anything on this page.
          </p>

          <h2>Information on this site</h2>
          <p>
            The content here is general information about services offered by {site.name}. It is not
            professional advice for your specific situation. Diagrams, workflows, sample
            conversations and example figures shown on this site are illustrations of how the
            systems work — they are not client data and do not represent results achieved for any
            business.
          </p>

          <h2>Pricing and quotes</h2>
          <p>
            Prices published on this site are indicative starting points in Australian dollars and
            exclude GST. {pricingDisclaimer}
          </p>
          <p>
            A binding price is the one in your written quote. Quotes are valid for 30 days unless
            stated otherwise.
          </p>

          <h2>The free audit</h2>
          <p>
            The free digital system audit is offered at no cost and with no obligation. The written
            plan produced from it is yours to keep and to act on however you choose, including with
            another provider.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The design, text, code and graphics on this site belong to {site.name}. Ownership of
            work produced for a client is set out in that engagement&rsquo;s agreement; as a general
            rule, on final payment the client owns the deliverables, and {site.name} retains its own
            pre-existing tools and components.
          </p>

          <h2>Third-party services</h2>
          <p>
            Systems built by {site.name} often connect to third-party services such as hosting,
            CRMs, calendars, payment providers and AI platforms. Those services are governed by
            their own terms, and their availability is not something {site.name} controls.
          </p>

          <h2>Liability</h2>
          <p>
            Nothing in these terms excludes rights you have under the Australian Consumer Law. To
            the extent permitted by law, {site.name} is not liable for indirect or consequential
            loss arising from use of this website.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms:{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
