/**
 * Work — projects, builds and experiments.
 *
 * Every project carries a badge that says exactly what it is. Client work is
 * labelled as client work; Oria-owned projects, prototypes and concepts are
 * labelled as such. Nothing here is presented as more than it is, and no
 * metrics appear that weren't measured.
 */

export type Badge = "Client Project" | "Oria Project" | "Prototype" | "Experiment" | "Concept";

export type Project = {
  slug?: string;
  badge: Badge;
  title: string;
  summary: string;
  tags: string[];
  href?: string;
  external?: string;
};

export const projects: Project[] = [
  {
    slug: "oria-haven",
    badge: "Oria Project",
    title: "Oria Haven",
    summary:
      "A scalable wellness discovery platform for Perth, built around search, local content, user intent and custom WordPress functionality.",
    tags: ["WordPress", "Custom architecture", "Directory", "SEO", "UX"],
    href: "/work/oria-haven",
    external: "https://oriahaven.com.au",
  },
  {
    badge: "Prototype",
    title: "AI enquiry assistant",
    summary:
      "Answers from a defined service list, checks the service area, qualifies urgency, and hands over cleanly when a question falls outside it.",
    tags: ["AI", "Automation", "CRM"],
  },
  {
    badge: "Prototype",
    title: "Form-to-CRM pipeline",
    summary:
      "One web form creates the contact, drafts the quote, schedules the confirmation and logs it — no retyping.",
    tags: ["Automation", "Integrations"],
  },
  {
    badge: "Concept",
    title: "The Oria System",
    summary:
      "The end-to-end model from search to booked customer — the reference design every build works toward, one piece at a time.",
    tags: ["Website", "AI", "Automation"],
  },
];

/** The flagship case study, in the brief's template. */
export const oriaHaven = {
  title: "From idea to full wellness discovery platform",
  client: "Oria Haven",
  badge: "Oria Project" as Badge,
  industry: "Wellness · Directory · Local discovery",
  url: "https://oriahaven.com.au",
  summary:
    "Oria Haven is a Perth wellness discovery platform, built end to end by Oria Digital: architecture, front end, directory, search, content structure and technical SEO. It's an Oria-owned project — the place where the ideas that go into client work get tested first.",
  problem:
    "Perth has hundreds of wellness practices — yoga, breathwork, physio, massage, sauna, cold plunge, meditation — spread across directories, Instagram and word of mouth. A person who wants to feel better on a Tuesday evening has no good way to find what's on, near them, that suits them. A basic directory wasn't the answer; those already exist and nobody uses them.",
  goal:
    "Build something a person would actually use to decide: browsable by what they're after, where they are, and how they want to feel — with enough depth that the platform could grow to other regions and become a genuine channel for practices to be found.",
  strategy: [
    "Structure the whole platform around intent (\"relax\", \"recover\", \"move\") as well as category and location, because that's how people actually search.",
    "Make every practice, specialty, suburb and intent a real page with real content, so the site can rank for the long tail rather than one homepage.",
    "Build for AI discovery: clean structure, one clear entity per page, quotable descriptions — so answer engines can cite it.",
    "Design lead-generation pathways for practices — claim a listing, list a practice — so the platform has a business model, not just traffic.",
  ],
  built: [
    "Custom WordPress architecture with practice, listing, event and journal content types",
    "Location structure: regions, areas and suburbs, each a browsable page",
    "Specialty and intent taxonomies, with faceted explore pages",
    "Search and filtering across category, suburb and intent",
    "Wellness Journeys — curated multi-step paths through the directory",
    "Compare experiences and a session builder",
    "SEO landing pages for every category × location combination that has content",
    "Scalable content architecture designed to add regions without rebuilding",
    "AI-oriented information architecture: one entity per page, structured data, clear descriptions",
    "Lead-generation pathways: claim a listing, list a practice",
  ],
  technology: ["WordPress", "PHP", "Advanced Custom Fields", "Custom post types & taxonomies", "Technical SEO", "Schema.org"],
  decisions: [
    "Intent as a first-class taxonomy, not a tag. It's the difference between a directory and a discovery tool.",
    "Every combination page has to earn its place with content. Empty category × suburb pages were never generated.",
    "Practices are entities with their own pages, so a search for a practice name lands on Oria Haven and not just Google Maps.",
    "One canonical URL structure, with the old patterns redirected — a lesson learned the hard way on this project, and applied to every build since.",
  ],
  result:
    "A live platform with 377 Perth listings and 27 in Margaret River at last count, indexed and ranking for practice names, categories and locations. No traffic or revenue figures are published here: the project is Oria-owned, and numbers only go on this site when they're measured for a client and the client agrees to it.",
  lessons: [
    "Directories win on structure and depth, not on design. The design matters; it's just not the moat.",
    "URL discipline from day one. Restructuring later splits ranking signals across old and new URLs and takes months to recover.",
    "Build the business model into the information architecture. Claim and list pathways were designed in, not bolted on.",
  ],
  services: [
    { href: "/web-design-perth", label: "Web Design" },
    { href: "/wordpress-developer-perth", label: "WordPress Development" },
    { href: "/website-optimisation-perth", label: "Website Optimisation" },
  ],
  /** Screens. Add files to public/work/ and set the paths here. */
  images: [
    { src: "/work/oria-haven.jpg", alt: "Oria Haven homepage on a laptop and phone — Discover Wellness in Perth, with search and category browsing", w: 1536, h: 1024 },
  ],
} as const;
