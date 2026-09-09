import { SectionHead } from "@/components/ui/Section";
import { jobs, type JobFig } from "@/lib/content/home";

/** Small technical figures, revealed on hover or keyboard focus. */
function Figure({ kind }: { kind: JobFig }) {
  const shapes: Record<JobFig, React.ReactNode> = {
    peak: (
      <>
        <path d="M2 18 L30 18 L44 4 L58 18 L86 18" />
        <circle cx="44" cy="4" r="2.6" />
      </>
    ),
    branch: (
      <>
        <path d="M2 11 L34 11" />
        <path d="M34 11 L52 3" />
        <path d="M34 11 L52 19" />
        <circle cx="34" cy="11" r="2.6" />
        <circle cx="54" cy="3" r="2.2" />
        <circle cx="54" cy="19" r="2.2" />
      </>
    ),
    check: (
      <>
        <path d="M4 5 h26 v14 h-26 z" />
        <path d="M4 10 h26" />
        <path d="M44 12 l6 6 l14 -14" />
      </>
    ),
    dots: (
      <>
        <path d="M2 11 h20" />
        <path d="M30 11 h20" />
        <path d="M58 11 h20" />
        <circle cx="26" cy="11" r="2.4" />
        <circle cx="54" cy="11" r="2.4" />
        <circle cx="82" cy="11" r="2.4" />
      </>
    ),
    trend: (
      <>
        <path d="M2 19 L22 14 L42 15 L62 7 L84 3" />
        <circle cx="84" cy="3" r="2.6" />
      </>
    ),
    bars: (
      <>
        <line x1="6" y1="20" x2="6" y2="12" />
        <line x1="22" y1="20" x2="22" y2="6" />
        <line x1="38" y1="20" x2="38" y2="15" />
        <line x1="54" y1="20" x2="54" y2="9" />
        <line x1="70" y1="20" x2="70" y2="3" />
      </>
    ),
  };

  return (
    <div className="job-fig">
      <svg width="88" height="22" viewBox="0 0 88 22" aria-hidden="true">
        {shapes[kind]}
      </svg>
    </div>
  );
}

export function SixJobs() {
  return (
    <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="jobs-heading">
      <SectionHead
        className="mb-11"
        eyebrow="What the system does"
        title={<span id="jobs-heading">Six things your website should do on its own.</span>}
        lede="Not a list of integrations — the jobs the system does between someone finding you and becoming a customer."
        maxWidth="22ch"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,270px),1fr))",
          gap: "0 clamp(24px,3vw,48px)",
        }}
      >
        {jobs.map((job) => (
          <article className="job" key={job.no} tabIndex={0}>
            <span className="job-no">{job.no}</span>
            <h3>{job.title}</h3>
            <p>{job.body}</p>
            <Figure kind={job.fig} />
          </article>
        ))}
      </div>
    </section>
  );
}
