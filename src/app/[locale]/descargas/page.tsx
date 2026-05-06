import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Smartphone, FileText, Download } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === 'es' ? 'Mis Gastos — Descargas' : 'Mis Gastos — Downloads';
  const description =
    locale === 'es'
      ? 'Descargá el APK de Mis Gastos para Android. Instalación directa, sin Google Play.'
      : 'Download the Mis Gastos APK for Android. Direct install, no Google Play required.';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mis-gastos-web-three.vercel.app/${locale}/descargas`,
      siteName: 'Mis Gastos',
      images: [{ url: 'https://mis-gastos-web-three.vercel.app/og.png', width: 1200, height: 630 }],
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
  };
}

const APK_VERSION = '1.1.1';
const APK_BUILD = 3;
const APK_SIZE = '24.9';
const APK_DATE = '2026-04-15';
const APK_URL = '/downloads/mis_gastos-1.1.1+3-release.apk';

const PDF_ES_URL = '/downloads/mis-gastos-docs-es.pdf';
const PDF_EN_URL = '/downloads/mis-gastos-docs-en.pdf';
const PDF_ES_SIZE = '0.6';
const PDF_EN_SIZE = '0.6';

export default async function DescargasPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('downloads');
  const isEs = locale === 'es';

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Top row: APK + primary PDF */}
      <div className="grid gap-6 sm:grid-cols-2 mb-6">
        {/* Android APK card */}
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-semibold text-card-foreground">{t('android_title')}</h2>
          </div>

          <p className="text-sm text-muted-foreground">{t('android_desc')}</p>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div>
              <dt className="text-muted-foreground">{t('android_version', { version: APK_VERSION })}</dt>
              <dd className="text-muted-foreground">{t('android_size', { size: APK_SIZE })}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{t('android_build', { build: APK_BUILD })}</dt>
              <dd className="text-muted-foreground">{t('android_date', { date: APK_DATE })}</dd>
            </div>
          </dl>

          <a
            href={APK_URL}
            download
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            {t('android_btn')}
          </a>

          <p className="text-xs text-muted-foreground border-t border-border pt-3">
            {t('install_warning')}
          </p>
        </div>

        {/* Primary PDF card (locale-matching language first) */}
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-semibold text-card-foreground">
              {isEs ? t('docs_es_title') : t('docs_en_title')}
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            {isEs ? t('docs_es_desc') : t('docs_en_desc')}
          </p>

          <p className="text-sm text-muted-foreground">
            {t('docs_size', { size: isEs ? PDF_ES_SIZE : PDF_EN_SIZE })}
          </p>

          <a
            href={isEs ? PDF_ES_URL : PDF_EN_URL}
            download
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            {isEs ? t('docs_btn_es') : t('docs_btn_en')}
          </a>
        </div>
      </div>

      {/* Secondary PDF card (other language) */}
      <div className="grid gap-6 sm:grid-cols-2 mb-12">
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4 opacity-90">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-muted p-2.5">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="font-semibold text-card-foreground">
              {isEs ? t('docs_en_title') : t('docs_es_title')}
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            {isEs ? t('docs_en_desc') : t('docs_es_desc')}
          </p>

          <p className="text-sm text-muted-foreground">
            {t('docs_size', { size: isEs ? PDF_EN_SIZE : PDF_ES_SIZE })}
          </p>

          <a
            href={isEs ? PDF_EN_URL : PDF_ES_URL}
            download
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Download className="h-4 w-4" />
            {isEs ? t('docs_btn_en') : t('docs_btn_es')}
          </a>
        </div>
        <div /> {/* spacer */}
      </div>

      {/* Changelog */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-semibold mb-4 text-card-foreground">{t('changelog_title')}</h2>

        <div className="space-y-4 text-sm">
          <section>
            <h3 className="font-medium text-brand-accent-red mb-2">{t('changelog_fixed')}</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Transacciones, deudas, cuentas, categorías, monedas e inversiones ahora se pueden eliminar con deslizar-izquierda.</li>
              <li>Pagos de deuda se pueden editar y eliminar individualmente; la deuda se resincroniza automáticamente.</li>
              <li>Movimientos de inversión: editar y eliminar con menú de 3 puntos; eliminar revierte el efecto en el valor actual.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium text-brand-accent-green mb-2">{t('changelog_added')}</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Historial de pagos editable dentro del formulario de cada deuda.</li>
              <li>Botón &ldquo;Borrar todos los datos&rdquo; en Copia de seguridad.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium text-foreground/80 mb-2">{t('changelog_changed')}</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Eliminaciones en cascada: borrar una deuda/inversión remueve pagos/movimientos; borrar un pago o movimiento vinculado elimina también la transacción asociada.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
