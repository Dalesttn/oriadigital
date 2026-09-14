"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { auditProblems, auditSchema } from "@/lib/contact-schema";
import { readAttribution } from "@/lib/attribution";
import { events, track } from "@/lib/analytics";
import { auditChecklist } from "@/lib/content/home";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Free website audit request. Four fields, two optional. The confirmation
 * screen says what will be reviewed, what they'll receive and what happens
 * next — the brief's three requirements for after submission.
 */
export function AuditForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [more, setMore] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError(null);

    const fd = new FormData(event.currentTarget);
    const payload = { source: "audit", ...Object.fromEntries(fd.entries()), attribution: readAttribution() };

    const parsed = auditSchema.safeParse(payload);
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
      track(events.auditFormSubmit, { problem: parsed.data.problem });
      setStatus("sent");
    } catch {
      setFormError(`Something went wrong sending your request. Please email ${site.contact.email} directly.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="ocard" style={{ padding: "clamp(26px,3vw,40px)", display: "flex", flexDirection: "column", gap: 18, background: "var(--dark)", color: "var(--dark-fg)" }}>
        <Eyebrow onDark className="self-start">Request received</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.1 }}>
          Thanks — your audit is in the queue.
        </h2>
        <div style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--dark-fg-mid)", display: "flex", flexDirection: "column", gap: 12 }}>
          <p>
            <strong style={{ color: "var(--dark-fg)" }}>What I&rsquo;ll review:</strong> {auditChecklist.slice(0, -1).join(", ").toLowerCase()} and {auditChecklist[auditChecklist.length - 1].toLowerCase()}.
          </p>
          <p>
            <strong style={{ color: "var(--dark-fg)" }}>What you&rsquo;ll receive:</strong> three to five priority recommendations, in writing, within two business days. Yours to keep either way.
          </p>
          <p>
            <strong style={{ color: "var(--dark-fg)" }}>What happens next:</strong> I&rsquo;ll email the recommendations. If any of them are worth doing, I&rsquo;ll say what it would cost. No call unless you want one.
          </p>
        </div>
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
      style={{ padding: "clamp(24px,3vw,38px)", display: "flex", flexDirection: "column", gap: 18, boxShadow: "var(--shadow-md)" }}
    >
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="a-company">Company</label>
        <input id="a-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="a-site">Your website</label>
        <input id="a-site" name="website" className="input" required inputMode="url" autoComplete="url" placeholder="yourbusiness.com.au" aria-invalid={Boolean(errors.website)} aria-describedby={errors.website ? "err-website" : undefined} />
        {err("website")}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        <div className="field">
          <label htmlFor="a-name">Your name</label>
          <input id="a-name" name="name" className="input" required autoComplete="name" placeholder="First name is fine" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "err-name" : undefined} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="a-email">Email</label>
          <input id="a-email" name="email" type="email" className="input" required autoComplete="email" inputMode="email" placeholder="you@yourbusiness.com.au" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "err-email" : undefined} />
          {err("email")}
        </div>
      </div>

      <fieldset className="field" style={{ border: 0, margin: 0, padding: 0 }}>
        <legend style={{ fontSize: 12, marginBottom: 8, color: "var(--muted)", fontWeight: 600, padding: 0 }}>
          Biggest problem with the website right now?
        </legend>
        <div className="choice-grid">
          {auditProblems.map((p, i) => (
            <label className="choice" key={p.value}>
              <input type="radio" name="problem" value={p.value} defaultChecked={i === 0} />
              {p.label}
            </label>
          ))}
        </div>
      </fieldset>

      {more ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
          <div className="field">
            <label htmlFor="a-phone">Phone (optional)</label>
            <input id="a-phone" name="phone" className="input" inputMode="tel" autoComplete="tel" placeholder="04xx xxx xxx" />
          </div>
          <div className="field">
            <label htmlFor="a-type">Type of business (optional)</label>
            <input id="a-type" name="businessType" className="input" placeholder="e.g. plumber, physio, accountant" />
          </div>
        </div>
      ) : (
        <button type="button" className="linkbtn self-start" onClick={() => setMore(true)}>
          Add phone or business type (optional)
        </button>
      )}

      {formError && (
        <p className="form-error" role="alert">
          {formError}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Get My Free Website Audit"}
      </button>

      <span style={{ fontSize: "12.5px", color: "var(--muted)" }}>
        Free, no obligation. Recommendations in writing within two business days. Your details are used only
        to reply to this request — see the{" "}
        <a href="/privacy" style={{ color: "var(--accent-start)", textDecoration: "underline" }}>privacy policy</a>.
      </span>
    </form>
  );
}
