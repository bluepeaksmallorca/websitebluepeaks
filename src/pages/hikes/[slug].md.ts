import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { parseId } from '../../lib/content';
import { hikeToMarkdown, markdownResponse } from '../../lib/mirror';
import { DEFAULT_LOCALE } from '../../data/site';

/**
 * `/hikes/<slug>.md` — the English route page as plain Markdown.
 *
 * Mirrors are English only. English is the source language here, so it is the
 * one version guaranteed to be complete and current; pointing a crawler at a
 * stale or fallback translation would be worse than pointing it at nothing.
 */
export const getStaticPaths = (async () => {
  const entries = await getCollection(
    'hikes',
    (entry) => parseId(entry.id).locale === DEFAULT_LOCALE && !entry.data.draft
  );

  return entries.map((entry) => ({
    params: { slug: parseId(entry.id).slug },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, params }) =>
  markdownResponse(hikeToMarkdown(props.entry, params.slug as string));
