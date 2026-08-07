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
import QRCode from 'qrcode';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');

// Brand palette, sampled from the live site. Keep in sync with tokens.css.
const OLIVE = '#676147';
const TEAL = '#2a9d8e';
const CHARCOAL = '#333230';
const GREIGE = '#cfccc3';
const WHATSAPP_URL = 'https://wa.me/34616381684';

/** The ridgeline mark, on a transparent ground. Matches Logo.astro. */
const markPaths = (stroke, width = 3) => `
  <g fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round">
    <path d="M4 55 L4 26 L20 12 L46 22 L60 8 L86 30 L96 55 Z"/>
    <path d="M4 26 L46 22 L20 12"/>
    <path d="M46 22 L60 8 L70 41 L46 22"/>
    <path d="M70 41 L86 30"/>
    <path d="M4 55 L96 55"/>
    <path d="M104 55 L104 30 L126 20 L150 6 L196 40 L196 55 Z"/>
    <path d="M104 30 L150 6"/>
    <path d="M126 20 L146 55"/>
    <path d="M150 6 L162 55"/>
  </g>
`;

/* ------------------------------------------------------------- favicon.svg */

// Just the left massif: the full lockup is illegible at 16px.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 64">
  <rect width="100" height="64" rx="12" fill="${OLIVE}"/>
  <g transform="translate(0 2) scale(0.98)" fill="none" stroke="#fff" stroke-width="4.5"
     stroke-linejoin="round">
    <path d="M6 54 L6 26 L22 12 L48 22 L62 8 L88 30 L94 54 Z"/>
    <path d="M6 26 L48 22 L22 12"/>
    <path d="M48 22 L62 8 L72 41 L48 22"/>
  </g>
</svg>
`;

await writeFile(path.join(PUBLIC, 'favicon.svg'), favicon);
console.log('  ✓ favicon.svg');

await sharp(Buffer.from(favicon)).resize(180, 180, { fit: 'contain', background: OLIVE })
  .png().toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
console.log('  ✓ apple-touch-icon.png');

/* ------------------------------------------------------------- logo.svg */

// Referenced by the Organization JSON-LD, so it must resolve to a real file.
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 150" width="460" height="150">
  <rect width="460" height="150" fill="${GREIGE}"/>
  <g transform="translate(130 18) scale(1)">${markPaths(CHARCOAL, 2)}</g>
  <text x="230" y="112" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="30" letter-spacing="6.5" fill="${CHARCOAL}">BLUE PEAKS</text>
  <text x="230" y="138" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="17" letter-spacing="6" fill="${CHARCOAL}">MALLORCA</text>
</svg>
`;
await writeFile(path.join(PUBLIC, 'logo.svg'), logo);
console.log('  ✓ logo.svg');

/* ------------------------------------------------------ og/default.png */

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${GREIGE}"/>
  <g transform="translate(300 150) scale(3)">${markPaths(CHARCOAL, 1.4)}</g>
  <text x="600" y="450" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="60" letter-spacing="14" fill="${CHARCOAL}">BLUE PEAKS</text>
  <text x="600" y="500" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="30" letter-spacing="12" fill="${CHARCOAL}">MALLORCA</text>
  <text x="600" y="565" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="25" fill="${OLIVE}">Tailored hiking days with mindful experiences</text>
</svg>
`;

await mkdir(path.join(PUBLIC, 'og'), { recursive: true });
await sharp(Buffer.from(og)).png({ quality: 90 }).toFile(path.join(PUBLIC, 'og', 'default.png'));
console.log('  ✓ og/default.png');

/* ---------------------------------------------------- WhatsApp QR code */

// Generated at build time and committed, so the footer QR is a local SVG
// rather than a call to a third-party QR service on every page load.
const qr = await QRCode.toString(WHATSAPP_URL, {
  type: 'svg',
  margin: 1,
  color: { dark: OLIVE, light: '#0000' },
  errorCorrectionLevel: 'M',
});
await writeFile(path.join(PUBLIC, 'whatsapp-qr.svg'), qr);
console.log('  ✓ whatsapp-qr.svg');

/* --------------------------------------------- hero poster placeholder */

// Stands in until the real video and its poster frame are supplied.
const poster = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 192 108">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8e9aa0"/>
      <stop offset="55%" stop-color="#a9a89a"/>
      <stop offset="100%" stop-color="#6f6d5c"/>
    </linearGradient>
  </defs>
  <rect width="192" height="108" fill="url(#sky)"/>
  <circle cx="132" cy="30" r="9" fill="#d8d3c4" opacity="0.5"/>
  <polygon points="0,108 0,74 26,52 52,68 78,40 104,72 130,56 160,80 192,62 192,108"
           fill="#5d6b6a" opacity="0.75"/>
  <polygon points="0,108 0,88 30,70 62,90 92,68 124,92 158,74 192,90 192,108" fill="#414a45"/>
  <polygon points="0,108 40,92 84,104 128,88 168,100 192,94 192,108" fill="#2b2f2b"/>
</svg>
`;
await mkdir(path.join(PUBLIC, 'video'), { recursive: true });
await sharp(Buffer.from(poster)).jpeg({ quality: 78, mozjpeg: true })
  .toFile(path.join(PUBLIC, 'video', 'hero-poster.jpg'));
console.log('  ✓ video/hero-poster.jpg');

/* -------------------------------------------------------- webmanifest */

const manifest = {
  name: 'Blue Peaks Mallorca',
  short_name: 'Blue Peaks',
  description: 'Tailored hiking days with mindful experiences in Mallorca.',
  start_url: '/',
  display: 'browser',
  background_color: GREIGE,
  theme_color: OLIVE,
  icons: [
    { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
};

await writeFile(path.join(PUBLIC, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
console.log('  ✓ site.webmanifest');

console.log('\nAssets written to public/');
