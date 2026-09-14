import { z } from "zod";

/**
 * Form contracts.
 *
 * Shared by the client forms and the API route so validation cannot drift
 * between them — and so the server never trusts the client's validation.
 *
 * Two forms, one endpoint:
 *   - the contact form (two-step: what you need, then details)
 *   - the free website audit form (deliberately short)
 * Both post to /api/contact with a `source`, and both carry first-touch
 * attribution so an enquiry can be traced to the channel that produced it.
 */

/** Step 1 of the contact form. Values are stored, labels are shown. */
export const needs = [
  { value: "new", label: "New website" },
  { value: "improve", label: "Improve existing website" },
  { value: "wordpress", label: "WordPress problem" },
  { value: "ai", label: "AI automation" },
  { value: "care", label: "Website care" },
  { value: "unsure", label: "Not sure" },
] as const;

export type Need = (typeof needs)[number]["value"];
export const needValues = needs.map((n) => n.value) as [Need, ...Need[]];
export const needLabel = (value: string) => needs.find((n) => n.value === value)?.label ?? value;

/** Audit form: "biggest website problem". */
export const auditProblems = [
  { value: "enquiries", label: "Not enough enquiries" },
  { value: "slow", label: "Too slow" },
  { value: "mobile", label: "Doesn't work well on mobile" },
  { value: "google", label: "Can't be found on Google" },
  { value: "outdated", label: "Looks outdated" },
  { value: "broken", label: "Something's broken" },
  { value: "unsure", label: "Not sure — that's why I'm asking" },
] as const;

export type AuditProblem = (typeof auditProblems)[number]["value"];
export const auditProblemValues = auditProblems.map((p) => p.value) as [AuditProblem, ...AuditProblem[]];
export const auditProblemLabel = (value: string) =>
  auditProblems.find((p) => p.value === value)?.label ?? value;

/** First-touch attribution, captured client-side on landing. All optional. */
export const attributionSchema = z
  .object({
    utm_source: z.string().max(120).optional(),
    utm_medium: z.string().max(120).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    landing_page: z.string().max(500).optional(),
    referrer: z.string().max(500).optional(),
    first_seen: z.string().max(40).optional(),
  })
  .partial();

export type Attribution = z.infer<typeof attributionSchema>;

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

/** Honeypot — must stay empty. Bots fill every field they can see. */
const honeypot = z.string().max(0).optional().or(z.literal(""));

export const contactSchema = z.object({
  source: z.literal("contact"),
  need: z.enum(needValues),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Please enter a valid email address").max(200),
  website: optionalText(200),
  message: optionalText(4000),
  budget: optionalText(60),
  company: honeypot,
  attribution: attributionSchema.optional(),
});

export const auditSchema = z.object({
  source: z.literal("audit"),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Please enter a valid email address").max(200),
  website: z
    .string()
    .trim()
    .min(4, "Please enter your website address")
    .max(200),
  problem: z.enum(auditProblemValues),
  phone: optionalText(40),
  businessType: optionalText(120),
  company: honeypot,
  attribution: attributionSchema.optional(),
});

export const submissionSchema = z.discriminatedUnion("source", [contactSchema, auditSchema]);

export type ContactInput = z.infer<typeof contactSchema>;
export type AuditInput = z.infer<typeof auditSchema>;
export type Submission = z.infer<typeof submissionSchema>;

/** The `leads` table row. One shape for both forms. */
export type LeadRow = {
  name: string;
  business: string;
  email: string;
  website: string | null;
  concern: string;
  message: string | null;
  source: string;
  attribution: Attribution | null;
};

/**
 * Normalises a submission into the `leads` row shape. The table has one
 * `concern` column; the audit's "biggest problem" maps into it so both forms
 * land in the same place and nothing needs a second table.
 */
export function toLeadRow(s: Submission): LeadRow {
  if (s.source === "audit") {
    return {
      name: s.name,
      business: s.businessType || "(audit request)",
      email: s.email,
      website: s.website,
      concern: `audit:${s.problem}`,
      message: [s.phone ? `Phone: ${s.phone}` : null].filter(Boolean).join("\n") || null,
      source: "free-website-audit",
      attribution: s.attribution ?? null,
    };
  }
  return {
    name: s.name,
    business: "",
    email: s.email,
    website: s.website || null,
    concern: s.need,
    message:
      [s.message || null, s.budget ? `Budget: ${s.budget}` : null].filter(Boolean).join("\n\n") ||
      null,
    source: "website-contact-form",
    attribution: s.attribution ?? null,
  };
}
