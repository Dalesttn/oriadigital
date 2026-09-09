/**
 * FAQ content.
 *
 * Written for answer engines as well as people: every question is phrased the
 * way someone would actually ask it, and every answer opens with a direct,
 * self-contained first sentence so it can be lifted as a citation without the
 * surrounding page. Keep answers 40–90 words — long enough to be substantive,
 * short enough to be quoted whole.
 */

export type Faq = {
  q: string;
  a: string;
  /** Groups the FAQ page and decides which subset each service page shows. */
  topic: "pricing" | "service" | "ai" | "working-together";
};

export const faqs: Faq[] = [
  {
    topic: "pricing",
    q: "How does the setup fee and the monthly plan fit together?",
    a: "The setup fee covers the development work — building or improving the website and installing the parts of the system you need. The monthly plan then runs and improves it: hosting, security, monitoring, the AI assistant, and a steady stream of small improvements. You can take the setup on its own, but a digital system only gets better if someone is actively working on it.",
  },
  {
    topic: "pricing",
    q: "How much does a website cost in Perth?",
    a: "An Oria Digital website starts from $3,500 plus GST, and a website with a full conversion system starts from $5,000. An AI enquiry assistant or a basic automation starts from $1,500. Final pricing depends on the number of pages, the integrations required and how much content needs writing — you get a fixed written quote after the free audit.",
  },
  {
    topic: "pricing",
    q: "Is there a minimum commitment?",
    a: "Oria Care is month to month. Oria Grow and Oria System have a three-month minimum term, then continue monthly. Three months is roughly what it takes to install the system, watch real enquiries move through it, find what is not working and fix it — any less and you would be judging it before it has had a fair run.",
  },
  {
    topic: "pricing",
    q: "What if I need more work than my plan includes?",
    a: "Oria Grow includes two hours of improvement work a month and Oria System includes four. Anything beyond that is $150 an hour, or quoted separately if it is a larger piece of work. You are told before something falls outside the plan, not after it appears on an invoice.",
  },
  {
    topic: "ai",
    q: "Do I pay extra for AI usage?",
    a: "No. The AI assistant is included in the Oria Grow and Oria System plans, and the infrastructure behind it is managed for you — there are no token or API costs to think about. If a business turns out to be genuinely high-volume, that gets discussed openly rather than appearing as a surprise on an invoice.",
  },
  {
    topic: "service",
    q: "Can you improve my existing website?",
    a: "Yes. If the site is structurally sound, Oria Digital improves what is already there rather than automatically recommending a rebuild — that applies to WordPress and most other platforms. Typical improvements are page speed, mobile experience, technical SEO and the enquiry forms. If a site genuinely is not worth keeping, you are told plainly and quoted the alternative.",
  },
  {
    topic: "ai",
    q: "What can AI actually automate in a small business?",
    a: "Realistically: answering common enquiries, qualifying leads, following up quotes, booking appointments, missed-call text-backs, moving data between your website, CRM and accounting software, requesting reviews, and internal document search. The free audit identifies which of those are worth doing first for your business specifically, rather than automating everything at once.",
  },
  {
    topic: "ai",
    q: "Will the AI say something wrong to my customers?",
    a: "The assistant only answers from information you have supplied — your services, prices, service area and rules — and hands the conversation to you the moment a question falls outside that. You can review every transcript, and the assistant is tuned together with you over the first few weeks before it handles enquiries unsupervised.",
  },
  {
    topic: "service",
    q: "Do you work with WordPress?",
    a: "Yes, including custom themes and plugins, and improving existing WordPress sites without rebuilding them. Oria Digital also builds outside WordPress — on Next.js and other platforms — where something else genuinely fits the job better. The platform is chosen to suit the business, not the other way around.",
  },
  {
    topic: "working-together",
    q: "Do you work outside Perth?",
    a: "Yes. Perth is home and the initial focus, but projects run remotely with businesses right across Australia. Everything — the audit, the build, the monthly improvement work — is done over video calls, email and shared documents, so location is not a constraint.",
  },
  {
    topic: "working-together",
    q: "Who am I actually dealing with?",
    a: "Dale, from the first call to the ongoing monthly work. Oria Digital is an independent studio, so there is no account manager in between and no offshore hand-off. You deal directly with the person designing, building and improving your digital system.",
  },
  {
    topic: "working-together",
    q: "What happens in the free audit?",
    a: "A thirty-minute call covering three things: a review of your website's speed, search visibility and whether it asks for the enquiry; the path an enquiry takes from first interest to booked job; and a shortlist of the repetitive work worth automating first. You receive a short written plan within two business days and keep it whether or not you go ahead.",
  },
  {
    topic: "service",
    q: "How long does a website take to build?",
    a: "Most Oria Digital website builds take three to five weeks from the point content is available. An optimisation pass on an existing site is usually one to two weeks, and an AI enquiry assistant takes about two weeks to install and tune. Timelines are confirmed in writing in your quote before any work starts.",
  },
  {
    topic: "service",
    q: "Do you provide ongoing support?",
    a: "Yes. Every Oria Digital monthly plan includes managed hosting, SSL, backups, security updates, uptime monitoring and small content changes. Oria Grow and Oria System add the AI assistant, automation workflows and a set number of improvement hours each month, so the system keeps developing instead of standing still.",
  },
];

export const faqsByTopic = (topic: Faq["topic"]) => faqs.filter((f) => f.topic === topic);
