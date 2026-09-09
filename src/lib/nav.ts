/** Route table. Drives the header, footer, sitemap and BreadcrumbList schema. */

export type Route = {
  href: string;
  label: string;
  /** Sitemap hints. */
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** Shown in the primary nav. */
  primary?: boolean;
};

export const routes: Route[] = [
  { href: "/", label: "Home", priority: 1, changeFrequency: "monthly" },
  { href: "/services", label: "Services", priority: 0.9, changeFrequency: "monthly", primary: true },
  { href: "/services/websites", label: "Website Design & Development", priority: 0.8, changeFrequency: "monthly" },
  { href: "/services/ai-automation", label: "AI & Automation", priority: 0.8, changeFrequency: "monthly" },
  { href: "/services/optimisation", label: "Website Optimisation", priority: 0.8, changeFrequency: "monthly" },
  { href: "/services/website-care", label: "Website Care", priority: 0.8, changeFrequency: "monthly" },
  { href: "/work", label: "Work", priority: 0.7, changeFrequency: "monthly", primary: true },
  { href: "/pricing", label: "Pricing", priority: 0.9, changeFrequency: "monthly", primary: true },
  { href: "/about", label: "About", priority: 0.7, changeFrequency: "yearly", primary: true },
  { href: "/faq", label: "FAQ", priority: 0.7, changeFrequency: "monthly" },
  { href: "/contact", label: "Contact", priority: 0.9, changeFrequency: "yearly" },
  { href: "/privacy", label: "Privacy", priority: 0.2, changeFrequency: "yearly" },
  { href: "/terms", label: "Terms", priority: 0.2, changeFrequency: "yearly" },
];

export const primaryNav = routes.filter((r) => r.primary);

export const serviceRoutes = routes.filter(
  (r) => r.href.startsWith("/services/") && r.href !== "/services",
);

export function routeByHref(href: string): Route | undefined {
  return routes.find((r) => r.href === href);
}

/** Primary conversion, used everywhere so the CTA never drifts. */
export const primaryCta = {
  href: "/contact",
  label: "Book a Free Audit",
  labelLong: "Book a Free Digital System Audit",
} as const;
