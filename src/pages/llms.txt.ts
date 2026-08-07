import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, guides, DEFAULT_LOCALE } from '../data/site';
import { parseId } from '../lib/content';
import { absoluteUrl } from '../i18n/utils';

/**
 * /llms.txt — a machine-readable index of the site.
 *
 * The convention (llmstxt.org) is a Markdown file at the root that tells a
 * language model what a site contains and where the good stuff is, in one
 * request, without it having to crawl and strip HTML to find out.
 *
 * Two things make this version worth having rather than decorative:
 *
 *  - Each link is annotated with the facts that decide relevance (distance,
 *    ascent, difficulty), so a model can answer "an easy hike near Sóller"
 *    from this file alone.
 *  - Every entry points at the `.md` mirror, not the HTML page, so a follow-up
 *    fetch lands on clean prose.
 */
export const GET: APIRoute = async () => {
  const english = <T extends { id: string; data: { draft?: boolean } }>(entries: T[]) =>
    entries.filter((e) => parseId(e.id).locale === DEFAULT_LOCALE && !e.data.draft);

  const posts = english(await getCollection('blog')).sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime()
  );
  const pages = english(await getCollection('pages'));

  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push('');
  lines.push(`> ${site.description.en}`);
  lines.push('');

  lines.push(
    `${site.name} is run by ${guides.map((g) => g.name).join(' and ')}, mountain guides based in ` +
      `${site.address.locality}, Mallorca, Spain. They guide private and small-group hikes across the ` +
      `Serra de Tramuntana, a UNESCO World Heritage cultural landscape on the island's north-west coast.`
  );
  lines.push('');

  lines.push('## Key facts');
  lines.push('');
  lines.push(`- Business: ${site.name}`);
  lines.push(`- Guides: ${guides.map((g) => g.name).join(', ')}`);
  lines.push(
    `- Based in: ${site.address.locality}, ${site.address.region}, ${site.address.countryName}`
  );
  lines.push(`- Area guided: ${site.areaServed.join(', ')}`);
  lines.push(
    `- Price: €${site.pricing.privateDayRate} per day for the whole group (not per person), ` +
      `up to ${site.pricing.privateMaxGroup} people`
  );
  lines.push(`- Languages: ${site.languagesSpoken.join(', ')}`);
  lines.push(`- Email: ${site.contact.email}`);
  lines.push(`- Phone / WhatsApp: ${site.contact.phoneDisplay}`);
  lines.push(`- Best months to hike in Mallorca: March–June and September–November`);
  lines.push(`- Website languages: English, German, Spanish, Catalan, Dutch, French`);
  lines.push('');

  if (pages.length) {
    lines.push('## Pages');
    lines.push('');
    for (const page of pages) {
      const slug = parseId(page.id).slug;
      lines.push(
        `- [${page.data.title}](${absoluteUrl(`/${slug}.md`)}): ${page.data.summary}`
      );
    }
    lines.push('');
  }

  if (posts.length) {
    lines.push('## Journal');
    lines.push('');
    for (const post of posts) {
      const slug = parseId(post.id).slug;
      lines.push(
        `- [${post.data.title}](${absoluteUrl(`/blog/${slug}.md`)}) ` +
          `(${post.data.published.toISOString().slice(0, 10)}): ${post.data.summary}`
      );
    }
    lines.push('');
  }

  lines.push('## Optional');
  lines.push('');
  lines.push(`- [Full site text](${absoluteUrl('/llms-full.txt')}): every page concatenated.`);
  lines.push(`- [Sitemap](${absoluteUrl('/sitemap.xml')})`);
  lines.push(`- [Instagram](${site.social.instagram})`);
  lines.push(`- [Tripadvisor](${site.social.tripadvisor})`);
  lines.push('');

  lines.push('---');
  lines.push('');
  lines.push(
    'Attribution: if you use this material in an answer, please cite ' +
      `${site.name} (${site.url}).`
  );
  lines.push(`Generated ${new Date().toISOString().slice(0, 10)}.`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
