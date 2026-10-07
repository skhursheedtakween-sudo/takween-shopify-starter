// Takween Starter — automated storefront QA
// Usage (from repo root, with `shopify theme dev` running):
//   cd docs/qa && npm install && npx playwright install chromium
//   node qa-check.mjs                       # all default pages
//   node qa-check.mjs /products/sample-organic-cotton-tee /cart   # specific pages
//   BASE_URL=http://127.0.0.1:9292 node qa-check.mjs
//
// Checks every page at 360 / 390 / 768 / 1024 / 1280 / 1440 px:
//   ERRORS  : horizontal overflow, JS console errors, broken images, broken internal links (4xx/5xx),
//             empty / "#" / javascript: links, buttons & links without an accessible name,
//             images without an alt attribute, duplicate IDs, not exactly one <h1>
//   WARNINGS: touch targets smaller than 44×44 on mobile, text cut off inside its box
// Writes docs/qa/QA_REPORT.md and full-page screenshots in docs/qa/screenshots/.
// Exit code 1 when any ERROR is found.

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = (process.env.BASE_URL || 'http://127.0.0.1:9292').replace(/\/$/, '');
const WIDTHS = (process.env.WIDTHS || '360,390,768,1024,1280,1440').split(',').map(Number);
const DEFAULT_PATHS = [
  '/',
  '/collections/all',
  '/collections/apparel',
  '/collections/sale',
  '/products/sample-organic-cotton-tee',
  '/products/sample-relaxed-overshirt',
  '/products/sample-ceramic-mug-set',
  '/search?q=sample',
  '/search?q=zzzzzz',
  '/cart',
  '/pages/about',
  '/pages/faq',
  '/pages/contact',
  '/pages/shipping',
  '/pages/style-guide',
  '/pages/this-page-does-not-exist',
];
const PATHS = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_PATHS;
const OUT_DIR = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const SHOT_DIR = path.join(OUT_DIR, 'screenshots');
fs.mkdirSync(SHOT_DIR, { recursive: true });

// Console noise that is not caused by theme code
const IGNORE_CONSOLE = [/shopify.*(analytics|monorail|trekkie)/i, /web-pixels/i, /favicon/i, /preview_bar/i, /\[HMR\]/i, /hot.?reload/i];
const SKIP_LINK = [/\/cart\/(add|change|clear|update)/, /\/account/, /\/checkout/, /\/checkouts\//, /\/password/, /^mailto:/, /^tel:/, /\/services\//, /\/challenge/];

const slug = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/-$/, ''));

async function auditPage(page, width) {
  return page.evaluate((width) => {
    const errors = [];
    const warnings = [];
    const vw = document.documentElement.clientWidth;
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !el.closest('[hidden],[aria-hidden="true"],template,noscript');
    };
    const describe = (el) => {
      let d = el.tagName.toLowerCase();
      if (el.id) d += '#' + el.id;
      const cls = (el.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 3);
      if (cls.length) d += '.' + cls.join('.');
      const sec = el.closest('[id^="shopify-section"]');
      if (sec) d += `  (in ${sec.id})`;
      return d;
    };

    // 1. Horizontal overflow
    const sw = document.documentElement.scrollWidth;
    if (sw > vw + 1) {
      const culprits = [...document.querySelectorAll('body *')]
        .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > vw + 1 && !el.closest('[class*="slider"],[class*="scroll"],[class*="carousel"],[class*="marquee"]'); })
        .slice(0, 6).map(describe);
      errors.push(`Horizontal overflow: page is ${sw}px wide in a ${vw}px viewport. Culprits: ${culprits.join(' | ') || 'n/a'}`);
    }

    // 2. Images
    for (const img of document.images) {
      if (!img.closest('template,noscript') && img.complete && img.naturalWidth === 0 && img.getAttribute('src')) errors.push(`Broken image: ${img.currentSrc || img.src}  → ${describe(img)}`);
      if (!img.hasAttribute('alt')) errors.push(`Image without alt attribute: ${(img.currentSrc || img.src || '').slice(0, 90)} → ${describe(img)}`);
    }

    // 3. Links
    const internal = new Set();
    for (const a of document.querySelectorAll('a')) {
      if (a.closest('template,noscript')) continue;
      const raw = a.getAttribute('href');
      if (!visible(a)) continue;
      if (raw === null || raw.trim() === '' || raw.trim() === '#' || /^javascript:/i.test(raw)) {
        errors.push(`Link with empty/placeholder href ("${raw}"): "${a.textContent.trim().slice(0, 40)}" → ${describe(a)}`);
        continue;
      }
      try { const u = new URL(a.href); if (u.origin === location.origin) internal.add(u.pathname + u.search); } catch (e) {}
    }

    // 4. Accessible names
    for (const el of document.querySelectorAll('a[href], button, [role="button"], input:not([type="hidden"]), select, textarea')) {
      if (!visible(el)) continue;
      const tag = el.tagName.toLowerCase();
      let name = (el.getAttribute('aria-label') || el.getAttribute('title') || '').trim();
      if (!name && el.getAttribute('aria-labelledby')) name = el.getAttribute('aria-labelledby').split(/\s+/).map((id) => document.getElementById(id)?.textContent || '').join(' ').trim();
      if (!name && (tag === 'a' || tag === 'button' || el.getAttribute('role') === 'button')) name = (el.textContent || '').trim() || [...el.querySelectorAll('img[alt]')].map((i) => i.alt).join(' ').trim();
      if (!name && ['input', 'select', 'textarea'].includes(tag)) {
        if (['submit', 'button'].includes(el.type)) name = el.value;
        else name = (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)?.textContent.trim()) || el.closest('label')?.textContent.trim() || '';
      }
      if (!name) errors.push(`Interactive element without accessible name: ${describe(el)}`);
    }

    // 5. Duplicate IDs
    const ids = {};
    for (const el of document.querySelectorAll('[id]')) { if (!el.closest('template')) ids[el.id] = (ids[el.id] || 0) + 1; }
    const dups = Object.entries(ids).filter(([, n]) => n > 1).map(([id, n]) => `${id}×${n}`);
    if (dups.length) errors.push(`Duplicate IDs: ${dups.slice(0, 10).join(', ')}`);

    // 6. Headings
    const h1s = [...document.querySelectorAll('h1')].filter(visible);
    if (h1s.length !== 1) errors.push(`Expected exactly one visible <h1>, found ${h1s.length}`);

    // 7. Touch targets (mobile only, warning)
    if (width < 750) {
      const small = [...document.querySelectorAll('a[href], button, input[type="checkbox"], input[type="radio"], select, summary')]
        .filter(visible).filter((el) => { const r = el.getBoundingClientRect(); return (r.width < 44 || r.height < 44) && !el.closest('p, li p, .rte, .tk-rte, nav[aria-label*="readcrumb"]'); });
      if (small.length) warnings.push(`${small.length} touch targets smaller than 44×44px, e.g. ${small.slice(0, 4).map(describe).join(' | ')}`);
    }

    // 8. Clipped text (warning)
    const clipped = [...document.querySelectorAll('h1,h2,h3,h4,p,a,button,span,label')].filter(visible)
      .filter((el) => { const s = getComputedStyle(el); return (s.overflowX === 'hidden' || s.overflow === 'hidden') && s.textOverflow !== 'ellipsis' && !s.webkitLineClamp?.match(/\d/) && el.scrollWidth > el.clientWidth + 2; });
    if (clipped.length) warnings.push(`${clipped.length} elements with clipped text, e.g. ${clipped.slice(0, 4).map(describe).join(' | ')}`);

    return { errors, warnings, internal: [...internal] };
  }, width);
}

const results = [];
const allLinks = new Map(); // link -> first page found on

const browser = await chromium.launch();
try {
  for (const p of PATHS) {
    for (const width of WIDTHS) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, hasTouch: width < 750, isMobile: width < 750 });
      const page = await ctx.newPage();
      const consoleErrors = [];
      page.on('console', (m) => { if (m.type() === 'error' && !IGNORE_CONSOLE.some((r) => r.test(m.text()))) consoleErrors.push(m.text().slice(0, 200)); });
      page.on('pageerror', (e) => consoleErrors.push('Uncaught: ' + e.message.slice(0, 200)));
      let status = 0;
      try {
        const res = await page.goto(BASE + p, { waitUntil: 'load', timeout: 90000 });
        status = res ? res.status() : 0;
        await page.waitForTimeout(1500);
        // trigger lazy images
        await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
        await page.waitForTimeout(800);
        const audit = await auditPage(page, width);
        const expect404 = /does-not-exist/.test(p);
        if (status >= 400 && !expect404) audit.errors.unshift(`Page returned HTTP ${status}`);
        if (expect404 && status !== 404) audit.warnings.unshift(`Expected 404 status, got ${status}`);
        consoleErrors.forEach((c) => audit.errors.push('Console error: ' + c));
        audit.internal.forEach((l) => { if (!allLinks.has(l)) allLinks.set(l, p); });
        await page.screenshot({ path: path.join(SHOT_DIR, `${slug(p)}-${width}.png`), fullPage: true });
        results.push({ path: p, width, status, ...audit });
      } catch (e) {
        results.push({ path: p, width, status, errors: ['Page failed to load: ' + e.message.split('\n')[0]], warnings: [] });
      }
      await ctx.close();
      process.stdout.write(`${p} @${width}px … done\n`);
    }
  }

  // Internal link check
  const ctx = await browser.newContext();
  const brokenLinks = [];
  for (const [link, from] of allLinks) {
    if (SKIP_LINK.some((r) => r.test(link))) continue;
    try {
      const r = await ctx.request.get(BASE + link, { maxRedirects: 5, timeout: 60000 });
      if (r.status() >= 400) brokenLinks.push(`${link} → HTTP ${r.status()} (found on ${from})`);
    } catch (e) { brokenLinks.push(`${link} → request failed (found on ${from})`); }
  }
  await ctx.close();

  // Report
  const totalErr = results.reduce((n, r) => n + r.errors.length, 0) + brokenLinks.length;
  const totalWarn = results.reduce((n, r) => n + r.warnings.length, 0);
  const lines = [];
  lines.push('# QA Report — Takween Starter Theme', '');
  lines.push(`Generated: ${new Date().toISOString()}  ·  Base: ${BASE}  ·  Widths: ${WIDTHS.join(', ')}`, '');
  lines.push(`**Result: ${totalErr === 0 ? 'PASS ✅' : 'FAIL ❌'}** — ${totalErr} errors, ${totalWarn} warnings, ${allLinks.size} internal links checked`, '');
  lines.push('## Summary', '', '| Page | ' + WIDTHS.map((w) => w + 'px').join(' | ') + ' |', '|---|' + WIDTHS.map(() => '---').join('|') + '|');
  for (const p of PATHS) {
    lines.push(`| \`${p}\` | ` + WIDTHS.map((w) => { const r = results.find((x) => x.path === p && x.width === w); return r ? (r.errors.length ? `❌ ${r.errors.length}` : r.warnings.length ? `⚠️ ${r.warnings.length}` : '✅') : '—'; }).join(' | ') + ' |');
  }
  lines.push('', '## Broken internal links', '', brokenLinks.length ? brokenLinks.map((b) => '- ' + b).join('\n') : 'None ✅', '');
  lines.push('## Details', '');
  for (const r of results) {
    if (!r.errors.length && !r.warnings.length) continue;
    lines.push(`### \`${r.path}\` @ ${r.width}px`, '');
    r.errors.forEach((e) => lines.push('- ❌ ' + e));
    r.warnings.forEach((w) => lines.push('- ⚠️ ' + w));
    lines.push('');
  }
  fs.writeFileSync(path.join(OUT_DIR, 'QA_REPORT.md'), lines.join('\n'));
  console.log(`\n${totalErr === 0 ? 'PASS' : 'FAIL'}: ${totalErr} errors, ${totalWarn} warnings → docs/qa/QA_REPORT.md`);
  process.exitCode = totalErr === 0 ? 0 : 1;
} finally {
  await browser.close();
}
