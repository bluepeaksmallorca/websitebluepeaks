import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { LOCALES } from './data/site';

/**
 * Content is organised as `<collection>/<locale>/<slug>.md`, e.g.
 *
 *   src/content/hikes/en/castell-dalaro.md
 *   src/content/hikes/de/castell-dalaro.md
 *
 * The slug is shared across languages, which is what lets the page build a
 * correct hreflang set and language switcher. A translation that does not
 * exist yet simply falls back to English — see src/lib/content.ts.
 */

const localeEnum = z.enum(LOCALES as unknown as [string, ...string[]]);

/** Facts every route page states in a table AND in schema.org markup. */
const routeFacts = z.object({
  difficulty: z.enum(['easy', 'moderate', 'challenging', 'demanding']),
  /** One-way or loop total, in kilometres. */
  distanceKm: z.number().positive(),
  /** Cumulative ascent in metres. */
  ascentM: z.number().nonnegative(),
  descentM: z.number().nonnegative().optional(),
  /** Moving time on foot, excluding stops. */
  durationHoursMin: z.number().positive(),
  durationHoursMax: z.number().positive(),
  /** Highest point reached, in metres. Omit for coastal walks. */
  summitM: z.number().optional(),
  startPoint: z.string(),
  endPoint: z.string().optional(),
  circular: z.boolean().default(false),
  terrain: z.string(),
  /** Month numbers, 1–12, when the route is at its best. */
  bestMonths: z.array(z.number().int().min(1).max(12)).default([]),
  /** Trailhead coordinates, for schema.org geo and map links. */
  lat: z.number().optional(),
  lng: z.number().optional(),
});

const faqSchema = z
  .array(
    z.object({
      q: z.string(),
      /** Kept short and factual — this is what gets lifted into an answer box. */
      a: z.string(),
    })
  )
  .default([]);

const seo = z.object({
  /** ~155 chars. Written as a standalone factual sentence, not a teaser. */
  description: z.string().max(200),
  /** Optional override for <title>; defaults to the page title. */
  metaTitle: z.string().optional(),
  /** Extra names this page should be findable under. Not rendered as meta keywords. */
  aliases: z.array(z.string()).default([]),
});

const hikes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/hikes' }),
  schema: ({ image }) =>
    seo.extend({
      title: z.string(),
      locale: localeEnum,
      /**
       * The single-sentence answer to "what is this hike?". Placed immediately
       * under the H1 and reused as the schema description, so an assistant
       * that reads only the top of the page still gets a complete answer.
       */
      summary: z.string(),
      heroImage: image().optional(),
      heroAlt: z.string().default(''),
      facts: routeFacts,
      highlights: z.array(z.string()).default([]),
      /** Shown on the card and in the offer markup. Null = enquire for a price. */
      priceFrom: z.number().nullable().default(null),
      /** Whether Blue Peaks guides this route as a bookable day. */
      guided: z.boolean().default(true),
      faqs: faqSchema,
      /** Slugs of related hikes, for internal linking. */
      related: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      updated: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
});

/**
 * Practical, non-commercial reference pages: when to go, what to pack, how the
 * grading works, how to get around. These carry no sales intent, which is
 * exactly why they are the pages most likely to be cited.
 */
const guide = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/guide' }),
  schema: ({ image }) =>
    seo.extend({
      title: z.string(),
      locale: localeEnum,
      summary: z.string(),
      heroImage: image().optional(),
      heroAlt: z.string().default(''),
      faqs: faqSchema,
      related: z.array(z.string()).default([]),
      order: z.number().default(100),
      updated: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    seo.extend({
      title: z.string(),
      locale: localeEnum,
      summary: z.string(),
      heroImage: image().optional(),
      heroAlt: z.string().default(''),
      /** Must match a `guides[].name` in src/data/site.ts. */
      author: z.string().default('Helena'),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      faqs: faqSchema,
      related: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

/**
 * Standalone pages whose body is prose: the two service pages, about, and the
 * legal notice.
 *
 * These live in the content layer rather than in .astro files so that they use
 * the same per-locale fallback as everything else — a German translation can be
 * added as one Markdown file, with no code change and no risk of the six
 * language versions drifting apart in structure.
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: ({ image }) =>
    seo.extend({
      title: z.string(),
      locale: localeEnum,
      summary: z.string(),
      /** Shown in the hero above the title. */
      eyebrow: z.string().optional(),
      /** Hero headline, when it should differ from the <title>. */
      heading: z.string().optional(),
      lede: z.string().optional(),
      heroImage: image().optional(),
      heroAlt: z.string().default(''),
      /** Optional bullet list rendered as cards above the prose. */
      points: z
        .array(z.object({ title: z.string(), body: z.string() }))
        .default([]),
      faqs: faqSchema,
      /** Suppresses the standard closing enquiry block (used by the legal page). */
      hideCta: z.boolean().default(false),
      noindex: z.boolean().default(false),
      updated: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { hikes, guide, blog, pages };
