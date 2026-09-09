import { NextResponse } from "next/server";
import { contactSchema, concernLabel } from "@/lib/contact-schema";
import { site } from "@/lib/site";

/**
 * Contact endpoint.
 *
 * Three deliberate properties:
 *  - The server re-validates every field; the client's validation is a
 *    convenience, never a control.
 *  - Delivery is best-effort across two independent sinks (Supabase for the
 *    record, Resend for the notification). A configured sink that fails is
 *    reported; an unconfigured one is skipped, so the form works in
 *    development before any keys exist.
 *  - Nothing secret ever reaches the browser: keys are read here only.
 *
 * TODO(launch): set RESEND_API_KEY and the Supabase vars in the environment.
 */

export const runtime = "nodejs";

/** Crude in-process rate limit. Replace with a shared store behind a CDN. */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: accept silently so a bot learns nothing from the response.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const failures: string[] = [];

  // 1. Persist the enquiry.
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });
      const { error } = await supabase.from("leads").insert({
        name: data.name,
        business: data.business,
        email: data.email,
        website: data.website || null,
        concern: data.concern,
        message: data.message || null,
        source: "website-contact-form",
      });
      if (error) failures.push(`supabase: ${error.message}`);
    } catch (err) {
      failures.push(`supabase: ${(err as Error).message}`);
    }
  }

  // 2. Notify.
  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL ?? site.contact.email;
  const notifyFrom = process.env.CONTACT_FROM_EMAIL;
  if (resendKey && notifyFrom) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: notifyFrom,
        to: notifyTo,
        replyTo: data.email,
        subject: `Audit request — ${data.business}`,
        text: [
          `Name:     ${data.name}`,
          `Business: ${data.business}`,
          `Email:    ${data.email}`,
          `Website:  ${data.website || "—"}`,
          `Needs:    ${concernLabel(data.concern)}`,
          "",
          data.message || "(no message)",
        ].join("\n"),
      });
      if (error) failures.push(`resend: ${error.message}`);
    } catch (err) {
      failures.push(`resend: ${(err as Error).message}`);
    }
  }

  if (failures.length) {
    console.error("[contact] delivery failures:", failures.join(" | "));
    // A configured sink failed — say so rather than showing a false success.
    return NextResponse.json(
      {
        ok: false,
        error: `Something went wrong sending your request. Please email ${site.contact.email} directly.`,
      },
      { status: 502 },
    );
  }

  if (!supabaseUrl && !resendKey) {
    // No sink configured yet: log so local development still shows the payload.
    console.info("[contact] no delivery configured; enquiry received:", data);
  }

  return NextResponse.json({ ok: true });
}
