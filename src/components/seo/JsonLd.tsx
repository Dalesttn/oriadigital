/**
 * Renders a JSON-LD document into the page.
 *
 * Server-rendered on purpose: structured data must be present in the initial
 * HTML, because most AI crawlers (and Google's own fallback crawl) do not
 * execute JavaScript before extracting it.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from typed literals in src/lib/schema.ts, never
      // from user input, so there is nothing to escape beyond `<`.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
