/**
 * Service catalogue. One entry per /services/* page.
 *
 * `answer` is the AEO payload: a self-contained 40-60 word definition that
 * opens the page body and is reused verbatim in the meta description and the
 * Service JSON-LD, so people, Google and LLMs all read the same claim.
 */

export type ServiceRow = { label: string; note: string };

export type Service = {
  slug: string;
  /** Short label - nav, cards, breadcrumbs. */
  name: string;
  /** Full service name for schema.org and page titles. */
  serviceType: string;
  chapter: "Build" | "Automate" | "Improve" | "Care";
  number: "01" | "02" | "03" | "04";
  headline: string;
  /** Emphasised (italic serif) tail of the headline. */
  headlineTail?: string;
  answer: string;
  intro: string;
  rows: ServiceRow[];
  /** Concrete deliverables - rendered as a list and as schema hasOfferCatalog. */
  includes: string[];
  priceFrom: number;
  priceNote: string;
  /** Questions this page is built to answer, for internal linking and AEO. */
  answers: string[];
};

export const services: Service[] = [
  {
    slug: "websites",
    name: "Websites",
    serviceType: "Website Design and Development",
    chapter: "Build",
    number: "01",
    headline: "Websites built to capture enquiries, not just",
    headlineTail: "describe you.",
    answer:
      "Oria Digital designs and builds custom websites for Australian small businesses, structured around the action a customer needs to take next — call, quote or book. Every build includes local SEO foundations, schema markup, enquiry forms and Australian hosting, from $3,500 plus GST.",
    intro:
      "Most local business websites are brochures. Oria Digital builds around the actions a customer actually takes — call, quote, book — and measures how many of those happen.",
    rows: [
      { label: "Custom design & build, no page-builder bloat", note: "3–5 wks" },
      { label: "Local SEO, Google Business Profile, schema markup", note: "Included" },
      { label: "Quote, booking and enquiry forms", note: "Included" },
      { label: "Australian hosting, backups, updates", note: "Support plan" },
    ],
    includes: [
      "Structure and content plan built around your enquiry path",
      "Custom design — no template, no page-builder bloat",
      "Mobile-first build tested on real devices",
      "Core Web Vitals performance budget",
      "Technical SEO: titles, headings, schema, sitemap, indexing",
      "Google Business Profile alignment and local landing pages",
      "Quote, booking and contact forms wired to where you actually work",
      "Analytics and conversion tracking configured from day one",
    ],
    priceFrom: 3500,
    priceNote: "From $3,500 + GST. Website plus conversion system from $5,000.",
    answers: [
      "How much does a small business website cost in Perth?",
      "How long does a website take to build?",
      "What should a local business website include?",
    ],
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    serviceType: "AI and Business Process Automation",
    chapter: "Automate",
    number: "02",
    headline: "AI that answers, qualifies and books —",
    headlineTail: "in your voice.",
    answer:
      "Oria Digital builds AI enquiry assistants and automation workflows for Australian small businesses. The assistant answers from your own services, prices and service area, qualifies the enquiry, then passes it into your CRM, calendar and follow-up sequence automatically. From $1,500 plus GST.",
    intro:
      "Not a chatbot that says “let me connect you to an agent”. An assistant trained on your services, prices, area and rules, that handles the first conversation properly and knows when to hand over.",
    rows: [
      { label: "Website chat, SMS and missed-call text-back", note: "Assistant" },
      { label: "Qualification: area, urgency, budget, timing", note: "Assistant" },
      { label: "Quotes from your price list, bookings into your calendar", note: "Workflow" },
      { label: "Enquiry → CRM → calendar → confirmation, end to end", note: "Workflow" },
      { label: "Internal tools: search your own documents and job history", note: "Optional" },
    ],
    includes: [
      "AI assistant trained only on information you supply",
      "Service-area checking so out-of-area enquiries are handled honestly",
      "Lead qualification: what they need, where, how urgent",
      "Clear hand-over rules — the assistant escalates instead of guessing",
      "CRM and calendar integration so nothing is retyped",
      "Missed-call text-back and automated follow-up sequences",
      "Review requests after a completed job",
      "Transcripts you can read, and tuning in the first weeks",
    ],
    priceFrom: 1500,
    priceNote:
      "AI assistant from $1,500 + GST. Multi-step automation $2,500–$5,000. Included ongoing in Oria Grow and Oria System.",
    answers: [
      "What can AI automate in a small business?",
      "Will an AI assistant say the wrong thing to my customers?",
      "How much does an AI chatbot cost for a small business?",
    ],
  },
  {
    slug: "optimisation",
    name: "Optimisation",
    serviceType: "Website Optimisation and Technical SEO",
    chapter: "Improve",
    number: "03",
    headline: "Make the website you already have",
    headlineTail: "work harder.",
    answer:
      "Oria Digital improves existing websites without rebuilding them — page speed and Core Web Vitals, mobile experience, technical SEO and schema, and the enquiry forms people abandon. Work starts with a free audit and a written plan, with fixes from $299 plus GST.",
    intro:
      "A rebuild is not always the answer. Often the site is sound and the problem is speed, search visibility, or a form nobody finishes. You will be told plainly which one you are dealing with.",
    rows: [
      { label: "Page speed and Core Web Vitals", note: "Technical" },
      { label: "Mobile experience and navigation", note: "UX" },
      { label: "Technical SEO, schema and index coverage", note: "Search" },
      { label: "Conversion: forms, calls to action, enquiry paths", note: "Conversion" },
    ],
    includes: [
      "Core Web Vitals diagnosis against real field data",
      "Image, font and script optimisation",
      "Mobile navigation and layout fixes",
      "Technical SEO: crawlability, indexing, canonicals, redirects",
      "Schema markup and rich result eligibility",
      "AI search readiness — clean structure, quotable answers, crawler access",
      "Form and call-to-action rework based on where people drop off",
      "A written before-and-after so you can see what changed",
    ],
    priceFrom: 299,
    priceNote:
      "Targeted fixes from $299 + GST. Larger optimisation projects quoted after the audit.",
    answers: [
      "Why is my website slow?",
      "Should I rebuild my website or improve it?",
      "How do I get my website to appear in AI search results?",
    ],
  },
  {
    slug: "website-care",
    name: "Website Care",
    serviceType: "Website Maintenance and Support",
    chapter: "Care",
    number: "04",
    headline: "Keep the whole thing running,",
    headlineTail: "quietly.",
    answer:
      "Oria Digital website care covers managed Australian hosting, SSL, daily backups, security updates, uptime monitoring, small content changes and a monthly health report. Plans start at $249 per month plus GST, with no lock-in on the entry plan.",
    intro:
      "Hosting, security, monitoring and support, so the system stays up and you never have to think about the technical side of it.",
    rows: [
      { label: "Managed hosting, SSL and daily backups", note: "All plans" },
      { label: "Security monitoring and updates", note: "All plans" },
      { label: "Uptime monitoring and alerts", note: "All plans" },
      { label: "Small content changes", note: "All plans" },
      { label: "Monthly health check and reporting", note: "All plans" },
    ],
    includes: [
      "Managed Australian hosting with SSL",
      "Daily backups and tested restores",
      "Core, theme and plugin security updates",
      "Uptime and performance monitoring with alerts",
      "Small content and image changes on request",
      "Monthly health check and a plain-English report",
      "Direct support from the person who built the site",
    ],
    priceFrom: 249,
    priceNote: "From $249/month + GST. Month to month on Oria Care.",
    answers: [
      "Do I need a website maintenance plan?",
      "What does website care actually include?",
      "Who fixes my website if it goes down?",
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
