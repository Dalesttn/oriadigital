import { site, sameAs, absoluteUrl } from "./site";
import { services } from "./content/services";
import { plans, setup } from "./content/pricing";
import type { Faq } from "./content/faqs";

/**
 * Structured data.
 *
 * Everything is emitted as JSON-LD and wired into a single connected graph via
 * @id references: the Organization is the publisher of the WebSite, the
 * provider of every Service, and the employer of the founder. A connected
 * graph is what lets Google and LLM-based search resolve "Oria Digital" as one
 * entity rather than a string that happens to appear on some pages.
 */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const PERSON_ID = `${site.url}/#founder`;

type Json = Record<string, unknown>;

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
    slogan: site.tagline,
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
    areaServed: [
      { "@type": "City", name: site.serviceArea.primary },
      { "@type": "Country", name: site.serviceArea.secondary },
    ],
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
      "Website design and development",
      "Technical SEO",
      "Local SEO",
      "Conversion rate optimisation",
      "AI assistants for small business",
      "Business process automation",
      "CRM integration",
      "WordPress development",
      "Next.js development",
      "Core Web Vitals",
    ],
    knowsLanguage: ["en-AU"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Oria Digital services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        name: s.serviceType,
        url: absoluteUrl(`/services/${s.slug}`),
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
    knowsAbout: [
      "Web development",
      "Digital strategy",
      "Information technology",
      "Artificial intelligence",
      "Business automation",
    ],
  };
}

/** WebPage node. Ties each page back to the site and organisation. */
export function webPageSchema(input: {
  path: string;
  name: string;
  description: string;
  /** Primary topic — helps entity association. */
  about?: string;
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
  const url = absoluteUrl(`/services/${s.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.serviceType,
    serviceType: s.serviceType,
    description: s.answer,
    url,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: site.serviceArea.primary },
      { "@type": "Country", name: site.serviceArea.secondary },
    ],
    audience: {
      "@type": "BusinessAudience",
      name: "Australian small and local businesses",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: site.currency,
      price: s.priceFrom,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: s.priceFrom,
        priceCurrency: site.currency,
        valueAddedTaxIncluded: false,
      },
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/contact"),
    },
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

/** Monthly plans as an aggregate offer — the shape price-comparison surfaces read. */
export function pricingSchema(): Json {
  const url = absoluteUrl("/pricing");
  return {
    "@type": "Product",
    "@id": `${url}#plans`,
    name: "Oria Digital monthly plans",
    description:
      "Monthly plans that run and improve a business digital system: hosting and security on Oria Care, AI assistant and automation on Oria Grow, full digital operations on Oria System.",
    brand: { "@id": ORG_ID },
    url,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: site.currency,
      lowPrice: Math.min(...plans.map((p) => p.price)),
      highPrice: Math.max(...plans.map((p) => p.price)),
      offerCount: plans.length,
      offers: plans.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.summary,
        price: p.price,
        priceCurrency: site.currency,
        url: `${url}#${p.slug}`,
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.price,
          priceCurrency: site.currency,
          unitCode: "MON",
          billingIncrement: 1,
          valueAddedTaxIncluded: false,
        },
        seller: { "@id": ORG_ID },
      })),
    },
  };
}

export function setupOfferSchema(): Json {
  return {
    "@type": "Offer",
    "@id": `${absoluteUrl("/pricing")}#setup`,
    name: setup.name,
    description: setup.summary,
    price: setup.priceFrom,
    priceCurrency: site.currency,
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: setup.priceFrom,
      priceCurrency: site.currency,
      valueAddedTaxIncluded: false,
    },
    availability: "https://schema.org/InStock",
    seller: { "@id": ORG_ID },
  };
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
export function howToSchema(steps: { title: string; body: string }[]): Json {
  return {
    "@type": "HowTo",
    "@id": `${site.url}/#process`,
    name: "How Oria Digital builds a business digital system",
    description:
      "The four stages of an Oria Digital engagement: a free audit, a one-off build, a monthly run plan, and ongoing improvement.",
    totalTime: "P90D",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: (Json | null)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
