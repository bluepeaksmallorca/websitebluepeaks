/**
 * Screenshots the built site at phone and desktop widths, for eyeballing the
 * layout without a browser.
 *
 *   npm run build && npx astro preview &
 *   node scripts/screenshot.mjs
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = process.env.OUT_DIR ?? '/tmp/shots';

const pages = [
  ['home', '/'],
  ['hikes', '/hikes/'],
  ['hike', '/hikes/barranc-de-biniaraix/'],
  ['guide', '/guide/best-time-to-hike-mallorca/'],
  ['private', '/private-hikes/'],
  ['contact', '/contact/'],
  ['blog', '/blog/'],
  ['de-home', '/de/'],
];

const viewports = [
  ['mobile', { width: 390, height: 844 }, 3],
  ['desktop', { width: 1440, height: 900 }, 2],
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

for (const [vpName, viewport, scale] of viewports) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    isMobile: vpName === 'mobile',
    hasTouch: vpName === 'mobile',
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(String(err)));

  for (const [name, path] of pages) {
    // Desktop only needs the marketing pages; skip the duplicates.
    if (vpName === 'desktop' && ['de-home'].includes(name)) continue;

    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `${OUT}/${vpName}-${name}.png`,
      fullPage: scale > 2 ? false : false,
    });
  }

  if (errors.length) {
    console.log(`\n[${vpName}] console errors:`);
    for (const e of [...new Set(errors)]) console.log('  ' + e);
  } else {
    console.log(`[${vpName}] no console errors`);
  }

  await context.close();
}

await browser.close();
console.log(`\nScreenshots in ${OUT}`);
