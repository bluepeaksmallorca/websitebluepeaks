import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { parseId } from '../lib/content';
import { articleToMarkdown, markdownResponse } from '../lib/mirror';
import { DEFAULT_LOCALE } from '../data/site';
import { absoluteUrl } from '../i18n/utils';

/** `/about.md`, `/private-hikes.md`, `/custom-hikes.md`, `/legal.md`. */
export const getStaticPaths = (async () => {
  const entries = await getCollection(
    'pages',
    (entry) => parseId(entry.id).locale === DEFAULT_LOCALE && !entry.data.draft
  );

  return entries.map((entry) => ({
    params: { slug: parseId(entry.id).slug },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, params }) =>
  markdownResponse(articleToMarkdown(props.entry, absoluteUrl(`/${params.slug}/`)));
