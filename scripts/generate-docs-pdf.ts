#!/usr/bin/env tsx
/**
 * generate-docs-pdf.ts
 *
 * Generates two PDF compendiums from the live Next.js docs pages:
 *   public/downloads/mis-gastos-docs-es.pdf
 *   public/downloads/mis-gastos-docs-en.pdf
 *
 * Usage:
 *   npm run docs:pdf
 *
 * Prerequisites:
 *   npm run build   (must be run first)
 *   The script starts `next start` internally and shuts it down when done.
 *
 * If Puppeteer can't find Chromium, set PUPPETEER_EXECUTABLE_PATH to the
 * system Chrome/Chromium binary, e.g.:
 *   PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser npm run docs:pdf
 */

import puppeteer, { type Browser, type Page } from 'puppeteer';
import { execFile, spawn, type ChildProcess } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execFileAsync = promisify(execFile);

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BASE_URL = 'http://localhost:3002';
const PORT = 3002;
const ROOT = path.resolve(process.cwd());
const OUTPUT_DIR = path.join(ROOT, 'public', 'downloads');
const VERSION = '1.1.1';

const LOCALES: Array<{ code: string; label: string; filename: string }> = [
  { code: 'es', label: 'Documentación de Mis Gastos', filename: 'mis-gastos-docs-es.pdf' },
  { code: 'en', label: 'Mis Gastos Documentation', filename: 'mis-gastos-docs-en.pdf' },
];

const DOC_SLUGS = [
  '01-introduccion',
  '02-cuentas',
  '03-transacciones',
  '04-categorias',
  '05-monedas',
  '06-informes',
  '07-deudas',
  '08-inversiones',
  '09-backup',
  '10-actualizaciones',
  '11-faq',
] as const;

// ---------------------------------------------------------------------------
// Server lifecycle
// ---------------------------------------------------------------------------

let serverProcess: ChildProcess | null = null;

async function isServerRunning(): Promise<boolean> {
  try {
    const res = await fetch(BASE_URL, {
      signal: AbortSignal.timeout(3000),
      redirect: 'manual', // don't follow redirects; a redirect means the server is up
    });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function startServer(): Promise<void> {
  // If a server is already responding on our port, reuse it (do not kill on exit)
  if (await isServerRunning()) {
    console.log(`  Server already running at ${BASE_URL} — reusing.`);
    return;
  }

  console.log('  Starting next start...');
  serverProcess = spawn('node_modules/.bin/next', ['start', '--port', String(PORT)], {
    cwd: ROOT,
    stdio: 'pipe',
    detached: false,
  });

  serverProcess.stdout?.on('data', (d: Buffer) => {
    const line = d.toString().trim();
    if (line) process.stdout.write(`    [next] ${line}\n`);
  });
  serverProcess.stderr?.on('data', (d: Buffer) => {
    const line = d.toString().trim();
    // Only print meaningful errors, not the RSC serialization warnings
    if (line && !line.includes('Functions cannot be passed') && !line.includes('digest:')) {
      process.stderr.write(`    [next:err] ${line}\n`);
    }
  });

  serverProcess.on('exit', (code) => {
    if (code !== null && code !== 0 && code !== 143) {
      console.error(`  [next] server exited with code ${code}`);
    }
  });

  await waitForServer(BASE_URL, 60_000);
  console.log('  Server ready.');
}

async function waitForServer(url: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (res.ok || res.status < 500) return;
    } catch {
      // not ready yet
    }
    await sleep(500);
  }
  throw new Error(`Server at ${url} did not respond within ${timeoutMs / 1000}s`);
}

function stopServer(): void {
  if (serverProcess) {
    try { serverProcess.kill('SIGTERM'); } catch { /* ignore */ }
    serverProcess = null;
    console.log('  Server stopped.');
  } else {
    console.log('  Server was external — left running.');
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

// ---------------------------------------------------------------------------
// PDF header / footer templates
// ---------------------------------------------------------------------------

function headerTemplate(locale: string): string {
  const title = locale === 'es' ? 'Mis Gastos — Documentación' : 'Mis Gastos — Documentation';
  return `
    <div style="width:100%;font-size:9pt;color:#546e7a;padding:0 18mm;display:flex;justify-content:space-between;align-items:center;">
      <span>${title}</span>
      <span style="font-size:8pt;">v${VERSION}</span>
    </div>`;
}

function footerTemplate(): string {
  return `
    <div style="width:100%;font-size:9pt;color:#546e7a;padding:0 18mm;display:flex;justify-content:space-between;align-items:center;">
      <span>© ${new Date().getFullYear()} Mis Gastos</span>
      <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>`;
}

// ---------------------------------------------------------------------------
// Collect doc page HTML
// ---------------------------------------------------------------------------

async function collectDocPages(
  browser: Browser,
  locale: string
): Promise<{ slug: string; title: string; html: string }[]> {
  const results: { slug: string; title: string; html: string }[] = [];

  for (const slug of DOC_SLUGS) {
    const url = `${BASE_URL}/${locale}/docs/${slug}`;
    console.log(`    Capturing ${url}`);

    const page: Page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });

      // Extract the main article HTML (the #doc-content wrapper or the article itself).
      // The mdxRs (Rust) compiler does not suppress YAML frontmatter, so it renders
      // as the first element in the content. We strip it by removing any leading
      // element whose textContent starts with "title:" or "---".
      const html = await page.evaluate((): string => {
        const content =
          document.querySelector('#doc-content') ??
          document.querySelector('article') ??
          document.querySelector('main');
        if (!content) return '<p>Content not found</p>';

        // Clone so we don't mutate the live DOM
        const clone = content.cloneNode(true) as Element;

        // Remove the frontmatter block: first child whose text starts with "title:"
        const firstEl = clone.firstElementChild;
        if (firstEl) {
          const txt = (firstEl.textContent ?? '').trim();
          if (txt.startsWith('title:') || txt.startsWith('---')) {
            firstEl.remove();
          }
        }

        // Also remove sidebar, nav, pager, breadcrumb, TOC if they leaked in
        clone.querySelectorAll('nav, aside, [class*="Pager"], [class*="Breadcrumb"], [class*="TOC"]')
          .forEach((el) => el.remove());

        return clone.innerHTML;
      });

      const title = await page.title();
      const cleanTitle = title.replace(/\s*—\s*Mis Gastos Docs.*/, '').trim();

      results.push({ slug, title: cleanTitle, html });
    } finally {
      await page.close();
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Build compendium HTML
// ---------------------------------------------------------------------------

function buildCompendiumHtml(
  locale: string,
  sections: { slug: string; title: string; html: string }[]
): string {
  const isEs = locale === 'es';
  const docTitle = isEs ? 'Documentación de Mis Gastos' : 'Mis Gastos Documentation';
  const tocTitle = isEs ? 'Tabla de Contenidos' : 'Table of Contents';

  // TOC entries
  const tocItems = sections
    .map(
      (s, i) =>
        `<li><a href="#section-${s.slug}">${i + 1}. ${s.title}</a></li>`
    )
    .join('\n');

  // Chapter pages
  const chapters = sections
    .map(
      (s, i) => `
      <section id="section-${s.slug}" class="chapter">
        <div class="chapter-header">
          <span class="chapter-number">${String(i + 1).padStart(2, '0')}</span>
          <h1>${s.title}</h1>
        </div>
        <div class="chapter-body prose-docs">
          ${s.html}
        </div>
      </section>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <title>${docTitle}</title>
  <style>
    /* ---- Reset & base ---- */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 14px; }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: #1a2c2b;
      background: #fff;
      line-height: 1.65;
    }

    /* ---- Cover (first page) ---- */
    .cover-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 64px;
      background: linear-gradient(135deg, #f0fdfa 0%, #e0f2f1 50%, #f7fffe 100%);
      text-align: center;
      page-break-after: always;
    }
    .cover-logo {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      background: linear-gradient(135deg, #00897B 0%, #4DB6AC 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 28px;
    }
    .cover-title {
      font-size: 32px;
      font-weight: 800;
      color: #005f56;
      margin-bottom: 10px;
      line-height: 1.15;
    }
    .cover-subtitle {
      font-size: 15px;
      color: #546e7a;
      margin-bottom: 40px;
      max-width: 400px;
    }
    .cover-divider {
      width: 56px;
      height: 3px;
      border-radius: 2px;
      background: linear-gradient(90deg, #00897B, #4DB6AC);
      margin-bottom: 32px;
    }
    .cover-meta {
      font-size: 13px;
      color: #546e7a;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .cover-version {
      font-weight: 600;
      color: #00897B;
    }

    /* ---- TOC page ---- */
    .toc-page {
      padding: 48px 56px;
      page-break-after: always;
    }
    .toc-page h2 {
      font-size: 22px;
      font-weight: 700;
      color: #005f56;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e0f2f1;
    }
    .toc-page ol {
      list-style: decimal;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .toc-page li {
      font-size: 14px;
    }
    .toc-page a {
      color: #00897B;
      text-decoration: none;
    }

    /* ---- Chapter ---- */
    .chapter {
      padding: 0 56px 48px;
      page-break-before: always;
    }
    .chapter:first-of-type {
      page-break-before: auto;
    }
    .chapter-header {
      display: flex;
      align-items: baseline;
      gap: 16px;
      margin-bottom: 32px;
      padding: 32px 0 20px;
      border-bottom: 2px solid #e0f2f1;
    }
    .chapter-number {
      font-size: 13px;
      font-weight: 700;
      color: #4DB6AC;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .chapter-header h1 {
      font-size: 24px;
      font-weight: 800;
      color: #005f56;
      page-break-before: avoid !important;
    }

    /* ---- Prose (mimic prose-docs) ---- */
    .prose-docs h1,
    .prose-docs h2,
    .prose-docs h3,
    .prose-docs h4 {
      font-weight: 700;
      color: #005f56;
      margin-top: 1.6em;
      margin-bottom: 0.5em;
      line-height: 1.25;
    }
    .prose-docs h2 { font-size: 18px; }
    .prose-docs h3 { font-size: 15px; }
    .prose-docs h4 { font-size: 13px; font-weight: 600; }
    .prose-docs p { margin-bottom: 0.9em; }
    .prose-docs ul, .prose-docs ol {
      margin-bottom: 0.9em;
      padding-left: 20px;
    }
    .prose-docs li { margin-bottom: 0.3em; }
    .prose-docs pre {
      background: #f4f9f8;
      border: 1px solid #e0f2f1;
      border-radius: 8px;
      padding: 14px 16px;
      overflow-x: auto;
      font-size: 12px;
      line-height: 1.5;
      margin-bottom: 1em;
      page-break-inside: avoid;
    }
    .prose-docs code {
      background: #f0fdfa;
      border-radius: 4px;
      padding: 1px 5px;
      font-size: 0.9em;
      color: #00695c;
    }
    .prose-docs pre code {
      background: none;
      padding: 0;
      color: inherit;
    }
    .prose-docs table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1em;
      font-size: 13px;
      page-break-inside: avoid;
    }
    .prose-docs th {
      background: #e0f2f1;
      color: #005f56;
      font-weight: 600;
      padding: 8px 12px;
      text-align: left;
      border-bottom: 2px solid #b2dfdb;
    }
    .prose-docs td {
      padding: 7px 12px;
      border-bottom: 1px solid #e0f2f1;
    }
    .prose-docs tr:last-child td { border-bottom: none; }
    .prose-docs a {
      color: #00897B;
      text-decoration: underline;
    }
    .prose-docs strong { font-weight: 700; color: #1a2c2b; }
    .prose-docs em { font-style: italic; }
    .prose-docs blockquote {
      border-left: 3px solid #4DB6AC;
      padding-left: 14px;
      color: #546e7a;
      margin: 0 0 0.9em;
    }
    .prose-docs img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 0.5em 0;
    }
    .prose-docs hr {
      border: none;
      border-top: 1px solid #e0f2f1;
      margin: 1.5em 0;
    }

    /* ---- Callout component ---- */
    .callout, [class*="callout"], [data-callout] {
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 1em;
      page-break-inside: avoid;
      border-left: 4px solid #4DB6AC;
      background: #f0fdfa;
    }

    /* ---- Steps component ---- */
    .steps, [class*="Steps"] {
      page-break-inside: avoid;
    }

    /* ---- Print-specific ---- */
    @media print {
      aside, nav, header, footer,
      [class*="Sidebar"], [class*="Pager"],
      [class*="Breadcrumb"], [class*="TableOfContents"],
      [class*="MobileDocsNav"] {
        display: none !important;
      }
      a[href^="http"]::after {
        content: " (" attr(href) ")";
        font-size: 0.8em;
        color: #546e7a;
      }
    }
  </style>
</head>
<body>

  <!-- Cover page -->
  <div class="cover-page">
    <div class="cover-logo">
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="14" width="36" height="24" rx="4" fill="white" fill-opacity="0.9"/>
        <rect x="6" y="14" width="36" height="8" rx="2" fill="white" fill-opacity="0.5"/>
        <circle cx="34" cy="26" r="3" fill="white"/>
        <text x="14" y="30" font-size="11" font-weight="700" fill="white" font-family="Inter, sans-serif">$</text>
      </svg>
    </div>
    <div class="cover-title">${docTitle}</div>
    <div class="cover-subtitle">
      ${isEs
        ? 'Guía completa de uso — Finanzas personales offline'
        : 'Complete usage guide — Offline personal finance'}
    </div>
    <div class="cover-divider"></div>
    <div class="cover-meta">
      <span class="cover-version">v${VERSION}</span>
      <span>${today()}</span>
      <span style="margin-top:8px;padding:5px 14px;border-radius:20px;background:rgba(0,137,123,0.08);color:#005f56;font-size:11px;font-weight:500;">
        ${isEs
          ? '100% offline · Sin nube · Sin cuenta'
          : '100% offline · No cloud · No account required'}
      </span>
    </div>
  </div>

  <!-- TOC -->
  <div class="toc-page">
    <h2>${tocTitle}</h2>
    <ol>${tocItems}</ol>
  </div>

  <!-- Chapters -->
  ${chapters}

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Generate PDF for one locale
// ---------------------------------------------------------------------------

async function generatePdf(browser: Browser, locale: string, filename: string): Promise<string> {
  console.log(`\n  [${locale}] Collecting doc pages...`);
  const sections = await collectDocPages(browser, locale);
  console.log(`  [${locale}] ${sections.length} sections captured.`);

  const html = buildCompendiumHtml(locale, sections);

  console.log(`  [${locale}] Rendering PDF...`);
  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  const outputPath = path.join(OUTPUT_DIR, filename);

  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '22mm', bottom: '20mm', left: '18mm', right: '18mm' },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: headerTemplate(locale),
    footerTemplate: footerTemplate(),
  });

  await page.close();

  const stats = fs.statSync(outputPath);
  const sizeMb = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`  [${locale}] Saved: ${outputPath} (${sizeMb} MB)`);
  return sizeMb;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  // Ensure output dir exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  await startServer();

  let browser: Browser | null = null;

  try {
    const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    console.log('\n  Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      ...(executablePath ? { executablePath } : {}),
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--font-render-hinting=none',
      ],
    });

    const results: { locale: string; filename: string; sizeMb: string }[] = [];

    for (const { code, filename } of LOCALES) {
      const sizeMb = await generatePdf(browser, code, filename);
      results.push({ locale: code, filename, sizeMb });
    }

    console.log('\n  === PDF Generation Complete ===');
    for (const r of results) {
      console.log(`  [${r.locale}] ${r.filename}  (${r.sizeMb} MB)`);
    }

  } finally {
    if (browser) await browser.close();
    stopServer();
  }
}

main().catch((err) => {
  console.error('\n  PDF generation failed:', err);
  stopServer();
  process.exit(1);
});
