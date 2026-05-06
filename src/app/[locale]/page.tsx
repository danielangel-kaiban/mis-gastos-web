import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroAnimated from '@/components/landing/HeroAnimated';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import FinalCta from '@/components/landing/FinalCta';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const title =
    locale === 'es'
      ? 'Mis Gastos — Tu dinero, bajo control'
      : 'Mis Gastos — Your money, under control';
  const description =
    locale === 'es'
      ? 'Administra gastos, cuentas, deudas e inversiones. 100% offline, sin nube. Android APK gratis.'
      : 'Manage expenses, accounts, debts, and investments. 100% offline, cloud-free. Free Android APK.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mis-gastos-web-three.vercel.app/${locale}`,
      siteName: 'Mis Gastos',
      images: [
        {
          url: 'https://mis-gastos-web-three.vercel.app/og.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://mis-gastos-web-three.vercel.app/og.png'],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const featureStrings = {
    accounts_title: t('feature_accounts_title'),
    accounts_desc: t('feature_accounts_desc'),
    transactions_title: t('feature_transactions_title'),
    transactions_desc: t('feature_transactions_desc'),
    categories_title: t('feature_categories_title'),
    categories_desc: t('feature_categories_desc'),
    reports_title: t('feature_reports_title'),
    reports_desc: t('feature_reports_desc'),
    debts_title: t('feature_debts_title'),
    debts_desc: t('feature_debts_desc'),
    investments_title: t('feature_investments_title'),
    investments_desc: t('feature_investments_desc'),
    offline_title: t('feature_offline_title'),
    offline_desc: t('feature_offline_desc'),
    currencies_title: t('feature_currencies_title'),
    currencies_desc: t('feature_currencies_desc'),
    backup_title: t('feature_backup_title'),
    backup_desc: t('feature_backup_desc'),
  };

  const howItWorksSteps = [
    { title: t('step1_title'), desc: t('step1_desc') },
    { title: t('step2_title'), desc: t('step2_desc') },
    { title: t('step3_title'), desc: t('step3_desc') },
  ];

  return (
    <>
      <HeroAnimated
        badge={t('version_badge', { version: '1.1.1' })}
        title={t('hero_title')}
        subtitle={t('hero_subtitle')}
        ctaDownload={t('cta_download')}
        ctaFeatures={t('cta_features')}
      />

      <FeaturesGrid
        title={t('features_title')}
        subtitle={t('features_subtitle')}
        features={featureStrings}
      />

      <HowItWorks
        title={t('how_it_works_title')}
        subtitle={t('how_it_works_subtitle')}
        steps={howItWorksSteps}
      />

      <FinalCta
        title={t('final_cta_title')}
        subtitle={t('final_cta_subtitle')}
        btn={t('final_cta_btn')}
      />
    </>
  );
}
