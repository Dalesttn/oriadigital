import { NextResponse } from "next/server";
import { submissionSchema, toLeadRow, needLabel, auditProblemLabel } from "@/lib/contact-schema";
import { site } from "@/lib/site";

/**
 * Enquiry endpoint — both the contact form and the free website audit form.
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
 * Attribution (UTMs, landing page, referrer) is stored alongside the lead in
 * an `attribution` jsonb column. If that column doesn't exist yet, the insert
 * is retried without it, so a schema lag never loses an enquiry.
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
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
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
  if (data.company) return NextResponse.json({ ok: true });

  const row = toLeadRow(data);
  const failures: string[] = [];
  /** Which services failed, by name. Returned to the caller; the reason is not. */
  const failedSinks: string[] = [];

  // 1. Persist the enquiry.
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

      let { error } = await supabase.from("leads").insert(row);
      // Schema lag: the attribution column hasn't been added yet. Store the
      // lead anyway — losing an enquiry over a missing column is the wrong trade.
      if (error && /attribution/i.test(error.message)) {
        const { attribution: _dropped, ...withoutAttribution } = row;
        void _dropped;
        console.warn("[contact] leads.attribution column missing — see INTEGRATIONS.md; inserting without it");
        ({ error } = await supabase.from("leads").insert(withoutAttribution));
      }
      if (error) {
        failures.push(`supabase: ${error.message}`);
        failedSinks.push("supabase");
      }
    } catch (err) {
      failures.push(`supabase: ${(err as Error).message}`);
      failedSinks.push("supabase");
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

      const isAudit = data.source === "audit";
      const subject = isAudit
        ? `Free audit request — ${data.website}`
        : `Enquiry: ${needLabel(data.need)} — ${data.name}`;

      const lines = isAudit
        ? [
            `Name:      ${data.name}`,
            `Email:     ${data.email}`,
            `Website:   ${data.website}`,
            `Problem:   ${auditProblemLabel(data.problem)}`,
            `Phone:     ${data.phone || "—"}`,
            `Business:  ${data.businessType || "—"}`,
          ]
        : [
            `Name:      ${data.name}`,
            `Email:     ${data.email}`,
            `Website:   ${data.website || "—"}`,
            `Needs:     ${needLabel(data.need)}`,
            `Budget:    ${data.budget || "—"}`,
            "",
            data.message || "(no message)",
          ];

      const a = data.attribution;
      if (a && Object.keys(a).length) {
        lines.push(
          "",
          "— Attribution —",
          ...Object.entries(a)
            .filter(([, v]) => v)
            .map(([k, v]) => `${k}: ${v}`),
        );
      }

      const { error } = await resend.emails.send({
        from: notifyFrom,
        to: notifyTo,
        replyTo: data.email,
        subject,
        text: lines.join("\n"),
      });
      if (error) {
        failures.push(`resend: ${error.message}`);
        failedSinks.push("resend");
      }
    } catch (err) {
      failures.push(`resend: ${(err as Error).message}`);
      failedSinks.push("resend");
    }
  }

  if (failures.length) {
    console.error("[contact] delivery failures:", failures.join(" | "));
    // A configured sink failed — say so rather than showing a false success.
    // `sink` names which service broke but never why; the underlying message
    // can carry connection strings and is kept server-side.
    return NextResponse.json(
      {
        ok: false,
        error: `Something went wrong sending your request. Please email ${site.contact.email} directly.`,
        sink: failedSinks,
      },
      { status: 502 },
    );
  }

  if (!supabaseUrl && !resendKey) {
    // No sink configured yet: log so local development still shows the payload.
    console.info("[contact] no delivery configured; enquiry received:", row);
  }

  return NextResponse.json({ ok: true });
}
