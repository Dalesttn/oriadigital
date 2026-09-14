import type { Attribution } from "./contact-schema";

/**
 * First-touch lead attribution.
 *
 * Captured once, on the first page a visitor lands on, and stored in
 * localStorage. Forms send it with the enquiry so a lead can be traced to
 * the campaign, landing page and referrer that produced it — which is what
 * makes paid advertising accountable later. Never overwritten by later visits;
 * the first touch is the one that matters for attribution.
 *
 * Client-only. Every access is wrapped: storage can be unavailable or throw.
 */

const KEY = "oria_attribution_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(KEY)) return; // first touch only

    const url = new URL(window.location.href);
    const data: Attribution = {
      landing_page: url.pathname + url.search,
      referrer: document.referrer || undefined,
      first_seen: new Date().toISOString(),
    };
    for (const k of UTM_KEYS) {
      const v = url.searchParams.get(k);
      if (v) data[k] = v.slice(0, 200);
    }
    // Ignore internal referrers — they are navigation, not acquisition.
    if (data.referrer && new URL(data.referrer).host === url.host) delete data.referrer;

    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable — attribution is best-effort */
  }
}

export function readAttribution(): Attribution | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : undefined;
  } catch {
    return undefined;
  }
}
