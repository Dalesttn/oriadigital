import { Button } from "@/components/ui/Button";
import { primaryCta, secondaryCta } from "@/lib/nav";
import { railSteps } from "@/lib/content/home";
import { events } from "@/lib/analytics";

/**
 * Hero — the page's one H1 and its one primary CTA.
 *
 * Perth is in the eyebrow and the H1. Outcomes come before technology in the
 * supporting copy. The technical background field stays: a fine grid, a warm
 * radial wash and two curved traces at very low opacity — discovered, not
 * noticed. The floating notices are real system events, not decoration.
 */
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <svg className="hero-trace" viewBox="0 0 1440 700" preserveAspectRatio="none">
          <path d="M-40 470 C 250 470, 300 250, 560 250 S 900 250, 1180 118" />
          <path d="M1480 520 C 1180 520, 1140 330, 880 330 S 520 330, 220 196" />
          <circle cx="560" cy="250" r="3" />
          <circle cx="880" cy="330" r="3" />
          <circle cx="1180" cy="118" r="2.5" />
          <circle cx="220" cy="196" r="2.5" />
        </svg>
      </div>

      <div className="note-card note-l" aria-hidden="true">
        <span className="note-wire" />
        <div className="note-in">
          <span className="note-hd">
            <i className="pulse" />
            New enquiry
          </span>
          <span className="note-tx">&ldquo;Do you cover Joondalup?&rdquo;</span>
          <span className="note-mt">Answered in 8s · 9:14 pm Sat</span>
        </div>
      </div>
      <div className="note-card note-r" aria-hidden="true">
        <span className="note-wire" />
        <div className="note-in">
          <span className="note-hd">
            <i />
            Qualified &amp; booked
          </span>
          <span className="note-tx">Tue 7:30 am</span>
          <span className="note-mt">Added to calendar · logged in CRM</span>
        </div>
      </div>

      <div className="hero-inner">
        <span className="hero-kicker">
          <svg className="spark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 1.4c.62 5.66 4.52 9.56 10.18 10.18-5.66.62-9.56 4.52-10.18 10.18-.62-5.66-4.52-9.56-10.18-10.18C7.48 10.96 11.38 7.06 12 1.4Z" />
          </svg>
          Perth Web Design + AI Automation
        </span>

        <h1>
          Web Design &amp; AI Automation for <span className="ser grad">Perth Businesses</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(18px,2vw,23px)",
            letterSpacing: "-.035em",
            lineHeight: 1.3,
            maxWidth: "30ch",
            margin: "-6px 0 0",
          }}
        >
          Websites that win enquiries &mdash; automation that follows them up.
        </p>

        <p className="lede" style={{ maxWidth: "56ch", fontSize: "clamp(16px,1.6vw,18.5px)" }}>
          Build a better website. Capture more enquiries. Automatically follow them up. Oria Digital
          creates websites and lead systems that help Perth service businesses turn more visitors into
          customers.
        </p>

        <div
          className="cta-row"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 4 }}
        >
          <Button href={primaryCta.href} size="lg" arrow data-track={events.auditCtaClick}>
            {primaryCta.labelLong}
          </Button>
          <Button href={secondaryCta.href} variant="secondary" size="lg" arrow data-track={events.pricingCtaClick}>
            {secondaryCta.label}
          </Button>
        </div>

        <div className="sysline">
          <span className="sysline-a">
            <i aria-hidden="true" />
            One person. One system.
          </span>
          <span className="sysline-b">From search to booked customer</span>
        </div>
      </div>

      {/* The customer journey, as the repeating signature under the hero. */}
      <div className="wrap" style={{ paddingLeft: 0, paddingRight: 0, marginTop: "clamp(52px,7vw,88px)" }}>
        <ol className="rail" aria-label="The path from search to booked customer">
          {railSteps.map((step) => (
            <li key={step.label} className={`rail-step${"on" in step && step.on ? " on" : ""}`}>
              <span className="rail-line">
                <span className="rail-node" />
              </span>
              <span className="rail-lb">{step.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
