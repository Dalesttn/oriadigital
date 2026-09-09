import { Button } from "@/components/ui/Button";
import { primaryCta } from "@/lib/nav";
import { railSteps } from "@/lib/content/home";

/**
 * Hero — the page's one H1, its one primary CTA, and a technical background
 * that should be discovered rather than noticed: a fine grid, a warm radial
 * wash and two curved traces, all at very low opacity.
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

      {/* Two real system notices in the margins — what the system actually does. */}
      <div className="note-card note-l" aria-hidden="true">
        <span className="note-wire" />
        <div className="note-in">
          <span className="note-hd">
            <i className="pulse" />
            New enquiry
          </span>
          <span className="note-tx">&ldquo;Do you cover my area?&rdquo;</span>
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
          Web · AI · Automation
        </span>

        <h1>
          Digital systems that make your business <span className="ser grad">work better.</span>
        </h1>

        <p
          className="lede"
          style={{ maxWidth: "56ch", fontSize: "clamp(16px,1.6vw,18.5px)" }}
        >
          Oria Digital helps Australian businesses build better websites, capture more enquiries and
          automate repetitive work.
        </p>

        <div
          className="cta-row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
            marginTop: 4,
          }}
        >
          <Button href={primaryCta.href} size="lg" arrow>
            {primaryCta.labelLong}
          </Button>
          <Button href="/services" variant="secondary" size="lg" arrow>
            See What I Do
          </Button>
        </div>

        <div className="sysline">
          <span className="sysline-a">
            <i aria-hidden="true" />
            Oria System
          </span>
          <span className="sysline-b">Website · AI · Automation · Growth</span>
        </div>
      </div>

      {/* The repeating system signature. */}
      <div
        className="wrap"
        style={{ paddingLeft: 0, paddingRight: 0, marginTop: "clamp(52px,7vw,88px)" }}
      >
        <ol className="rail" aria-label="How the system moves an enquiry">
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
