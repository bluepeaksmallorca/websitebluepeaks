import { LOCALES, DEFAULT_LOCALE, SITE_URL, type Locale } from '../data/site';
import { ui, type UIKey } from './ui';

export { LOCALES, DEFAULT_LOCALE, type Locale };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Reads the locale out of a URL pathname. English has no prefix, so anything
 * that does not start with a known locale segment is English.
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return first && isLocale(first) ? first : DEFAULT_LOCALE;
}

/** `t('nav.hikes')` — falls back to English for any key a locale has not translated. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return (ui[locale] as Record<string, string>)[key] ?? ui[DEFAULT_LOCALE][key];
  };
}

/**
 * Builds a path in the given locale. Always returns a leading and trailing
 * slash so it matches `trailingSlash: 'always'`.
 *
 *   localePath('en', 'hikes')  -> '/hikes/'
 *   localePath('de', 'hikes')  -> '/de/hikes/'
 *   localePath('de', '')       -> '/de/'
 */
export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  if (!clean) return `${prefix}/`;
  return `${prefix}/${clean}/`;
}

/** Absolute URL for canonical tags, hreflang, Open Graph and JSON-LD `@id`s. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

/**
 * Strips the locale prefix from a pathname, giving the route key shared by all
 * languages. Used to build the hreflang set and the language switcher.
 *
 *   '/de/hikes/'  -> 'hikes'
 *   '/hikes/'     -> 'hikes'
 *   '/'           -> ''
 */
export function routeKeyFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length && isLocale(segments[0])) segments.shift();
  return segments.join('/');
}

/**
 * The full set of language alternates for a route, plus x-default.
 *
 * Only pass `availableLocales` when a page genuinely does not exist in every
 * language — pointing hreflang at a URL that 404s is worse than omitting it.
 */
export function alternateLinks(
  routeKey: string,
  availableLocales: readonly Locale[] = LOCALES
): Array<{ hreflang: string; href: string }> {
  const links: Array<{ hreflang: string; href: string }> = availableLocales.map((locale) => ({
    hreflang: locale as string,
    href: absoluteUrl(localePath(locale, routeKey)),
  }));

  links.push({
    hreflang: 'x-default',
    href: absoluteUrl(localePath(DEFAULT_LOCALE, routeKey)),
  });

  return links;
}

/** Locale-correct number and date formatting, so "1.234,5 km" is right in German. */
export function formatNumber(value: number, locale: Locale, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(localeToBcp47(locale), options).format(value);
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(localeToBcp47(locale), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatPrice(amount: number, locale: Locale, currency = 'EUR'): string {
  return new Intl.NumberFormat(localeToBcp47(locale), {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function localeToBcp47(locale: Locale): string {
  // Region hints give better defaults than the bare language tag: Spanish and
  // Catalan as spoken in Spain, Dutch as in the Netherlands.
  const map: Record<Locale, string> = {
    en: 'en-GB',
    de: 'de-DE',
    es: 'es-ES',
    ca: 'ca-ES',
    nl: 'nl-NL',
    fr: 'fr-FR',
  };
  return map[locale];
}

/** Picks the right string from a `{ en: '…', de: '…' }` map, falling back to English. */
export function pick<T>(map: Partial<Record<Locale, T>>, locale: Locale): T {
  return (map[locale] ?? map[DEFAULT_LOCALE]) as T;
}
