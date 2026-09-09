/**
 * Pricing content. Feeds the pricing section, the /pricing page and the
 * Offer / AggregateOffer JSON-LD — one set of numbers, one place to change it.
 *
 * All prices exclude GST and are stated in AUD, matching the copy on the page.
 */

export type Plan = {
  slug: string;
  kicker: string;
  name: string;
  price: number;
  priceSuffix: string;
  /** Extra reassurance line under the price, plan-specific. */
  priceNote?: string;
  summary: string;
  features: string[];
  bestFor: string;
  cta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    slug: "oria-care",
    kicker: "Care",
    name: "Oria Care",
    price: 249,
    priceSuffix: "per month · ex GST",
    summary: "Keep everything secure, maintained and running.",
    features: [
      "Managed hosting, SSL & backups",
      "Security monitoring & updates",
      "Uptime monitoring",
      "Small content changes",
      "Monthly health check & reporting",
    ],
    bestFor: "a good website that doesn't need automation yet.",
    cta: "Choose Care",
  },
  {
    slug: "oria-grow",
    kicker: "Grow",
    name: "Oria Grow",
    price: 499,
    priceSuffix: "per month · ex GST",
    priceNote: "about $16 a day",
    summary: "Your website doesn't just sit there. It captures, qualifies and follows up.",
    features: [
      "Everything in Care",
      "AI website assistant",
      "Lead capture & qualification",
      "Automated follow-ups & review requests",
      "CRM & booking integration",
      "Missed-call follow-up",
      "Monthly conversion review & SEO monitoring",
      "Up to 2 hours of improvement work a month",
    ],
    bestFor: "trades, professional services, clinics and local businesses with regular enquiries.",
    cta: "Choose Grow",
    featured: true,
  },
  {
    slug: "oria-system",
    kicker: "System",
    name: "Oria System",
    price: 899,
    priceSuffix: "per month · ex GST",
    summary: "Your digital operations partner, not just your website.",
    features: [
      "Everything in Grow",
      "Advanced assistant & multiple workflows",
      "Quote, lead & appointment automation",
      "Internal business automation",
      "Reporting dashboard",
      "Monthly strategy session & priority support",
      "Up to 4 hours of improvement work a month",
    ],
    bestFor: "enough enquiry volume and admin for automation to pay for itself.",
    cta: "Choose System",
  },
];

/** One-off setup work. Quoted after the free audit. */
export const setup = {
  name: "Digital System Setup",
  priceFrom: 3500,
  summary:
    "Build or improve the website and install the highest-value parts of the system. Scoped and quoted after the audit.",
  lines: [
    { label: "Website", price: "$3,500+" },
    { label: "Website + conversion system", price: "$5,000+" },
    { label: "AI enquiry assistant", price: "$1,500+" },
    { label: "Basic automation", price: "$1,500+" },
    { label: "Multi-step automation", price: "$2,500–$5,000+" },
    { label: "Full digital system", price: "$5,000–$10,000+" },
  ],
} as const;

export const pricingDisclaimer =
  "All prices ex GST. Grow and System have a three-month minimum term, then continue month to month. Work beyond the included hours is $150/hour or quoted separately. Final pricing depends on scope and requirements.";
