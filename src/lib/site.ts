/**
 * Single source of truth for everything the site says about the business.
 *
 * SEO, structured data, the footer, the contact page and llms.txt all read
 * from here — change a fact once and it is consistent everywhere, including
 * in the JSON-LD that AI search engines parse for entity understanding.
 *
 * TODO(launch): every value marked PLACEHOLDER must be replaced before launch.
 */

export const site = {
  name: "Oria Digital",
  legalName: "Oria Digital", // PLACEHOLDER — registered trading/company name
  tagline: "Web. AI. Automation.",
  /** The positioning line. Outcomes before technology. */
  positioning: "One person. One system. From search to booked customer.",
  /** Canonical origin. No trailing slash. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://oriadigital.com.au",
  locale: "en_AU",
  language: "en-AU",
  currency: "AUD",

  description:
    "Web design and AI automation for Perth businesses. Oria Digital builds conversion-focused websites, WordPress solutions and automated lead systems for trades, clinics and service businesses in Perth and across Australia.",

  /** One-sentence entity definition. Used in JSON-LD and llms.txt — the string
   *  an AI assistant is most likely to quote when asked "what is Oria Digital". */
  definition:
    "Oria Digital is a Perth web design and AI automation studio run by developer Dale Sutton. It builds conversion-focused websites, supports and fixes WordPress sites, and automates enquiry follow-up so Perth service businesses turn more visitors into booked customers.",

  founder: {
    name: "Dale Sutton",
    /** Used in first-person copy, where the surname would read as stiff. */
    firstName: "Dale",
    jobTitle: "Founder & Web Developer",
    /** Stated plainly and reused wherever credibility is established. */
    experience: "10+ years",
    /** Short bio used in Person schema and the About page. */
    bio:
      "Dale Sutton is a Perth-based web developer with more than a decade of experience building and supporting websites for businesses across multiple industries. He runs Oria Digital, covering web design, WordPress development, website optimisation, SEO and AI automation.",
    skills: [
      "WordPress",
      "PHP",
      "Webflow",
      "WooCommerce",
      "UX",
      "SEO",
      "Analytics",
      "Automation",
      "AI workflows",
    ],
    sameAs: ["https://www.linkedin.com/in/dale-michael-sutton/"] as string[],
    image: "/team/dale-sutton.jpg",
  },

  contact: {
    email: "info@oriadigital.com.au",
    /** E.164 — the only format schema.org and tel: links should carry. */
    phone: "+61431630244",
    /** How the number is written for people to read. */
    phoneDisplay: "0431 630 244",
    abn: "46 243 774 311",
  },

  address: {
    locality: "Perth",
    region: "WA",
    country: "AU",
    countryName: "Australia",
  },

  /** Geographic coverage. Drives LocalBusiness / ProfessionalService areaServed. */
  serviceArea: {
    primary: "Perth, Western Australia",
    state: "Western Australia",
    secondary: "Australia",
    suburbs: [
      "Perth CBD",
      "Joondalup",
      "Fremantle",
      "Subiaco",
      "Bayswater",
      "Rockingham",
      "Mandurah",
    ],
  },

  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "17:30",
  },

  social: {
    linkedin: "", // PLACEHOLDER
    instagram: "", // PLACEHOLDER
  },

  /** External booking link (Cal.com / Calendly). Empty = use the contact form. */
  bookingUrl: "",

  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },

  founded: "2026",
} as const;

/** Every non-empty external profile — feeds schema.org `sameAs`. */
export const sameAs: string[] = [site.social.linkedin, site.social.instagram].filter(Boolean);

/** Absolute URL for a site-relative path. Required for canonicals and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString().replace(/\/$/, path === "/" ? "/" : "");
}
