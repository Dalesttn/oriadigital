import type { Faq } from "@/lib/content/faqs";

/**
 * FAQ list.
 *
 * Built on <details>/<summary> rather than a JS accordion for three reasons:
 * the answers are always present in the server-rendered HTML (so answer
 * engines and non-JS crawlers read them), it ships no client JavaScript, and
 * keyboard and screen-reader behaviour comes free from the platform.
 */
export function FaqList({
  items,
  defaultOpen = 0,
  /** Accordion group name — only one item per group stays open. */
  group = "faq",
}: {
  items: Faq[];
  defaultOpen?: number;
  group?: string;
}) {
  return (
    <div>
      {items.map((item, i) => (
        <details key={item.q} className="faq-item" open={i === defaultOpen} name={group}>
          <summary className="faq-q">
            <span>{item.q}</span>
            <span className="sign" aria-hidden="true" />
          </summary>
          <p className="faq-a">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
