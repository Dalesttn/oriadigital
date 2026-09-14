"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { needs, needValues, contactSchema, type Need } from "@/lib/contact-schema";
import { readAttribution } from "@/lib/attribution";
import { events, track } from "@/lib/analytics";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Two-step enquiry form.
 *
 * Step 1 asks the only question that changes the conversation: what do you
 * need help with. Step 2 is four short fields. Budget is optional and
 * collapsed. A `?need=` query param (from service-page CTAs) pre-selects
 * step 1 so the visitor lands on step 2.
 *
 * A real <form> with real labels and required attributes: usable without the
 * enhancement, and the API route re-validates everything.
 */
export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("need");
  const initialNeed = (needValues as readonly string[]).includes(preset ?? "") ? (preset as Need) : null;

  const [need, setNeed] = useState<Need | null>(initialNeed);
  const [step, setStep] = useState<1 | 2>(initialNeed ? 2 : 1);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [showBudget, setShowBudget] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError(null);

    const fd = new FormData(event.currentTarget);
    const payload = { source: "contact", need, ...Object.fromEntries(fd.entries()), attribution: readAttribution() };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path.join(".");
        if (!fieldErrors[k]) fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !result.ok) {
        setFormError(result.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      track(events.contactFormSubmit, { need: parsed.data.need });
      setStatus("sent");
    } catch {
      setFormError(`Something went wrong sending your request. Please email ${site.contact.email} directly.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div style={{ background: "var(--dark)", color: "var(--dark-fg)", borderRadius: "var(--radius-md)", padding: "clamp(26px,3vw,40px)", display: "flex", flexDirection: "column", gap: 18 }}>
        <Eyebrow onDark className="self-start">Message received</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.1 }}>
          Thanks — I&rsquo;ll reply within one business day.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--dark-fg-mid)" }}>
          You&rsquo;ll get a reply from me directly, usually with a couple of questions or a couple of times for a
          short call — whichever is quicker for what you&rsquo;ve described.
        </p>
        <Button href="/" variant="onDark" className="self-start">
          Back to home
        </Button>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`err-${k}`} className="form-error" style={{ marginTop: 6 }}>
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="ocard"
      style={{ padding: "clamp(24px,3vw,38px)", display: "flex", flexDirection: "column", gap: 22, boxShadow: "var(--shadow-md)" }}
    >
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="c-company">Company</label>
        <input id="c-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Step 1 */}
      <fieldset className="form-step" style={{ border: 0, margin: 0, padding: 0 }}>
        <div className="form-step-head">
          <legend style={{ padding: 0, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, letterSpacing: "-.03em" }}>
            <span className="form-step-no" style={{ display: "block", marginBottom: 4 }}>Step 1 of 2</span>
            What do you need help with?
          </legend>
          {step === 2 && (
            <button type="button" className="linkbtn" onClick={() => setStep(1)}>
              Change
            </button>
          )}
        </div>
        {step === 1 ? (
          <div className="choice-grid">
            {needs.map((n) => (
              <label className="choice" key={n.value}>
                <input
                  type="radio"
                  name="need-choice"
                  value={n.value}
                  checked={need === n.value}
                  onChange={() => {
                    setNeed(n.value);
                    setStep(2);
                  }}
                />
                {n.label}
              </label>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 15.5, fontWeight: 600 }}>{needs.find((n) => n.value === need)?.label}</p>
        )}
      </fieldset>

      {/* Step 2 */}
      {step === 2 && (
        <div className="form-step">
          <span className="form-step-no">Step 2 of 2 · your details</span>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            <div className="field">
              <label htmlFor="c-name">Your name</label>
              <input id="c-name" name="name" className="input" required autoComplete="name" placeholder="First and last name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "err-name" : undefined} />
              {err("name")}
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" className="input" required autoComplete="email" inputMode="email" placeholder="you@yourbusiness.com.au" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "err-email" : undefined} />
              {err("email")}
            </div>
          </div>

          <div className="field">
            <label htmlFor="c-site">Website (if you have one)</label>
            <input id="c-site" name="website" className="input" autoComplete="url" inputMode="url" placeholder="yourbusiness.com.au" />
          </div>

          <div className="field">
            <label htmlFor="c-msg">Short message</label>
            <textarea id="c-msg" name="message" className="input" placeholder="What you do, and what you'd like to change." />
          </div>

          {showBudget ? (
            <div className="field">
              <label htmlFor="c-budget">Budget range (optional)</label>
              <select id="c-budget" name="budget" className="input" defaultValue="">
                <option value="">Prefer not to say yet</option>
                <option value="under $500">Under $500</option>
                <option value="$500–$1,500">$500–$1,500</option>
                <option value="$1,500–$5,000">$1,500–$5,000</option>
                <option value="$5,000–$10,000">$5,000–$10,000</option>
                <option value="$10,000+">$10,000+</option>
              </select>
            </div>
          ) : (
            <button type="button" className="linkbtn self-start" onClick={() => setShowBudget(true)}>
              Add a budget range (optional)
            </button>
          )}

          {formError && (
            <p className="form-error" role="alert">
              {formError}
            </p>
          )}

          <button type="submit" className="btn btn-primary btn-block" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Enquiry"}
          </button>

          <span style={{ fontSize: "12.5px", color: "var(--muted)" }}>
            Your details are used only to reply to this enquiry — see the{" "}
            <a href="/privacy" style={{ color: "var(--accent-start)", textDecoration: "underline" }}>privacy policy</a>.
          </span>
        </div>
      )}
    </form>
  );
}
