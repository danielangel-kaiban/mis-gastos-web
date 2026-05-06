import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-20 text-center">
      {/* Badge */}
      <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
        {t('version_badge', { version: '1.1.1' })}
      </span>

      {/* Hero */}
      <h1 className="max-w-2xl text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4">
        {t('hero_title')}
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground mb-10">
        {t('hero_subtitle')}
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/descargas"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          {t('cta_download')}
        </Link>
        <Link
          href="/features"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
        >
          {t('cta_features')}
        </Link>
      </div>
    </div>
  );
}
