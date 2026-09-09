import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { primaryNav, serviceRoutes } from "@/lib/nav";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      className="wrap"
      style={{ paddingTop: "clamp(56px,8vw,120px)", paddingBottom: "var(--sec)" }}
    >
      <Eyebrow className="mb-6">404</Eyebrow>
      <h1 style={{ fontSize: "clamp(38px,5.6vw,80px)", maxWidth: "14ch", marginBottom: 24 }}>
        That page isn&rsquo;t <span className="ser grad">here.</span>
      </h1>
      <p className="lede" style={{ maxWidth: "48ch", marginBottom: 32 }}>
        The link may be out of date, or the page may have moved. Here is everything else.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
        <Button href="/" size="lg" arrow>
          Back to home
        </Button>
        <Button href="/contact" variant="secondary" size="lg">
          Book a free audit
        </Button>
      </div>

      <nav aria-label="All pages">
        <span className="label" style={{ marginBottom: 14 }}>
          All pages
        </span>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
            gap: 10,
          }}
        >
          {[...primaryNav, ...serviceRoutes, { href: "/faq", label: "FAQ" }, { href: "/contact", label: "Contact" }].map(
            (route) => (
              <li key={route.href}>
                <Link href={route.href} className="lnk" style={{ fontSize: 15 }}>
                  {route.label}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </section>
  );
}
