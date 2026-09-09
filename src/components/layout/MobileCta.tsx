"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { primaryCta } from "@/lib/nav";

/**
 * Sticky bottom CTA on mobile.
 *
 * Suppressed on /contact — the page it points at — so the visitor is never
 * offered the action they are already taking.
 */
export function MobileCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div className="mobile-cta">
      <Button href={primaryCta.href} block arrow>
        {primaryCta.label}
      </Button>
    </div>
  );
}
