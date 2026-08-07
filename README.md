# bluepeaksmallorca.com

The Blue Peaks Mallorca website. Static site built with [Astro](https://astro.build),
hosted free on Cloudflare Pages.

Six languages, no database, no cookies, no third-party requests.

---

## Before you go live

These need doing. Nothing else blocks launch.

| What | Where | Why |
| --- | --- | --- |
| **Check every business fact** | `src/data/site.ts` | Address, phone, price, group size, languages and founding year all feed the visible pages *and* the structured data. Values marked `TODO` were inferred from public listings, not confirmed. |
| **Fill in the legal notice** | `src/content/pages/en/legal.md` | Spanish law (LSSI-CE art. 10) requires a business site to publish its legal name, NIF/CIF and registered address. The file has `TODO` markers where those go. |
| **Add the WordPress redirect map** | `public/_redirects` | Every URL that currently ranks needs a 301, or the move costs you the search equity the old site built. See that file for how to get the list. |
| **Add real photographs** | see [Images](#images) | The site currently draws generated ridgelines wherever a photo is missing. They look deliberate, but they are not photographs of Mallorca. |
| **Check the route numbers** | `src/content/hikes/en/*.md` | Distances, ascent and walking times were written from knowledge of these routes, not from your GPS tracks. Correct them against your own data before publishing — the whole point of these pages is that the numbers are trustworthy. |
| **Point the booking links at Bokun** | `src/data/site.ts` → `booking` | Currently `null`, which routes everyone through the WhatsApp/email enquiry flow. |

---

## Running it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
npm run preview    # serve dist/ locally
```

Node 20 or newer.

---

## Deploying to Cloudflare Pages

One-time setup, then every push to `main` deploys automatically.

1. Push this repository to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**, and pick this repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** set an environment variable `NODE_VERSION` = `22`
4. Deploy. You get a `*.pages.dev` URL immediately.
5. **Custom domain:** Pages project → **Custom domains** → add
   `bluepeaksmallorca.com` and `www.bluepeaksmallorca.com`.

### Moving the domain off SiteGround

Do this *after* step 4, once you have checked the `*.pages.dev` site.

1. Add `bluepeaksmallorca.com` as a **site** in Cloudflare (not just a custom
   domain) so Cloudflare runs the DNS.
2. Cloudflare shows you two nameservers. Set those at your **domain
   registrar** — whoever you actually bought the domain from, which may or may
   not be SiteGround.
3. Wait for propagation, then attach the custom domain to the Pages project.
4. **Keep the SiteGround hosting running for a few days** after the switch,
   until you have confirmed the new site is serving and your email still works.

> **Email:** if your `@bluepeaksmallorca.com` email is hosted by SiteGround,
> moving DNS to Cloudflare will break it unless you recreate the **MX records**
> (and any SPF/DKIM/DMARC `TXT` records) in Cloudflare DNS first. Copy them out
> of SiteGround's DNS panel before you change the nameservers. This is the one
> step in the migration that can genuinely cost you something.

Cloudflare Pages' free tier covers this site comfortably: unlimited bandwidth,
500 builds a month.

---

## How the site is put together

```
src/
├─ content/            the actual writing — Markdown, one folder per language
│  ├─ hikes/en/        route guides (distance, ascent, FAQs, prose)
│  ├─ guide/en/        practical reference pages (season, packing, difficulty)
│  ├─ blog/en/         journal posts
│  └─ pages/en/        about, private-hikes, custom-hikes, legal
├─ data/
│  ├─ site.ts          ⭐ every business fact, in one place
│  └─ pages/           home + index page copy, translated into all six languages
├─ i18n/               UI strings and locale helpers
├─ components/         Astro components
├─ layouts/Base.astro  page shell
├─ lib/                schema.org, Markdown mirrors, formatting
└─ pages/              routing
```

### Editing content

Everything a visitor reads is either in `src/content/` (Markdown) or
`src/data/pages/` (page copy). You do not need to touch anything else.

**To add a hiking route**, copy an existing file in `src/content/hikes/en/`,
change the front matter and the prose, and push. It appears on the index page,
in `llms.txt`, in the sitemap, and gets its own `.md` mirror automatically.

**To add a blog post**, drop a Markdown file in `src/content/blog/en/`.

Set `draft: true` in the front matter to keep something out of the build while
you work on it.

### Languages

English is the source. The site ships in **English, German, Spanish, Catalan,
Dutch and French**.

- **Fully translated:** all navigation and buttons, the home page, the three
  index pages, and the contact page.
- **English with a visible notice:** the route guides, practical guides, blog
  posts and the about/service pages.

Untranslated pages still exist at their localised URL — `/de/about/` works —
but they show the English text with a short line explaining why, canonicalise
to the English page, and are left out of hreflang and the sitemap until a real
translation exists. That avoids six URLs of duplicate content.

**To translate a page**, copy the English Markdown file into the matching
locale folder, keeping the filename identical:

```
src/content/hikes/en/castell-dalaro.md
src/content/hikes/de/castell-dalaro.md   ← add this, set locale: de
```

The notice disappears, hreflang picks it up, and it enters the sitemap. No code
change.

---

## Images

There are no photographs in this repository yet. Anywhere one is missing, the
site draws a deterministic ridgeline from the page's slug — always the same
picture for the same page, so it looks intentional rather than random.

To add a real photo:

1. Put it in `src/assets/hikes/` (create the folder).
2. Reference it in the page's front matter:

   ```yaml
   heroImage: ../../../assets/hikes/biniaraix.jpg
   heroAlt: Dry-stone steps climbing through the Barranc de Biniaraix
   ```

Astro resizes, converts and fingerprints it at build time. Use large originals
(2400px wide or more) — they get scaled down, never up.

Always write `heroAlt`. It is read aloud by screen readers and it is one of the
few remaining places where you describe an image in words a machine can use.

---

## Being found by AI assistants

This was an explicit goal, so here is what is actually in place and why.

**Structured data.** Every page emits one JSON-LD `@graph` with stable `@id`s,
so crawlers build a single entity for the business instead of one per page. The
business, both guides, the website, each route (`TouristTrip` + `Offer` +
`Place`), articles, breadcrumbs and FAQs are all described. Generated in
`src/lib/schema.ts`, always from the same values the page displays.

**Answer-first writing.** Every substantial page opens with a self-contained
factual summary — who, what, where, how much — before any sales copy. Assistants
lift the first complete statement they find; this makes that statement a good
one.

**Hard numbers in text.** Distance, ascent, walking time, difficulty and price
appear as readable text, not only in markup. A model can only answer "how much
does a guided hike in Mallorca cost" if the number is written down.

**FAQ blocks** as flat headings and paragraphs rather than accordions, because
an open question/answer pair is the most reliably extractable shape there is.

**Markdown mirrors.** Every English page is also served as clean Markdown at
`/hikes/castell-dalaro.md` and friends, advertised from the HTML via
`<link rel="alternate" type="text/markdown">`. Crawlers that follow it get the
prose with no navigation or layout noise.

**`/llms.txt`** — an annotated index of the whole site, with each route's
difficulty, distance and ascent inline, so a model can shortlist without
fetching anything else. **`/llms-full.txt`** is the entire site as one file.

**`robots.txt`** explicitly allows every major assistant crawler — both the
training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot) and the retrieval
ones that fetch live to answer a question being asked right now (OAI-SearchBot,
ChatGPT-User, Claude-User, PerplexityBot). Allowing one but not the other is a
common and costly mistake.

**No fabricated review markup.** `aggregateRating` in `src/data/site.ts` is
deliberately `null`. Invented rating markup is a manual-action risk with Google
and is trivially caught by any assistant that cross-checks Tripadvisor. Fill it
in only with real numbers.

### What this does not do

Structured data and clean text make you *findable and quotable*. They do not
manufacture authority. What actually moves the needle for a business this size
is being mentioned somewhere else: Tripadvisor reviews, a mention in a Mallorca
walking guide, an outdoor blog, the GR221 forums. The site is now built to be
cited — the citations still have to be earned.

---

## Privacy and performance

No analytics, no cookies, no embedded widgets, no external fonts. The fonts are
served from this domain (`scripts/fetch-fonts.mjs` downloads them; re-run it
only if you change the typefaces). That means a page load makes **zero
third-party requests**, which is both fast and the simplest possible GDPR
position for an EU business.

If you later want visitor numbers, Cloudflare Web Analytics is free, needs no
cookie banner, and is one line in `src/components/BaseHead.astro`.

---

## Scripts

```bash
node scripts/fetch-fonts.mjs   # re-download and self-host the webfonts
node scripts/make-assets.mjs   # regenerate favicon, OG card, logo, manifest
node scripts/screenshot.mjs    # screenshot the built site at phone + desktop
```
