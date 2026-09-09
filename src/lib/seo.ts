import type { Metadata } from "next";
import { site } from "./site";

/**
 * Metadata helper.
 *
 * Every page calls `pageMetadata` so that titles, canonicals, Open Graph and
 * Twitter cards are constructed identically and cannot drift. Canonical URLs
 * are absolute and self-referencing on every page — the single most common
 * technical SEO failure on marketing sites.
 */

type PageMetaInput = {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/websites". */
  path: string;
  /** Overrides the generated OG image path. */
  image?: string;
  /** Set for pages that must not be indexed (thank-you pages, etc.). */
  noindex?: boolean;
  /** ISO date — surfaces content freshness to crawlers and AI systems. */
  modified?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  /** Overrides the headline drawn on the social card. */
  ogTitle?: string;
  /** Small uppercase line above it. Defaults to the tagline. */
  ogEyebrow?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
  modified,
  keywords,
  type = "website",
  ogTitle,
  ogEyebrow,
}: PageMetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  // One renderer, titled per page — see src/app/og/route.tsx.
  const ogImage =
    image ??
    `/og?title=${encodeURIComponent(ogTitle ?? title)}${
      ogEyebrow ? `&eyebrow=${encodeURIComponent(ogEyebrow)}` : ""
    }`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(modified ? { modifiedTime: modified } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            // Long snippets give answer engines more to quote.
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Title formatter. The layout sets a `%s | Oria Digital` template, so page
 * titles pass the bare title. Use this when a page needs the full string
 * (e.g. inside Open Graph for the homepage, which opts out of the template).
 */
export function fullTitle(title: string): string {
  return `${title} | ${site.name}`;
}
