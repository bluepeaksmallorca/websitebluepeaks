import { site, guides, type Locale } from '../data/site';
import { absoluteUrl, localePath, pick } from '../i18n/utils';

/**
 * Structured data, emitted as a single JSON-LD `@graph` per page.
 *
 * Two things make this work rather than just exist:
 *
 * 1. Stable `@id`s. Every page references the same organisation and website
 *    nodes by URI instead of restating them, so a crawler builds one entity
 *    for Blue Peaks rather than forty disconnected copies.
 * 2. Nothing here is invented. Every value traces back to src/data/site.ts or
 *    to the page's own front matter, which is also what the visitor reads. If
 *    the markup and the visible page ever disagree, the markup is the bug.
 */

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;
const BUSINESS_ID = `${site.url}/#localbusiness`;
const LOGO_ID = `${site.url}/#logo`;

type Json = Record<string, unknown>;

const clean = (obj: Json): Json =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );

const guideIds = guides.map((g) => ({ '@id': `${site.url}/#${g.id}` }));

/* ---------------------------------------------------------------- entities */

/**
 * The logo as its own top-level node rather than nested inside Organization.
 * Both are valid JSON-LD, but a flat graph resolves reliably in consumers that
 * only index top-level `@id`s.
 */
export function logoNode(): Json {
  return {
    '@type': 'ImageObject',
    '@id': LOGO_ID,
    url: absoluteUrl('/logo.svg'),
    contentUrl: absoluteUrl('/logo.svg'),
    width: 420,
    height: 104,
    caption: site.name,
  };
}

export function organizationNode(locale: Locale): Json {
  return clean({
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    description: pick(site.description, locale),
    email: site.contact.email,
    telephone: site.contact.phone,
    foundingDate: site.founded,
    founder: guideIds,
    logo: { '@id': LOGO_ID },
    image: { '@id': LOGO_ID },
    // sameAs is how a crawler confirms this is the same business it has seen
    // on TripAdvisor and GetYourGuide, and merges the reputation signals.
    sameAs: Object.values(site.social).filter(Boolean),
  });
}

/**
 * The business as a physical, bookable thing. `SportsActivityLocation` is the
 * closest schema.org type for a guiding operation working out of a place.
 */
export function localBusinessNode(locale: Locale): Json {
  return clean({
    '@type': ['LocalBusiness', 'SportsActivityLocation', 'TouristInformationCenter'],
    '@id': BUSINESS_ID,
    name: site.name,
    url: site.url,
    description: pick(site.description, locale),
    parentOrganization: { '@id': ORG_ID },
    email: site.contact.email,
    telephone: site.contact.phone,
    priceRange: '€€',
    currenciesAccepted: site.pricing.currency,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
    knowsLanguage: site.languagesSpoken,
    employee: guideIds,
    image: { '@id': LOGO_ID },
    sameAs: Object.values(site.social).filter(Boolean),
    // Only ever emitted when real numbers are set in site.ts.
    aggregateRating: site.aggregateRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: site.aggregateRating.ratingValue,
          reviewCount: site.aggregateRating.reviewCount,
        }
      : undefined,
  });
}

export function guideNodes(locale: Locale): Json[] {
  return guides.map((g) =>
    clean({
      '@type': 'Person',
      '@id': `${site.url}/#${g.id}`,
      name: g.name,
      jobTitle: pick(g.role, locale),
      worksFor: { '@id': ORG_ID },
      knowsAbout: [
        'Hiking',
        'Mountain guiding',
        'Serra de Tramuntana',
        'Mallorca',
        'Wilderness first aid',
      ],
    })
  );
}

export function websiteNode(locale: Locale): Json {
  return clean({
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: pick(site.description, locale),
    publisher: { '@id': ORG_ID },
    inLanguage: locale,
  });
}

/* ------------------------------------------------------------------- pages */

export function webPageNode(opts: {
  url: string;
  title: string;
  description: string;
  locale: Locale;
  updated?: Date;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'FAQPage';
  primaryImage?: string;
}): Json {
  return clean({
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: opts.locale,
    dateModified: opts.updated?.toISOString(),
    primaryImageOfPage: opts.primaryImage ? { '@type': 'ImageObject', url: opts.primaryImage } : undefined,
    breadcrumb: { '@id': `${opts.url}#breadcrumb` },
  });
}

export function breadcrumbNode(url: string, trail: Array<{ name: string; url: string }>): Json {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * FAQ markup. Google restricts the rich result to a few site types, but the
 * markup is still read by answer engines — and a clean question/answer pair is
 * the single most liftable shape on a page.
 */
export function faqNode(url: string, faqs: Array<{ q: string; a: string }>): Json | null {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

/* ------------------------------------------------------------------- hikes */

export interface HikeSchemaInput {
  url: string;
  locale: Locale;
  title: string;
  summary: string;
  image?: string;
  updated: Date;
  priceFrom: number | null;
  guided: boolean;
  facts: {
    difficulty: string;
    distanceKm: number;
    ascentM: number;
    durationHoursMin: number;
    durationHoursMax: number;
    startPoint: string;
    lat?: number;
    lng?: number;
  };
  highlights: string[];
}

/**
 * A guided route is modelled as a `TouristTrip` with an `Offer`. The physical
 * route also gets a `Place`, because "how long is the Barranc de Biniaraix"
 * and "who guides it" are different questions and deserve distinct nodes.
 */
export function hikeNodes(input: HikeSchemaInput): Json[] {
  const { url, facts } = input;
  const tripId = `${url}#trip`;
  const placeId = `${url}#place`;

  const place = clean({
    '@type': ['Place', 'LandmarksOrHistoricalBuildings'],
    '@id': placeId,
    name: facts.startPoint,
    address: {
      '@type': 'PostalAddress',
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo:
      facts.lat && facts.lng
        ? { '@type': 'GeoCoordinates', latitude: facts.lat, longitude: facts.lng }
        : undefined,
  });

  // ISO 8601 duration, e.g. 5.5 hours -> PT5H30M.
  const isoDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `PT${h}H${m ? `${m}M` : ''}`;
  };

  const trip = clean({
    '@type': 'TouristTrip',
    '@id': tripId,
    name: input.title,
    description: input.summary,
    url,
    image: input.image,
    inLanguage: input.locale,
    provider: { '@id': ORG_ID },
    touristType: [`${input.facts.difficulty} hiking`, 'hiking', 'walking holidays'],
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: input.highlights.length,
      itemListElement: input.highlights.map((name, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name,
      })),
    },
    subjectOf: { '@id': `${url}#webpage` },
    arrivalTime: undefined,
    // Both bounds so "about 4–6 hours" survives into the data.
    estimatedDuration: isoDuration(facts.durationHoursMin),
    maximumAttendeeCapacity: site.pricing.privateMaxGroup,
    offers: input.guided
      ? clean({
          '@type': 'Offer',
          url,
          priceCurrency: site.pricing.currency,
          price: input.priceFrom ?? site.pricing.privateDayRate,
          // Private guiding is priced per day for the group, not per person.
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: input.priceFrom ?? site.pricing.privateDayRate,
            priceCurrency: site.pricing.currency,
            unitText: 'per group per day',
          },
          availability: 'https://schema.org/InStock',
          seller: { '@id': ORG_ID },
        })
      : undefined,
    additionalProperty: [
      prop('Distance', `${facts.distanceKm} km`),
      prop('Ascent', `${facts.ascentM} m`),
      prop('Difficulty', facts.difficulty),
      prop('Walking time', `${facts.durationHoursMin}–${facts.durationHoursMax} hours`),
      prop('Start point', facts.startPoint),
    ],
  });

  return [place, trip];
}

function prop(name: string, value: string): Json {
  return { '@type': 'PropertyValue', name, value };
}

/* ---------------------------------------------------------------- articles */

export function articleNode(opts: {
  url: string;
  title: string;
  description: string;
  locale: Locale;
  published: Date;
  updated?: Date;
  image?: string;
  authorName: string;
  tags?: string[];
}): Json {
  const author = guides.find((g) => g.name === opts.authorName);
  return clean({
    '@type': 'Article',
    '@id': `${opts.url}#article`,
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    image: opts.image,
    inLanguage: opts.locale,
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    author: author ? { '@id': `${site.url}/#${author.id}` } : { '@type': 'Person', name: opts.authorName },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': `${opts.url}#webpage` },
    mainEntityOfPage: { '@id': `${opts.url}#webpage` },
    keywords: opts.tags?.join(', '),
  });
}

/* ------------------------------------------------------------------- graph */

/**
 * Wraps page-specific nodes with the shared entity nodes. Call once per page.
 */
export function buildGraph(locale: Locale, nodes: Array<Json | null | undefined>): string {
  const graph = [
    logoNode(),
    organizationNode(locale),
    localBusinessNode(locale),
    ...guideNodes(locale),
    websiteNode(locale),
    ...nodes.filter((n): n is Json => Boolean(n)),
  ];

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

/** Convenience for pages that only need breadcrumbs relative to the home page. */
export function trail(locale: Locale, crumbs: Array<{ name: string; path: string }>) {
  return [
    { name: site.shortName, url: absoluteUrl(localePath(locale)) },
    ...crumbs.map((c) => ({ name: c.name, url: absoluteUrl(localePath(locale, c.path)) })),
  ];
}
