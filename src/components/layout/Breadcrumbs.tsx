import Link from "next/link";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumbs. Paired with BreadcrumbList JSON-LD on the same page —
 * Google requires the trail to be visible on the page for the rich result, and
 * it gives AI crawlers the site's hierarchy without inferring it from URLs.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          fontSize: 12.5,
          fontWeight: 600,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.path} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {last ? (
                <span aria-current="page" style={{ color: "var(--ink)" }}>
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} style={{ textDecoration: "none" }}>
                  {crumb.name}
                </Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
