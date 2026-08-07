// Shared between astro.config.mjs (which cannot import TypeScript) and src/data/site.ts.
// Keep this file plain ESM.

export const SITE_URL = 'https://bluepeaksmallorca.com';

export const DEFAULT_LOCALE = 'en';

/** Order here is the order languages appear in the language switcher. */
export const LOCALES = ['en', 'de', 'es', 'ca', 'nl', 'fr'];
