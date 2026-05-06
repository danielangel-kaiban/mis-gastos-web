import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import {
  Wallet,
  ArrowLeftRight,
  Tag,
  Globe,
  BarChart3,
  CreditCard,
  TrendingUp,
  Archive,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === 'es'
      ? 'Mis Gastos — Funciones'
      : 'Mis Gastos — Features';
  const description =
    locale === 'es'
      ? 'Explorá todas las funciones de Mis Gastos: cuentas, transacciones, categorías, informes, deudas, inversiones y más.'
      : 'Explore all features of Mis Gastos: accounts, transactions, categories, reports, debts, investments, and more.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mis-gastos-web-three.vercel.app/${locale}/features`,
      siteName: 'Mis Gastos',
      images: [{ url: 'https://mis-gastos-web-three.vercel.app/og.png', width: 1200, height: 630 }],
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
  };
}

interface FeatureSectionProps {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  reversed?: boolean;
}

function FeatureSection({ id, icon: Icon, title, subtitle, description, bullets, reversed }: FeatureSectionProps) {
  return (
    <section id={id} className="py-16 sm:py-20 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-start ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Text */}
          <div className="flex-1">
            {/* Icon + tag */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon size={22} strokeWidth={1.7} />
              </div>
              <span className="text-sm font-medium text-primary">{subtitle}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
              {description}
            </p>

            {/* Bullets */}
            <ul className="space-y-3">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0 text-primary" strokeWidth={2} />
                  <span className="text-sm text-foreground">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative card */}
          <div className="flex-shrink-0 w-full lg:w-72">
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={20} strokeWidth={1.7} />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 bg-muted rounded-full w-3/4" />
                <div className="h-2.5 bg-muted rounded-full w-full" />
                <div className="h-2.5 bg-muted rounded-full w-5/6" />
              </div>
              <div className="pt-2 space-y-2">
                {bullets.slice(0, 3).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                    <div className="h-2 bg-muted rounded-full flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-16">
        <hr className="border-border" />
      </div>
    </section>
  );
}

export default async function FeaturesDetailPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'features_page' });

  const sections: FeatureSectionProps[] = [
    {
      id: 'cuentas',
      icon: Wallet,
      title: t('accounts_title'),
      subtitle: t('accounts_subtitle'),
      description: t('accounts_desc'),
      bullets: [
        t('accounts_bullet1'),
        t('accounts_bullet2'),
        t('accounts_bullet3'),
        t('accounts_bullet4'),
        t('accounts_bullet5'),
      ],
    },
    {
      id: 'transacciones',
      icon: ArrowLeftRight,
      title: t('transactions_title'),
      subtitle: t('transactions_subtitle'),
      description: t('transactions_desc'),
      bullets: [
        t('transactions_bullet1'),
        t('transactions_bullet2'),
        t('transactions_bullet3'),
        t('transactions_bullet4'),
        t('transactions_bullet5'),
      ],
      reversed: true,
    },
    {
      id: 'categorias',
      icon: Tag,
      title: t('categories_title'),
      subtitle: t('categories_subtitle'),
      description: t('categories_desc'),
      bullets: [
        t('categories_bullet1'),
        t('categories_bullet2'),
        t('categories_bullet3'),
        t('categories_bullet4'),
      ],
    },
    {
      id: 'monedas',
      icon: Globe,
      title: t('currencies_title'),
      subtitle: t('currencies_subtitle'),
      description: t('currencies_desc'),
      bullets: [
        t('currencies_bullet1'),
        t('currencies_bullet2'),
        t('currencies_bullet3'),
        t('currencies_bullet4'),
      ],
      reversed: true,
    },
    {
      id: 'informes',
      icon: BarChart3,
      title: t('reports_title'),
      subtitle: t('reports_subtitle'),
      description: t('reports_desc'),
      bullets: [
        t('reports_bullet1'),
        t('reports_bullet2'),
        t('reports_bullet3'),
        t('reports_bullet4'),
        t('reports_bullet5'),
      ],
    },
    {
      id: 'deudas',
      icon: CreditCard,
      title: t('debts_title'),
      subtitle: t('debts_subtitle'),
      description: t('debts_desc'),
      bullets: [
        t('debts_bullet1'),
        t('debts_bullet2'),
        t('debts_bullet3'),
        t('debts_bullet4'),
      ],
      reversed: true,
    },
    {
      id: 'inversiones',
      icon: TrendingUp,
      title: t('investments_title'),
      subtitle: t('investments_subtitle'),
      description: t('investments_desc'),
      bullets: [
        t('investments_bullet1'),
        t('investments_bullet2'),
        t('investments_bullet3'),
        t('investments_bullet4'),
      ],
    },
    {
      id: 'backup',
      icon: Archive,
      title: t('backup_title'),
      subtitle: t('backup_subtitle'),
      description: t('backup_desc'),
      bullets: [
        t('backup_bullet1'),
        t('backup_bullet2'),
        t('backup_bullet3'),
        t('backup_bullet4'),
      ],
      reversed: true,
    },
    {
      id: 'actualizaciones',
      icon: RefreshCw,
      title: t('ota_title'),
      subtitle: t('ota_subtitle'),
      description: t('ota_desc'),
      bullets: [
        t('ota_bullet1'),
        t('ota_bullet2'),
        t('ota_bullet3'),
      ],
    },
  ];

  return (
    <div className="pt-10">
      {/* Page header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t('subtitle')}</p>

        {/* Anchor nav */}
        <nav aria-label="Ir a sección" className="mt-10 flex flex-wrap justify-center gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <s.icon size={13} strokeWidth={1.8} />
              {s.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Feature sections */}
      {sections.map((section) => (
        <FeatureSection key={section.id} {...section} />
      ))}
    </div>
  );
}
