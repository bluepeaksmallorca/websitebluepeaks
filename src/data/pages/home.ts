import { DEFAULT_LOCALE, type Locale } from '../site';

/**
 * Homepage copy.
 *
 * The English text is transcribed from the live WordPress site — the
 * strapline, the welcome paragraph, the services blurb and the FAQ questions
 * are all verbatim, so the rebuild reads as the same business and not a
 * rewrite of it.
 *
 * Only English is filled in. The other five locales fall back to it and the
 * page says so, rather than shipping machine translations of copy that is
 * still being finalised. Adding a language is filling in one object below —
 * see `homeCopy()`.
 */
export interface HomeCopy {
  metaTitle: string;
  metaDescription: string;

  /** Alt text for the hero video, for screen readers. */
  heroVideoLabel: string;
  scrollHint: string;

  strapline: string;
  intro: { before: string; emphasis: string; after: string };

  welcome: string;
  languagesLabel: string;

  servicesTitle: string;
  privateTitle: string;
  privateBody: string;
  businessTitle: string;
  businessBody: string;
  otherTitle: string;
  otherBody: string;

  mantra: string;
  mantraSub: string;

  ctaTitle: string;
  ctaButton: string;

  blogTitle: string;
  blogAll: string;
  faqTitle: string;
  partnersTitle: string;

  faqs: Array<{ q: string; a: string }>;
}

const en: HomeCopy = {
  metaTitle: 'Blue Peaks Mallorca — tailored hiking days with mindful experiences',
  metaDescription:
    'Private guided hiking in Mallorca with Helena and Matija. Tailored hiking days across the Serra de Tramuntana, with a mindful approach. Ask us on WhatsApp.',

  heroVideoLabel: 'Walking in the mountains of Mallorca',
  scrollHint: 'Scroll',

  strapline: 'Tailored hiking days with mindful experiences.',
  intro: {
    before: 'Escape the ordinary, explore the inspiring nature of Mallorca and ',
    emphasis: 'dis|connect & reconnect',
    after: ' with us',
  },

  welcome:
    'Hello and welcome! We are Helena and Matija, your guides at Blue Peaks. We believe that spending time in nature has healing powers. Our main focus is to create mindful hiking experiences that blend gentle adventure with opportunities for reflection, personal growth, and deep appreciation of the island’s stunning landscapes.',
  languagesLabel: 'Languages',

  servicesTitle: 'Services',
  privateTitle: 'Private Hike',
  privateBody:
    'We offer private group hikes all over Mallorca, tailored to your needs and with a mindful approach if you are open to this. Just ask us for details via WhatsApp.',
  businessTitle: 'Business',
  businessBody:
    'We work as freelance guides for travel companies, retreat organisers and hotels that need the mountain side handled properly — route planning, safety and guiding on the day.',
  otherTitle: 'Other',
  otherBody:
    'Something else in mind? Food and wine days, photography walks, multi-day traverses. Tell us the idea and we will build the day around it.',

  mantra: 'Hike, breathe, dis|connect',
  mantraSub: 'If you like, add-on your inspiration.',

  ctaTitle: 'Get in touch to get hiking',
  ctaButton: 'WhatsApp Blue Peaks',

  blogTitle: 'Blog',
  blogAll: 'Read the blog',
  faqTitle: 'FAQs',
  partnersTitle: 'Our partners & friends',

  /*
    Questions are verbatim from the live site; the accordions were closed in
    the screenshots, so the ANSWERS BELOW ARE DRAFTS.

    Cancellations and travel insurance in particular state policy, and policy
    is not something to infer — please replace both with your actual terms
    before this goes live. The rest are written from what is on the site and
    from general Tramuntana knowledge, and still need your eye.
  */
  faqs: [
    {
      q: 'Cancellations',
      a: 'TODO — replace with your real cancellation terms. State the notice period for a free cancellation, what happens to any deposit, and what you do when the weather makes a route unsafe. This must match what you tell people in writing when they book.',
    },
    {
      q: 'What happens if I get injured or sick before the trip?',
      a: 'TODO — replace with your real policy. Tell us as early as you can and we will do what we can to move the date. Confirm here whether a rescheduled day carries the same rate and how long a credit is valid.',
    },
    {
      q: 'Do you do bag transfers for large groups',
      a: 'For multi-day walks we can arrange luggage transfer between accommodations, so you walk with a day pack rather than everything you brought. It depends on the route — some Tramuntana refuges are not reachable by road. Ask us on WhatsApp with your group size and the stages you have in mind.',
    },
    {
      q: 'How difficult are the hiking tours, and how do I choose the right one?',
      a: 'They range from gentle coastal walks of three to four hours to full mountain days with more than 1,000 m of ascent. Mallorcan limestone is rough underfoot, so a given distance here is usually harder than the same distance at home. The most useful thing you can tell us is what your last long walk was and how it felt — we will match the day to that.',
    },
    {
      q: 'What should I pack for the hiking tour?',
      a: 'Footwear with proper grip, at least 1.5 to 2 litres of water per person, sun hat, sunglasses and high-factor sunscreen, a windproof layer even in summer, and food. There is almost no drinkable water on Tramuntana routes. We send a full packing list once your day is confirmed.',
    },
    {
      q: 'When is the best time to go hiking?',
      a: 'March to early June and September to November. Daytime temperatures sit between roughly 15 and 25 °C, the trails are dry and the island is much quieter than in high summer. July and August are too hot for long ascents, so in those months we start before sunrise or move to shaded, coastal routes.',
    },
    {
      q: 'Do you provide travel insurance',
      a: 'TODO — replace with your real position. State clearly that Blue Peaks carries professional liability insurance for guiding, that this does not cover participants’ medical treatment, mountain rescue or repatriation, and that everyone needs their own travel insurance covering hiking.',
    },
  ],
};

/** Partner logos shown at the foot of the homepage. */
export const partners = [
  { name: 'Mills and Honey', url: null as string | null },
  { name: 'Rock & Water Mallorca', url: null as string | null },
];

/**
 * Copy for a locale, with the English original as the fallback.
 *
 * `isFallback` drives the visible notice and the canonical/hreflang handling,
 * exactly as it does for Markdown content.
 */
const byLocale: Partial<Record<Locale, HomeCopy>> = { en };

export function homeCopy(locale: Locale): { copy: HomeCopy; isFallback: boolean } {
  const translated = byLocale[locale];
  return translated
    ? { copy: translated, isFallback: false }
    : { copy: byLocale[DEFAULT_LOCALE]!, isFallback: true };
}

/** Locales with a real translation — used for hreflang on the homepage. */
export const homeLocales = Object.keys(byLocale) as Locale[];
