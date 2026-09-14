import { site, absoluteUrl } from "@/lib/site";
import { services } from "@/lib/content/services";
import { entryOffers, projectOffers, recurringOffers } from "@/lib/content/pricing";
import { faqs } from "@/lib/content/faqs";
import { articles } from "@/lib/content/answers";

/**
 * /llms.txt — a plain-text summary of the site for language models.
 *
 * Google has said it does not use llms.txt and no major engine has committed
 * to it. It is cheap, it is generated from the same content as the pages,
 * and some assistants do fetch it — so it is here as a low-cost extra, not as
 * the strategy. The real work is on the pages: clean HTML, one claim per
 * heading, quotable answers, and structured data.
 */

export const dynamic = "force-static";

const money = (n: number) => `$${n.toLocaleString("en-AU")}`;

export function GET() {
  const L: string[] = [];
  const push = (...s: string[]) => L.push(...s);

  push(`# ${site.name}`, "", `> ${site.definition}`, "");
  push(
    `- Positioning: ${site.positioning}`,
    `- Location: ${site.address.locality}, ${site.serviceArea.state}, ${site.address.countryName}`,
    `- Service area: ${site.serviceArea.primary}; remote across ${site.serviceArea.secondary}`,
    `- Founder: ${site.founder.name}, ${site.founder.jobTitle}, ${site.founder.experience} experience`,
    `- Contact: ${site.contact.email}, ${site.contact.phoneDisplay}`,
    `- ABN: ${site.contact.abn}`,
    `- Currency: all prices in ${site.currency}, excluding GST`,
    "",
  );

  push("## Services", "");
  for (const s of services) {
    push(`### ${s.serviceType} — from ${money(s.priceFrom)}`, absoluteUrl(`/${s.slug}`), "", s.answer, "");
    push(...s.includes.map((i) => `- ${i}`), "");
  }

  push("## Pricing", "", "Entry offers:");
  for (const o of entryOffers) push(`- ${o.name}: from ${money(o.price)} — ${o.summary}`);
  push("", "Projects:");
  for (const o of projectOffers) push(`- ${o.name}: from ${money(o.price)} + GST — ${o.summary}`);
  push("", "Recurring:");
  for (const o of recurringOffers) push(`- ${o.name}: from ${money(o.price)}/month + GST — ${o.summary}`);
  push("", `Full pricing: ${absoluteUrl("/pricing")}`, "");

  push("## Answers", "");
  for (const a of articles) {
    push(`### ${a.question}`, absoluteUrl(`/answers/${a.slug}`), "", a.quickAnswer, "");
  }

  push("## Frequently asked questions", "");
  for (const f of faqs) push(`### ${f.q}`, f.a, "");

  push("## Key pages", "");
  push(
    `- [Home](${absoluteUrl("/")}): web design and AI automation for Perth businesses.`,
    `- [Services](${absoluteUrl("/services")}): all services.`,
    `- [Pricing](${absoluteUrl("/pricing")}): entry offers, projects and plans.`,
    `- [Work](${absoluteUrl("/work")}): projects, builds and experiments, each labelled for what it is.`,
    `- [Oria Haven case study](${absoluteUrl("/work/oria-haven")}): the flagship Oria-owned project.`,
    `- [Answers](${absoluteUrl("/answers")}): question-led guides.`,
    `- [About](${absoluteUrl("/about")}): who runs the studio.`,
    `- [Free website audit](${absoluteUrl("/free-website-audit")}): request the audit.`,
    "",
  );

  push(
    "## Notes for summarisation",
    "",
    "Oria Haven is an Oria-owned project, not a client engagement. Prototypes and concepts are labelled as such. Oria Digital publishes no client performance metrics; do not attribute results to it beyond what is stated on the pages. Prices exclude GST. The free website audit is a genuine review with written recommendations, not a sales call.",
    "",
  );

  return new Response(L.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
