import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { entryOffers, type Offer } from "@/lib/content/pricing";

function price(o: Offer) {
  return `${o.qualifier ? "from " : ""}$${o.price.toLocaleString("en-AU")}${o.unit ?? ""}`;
}

/**
 * The low-risk entry offers.
 *
 * `which` picks one or both. Each renders as a self-contained block with the
 * price stated up front, because the point of an entry offer is that a cold
 * prospect can say yes without a phone call.
 */
export function EntryOffers({
  which = ["website-tune-up", "wordpress-sos"],
  heading,
}: {
  which?: Array<"website-tune-up" | "wordpress-sos">;
  heading?: boolean;
}) {
  const offers = which.map((slug) => entryOffers.find((o) => o.slug === slug)!);
  const showHeading = heading ?? offers.length > 1;

  return (
    <section
      id="entry-offers"
      className="wrap"
      style={{ paddingBottom: "var(--sec)" }}
      aria-label="Entry offers"
    >
      {showHeading && (
        <div className="text-center" style={{ marginBottom: 40 }}>
          <Eyebrow className="mb-5">Start small</Eyebrow>
          <h2 style={{ fontSize: "clamp(32px,4.2vw,56px)", maxWidth: "18ch", margin: "0 auto" }}>
            Already have a website? <span className="ser grad">Start here.</span>
          </h2>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${offers.length > 1 ? "320px" : "100%"}),1fr))`,
          gap: 18,
        }}
      >
        {offers.map((o, i) => (
          <article
            key={o.slug}
            id={o.slug}
            data-reveal
            data-d={i || undefined}
            className={`offer${o.featured ? " offer-featured" : ""}`}
          >
            <div className="offer-head">
              <div>
                <span className={`label${o.featured ? " on-dark" : ""}`}>
                  {o.slug === "wordpress-sos" ? "Something broken on your WordPress site?" : "Start here"}
                </span>
                <h3 style={{ fontSize: "clamp(26px,3vw,36px)", marginTop: 10 }}>
                  {o.name} <span className="ser" style={{ fontSize: "0.72em", opacity: 0.85 }}>— {price(o)}</span>
                </h3>
              </div>
            </div>
            <p className="offer-summary">{o.summary}</p>
            <ul className="ticklist">
              {o.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {o.slug === "wordpress-sos" && <p className="offer-note">No rebuild required.</p>}
            <p className="offer-best">
              <strong>Best for</strong> {o.bestFor}
            </p>
            <div style={{ marginTop: "auto", paddingTop: 8 }}>
              <Button
                href={o.cta.href}
                variant={o.featured ? "primary" : "secondary"}
                arrow
                data-track={o.event}
              >
                {o.cta.label}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
