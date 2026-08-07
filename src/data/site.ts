import {
  SITE_URL,
  LOCALES as LOCALES_RAW,
  DEFAULT_LOCALE as DEFAULT_LOCALE_RAW,
} from './site-constants.mjs';

export { SITE_URL };

/**
 * The languages the site ships in.
 *
 * Declared as a literal union here rather than inferred from the constants
 * file: that file is plain ESM (astro.config.mjs cannot import TypeScript), so
 * its arrays widen to `string[]` and every keyed lookup — `ui[locale]`,
 * `site.tagline[locale]` — loses its type. The `satisfies` below makes the two
 * lists impossible to drift apart: adding a locale to the .mjs file without
 * adding it here is a compile error.
 */
export type Locale = 'en' | 'de' | 'es' | 'ca' | 'nl' | 'fr';

export const LOCALES = LOCALES_RAW as readonly Locale[] satisfies readonly Locale[];
export const DEFAULT_LOCALE = DEFAULT_LOCALE_RAW as Locale;

/**
 * Single source of truth for every hard fact about the business.
 *
 * Everything here is rendered into visible page copy AND into the JSON-LD
 * structured data. That consistency is the point: search engines and LLMs
 * treat a fact stated identically in prose, in markup, and across the web as
 * far more reliable than one that only appears in a meta tag.
 *
 * >>> CHECK EVERY VALUE IN THIS FILE BEFORE GOING LIVE. <<<
 * Values marked TODO were inferred from public listings, not confirmed.
 */
export const site = {
  /** Legal / display name. Used verbatim everywhere, including schema.org. */
  name: 'Blue Peaks Mallorca',
  shortName: 'Blue Peaks',
  url: SITE_URL,

  tagline: {
    en: 'Tailored hiking days with mindful experiences',
    de: 'Geführte Wanderungen in der Serra de Tramuntana',
    es: 'Senderismo guiado en la Serra de Tramuntana',
    ca: 'Excursions guiades a la Serra de Tramuntana',
    nl: 'Begeleide wandeltochten in de Serra de Tramuntana',
    fr: 'Randonnées guidées dans la Serra de Tramuntana',
  },

  /** One-sentence definition of the business. Written to be quotable verbatim. */
  description: {
    en: 'Blue Peaks Mallorca is a small guided-hiking company run by Helena and Matija, offering private and small-group walks in the Serra de Tramuntana and across Mallorca, Spain.',
    de: 'Blue Peaks Mallorca ist ein kleines Wanderführer-Unternehmen von Helena und Matija mit privaten Wanderungen und Kleingruppen-Touren in der Serra de Tramuntana und auf ganz Mallorca.',
    es: 'Blue Peaks Mallorca es una pequeña empresa de senderismo guiado dirigida por Helena y Matija, con rutas privadas y en grupos reducidos por la Serra de Tramuntana y toda Mallorca.',
    ca: 'Blue Peaks Mallorca és una petita empresa d’excursions guiades dirigida per Helena i Matija, amb rutes privades i en grups reduïts per la Serra de Tramuntana i tot Mallorca.',
    nl: 'Blue Peaks Mallorca is een klein wandelgidsbedrijf van Helena en Matija, met privéwandelingen en kleine groepen in de Serra de Tramuntana en op heel Mallorca.',
    fr: 'Blue Peaks Mallorca est une petite entreprise de randonnée guidée dirigée par Helena et Matija, proposant des sorties privées et en petit groupe dans la Serra de Tramuntana et dans toute Majorque.',
  },

  contact: {
    email: 'hola@bluepeaksmallorca.com',
    /** E.164, for tel: and wa.me links. */
    phone: '+34616381684',
    phoneDisplay: '+34 616 381 684',
    whatsapp: '34616381684',
  },

  /** TODO: confirm street address + postcode, or delete `streetAddress` if you'd rather not publish it. */
  address: {
    locality: 'Alaró',
    region: 'Illes Balears',
    postalCode: '07340',
    country: 'ES',
    countryName: 'Spain',
  },

  /** Approximate centre of operations (Alaró). Used for LocalBusiness geo. */
  geo: {
    latitude: 39.7053,
    longitude: 2.7906,
  },

  /** Where the guiding actually happens — helps place the business geographically. */
  areaServed: [
    'Serra de Tramuntana',
    'Mallorca',
    'Sóller',
    'Alaró',
    'Valldemossa',
    'Deià',
    'Pollença',
    'Escorca',
    'Balearic Islands',
  ],

  /** Read off the LANGUAGES row on the live site. Drives schema knowsLanguage. */
  languagesSpoken: ['English', 'Spanish', 'Catalan', 'Dutch'],

  pricing: {
    currency: 'EUR',
    /** Guiding fee for a private day, independent of group size. */
    privateDayRate: 180,
    /** TODO: confirm the real ceiling for a private group. */
    privateMaxGroup: 8,
  },

  founded: '2023', // TODO: confirm

  social: {
    instagram: 'https://www.instagram.com/bluepeaksmallorca/',
    tripadvisor:
      'https://www.tripadvisor.com/Attraction_Review-g642209-d33011173-Reviews-Blue_Peaks_Mallorca-Alaro_Majorca_Balearic_Islands.html',
    getyourguide: 'https://www.getyourguide.com/mountain-guides-helena-matija-s710963/',
  },

  /**
   * Deliberately empty. Do not populate aggregateRating with invented numbers —
   * fabricated review markup is a manual-action risk with Google and destroys
   * trust with LLMs that cross-check against TripAdvisor. Fill in only with
   * real figures, and update them when they change.
   */
  aggregateRating: null as null | { ratingValue: number; reviewCount: number },
} as const;

export const guides = [
  {
    id: 'helena',
    name: 'Helena',
    role: {
      en: 'Mountain guide & co-founder',
      de: 'Bergführerin & Mitgründerin',
      es: 'Guía de montaña y cofundadora',
      ca: 'Guia de muntanya i cofundadora',
      nl: 'Berggids & medeoprichter',
      fr: 'Guide de montagne & cofondatrice',
    },
  },
  {
    id: 'matija',
    name: 'Matija',
    role: {
      en: 'Mountain guide & co-founder',
      de: 'Bergführer & Mitgründer',
      es: 'Guía de montaña y cofundador',
      ca: 'Guia de muntanya i cofundador',
      nl: 'Berggids & medeoprichter',
      fr: 'Guide de montagne & cofondateur',
    },
  },
] as const;

/**
 * Bokun booking configuration.
 *
 * Fill these in from your Bokun account and the three service pages switch
 * from the WhatsApp enquiry card to a real online booking widget. Until then
 * every page still works — see src/components/BokunWidget.astro.
 *
 * Where to find them in Bokun:
 *   bookingChannelUUID — Sales tools -> Booking channels -> your channel
 *   product ids        — the number in a product's URL, e.g. .../experience/123456
 *
 * NOTE: turning this on adds third-party JavaScript and cookies. See the
 * commented block in public/_headers for the CSP entries it needs, and update
 * the privacy section of src/content/pages/en/legal.md.
 */
export const booking = {
  provider: 'bokun',
  bookingChannelUUID: null as string | null,
  /** Set to null to keep a page on the WhatsApp/email enquiry flow. */
  privateHikes: null as string | null,
  customHikes: null as string | null,
  scheduledHikes: null as string | null,
} as const;
