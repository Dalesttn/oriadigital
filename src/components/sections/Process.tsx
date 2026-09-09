import { SectionHead } from "@/components/ui/Section";
import { processSteps } from "@/lib/content/home";

export function Process() {
  return (
    <section className="wrap" style={{ paddingBottom: "var(--sec)" }} aria-labelledby="process-heading">
      <SectionHead
        className="mb-13"
        eyebrow="How it works"
        title={
          <span id="process-heading">
            Build it. Automate it. <span className="ser grad">Keep improving it.</span>
          </span>
        }
        lede="A website is finished. A digital system isn't — it gets better as it learns what your enquiries actually look like."
      />

      <ol className="tl">
        {processSteps.map((step, i) => (
          <li className="tl-step" key={step.title} data-reveal data-d={i || undefined}>
            <span className="tl-dot" aria-hidden="true" />
            <span className="tl-no">{step.no}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
