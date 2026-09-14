import type { MetadataRoute } from "next";
import { routes } from "@/lib/nav";
import { articles } from "@/lib/content/answers";
import { site } from "@/lib/site";

/**
 * XML sitemap, generated from the same route table the navigation uses plus
 * the Answers articles — so a new page cannot be added and forgotten.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = routes
    .filter((r) => !r.noSitemap)
    .map((route) => ({
      url: `${site.url}${route.href === "/" ? "" : route.href}`,
      lastModified,
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
