"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { concerns, contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Audit request form.
 *
 * Progressive by construction: it is a real <form> with real labels and
 * required attributes, so it is usable and readable without JavaScript running
 * the enhancement. The client-side check is a courtesy — the API route
 * re-validates everything.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path.join(".");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !result.ok) {
        setFormError(result.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setFormError(
        `Something went wrong sending your request. Please email ${site.contact.email} directly.`,
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        style={{
          background: "var(--dark)",
          color: "var(--dark-fg)",
          borderRadius: "var(--radius-md)",
          padding: "clamp(26px,3vw,40px)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <Eyebrow onDark className="self-start">
          Request received
        </Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.1 }}>
          Thanks — I&rsquo;ll be in touch within one business day.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--dark-fg-mid)" }}>
          You&rsquo;ll get a confirmation email shortly, with a couple of times to choose from for
          the thirty-minute call.
        </p>
        <Button href="/" variant="onDark" className="self-start">
          Back to home
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      data-reveal
      className="ocard"
      style={{
        padding: "clamp(24px,3vw,38px)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Honeypot. Hidden from people, offered to bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="c-company">Company</label>
        <input id="c-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        <div className="field">
          <label htmlFor="c-name">Your name</label>
          <input
            id="c-name"
            name="name"
            className="input"
            required
            autoComplete="name"
            placeholder="First and last name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          {errors.name && (
            <p id="err-name" className="form-error" style={{ marginTop: 6 }}>
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="c-biz">Business</label>
          <input
            id="c-biz"
            name="business"
            className="input"
            required
            autoComplete="organization"
            placeholder="Business name"
            aria-invalid={Boolean(errors.business)}
            aria-describedby={errors.business ? "err-biz" : undefined}
          />
          {errors.business && (
            <p id="err-biz" className="form-error" style={{ marginTop: 6 }}>
              {errors.business}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input
            id="c-email"
            name="email"
            type="email"
            className="input"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@yourbusiness.com.au"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && (
            <p id="err-email" className="form-error" style={{ marginTop: 6 }}>
              {errors.email}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="c-site">Website (if you have one)</label>
          <input
            id="c-site"
            name="website"
            className="input"
            autoComplete="url"
            placeholder="yourbusiness.com.au"
          />
        </div>
      </div>

      <fieldset className="field" style={{ border: 0, margin: 0, padding: 0 }}>
        <legend
          style={{
            fontSize: 12,
            marginBottom: 6,
            color: "var(--muted)",
            fontWeight: 600,
            padding: 0,
          }}
        >
          What do you need help with?
        </legend>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 8 }}>
          {concerns.map((c, i) => (
            <label className="radio" key={c.value}>
              <input type="radio" name="concern" value={c.value} defaultChecked={i === 0} />
              <span className="dot" aria-hidden="true" />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="c-msg">Anything else I should know?</label>
        <textarea
          id="c-msg"
          name="message"
          className="input"
          placeholder="What you do, where, and what you'd like to change."
        />
      </div>

      {formError && (
        <p className="form-error" role="alert">
          {formError}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request my Digital System Audit"}
      </button>

      <span style={{ fontSize: "12.5px", color: "var(--muted)" }}>
        No obligation. You keep the written plan either way. Your details are used only to reply to
        this enquiry — see the{" "}
        <a href="/privacy" style={{ color: "var(--accent-start)", textDecoration: "underline" }}>
          privacy policy
        </a>
        .
      </span>
    </form>
  );
}
