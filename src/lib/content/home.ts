/** Content for the homepage sections that isn't shared with other routes. */

/** Trust bar — plain facts, no superlatives. */
export const trustItems = [
  "Perth based",
  "10+ years web experience",
  "WordPress specialist",
  "Direct with the developer",
  "Australia-wide support",
] as const;

/** Problem → outcome cards. Each names a pain and points at the fix. */
export const problemCards = [
  {
    title: "Not getting enough enquiries?",
    body: "Improve the website, the messaging, the conversion path and your search visibility.",
    cta: { label: "Improve my website", href: "/website-optimisation-perth" },
    event: "problem_card_click",
  },
  {
    title: "Leads going cold?",
    body: "Automatically follow up website enquiries by email, SMS or straight into your CRM.",
    cta: { label: "Automate my follow-up", href: "/ai-automation-perth" },
    event: "problem_card_click",
  },
  {
    title: "Too much repetitive admin?",
    body: "Connect forms, calendars, CRM tools and the everyday workflows you're doing by hand.",
    cta: { label: "See automation options", href: "/ai-automation-perth" },
    event: "problem_card_click",
  },
] as const;

/**
 * The customer journey — from search to booked customer. This is the core
 * differentiator and appears on the homepage and every service page.
 */
export const journey = [
  { label: "Get found", detail: "Search, maps, AI answers" },
  { label: "Convert", detail: "A site that asks for the enquiry" },
  { label: "Qualify", detail: "Right job, right area, right time", key: true },
  { label: "Follow up", detail: "Email, SMS, CRM — automatically" },
  { label: "Book", detail: "Straight into the calendar" },
  { label: "Improve", detail: "Measured monthly, then changed" },
] as const;

/** The rail under the hero. */
export const railSteps = [
  { label: "Search" },
  { label: "Website" },
  { label: "Enquiry" },
  { label: "Qualify", on: true },
  { label: "Follow up" },
  { label: "Booking" },
  { label: "Review" },
] as const;

/** AI demo tabs. Illustrations of the workflow, not real client conversations. */
export const demos = [
  {
    label: "Plumber",
    q: "Do you cover Joondalup?",
    a: "Yes — Joondalup and the surrounding suburbs are inside the service area. What sort of job do you need help with?",
    q2: "Hot water system, it's out today.",
    loc: "Joondalup",
    svc: "Plumbing",
    urg: "Today",
  },
  {
    label: "Electrician",
    q: "Can someone come out today?",
    a: "Possibly — there's one emergency slot left this afternoon. Whereabouts are you, and is there any power at all?",
    q2: "Bayswater. Half the house is dead.",
    loc: "Bayswater",
    svc: "Electrical",
    urg: "Emergency",
  },
  {
    label: "Physio",
    q: "Do you have appointments after work?",
    a: "Yes — there are evening appointments Tuesday and Thursday from 5pm. Is this a new injury or something ongoing?",
    q2: "Ongoing lower back, about 3 months.",
    loc: "Subiaco",
    svc: "Physiotherapy",
    urg: "This week",
  },
  {
    label: "Builder",
    q: "Do you do bathroom renovations?",
    a: "Yes, bathrooms are a big part of what we do. Roughly what size is the space, and do you have a timeframe in mind?",
    q2: "Small ensuite, hoping to start autumn.",
    loc: "Fremantle",
    svc: "Bathroom renovation",
    urg: "Autumn",
  },
] as const;

/** The four-stage engagement model, used on /services. */
export const processSteps = [
  {
    no: "01 · Free",
    title: "Audit",
    body: "I review your website, enquiry flow, follow-up, booking and the work you repeat by hand. You get a short written plan either way.",
  },
  {
    no: "02 · One-off",
    title: "Build",
    body: "I install the highest-value parts first — website, assistant, integrations — scoped and priced before anything starts.",
  },
  {
    no: "03 · Monthly",
    title: "Run",
    body: "Hosting, security, monitoring and support, so the system stays up and you never think about the technical side.",
  },
  {
    no: "04 · Ongoing",
    title: "Improve",
    body: "Each month I look at what came in and what converted, then automate or optimise the next thing.",
  },
] as const;

/** Industries Oria Digital is built for. Feeds the audience section and schema. */
export const audiences = [
  { name: "Trades", body: "Plumbers, electricians, builders, renovators — enquiries that arrive at 9pm and need answering." },
  { name: "Allied health & clinics", body: "Physio, chiro, podiatry, dental, medical — bookings that land straight in the calendar." },
  { name: "Professional services", body: "Accountants, brokers, lawyers, consultants — qualification before the first meeting." },
  { name: "Aged care & community", body: "Services where trust, clarity and accessibility on the website matter most." },
  { name: "Local service businesses", body: "Anyone competing in the map pack and losing enquiries to slow replies." },
  { name: "Small teams", body: "Two to thirty people, where admin quietly eats a day a week." },
] as const;

/** What the free audit reviews — the deliverable, stated so people can self-qualify. */
export const auditChecklist = [
  "Headline and positioning",
  "Mobile experience",
  "Calls to action",
  "Loading speed",
  "Technical SEO",
  "Trust signals",
  "Lead capture",
  "Google visibility",
  "Conversion issues",
  "Automation opportunities",
] as const;
