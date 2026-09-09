# Oria Digital — website

Next.js 16 · TypeScript · React 19 · Tailwind CSS 4.

A production build of the approved **v8** design, built as a static-first
marketing site with a server-side contact endpoint. Supabase, Resend, OpenAI,
n8n, Stripe and Twilio are part of the wider Oria OS stack; this repository is
the public website, which touches only Supabase (enquiry storage) and Resend
(notification email).

---

## Running it

```bash
npm install
cp .env.example .env.local   # fill in what you have; the site runs without any of it
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint                 # eslint
npx tsc --noEmit             # typecheck
```

---

## Structure

```
src/
  app/
    layout.tsx            root shell, fonts, sitewide JSON-LD entity graph
    page.tsx              homepage
    services/             index + [slug] (websites, ai-automation, optimisation, website-care)
    work/ about/ pricing/ faq/ contact/ privacy/ terms/
    api/contact/          POST endpoint: validate → Supabase → Resend
    og/                   generated Open Graph card (title from query string)
    sitemap.ts robots.ts manifest.ts llms.txt/
  components/
    layout/               header, footer, breadcrumbs, sticky mobile CTA
    sections/             homepage and shared page sections
    ui/                   button, section heads, FAQ, image slot, reveal observer
                          OriaMark.tsx — the logo: mark, lockup, gradient defs
    seo/                  JSON-LD renderer
  lib/
    site.ts               ← every business fact lives here
    nav.ts                route table (drives nav, footer and sitemap)
    seo.ts                metadata builder
    schema.ts             structured-data builders
    content/              services, pricing, faqs, homepage content
```

## The mark

"The Aperture O", from the Round 01 identity study: a continuous ring with a
single opening, plus one radial inlet feeding into it. Geometry is defined once
in `src/components/ui/OriaMark.tsx` (64×64 grid, r=22, stroke 6,
`stroke-dasharray="118.2 20"`), and reused by the header, the footer, the
favicon (`icon.svg`), the app icon (`apple-icon.tsx`) and the social card
(`og/route.tsx`).

The gradient is painted once per document by `<OriaGradientDefs />` in the root
layout, so every instance references the same paint. It uses the site's own
accent stops rather than the slightly different ones in the study, so the mark
matches the buttons and gradient text elsewhere on the page.

Wordmark is set, not drawn: Archivo uppercase at +0.2em tracking, ORIA at
Semibold 600 and DIGITAL at Regular 400 in a 72% tone. Symbol is roughly
2.1 × the wordmark's font size; the gap between them is 0.36 × symbol width.
Below 24px the strokes thicken to hold optical weight.

**One rule worth keeping:** business facts live in `src/lib/site.ts` and
content lives in `src/lib/content/`. Pages read from those. Changing a price or
an address should be a one-line change that propagates to the copy, the
metadata and the structured data at once.

---

## How the SEO is built

**Technical**

- Static prerendering for every page; only `/api/contact` and `/og` are dynamic.
- Self-referencing absolute canonical on every page, from `pageMetadata()`.
- `sitemap.xml` generated from the route table, so a new page cannot be missed.
- `robots.txt` allows the major AI crawlers by name and disallows `/api/`.
- Security headers and long-lived image caching in `next.config.ts`.
- Fonts self-hosted via `next/font` — no render-blocking third-party request,
  no layout shift.
- No client JavaScript on the FAQ (native `<details>`), the nav drawer and the
  AI demo are the only interactive components.

**Structured data** — one connected `@graph` per page, keyed by `@id`, so the
business resolves as a single entity rather than a repeated string:

| Node | Where |
|---|---|
| `Organization` + `ProfessionalService` | every page (root layout) |
| `WebSite`, `Person` (founder) | every page |
| `WebPage`, `BreadcrumbList` | every page |
| `Service` + `OfferCatalog` | homepage, `/services`, each service page |
| `Product` + `AggregateOffer` | homepage, `/pricing` |
| `FAQPage` | homepage, `/faq`, `/pricing`, `/about`, service pages |
| `HowTo` | homepage (the four-stage process) |
| `CreativeWork` | `/work` (Oria Haven) |
| `ContactPage` + free-audit `Offer` | `/contact` |

**GEO / AEO** — the parts that decide whether an AI answer cites you:

- Every key page opens with an `AnswerBlock`: one self-contained 40–60 word
  passage that reads correctly out of context and states the claim plainly.
- Question-shaped headings, and FAQ answers written to be quotable whole.
- Prices, timeframes and inclusions stated as specific numbers, not "contact
  us" — an answer engine can only cite what is actually on the page.
- FAQ answers are in the server-rendered HTML whether or not the accordion is
  open, because most AI crawlers do not execute JavaScript.
- `/llms.txt` mirrors the site content in plain text, including a
  "notes for summarisation" section that states there are no client results to
  attribute. Treat this as a cheap extra: Google has said it ignores llms.txt.

---

## Before launch

**Facts to replace** — all in `src/lib/site.ts`, each marked `PLACEHOLDER`:

- [ ] Confirm the domain (`NEXT_PUBLIC_SITE_URL`) — everything canonical depends on it
- [ ] Founder's LinkedIn URL (name is set: Dale Sutton)
- [ ] Business phone number (E.164) — ABN is set
- [ ] Social profile URLs (`sameAs` — these are a real entity signal)
- [ ] Legal/trading name if it differs from "Oria Digital"
- [ ] Booking link, if using Cal.com or Calendly instead of the form

**Assets** — both in place:

- `public/work/oria-haven.jpg` — device mockup, used on `/` and `/work`
- `public/team/dale-sutton.jpg` — founder portrait, used on `/` and `/about`

Source files are converted with sharp before they go in `public/`, so the
optimiser starts from a reasonable input:

```bash
node -e "require('sharp')('SOURCE').resize(1600).jpeg({quality:86,mozjpeg:true}).toFile('public/…')"
```

**Services**

- [ ] Supabase: create the `leads` table and set `SUPABASE_URL` /
      `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Resend: verify the sending domain, set `RESEND_API_KEY` and
      `CONTACT_FROM_EMAIL`
- [ ] GA4 property → `NEXT_PUBLIC_GA4_ID`
- [ ] Search Console: verify, then submit `/sitemap.xml`
- [ ] Bing Webmaster Tools: verify and submit the same sitemap (Bing's index
      feeds Microsoft Copilot)
- [ ] Google Business Profile: create/claim, and make the NAP match `site.ts`
      exactly — this is most of local ranking

**Legal**

- [ ] Have `/privacy` and `/terms` reviewed. They are honest working drafts
      describing what the site actually does, not lawyer-reviewed documents.

**Suggested `leads` table**

```sql
create table public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  business    text not null,
  email       text not null,
  website     text,
  concern     text not null,
  message     text,
  source      text not null default 'website-contact-form'
);

alter table public.leads enable row level security;
-- No policies: inserts come from the server with the service-role key, which
-- bypasses RLS. Anonymous clients get nothing.
```

---

## Deployment

Built for a Node host — Hostinger's Node hosting, per the stack brief. Requires
Node 20+.

```bash
npm ci
npm run build
npm start        # or: node_modules/.bin/next start -p $PORT
```

Set every variable from `.env.example` in the host's environment. The
`SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` must never appear in a
`NEXT_PUBLIC_` variable or in client code.
