/**
 * FAQ content.
 *
 * Written for answer engines as well as people: every question is phrased the
 * way someone would actually ask it, and every answer opens with a direct,
 * self-contained first sentence so it can be lifted as a citation without the
 * surrounding page. Keep answers 40–90 words — long enough to be substantive,
 * short enough to be quoted whole.
 *
 * Service pages pick questions by exact `q` — see services.ts `faqQuestions`.
 */

export type Faq = {
  q: string;
  a: string;
  /** Groups the FAQ page and decides which subset each page shows. */
  topic: "pricing" | "websites" | "wordpress" | "ai" | "working-together";
};

export const faqs: Faq[] = [
  // ── Pricing ────────────────────────────────────────────────────────────
  {
    topic: "pricing",
    q: "How much does a website cost in Perth?",
    a: "A professionally built small-business website in Perth typically costs $2,000–$10,000+, depending on design, content, integrations and functionality. Oria Digital website builds start from $3,500 + GST for a conversion-focused site of five to eight pages, and from $6,500 + GST for sites with custom functionality or integrations. You get a fixed written quote after a free audit.",
  },
  {
    topic: "pricing",
    q: "How much does WordPress support cost?",
    a: "Oria Digital charges $149 for a single WordPress fix, $299 for a Website Tune-Up that reviews the site and fixes the highest-priority issues, and $495 for a half day of support. Ongoing care plans start at $249 a month. All prices exclude GST, and if a fix needs more than the package covers you are told before the work starts, not after.",
  },
  {
    topic: "pricing",
    q: "How much does AI automation cost for a small business?",
    a: "An AI enquiry assistant from Oria Digital starts at $1,500 + GST, installed and tuned to your services, prices and service area. A custom automation project — for example enquiry to CRM to calendar to follow-up, end to end — starts at $2,500 + GST. Ongoing automation, monitoring and improvement is included in the Growth + Optimisation plan at $499 a month.",
  },
  {
    topic: "pricing",
    q: "Is there a minimum commitment?",
    a: "Website Care is month to month with no lock-in. Growth + Optimisation has a three-month minimum term, then continues monthly. Three months is roughly what it takes to install improvements, watch real enquiries move through them, find what isn't working and fix it — any less and you'd be judging it before it has had a fair run.",
  },
  {
    topic: "pricing",
    q: "What if I need more work than my plan includes?",
    a: "Growth + Optimisation includes two hours of improvement work a month. Anything beyond that is $150 an hour, or quoted separately if it's a larger piece of work. You are told before something falls outside the plan, not after it appears on an invoice.",
  },
  {
    topic: "ai",
    q: "Do I pay extra for AI usage?",
    a: "No. AI usage is included in the assistant price and in the Growth + Optimisation plan, and the infrastructure behind it is managed for you — there are no token or API bills to think about. If a business turns out to be genuinely high-volume, that gets discussed openly rather than appearing as a surprise on an invoice.",
  },

  // ── Websites ───────────────────────────────────────────────────────────
  {
    topic: "websites",
    q: "How long does a website take to build?",
    a: "Most Oria Digital website builds take three to five weeks from the point content is available. A Website Tune-Up on an existing site is usually one to two weeks, and an AI enquiry assistant takes about two weeks to install and tune. Timelines are confirmed in writing in your quote before any work starts.",
  },
  {
    topic: "websites",
    q: "Should I rebuild my website or improve it?",
    a: "Improve it, if the site is structurally sound and the problems are speed, mobile experience, messaging or a weak enquiry path — that's most sites. Rebuild it if the platform is unsupported, the design can't be brought up to standard, or the structure fights what the business now does. A free audit tells you which, plainly, before you spend anything.",
  },
  {
    topic: "websites",
    q: "Why is my website getting traffic but no enquiries?",
    a: "Usually one of five things: the headline doesn't say what you do and who for, there's no clear call to action above the fold, the site is slow or awkward on mobile, there's no proof to trust, or the enquiry form is long, buried or broken. The traffic is often fine. A Website Tune-Up identifies which of these applies and fixes the top items.",
  },
  {
    topic: "websites",
    q: "Can you improve my existing website?",
    a: "Yes. If the site is structurally sound, Oria Digital improves what is already there rather than recommending a rebuild — that applies to WordPress and most other platforms. Typical improvements are page speed, mobile experience, technical SEO, messaging and the enquiry forms. If a site genuinely isn't worth keeping, you are told plainly and quoted the alternative.",
  },
  {
    topic: "websites",
    q: "Do you work with WordPress?",
    a: "Yes — WordPress is the main platform, including custom themes, plugins, Advanced Custom Fields, WooCommerce and improving existing WordPress sites without rebuilding them. Oria Digital also builds on Next.js where that genuinely suits the job better. The platform is chosen for the business, not the other way around.",
  },

  // ── WordPress ──────────────────────────────────────────────────────────
  {
    topic: "wordpress",
    q: "Why is my WordPress website slow?",
    a: "Almost always one of four causes: too many plugins doing overlapping work, images uploaded at full camera size, a heavy page-builder theme loading scripts on every page, or cheap shared hosting. Less often it's an unoptimised database or an external script. The fix is diagnosis first — measuring what actually loads — rather than installing a caching plugin and hoping.",
  },
  {
    topic: "wordpress",
    q: "How often should a WordPress website be maintained?",
    a: "Core, theme and plugin updates should be checked at least fortnightly and applied within a few days of a security release. Backups should run daily and be tested at least quarterly. Uptime and speed should be monitored continuously. That's what a website care plan does, so it happens on a schedule instead of when something breaks.",
  },
  {
    topic: "wordpress",
    q: "What does a website care plan include?",
    a: "Oria Digital's Website Care plan includes managed Australian hosting with SSL, daily backups with tested restores, security monitoring and updates, uptime monitoring with alerts, small content changes on request, and a monthly health check with a plain-English report. Growth + Optimisation adds analytics review, conversion and SEO work, automation monitoring and improvement hours.",
  },

  // ── AI ─────────────────────────────────────────────────────────────────
  {
    topic: "ai",
    q: "What can AI actually automate in a small business?",
    a: "Realistically: answering common enquiries, qualifying leads, following up quotes, booking appointments, missed-call text-backs, moving data between your website, CRM and accounting software, requesting reviews, and internal document search. The free audit identifies which of those are worth doing first for your business specifically, rather than automating everything at once.",
  },
  {
    topic: "ai",
    q: "Can AI automatically follow up website leads?",
    a: "Yes. When an enquiry arrives, an automation can send an immediate reply, ask the qualifying questions a human would ask, log the lead in your CRM, offer booking times, and follow up by email or SMS if there's no response — all without you touching it. The sequence, timing and tone are set by you and can be changed at any time.",
  },
  {
    topic: "ai",
    q: "Will the AI say something wrong to my customers?",
    a: "The assistant only answers from information you have supplied — your services, prices, service area and rules — and hands the conversation to you the moment a question falls outside that. You can review every transcript, and the assistant is tuned together with you over the first few weeks before it handles enquiries unsupervised.",
  },

  // ── Working together ───────────────────────────────────────────────────
  {
    topic: "working-together",
    q: "What happens in the free website audit?",
    a: "A review of your website across ten areas: headline and positioning, mobile experience, calls to action, loading speed, technical SEO, trust signals, lead capture, Google visibility, conversion issues and automation opportunities. You receive three to five priority recommendations in writing within two business days, and keep them whether or not you go ahead.",
  },
  {
    topic: "working-together",
    q: "Do you work outside Perth?",
    a: "Yes. Perth is home and the primary focus, but projects run remotely with businesses right across Australia. Everything — the audit, the build, the monthly improvement work — is done over video calls, email and shared documents, so location is not a constraint.",
  },
  {
    topic: "working-together",
    q: "Who am I actually dealing with?",
    a: "Dale Sutton, from the first call to the ongoing monthly work. Oria Digital is an independent studio, so there is no account manager in between and no offshore hand-off. You deal directly with the person designing, building and improving your website and automation.",
  },
  {
    topic: "working-together",
    q: "Do you provide ongoing support?",
    a: "Yes. Every Oria Digital care plan includes managed hosting, SSL, backups, security updates, uptime monitoring and small content changes. Growth + Optimisation adds the AI assistant, automation workflows and a set number of improvement hours each month, so the system keeps developing instead of standing still.",
  },
];

export const faqsByTopic = (topic: Faq["topic"]) => faqs.filter((f) => f.topic === topic);

/** Look up by exact question — used by service pages and the Answers hub. */
export const faqsByQuestions = (questions: readonly string[]) =>
  questions.map((q) => faqs.find((f) => f.q === q)).filter((f): f is Faq => Boolean(f));
