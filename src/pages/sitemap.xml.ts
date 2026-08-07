import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '../data/site';
import { absoluteUrl, localePath } from '../i18n/utils';
import { parseId } from '../lib/content';

/**
 * Hand-rolled sitemap, replacing @astrojs/sitemap.
 *
 * The generic integration cannot know which pages are genuinely translated, so
 * it either declares an alternate for every locale (claiming a German page
 * that does not exist) or declares none. Both disagree with what the HTML says,
 * and a sitemap that contradicts the page's own hreflang is worse than no
 * sitemap hints at all.
 *
 * This version knows, because it reads the same content collections the pages
 * do. Two rules:
 *
 *  1. Only canonical URLs are listed. A locale showing fallback English
 *     canonicalises to the English page, so it is not submitted — which keeps
 *     Search Console free of a hundred "submitted URL not selected as
 *     canonical" warnings.
 *  2. `xhtml:link` alternates are emitted only for locales that really serve
 *     that page in that language, exactly matching the <link rel="alternate">
 *     tags in the HTML.
 */

interface Entry {
  routeKey: string;
  /** Locales that genuinely serve this route. */
  locales: Locale[];
  lastmod?: Date;
  priority: number;
}

/** Routes not backed by a content collection. */
const FULLY_TRANSLATED: Array<{ routeKey: string; priority: number }> = [
  { routeKey: '', priority: 1.0 },
  { routeKey: 'blog', priority: 0.7 },
];

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  const entries: Entry[] = [];

  // Only English copy exists for these today, so only English is submitted.
  // Add a locale to `byLocale` in src/data/pages/home.ts and it appears here.
  for (const page of FULLY_TRANSLATED) {
    entries.push({ routeKey: page.routeKey, locales: [DEFAULT_LOCALE], priority: page.priority });
  }

  // Collection-backed routes: one entry per slug, listing only the locales that
  // have a translation file for it.
  const collections = [
    { name: 'pages' as const, prefix: '', priority: 0.9 },
    { name: 'blog' as const, prefix: 'blog/', priority: 0.6 },
  ];

  for (const collection of collections) {
    const all = (await getCollection(collection.name)).filter((entry) => !entry.data.draft);

    const bySlug = new Map<string, { locales: Locale[]; lastmod?: Date }>();

    for (const entry of all) {
      const { locale, slug } = parseId(entry.id);
      const record = bySlug.get(slug) ?? { locales: [] };
      record.locales.push(locale);

      const data = entry.data as { updated?: Date; published?: Date };
      const date = data.updated ?? data.published;
      if (locale === DEFAULT_LOCALE && date) record.lastmod = date;

      bySlug.set(slug, record);
    }

    for (const [slug, record] of bySlug) {
      entries.push({
        routeKey: `${collection.prefix}${slug}`,
        // Preserve the canonical language order rather than filesystem order.
        locales: LOCALES.filter((l) => record.locales.includes(l)),
        lastmod: record.lastmod,
        priority: collection.priority,
      });
    }
  }

  const urls: string[] = [];

  for (const entry of entries) {
    for (const locale of entry.locales) {
      const alternates =
        entry.locales.length > 1
          ? entry.locales
              .map(
                (alt) =>
                  `<xhtml:link rel="alternate" hreflang="${alt}" href="${escape(
                    absoluteUrl(localePath(alt, entry.routeKey))
                  )}"/>`
              )
              .join('') +
            `<xhtml:link rel="alternate" hreflang="x-default" href="${escape(
              absoluteUrl(localePath(DEFAULT_LOCALE, entry.routeKey))
            )}"/>`
          : '';

      urls.push(
        '<url>' +
          `<loc>${escape(absoluteUrl(localePath(locale, entry.routeKey)))}</loc>` +
          (entry.lastmod ? `<lastmod>${entry.lastmod.toISOString().slice(0, 10)}</lastmod>` : '') +
          `<changefreq>monthly</changefreq>` +
          // Non-default languages rank below the English original.
          `<priority>${(locale === DEFAULT_LOCALE
            ? entry.priority
            : entry.priority * 0.8
          ).toFixed(1)}</priority>` +
          alternates +
          '</url>'
      );
    }
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
    urls.join('') +
    '</urlset>';

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
