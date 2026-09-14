/**
 * Service catalogue — one entry per commercial landing page.
 *
 * Each `slug` is the live URL (top level, with Perth in it, per the growth
 * brief). `answer` is the AEO payload: a self-contained 40–60 word passage that
 * opens the page, doubles as the meta description, and is what an answer
 * engine quotes. Everything else is structured so the page template can
 * render a genuinely useful page rather than a keyword shell.
 */

export type ServiceRow = { label: string; note: string };
export type Step = { title: string; body: string };
export type PriceLine = { label: string; price: string; note?: string };

export type Service = {
  slug: string;
  /** Short label — nav, cards, breadcrumbs. */
  name: string;
  /** Full service name for schema.org. */
  serviceType: string;
  /** <title> — primary keyword first, promise second. */
  title: string;
  /** Page H1. */
  h1: string;
  /** Italic serif tail of the H1, optional. */
  h1Tail?: string;
  eyebrow: string;
  /** 40–60 words. Opens the page. Reused as meta description. */
  answer: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Homepage card CTA label. */
  cardCta: string;
  /** Page-specific primary CTA (overrides "Free Website Audit"). */
  cta: { label: string; href: string };
  /** "Problems I can help with" — the section a searcher scans first. */
  problems: string[];
  /** Concrete deliverables. Rendered as a list and as schema OfferCatalog. */
  includes: string[];
  /** Pricing guidance, stated plainly. */
  pricing: PriceLine[];
  priceFrom: number;
  priceNote: string;
  /** How the engagement runs. */
  process: Step[];
  /** Questions from faqs.ts (matched by `q`) shown on this page. */
  faqQuestions: string[];
  /** Related pages — the internal-link cluster. */
  related: { href: string; label: string }[];
  /** Keywords for metadata. Primary first. */
  keywords: string[];
  /** Show the Website Tune-Up entry offer on this page. */
  showTuneUp?: boolean;
  /** Show the WordPress SOS entry offer on this page. */
  showSos?: boolean;
};

export const services: Service[] = [
  {
    slug: "web-design-perth",
    name: "Web Design",
    serviceType: "Web Design and Development",
    title: "Web Design Perth | Websites Built to Win More Enquiries",
    h1: "Web design in Perth, built to",
    h1Tail: "win enquiries.",
    eyebrow: "Web design Perth",
    answer:
      "Oria Digital designs and builds conversion-focused websites for Perth service businesses — trades, clinics, consultants and professional services. Each site is structured around the action a customer takes next: call, quote or book. Built on WordPress or Next.js, with technical SEO and analytics included, from $3,500 + GST.",
    summary: "Build a website that turns visitors into enquiries.",
    cardCta: "Explore Website Design",
    cta: { label: "Get a Website Quote", href: "/contact?need=new" },
    problems: [
      "Your current site looks dated and it's costing you trust",
      "Visitors arrive from Google and leave without enquiring",
      "The site doesn't work properly on a phone",
      "You've outgrown a DIY builder or a cheap template",
      "You're paying for Google Ads that land on a page that doesn't convert",
      "Nobody can update the site without breaking it",
    ],
    includes: [
      "Strategy session: who the site is for and the one thing it must do",
      "Page structure built around your enquiry path, not a template",
      "Custom design — no page-builder bloat, no stock-photo handshakes",
      "Responsive build tested on real phones, not just a resized browser",
      "WordPress or Next.js, chosen for the job rather than by default",
      "Quote, booking and contact forms wired to where you actually work",
      "Technical SEO: titles, headings, schema, sitemap, indexing, speed",
      "Local SEO foundations and Google Business Profile alignment",
      "GA4 with conversion tracking configured from day one",
      "Training so you can edit content yourself",
    ],
    pricing: [
      { label: "Website Build", price: "from $3,500 + GST", note: "Small-business conversion website, typically 5–8 pages" },
      { label: "Advanced Website", price: "from $6,500 + GST", note: "Custom functionality, integrations or larger content architecture" },
      { label: "Website + automation", price: "from $5,000 + GST", note: "Build plus AI enquiry assistant and follow-up workflows" },
    ],
    priceFrom: 3500,
    priceNote: "Fixed quote after a free audit. Most builds take 3–5 weeks once content is ready.",
    process: [
      { title: "Free audit", body: "A thirty-minute look at your current site, your competitors and where enquiries are being lost. You get a short written plan whether or not you proceed." },
      { title: "Structure and copy", body: "Before any design, the page plan and the words. Most sites fail on messaging, not aesthetics." },
      { title: "Design and build", body: "Designed in the browser, mobile first. You review real pages, not mock-ups." },
      { title: "Launch and measure", body: "Tracking is live on day one. The first month's data decides what to improve next." },
    ],
    faqQuestions: [
      "How much does a website cost in Perth?",
      "How long does a website take to build?",
      "Do you work with WordPress?",
      "Should I rebuild my website or improve it?",
    ],
    related: [
      { href: "/small-business-web-design-perth", label: "Small Business Web Design" },
      { href: "/answers/how-much-does-a-website-cost-in-perth", label: "How much does a website cost in Perth?" },
      { href: "/answers/wordpress-vs-webflow-for-small-businesses", label: "WordPress vs Webflow" },
      { href: "/work/oria-haven", label: "Oria Haven case study" },
    ],
    keywords: [
      "web design Perth",
      "website design Perth",
      "web designer Perth",
      "Perth website designer",
      "website development Perth",
      "small business web design Perth",
    ],
    showTuneUp: true,
  },
  {
    slug: "wordpress-support-perth",
    name: "WordPress Support",
    serviceType: "WordPress Support and Maintenance",
    title: "WordPress Support Perth | Help From a Perth WordPress Developer",
    h1: "WordPress help and support",
    h1Tail: "in Perth.",
    eyebrow: "WordPress support Perth",
    answer:
      "Something broken, slow or not working properly? Oria Digital provides direct WordPress support from an experienced Perth developer — no ticket queue, no offshore hand-off. Broken layouts, Elementor problems, forms not sending, plugin conflicts, mobile issues and speed fixes, from $149 for a single issue. No rebuild required.",
    summary: "Fix what's broken, fast — no rebuild required.",
    cardCta: "Get WordPress Help",
    cta: { label: "Book WordPress Help", href: "/contact?need=wordpress" },
    problems: [
      "Contact form stopped sending and you don't know when",
      "Elementor layout broke after an update",
      "The site is painfully slow on mobile",
      "A plugin update took the whole site down",
      "Something looks wrong and nobody can find the setting",
      "WooCommerce checkout or shipping isn't behaving",
      "You need a small change and your last developer has vanished",
      "Security warnings, spam floods or a hacked site",
    ],
    includes: [
      "Diagnosis first: what actually broke, and why, in plain English",
      "Layout, CSS and Elementor fixes",
      "Contact form, email delivery and spam fixes",
      "Plugin conflicts, updates and safe removal of dead weight",
      "Speed and Core Web Vitals improvements",
      "WooCommerce issues: checkout, shipping, payments, product display",
      "Security clean-up and hardening after a compromise",
      "Small content and design changes done properly",
    ],
    pricing: [
      { label: "Quick Fix", price: "$149", note: "One small WordPress issue, usually same or next business day" },
      { label: "Website Tune-Up", price: "$299", note: "Full review plus up to 2 hours of priority fixes" },
      { label: "Half-Day Support", price: "$495", note: "Up to 4 hours for a list of issues or a bigger change" },
      { label: "Monthly Care", price: "from $249/month", note: "Ongoing maintenance, monitoring and support" },
    ],
    priceFrom: 149,
    priceNote: "Prices are + GST. If a fix needs more than the package covers, you're told before, not after.",
    process: [
      { title: "Tell me what's wrong", body: "Send the URL and a sentence or two. A screenshot helps. That's all the form asks." },
      { title: "Diagnosis", body: "I look before I quote. You get a plain-English explanation of what broke and what fixing it involves." },
      { title: "Fix", body: "Done on a staging copy where the change is risky, straight on the live site where it isn't. Backed up either way." },
      { title: "Confirm", body: "You check it. Then a short note on what changed and what to watch for." },
    ],
    faqQuestions: [
      "How much does WordPress support cost?",
      "Can you improve my existing website?",
      "Why is my WordPress website slow?",
      "Do you work with WordPress?",
    ],
    related: [
      { href: "/wordpress-developer-perth", label: "WordPress Developer" },
      { href: "/answers/why-is-my-wordpress-website-so-slow", label: "Why is my WordPress website so slow?" },
      { href: "/answers/how-much-does-wordpress-support-cost", label: "How much does WordPress support cost?" },
      { href: "/website-maintenance-perth", label: "Website Care plans" },
      { href: "/website-optimisation-perth", label: "Website Optimisation" },
      { href: "/answers", label: "Answers" },
    ],
    keywords: [
      "WordPress support Perth",
      "WordPress help Perth",
      "WordPress developer Perth",
      "WordPress maintenance Perth",
      "fix WordPress website Perth",
      "Elementor support Perth",
    ],
    showSos: true,
    showTuneUp: true,
  },
  {
    slug: "website-optimisation-perth",
    name: "Website Optimisation",
    serviceType: "Website Optimisation and Conversion Improvement",
    title: "Website Optimisation Perth | Make the Site You Have Work Harder",
    h1: "Improve the website you",
    h1Tail: "already have.",
    eyebrow: "Website optimisation Perth",
    answer:
      "Oria Digital improves existing websites without rebuilding them: conversion paths, mobile experience, page speed and Core Web Vitals, technical SEO, messaging and calls to action. Work starts with a free audit and a written plan. A Website Tune-Up is $299; larger optimisation projects are quoted after the audit.",
    summary: "Improve the website you already have.",
    cardCta: "Improve My Website",
    cta: { label: "Book a Website Tune-Up", href: "/contact?need=improve" },
    problems: [
      "Traffic is arriving but nobody enquires",
      "The site takes forever to load, especially on mobile",
      "Google says the site fails Core Web Vitals",
      "The headline doesn't say what you do or who it's for",
      "The enquiry form is long, buried or broken",
      "A rebuild has been quoted and you're not sure it's needed",
    ],
    includes: [
      "Conversion review: headline, offer, proof, calls to action, enquiry path",
      "Mobile UX fixes: navigation, tap targets, layout, readability",
      "Speed: images, fonts, scripts, caching, hosting configuration",
      "Core Web Vitals diagnosis against real field data, not just lab scores",
      "Technical SEO: crawlability, indexing, canonicals, schema, sitemap",
      "Landing page improvements for Google Ads traffic",
      "Form rework based on where people actually drop off",
      "Analytics and event tracking so improvements are measurable",
      "A written before-and-after so you can see what changed",
    ],
    pricing: [
      { label: "Website Tune-Up", price: "$299", note: "Review, prioritised recommendations, up to 2 hours of fixes, before/after summary" },
      { label: "Optimisation project", price: "from $899 + GST", note: "A deeper pass on conversion, speed and SEO, scoped after the audit" },
      { label: "Growth + Optimisation", price: "from $499/month", note: "Ongoing monthly improvement with reporting" },
    ],
    priceFrom: 299,
    priceNote: "Every optimisation engagement starts with the free audit. If a rebuild genuinely is the answer, you're told plainly.",
    process: [
      { title: "Free audit", body: "Ten checks: positioning, mobile, CTAs, speed, technical SEO, trust, lead capture, Google visibility, conversion issues, automation opportunity." },
      { title: "Priorities", body: "Three to five recommendations ranked by impact against effort. Not a forty-page PDF." },
      { title: "Fix the top items", body: "The Tune-Up covers the highest-value fixes. Larger work is quoted separately." },
      { title: "Measure", body: "Before-and-after on the numbers that matter: speed, enquiries, conversion rate." },
    ],
    faqQuestions: [
      "Should I rebuild my website or improve it?",
      "Why is my website getting traffic but no enquiries?",
      "Why is my WordPress website slow?",
      "Can you improve my existing website?",
    ],
    related: [
      { href: "/web-design-perth", label: "Web Design" },
      { href: "/wordpress-support-perth", label: "WordPress Support" },
      { href: "/website-speed-optimisation-perth", label: "Speed Optimisation" },
      { href: "/answers/why-is-my-website-getting-traffic-but-no-enquiries", label: "Traffic but no enquiries?" },
      { href: "/answers/how-to-improve-website-conversion-rates", label: "How to improve conversion rates" },
    ],
    keywords: [
      "website optimisation Perth",
      "website speed optimisation Perth",
      "conversion rate optimisation Perth",
      "improve website Perth",
      "Core Web Vitals Perth",
    ],
    showTuneUp: true,
  },
  {
    slug: "ai-automation-perth",
    name: "AI Automation",
    serviceType: "AI and Business Process Automation",
    title: "AI Automation Perth | Respond Faster, Reduce Admin",
    h1: "AI automation for",
    h1Tail: "Perth businesses.",
    eyebrow: "AI automation Perth",
    answer:
      "Oria Digital builds practical AI automation for Perth service businesses: automatic replies to website enquiries, lead qualification, follow-up by email or SMS, booking workflows and CRM updates. The assistant answers only from your own services, prices and rules, and hands over when it should. An AI assistant starts from $1,500 + GST.",
    summary: "Respond faster and reduce repetitive work.",
    cardCta: "Explore Automation",
    cta: { label: "Discuss Automation", href: "/contact?need=ai" },
    problems: [
      "Enquiries arrive after hours and go cold before you reply",
      "You retype the same details into a CRM, a calendar and an invoice",
      "Half of the enquiries aren't a fit and you find out on the phone",
      "Follow-ups happen when you remember, which is not often enough",
      "Missed calls turn into missed jobs",
      "You'd like to use AI but not have it say something wrong to a customer",
    ],
    includes: [
      "AI enquiry assistant trained only on information you supply",
      "Lead qualification: what they need, where, how urgent, roughly what budget",
      "Automatic follow-up sequences by email and SMS",
      "Missed-call text-back",
      "Booking workflows that land straight in your calendar",
      "CRM and accounting integration so nothing is entered twice",
      "Review requests after a completed job",
      "Clear hand-over rules and transcripts you can read",
      "Internal automations: quotes, reminders, reporting, document search",
    ],
    pricing: [
      { label: "AI Assistant", price: "from $1,500 + GST", note: "Lead qualification or customer support assistant, installed and tuned" },
      { label: "Automation Project", price: "from $2,500 + GST", note: "Custom multi-step workflow across the tools you already use" },
      { label: "Growth + Optimisation", price: "from $499/month", note: "Assistant, follow-up automation and monitoring included" },
    ],
    priceFrom: 1500,
    priceNote: "Usage is included. You should never have to think about tokens or API bills.",
    process: [
      { title: "Map the workflow", body: "Where enquiries come from, what happens next, and where they fall through. Drawn on one page." },
      { title: "Pick the first automation", body: "The one that removes the most manual work for the least risk. Usually enquiry response and follow-up." },
      { title: "Build and test", body: "Installed alongside your existing process, not instead of it, until it's proven." },
      { title: "Tune", body: "First weeks supervised. Transcripts reviewed together. Rules tightened where needed." },
    ],
    faqQuestions: [
      "What can AI actually automate in a small business?",
      "Will the AI say something wrong to my customers?",
      "How much does AI automation cost for a small business?",
      "Do I pay extra for AI usage?",
    ],
    related: [
      { href: "/web-design-perth", label: "Web Design" },
      { href: "/answers/how-much-does-ai-automation-cost-for-a-small-business", label: "How much does AI automation cost?" },
      { href: "/answers/can-ai-automatically-follow-up-website-leads", label: "Can AI follow up leads automatically?" },
      { href: "/answers/how-can-ai-help-a-plumbing-business", label: "How can AI help a plumbing business?" },
      { href: "/work", label: "Automation prototypes" },
    ],
    keywords: [
      "AI automation Perth",
      "AI chatbot Perth",
      "business automation Perth",
      "AI for small business Perth",
      "lead follow-up automation",
    ],
  },
  {
    slug: "website-maintenance-perth",
    name: "Website Care",
    serviceType: "Website Maintenance and Care Plans",
    title: "Website Maintenance Perth | Care Plans From $249 a Month",
    h1: "Keep your website secure, fast and",
    h1Tail: "up to date.",
    eyebrow: "Website care Perth",
    answer:
      "Oria Digital website care plans cover managed hosting, SSL, daily backups, security updates, uptime monitoring, small content changes and a monthly health report — with direct support from the developer who maintains the site. Plans start at $249 a month + GST, month to month on the entry plan.",
    summary: "Keep your website secure, fast and up to date.",
    cardCta: "View Care Plans",
    cta: { label: "View Care Plans", href: "/pricing#recurring" },
    problems: [
      "Updates are ignored because the last one broke something",
      "Nobody is watching whether the site is actually up",
      "There's no backup, or there is and nobody has tested it",
      "Small changes wait weeks because there's no one to ask",
      "You're paying for hosting, a plugin bundle and a security tool separately",
    ],
    includes: [
      "Managed Australian hosting with SSL",
      "Daily backups with tested restores",
      "Core, theme and plugin updates, staged where risky",
      "Security monitoring, hardening and clean-up if needed",
      "Uptime and performance monitoring with alerts",
      "Small content and image changes on request",
      "Monthly health check and a plain-English report",
      "Priority response when something breaks",
    ],
    pricing: [
      { label: "Website Care", price: "from $249/month", note: "Maintenance, monitoring and support. Month to month." },
      { label: "Growth + Optimisation", price: "from $499/month", note: "Care plus analytics, conversion work, SEO improvements and reporting" },
    ],
    priceFrom: 249,
    priceNote: "Prices are + GST. Growth + Optimisation has a three-month minimum, then month to month.",
    process: [
      { title: "Onboard", body: "Access, backups, monitoring and a baseline health check in the first week." },
      { title: "Maintain", body: "Updates applied on a schedule, staged first where they might break something." },
      { title: "Monitor", body: "Uptime, speed and security watched continuously. You hear about problems from me, not from a customer." },
      { title: "Report", body: "A short monthly note: what was done, what was found, what's recommended next." },
    ],
    faqQuestions: [
      "What does a website care plan include?",
      "How often should a WordPress website be maintained?",
      "Is there a minimum commitment?",
      "Do you provide ongoing support?",
    ],
    related: [
      { href: "/wordpress-support-perth", label: "WordPress Support" },
      { href: "/website-optimisation-perth", label: "Website Optimisation" },
      { href: "/answers/what-does-a-website-maintenance-plan-include", label: "What does a maintenance plan include?" },
      { href: "/answers/why-is-my-wordpress-website-so-slow", label: "Why is my WordPress website so slow?" },
    ],
    keywords: [
      "website maintenance Perth",
      "website care plan",
      "WordPress maintenance Perth",
      "managed website hosting Perth",
    ],
    showSos: true,
  },
  {
    slug: "wordpress-developer-perth",
    name: "WordPress Developer",
    serviceType: "WordPress Development",
    title: "WordPress Developer Perth | Custom Themes, Plugins & Integrations",
    h1: "A WordPress developer in Perth who",
    h1Tail: "writes the code.",
    eyebrow: "WordPress developer Perth",
    answer:
      "Oria Digital is a Perth WordPress developer for work a page builder can't do: custom themes, plugins, Advanced Custom Fields, custom post types, WooCommerce, PHP, integrations with your CRM or booking system, and performance work. Ten-plus years of WordPress and PHP, direct with the developer, from $149 for small tasks.",
    summary: "Custom WordPress development, direct with the developer.",
    cardCta: "Talk to a Developer",
    cta: { label: "Discuss a WordPress Project", href: "/contact?need=wordpress" },
    problems: [
      "The theme can't do what the business now needs",
      "You need a custom post type, field structure or directory",
      "WooCommerce needs custom pricing, shipping or checkout logic",
      "Two systems need to talk to each other and there's no plugin for it",
      "The site is built on a bloated theme and it shows in the speed",
      "A previous developer left custom code nobody understands",
    ],
    includes: [
      "Custom theme development, or a lean child theme on a solid base",
      "Advanced Custom Fields architecture and custom post types",
      "Custom plugins when the job genuinely needs one",
      "WooCommerce customisation: pricing, shipping, checkout, product data",
      "PHP and REST API integrations with CRMs, calendars and payment systems",
      "Performance work: query optimisation, caching, asset loading",
      "Troubleshooting and rescue of inherited codebases",
      "Version control, staging and documented deployments",
    ],
    pricing: [
      { label: "Small development task", price: "from $149", note: "A single, well-defined change" },
      { label: "Half-Day Development", price: "$495", note: "Up to 4 hours" },
      { label: "Custom development project", price: "quoted", note: "Scoped in writing after a short discovery call" },
    ],
    priceFrom: 149,
    priceNote: "Prices are + GST. Larger projects are fixed-quoted after discovery.",
    process: [
      { title: "Discovery", body: "What the site needs to do, what it currently does, and what's in the way. Code reviewed if there's existing code." },
      { title: "Scope", body: "A written scope with a fixed price. Changes to scope are agreed before they're built." },
      { title: "Build on staging", body: "Nothing custom goes straight to production. You test on a staging copy." },
      { title: "Deploy and document", body: "Deployed with a rollback path, and documented so the next developer isn't guessing." },
    ],
    faqQuestions: [
      "Do you work with WordPress?",
      "How much does WordPress support cost?",
      "Should I rebuild my website or improve it?",
    ],
    related: [
      { href: "/wordpress-support-perth", label: "WordPress Support" },
      { href: "/web-design-perth", label: "Web Design" },
      { href: "/website-maintenance-perth", label: "Website Care" },
      { href: "/work/oria-haven", label: "Oria Haven — custom WordPress build" },
    ],
    keywords: [
      "WordPress developer Perth",
      "custom WordPress development Perth",
      "WooCommerce developer Perth",
      "ACF developer Perth",
      "PHP developer Perth",
    ],
    showSos: true,
  },

  // ── §13 supporting pages. Not in the Services dropdown; in the clusters,
  //    the sitemap and the footer via nav.ts. ──────────────────────────────
  {
    slug: "website-speed-optimisation-perth",
    name: "Speed Optimisation",
    serviceType: "Website Speed Optimisation",
    title: "Website Speed Optimisation Perth | Fix Slow Sites & Core Web Vitals",
    h1: "Website speed optimisation",
    h1Tail: "that shows in the numbers.",
    eyebrow: "Speed optimisation Perth",
    answer:
      "Oria Digital makes slow websites fast — measured against Google's Core Web Vitals field data, not a lab score. Images, fonts, scripts, caching, hosting and plugin bloat are diagnosed first and fixed in priority order, with a before-and-after report. Most WordPress sites can be fixed without a rebuild, from $299 + GST.",
    summary: "Fix a slow site, measured against real Core Web Vitals.",
    cardCta: "Fix My Slow Site",
    cta: { label: "Book a Speed Tune-Up", href: "/contact?need=improve" },
    problems: [
      "The site takes four, five, six seconds to show anything on a phone",
      "Search Console says the site fails Core Web Vitals",
      "PageSpeed Insights is red and nobody can explain why",
      "A caching plugin was installed and nothing changed",
      "The homepage is fine but every inner page crawls",
      "Google Ads landing pages are slow and the cost per click shows it",
    ],
    includes: [
      "Diagnosis against CrUX field data — what real visitors experience, not a lab run",
      "Image audit: sizing, format (WebP/AVIF), lazy loading, the one hero image that costs a second",
      "Font loading: self-hosting, subsetting, display strategy — usually the cheapest big win",
      "Script audit: what loads on every page and whether it needs to",
      "Plugin review: overlapping plugins, abandoned plugins, plugins doing what the theme already does",
      "Caching and hosting configuration, or a plain recommendation to move",
      "Largest Contentful Paint, Cumulative Layout Shift and Interaction to Next Paint, each addressed specifically",
      "A written before-and-after with the numbers, so you can see what changed",
    ],
    pricing: [
      { label: "Speed Tune-Up", price: "$299", note: "Diagnosis, prioritised fixes, up to 2 hours, before/after report" },
      { label: "Speed project", price: "from $899 + GST", note: "Deeper work: theme rebuild of critical pages, hosting migration, asset pipeline" },
      { label: "Growth + Optimisation", price: "from $499/month", note: "Speed monitored and maintained, with monthly reporting" },
    ],
    priceFrom: 299,
    priceNote: "Every speed job starts with measurement. If the honest answer is that the theme or host is the problem, you're told that before you spend anything.",
    process: [
      { title: "Measure", body: "Field data from Google, lab data from Lighthouse, and a waterfall of what actually loads. The three usually disagree, and the disagreement is the diagnosis." },
      { title: "Prioritise", body: "The fixes ranked by seconds saved per hour of work. Fonts and images are almost always first." },
      { title: "Fix", body: "On staging where risky, live where not. Each change measured on its own so you know what worked." },
      { title: "Report", body: "Before-and-after, in plain numbers. Then a watch on it, so it doesn't drift back." },
    ],
    faqQuestions: [
      "Why is my WordPress website slow?",
      "Does website speed affect Google rankings?",
      "Should I rebuild my website or improve it?",
    ],
    related: [
      { href: "/website-optimisation-perth", label: "Website Optimisation" },
      { href: "/wordpress-support-perth", label: "WordPress Support" },
      { href: "/answers/why-is-my-wordpress-website-so-slow", label: "Why is my WordPress website so slow?" },
      { href: "/website-maintenance-perth", label: "Website Care" },
    ],
    keywords: [
      "website speed optimisation Perth",
      "slow website fix Perth",
      "Core Web Vitals Perth",
      "WordPress speed optimisation",
      "PageSpeed optimisation Perth",
    ],
    showTuneUp: true,
  },
  {
    slug: "small-business-web-design-perth",
    name: "Small Business Web Design",
    serviceType: "Small Business Web Design",
    title: "Small Business Web Design Perth | Websites That Pay For Themselves",
    h1: "Small business web design in Perth,",
    h1Tail: "priced for small business.",
    eyebrow: "Small business web design Perth",
    answer:
      "Oria Digital builds websites for Perth small businesses — sole traders, trades, clinics and two-to-thirty-person firms — around the one thing the site has to do: produce enquiries. A conversion-focused site with technical SEO, tracking and forms wired to your inbox, from $3,500 + GST, with a fixed quote and no surprises.",
    summary: "A website sized and priced for a small business, built to produce enquiries.",
    cardCta: "See Small Business Options",
    cta: { label: "Get a Website Quote", href: "/contact?need=new" },
    problems: [
      "You've been quoted $12,000 by an agency for a five-page site",
      "You've been quoted $800 by someone who'll disappear after launch",
      "Your DIY site works but doesn't look like a business you'd hire",
      "You get compliments on the site and no enquiries from it",
      "You don't know what a small business website should actually include",
      "You need it done in weeks, not months",
    ],
    includes: [
      "A short strategy call: who the site is for, what they need to do, what stops them",
      "Five to eight pages, structured around the enquiry path — not a template's page list",
      "Custom design that looks like a business worth hiring, on a phone first",
      "Copy direction, so the site says what you do, where, and why you",
      "Forms wired to your inbox, calendar or CRM — and tested",
      "Technical SEO and local SEO foundations, so the site can be found",
      "Google Analytics with conversion tracking, so you know if it's working",
      "Training so you can edit it yourself, and a care plan if you'd rather not",
    ],
    pricing: [
      { label: "Website Build", price: "from $3,500 + GST", note: "Five to eight pages, conversion-focused, SEO and tracking included" },
      { label: "Website + automation", price: "from $5,000 + GST", note: "The site plus an AI enquiry assistant and follow-up workflows" },
      { label: "Website Care", price: "from $249/month", note: "Hosting, backups, updates, monitoring and small changes" },
    ],
    priceFrom: 3500,
    priceNote: "Fixed price in writing after a free audit. Three to five weeks once content is ready. Payment in stages, not all up front.",
    process: [
      { title: "Free audit", body: "If you have a site, I look at it. If you don't, we talk about the business for thirty minutes. Either way, a short written plan." },
      { title: "Structure and words", body: "The page plan and the copy direction come first. Design built around lorem ipsum gets rebuilt when the real words arrive." },
      { title: "Design and build", body: "Reviewed as real pages on your own phone, not as pictures of pages." },
      { title: "Launch and measure", body: "Tracking is on from day one. Thirty days in, we look at what the site is actually doing." },
    ],
    faqQuestions: [
      "How much does a website cost in Perth?",
      "What should a small business website include?",
      "How long does a website take to build?",
      "Do you work with WordPress?",
    ],
    related: [
      { href: "/web-design-perth", label: "Web Design Perth" },
      { href: "/answers/what-should-a-small-business-website-include", label: "What should a small business website include?" },
      { href: "/answers/how-much-does-a-website-cost-in-perth", label: "How much does a website cost in Perth?" },
      { href: "/website-maintenance-perth", label: "Website Care" },
    ],
    keywords: [
      "small business web design Perth",
      "small business website Perth",
      "affordable web design Perth",
      "tradie website Perth",
      "clinic website design Perth",
    ],
    showTuneUp: true,
  },
  {
    slug: "local-seo-perth",
    name: "Local SEO",
    serviceType: "Local SEO",
    title: "Local SEO Perth | Get Found in Maps and Local Search",
    h1: "Local SEO for Perth businesses that",
    h1Tail: "want the phone to ring.",
    eyebrow: "Local SEO Perth",
    answer:
      "Oria Digital does local SEO for Perth service businesses: Google Business Profile set up and optimised properly, consistent business details across the web, location and service pages that actually earn their place, reviews handled, and technical SEO on the site itself. Measured in map-pack visibility and enquiries, not vanity rankings. From $299 + GST.",
    summary: "Show up in the map pack and local search for the jobs you want.",
    cardCta: "Improve Local Visibility",
    cta: { label: "Book a Local SEO Review", href: "/contact?need=improve" },
    problems: [
      "Competitors show in the map pack for your service and you don't",
      "Your Google Business Profile was set up once and never touched",
      "Your address or phone number is different on three directories",
      "You serve twenty suburbs and the site mentions one",
      "You have good reviews on paper and nobody can find them",
      "You rank for your business name and nothing else",
    ],
    includes: [
      "Google Business Profile: categories, services, service areas, photos, posts, Q&A — done properly, not just claimed",
      "Business details (name, address, phone) made consistent across the directories that matter",
      "Location and service pages that have real content — never mass-generated suburb pages",
      "Review process: how to ask, when, and how to respond",
      "LocalBusiness structured data on the site, matching the profile exactly",
      "Technical SEO foundations: titles, headings, indexing, speed",
      "Tracking for calls, direction requests and enquiries from local search",
      "A monthly view of map-pack visibility for the terms that matter",
    ],
    pricing: [
      { label: "Local SEO review", price: "$299", note: "Profile, citations, site and competitor review with prioritised fixes" },
      { label: "Local SEO setup", price: "from $899 + GST", note: "Profile optimisation, citation clean-up, schema, location page structure" },
      { label: "Growth + Optimisation", price: "from $499/month", note: "Ongoing local SEO, content and reporting" },
    ],
    priceFrom: 299,
    priceNote: "No suburb-page spam. Location pages are built only where there's something real to say, because that's the only kind Google keeps ranking.",
    process: [
      { title: "Review", body: "Your profile, your citations, your site, and the three competitors who outrank you. Where the gap actually is." },
      { title: "Foundations", body: "Profile completed properly, business details made consistent, structured data added, tracking on." },
      { title: "Pages", body: "Service and location pages that answer what a person in that suburb is asking. Written, not generated." },
      { title: "Reviews and reporting", body: "A repeatable way to earn reviews, and a monthly view of where you appear and what it produced." },
    ],
    faqQuestions: [
      "Why is my website getting traffic but no enquiries?",
      "How much does a website cost in Perth?",
      "Do you work outside Perth?",
    ],
    related: [
      { href: "/web-design-perth", label: "Web Design Perth" },
      { href: "/website-optimisation-perth", label: "Website Optimisation" },
      { href: "/answers/why-is-my-website-getting-traffic-but-no-enquiries", label: "Traffic but no enquiries?" },
      { href: "/website-maintenance-perth", label: "Website Care" },
    ],
    keywords: [
      "local SEO Perth",
      "Google Business Profile Perth",
      "map pack Perth",
      "local search optimisation Perth",
      "SEO for tradies Perth",
    ],
    showTuneUp: true,
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** Homepage shows exactly four, per the brief; WordPress Support has its own block. */
export const homepageServices = services.filter((s) =>
  ["web-design-perth", "website-optimisation-perth", "ai-automation-perth", "website-maintenance-perth"].includes(s.slug),
);

/** The five under the Services dropdown, in nav order. */
export const navServices = services.filter((s) =>
  ["web-design-perth", "wordpress-support-perth", "website-optimisation-perth", "ai-automation-perth", "website-maintenance-perth"].includes(s.slug),
);
