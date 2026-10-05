# Oria Digital — 30-day SEO plan

Starting 5 October 2026. Written to be done alongside paid work, not instead of
it. Roughly two to four hours a week.

**The baseline everything is measured against** (GSC, 2026-09-08 to 2026-10-04,
the full history of the property):

| Metric | Baseline |
|---|---|
| Clicks | 12 (8 of them branded) |
| Impressions | ~1,027 |
| Average position | ~75 |
| Australia share | 92% of impressions |
| Indexed | 32 of 33 sitemap URLs |
| Non-branded clicks | 4 |

**No targets are set yet.** Twenty-six days of data on a new domain is not
enough to forecast from. Set targets at the 28-day review, when there is
something real to extrapolate.

---

## Week 1 — confirm, decide, measure

- [ ] **Confirm the deploy went out** and run the two verification commands in
      `seo-implementation-log.md`. In particular, check `www` now returns 308.
- [ ] **Check Search Console by hand** for manual actions and security issues.
      The connected tooling cannot see these, so they are the one blind spot in
      the audit. Two minutes.
- [ ] **Decide the WordPress question** — `seo-audit.md` section 5. Consolidate
      onto one page, or differentiate both sharply. This is the highest-value
      item on the list and it is blocked on you, not on me.
- [ ] **Request indexing for `/local-seo-perth`** in the GSC UI. It has never
      been crawled. It now has sitewide links, but a manual request is faster.
- [ ] **Decide how enquiries get counted.** GSC measures search, not leads. The
      Supabase `leads` table already records every submission with first-touch
      attribution — UTMs, landing page, referrer. That is the lead record. GA4
      is still not installed, so there is currently no path from "search
      impression" to "enquiry". Either set `NEXT_PUBLIC_GA4_ID` or accept that
      attribution stops at the form.

**Do not** expect ranking movement this week. Most service pages have not been
recrawled since 14 September.

---

## Week 2 — the chosen WordPress page

Whichever way you decided, Week 2 is executing it.

- [ ] If consolidating: fold the developer content into
      `/wordpress-support-perth`, add the 308, update internal links.
- [ ] If differentiating: rewrite both pages so the distinction is obvious in
      the first screen of each, and cross-link them with plain "you probably
      want the other page if…" wording.
- [ ] Either way, strengthen the surviving page with the things the brief calls
      for and the site does not yet have: the problems you actually get called
      about in customer language, the quote process, realistic response
      expectations **that you are willing to commit to**, and FAQs drawn from
      real enquiries.
- [ ] Add contextual links to it from `/pricing`, `/work` and the two
      WordPress Answers articles.

**Hold back anything you cannot substantiate.** No response-time promises, no
guaranteed repairs, no emergency availability unless you genuinely offer it.
Keep a private list of the testimonials and before/after numbers you would like
to publish once they exist.

---

## Week 3 — proof

Proof is the weakest part of the site and the strongest lever on conversion.

- [ ] **Identify two or three genuine case studies.** Real client work, with
      permission. Be explicit about what was yours versus a wider team's.
      Oria Haven stays labelled as your own project.
- [ ] **Capture one measured before/after.** A PageSpeed score, a load time, a
      form completion rate. One real number beats a page of adjectives, and the
      site currently publishes none.
- [ ] **Assess Google Business Profile eligibility** before creating anything.
      A purely online business with no public premises may not qualify, and
      publishing a home address is your decision, not a default.
- [ ] **Two or three legitimate external mentions.** Suppliers, partners, a
      local business association, a real directory. No paid links, no spam
      directories, no reciprocal schemes.

---

## Week 4 — review and choose the next move

- [ ] **Pull complete GSC data** for 2026-09-08 to roughly 2026-11-01 and
      compare against the baseline above. Use complete days only.
- [ ] **Re-inspect indexing** for the four previously-orphaned pages. The
      question to answer: has `/local-seo-perth` been crawled and indexed?
- [ ] **Check whether the WordPress split resolved.** Re-run the query+page
      breakdown. One page should now hold the WordPress queries.
- [ ] **Set targets**, now that there is a real baseline to extrapolate from.
- [ ] **Pick one thing for the next month.** Most likely either the next
      commercial page or the first real case study — the data will say which.

---

## What to measure, and what not to claim

**Measure**

| Signal | Source | Why |
|---|---|---|
| Index status of the 33 URLs | GSC URL Inspection | Did the link fix work |
| Non-branded Australian impressions and clicks to priority pages | GSC, country filter `aus`, excluding `oria*` queries | The only honest read of commercial progress |
| Position for the WordPress cluster | GSC query+page | Did consolidation concentrate signal |
| Enquiries | Supabase `leads` table | The actual business outcome |

**Do not claim**

- That a phone-link click was a call, or a form start was an enquiry.
- That any ranking change was caused by these fixes. With twelve clicks of
  baseline, almost nothing is statistically distinguishable from noise.
- Any ranking timeline. Review dates below are when to **look**, not when to
  expect results.

**Review dates:** indexing at 7–14 days (12–19 October), performance at 28 days
(2 November) and 56 days (30 November), using complete data only.

---

## The honest framing

Most of what determines the next six months is not in this plan. A 26-day-old
domain with no backlink profile ranks on page eight because it is 26 days old
with no backlink profile. The fixes made today remove self-inflicted drag; they
do not manufacture authority.

The things that actually compound are real client work, real case studies, and
real links from real Perth businesses. The website is now in good enough shape
that it is no longer the constraint.
