# Oria Digital — SEO audit and diagnosis

**Prepared for** Dale Sutton
**Date** 5 October 2026
**Property** `sc-domain:oriadigital.com.au` (domain property, permission `siteOwner`)
**GSC reporting period** 2026-09-08 to 2026-10-04 — the complete history of the property
**Extracted** 2026-10-05
**Search type** Web. No country filter unless stated.

---

## 1. Verdict

**The problem is not crawling or indexing. It is time, authority and two
self-inflicted structural issues.**

The site is 26 days old in search terms. Its first impression was recorded on
9 September 2026. Thirty-two of thirty-three sitemap URLs are indexed, the
sitemap is valid with zero errors, and Google is already serving the site about
40 to 50 times a day. Nothing is blocked.

What is missing is rank. Average position sits around 75, which is page seven
or eight. A four-week-old domain with no backlinks ranking on page eight for
competitive Perth commercial terms is the expected outcome, not a fault.

Two things are making it worse than it needs to be, and both are fixable:

1. **Two WordPress pages are splitting every WordPress query between them.**
2. **Four commercial pages had almost no internal links**, and one of them had
   never been crawled at all.

Both are now fixed in code. See `seo-implementation-log.md`.

**Does anything justify migrating to WordPress? No.** See section 6.

---

## 2. GSC baseline

Totals for the full available period, 2026-09-08 to 2026-10-04:

| Metric | Value |
|---|---|
| Clicks | 12 |
| Impressions | ~1,027 |
| CTR | ~1.2% |
| Average position | ~75 |
| Australia | 941 impressions (92%), 11 clicks |
| Desktop / Mobile / Tablet (AU) | 694 / 243 / 4 impressions |

**A 28-day versus previous-28-day comparison is not possible.** The property
holds no data before 2026-09-08, so the prior period is zero. Reporting that as
a percentage increase would be meaningless. The absolute change is "from nothing
to roughly 1,000 impressions".

Impressions began on 9 September, climbed to a single-day peak of 134 on
16 September, and have settled at roughly 40 to 50 a day. Eleven of the twelve
clicks landed between 10 and 24 September; there have been no clicks since
24 September.

**Branded versus non-branded.** Grouping any query containing `oria` as branded:
branded took 8 of 12 clicks from 53 impressions. `oria digital` sits at
position 5 with 80% CTR. Every non-branded commercial term sits between
position 44 and 100. In other words, the site ranks for its own name and
almost nothing else — which is exactly what a new domain looks like.

**Caveats.** Query rows are subject to GSC anonymisation, so query totals do
not reconcile exactly with property totals. 2026-10-05 is incomplete and is
excluded. Average position is an aggregate across all impressions, not a fixed
rank in Perth; a Perth searcher may see something different.

---

## 3. Indexing

Inspected via the URL Inspection API on 2026-10-05. This reads Google's stored
index data. **It is not a live crawl**, and the connector cannot run live tests.

| URL | Verdict | Coverage | Last crawled |
|---|---|---|---|
| `/` | PASS | Submitted and indexed | 2026-09-24 |
| `/wordpress-support-perth` | PASS | Submitted and indexed | 2026-09-14 |
| `/web-design-perth` | PASS | Submitted and indexed | 2026-09-14 |
| `/website-optimisation-perth` | PASS | Submitted and indexed | 2026-09-14 |
| `/ai-automation-perth` | PASS | Submitted and indexed | 2026-09-14 |
| `/website-maintenance-perth` | PASS | Submitted and indexed | 2026-09-14 |
| `/wordpress-developer-perth` | PASS | Submitted and indexed | 2026-09-14 |
| `/website-speed-optimisation-perth` | PASS | Submitted and indexed | 2026-09-14 |
| `/small-business-web-design-perth` | PASS | Submitted and indexed | 2026-09-14 |
| **`/local-seo-perth`** | **NEUTRAL** | **Discovered – currently not indexed** | **Never** |
| `/work/oria-haven` | PASS | Submitted and indexed | 2026-09-14 |
| `/answers/how-much-does-a-website-cost-in-perth` | PASS | Submitted and indexed | 2026-09-14 |
| `/answers/why-is-my-wordpress-website-so-slow` | PASS | Submitted and indexed | 2026-09-15 |
| `/answers/how-much-does-wordpress-support-cost` | PASS | Submitted and indexed | 2026-09-14 |
| `/free-website-audit`, `/pricing`, `/answers`, `/work` | PASS | Submitted and indexed | 2026-09-09 to 09-14 |
| `/contact?need=wordpress` | NEUTRAL | Alternate page with proper canonical | 2026-09-14 |

Two things to take from this table.

**`/local-seo-perth` has never been crawled.** Google knows the URL from the
sitemap and has chosen not to fetch it. At the time of inspection it had exactly
one internal link anywhere on the site. That is the cause, and it is now fixed.

**Most pages have not been recrawled since 14 September.** Any change made
today will not be reflected in Google's index for days or weeks. This is normal
for a new, low-authority domain, and it is the main reason not to expect fast
movement from these fixes.

`/contact?need=wordpress` being treated as an alternate with a proper canonical
confirms the canonical implementation is working correctly.

**Sitemap:** `https://oriadigital.com.au/sitemap.xml`, last downloaded
2026-10-04 15:28, status Valid, 33 URLs, 0 errors, 0 warnings.

### What could not be checked

The connected GSC tooling exposes search analytics, URL inspection and
sitemaps. It does **not** expose the Pages (index coverage) report, manual
actions, security issues, live URL tests or indexing requests. **I cannot
confirm those are clean — I can only confirm I did not check them.** Please
open Search Console and confirm there are no manual actions and no security
issues. That takes a minute and rules out the one class of problem this audit
cannot see.

---

## 4. Evidence table

| Finding | Affected URLs | Evidence and date | Confidence | Business effect | Recommended action |
|---|---|---|---|---|---|
| Site is 26 days old; no data before 2026-09-08 | All | GSC date dimension, 2026-10-05 | Observed | Explains most of the low visibility by itself | Time. Keep publishing and earning links |
| Indexing is healthy — 32 of 33 URLs indexed | All | URL Inspection + sitemap status, 2026-10-05 | Observed | No action needed; rules out the common suspects | None |
| Two pages split every WordPress query | `/wordpress-support-perth`, `/wordpress-developer-perth` | GSC query+page, 2026-09-08→10-04: `wordpress developer perth` served by support page 82× (pos 83.5) and developer page 41× (pos 85.8); same split on 10 other WP queries | Observed | Neither page accumulates signal; both stuck page 8–10 | **Consolidate. Needs Dale's decision — section 5** |
| Four commercial pages near-orphaned | `/local-seo-perth` (1 inbound), `/wordpress-developer-perth`, `/website-speed-optimisation-perth`, `/small-business-web-design-perth` (3 each) vs 33 for footer pages | Full internal-link crawl of all 33 sitemap URLs, 2026-10-05 | Observed | `/local-seo-perth` never crawled; others starved of internal signal | **Fixed** — all four added to the sitewide footer |
| `www` served HTTP 200 instead of redirecting | All | Direct request, 2026-10-05: `https://www.oriadigital.com.au/` → 200 | Observed | Two hostnames served the same site; relied on canonical hints alone | **Fixed** — 308 `www` → apex |
| Sitemap `lastmod` was build time for all 33 URLs | All | Sitemap showed one timestamp of 2026-10-04T14:21 across every route | Observed | Told Google everything changed on every deploy; an unreliable lastmod gets discounted | **Fixed** — hand-maintained content dates |
| `/pricing` Product schema missing `review` and `aggregateRating` | `/pricing` | URL Inspection rich-results warnings, 2026-10-05 | Observed | No rich result possible; cannot be fixed honestly without real reviews | **Fixed** — changed to `OfferCatalog`, which requests nothing that doesn't exist |
| Legacy `/services/*` URLs still indexed | `/services/ai-automation` and 3 others | GSC page report: 17/4/2/1 impressions; last crawled 2026-09-09, before the redirect shipped | Observed | Transient; 308s are in place | None. Resolves on recrawl |
| `http://oriadigital.com.au/` indexed separately | Homepage | GSC page report: 5 impressions, pos 23 | Observed | Minor duplicate; 301 already in place | None. Resolves on recrawl |
| Titles run 81–87 characters | 6 pages | Live crawl, 2026-10-05 | Observed | Truncation in results — but irrelevant at position 80 | Deferred. Revisit when pages reach page 1–2 |
| Repair/fix intent is thinner than hypothesised | `/wordpress-support-perth` | `hacked website repair perth` 1 impression, `website repairs perth` 1, `web repair` 1 | Observed, small sample | The "WordPress SOS" angle has less search demand than the developer/support angle | Lead with support/developer language, keep repair as a section |
| No manual actions / security issues | — | **Not checked — tooling cannot access** | Missing evidence | Unknown | Dale to confirm in GSC UI |
| Backlink profile | — | **Not checked — no backlink tool connected** | Missing evidence | Almost certainly near zero, but unverified | Treat as hypothesis |

### Hypotheses, clearly labelled as such

- The domain has few or no external links. This is consistent with everything
  above but was **not measured**; no backlink data source was connected.
- The 16 September impression spike (134) is most likely Google's initial
  evaluation crawl of a new site, followed by settling. **Not verified.**
- Clicks stopping after 24 September is more likely small-sample noise than a
  change in performance. Twelve clicks is too few to read a trend from.

---

## 5. The decision I need from you: the two WordPress pages

This is the single highest-value finding, and it is a commercial decision as
much as a technical one, so I have not acted on it.

**The evidence.** For eleven separate WordPress queries, Google alternates
between `/wordpress-support-perth` and `/wordpress-developer-perth`:

| Query | Support page | Developer page |
|---|---|---|
| wordpress developer perth | 82 impressions, pos 83.5 | 41 impressions, pos 85.8 |
| wordpress developers perth | 37, pos 85.9 | 17, pos 83.3 |
| wordpress experts perth | 31, pos 95.6 | 17, pos 87.2 |
| wordpress help perth | 37, pos 44.6 | 8, pos 89.9 |
| wordpress development perth | 26, pos 87.9 | 6, pos 99.2 |
| wordpress support perth | 21, pos 54.2 | 5, pos 92.0 |

This is not "two pages target similar keywords". It is Google visibly unable to
decide which page answers the query, on a domain with no authority to spare.
The support page wins on the two highest-intent terms (`wordpress help perth`
at 44.6 and `wordpress support perth` at 54.2 are the best non-brand positions
on the site).

**My recommendation: consolidate onto `/wordpress-support-perth`.** Fold the
developer content into it as a section, and 308 `/wordpress-developer-perth`
into it. One page would then carry roughly 560 impressions of WordPress demand
instead of two pages carrying 367 and 193.

**Why I have not done it.** It removes a page that presents WordPress
development as a distinct service. If you sell custom WordPress development as
its own offering — different buyer, different price, different conversation —
then keeping the page and sharply differentiating the two is the better answer.
That is your call, not mine.

**The alternative, if you want to keep both:** make them unmistakably
different. Support becomes fixes, retainers and small jobs with the $149 entry
offer. Developer becomes custom builds, plugins, ACF, WooCommerce and
integrations with project pricing. Remove the overlapping language, and link
each to the other with clear "you probably want the other page if…" wording.

Either is defensible. Doing neither is the only bad option.

---

## 6. WordPress migration verdict

| Option | When it makes sense | Cost / effort | Recommendation |
|---|---|---|---|
| **Keep Next.js** | Rendering and indexability are sound; updates manageable | Targeted fixes and content work | **This one.** |
| Add a content editing workflow | Publishing is the bottleneck | Smaller operational change | Only if writing becomes the constraint |
| Migrate to WordPress | A demonstrated maintenance or publishing limitation | Full rebuild, content migration, URL preservation, revalidation | **No. Nothing in the evidence supports it.** |

**Keep Next.js.** The evidence is unambiguous. Every page is server-rendered
with full content in the initial HTML, Google indexed 32 of 33 URLs within days
of launch, the sitemap is valid with zero errors, canonicals are correct, and
structured data parses. There is no rendering problem, no indexing problem and
no crawlability problem for a CMS to solve.

Migrating would mean rebuilding a working site, risking the URLs Google has
already indexed, and inheriting the maintenance burden you currently sell other
people a service to manage. It would not move a single ranking.

The honest caveat: if publishing new content becomes painful enough that you
stop doing it, that is a real operational problem worth solving — but the answer
is a content workflow, not a platform migration. On current evidence, publishing
is not the bottleneck. Twelve Answers articles went up in a day.

---

## 7. What actually determines the outcome from here

Ranked by what will move the needle, most to least:

1. **Time and links.** A 26-day-old domain with no backlink profile ranks on
   page eight. That is the dominant factor and no on-page work substitutes for
   it. Genuine links from real Perth businesses, suppliers, partners and
   directories matter more than anything in this document.
2. **Resolving the WordPress split** (section 5).
3. **Internal link equity** (fixed today).
4. **Proof.** Two or three real client case studies would do more for both
   conversion and credibility than another ten articles.
5. **Google Business Profile**, if eligible. Assess this before creating one —
   a purely online business with no public address may not qualify, and
   publishing a home address needs your agreement. Not actioned.
6. Title lengths, schema polish and similar. Real, but marginal at position 80.

---

## 8. Limitations of this audit

- GSC holds 26 days of data. Every trend statement here is low-confidence by
  necessity.
- No manual action, security issue, or index-coverage report check was possible
  with the connected tooling.
- No backlink data source was connected; link-profile statements are hypotheses.
- No competitor SERP sampling was performed in this pass.
- Rankings were read from GSC aggregates, not from live Perth searches.
- Lead and enquiry data was not available. GSC measures search, not business
  outcomes.
