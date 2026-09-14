/**
 * Analytics events.
 *
 * One `track()` and a fixed event vocabulary, so the names in GA4 match the
 * names in the brief and nobody invents a fourth spelling of "cta_click".
 * No-ops when GA4 isn't loaded, so nothing here can break a page.
 */

export const events = {
  auditFormSubmit: "audit_form_submit",
  contactFormSubmit: "contact_form_submit",
  pricingCtaClick: "pricing_cta_click",
  wordpressSosClick: "wordpress_sos_click",
  tuneupClick: "tuneup_click",
  phoneClick: "phone_click",
  emailClick: "email_click",
  caseStudyView: "case_study_view",
  problemCardClick: "problem_card_click",
  auditCtaClick: "audit_cta_click",
} as const;

export type EventName = (typeof events)[keyof typeof events];

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: EventName | string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  const clean: Params = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") clean[k] = v;
  if (typeof window.gtag === "function") {
    window.gtag("event", event, clean);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...clean });
  }
}
