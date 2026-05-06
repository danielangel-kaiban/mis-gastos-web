import type { Metadata } from 'next';
import { PdfCover } from '@/components/docs/PdfCover';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ locale: string }> };

export default async function PdfCoverPage({ params }: Props) {
  const { locale } = await params;
  const safeLocale = locale === 'en' ? 'en' : 'es';
  const version = '1.1.1';
  const date = new Date().toISOString().split('T')[0];

  return (
    <PdfCover
      locale={safeLocale}
      version={version}
      date={date}
    />
  );
}
