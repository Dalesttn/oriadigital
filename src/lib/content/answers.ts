/**
 * The Answers hub — question-led pages for people (and answer engines)
 * asking real buying questions.
 *
 * Every article follows the brief's template: the question as H1, a 40–80
 * word quick answer, a pricing table where relevant, what changes the cost,
 * examples, what's included, common mistakes, a recommendation, FAQs, and a
 * CTA into the relevant service. Sections are data so the page template can
 * render them consistently and the Article schema stays accurate.
 *
 * Length is deliberate: long enough to be genuinely useful, short enough
 * that a business owner reads it. No "Perth is a vibrant city" intros.
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

const D = "2026-09-14";

export const articles: Article[] = [
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "how-much-does-a-website-cost-in-perth",
    question: "How much does a website cost in Perth?",
    description:
      "Realistic 2026 pricing for a small-business website in Perth — what drives the cost, what's included at each level, the mistakes that make sites cost more, and what Oria Digital charges.",
    quickAnswer:
      "A professionally built small-business website in Perth costs roughly $2,000–$10,000+ in 2026, depending on design, content, integrations and functionality. Template-based sites sit at the low end; custom sites with booking, quoting or CRM integration sit at the top. Oria Digital website builds start from $3,500 + GST, with a fixed quote after a free audit.",
    published: D,
    modified: D,
    sections: [
      {
        type: "table",
        heading: "Perth website pricing at a glance",
        intro: "These are the bands you'll actually encounter when you get quotes in Perth. The names differ between studios; the bands don't much.",
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
    faqQuestions: ["How long does a website take to build?", "Should I rebuild my website or improve it?", "Do you work with WordPress?", "What happens in the free website audit?"],
    service: { href: "/web-design-perth", label: "Web Design Perth", cta: "Get a Website Quote" },
    keywords: ["website cost Perth", "how much does a website cost Perth", "web design prices Perth", "small business website cost Australia"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "why-is-my-wordpress-website-so-slow",
    question: "Why is my WordPress website so slow?",
    description:
      "The four causes behind almost every slow WordPress site, how to tell which one you have in five minutes, what actually fixes each, and why a caching plugin usually isn't it.",
    quickAnswer:
      "Almost every slow WordPress site has one of four causes: images uploaded at full camera size, a heavy page-builder theme loading scripts on every page, too many plugins doing overlapping work, or cheap shared hosting. Less often it's a bloated database or a slow external script. The fix is measuring what loads, then removing the biggest item first — not installing another plugin.",
    published: D,
    modified: D,
    sections: [
      {
        type: "table",
        heading: "The four usual causes",
        columns: ["Cause", "How to spot it", "The fix"],
        rows: [
          ["Oversized images", "PageSpeed says 'properly size images' or 'serve images in next-gen formats'. A hero image is 2–5 MB.", "Resize to the display size, convert to WebP/AVIF, lazy-load everything below the fold. Usually the single biggest win."],
          ["Heavy theme or page builder", "Dozens of CSS and JS files on a simple page. 'Reduce unused JavaScript' warnings. Elementor, Divi or a multi-purpose theme.", "Disable unused builder widgets and modules, load assets only where used, or move critical pages to a lean template."],
          ["Plugin bloat", "20+ active plugins. Several that do the same thing (two SEO plugins, two caching plugins). Slow admin as well as slow front end.", "Audit each plugin: what does it do, is it used, does something already do this. Remove, don't just deactivate."],
          ["Cheap hosting", "Time to first byte over 600 ms even for a blank page. Inconsistent speed across the day.", "Better hosting. On a small site this is often the only change that moves time-to-first-byte."],
        ],
      },
      {
        type: "paragraphs",
        heading: "How to tell which one you have",
        body: [
          "Run the homepage through PageSpeed Insights and look at two numbers, not the score. First, 'Time to First Byte' — if it's over about 600 milliseconds, hosting is part of the problem. Second, 'Largest Contentful Paint' — if it's over 2.5 seconds and the element it names is an image, images are your problem.",
          "Then open the 'Diagnostics' section. 'Reduce unused JavaScript' and 'Reduce unused CSS' with a long list of files means theme or plugin bloat. If the list is mostly the same plugin name, you've found it.",
          "Five minutes, and you'll usually know which of the four you're dealing with before anyone quotes you for a rebuild.",
        ],
      },
      {
        type: "list",
        heading: "Why a caching plugin usually doesn't fix it",
        items: [
          "Caching speeds up the server's response. If the server already responds quickly and the page is slow because of 4 MB of images and 40 scripts, caching changes almost nothing the visitor feels.",
          "Two caching plugins fight each other. It's one of the most common things found on a slow site.",
          "Caching hides problems in the admin and on logged-in pages, so the site feels slow to you and fast in tests.",
          "It's still worth having — after the real causes are fixed, not instead of fixing them.",
        ],
      },
      {
        type: "paragraphs",
        heading: "What a fix actually costs",
        body: [
          "For most small-business WordPress sites, a Speed Tune-Up at $299 covers the diagnosis and the top fixes — images, fonts, obvious plugin removals, caching configured properly — and comes with a before-and-after report. If the theme or the host is the real problem, that's a bigger job, and you'll be told before anything starts rather than after.",
          "What it shouldn't cost is a rebuild. Speed is fixable on almost any WordPress site that's structurally sound.",
        ],
      },
    ],
    faqQuestions: ["Why is my WordPress website slow?", "Does website speed affect Google rankings?", "Should I rebuild my website or improve it?", "How much does WordPress support cost?"],
    service: { href: "/website-speed-optimisation-perth", label: "Speed Optimisation", cta: "Book a Speed Tune-Up" },
    keywords: ["slow WordPress website", "WordPress speed", "why is my website slow", "speed up WordPress"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "should-i-rebuild-my-website-or-fix-the-existing-one",
    question: "Should I rebuild my website or fix the existing one?",
    description:
      "A straight test for deciding between a rebuild and an improvement, the four situations where a rebuild is genuinely the right call, and why most underperforming sites don't need one.",
    quickAnswer:
      "Fix it, in most cases. If your site is on a supported platform and the problems are speed, mobile experience, unclear messaging or a weak enquiry path, improving it costs a fraction of a rebuild and keeps whatever Google already knows about you. Rebuild only when the platform is unsupported, the design can't be brought up to standard, or the structure fights what the business now does.",
    published: D,
    modified: D,
    sections: [
      {
        type: "table",
        heading: "The decision in one table",
        columns: ["Your situation", "Rebuild or fix?", "Why"],
        rows: [
          ["Site is slow", "Fix", "Speed is fixable on almost any structurally sound site."],
          ["Poor on mobile", "Fix, usually", "Layout and navigation fixes are targeted work. Unless the theme fundamentally isn't responsive."],
          ["Traffic but no enquiries", "Fix", "This is messaging, calls to action and form design. Rebuilding won't fix a positioning problem."],
          ["Looks dated", "Depends", "A refresh of typography, spacing and imagery can go a long way. A full visual overhaul often needs a rebuild."],
          ["Platform unsupported or hacked repeatedly", "Rebuild", "You can't fix what the platform won't let you secure."],
          ["Business has changed what it does", "Rebuild", "If the structure fights the offer, patching it makes a worse site."],
          ["Nobody can edit it", "Depends", "Sometimes training. Sometimes the build is genuinely unmaintainable."],
        ],
      },
      {
        type: "paragraphs",
        heading: "What a rebuild actually costs you",
        body: [
          "Not just the quote. A rebuild changes URLs unless it's done carefully, and changed URLs without redirects lose whatever ranking the old pages had. It resets the content, so anything that was working gets rewritten. And it takes weeks, during which the current site is still the one customers see.",
          "None of that is a reason not to rebuild when a rebuild is right. It's a reason to be sure it's right first.",
        ],
      },
      {
        type: "list",
        heading: "The four cases where a rebuild is the right call",
        items: [
          "The platform is unsupported, abandoned or repeatedly compromised, and securing it isn't possible.",
          "The design is so far from what a customer expects that no amount of adjustment gets it to 'a business I'd hire'.",
          "The site's structure was built for a different business — different services, different audience — and the new one doesn't fit.",
          "The codebase is genuinely unmaintainable: custom code nobody understands, plugins that can't be updated, changes that break other things.",
        ],
      },
      {
        type: "paragraphs",
        heading: "How to find out which you need",
        body: [
          "A free website audit answers this in writing. It reviews positioning, mobile, calls to action, speed, technical SEO, trust signals and lead capture, and comes back with three to five prioritised recommendations. If the honest answer is a rebuild, it says so. If the honest answer is a $299 Tune-Up, it says that instead — which is what happens more often.",
        ],
      },
    ],
    faqQuestions: ["Should I rebuild my website or improve it?", "Can you improve my existing website?", "How much does a website cost in Perth?", "What happens in the free website audit?"],
    service: { href: "/website-optimisation-perth", label: "Website Optimisation", cta: "Book a Website Tune-Up" },
    keywords: ["rebuild or redesign website", "should I redesign my website", "website redesign vs improvement", "fix existing website"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "how-much-does-wordpress-support-cost",
    question: "How much does WordPress support cost?",
    description:
      "What WordPress support costs in Perth for a single fix, a half day, and ongoing care — what's included at each level, what to check in a quote, and what Oria Digital charges.",
    quickAnswer:
      "In Perth, a single WordPress fix typically costs $100–$250, a half day of developer time $400–$600, and ongoing maintenance $100–$400 a month depending on what's included. Oria Digital charges $149 for a Quick Fix, $299 for a Website Tune-Up, $495 for a half day, and from $249 a month for Website Care. All + GST, and you're told before a job exceeds the package.",
    published: D,
    modified: D,
    sections: [
      {
        type: "table",
        heading: "WordPress support pricing",
        columns: ["What you need", "Oria Digital", "What's included"],
        rows: [
          ["One small issue fixed", "$149", "Diagnosis and fix of a single, well-defined problem. Same or next business day where possible."],
          ["A review plus the top fixes", "$299", "Website Tune-Up: review across conversions, mobile, speed, SEO and CTAs, up to 2 hours of fixes, before/after summary."],
          ["A list of issues or a bigger change", "$495", "Half-Day Support: up to 4 hours of developer time."],
          ["Ongoing maintenance and support", "from $249/month", "Hosting, backups, updates, security, monitoring, small changes, monthly report."],
        ],
        note: "Prices exclude GST.",
      },
      {
        type: "list",
        heading: "What to check in any WordPress support quote",
        items: [
          "Is diagnosis included, or billed before you know what's wrong? A fair quote looks before it prices.",
          "Who does the work? 'Support' can mean a ticket queue and an offshore team, or a developer you can call.",
          "What happens if the fix takes longer than quoted? You should be told before, not invoiced after.",
          "Is there a backup before changes are made? Non-negotiable.",
          "For monthly plans: are updates staged first, or applied blind? Are backups tested, or just taken?",
        ],
      },
      {
        type: "paragraphs",
        heading: "When a monthly plan is worth it",
        body: [
          "If you've paid for two or more one-off fixes in a year, a care plan is already cheaper — and the site is being watched between fixes rather than only after something breaks. Plans also change the incentive: the developer is paid to keep things working, not to fix things after they fail.",
          "If your site is simple, rarely changes and has never broken, a plan may be more than you need. Pay for the fix when you need it, and keep a current backup.",
        ],
      },
    ],
    faqQuestions: ["How much does WordPress support cost?", "Can you improve my existing website?", "Do you work with WordPress?", "Is there a minimum commitment?"],
    service: { href: "/wordpress-support-perth", label: "WordPress Support Perth", cta: "Get WordPress Help" },
    keywords: ["WordPress support cost", "WordPress developer hourly rate Perth", "WordPress maintenance cost", "WordPress help Perth"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "how-much-does-ai-automation-cost-for-a-small-business",
    question: "How much does AI automation cost for a small business?",
    description:
      "Realistic AI automation pricing for a small business in 2026: what an enquiry assistant costs, what a multi-step workflow costs, what the ongoing cost is, and how to tell if it will pay for itself.",
    quickAnswer:
      "A practical AI enquiry assistant for a small business costs $1,500–$3,000 + GST to set up in 2026, and a custom multi-step automation — enquiry to CRM to follow-up to booking — $2,500–$6,000. Ongoing costs are $100–$500 a month including usage and monitoring. Oria Digital's AI Assistant starts at $1,500, an Automation Project at $2,500, and the Growth + Optimisation plan at $499 a month includes usage.",
    published: D,
    modified: D,
    sections: [
      {
        type: "table",
        heading: "AI automation pricing bands",
        columns: ["What it is", "Typical cost", "What you get"],
        rows: [
          ["AI enquiry assistant", "$1,500–$3,000 + GST", "Answers from your own services, prices and area; qualifies the enquiry; hands over when it should. Tuned over the first weeks."],
          ["Single automation", "$1,000–$2,500 + GST", "One workflow: e.g. form → CRM → confirmation email, or missed call → SMS."],
          ["Multi-step automation project", "$2,500–$6,000 + GST", "Enquiry → qualification → CRM → calendar → follow-up sequence → review request, across the tools you already use."],
          ["Ongoing", "$100–$500/month", "Usage, monitoring, tuning and small changes. Oria Digital includes this in Growth + Optimisation at $499/month."],
        ],
      },
      {
        type: "list",
        heading: "What changes the cost",
        items: [
          "How many systems have to be connected. A form and an inbox is one thing; a CRM, a calendar and accounting software is another.",
          "Whether the tools you use have decent APIs. Some do. Some need workarounds, and workarounds cost time.",
          "How much your rules vary. 'Book anything within 20 km' is simple. 'Depends on the job, the day and who's on' takes longer to encode.",
          "How much of your knowledge is written down. The assistant is only as good as the service list and price list it's given.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Will it pay for itself?",
        body: [
          "Work it out from your own numbers, not a vendor's. Take the enquiries you get in a month. Estimate how many go cold because a reply came too late or not at all — for most trades and clinics it's a meaningful share. Multiply by your average job value and your close rate. If that number is bigger than the monthly cost, and it usually is once you're past a handful of enquiries a week, the automation pays for itself on follow-up alone before you count the admin hours it removes.",
          "If you're getting two enquiries a month, it won't. Fix the website first.",
        ],
      },
      {
        type: "paragraphs",
        heading: "The usage question",
        body: [
          "Ask any provider whether AI usage — the per-message cost of the model behind the assistant — is included or billed separately. For a small business it should be included and managed for you. Oria Digital includes it; if a business turns out to be genuinely high-volume, that's a conversation, not a surprise on an invoice.",
        ],
      },
    ],
    faqQuestions: ["How much does AI automation cost for a small business?", "Do I pay extra for AI usage?", "What can AI actually automate in a small business?", "Will the AI say something wrong to my customers?"],
    service: { href: "/ai-automation-perth", label: "AI Automation Perth", cta: "Discuss Automation" },
    keywords: ["AI automation cost small business", "AI chatbot cost", "business automation pricing Australia", "AI assistant cost"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "can-ai-automatically-follow-up-website-leads",
    question: "Can AI automatically follow up website leads?",
    description:
      "Yes — here's exactly what an automated follow-up does from the moment a form is submitted, what it should never do, and what a realistic sequence looks like for a Perth service business.",
    quickAnswer:
      "Yes. When an enquiry arrives, an automation can reply within seconds, ask the two or three qualifying questions a human would ask, log the lead in your CRM, offer booking times, and follow up by email or SMS at set intervals if there's no response — all without you touching it. You set the sequence, the timing and the tone, and you can read every conversation.",
    published: D,
    modified: D,
    sections: [
      {
        type: "list",
        heading: "What a follow-up sequence actually does",
        intro: "A realistic sequence for a trade or clinic, from the moment a form is submitted:",
        items: [
          "Within seconds: a reply that confirms receipt, sounds like you, and asks one qualifying question — where are you, what's the job, how urgent.",
          "On answer: the lead is created in your CRM with the details filled in. Nobody retypes anything.",
          "If it's a fit: booking times offered, straight from your calendar. If it's not — wrong area, wrong service — a polite, honest reply and a referral if you have one.",
          "No reply after 24 hours: a short follow-up by SMS. After 3 days: one more, by email. Then it stops. Nobody wants a fifth message.",
          "After the job: a review request, timed to when the customer is happiest.",
        ],
      },
      {
        type: "list",
        heading: "What it should never do",
        items: [
          "Promise a price, a time or an outcome you haven't approved. The assistant answers from your information only.",
          "Pretend to be a person. It should be clear it's an assistant, and clear how to reach you.",
          "Keep chasing. A sequence has an end.",
          "Answer questions outside its scope. 'That's one for Dale — I've passed it on' is the right response to anything it wasn't trained on.",
          "Operate unsupervised on day one. The first weeks are watched, and the transcripts are read.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Why the first reply matters more than the rest",
        body: [
          "Most enquiries go to more than one business. The one that replies first — sensibly, with a real question — is usually the one that gets the job, because the customer's attention is still on the problem. Replying in seconds instead of hours is the single biggest change an automation makes, and it's the part no human can do reliably at 9pm on a Saturday.",
        ],
      },
      {
        type: "paragraphs",
        heading: "What it costs",
        body: [
          "A follow-up automation on its own is a single-workflow job, $1,000–$2,500 + GST to set up. Combined with an enquiry assistant that qualifies as well as replies, from $1,500 for the assistant plus the workflow. Ongoing monitoring and tuning is included in Oria Digital's Growth + Optimisation plan at $499 a month.",
        ],
      },
    ],
    faqQuestions: ["Can AI automatically follow up website leads?", "Will the AI say something wrong to my customers?", "What can AI actually automate in a small business?", "Do I pay extra for AI usage?"],
    service: { href: "/ai-automation-perth", label: "AI Automation Perth", cta: "Discuss Automation" },
    keywords: ["automated lead follow-up", "AI lead follow up", "automatic enquiry response", "lead follow-up automation small business"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "how-can-ai-help-a-plumbing-business",
    question: "How can AI help a plumbing business?",
    description:
      "Six specific things AI can do for a plumbing business — after-hours enquiries, service-area checks, urgency triage, quoting, missed calls and reviews — what each is worth, and what it isn't.",
    quickAnswer:
      "For a plumber, AI is most useful at the moments you can't be at the phone: answering an after-hours enquiry in seconds, checking the job is in your service area, sorting an emergency from a quote request, texting back a missed call, booking the job into your calendar, and asking for a review afterwards. It doesn't do the plumbing. It stops the enquiry going to the plumber who replied first.",
    published: D,
    modified: D,
    sections: [
      {
        type: "table",
        heading: "Six things AI does for a plumber",
        columns: ["The moment", "What the automation does", "Why it matters"],
        rows: [
          ["9:14pm Saturday: 'Do you cover Joondalup?'", "Replies in seconds. Yes/no from your service list, then asks what the job is.", "The customer is messaging three plumbers. First sensible reply wins."],
          ["'Hot water's out, it's today'", "Flags as urgent, checks today's availability, offers the emergency slot or your emergency number.", "An emergency job is worth more and is decided faster."],
          ["'Can you quote a bathroom reno?'", "Collects the details you'd ask for — size, timeframe, photos — and books a site visit.", "You arrive at the quote with the information instead of a blank sheet."],
          ["Missed call on a job", "Texts back within a minute: 'On a job — what do you need? Reply here or I'll call back at 3.'", "Missed calls are missed jobs. This turns them into a conversation."],
          ["Job booked", "Confirmation to the customer, reminder the day before, address and job in your calendar and CRM.", "Fewer no-shows, nothing retyped."],
          ["Job done", "A review request the next morning, with a direct link.", "Reviews are most of local ranking, and nobody remembers to ask."],
        ],
      },
      {
        type: "list",
        heading: "What it needs from you",
        items: [
          "A service list with what you do and don't do. 'Blocked drains yes, gas no' — written down.",
          "A service area. Suburbs, or a radius. The assistant should never guess.",
          "A price list or price ranges for the common jobs, if you want it to quote. If you don't, it collects details and books the visit instead.",
          "Rules for urgency: what counts as an emergency, what you charge for it, when you're available.",
          "Your calendar and CRM, if you have them. If you don't, a simple one is set up as part of the job.",
        ],
      },
      {
        type: "paragraphs",
        heading: "What it doesn't do",
        body: [
          "It doesn't diagnose plumbing over chat, doesn't promise a price you haven't approved, and doesn't handle a customer who's angry — those go to you, immediately, with the conversation attached. It's the first conversation, done properly, not a replacement for you.",
        ],
      },
      {
        type: "paragraphs",
        heading: "What it costs",
        body: [
          "An enquiry assistant from $1,500 + GST. The full workflow above — assistant, missed-call text-back, booking, confirmations, review requests — is an Automation Project from $2,500 + GST, with monitoring and tuning in the Growth + Optimisation plan at $499 a month. Against the value of one saved emergency job a month, the sums are usually not close.",
        ],
      },
    ],
    faqQuestions: ["What can AI actually automate in a small business?", "Can AI automatically follow up website leads?", "Will the AI say something wrong to my customers?", "How much does AI automation cost for a small business?"],
    service: { href: "/ai-automation-perth", label: "AI Automation Perth", cta: "Discuss Automation" },
    keywords: ["AI for plumbers", "plumbing business automation", "AI for tradies Perth", "tradie enquiry automation"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "what-should-a-small-business-website-include",
    question: "What should a small business website include?",
    description:
      "The pages and elements a small-business website actually needs to produce enquiries, in priority order — and the things it's fine to leave out.",
    quickAnswer:
      "A small-business website needs six things above everything else: a headline that says what you do, for whom, and where; a visible way to contact you on every page; proof — reviews, real work, a real person; clear service pages with pricing guidance; a fast, clean mobile experience; and tracking so you know if it's working. Most of what else gets added is decoration.",
    published: D,
    modified: D,
    sections: [
      {
        type: "list",
        heading: "The non-negotiables, in order",
        items: [
          "A headline that a stranger understands in three seconds: what you do, who for, where. 'Emergency plumber, northern suburbs, 24/7' beats 'Welcome to our website' every time.",
          "A call to action above the fold on every page — call, quote or book — and a phone number that's tappable on mobile.",
          "Proof. Google reviews embedded, photos of real work, a real photo of you. Stock images of handshakes cost you trust.",
          "One page per main service, each answering what it is, who it's for, what it costs roughly, and how to start.",
          "A contact form that works, with three or four fields, delivering somewhere you actually read.",
          "Mobile first. More than half of local searches happen on a phone, usually with one hand.",
          "Speed. Under 2.5 seconds to show the main content, or people leave before they've seen your headline.",
          "Google Analytics with conversion tracking, so 'is the website working?' has an answer.",
        ],
      },
      {
        type: "table",
        heading: "Pages: what to include and what to skip",
        columns: ["Page", "Include?", "Note"],
        rows: [
          ["Home", "Yes", "Headline, what you do, proof, services summary, CTA. Not a wall of text."],
          ["One page per service", "Yes", "This is where search traffic lands and where enquiries come from."],
          ["About", "Yes", "A real person, real experience. Short. It's the most-visited page after home for a service business."],
          ["Contact", "Yes", "Form, phone, email, area served, hours."],
          ["Service area / locations", "If you serve distinct areas", "Only where you have something real to say. Never mass-generated suburb pages."],
          ["Pricing or 'from' prices", "Yes, where you can", "Visitors self-qualify. Hiding prices loses more enquiries than it protects."],
          ["Blog", "Later", "Only if you'll actually write. An abandoned blog with three 2019 posts hurts more than no blog."],
          ["Gallery / portfolio", "If visual work", "Real photos, captioned. Not a slideshow of stock."],
        ],
      },
      {
        type: "paragraphs",
        heading: "What it's fine to leave out",
        body: [
          "Sliders, video backgrounds, a mission statement, a news section you won't update, social feeds, chat widgets that nobody staffs, a 'meet the team' page for a team of one, and any page that exists because a template had it. Every element on a small-business site should either build trust or move the visitor toward contacting you. If it does neither, it's slowing the page down.",
        ],
      },
    ],
    faqQuestions: ["How much does a website cost in Perth?", "How long does a website take to build?", "Why is my website getting traffic but no enquiries?", "Do you work with WordPress?"],
    service: { href: "/small-business-web-design-perth", label: "Small Business Web Design", cta: "Get a Website Quote" },
    keywords: ["what should a small business website include", "small business website essentials", "small business website pages", "website checklist"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "wordpress-vs-webflow-for-small-businesses",
    question: "WordPress vs Webflow for small businesses",
    description:
      "An honest comparison for a Perth small business choosing between WordPress and Webflow: cost, ownership, editing, speed, SEO, and who each is actually right for.",
    quickAnswer:
      "For most Perth small businesses, WordPress is the safer choice: it's cheaper to host, easier to find developers for, and you own everything. Webflow gives you a faster, cleaner site with less maintenance and a better editing experience, at a higher monthly cost and with your site tied to their platform. Choose Webflow if design polish and low maintenance matter more than cost and portability. Choose WordPress if you want ownership, e-commerce, or plugins.",
    published: D,
    modified: D,
    sections: [
      {
        type: "table",
        heading: "Side by side",
        columns: ["", "WordPress", "Webflow"],
        rows: [
          ["Ownership", "You own the site and can move it anywhere.", "Hosted on Webflow. Export is possible but limited; the CMS doesn't come with it."],
          ["Monthly cost", "Hosting from ~$15–$40/month, plus a care plan if you want one.", "$20–$60 AUD/month per site, more for CMS and e-commerce."],
          ["Speed out of the box", "Depends entirely on the theme and plugins. Can be very fast or very slow.", "Consistently fast. No plugin bloat to accumulate."],
          ["Editing content", "Fine with a good block setup. Painful on a bloated builder.", "Excellent. The editor is the best part of Webflow."],
          ["Maintenance", "Updates, backups, security — ongoing. This is what care plans exist for.", "Almost none. Webflow handles the platform."],
          ["Finding help", "Everywhere. Every developer in Perth has touched WordPress.", "Fewer developers. Good ones exist; they cost more."],
          ["E-commerce", "WooCommerce: mature, flexible, huge.", "Capable for simple stores; limited for anything complex."],
          ["Custom functionality", "Anything. Plugins, custom code, integrations.", "Limited to what Webflow allows plus embedded code. No server-side logic."],
          ["SEO", "Excellent with the right setup; easy to get wrong.", "Very good defaults. Less to break."],
        ],
      },
      {
        type: "list",
        heading: "Choose WordPress if",
        items: [
          "You want to own the site outright and be able to move hosts or developers.",
          "You need e-commerce beyond a simple catalogue, a directory, a member area or a booking system.",
          "You'll integrate with other software: CRM, accounting, bookings, payments.",
          "Cost per month matters more than editing experience.",
        ],
      },
      {
        type: "list",
        heading: "Choose Webflow if",
        items: [
          "You want a design-led site that stays fast without anyone maintaining it.",
          "You or your team will edit content often and want that to be pleasant.",
          "Your needs are pages, a blog and a contact form — not applications.",
          "You're fine with the site living on someone else's platform.",
        ],
      },
      {
        type: "paragraphs",
        heading: "What Oria Digital recommends",
        body: [
          "Both, depending on the business. WordPress for anything with functionality, integrations or a budget-conscious monthly cost; Webflow where design polish and near-zero maintenance are the priority. What matters more than the platform is whether the site is built around your enquiry path, loads fast, and can be measured — which is true or false on either.",
        ],
      },
    ],
    faqQuestions: ["Do you work with WordPress?", "How much does a website cost in Perth?", "How often should a WordPress website be maintained?", "What does a website care plan include?"],
    service: { href: "/web-design-perth", label: "Web Design Perth", cta: "Get a Website Quote" },
    keywords: ["WordPress vs Webflow", "Webflow or WordPress small business", "best platform small business website", "WordPress Webflow comparison"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "what-does-a-website-maintenance-plan-include",
    question: "What does a website maintenance plan include?",
    description:
      "What a website maintenance or care plan should include, what a good one does that a cheap one doesn't, how to tell whether you need one, and what Oria Digital's plans cover.",
    quickAnswer:
      "A proper website maintenance plan includes managed hosting with SSL, daily backups that are actually tested, core, theme and plugin updates applied safely, security monitoring and clean-up, uptime monitoring with alerts, small content changes, and a monthly report. Oria Digital's Website Care plan covers all of that from $249 a month + GST; Growth + Optimisation adds analytics, conversion and SEO work.",
    published: D,
    modified: D,
    sections: [
      {
        type: "table",
        heading: "What's in a plan — and what separates a good one",
        columns: ["Item", "A basic plan", "A good plan"],
        rows: [
          ["Backups", "Taken", "Taken daily, kept for weeks, and restored to a test site periodically to prove they work."],
          ["Updates", "Applied", "Checked fortnightly, applied within days of a security release, staged first where they might break something."],
          ["Security", "A plugin installed", "Monitoring, hardening, and clean-up if something gets through — with a person, not a dashboard."],
          ["Uptime", "Nothing", "Monitored continuously; you hear about an outage from your developer, not a customer."],
          ["Changes", "Billed hourly", "Small content and image changes included, turned around in a day or two."],
          ["Reporting", "Nothing", "A short monthly note: what was done, what was found, what's recommended."],
          ["Access to a person", "A ticket system", "The developer who looks after the site."],
        ],
      },
      {
        type: "paragraphs",
        heading: "Do you actually need one?",
        body: [
          "If the site has ever broken after an update, been hacked, or gone down without you knowing — yes. If you've paid for two or more one-off fixes in a year — yes, it's already cheaper. If the site is simple, rarely changes and nothing has ever gone wrong, a plan may be more than you need; keep a current backup and pay for a fix when you need one.",
          "The honest case for a plan isn't the fixes. It's that someone is paid to keep the site working rather than paid to fix it after it fails, and those are different incentives.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Oria Digital's plans",
        body: [
          "Website Care, from $249 a month + GST: managed Australian hosting with SSL, daily tested backups, staged updates, security monitoring, uptime alerts, small content changes and a monthly report. Month to month, no lock-in. Growth + Optimisation, from $499 a month: everything in Care plus analytics review, conversion work, SEO improvements, automation monitoring and two hours of improvement work each month, on a three-month minimum term.",
        ],
      },
    ],
    faqQuestions: ["What does a website care plan include?", "How often should a WordPress website be maintained?", "Is there a minimum commitment?", "Do you provide ongoing support?"],
    service: { href: "/website-maintenance-perth", label: "Website Care", cta: "View Care Plans" },
    keywords: ["website maintenance plan", "what does website maintenance include", "WordPress care plan", "website maintenance cost Australia"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "why-is-my-website-getting-traffic-but-no-enquiries",
    question: "Why is my website getting traffic but no enquiries?",
    description:
      "The five reasons a website with real traffic produces no enquiries, how to tell which one applies to yours using data you already have, and what fixes each.",
    quickAnswer:
      "Traffic without enquiries is almost always one of five things: the headline doesn't say what you do and who for; there's no clear call to action where people look; the site is slow or awkward on mobile; there's no proof to trust; or the enquiry form is long, buried or broken. The traffic is often fine. The page it lands on isn't doing its job.",
    published: D,
    modified: D,
    sections: [
      {
        type: "table",
        heading: "The five causes and how to spot each",
        columns: ["Cause", "How to spot it", "Fix"],
        rows: [
          ["Unclear headline", "Visitors leave in under 10 seconds. Ask a stranger what the business does from the homepage alone; they can't.", "Rewrite the top of the page: what you do, for whom, where, and the next step."],
          ["No visible call to action", "Analytics shows people scrolling but not clicking. The phone number is in the footer.", "One clear action above the fold on every page. Tappable phone on mobile."],
          ["Slow or broken on mobile", "Mobile bounce rate far higher than desktop. Core Web Vitals failing.", "Speed fixes and mobile layout fixes. Usually a Tune-Up, not a rebuild."],
          ["No proof", "People visit the About page then leave. No reviews visible, stock photos, no real work shown.", "Google reviews on the page, real photos, a real person."],
          ["The form", "Form page has views but no submissions. Or submissions go to an inbox nobody checks.", "Cut it to three or four fields. Test it. Route it somewhere you'll see it."],
        ],
      },
      {
        type: "paragraphs",

        heading: "Check the traffic is the right traffic",
        body: [
          "Before fixing the page, check Search Console for which queries bring people in. If a plumber's traffic is mostly from a blog post about 'how to fix a dripping tap', those visitors were never going to enquire — they wanted to fix it themselves. Traffic from 'emergency plumber Joondalup' is a different visitor. If the traffic is wrong, the fix is SEO and content, not conversion.",
          "If the traffic is right — people searching for what you sell, in your area — and they still don't enquire, it's one of the five above.",
        ],
      },
      {
        type: "paragraphs",
        heading: "What to do first",
        body: [
          "Fix the headline and the call to action. Both are copy and layout changes, both are cheap, and together they account for more lost enquiries than everything else combined. Then speed and mobile. Then proof. Then the form. A Website Tune-Up at $299 does the review and the top fixes; the free audit tells you which of the five you're dealing with before you spend anything.",
        ],
      },
    ],
    faqQuestions: ["Why is my website getting traffic but no enquiries?", "Should I rebuild my website or improve it?", "Can you improve my existing website?", "What happens in the free website audit?"],
    service: { href: "/website-optimisation-perth", label: "Website Optimisation", cta: "Book a Website Tune-Up" },
    keywords: ["website traffic no conversions", "traffic but no leads", "website not generating enquiries", "why no enquiries from website"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "how-to-improve-website-conversion-rates",
    question: "How to improve website conversion rates",
    description:
      "Eight changes that reliably improve conversion on a small-business website, ranked by effect against effort, with realistic benchmarks and what to measure.",
    quickAnswer:
      "A small-business service website converts roughly 2–5% of visitors into enquiries; below 1% means something specific is wrong. The changes that reliably move it, in order: a clearer headline, one dominant call to action, visible proof, faster pages, a shorter form, stated prices, a real person, and removing everything that doesn't serve the enquiry. Measure before and after, or you're guessing.",
    published: D,
    modified: D,
    sections: [
      {
        type: "table",
        heading: "What conversion rate is normal?",
        columns: ["Conversion rate", "What it means"],
        rows: [
          ["Under 1%", "Something specific is broken: messaging, mobile, speed or the form. Find it before doing anything else."],
          ["1–2%", "Typical for a site that was never designed around the enquiry. Plenty of room."],
          ["2–5%", "Healthy for a local service business. Improvements from here are incremental."],
          ["5%+", "Excellent, or the traffic is unusually well-targeted (branded search, referrals)."],
        ],
        note: "Conversion here means an enquiry — form, call or booking — divided by visits. Measure it; don't estimate it.",
      },
      {
        type: "list",
        heading: "Eight changes, ranked by effect against effort",
        items: [
          "Rewrite the headline. What you do, who for, where, and the next step. Highest effect, lowest effort, most often skipped.",
          "One dominant call to action, repeated. Not four competing buttons. One thing you want them to do, everywhere.",
          "Put proof where people look. Reviews near the top, not on a testimonials page nobody visits. Real photos.",
          "Make it fast. Every second of load time on mobile loses visitors before they've read a word.",
          "Shorten the form. Name, contact, what do you need. Every extra field costs submissions; ask the rest on the call.",
          "State prices, or ranges. 'From $X' lets people self-qualify. Hiding prices loses more enquiries than it protects.",
          "Show a real person. For a small business, 'who am I dealing with' is the question. Answer it with a face and a name.",
          "Remove everything else. Sliders, stock imagery, a mission statement, a news feed. If it doesn't build trust or move toward the enquiry, it's in the way.",
        ],
      },
      {
        type: "paragraphs",
        heading: "How to measure it",
        body: [
          "You need Google Analytics with conversion events: form submissions, phone clicks, email clicks, booking clicks. Without those, 'the site converts better now' is a feeling. With them, it's a number — and the number tells you which change worked, which is how you know what to do next.",
          "Then change one thing at a time where you can. If you rewrite the headline and shorten the form in the same week, you'll never know which one moved the number.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Where to start",
        body: [
          "A Website Tune-Up at $299 reviews the site across all eight, fixes the highest-priority items, and sets up the measurement if it isn't there. The free audit tells you which of the eight you're missing before you spend anything.",
        ],
      },
    ],
    faqQuestions: ["Why is my website getting traffic but no enquiries?", "Should I rebuild my website or improve it?", "Does website speed affect Google rankings?", "What happens in the free website audit?"],
    service: { href: "/website-optimisation-perth", label: "Website Optimisation", cta: "Book a Website Tune-Up" },
    keywords: ["improve website conversion rate", "website conversion rate small business", "increase enquiries from website", "conversion rate optimisation"],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

/**
 * Planned articles not yet published. Empty now that the brief's first
 * twelve are live; add questions here as the next batch is planned and the
 * hub will list them under "Coming next".
 */
export const plannedQuestions: readonly string[] = [];
