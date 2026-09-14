import { trustItems } from "@/lib/content/home";

/** Plain credibility facts. Deliberately under-designed. */
export function TrustBar() {
  return (
    <section className="wrap" aria-label="About Oria Digital, briefly" style={{ paddingTop: "clamp(28px,4vw,48px)" }}>
      <ul className="trust">
        {trustItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
