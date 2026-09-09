import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { graph, webPageSchema, breadcrumbSchema } from "@/lib/schema";

const title = "Privacy Policy";
const description = `How ${site.name} collects, uses, stores and protects personal information, and how to request access to or correction of your information.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/privacy" });

const trail = [
  { name: "Home", path: "/" },
  { name: "Privacy", path: "/privacy" },
];

/**
 * NOTE(launch): this is a working draft written to reflect what the site
 * actually does. It has not been reviewed by a lawyer. Have it checked against
 * the Privacy Act 1988 (Cth) and the Australian Privacy Principles before
 * launch, and replace the placeholder ABN and contact details in site.ts.
 */
export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/privacy", name: title, description }),
          breadcrumbSchema(trail),
        )}
      />

      <section className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "var(--sec)" }}>
        <Breadcrumbs trail={trail} />
        <h1 style={{ fontSize: "clamp(36px,4.6vw,64px)", marginBottom: 24 }}>Privacy Policy</h1>

        <div className="prose">
          <p>
            {site.name} respects your privacy. This policy explains what personal information is
            collected through this website, why it is collected, and what happens to it. It is
            written to align with the Australian Privacy Principles under the Privacy Act 1988
            (Cth).
          </p>

          <h2>What is collected</h2>
          <p>Two things, and nothing else:</p>
          <ul>
            <li>
              <strong>Enquiry details you submit.</strong> Your name, business name, email address,
              website address, the option you select for what you need help with, and anything you
              write in the message field.
            </li>
            <li>
              <strong>Anonymous usage analytics.</strong> If analytics is enabled, aggregate data
              about pages viewed and how visitors arrive, with IP addresses anonymised. This is not
              used to identify individuals.
            </li>
          </ul>

          <h2>Why it is collected</h2>
          <p>
            Enquiry details are used solely to reply to your enquiry, arrange the free audit and
            prepare a written plan or quote. They are not sold, rented, or used for unrelated
            marketing, and you will not be added to a mailing list without asking to be.
          </p>

          <h2>Where it is stored</h2>
          <p>
            Enquiries are stored in a secure database and sent to {site.name} by email. Service
            providers used to run this site (hosting, database, email delivery and analytics) may
            process data outside Australia. Each is engaged under its own terms and used only for
            the purpose described here.
          </p>

          <h2>How long it is kept</h2>
          <p>
            Enquiry records are kept while they are relevant to a current or prospective engagement,
            and are deleted on request at any time.
          </p>

          <h2>Cookies</h2>
          <p>
            This site sets no advertising or tracking cookies of its own. If analytics is enabled,
            it may set first-party cookies to distinguish repeat visits. You can block or clear
            these in your browser without affecting how the site works.
          </p>

          <h2>Access, correction and complaints</h2>
          <p>
            You can ask what personal information is held about you, ask for it to be corrected, or
            ask for it to be deleted, by emailing{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Requests are answered
            within a reasonable period, normally within 30 days. If you are not satisfied with the
            response, you can contact the Office of the Australian Information Commissioner.
          </p>

          <h2>Changes</h2>
          <p>
            This policy may be updated as the services change. The version published on this page is
            the current one.
          </p>

          <h2>Contact</h2>
          <p>
            {site.name}
            <br />
            {site.address.locality}, {site.address.region}, {site.address.countryName}
            <br />
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            {site.contact.abn && (
              <>
                <br />
                ABN {site.contact.abn}
              </>
            )}
          </p>
        </div>
      </section>
    </>
  );
}
