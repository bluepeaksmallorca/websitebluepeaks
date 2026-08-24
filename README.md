# bluepeaksmallorca.com

The Blue Peaks Mallorca website. Static site built with [Astro](https://astro.build),
hosted free on Cloudflare Pages.

Six languages, no database, no cookies, and no third-party requests until
someone taps the map.

Brand colours and fonts follow the existing WordPress site: the palette was
sampled pixel-by-pixel from screenshots of the live pages, so this is the same
brand rather than an interpretation of it.

---

## Before you go live

These need doing. Nothing else blocks launch.

| What | Where | Why |
| --- | --- | --- |
| **Confirm the two typefaces** | `scripts/fetch-fonts.mjs`, `src/styles/tokens.css` | Built with **Poppins** (UI) and **Cormorant Garamond** (blog), read off the letterforms in your screenshots. If Elementor says otherwise, change the two families in the fetch script, re-run `npm run fonts`, and update `--font-sans` / `--font-serif`. Nothing else needs touching. |
| **Supply the hero video** | `public/video/` | Add `hero.mp4` (and ideally `hero.webm`) plus a real `hero-poster.jpg`, then set `video="/video/hero"` on the `<VideoHero>` in `src/pages/[...locale]/index.astro`. Until then the poster placeholder shows. |
| **Send the original logo vector** | `src/components/Logo.astro` | The mark is currently hand-traced from a screenshot. It is close, but it is not your artwork. |
| **Write the real FAQ answers** | `src/data/pages/home.ts` | Questions are verbatim from your site; the answers are drafts. **Cancellations** and **travel insurance** are marked `TODO` and must be replaced — those state policy, and policy is not something to infer. |
| **Fill in the Bokun IDs** | `src/data/site.ts` → `booking` | `/private-hikes/`, `/custom-hikes/` and `/hikes/` show a WhatsApp enquiry card until the booking channel UUID and product ids are set. See the note there and the commented CSP block in `public/_headers`. |
| **Check the business facts** | `src/data/site.ts` | Address, price, max group size and founding year feed both the visible copy and the structured data. Values marked `TODO` were inferred from public listings. |
| **Complete the legal notice** | `src/content/pages/en/legal.md` | Spanish law (LSSI-CE art. 10) requires legal name, NIF/CIF and registered address. |
| **Add the WordPress redirect map** | `public/_redirects` | Every URL that currently ranks needs a 301. See that file for how to get the list. |
| **Add photographs** | see [Images](#images) | The four homepage images and the CTA banner are generated stand-ins. |

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

## Deploying to Cloudflare

Cloudflare now routes new static sites through **Workers** rather than Pages.
Both work; the repo is set up for Workers because that is what the dashboard
offers by default.

`wrangler.jsonc` in the repo root is what makes this work — it points Cloudflare
at `dist/`, serves `404.html` for unmatched paths, and resolves `/blog/` to
`/blog/index.html`. `.nvmrc` pins Node to 22 so you never have to set a build
environment variable by hand.

### Workers (the default flow)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Compute (Workers & Pages)**
   → **Create** → **Import a repository**.
2. Pick **`bluepeaksmallorca/websitebluepeaks`** — check the name, it is easy to
   land on the wrong repo.
3. Settings:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
4. **Deploy.** You get a `*.workers.dev` URL in a minute or two.

### Pages (still supported)

1. **Compute (Workers & Pages)** → **Create** → **Pages** tab → **Connect to Git**.
2. Same repository.
3. Settings: framework preset **Astro**, build command `npm run build`, output
   directory `dist`, production branch `main`.

Either way, every push to `main` rebuilds automatically, and pushes to other
branches get their own preview URL.

Free tier covers this comfortably: unlimited bandwidth and requests, and far
more builds a month than you will use.

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
│  ├─ pages/en/        private-hikes, custom-hikes, hikes, legal
│  ├─ blog/en/         journal posts
│  ├─ hikes/en/        route guides — all draft: true, not built
│  └─ guide/en/        practical guides — all draft: true, not built
├─ data/
│  ├─ site.ts          ⭐ every business fact, in one place
│  └─ pages/home.ts    ⭐ homepage copy and the FAQ answers
├─ styles/tokens.css   ⭐ the sampled brand palette
├─ i18n/               UI strings and locale helpers
├─ components/         Astro components
├─ layouts/Base.astro  page shell
├─ lib/                schema.org, Markdown mirrors, formatting
└─ pages/              routing
```

### Editing content

Everything a visitor reads is either in `src/content/` (Markdown) or
`src/data/pages/` (page copy). You do not need to touch anything else.

**To change homepage text or an FAQ answer**, edit `src/data/pages/home.ts`.

**To add a blog post**, drop a Markdown file in `src/content/blog/en/`. It
appears on the homepage and the blog index, in `llms.txt`, in the sitemap, and
gets its own `.md` mirror automatically.

Set `draft: true` in the front matter to keep something out of the build while
you work on it.

### Pages

The site mirrors what is live today, nothing more:

| Route | What it is |
| --- | --- |
| `/` | The long homepage: video hero, strapline, photo collage, welcome, languages, services, mantra, WhatsApp banner, blog teasers, FAQs, partners |
| `/private-hikes/` `/custom-hikes/` `/hikes/` | The three service pages, each ready for its Bokun widget |
| `/blog/` and `/blog/<post>/` | Journal index and posts |
| `/legal/` | Legal notice and privacy |

The seven route guides and four practical guides written in the first pass are
still in `src/content/hikes/` and `src/content/guide/` with `draft: true`. They
do not build and appear nowhere. Set `draft: false` — and restore a page
template for them — if you ever want them.

### Languages

English is the source. The chrome (navigation, buttons, footer) is translated
into all six languages; the homepage copy and the page content are English
only for now.

Untranslated pages still exist at their localised URL — `/de/private-hikes/`
works — but show the English text with a short notice, canonicalise to the
English page, and stay out of hreflang and the sitemap until a real
translation exists. That avoids six URLs of duplicate content.

**To translate a page**, copy the English Markdown into the matching locale
folder with the same filename:

```
src/content/pages/en/private-hikes.md
src/content/pages/de/private-hikes.md   ← add this, set locale: de
```

For the homepage, fill in a locale in `byLocale` in `src/data/pages/home.ts`.
The notice disappears, hreflang picks it up, and it enters the sitemap. No
code change.

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

No analytics, no cookies, no external fonts. The fonts are served from this
domain (`scripts/fetch-fonts.mjs` downloads them; re-run with `npm run fonts`
if you change the typefaces). A page load makes **zero third-party requests** —
which is fast, and the simplest possible GDPR position for an EU business.

Two things would change that, both deliberate:

- **The footer map** is click-to-load. A Google Maps iframe sets cookies on
  every page view; nothing loads until someone taps it.
- **Bokun**, once configured, is third-party JavaScript and does set cookies.
  When you turn it on, update the privacy section of the legal page to say so.

If you later want visitor numbers, Cloudflare Web Analytics is free, needs no
cookie banner, and is one line in `src/components/BaseHead.astro`.

---

## Scripts

```bash
node scripts/fetch-fonts.mjs   # re-download and self-host the webfonts
node scripts/make-assets.mjs   # regenerate favicon, OG card, logo, manifest
node scripts/screenshot.mjs    # screenshot the built site at phone + desktop
```
