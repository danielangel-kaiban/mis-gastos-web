'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface DocsBreadcrumbProps {
  locale: string;
  docTitle?: string;
}

export function DocsBreadcrumb({ locale, docTitle }: DocsBreadcrumbProps) {
  const t = useTranslations('docs');

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
      <BookOpen size={14} className="shrink-0" />
      <Link
        href={`/${locale}/docs`}
        className="hover:text-foreground transition-colors"
      >
        {t('breadcrumb_docs')}
      </Link>
      {docTitle && (
        <>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {docTitle}
          </span>
        </>
      )}
    </nav>
  );
}
