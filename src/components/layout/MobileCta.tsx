"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { primaryCta } from "@/lib/nav";
import { events } from "@/lib/analytics";

/**
 * Sticky bottom CTA on mobile.
 *
 * Suppressed on the pages it points at — the audit and contact forms — so the
 * visitor is never offered the action they are already taking.
 */
export function MobileCta() {
  const pathname = usePathname();
  if (pathname === "/free-website-audit" || pathname === "/contact") return null;

  return (
    <div className="mobile-cta">
      <Button href={primaryCta.href} block arrow data-track={events.auditCtaClick} data-track-label="sticky">
        {primaryCta.label}
      </Button>
    </div>
  );
}
