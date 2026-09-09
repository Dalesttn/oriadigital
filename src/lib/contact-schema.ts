import { z } from "zod";

/**
 * Contact form contract.
 *
 * Shared by the client form and the API route so validation cannot drift
 * between them — and so the server never trusts the client's validation.
 */

export const concerns = [
  { value: "website", label: "My website" },
  { value: "new", label: "A new website" },
  { value: "ai", label: "AI & automation" },
  { value: "seo", label: "SEO & performance" },
  { value: "care", label: "Ongoing support" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  business: z.string().trim().min(1, "Please enter your business name").max(160),
  email: z.email("Please enter a valid email address").max(200),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  concern: z.enum(concerns.map((c) => c.value) as [string, ...string[]]),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  /** Honeypot — must stay empty. Bots fill every field they can see. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const concernLabel = (value: string) =>
  concerns.find((c) => c.value === value)?.label ?? value;
