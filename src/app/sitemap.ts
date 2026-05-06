import type { MetadataRoute } from 'next';

const BASE = 'https://mis-gastos-web-three.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['es', 'en'];
  const routes = ['', '/features', '/descargas', '/docs'];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

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

  return entries;
}
