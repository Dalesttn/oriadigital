import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { site } from "@/lib/site";

/**
 * Founder credibility.
 *
 * The E-E-A-T half of the SEO work: a named, real person with a stated role,
 * stated experience and a real photo. Positioned high on the homepage per the
 * brief, because "who am I actually dealing with" is the question a small
 * business owner is asking on every agency site.
 */
export function FounderCredibility({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const Heading = heading;
  const f = site.founder;

  return (
    <section id="about" className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="founder-heading">
      <div
        data-reveal
        className="ocard"
        style={{
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,290px),1fr))",
          alignItems: "stretch",
          background: "var(--color-panel)",
        }}
      >
        <div style={{ minHeight: 370, background: "rgba(23,23,23,.08)" }}>
          <ImageSlot
            src={f.image}
            width={910}
            height={1000}
            alt={`${f.name}, founder of ${site.name}`}
            sizes="(max-width: 900px) 100vw, 560px"
            objectPosition="center 18%"
          />
        </div>
        <div
          style={{
            padding: "clamp(30px,4vw,56px)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            justifyContent: "center",
          }}
        >
          <Eyebrow className="self-start">Who you&rsquo;ll work with</Eyebrow>
          <Heading id="founder-heading" style={{ fontSize: "clamp(30px,3.6vw,48px)" }}>
            Work directly with the person <span className="ser">building your system.</span>
          </Heading>
          <p className="lede" style={{ maxWidth: "48ch" }}>
            {site.name} is run by {f.name}, a Perth-based web developer with more than a decade of
            experience building and supporting websites for businesses across multiple industries.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--color-neutral-800)", maxWidth: "48ch" }}>
            There are no layers of account managers or offshore hand-offs. You work directly with the
            person designing, building and improving your website and automation system.
          </p>
          <ul className="chips" aria-label="Experience">
            <li>{f.experience} experience</li>
            {f.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <Button href="/about" variant="secondary" arrow className="self-start mt-1.5">
            About Oria Digital
          </Button>
        </div>
      </div>
    </section>
  );
}
