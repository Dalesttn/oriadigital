import type { MetadataRoute } from "next";
import { routes } from "@/lib/nav";
import { articles } from "@/lib/content/answers";
import { site } from "@/lib/site";

/**
 * XML sitemap, generated from the same route table the navigation uses plus
 * the Answers articles — so a new page cannot be added and forgotten.
 *
 * `lastModified` comes from hand-maintained content dates, never from build
 * time. Emitting `new Date()` told Google that all 33 URLs changed on every
 * deploy, including deploys that only touched one file. Google discounts a
 * lastmod it cannot trust, and a new domain has no crawl budget to waste on
 * re-fetching pages that did not change.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes
    .filter((r) => !r.noSitemap)
    .map((route) => ({
      url: `${site.url}${route.href === "/" ? "" : route.href}`,
      lastModified: new Date(`${route.modified}T00:00:00.000Z`),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  const answers = articles.map((a) => ({
    url: `${site.url}/answers/${a.slug}`,
    lastModified: new Date(a.modified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...answers];
}
