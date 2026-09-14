import { site, sameAs, absoluteUrl } from "./site";
import { services } from "./content/services";
import { allOffers, recurringOffers, type Offer } from "./content/pricing";
import type { Faq } from "./content/faqs";
import type { Article } from "./content/answers";

/**
 * Structured data.
 *
 * Everything is emitted as JSON-LD and wired into a single connected graph via
 * @id references: the Organization is the publisher of the WebSite, the
 * provider of every Service, and the employer of the founder. A connected
 * graph is what lets Google and LLM-based search resolve "Oria Digital" as one
 * entity rather than a string that happens to appear on some pages.
 *
 * Nothing here claims what isn't true: no ratings, no reviews, no invented
 * counts. ProfessionalService is used because it accurately describes a
 * Perth-based service business with a named founder and a service area.
 */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const PERSON_ID = `${site.url}/#founder`;

type Json = Record<string, unknown>;

const areaServed = [
  { "@type": "City", name: "Perth" },
  { "@type": "State", name: site.serviceArea.state },
  { "@type": "Country", name: site.serviceArea.secondary },
];

function offerNode(o: Offer, url: string): Json {
  return {
    "@type": "Offer",
    name: o.name,
    description: o.summary,
    url: `${url}#${o.slug}`,
    priceCurrency: site.currency,
    price: o.price,
    priceSpecification: {
      "@type": o.unit ? "UnitPriceSpecification" : "PriceSpecification",
      minPrice: o.price,
      priceCurrency: site.currency,
      valueAddedTaxIncluded: false,
      ...(o.unit ? { unitCode: "MON", billingIncrement: 1 } : {}),
    },
    availability: "https://schema.org/InStock",
    seller: { "@id": ORG_ID },
  };
}

/** ProfessionalService — a LocalBusiness subtype, correct for a service studio. */
export function organizationSchema(): Json {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: "Oria",
    url: site.url,
    description: site.definition,
    slogan: site.positioning,
    foundingDate: site.founded,
    email: site.contact.email,
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.contact.abn ? { taxID: site.contact.abn } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    logo: {
      "@type": "ImageObject",
      "@id": `${site.url}/#logo`,
      url: absoluteUrl("/icon.svg"),
      caption: site.name,
    },
    image: { "@id": `${site.url}/#logo` },
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed,
    priceRange: "$$",
    currenciesAccepted: site.currency,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.openingHours.days,
        opens: site.openingHours.opens,
        closes: site.openingHours.closes,
      },
    ],
    knowsAbout: [
      "Web design",
      "WordPress development",
      "WordPress support and maintenance",
      "Website optimisation",
      "Conversion rate optimisation",
      "Technical SEO",
      "Local SEO",
      "AI automation for small business",
      "Lead follow-up automation",
      "CRM integration",
      "Core Web Vitals",
    ],
    knowsLanguage: ["en-AU"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Oria Digital services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        name: s.serviceType,
        url: absoluteUrl(`/${s.slug}`),
        priceCurrency: site.currency,
        price: s.priceFrom,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: s.priceFrom,
          priceCurrency: site.currency,
          valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        areaServed: site.serviceArea.secondary,
      })),
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.contact.email,
        ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
        areaServed: "AU",
        availableLanguage: "English",
      },
    ],
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.language,
    publisher: { "@id": ORG_ID },
  };
}

export function personSchema(): Json {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.founder.name,
    jobTitle: site.founder.jobTitle,
    description: site.founder.bio,
    worksFor: { "@id": ORG_ID },
    url: absoluteUrl("/about"),
    image: absoluteUrl(site.founder.image),
    ...(site.founder.sameAs.length ? { sameAs: site.founder.sameAs } : {}),
    knowsAbout: [...site.founder.skills, "Web development", "Digital strategy"],
    address: { "@type": "PostalAddress", addressLocality: "Perth", addressRegion: "WA", addressCountry: "AU" },
  };
}

/** WebPage node. Ties each page back to the site and organisation. */
export function webPageSchema(input: {
  path: string;
  name: string;
  description: string;
  modified?: string;
}): Json {
  const url = absoluteUrl(input.path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    isPartOf: { "@id": SITE_ID },
    inLanguage: site.language,
    about: { "@id": ORG_ID },
    ...(input.modified ? { dateModified: input.modified } : {}),
    primaryImageOfPage: { "@id": `${site.url}/#logo` },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(trail[trail.length - 1]?.path ?? "/")}#breadcrumb`,
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function serviceSchema(slug: string): Json | null {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  const url = absoluteUrl(`/${s.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.serviceType,
    serviceType: s.serviceType,
    description: s.answer,
    url,
    provider: { "@id": ORG_ID },
    areaServed,
    audience: { "@type": "BusinessAudience", name: "Perth and Australian small service businesses" },
    offers: s.pricing.map((p) => ({
      "@type": "Offer",
      name: p.label,
      description: p.note,
      priceCurrency: site.currency,
      ...(p.price.match(/\$([\d,]+)/) ? { price: Number(p.price.match(/\$([\d,]+)/)![1].replace(/,/g, "")) } : {}),
      availability: "https://schema.org/InStock",
      url: s.cta.href.startsWith("/") ? absoluteUrl(s.cta.href.split("?")[0]) : s.cta.href,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.serviceType} — what's included`,
      itemListElement: s.includes.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

/** Everything on the pricing page as one aggregate, plus each offer. */
export function pricingSchema(): Json {
  const url = absoluteUrl("/pricing");
  return {
    "@type": "Product",
    "@id": `${url}#offers`,
    name: "Oria Digital services and plans",
    description:
      "Entry offers from $149, website builds from $3,500, AI and automation from $1,500, and care plans from $249 a month.",
    brand: { "@id": ORG_ID },
    url,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: site.currency,
      lowPrice: Math.min(...allOffers.map((o) => o.price)),
      highPrice: Math.max(...allOffers.map((o) => o.price)),
      offerCount: allOffers.length,
      offers: allOffers.map((o) => offerNode(o, url)),
    },
  };
}

/** Recurring plans only — used where just the plans are shown. */
export function plansSchema(): Json {
  const url = absoluteUrl("/pricing");
  return {
    "@type": "Product",
    "@id": `${url}#plans`,
    name: "Oria Digital monthly plans",
    brand: { "@id": ORG_ID },
    url,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: site.currency,
      lowPrice: Math.min(...recurringOffers.map((o) => o.price)),
      highPrice: Math.max(...recurringOffers.map((o) => o.price)),
      offerCount: recurringOffers.length,
      offers: recurringOffers.map((o) => offerNode(o, url)),
    },
  };
}

/** A single offer node, e.g. an entry offer on the page it appears on. */
export function singleOfferSchema(o: Offer, path: string): Json {
  return offerNode(o, absoluteUrl(path));
}

/** FAQPage. The single highest-leverage schema for answer engines. */
export function faqSchema(items: Faq[], path: string): Json {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** The engagement model, as a HowTo — steps AI assistants can summarise. */
export function howToSchema(steps: { title: string; body: string }[], name = "How an Oria Digital engagement works"): Json {
  return {
    "@type": "HowTo",
    "@id": `${site.url}/#process`,
    name,
    description: "The stages of working with Oria Digital: a free audit, a scoped build, then running and improving the system.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };
}

/** Answers articles. */
export function articleSchema(a: Article): Json {
  const url = absoluteUrl(`/answers/${a.slug}`);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: a.question,
    description: a.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    datePublished: a.published,
    dateModified: a.modified,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: site.language,
    keywords: a.keywords.join(", "),
    about: { "@type": "Thing", name: a.question },
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: (Json | null)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
