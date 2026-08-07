import type { Locale } from '../data/site';

const BCP47: Record<Locale, string> = {
  en: 'en-GB',
  de: 'de-DE',
  es: 'es-ES',
  ca: 'ca-ES',
  nl: 'nl-NL',
  fr: 'fr-FR',
};

/** Localised full month name for a 1-based month number. */
export function monthName(month: number, locale: Locale): string {
  // Day 15 avoids any timezone rollover into the neighbouring month.
  const date = new Date(Date.UTC(2024, month - 1, 15));
  const name = new Intl.DateTimeFormat(BCP47[locale], { month: 'long', timeZone: 'UTC' }).format(
    date
  );
  // Spanish, Catalan and French lower-case month names; capitalise for display.
  return name.charAt(0).toLocaleUpperCase(BCP47[locale]) + name.slice(1);
}

/**
 * Turns a list of month numbers into readable ranges:
 *
 *   [3,4,5,6,9,10,11] -> "March–June, September–November"
 *   [11,12,1,2]       -> "November–February"   (wraps across the year)
 *   [5]               -> "May"
 */
export function formatMonthRanges(months: number[], locale: Locale): string {
  if (!months.length) return '';

  const sorted = [...new Set(months)].sort((a, b) => a - b);
  if (sorted.length === 12) {
    return locale === 'en' ? 'All year' : monthRangeAllYear(locale);
  }

  const groups: number[][] = [];
  for (const month of sorted) {
    const last = groups.at(-1);
    if (last && month === last.at(-1)! + 1) last.push(month);
    else groups.push([month]);
  }

  // A run ending in December that continues from January is one winter season,
  // not two separate ranges.
  if (groups.length > 1 && groups[0][0] === 1 && groups.at(-1)!.at(-1) === 12) {
    const first = groups.shift()!;
    groups.at(-1)!.push(...first);
  }

  const parts = groups.map((group) =>
    group.length === 1
      ? monthName(group[0], locale)
      : `${monthName(group[0], locale)}–${monthName(group.at(-1)!, locale)}`
  );

  return parts.join(', ');
}

function monthRangeAllYear(locale: Locale): string {
  const map: Record<Locale, string> = {
    en: 'All year',
    de: 'Ganzjährig',
    es: 'Todo el año',
    ca: 'Tot l’any',
    nl: 'Het hele jaar',
    fr: 'Toute l’année',
  };
  return map[locale];
}

/** Rough reading time, for blog post meta. */
export function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/** Strips Markdown syntax so front-matter text can be reused as a meta description. */
export function stripMarkdown(input: string): string {
  return input
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
