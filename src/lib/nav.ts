/** Route table. Drives the header, footer, sitemap and BreadcrumbList schema. */

export type Route = {
  href: string;
  label: string;
  /** Sitemap hints. */
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** Shown in the primary nav. */
  primary?: boolean;
  /** In the header Services dropdown and the footer's first services column. */
  service?: boolean;
  /**
   * A commercial page that is not in the header dropdown. Still needs
   * sitewide links: with no external authority, internal links are most of
   * what these pages have. GSC on 2026-10-05 showed /local-seo-perth
   * "Discovered - currently not indexed, never crawled" while it had exactly
   * one internal link, against 33 for every page in the footer.
   */
  supporting?: boolean;
  /** Excluded from the sitemap (thank-you states, etc.). */
  noSitemap?: boolean;
  /**
   * Date this page's content last meaningfully changed (YYYY-MM-DD).
   *
   * Deliberately hand-maintained. The sitemap previously emitted `new Date()`
   * at build time, so every deploy told Google all 33 URLs had changed even
   * when only one had. An unreliable lastmod is one Google learns to ignore,
   * and it wastes crawl budget a four-week-old domain cannot spare. Update
   * this when you change the page, not when you deploy.
   */
  modified: string;
};

/**
 * Commercial service pages live at the top level with Perth in the slug, per
 * the growth brief. The earlier /services/* URLs 308 to these — see
 * next.config.mjs — so nothing already indexed is lost.
 */
export const routes: Route[] = [
  { href: "/", label: "Home", priority: 1, changeFrequency: "weekly", modified: "2026-09-14" },
  { href: "/services", label: "Services", priority: 0.8, changeFrequency: "monthly", modified: "2026-09-14", primary: true },
  { href: "/web-design-perth", label: "Web Design", priority: 0.9, changeFrequency: "monthly", modified: "2026-09-14", service: true },
  { href: "/wordpress-support-perth", label: "WordPress Support", priority: 0.9, changeFrequency: "monthly", modified: "2026-09-14", service: true },
  { href: "/website-optimisation-perth", label: "Website Optimisation", priority: 0.9, changeFrequency: "monthly", modified: "2026-09-14", service: true },
  { href: "/ai-automation-perth", label: "AI Automation", priority: 0.9, changeFrequency: "monthly", modified: "2026-09-14", service: true },
  { href: "/website-maintenance-perth", label: "Website Care", priority: 0.8, changeFrequency: "monthly", modified: "2026-09-14", service: true },
  // In the WordPress cluster and sitemap, but not the Services dropdown (§33).
  { href: "/wordpress-developer-perth", label: "WordPress Developer", priority: 0.8, changeFrequency: "monthly", modified: "2026-09-14", supporting: true },
  { href: "/website-speed-optimisation-perth", label: "Speed Optimisation", priority: 0.8, changeFrequency: "monthly", modified: "2026-09-14", supporting: true },
  { href: "/small-business-web-design-perth", label: "Small Business Web Design", priority: 0.8, changeFrequency: "monthly", modified: "2026-09-14", supporting: true },
  { href: "/local-seo-perth", label: "Local SEO", priority: 0.8, changeFrequency: "monthly", modified: "2026-09-14", supporting: true },
  { href: "/work", label: "Work", priority: 0.7, changeFrequency: "monthly", modified: "2026-09-14", primary: true },
  { href: "/work/oria-haven", label: "Oria Haven case study", priority: 0.7, changeFrequency: "monthly", modified: "2026-09-14" },
  { href: "/answers", label: "Answers", priority: 0.8, changeFrequency: "weekly", modified: "2026-09-14", primary: true },
  { href: "/pricing", label: "Pricing", priority: 0.9, changeFrequency: "monthly", modified: "2026-09-14", primary: true },
  { href: "/about", label: "About", priority: 0.7, changeFrequency: "yearly", modified: "2026-09-14", primary: true },
  { href: "/contact", label: "Contact", priority: 0.8, changeFrequency: "yearly", modified: "2026-09-14", primary: true },
  { href: "/free-website-audit", label: "Free Website Audit", priority: 0.9, changeFrequency: "monthly", modified: "2026-09-14" },
  { href: "/faq", label: "FAQ", priority: 0.6, changeFrequency: "monthly", modified: "2026-09-14" },
  { href: "/privacy", label: "Privacy", priority: 0.2, changeFrequency: "yearly", modified: "2026-09-14" },
  { href: "/terms", label: "Terms", priority: 0.2, changeFrequency: "yearly", modified: "2026-09-14" },
];

export const primaryNav = routes.filter((r) => r.primary);
export const serviceRoutes = routes.filter((r) => r.service);
/** The four commercial pages not in the header dropdown. */
export const supportingRoutes = routes.filter((r) => r.supporting);
/** Everything commercial — used by the footer so none of these is starved of links. */
export const allServiceRoutes = routes.filter((r) => r.service || r.supporting);

/** Footer "Resources" column, in the order the brief specifies. */
export const resourceRoutes = ["/answers", "/work", "/pricing", "/about"].map(
  (href) => routes.find((r) => r.href === href)!,
);

export function routeByHref(href: string): Route | undefined {
  return routes.find((r) => r.href === href);
}

/**
 * The one dominant conversion. Every generic CTA on the site points here so
 * the visitor is never asked to choose between competing next steps.
 */
export const primaryCta = {
  href: "/free-website-audit",
  label: "Free Website Audit",
  labelLong: "Get a Free Website Audit",
} as const;

/** The secondary action, used beside the primary in heroes. */
export const secondaryCta = {
  href: "/pricing",
  label: "See Website Packages",
} as const;

/**
 * Old URL → new URL. Consumed by next.config.mjs for permanent redirects and
 * kept here so the mapping is visible next to the routes it refers to.
 */
export const legacyRedirects: { from: string; to: string }[] = [
  { from: "/services/websites", to: "/web-design-perth" },
  { from: "/services/optimisation", to: "/website-optimisation-perth" },
  { from: "/services/ai-automation", to: "/ai-automation-perth" },
  { from: "/services/website-care", to: "/website-maintenance-perth" },
];
