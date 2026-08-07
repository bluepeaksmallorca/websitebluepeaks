/**
 * Generates the static brand assets that are not photographs: the favicon, the
 * Apple touch icon, and the default Open Graph card.
 *
 * They are drawn here rather than hand-exported so that changing the brand
 * colour in one constant updates all of them consistently.
 *
 *   node scripts/make-assets.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');

const BLUE = '#1a4054';
const BLUE_MID = '#2f6d91';
const SAND = '#f5f1ea';
const SAND_DEEP = '#d9cebb';

/** The ridgeline mark, on a transparent ground. */
const markPaths = (stroke) => `
  <path d="M4 76 L36 18 L57 54 L65 41 L100 76 Z" fill="${stroke}" opacity="0.16"/>
  <path d="M4 76 L36 18 L57 54" fill="none" stroke="${stroke}" stroke-width="7"
        stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M50 66 L65 41 L100 76" fill="none" stroke="${stroke}" stroke-width="7"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.55"/>
`;

/* ------------------------------------------------------------- favicon.svg */

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 94">
  <rect width="104" height="94" rx="20" fill="${BLUE}"/>
  <g transform="translate(0 6)">${markPaths(SAND)}</g>
</svg>
`;

await writeFile(path.join(PUBLIC, 'favicon.svg'), favicon);
console.log('  ✓ favicon.svg');

/* ------------------------------------------------ apple-touch-icon (180px) */

await sharp(Buffer.from(favicon)).resize(180, 180, { fit: 'cover' }).png().toFile(
  path.join(PUBLIC, 'apple-touch-icon.png')
);
console.log('  ✓ apple-touch-icon.png');

/* ------------------------------------------------------ og/default.png */

// Layered ridgelines, matching the generated placeholders used on the site.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${SAND}"/>
      <stop offset="62%" stop-color="${SAND_DEEP}"/>
      <stop offset="100%" stop-color="#b6ab97"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#sky)"/>
  <circle cx="880" cy="180" r="62" fill="#ffffff" opacity="0.45"/>

  <path d="M0 470 L190 300 L320 400 L470 250 L640 430 L810 320 L980 440 L1200 330 L1200 630 L0 630 Z"
        fill="${BLUE_MID}" opacity="0.55"/>
  <path d="M0 540 L240 380 L430 500 L620 360 L840 520 L1050 420 L1200 500 L1200 630 L0 630 Z"
        fill="${BLUE_MID}"/>
  <path d="M0 610 L300 470 L560 580 L820 460 L1080 570 L1200 520 L1200 630 L0 630 Z"
        fill="${BLUE}"/>

  <g transform="translate(84 74) scale(0.86)">${markPaths(BLUE)}</g>

  <text x="84" y="232" font-family="Georgia, 'Times New Roman', serif" font-size="86"
        font-weight="500" fill="#13202a">Blue Peaks</text>
  <text x="84" y="292" font-family="Helvetica, Arial, sans-serif" font-size="31"
        fill="#3d4750">Guided hiking in the Serra de Tramuntana, Mallorca</text>
  <text x="84" y="344" font-family="Helvetica, Arial, sans-serif" font-size="24"
        fill="#635c50">bluepeaksmallorca.com</text>
</svg>
`;

await mkdir(path.join(PUBLIC, 'og'), { recursive: true });
await sharp(Buffer.from(og)).png({ quality: 90 }).toFile(path.join(PUBLIC, 'og', 'default.png'));
console.log('  ✓ og/default.png');

/* ------------------------------------------------------------ logo.svg */

// Referenced by the Organization JSON-LD, so it must resolve to a real file.
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 104" width="420" height="104">
  <rect width="420" height="104" fill="${SAND}"/>
  <g transform="translate(18 12) scale(0.8)">${markPaths(BLUE)}</g>
  <text x="118" y="66" font-family="Georgia, 'Times New Roman', serif" font-size="44"
        font-weight="500" fill="#13202a">Blue <tspan fill="${BLUE_MID}">Peaks</tspan></text>
</svg>
`;
await writeFile(path.join(PUBLIC, 'logo.svg'), logo);
console.log('  ✓ logo.svg');

/* -------------------------------------------------------- webmanifest */

const manifest = {
  name: 'Blue Peaks Mallorca',
  short_name: 'Blue Peaks',
  description: 'Guided hiking in the Serra de Tramuntana, Mallorca.',
  start_url: '/',
  display: 'browser',
  background_color: SAND,
  theme_color: BLUE,
  icons: [
    { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
};

await writeFile(
  path.join(PUBLIC, 'site.webmanifest'),
  JSON.stringify(manifest, null, 2) + '\n'
);
console.log('  ✓ site.webmanifest');

console.log('\nAssets written to public/');
