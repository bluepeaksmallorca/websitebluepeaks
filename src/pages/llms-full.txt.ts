import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, DEFAULT_LOCALE } from '../data/site';
import { parseId, byDifficulty } from '../lib/content';
import { hikeToMarkdown, articleToMarkdown } from '../lib/mirror';
import { absoluteUrl } from '../i18n/utils';

/**
 * /llms-full.txt — every English page, concatenated as Markdown.
 *
 * A single fetch that returns the whole site. Useful when a model is asked
 * something broad ("plan me a week of walking in Mallorca") and would otherwise
 * need a dozen requests to assemble an answer.
 *
 * It reuses the same serialisers as the per-page `.md` mirrors, so there is one
 * implementation and no possibility of the two drifting.
 */
export const GET: APIRoute = async () => {
  const english = <T extends { id: string; data: { draft?: boolean } }>(entries: T[]) =>
    entries.filter((e) => parseId(e.id).locale === DEFAULT_LOCALE && !e.data.draft);

  const [hikes, guidePages, pages, posts] = await Promise.all([
    getCollection('hikes').then(english),
    getCollection('guide').then(english),
    getCollection('pages').then(english),
    getCollection('blog').then(english),
  ]);

  const parts: string[] = [
    `# ${site.name} — complete site text`,
    '',
    `> ${site.description.en}`,
    '',
    `Source: ${site.url}`,
    `Contact: ${site.contact.email} · ${site.contact.phoneDisplay}`,
    `Price: €${site.pricing.privateDayRate} per group per day, up to ${site.pricing.privateMaxGroup} people.`,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    '',
  ];

  const separator = '\n\n' + '='.repeat(72) + '\n\n';

  for (const page of pages) {
    const slug = parseId(page.id).slug;
    parts.push(separator, articleToMarkdown(page, absoluteUrl(`/${slug}/`)));
  }

  for (const hike of hikes.sort(byDifficulty)) {
    parts.push(separator, hikeToMarkdown(hike, parseId(hike.id).slug));
  }

  for (const guide of guidePages.sort((a, b) => a.data.order - b.data.order)) {
    const slug = parseId(guide.id).slug;
    parts.push(separator, articleToMarkdown(guide, absoluteUrl(`/guide/${slug}/`)));
  }

  for (const post of posts.sort((a, b) => b.data.published.getTime() - a.data.published.getTime())) {
    const slug = parseId(post.id).slug;
    parts.push(separator, articleToMarkdown(post, absoluteUrl(`/blog/${slug}/`)));
  }

  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
