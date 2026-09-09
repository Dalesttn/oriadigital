/** Content for the homepage sections that isn't shared with other routes. */

/** The repeating system signature under the hero. */
export const railSteps = [
  { label: "Website" },
  { label: "AI", on: true },
  { label: "Qualify" },
  { label: "Book" },
  { label: "Follow up" },
  { label: "Improve" },
] as const;

/** Six jobs the system does. Each has a small hand-drawn-feel technical figure. */
export const jobs = [
  { no: "01", title: "Capture", body: "Never miss an enquiry.", fig: "peak" },
  { no: "02", title: "Qualify", body: "Know what the customer actually needs.", fig: "branch" },
  { no: "03", title: "Book", body: "Turn intent into appointments.", fig: "check" },
  { no: "04", title: "Follow up", body: "Stop chasing customers.", fig: "dots" },
  { no: "05", title: "Improve", body: "Keep increasing conversion.", fig: "trend" },
  { no: "06", title: "Report", body: "Know what is working.", fig: "bars" },
] as const;

export type JobFig = (typeof jobs)[number]["fig"];

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

/** The four-stage engagement model. Also emitted as HowTo-style steps. */
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

/** What the monthly subscription actually buys, month by month. */
export const roadmap = [
  { label: "Month 01", text: "Website + tracking" },
  { label: "Month 02", text: "AI assistant" },
  { label: "Month 03", text: "Follow-up automation" },
  { label: "Month 04", text: "Conversion optimisation" },
  { label: "Month 05", text: "SEO improvements" },
] as const;

/** Industries Oria Digital is built for. Feeds the audience section and schema. */
export const audiences = [
  { name: "Trades", body: "Plumbers, electricians, builders — enquiries that arrive at 9pm and need answering." },
  { name: "Professional services", body: "Accountants, brokers, consultants — qualification before the first meeting." },
  { name: "Clinics & allied health", body: "Physio, dental, allied health — bookings that land straight in the calendar." },
  { name: "Wellness", body: "Studios, practitioners and directories — discovery, content and search visibility." },
  { name: "Local businesses", body: "Anyone competing in the map pack and losing enquiries to slow replies." },
  { name: "Small teams", body: "Two to twenty people, where admin quietly eats a day a week." },
] as const;
