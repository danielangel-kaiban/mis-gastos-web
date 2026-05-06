import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDocMeta, DOC_SLUGS } from '@/lib/docs';
import { TableOfContents } from '@/components/docs/TableOfContents';
import { DocsBreadcrumb } from '@/components/docs/DocsBreadcrumb';
import { DocsPager } from '@/components/docs/DocsPager';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ['es', 'en'];
  return locales.flatMap((locale) =>
    DOC_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = getDocMeta(locale, slug);
  if (!meta) return {};

  const title = `${meta.title} — Mis Gastos Docs`;
  const BASE = 'https://mis-gastos-web-three.vercel.app';

  return {
    title,
    description: meta.description,
    openGraph: {
      title,
      description: meta.description,
      url: `${BASE}/${locale}/docs/${slug}`,
      siteName: 'Mis Gastos',
      images: [
        {
          url: `${BASE}/opengraph-image?title=${encodeURIComponent(meta.title)}`,
          width: 1200,
          height: 630,
        },
      ],
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'article',
    },
  };
}

export default async function DocPage({ params }: Props) {
  const { locale, slug } = await params;
  const meta = getDocMeta(locale, slug);
  if (!meta) notFound();

  // Dynamic import of the MDX file
  let DocContent: React.ComponentType;
  try {
    const mod = await import(`../../../../../content/docs/${locale}/${slug}.mdx`);
    DocContent = mod.default;
  } catch {
    notFound();
  }

  return (
    <div className="flex gap-10 xl:gap-14">
      {/* Doc body */}
      <article className="min-w-0 flex-1">
        <DocsBreadcrumb locale={locale} docTitle={meta.title} />

        <div id="doc-content" className="prose-docs">
          <DocContent />
        </div>

        <DocsPager locale={locale} currentSlug={slug} />
      </article>

      {/* Desktop TOC */}
      <aside className="hidden xl:block w-52 shrink-0">
        <div className="sticky top-24">
          <TableOfContents />
        </div>
      </aside>
    </div>
  );
}
