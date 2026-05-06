import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  BookOpen,
  Wallet,
  ArrowLeftRight,
  Tag,
  Globe,
  BarChart3,
  UserMinus,
  TrendingUp,
  Archive,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === 'es' ? 'Documentación — Mis Gastos' : 'Documentation — Mis Gastos';
  const description =
    locale === 'es'
      ? 'Guías completas para dominar Mis Gastos: cuentas, transacciones, informes, deudas, inversiones y más.'
      : 'Complete guides to master Mis Gastos: accounts, transactions, reports, debts, investments, and more.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mis-gastos-web-three.vercel.app/${locale}/docs`,
      siteName: 'Mis Gastos',
      images: [{ url: 'https://mis-gastos-web-three.vercel.app/og.png', width: 1200, height: 630 }],
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
  };
}

const SECTION_ICONS = [
  BookOpen,
  Wallet,
  ArrowLeftRight,
  Tag,
  Globe,
  BarChart3,
  UserMinus,
  TrendingUp,
  Archive,
  RefreshCw,
  HelpCircle,
];

const SLUGS = [
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

export default async function DocsIndexPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'docs' });

  return (
    <div>
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          <BookOpen size={12} />
          {t('index_badge')}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
          {t('index_title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
          {t('index_subtitle')}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SLUGS.map((slug, i) => {
          const Icon = SECTION_ICONS[i];
          return (
            <Link
              key={slug}
              href={`/${locale}/docs/${slug}`}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon size={18} strokeWidth={1.7} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-foreground text-sm leading-5">
                    {t(`section_${slug}`)}
                  </span>
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-5 line-clamp-2">
                  {t(`section_${slug}_desc`)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="mt-10 text-sm text-muted-foreground">
        {t('index_footer_note')}
      </p>
    </div>
  );
}
