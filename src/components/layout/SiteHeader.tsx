"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, primaryCta, serviceRoutes } from "@/lib/nav";
import { site } from "@/lib/site";
import { OriaLockup } from "@/components/ui/OriaMark";
import { events } from "@/lib/analytics";

/**
 * The floating control bar.
 *
 * Client-side for three behaviours: a denser background once the page
 * scrolls, the Services dropdown, and the mobile drawer. The links themselves
 * are ordinary server-rendered <Link>s, so navigation and crawling never
 * depend on JS — the dropdown's links are also in the drawer and the footer.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const inServices =
    pathname === "/services" || serviceRoutes.some((r) => pathname === r.href) || /-perth$/.test(pathname);

  return (
    <div className="navwrap" {...(stuck ? { "data-stuck": "" } : {})}>
      <nav className="navbar" aria-label="Primary">
        <Link href="/" className="brand" aria-label={`${site.name} — home`}>
          <OriaLockup markSize={32} fontSize={15} />
        </Link>
        <span className="nav-spacer" />

        {primaryNav.map((item) =>
          item.href === "/services" ? (
            <div key={item.href} className="navdrop" ref={servicesRef}>
              <button
                type="button"
                className="navlink navdrop-btn"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                aria-haspopup="true"
                {...(inServices ? { "aria-current": "page" as const } : {})}
                onClick={() => setServicesOpen((v) => !v)}
              >
                Services
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M1 3.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="navdrop-menu" id="services-menu" onClick={() => setServicesOpen(false)}>
                  {serviceRoutes.map((r) => (
                    <Link key={r.href} href={r.href} {...(isCurrent(r.href) ? { "aria-current": "page" as const } : {})}>
                      {r.label}
                      <span className="navdrop-sub">Perth</span>
                    </Link>
                  ))}
                  <Link href="/services" className="navdrop-all">
                    All services →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="navlink"
              {...(isCurrent(item.href) ? { "aria-current": "page" as const } : {})}
            >
              {item.label}
            </Link>
          ),
        )}

        <Link
          href={primaryCta.href}
          className="btn btn-primary keep"
          style={{ height: 40, padding: "0 18px", fontSize: "13.5px" }}
          data-track={events.auditCtaClick}
          data-track-label="nav"
        >
          {/* The full label doesn't fit beside the lockup and the toggle on a phone. */}
          <span className="cta-full">{primaryCta.label}</span>
          <span className="cta-short">Free Audit</span>
        </Link>

        <button
          type="button"
          className="navtoggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" data-open={open || undefined} />
        </button>
      </nav>

      {open && (
        <div
          className="navdrawer"
          id="mobile-nav"
          // Delegated: any link inside closes the drawer, so a tap-through
          // never leaves it open over the page it navigated to.
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <ul>
            <li>
              <Link href="/" {...(pathname === "/" ? { "aria-current": "page" as const } : {})}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" {...(pathname === "/services" ? { "aria-current": "page" as const } : {})}>
                Services
              </Link>
            </li>
            {serviceRoutes.map((item) => (
              <li key={item.href} className="sub">
                <Link href={item.href} {...(isCurrent(item.href) ? { "aria-current": "page" as const } : {})}>
                  {item.label}
                </Link>
              </li>
            ))}
            {primaryNav
              .filter((i) => i.href !== "/services")
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} {...(isCurrent(item.href) ? { "aria-current": "page" as const } : {})}>
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
          <Link href={primaryCta.href} className="btn btn-primary btn-block" data-track={events.auditCtaClick} data-track-label="drawer">
            {primaryCta.labelLong}
          </Link>
        </div>
      )}
    </div>
  );
}
