"use client";

import { useEffect } from "react";

/**
 * Scroll reveals.
 *
 * One observer for the whole document rather than a wrapper component per
 * element: the markup stays server-rendered (nothing is hidden from crawlers),
 * and the only client cost is a single IntersectionObserver. Elements opt in
 * with `data-reveal`; the CSS does the rest and no-ops under reduced motion.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])");

    // Reduced motion: mark everything visible immediately and skip the observer.
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
  }, []);

  return null;
}
