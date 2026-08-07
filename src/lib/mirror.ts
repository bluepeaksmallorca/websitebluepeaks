import type { CollectionEntry } from 'astro:content';
import { site } from '../data/site';
import { absoluteUrl } from '../i18n/utils';
import { formatMonthRanges } from './format';

/**
 * Plain-Markdown mirrors of the English pages.
 *
 * Answer engines increasingly fetch a page and then throw away 90% of what
 * they got — navigation, styles, scripts, cookie banners — to recover the
 * text. Publishing that text directly, at a predictable `.md` URL advertised
 * via `<link rel="alternate" type="text/markdown">`, removes the guesswork and
 * removes the chance of the extraction going wrong.
 *
 * The Markdown is generated from exactly the same front matter and body as the
 * HTML page, so the two can never disagree.
 */

const header = (title: string, url: string, description: string) =>
  [
    `# ${title}`,
    '',
    `> ${description}`,
    '',
    `Source: ${url}`,
    `Publisher: ${site.name} — ${site.url}`,
    `Contact: ${site.contact.email} · ${site.contact.phoneDisplay}`,
    '',
    '---',
    '',
  ].join('\n');

export function hikeToMarkdown(entry: CollectionEntry<'hikes'>, slug: string): string {
  const { data, body } = entry;
  const f = data.facts;

  const facts = [
    ['Difficulty', f.difficulty],
    ['Distance', `${f.distanceKm} km`],
    ['Ascent', `${f.ascentM} m`],
    ...(f.descentM ? [['Descent', `${f.descentM} m`]] : []),
    ['Walking time', `${f.durationHoursMin}–${f.durationHoursMax} hours`],
    ...(f.summitM ? [['Highest point', `${f.summitM} m`]] : []),
    ['Start point', f.startPoint],
    ...(f.endPoint ? [['End point', f.endPoint]] : []),
    ['Circular', f.circular ? 'Yes' : 'No'],
    ['Terrain', f.terrain],
    ...(f.bestMonths.length ? [['Best season', formatMonthRanges(f.bestMonths, 'en')]] : []),
    ['Guided price', `€${data.priceFrom ?? site.pricing.privateDayRate} per group per day`],
  ];

  return [
    header(data.title, absoluteUrl(`/hikes/${slug}/`), data.summary),

    '## Route facts',
    '',
    '| | |',
    '| --- | --- |',
    ...facts.map(([k, v]) => `| ${k} | ${v} |`),
    '',

    ...(data.highlights.length
      ? ['## Highlights', '', ...data.highlights.map((h) => `- ${h}`), '']
      : []),

    body?.trim() ?? '',
    '',

    ...(data.faqs.length
      ? [
          '## Frequently asked questions',
          '',
          ...data.faqs.flatMap((faq) => [`### ${faq.q}`, '', faq.a.trim(), '']),
        ]
      : []),

    `_Last updated: ${data.updated.toISOString().slice(0, 10)}_`,
    '',
  ].join('\n');
}

export function articleToMarkdown(
  entry: CollectionEntry<'guide'> | CollectionEntry<'blog'> | CollectionEntry<'pages'>,
  url: string
): string {
  const { data, body } = entry;

  return [
    header(data.title, url, data.summary),

    ...('points' in data && data.points.length
      ? [...data.points.flatMap((p) => [`## ${p.title}`, '', p.body.trim(), ''])]
      : []),

    body?.trim() ?? '',
    '',

    ...(data.faqs.length
      ? [
          '## Frequently asked questions',
          '',
          ...data.faqs.flatMap((faq) => [`### ${faq.q}`, '', faq.a.trim(), '']),
        ]
      : []),

    ...('updated' in data && data.updated
      ? [`_Last updated: ${data.updated.toISOString().slice(0, 10)}_`, '']
      : []),
  ].join('\n');
}

/** Response helper: Markdown served as UTF-8 text, cacheable. */
export function markdownResponse(text: string): Response {
  return new Response(text, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
