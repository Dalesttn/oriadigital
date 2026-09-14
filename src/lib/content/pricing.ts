/**
 * Pricing — the ladder from the growth brief: an entry rung that costs less
 * than a tank of fuel, project work, then recurring plans.
 *
 * One set of numbers, one place to change them. Feeds the pricing page, the
 * entry-offer sections, the service pages and the Offer JSON-LD. All prices
 * are AUD and exclude GST, matching the copy on the page.
 */

export type Offer = {
  slug: string;
  name: string;
  price: number;
  /** "from", or empty for a fixed price. */
  qualifier?: "from";
  /** "/month" for recurring. */
  unit?: "/month";
  summary: string;
  /** What you get. Short, scannable. */
  includes: string[];
  /** Who it suits. */
  bestFor: string;
  cta: { label: string; href: string };
  /** GA4 event fired on CTA click. */
  event?: string;
  featured?: boolean;
};

/** Entry offers — the low-risk first step. */
export const entryOffers: Offer[] = [
  {
    slug: "wordpress-sos",
    name: "WordPress SOS",
    price: 149,
    qualifier: "from",
    summary: "One small WordPress problem, fixed. No rebuild required.",
    includes: [
      "Broken layouts and Elementor problems",
      "Contact forms not sending",
      "Mobile display issues",
      "Plugin conflicts and update fallout",
      "CSS and styling problems",
      "Speed issues and minor WooCommerce faults",
    ],
    bestFor: "a site that mostly works but has one thing wrong with it.",
    cta: { label: "Get WordPress Help", href: "/contact?need=wordpress" },
    event: "wordpress_sos_click",
  },
  {
    slug: "website-tune-up",
    name: "Website Tune-Up",
    price: 299,
    qualifier: "from",
    summary: "A review of the biggest issues affecting conversions, speed and SEO — and the top ones fixed.",
    includes: [
      "Website review across conversions, mobile, speed, SEO and CTAs",
      "Prioritised recommendations, ranked by impact",
      "Up to 2 hours of fixes on the highest-priority items",
      "Before/after summary",
      "Optional next-step roadmap",
    ],
    bestFor: "a site that's fine but isn't producing enquiries.",
    cta: { label: "Book a Website Tune-Up", href: "/contact?need=improve" },
    event: "tuneup_click",
    featured: true,
  },
];

/** Project work — one-off builds. */
export const projectOffers: Offer[] = [
  {
    slug: "website-build",
    name: "Website Build",
    price: 3500,
    qualifier: "from",
    summary: "A small-business website built around the enquiry.",
    includes: [
      "Strategy, structure and copy direction",
      "Custom design, mobile first",
      "WordPress or Next.js build",
      "Forms wired to your inbox, CRM or calendar",
      "Technical SEO and analytics from day one",
    ],
    bestFor: "trades, clinics and service businesses that need a site that converts.",
    cta: { label: "Get a Website Quote", href: "/contact?need=new" },
    event: "pricing_cta_click",
    featured: true,
  },
  {
    slug: "advanced-website",
    name: "Advanced Website",
    price: 6500,
    qualifier: "from",
    summary: "For custom functionality, integrations or a larger content architecture.",
    includes: [
      "Everything in Website Build",
      "Custom post types, directories or member areas",
      "Integrations with booking, CRM or payment systems",
      "Larger content and landing-page architecture",
      "Performance budget and monitoring",
    ],
    bestFor: "businesses with real functional requirements, not just pages.",
    cta: { label: "Discuss a Project", href: "/contact?need=new" },
    event: "pricing_cta_click",
  },
  {
    slug: "ai-assistant",
    name: "AI Assistant",
    price: 1500,
    qualifier: "from",
    summary: "A lead qualification or customer support assistant, installed and tuned.",
    includes: [
      "Trained only on your services, prices and rules",
      "Service-area and urgency qualification",
      "Hand-over rules and readable transcripts",
      "Connected to your CRM or calendar",
      "Tuned together over the first weeks",
    ],
    bestFor: "businesses fielding the same questions after hours.",
    cta: { label: "Discuss Automation", href: "/contact?need=ai" },
    event: "pricing_cta_click",
  },
  {
    slug: "automation-project",
    name: "Automation Project",
    price: 2500,
    qualifier: "from",
    summary: "Custom workflow automation across the tools you already use.",
    includes: [
      "Enquiry → CRM → calendar → confirmation, end to end",
      "Follow-up sequences by email and SMS",
      "Missed-call text-back",
      "Quote, reminder and review-request workflows",
      "Monitoring so you know when something stops",
    ],
    bestFor: "businesses retyping the same information into three systems.",
    cta: { label: "Discuss Automation", href: "/contact?need=ai" },
    event: "pricing_cta_click",
  },
];

/** Recurring plans. */
export const recurringOffers: Offer[] = [
  {
    slug: "website-care",
    name: "Website Care",
    price: 249,
    qualifier: "from",
    unit: "/month",
    summary: "Keep everything secure, maintained and running.",
    includes: [
      "Managed hosting, SSL and daily backups",
      "Security monitoring and updates",
      "Uptime monitoring",
      "Small content changes",
      "Monthly health check and report",
    ],
    bestFor: "a good website that needs looking after.",
    cta: { label: "Choose Website Care", href: "/contact?need=care" },
    event: "pricing_cta_click",
  },
  {
    slug: "growth-optimisation",
    name: "Growth + Optimisation",
    price: 499,
    qualifier: "from",
    unit: "/month",
    summary: "Your website doesn't just sit there. It gets measured and improved every month.",
    includes: [
      "Everything in Website Care",
      "Analytics review and conversion optimisation",
      "SEO improvements and new landing pages",
      "AI assistant and follow-up automation, where installed",
      "Automation monitoring",
      "Monthly report and up to 2 hours of improvement work",
    ],
    bestFor: "businesses with regular enquiries who want more of them.",
    cta: { label: "Choose Growth", href: "/contact?need=care" },
    event: "pricing_cta_click",
    featured: true,
  },
];

/** WordPress support tiers — the table from the brief, verbatim. */
export const wordpressTiers = [
  { name: "Quick Fix", price: "$149", scope: "One small WordPress issue" },
  { name: "Website Tune-Up", price: "$299", scope: "Audit + priority fixes" },
  { name: "Half-Day Support", price: "$495", scope: "Up to 4 hours" },
  { name: "Monthly Care", price: "$249+ / month", scope: "Maintenance + support" },
] as const;

export const pricingDisclaimer =
  "All prices exclude GST. Entry offers are fixed. Project work is fixed-quoted in writing after the free audit. Growth + Optimisation has a three-month minimum term, then continues month to month. Work beyond a plan's included hours is $150/hour or quoted separately.";

export const allOffers = [...entryOffers, ...projectOffers, ...recurringOffers];
