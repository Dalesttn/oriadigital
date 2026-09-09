"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, primaryCta, serviceRoutes } from "@/lib/nav";
import { site } from "@/lib/site";
import { OriaLockup } from "@/components/ui/OriaMark";

/**
 * The floating control bar.
 *
 * Client-side only for two behaviours: a denser background once the page
 * scrolls, and the mobile drawer. The links themselves are ordinary
 * server-rendered <Link>s, so navigation and crawling never depend on JS.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

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

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="navwrap" {...(stuck ? { "data-stuck": "" } : {})}>
      <nav className="navbar" aria-label="Primary">
        <Link href="/" className="brand" aria-label={`${site.name} — home`}>
          <OriaLockup markSize={32} fontSize={15} />
        </Link>
        <span className="nav-spacer" />

        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="navlink"
            {...(isCurrent(item.href) ? { "aria-current": "page" as const } : {})}
          >
            {item.label}
          </Link>
        ))}

        <Link
          href={primaryCta.href}
          className="btn btn-primary keep"
          style={{ height: 40, padding: "0 18px", fontSize: "13.5px" }}
        >
          {primaryCta.label}
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
          ref={drawerRef}
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
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  {...(isCurrent(item.href) ? { "aria-current": "page" as const } : {})}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {serviceRoutes.map((item) => (
              <li key={item.href} className="sub">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <Link href={primaryCta.href} className="btn btn-primary btn-block">
            {primaryCta.labelLong}
          </Link>
        </div>
      )}
    </div>
  );
}
