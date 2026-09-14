"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";
import { events, track } from "@/lib/analytics";

/**
 * The site's only sitewide client behaviour, in one place:
 *
 *  - first-touch attribution capture on landing
 *  - delegated click tracking: any element with `data-track="event_name"`
 *    fires that GA4 event; `tel:` and `mailto:` links are tracked automatically
 *  - scroll reveals (moved here from Reveal.tsx so there is one effect)
 *
 * One listener on the document rather than a handler per button: markup stays
 * server-rendered, and adding tracking to a CTA is one attribute.
 */
export function SiteRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button");
      if (!el) return;

      const href = el.getAttribute("href") ?? "";
      const label = (el.getAttribute("data-track-label") ?? el.textContent ?? "").trim().slice(0, 80);

      if (href.startsWith("tel:")) return track(events.phoneClick, { label, page: pathname });
      if (href.startsWith("mailto:")) return track(events.emailClick, { label, page: pathname });

      const event = el.getAttribute("data-track");
      if (event) track(event, { label, page: pathname, href });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  // Scroll reveals. Re-run on navigation so new pages animate in too.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
