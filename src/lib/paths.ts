import { DEFAULT_LOCALE, LOCALES, type Locale } from '../data/site';

/**
 * Static paths for a page that exists once per language.
 *
 * Every route lives under `src/pages/[...locale]/`. English resolves the rest
 * parameter to `undefined`, which Astro renders at the root (`/hikes/`); the
 * other languages render under their prefix (`/de/hikes/`). One file, six
 * outputs, no duplication.
 */
export function localeStaticPaths() {
  return LOCALES.map((locale) => ({
    params: { locale: locale === DEFAULT_LOCALE ? undefined : locale },
    props: { locale } as { locale: Locale },
  }));
}

/**
 * Same, but crossed with a set of content slugs.
 *
 * `slugs` is the list of English slugs — English is the source language, so it
 * defines which pages exist. Translations fill in per locale where present.
 */
export function localeSlugPaths(slugs: string[]) {
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({
      params: { locale: locale === DEFAULT_LOCALE ? undefined : locale, slug },
      props: { locale, slug } as { locale: Locale; slug: string },
    }))
  );
}
