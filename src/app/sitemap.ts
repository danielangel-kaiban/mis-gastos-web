import type { MetadataRoute } from 'next';

const BASE = 'https://mis-gastos-web-three.vercel.app';

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

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['es', 'en'];
  const routes = ['', '/features', '/descargas', '/docs'];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Main pages
  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    }
  }

  // Doc pages — 11 slugs × 2 locales = 22 entries
  for (const locale of locales) {
    for (const slug of DOC_SLUGS) {
      entries.push({
        url: `${BASE}/${locale}/docs/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
