import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '../data/site';

export type LocalisedCollection = 'hikes' | 'guide' | 'blog' | 'pages';

/** Entry ids look like `en/castell-dalaro`. */
export function parseId(id: string): { locale: Locale; slug: string } {
  const [locale, ...rest] = id.split('/');
  return { locale: locale as Locale, slug: rest.join('/') };
}

const isPublished = (entry: { data: { draft?: boolean } }) =>
  import.meta.env.DEV || !entry.data.draft;

/**
 * Every entry of a collection, in the requested locale, falling back to the
 * English original where a translation does not exist yet.
 *
 * Six languages is a lot of copy to keep in sync. Rather than hide an
 * untranslated page or ship a machine translation, the site shows the English
 * text and says so — honest for the reader, and it avoids emitting hreflang
 * for URLs whose content is not actually in that language.
 */
export async function getLocalisedEntries<C extends LocalisedCollection>(
  collection: C,
  locale: Locale
): Promise<Array<CollectionEntry<C> & { isFallback: boolean }>> {
  const all = (await getCollection(collection)).filter(isPublished);

  const inLocale = new Map<string, CollectionEntry<C>>();
  const inDefault = new Map<string, CollectionEntry<C>>();

  for (const entry of all as CollectionEntry<C>[]) {
    const { locale: entryLocale, slug } = parseId(entry.id);
    if (entryLocale === locale) inLocale.set(slug, entry);
    if (entryLocale === DEFAULT_LOCALE) inDefault.set(slug, entry);
  }

  // The English set defines which pages exist at all.
  return [...inDefault.keys()].map((slug) => {
    const translated = inLocale.get(slug);
    return translated
      ? Object.assign({}, translated, { isFallback: false })
      : Object.assign({}, inDefault.get(slug)!, { isFallback: true });
  });
}

/** A single entry, with the same English fallback behaviour. */
export async function getLocalisedEntry<C extends LocalisedCollection>(
  collection: C,
  locale: Locale,
  slug: string
): Promise<(CollectionEntry<C> & { isFallback: boolean }) | undefined> {
  const entries = await getLocalisedEntries(collection, locale);
  return entries.find((entry) => parseId(entry.id).slug === slug);
}

/**
 * Which locales genuinely have this page. Used to emit hreflang only for URLs
 * that will actually serve content in that language.
 *
 * Pages always exist in English (that is the source), so English is included
 * whenever the slug exists at all.
 */
export async function getTranslatedLocales<C extends LocalisedCollection>(
  collection: C,
  slug: string
): Promise<Locale[]> {
  const all = (await getCollection(collection)).filter(isPublished);
  const found = new Set<Locale>();

  for (const entry of all) {
    const parsed = parseId(entry.id);
    if (parsed.slug === slug) found.add(parsed.locale);
  }

  return LOCALES.filter((l) => found.has(l));
}

/**
 * Builds the `getStaticPaths` list for a localised collection: every slug in
 * every locale, so /de/hikes/castell-dalaro/ exists even when only the English
 * text is written.
 */
export async function localisedPaths<C extends LocalisedCollection>(collection: C) {
  const slugs = new Set(
    (await getCollection(collection))
      .filter(isPublished)
      .map((entry) => parseId(entry.id))
      .filter((parsed) => parsed.locale === DEFAULT_LOCALE)
      .map((parsed) => parsed.slug)
  );

  return LOCALES.flatMap((locale) =>
    [...slugs].map((slug) => ({
      params: { locale: locale === DEFAULT_LOCALE ? undefined : locale, slug },
      props: { locale, slug },
    }))
  );
}

const DIFFICULTY_RANK = { easy: 0, moderate: 1, challenging: 2, demanding: 3 } as const;

export type Difficulty = keyof typeof DIFFICULTY_RANK;

/**
 * Orders routes genuinely easiest-first.
 *
 * Sorting on ascent alone gets this badly wrong: the Torrent de Pareis climbs
 * only 60 m and is the hardest route on the island — it is a 900 m *descent*
 * through a canyon. The stated difficulty has to lead, with ascent breaking
 * ties inside a grade.
 */
export function byDifficulty(
  a: { data: { facts: { difficulty: Difficulty; ascentM: number } } },
  b: { data: { facts: { difficulty: Difficulty; ascentM: number } } }
) {
  const diff = DIFFICULTY_RANK[a.data.facts.difficulty] - DIFFICULTY_RANK[b.data.facts.difficulty];
  return diff !== 0 ? diff : a.data.facts.ascentM - b.data.facts.ascentM;
}

/** Sorts by the collection's own `order`, then alphabetically for stability. */
export function byOrder(
  a: { data: { order?: number; title: string } },
  b: { data: { order?: number; title: string } }
) {
  const diff = (a.data.order ?? 100) - (b.data.order ?? 100);
  return diff !== 0 ? diff : a.data.title.localeCompare(b.data.title);
}

export function byDateDesc(
  a: { data: { published: Date } },
  b: { data: { published: Date } }
) {
  return b.data.published.getTime() - a.data.published.getTime();
}
