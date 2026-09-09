# Connecting the contact form

Right now the form validates, rate-limits and returns success — and delivers
nowhere. Someone can fill it in, see the thank-you screen, and you will never
know. Fix that before any traffic arrives.

Two independent sinks, deliberately:

- **Supabase** stores the enquiry, so nothing is lost if email fails
- **Resend** emails you, so you find out immediately

The endpoint skips whichever is not configured, and returns an error only if a
sink you *have* configured fails. That means you can set up one, deploy, then
add the other.

---

## Part 1 — Supabase

### 1. Create the project

1. [supabase.com](https://supabase.com) → **New project**
2. Region: **Sydney (ap-southeast-2)**. Your visitors and your host are in
   Australia; a US region adds 200ms to every insert for no reason.
3. Save the database password somewhere. You will not need it for this, but you
   will not be shown it again.

### 2. Create the table

**SQL Editor → New query**, paste this, run it. The column names must match
exactly — they are what `src/app/api/contact/route.ts` inserts.

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

-- Newest first, which is the only way you will ever read this table.
create index leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;
```

**Row Level Security is on with no policies, and that is correct.** The server
inserts using the service-role key, which bypasses RLS. Anonymous clients get
nothing. If you later add a client-side read, you write a policy then — do not
weaken this one to make something work.

### 3. Get the credentials

**Project Settings → API**:

| Field | Goes into |
|---|---|
| Project URL | `SUPABASE_URL` |
| `service_role` key (**not** `anon`) | `SUPABASE_SERVICE_ROLE_KEY` |

The `service_role` key bypasses every security rule in the project. It is read
only by the API route, on the server. **Never** put it in a variable starting
`NEXT_PUBLIC_`, never paste it into client code, and never commit it. If it
leaks, rotate it in the same screen.

---

## Part 2 — Resend

### 1. Add and verify the domain

[resend.com](https://resend.com) → **Domains → Add Domain** → `oriadigital.com.au`.

Resend generates a set of DNS records specific to your domain. Add them in
Hostinger under **Domains → DNS Zone**. You will get roughly:

| Type | Purpose |
|---|---|
| `TXT` on `resend._domainkey` | DKIM — signs your mail so it is not spoofable |
| `TXT` on a `send` subdomain | SPF — authorises Resend to send |
| `MX` on a `send` subdomain | bounce and complaint handling |

> ### Check this before you add the MX record
>
> You receive mail at `info@oriadigital.com.au`, which means the **root domain
> already has MX records** pointing at Hostinger's mail servers. Adding a
> second set of MX records on the root would break incoming email.
>
> Resend's MX record should be scoped to a subdomain — the host field will read
> something like `send`, not `@`. **Confirm that before you save it.** If it
> targets `@` or the bare root, do not add it; use the subdomain approach in the
> next section instead.

Verification usually completes in minutes, but DNS can take up to 48 hours.
Resend shows the status per record.

### 2. If you would rather not touch the root domain

Verify `send.oriadigital.com.au` as the domain instead. All records then sit on
that subdomain and your mailbox is untouched. Your `from` address becomes
something like `hello@send.oriadigital.com.au`.

Replies still reach you: the endpoint sets `replyTo` to the enquirer's address,
and the notification goes to `CONTACT_NOTIFY_EMAIL`, so the `from` address is
plumbing the customer never types.

### 3. Create the API key

**API Keys → Create API Key**, permission **Sending access**, restricted to the
domain you just verified. Copy it now; it is shown once.

### 4. Add DMARC

Once DKIM and SPF verify, add one more TXT record on `_dmarc`:

```
v=DMARC1; p=none; rua=mailto:info@oriadigital.com.au
```

`p=none` monitors without rejecting anything, which is the right starting
point. It costs nothing and materially improves deliverability, because
receivers treat a domain with a DMARC record as better maintained.

---

## Part 3 — Deploy the variables

hPanel → the app's **Redeploy** screen → **Environment Variables**:

| Variable | Value |
|---|---|
| `SUPABASE_URL` | your Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | the `service_role` key |
| `RESEND_API_KEY` | the key from step 2.3 |
| `CONTACT_FROM_EMAIL` | `Oria Digital <info@oriadigital.com.au>` — must be on the verified domain |
| `CONTACT_NOTIFY_EMAIL` | where enquiries land. Omit to use `info@oriadigital.com.au` |

Then **Redeploy**. These are read at request time, not build time, but the
running process needs restarting to see them.

While you are on that screen, add `NEXT_PUBLIC_GA4_ID` too — it *is* build-time,
and analytics is currently not installed.

---

## Part 4 — Prove it works

Do not assume. Submit a real test through the form at
`https://oriadigital.com.au/contact`, using a business name of `TEST — ignore`
so you can find and delete it afterwards.

Three things must all be true:

- [ ] The success screen appears
- [ ] The email arrives, and hitting reply addresses the enquirer, not yourself
- [ ] A row exists in Supabase under **Table Editor → leads**

Then check it fails correctly. Submit with an obviously invalid email and
confirm you get a field error rather than a success screen.

Delete the test row when done.

### If the form returns an error

The endpoint returns `502` when a configured sink fails, and logs the reason to
the server. Open the app's runtime logs in hPanel and look for `[contact]`.
Common causes:

| Log says | Cause |
|---|---|
| `resend: ... domain is not verified` | DNS not propagated yet, or `CONTACT_FROM_EMAIL` is on a different domain than the one you verified |
| `supabase: relation "public.leads" does not exist` | table not created, or created in a schema other than `public` |
| `supabase: Invalid API key` | you used the `anon` key instead of `service_role` |

A `429` is the rate limiter: five submissions per IP per ten minutes. That is
expected while testing.

---

## What this does not do yet

The endpoint stores and notifies. It does not qualify, follow up or book —
that is the automation layer the site sells, and it lives in n8n and the
OpenAI integration, not here.

The natural next step once enquiries are flowing: an n8n workflow triggered by
the Supabase insert, which is exactly the "New Website Enquiry → Create Lead →
AI Qualification → Booking" path in the stack brief. Worth eating your own
cooking before selling it.
