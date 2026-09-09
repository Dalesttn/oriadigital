import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { primaryCta, serviceRoutes } from "@/lib/nav";
import { site } from "@/lib/site";
import { OriaLockup } from "@/components/ui/OriaMark";

const marqueeWords = ["Build", "Automate", "Improve", "Website · AI · Automation"];

function MarqueeRun({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: 30, paddingRight: 30 }}
      {...(ariaHidden ? { "aria-hidden": "true" } : {})}
    >
      {marqueeWords.map((word) => (
        <span key={word} style={{ display: "inline-flex", alignItems: "center", gap: 30 }}>
          {word}
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "rgba(242,237,230,.24)",
            }}
          />
        </span>
      ))}
    </span>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div style={{ overflow: "hidden", borderBottom: "1px solid var(--dark-hair)", padding: "26px 0" }}>
        <div className="mq-track">
          <MarqueeRun />
          <MarqueeRun ariaHidden />
        </div>
      </div>

      <div
        style={{
          maxWidth: "var(--content)",
          margin: "0 auto",
          padding: "clamp(48px,6vw,80px) clamp(24px,4vw,64px) 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
          gap: "44px clamp(32px,5vw,64px)",
          alignItems: "start",
        }}
      >
        <div>
          <OriaLockup markSize={44} fontSize={20} onDark />
          <p
            className="ser"
            style={{
              margin: "14px 0 22px",
              fontSize: "clamp(19px,2vw,25px)",
              lineHeight: 1.3,
              color: "var(--dark-fg-mid)",
            }}
          >
            {site.tagline}
          </p>
          <span
            style={{
              display: "block",
              fontSize: "10.5px",
              fontWeight: 700,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "var(--dark-fg-dim)",
              lineHeight: 2,
            }}
          >
            {site.address.locality}, {site.address.countryName}
            <br />
            Working Australia-wide
          </span>
        </div>

        <nav aria-label="Services" style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
          <span className="label on-dark" style={{ marginBottom: 6 }}>
            Services
          </span>
          {serviceRoutes.map((r) => (
            <Link key={r.href} href={r.href}>
              {r.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Company" style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
          <span className="label on-dark" style={{ marginBottom: 6 }}>
            Company
          </span>
          <Link href="/work">Work</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
          <span className="label on-dark" style={{ marginBottom: 6 }}>
            Contact
          </span>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          {site.contact.phone && (
            <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>
          )}
          {site.founder.sameAs[0] && (
            <a href={site.founder.sameAs[0]} rel="me noopener" target="_blank">
              LinkedIn
            </a>
          )}
          {site.contact.abn && <span style={{ color: "var(--dark-fg-mid)" }}>ABN {site.contact.abn}</span>}
          <div style={{ marginTop: 10 }}>
            <Button href={primaryCta.href} arrow>
              {primaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "var(--content)",
          margin: "0 auto",
          padding: "18px clamp(24px,4vw,64px) 32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "8px 24px",
          fontSize: "12.5px",
          color: "var(--dark-fg-dim)",
          borderTop: "1px solid var(--dark-hair)",
        }}
      >
        <span>
          © {year} {site.name}
        </span>
        <span style={{ display: "flex", gap: 16 }}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
