import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { site } from "@/lib/site";

/**
 * Founder.
 *
 * Carries the site's experience and trust signals — the E-E-A-T half of the
 * SEO work. A named, real person with a stated role is what both Google's
 * quality systems and LLM answer engines look for on a service business site.
 */
export function Founder({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const Heading = heading;

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
            src="/team/dale-sutton.jpg"
            width={910}
            height={1000}
            alt={`${site.founder.name}, founder of ${site.name}`}
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
          <Eyebrow className="self-start">The person you&rsquo;ll deal with</Eyebrow>
          <Heading id="founder-heading" style={{ fontSize: "clamp(32px,3.9vw,52px)" }}>
            Hi, I&rsquo;m <span className="ser">{site.founder.firstName}.</span>
          </Heading>
          <p className="lede" style={{ maxWidth: "46ch" }}>
            Oria Digital is an independent studio — one person covering web development, digital
            strategy, IT and, more recently, AI and automation. Most business problems don&rsquo;t
            sit neatly inside one of those.
          </p>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(18px,2vw,23px)",
              lineHeight: 1.4,
              letterSpacing: "-.04em",
              marginTop: 4,
              maxWidth: "34ch",
            }}
          >
            No account manager. No offshore hand-off. You deal directly with the person building
            your digital system.
          </p>
          <Button href="/contact" variant="secondary" arrow className="self-start mt-1.5">
            Book a free audit
          </Button>
        </div>
      </div>
    </section>
  );
}
