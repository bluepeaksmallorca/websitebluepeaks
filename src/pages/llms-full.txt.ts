import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, DEFAULT_LOCALE } from '../data/site';
import { parseId } from '../lib/content';
import { articleToMarkdown } from '../lib/mirror';
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

  const [pages, posts] = await Promise.all([
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

  for (const post of posts.sort((a, b) => b.data.published.getTime() - a.data.published.getTime())) {
    const slug = parseId(post.id).slug;
    parts.push(separator, articleToMarkdown(post, absoluteUrl(`/blog/${slug}/`)));
  }

  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
