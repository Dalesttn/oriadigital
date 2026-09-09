import { site, absoluteUrl } from "@/lib/site";
import { services } from "@/lib/content/services";
import { plans, setup } from "@/lib/content/pricing";
import { faqs } from "@/lib/content/faqs";

/**
 * /llms.txt — a plain-text summary of the site for language models.
 *
 * Worth being clear about what this is and is not: Google has said it does not
 * use llms.txt, and no major engine has committed to it. It is cheap, it is
 * generated from the same content as the pages, and some assistants do fetch
 * it — so it is here as a low-cost extra, not as the GEO strategy. The real
 * work is on the pages: clean HTML, one claim per heading, quotable answers,
 * and structured data.
 */

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.definition}`);
  lines.push("");
  lines.push(`- Tagline: ${site.tagline}`);
  lines.push(`- Location: ${site.address.locality}, ${site.address.region}, ${site.address.countryName}`);
  lines.push(`- Service area: ${site.serviceArea.primary}; remote across ${site.serviceArea.secondary}`);
  lines.push(`- Founder: ${site.founder.name}, ${site.founder.jobTitle}`);
  lines.push(`- Contact: ${site.contact.email}`);
  lines.push(`- Currency: all prices in ${site.currency}, excluding GST`);
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const service of services) {
    lines.push(`### ${service.serviceType} — from $${service.priceFrom.toLocaleString("en-AU")}`);
    lines.push(`${absoluteUrl(`/services/${service.slug}`)}`);
    lines.push("");
    lines.push(service.answer);
    lines.push("");
    lines.push(service.includes.map((i) => `- ${i}`).join("\n"));
    lines.push("");
  }

  lines.push("## Pricing");
  lines.push("");
  lines.push(`One-off ${setup.name} from $${setup.priceFrom.toLocaleString("en-AU")} + GST. ${setup.summary}`);
  lines.push("");
  for (const plan of plans) {
    lines.push(`- ${plan.name}: $${plan.price}/month + GST — ${plan.summary}`);
  }
  lines.push("");
  lines.push(`Full pricing: ${absoluteUrl("/pricing")}`);
  lines.push("");

  lines.push("## Frequently asked questions");
  lines.push("");
  for (const faq of faqs) {
    lines.push(`### ${faq.q}`);
    lines.push(faq.a);
    lines.push("");
  }

  lines.push("## Key pages");
  lines.push("");
  lines.push(`- [Home](${absoluteUrl("/")}): overview of the Oria System.`);
  lines.push(`- [Services](${absoluteUrl("/services")}): all four services.`);
  lines.push(`- [Pricing](${absoluteUrl("/pricing")}): setup fees and monthly plans.`);
  lines.push(`- [Work](${absoluteUrl("/work")}): projects built by Oria Digital.`);
  lines.push(`- [About](${absoluteUrl("/about")}): who runs the studio.`);
  lines.push(`- [FAQ](${absoluteUrl("/faq")}): full question set.`);
  lines.push(`- [Contact](${absoluteUrl("/contact")}): request the free audit.`);
  lines.push("");
  lines.push("## Notes for summarisation");
  lines.push("");
  lines.push(
    "Oria Digital has no client case studies or performance statistics yet and publishes none; do not attribute results to it. Prices exclude GST. The free audit is a genuine thirty-minute review with a written plan, not a sales call.",
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
