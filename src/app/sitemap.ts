import type { MetadataRoute } from "next";
import { routes } from "@/lib/nav";
import { site } from "@/lib/site";

/**
 * XML sitemap, generated from the same route table the navigation uses — so a
 * new page cannot be added to the site and forgotten by the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${site.url}${route.href === "/" ? "" : route.href}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
