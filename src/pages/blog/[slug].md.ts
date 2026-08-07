import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { parseId } from '../../lib/content';
import { articleToMarkdown, markdownResponse } from '../../lib/mirror';
import { DEFAULT_LOCALE } from '../../data/site';
import { absoluteUrl } from '../../i18n/utils';

export const getStaticPaths = (async () => {
  const entries = await getCollection(
    'blog',
    (entry) => parseId(entry.id).locale === DEFAULT_LOCALE && !entry.data.draft
  );

  return entries.map((entry) => ({
    params: { slug: parseId(entry.id).slug },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, params }) =>
  markdownResponse(articleToMarkdown(props.entry, absoluteUrl(`/blog/${params.slug}/`)));
