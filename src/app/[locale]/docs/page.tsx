import { useTranslations } from 'next-intl';

export default function DocsPage() {
  const t = useTranslations('docs');

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      <p className="text-muted-foreground">{t('subtitle')}</p>
    </div>
  );
}
