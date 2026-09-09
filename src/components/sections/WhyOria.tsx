import { Eyebrow } from "@/components/ui/Section";

const pillars = [
  {
    label: "Website",
    title: "Customer-facing experience",
    body: "Design, build, UX and the path to the enquiry.",
  },
  {
    label: "System",
    title: "AI + automation",
    body: "The assistant, the qualification and the workflows behind it.",
  },
  {
    label: "Improvement",
    title: "SEO, conversion, optimisation",
    body: "Measured monthly, then changed when it should be.",
  },
];

export function WhyOria() {
  return (
    <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="why-heading">
      <div className="panel" style={{ padding: "clamp(44px,6vw,86px) clamp(24px,4vw,64px)" }}>
        <div className="text-center" style={{ marginBottom: "clamp(36px,4.5vw,60px)" }}>
          <Eyebrow className="mb-[22px]">Why Oria</Eyebrow>
          <h2
            id="why-heading"
            style={{
              fontSize: "clamp(28px,3.6vw,48px)",
              lineHeight: 1.14,
              margin: "0 auto",
              maxWidth: "22ch",
            }}
          >
            Most agencies build the website. Most automation companies build the workflow.{" "}
            <span className="ser grad">Oria connects the two.</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
            gap: "clamp(14px,2vw,20px)",
            alignItems: "stretch",
          }}
        >
          {pillars.map((p, i) => (
            <div
              key={p.label}
              data-reveal
              data-d={i || undefined}
              className="ocard pad stack"
              style={{ gap: 10 }}
            >
              <span className="label">{p.label}</span>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "20.5px",
                  letterSpacing: "-.035em",
                }}
              >
                {p.title}
              </span>
              <p
                style={{
                  marginTop: 6,
                  fontSize: "15.5px",
                  lineHeight: 1.7,
                  color: "var(--color-neutral-800)",
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <p
          className="text-center"
          style={{
            margin: "clamp(28px,3.5vw,44px) auto 0",
            fontSize: "17.5px",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "52ch",
          }}
        >
          Coordinating a developer, a marketer, an automation consultant and an IT provider is where
          things quietly stop working. I cover all four.
        </p>
      </div>
    </section>
  );
}
