# SEO implementation log — 5 October 2026

Changes made in response to `seo-audit.md`. All are reversible; rollback is at
the bottom.

---

## 1. Internal links: four commercial pages were near-orphaned

**Problem.** A crawl of all 33 sitemap URLs on 2026-10-05 found the five
footer-listed service pages had 33 internal inbound links each, while four
others had one to three. `/local-seo-perth` had exactly one, and GSC reported
it "Discovered – currently not indexed, never crawled". On a domain with no
external authority, internal links are most of the signal a page has.

**Change.** Added a `supporting` flag to the route table and a second
"More" column in the site footer carrying all four.

| File | Change |
|---|---|
| `src/lib/nav.ts` | Added `supporting?: boolean`; flagged the four pages; exported `supportingRoutes` and `allServiceRoutes` |
| `src/components/layout/SiteFooter.tsx` | New "More" nav column rendering `supportingRoutes` |

**Effect.** Each of `/wordpress-developer-perth`,
`/website-speed-optimisation-perth`, `/small-business-web-design-perth` and
`/local-seo-perth` now has an inbound link from every page on the site,
up from 1–3.

**Verified.** Homepage HTML contains a link to all four. All four still return
200. The header Services dropdown is deliberately unchanged at five items.

---

## 2. Sitemap `lastmod` was reporting build time

**Problem.** `sitemap.ts` emitted `new Date()` for every route, so all 33 URLs
carried a single timestamp that changed on every deploy — 2026-10-04T14:21 at
the time of audit. That tells Google the whole site changed whenever one file
did. An unreliable `lastmod` is one Google learns to discount, and a new domain
has no crawl budget to waste re-fetching unchanged pages.

**Change.**

| File | Change |
|---|---|
| `src/lib/nav.ts` | Added a required `modified: string` (YYYY-MM-DD) per route, hand-maintained |
| `src/app/sitemap.ts` | Uses `route.modified` instead of `new Date()` |

All routes are currently dated `2026-09-14`, the redesign. Answers articles
already used their own `modified` dates and are unchanged.

**Deliberate decision:** I did **not** bump any date for today's changes.
Adding footer links is not a meaningful content change, and bumping all 33
would repeat exactly the dishonesty being fixed. Update `modified` by hand when
you change a page's content.

**Verified.** Sitemap now returns a single stable `2026-09-14T00:00:00.000Z`
across all 33 routes rather than a build timestamp.

---

## 3. `www` served HTTP 200 instead of redirecting

**Problem.** `https://www.oriadigital.com.au/` returned 200 on 2026-10-05.
Both hostnames served the full site, with only the canonical tag indicating
which was authoritative. A canonical is a hint; a redirect is not. GSC also
showed `http://oriadigital.com.au/` indexed separately with 5 impressions.

**Change.** `next.config.mjs` — a permanent host-based redirect from
`www.oriadigital.com.au` to the apex, preserving the path.

**Caveat worth knowing.** This handles it at the application layer. If
Hostinger terminates `www` before the app sees it, the redirect may not fire.
**Verify after deploy** — the check is in the verification section below. A
host-level redirect in hPanel remains the more robust fix and is still worth
configuring.

---

## 4. `/pricing` Product schema warned on missing reviews

**Problem.** URL Inspection reported two rich-result warnings on `/pricing`:
Product snippets missing `review` and missing `aggregateRating`. Oria Digital
has no published reviews, and inventing them is not an option.

**Change.** `src/lib/schema.ts` — `pricingSchema()` now emits `OfferCatalog`
instead of `Product`. An offer catalogue is what the page actually is, and it
requests nothing that does not exist. Also removed `plansSchema()`, dead code
that was the last remaining `Product` type.

**Verified.** `/pricing` emits `OfferCatalog` with 8 offers. No `Product` type
remains anywhere in the codebase. Prices and commercial terms are unchanged.

---

## 5. Consolidated the two WordPress pages (decision taken 5 October)

**Problem.** GSC query+page data for 2026-09-08 to 2026-10-04 showed Google
splitting eleven WordPress queries between `/wordpress-support-perth` and
`/wordpress-developer-perth`. On the largest, `wordpress developer perth`, the
support page was served 82 times at position 83.5 and the developer page 41
times at position 85.8. Neither page accumulated signal; both sat on page 8–10.

**Decision.** Dale chose consolidation over differentiation.

**Change.** `/wordpress-support-perth` survives and now carries both intents.
`/wordpress-developer-perth` 308s to it.

| File | Change |
|---|---|
| `src/lib/content/services.ts` | Merged entry: 12 problems and 12 inclusions spanning break/fix and custom development; 5 pricing rows including a `quoted` development line; 4-step process covering both a fix and a build; 9 keywords; 6 related links. Developer entry removed |
| `src/app/wordpress-developer-perth/` | Route deleted |
| `next.config.mjs` | Permanent redirect to the survivor |
| `src/lib/nav.ts` | Route removed; redirect recorded in `legacyRedirects`; survivor's `modified` bumped to 2026-10-05 — real content change, so the date moves |
| `src/lib/content/work.ts` | Case study's "WordPress Development" link repointed |

**Positioning of the merged page.**

| | Before | After |
|---|---|---|
| Title | WordPress Support Perth \| Help From a Perth WordPress Developer (77 chars) | WordPress Developer & Support Perth (54 chars) |
| H1 | WordPress help and support in Perth. | WordPress help, support and development in Perth. |
| Name | WordPress Support | WordPress Support & Development |

The shorter title also resolves the truncation issue flagged in the audit for
this page. The highest-volume query is `wordpress developer perth`, so
"Developer" now leads the title; "Support" is retained because the page's two
best positions were on support and help terms.

**Verified.** `/wordpress-developer-perth` → 308 → `/wordpress-support-perth`.
Merged page: one H1, canonical correct, Service + FAQPage + HowTo + BreadcrumbList
schema intact, both intents present in the copy. Sitemap down to 32 URLs with no
developer entry. Zero remaining internal links to the old URL anywhere on the site.

**What to watch.** The test is whether each WordPress query now maps to one
page at the 28-day review, and whether position on `wordpress developer perth`
improves on 83.5. These URLs were last crawled on 14 September, so expect days
to weeks, not days.

**Reversible.** `git revert` restores the page, the route and the content. The
redirect would need removing from `next.config.mjs` in the same revert.

---

## Not changed, deliberately

| Item | Why |
|---|---|
| Page titles (81–87 chars) | Truncation is real but irrelevant at position 80. Revisit at page 1–2. `/wordpress-support-perth` is now 54 as a side effect of the merge |
| Google Business Profile | Eligibility must be assessed first, and publishing an address needs your agreement |
| Commercial terms and prices | Reconfirmed unchanged: $149, $299, $3,500, $1,500, $249/month, all + GST |
| Legacy `/services/*` and `http://` indexed URLs | Redirects already in place; resolve on recrawl |

---

## Verification performed

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass, no warnings |
| `npm run build` | Pass, 43 routes generated |
| Sitemap `lastmod` | Stable content date, not build time |
| Footer links to all four supporting pages | Present on homepage |
| `/pricing` schema | `OfferCatalog`, 8 offers, no `Product` |
| Routes `/`, `/pricing`, `/local-seo-perth`, `/wordpress-support-perth` | 200 |

**Forms were not submitted.** No test enquiries were sent to real recipients in
this pass.

---

## Verify after deploy

```bash
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://www.oriadigital.com.au/
```

Expect `308 -> https://oriadigital.com.au/`. If it returns 200, Hostinger is
terminating `www` ahead of the app and the redirect needs configuring in hPanel
instead.

```bash
curl -s https://oriadigital.com.au/sitemap.xml | grep -c "2026-09-14"
```

Expect 33.

Then confirm in the GSC UI, which the connected tooling cannot reach: no manual
actions, and no security issues.

---

## Rollback

Every change is in one commit. To revert all of it:

```bash
git revert <commit-sha>
```

To revert one piece, the changes are isolated by file: internal links in
`SiteFooter.tsx` and `nav.ts`, sitemap dates in `sitemap.ts` and `nav.ts`, the
`www` redirect in `next.config.mjs`, and the schema change in `schema.ts`.

---

## Deployment state

Committed and pushed to `main`. Hostinger rebuilds automatically on push.
Confirm the deploy completed, then run the verification commands above.
