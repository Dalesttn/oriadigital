/**
 * The Answers hub — question-led pages for people (and answer engines)
 * asking real buying questions.
 *
 * Every article follows the brief's template: the question as H1, a 40–80
 * word quick answer, a pricing table where relevant, what changes the cost,
 * examples, what's included, common mistakes, a recommendation, FAQs, and a
 * CTA into the relevant service. Sections are data so the page template can
 * render them consistently and the Article schema stays accurate.
 */

export type ArticleSection =
  | { type: "paragraphs"; heading?: string; body: string[] }
  | { type: "list"; heading: string; intro?: string; items: string[] }
  | { type: "table"; heading: string; intro?: string; columns: string[]; rows: string[][]; note?: string };

export type Article = {
  slug: string;
  /** The question, as the H1 and <title>. */
  question: string;
  /** Meta description and hub card. */
  description: string;
  /** 40–80 words. Answer-first. Rendered immediately under the H1. */
  quickAnswer: string;
  published: string; // ISO date
  modified: string; // ISO date
  sections: ArticleSection[];
  /** FAQ questions (exact `q` from faqs.ts) rendered at the end. */
  faqQuestions: string[];
  /** The commercial page this article supports. */
  service: { href: string; label: string; cta: string };
  keywords: string[];
};

export const articles: Article[] = [
  {
    slug: "how-much-does-a-website-cost-in-perth",
    question: "How much does a website cost in Perth?",
    description:
      "Realistic 2026 pricing for a small-business website in Perth — what drives the cost, what's included at each level, the mistakes that make sites cost more, and what Oria Digital charges.",
    quickAnswer:
      "A professionally built small-business website in Perth costs roughly $2,000–$10,000+ in 2026, depending on design, content, integrations and functionality. Template-based sites sit at the low end; custom sites with booking, quoting or CRM integration sit at the top. Oria Digital website builds start from $3,500 + GST, with a fixed quote after a free audit.",
    published: "2026-09-14",
    modified: "2026-09-14",
    sections: [
      {
        type: "table",
        heading: "Perth website pricing at a glance",
        intro:
          "These are the bands you'll actually encounter when you get quotes in Perth. The names differ between studios; the bands don't much.",
        columns: ["Type of website", "Typical Perth price", "What you're paying for"],
        rows: [
          ["DIY builder (Wix, Squarespace)", "$0–$500 + your time", "A template and a subscription. Fine for a hobby, limiting for a business."],
          ["Template WordPress site", "$1,500–$3,000", "A purchased theme customised with your content. Fast, but the site looks like the theme."],
          ["Custom small-business site", "$3,500–$6,500", "Designed around your enquiry path. Custom build, technical SEO, tracking, forms wired to your tools."],
          ["Advanced or integrated site", "$6,500–$15,000", "Custom functionality: booking systems, directories, member areas, CRM or payment integrations."],
          ["Platform or e-commerce build", "$15,000+", "Large content architecture, complex WooCommerce, multi-location, or custom applications."],
        ],
        note: "Prices exclude GST and ongoing hosting or care.",
      },
      {
        type: "list",
        heading: "What changes the cost",
        intro: "Five things move a quote more than anything else.",
        items: [
          "Number of pages and how much of the content already exists. Writing copy from scratch is real work, and it's the work most sites skip.",
          "Custom design versus a theme. Custom means the layout serves your message; a theme means your message fits the layout.",
          "Integrations. Anything that has to talk to a booking system, CRM, payment gateway or accounting software adds scope.",
          "Functionality beyond pages: quoting tools, directories, calculators, client portals, multi-step forms.",
          "SEO and tracking. A site that ranks and reports is built differently from one that just exists, and it costs more than one that doesn't.",
        ],
      },
      {
        type: "paragraphs",
        heading: "What a $3,500 website should include",
        body: [
          "At this level you should expect a strategy conversation before any design, a page plan built around what a customer needs to do next, custom design rather than a purchased theme, a mobile-first build tested on real phones, forms that deliver to where you actually work, technical SEO done properly (titles, headings, schema, sitemap, indexing, speed), Google Analytics with conversion tracking, and enough training to edit your own content.",
          "If a quote at this price doesn't include SEO foundations and analytics, ask why. A site that can't be found and can't be measured isn't cheaper — it's just less useful.",
        ],
      },
      {
        type: "list",
        heading: "Common mistakes that make a website cost more",
        items: [
          "Choosing a platform first and a purpose second. Decide what the site has to achieve, then pick the tool.",
          "Buying a heavy multi-purpose theme and paying a developer to fight it. The theme's flexibility becomes your speed problem.",
          "Starting design without copy. The layout gets built around lorem ipsum and rebuilt when the real words arrive.",
          "Skipping tracking to save a few hundred dollars, then having no idea whether the site works.",
          "Paying for a rebuild when a Tune-Up would have fixed the actual problem. Most underperforming sites are structurally fine.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Rebuild or improve?",
        body: [
          "If your existing site is on a supported platform and the problems are speed, mobile experience, unclear messaging or a weak enquiry path, improving it is almost always better value than replacing it. A Website Tune-Up at $299 reviews the site across conversions, mobile, speed, SEO and calls to action, and fixes the top items.",
          "Rebuild when the platform is unsupported, the design can't be brought up to standard, or the site's structure fights what the business now does. A free audit tells you which applies, in writing, before you spend anything.",
        ],
      },
      {
        type: "paragraphs",
        heading: "What Oria Digital charges",
        body: [
          "Website Build from $3,500 + GST: a conversion-focused small-business site of typically five to eight pages, on WordPress or Next.js, with technical SEO and analytics included. Advanced Website from $6,500 + GST: custom functionality, integrations or a larger content architecture. Website Care from $249 a month if you want it hosted, maintained and monitored afterwards.",
          "Every quote is fixed and in writing, and follows a free audit rather than a sales call.",
        ],
      },
    ],
    faqQuestions: [
      "How long does a website take to build?",
      "Should I rebuild my website or improve it?",
      "Do you work with WordPress?",
      "What happens in the free website audit?",
    ],
    service: { href: "/web-design-perth", label: "Web Design Perth", cta: "Get a Website Quote" },
    keywords: [
      "website cost Perth",
      "how much does a website cost Perth",
      "web design prices Perth",
      "small business website cost Australia",
    ],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

/**
 * Planned articles, in publishing order — the brief's content calendar.
 * Listed on the hub as "coming" so the structure is visible to people and
 * crawlers, without shipping thin placeholder pages.
 */
export const plannedQuestions = [
  "Why is my WordPress website so slow?",
  "Should I rebuild my website or fix the existing one?",
  "How much does WordPress support cost?",
  "How much does AI automation cost for a small business?",
  "Can AI automatically follow up website leads?",
  "How can AI help a plumbing business?",
  "What should a small business website include?",
  "WordPress vs Webflow for small businesses",
  "What does a website maintenance plan include?",
  "Why is my website getting traffic but no enquiries?",
  "How to improve website conversion rates",
] as const;
