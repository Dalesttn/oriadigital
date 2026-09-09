# Deploying to Hostinger

This is a **Node.js application**, not a folder of static files. It needs a
running Node process for three things: the contact endpoint, the generated
social cards, and on-the-fly image optimisation. Uploading the folder to
`public_html` over FTP will not work.

---

## Which Hostinger plan you need

Hostinger's Node.js Web Apps hosting is on **Business Web Hosting** and the
**Cloud** plans (Startup, Professional, Enterprise). VPS and dedicated servers
also run it, but you configure the stack yourself.

**Single and Premium shared plans do not run Node.** If that is what the
account has, see *If you only have shared hosting* at the bottom.

---

## Path A — GitHub deploy (recommended)

Hostinger builds from the repository and rebuilds on every push, which means
deploys are a `git push` rather than a manual upload.

### 1. Put the code on GitHub

From `D:\OriaDigital\web`:

```bash
git init
git add .
git commit -m "Oria Digital website"
git branch -M main
git remote add origin https://github.com/<you>/oria-digital-web.git
git push -u origin main
```

Make the repository **private**. Nothing secret is committed — `.gitignore`
excludes every `.env` file except the template — but there is no reason for the
source to be public.

> The Next.js app is in the `web/` subfolder of `D:\OriaDigital`. Either push
> `web/` as its own repository (simplest, and what the commands above assume),
> or push the whole folder and tell Hostinger the root directory is `web`.

### 2. Create the app in hPanel

1. **Websites → Add Website → Deploy Web App**
2. Choose **Import Git Repository** and authorise GitHub
3. Pick the repository and the `main` branch
4. Hostinger auto-detects Next.js. Confirm:
   - Build command `npm run build` (this runs `next build --webpack` — see
     *Why the build uses Webpack* below)
   - Start command `npm start`
   - Output directory `.next`
   - Node version **22.x** — not 20. The Supabase client requires
     Node >= 22, and Node 20 produces a wall of `EBADENGINE` warnings and
     risks a runtime failure in the contact endpoint. `.nvmrc` and
     `engines` both declare 22, but set it explicitly in hPanel as well.

### 3. Set the environment variables

In the app's **Environment Variables** panel, add everything from
`.env.example`. At minimum, for the first deploy:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://oriadigital.com.au` — no trailing slash |

**Node version:** set it to **22.x** before the first build.

`NEXT_PUBLIC_SITE_URL` is baked in at **build** time, so set it *before* the
first build. Every canonical URL, the sitemap and all structured data derive
from it; if it is wrong or missing, the live site will tell Google its canonical
address is something else.

Add these when the accounts exist, then redeploy:

| Variable | Notes |
|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | enquiry storage. Service-role key is server-only |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | notification email. Sender must be a verified domain |
| `CONTACT_NOTIFY_EMAIL` | where enquiries land, if not `info@oriadigital.com.au` |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement ID |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Search Console HTML-tag token |

Until Supabase and Resend are set, the form validates and accepts submissions
but delivers nowhere. Do not go live on advertising before both are connected.

### 4. Attach the domain

Point the domain at the app in hPanel and let Hostinger issue the SSL
certificate. Then pick **one** canonical host — `https://oriadigital.com.au` or
`https://www.oriadigital.com.au` — and 301-redirect the other to it. Serving
both is a duplicate-content problem and splits any ranking signal in half.

Whichever you choose must match `NEXT_PUBLIC_SITE_URL` exactly.

---

## Path B — Zip upload

Works, but every update is a manual re-upload, so use it only as a stopgap.

**Websites → Add Website → Deploy Web App → Upload files**, then upload a zip of
the `web/` folder **excluding `node_modules` and `.next`**. Hostinger installs
dependencies and builds on the server. Environment variables and domain setup
are identical to Path A.

---

## Path C — Hostinger VPS

Full control, and what you would move to under real traffic.

```bash
git clone <repo> /var/www/oria && cd /var/www/oria
npm ci
npm run build
npm i -g pm2
pm2 start "npm start" --name oria --env production
pm2 save && pm2 startup
```

Then put nginx in front, proxying `:3000`, and issue a certificate with certbot.
`next start` honours the `PORT` environment variable if you need a different one.

---

## After the first deploy — verify, don't assume

```bash
curl -sI https://oriadigital.com.au | head -20
curl -s https://oriadigital.com.au/robots.txt
curl -s https://oriadigital.com.au/sitemap.xml | head
curl -s https://oriadigital.com.au/llms.txt | head
```

Check by eye:

- [ ] Canonical tag on the homepage shows the live domain, not `localhost`
- [ ] `/og?title=Test` returns an image
- [ ] Submit the contact form and confirm the enquiry actually arrives
- [ ] Paste the homepage into Google's Rich Results Test — Organization, FAQ and
      Product should all validate
- [ ] Submit `sitemap.xml` in Search Console **and** Bing Webmaster Tools
      (Bing's index is what feeds Microsoft Copilot)

---

## If you only have shared hosting

Three options, worst to best:

1. **Upgrade to Business.** Cheapest fix, keeps everything working as built.
2. **Static export.** Add `output: "export"` to `next.config.ts` and the site
   becomes plain files you can FTP to `public_html`. You lose the contact
   endpoint (move the form to Formspree or similar), the generated social cards
   (pre-render them as files), and image optimisation. Real work, and a
   permanent downgrade.
3. **Host elsewhere, keep the domain at Hostinger.** Deploy to a Node host and
   point the DNS. Contradicts the stack brief's "start on Hostinger", but it is
   the least effort of the three and costs nothing at this traffic level.

---

## Why the build uses Webpack

Hostinger's build container runs **glibc 2.28**. Next's native SWC binary
needs `GLIBC_2.29`, so on that host it fails to load:

```
Attempted to load @next/swc-linux-x64-gnu, but an error occurred:
/lib64/libm.so.6: version `GLIBC_2.29' not found
```

Next falls back to `@next/swc-wasm-nodejs`, which works but has two knock-on
effects, both of which broke the first deploys:

1. **A TypeScript `next.config.ts` cannot be compiled** under the WASM
   fallback. It emits a `next.config.compiled.js` importing a hashed temp
   module that never gets written, and the build dies with
   `ERR_MODULE_NOT_FOUND` before reading a single page. Fixed by using a
   plain-JS `next.config.mjs`; the JSDoc annotation keeps editor types.

2. **Turbopack cannot run at all.** It is native Rust from the same `@next/swc`
   package. `npm run build` therefore passes `--webpack`.

Neither is a Node version problem. Node 20 and Node 22 both require glibc
2.28, so switching Node version does not change the glibc available and will
not fix this.

The build will be noticeably slower on the server than locally, because
transforms run through WASM rather than the native binary. For a site this
size that is a non-issue.

**If you later move to a host with glibc 2.29 or newer** (any current VPS
image, or Vercel), switch the build command to `npm run build:turbopack` for a
significantly faster build. Nothing else changes.
