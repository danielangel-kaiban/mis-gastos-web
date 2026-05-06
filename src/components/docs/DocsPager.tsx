'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DOC_SECTIONS } from './DocsSidebar';

interface DocsPagerProps {
  locale: string;
  currentSlug: string;
}

export function DocsPager({ locale, currentSlug }: DocsPagerProps) {
  const t = useTranslations('docs');
  const idx = DOC_SECTIONS.findIndex((s) => s.slug === currentSlug);

  const prev = idx > 0 ? DOC_SECTIONS[idx - 1] : null;
  const next = idx < DOC_SECTIONS.length - 1 ? DOC_SECTIONS[idx + 1] : null;

  return (
    <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
      {prev ? (
        <Link
          href={`/${locale}/docs/${prev.slug}`}
          className="group flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:bg-muted hover:text-foreground text-muted-foreground max-w-[45%]"
        >
          <ChevronLeft size={16} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <span className="flex flex-col">
            <span className="text-xs text-muted-foreground">{t('pager_prev')}</span>
            <span className="font-medium text-foreground truncate">{t(`section_${prev.slug}`)}</span>
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/${locale}/docs/${next.slug}`}
          className="group flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:bg-muted hover:text-foreground text-muted-foreground max-w-[45%] ml-auto text-right"
        >
          <span className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">{t('pager_next')}</span>
            <span className="font-medium text-foreground truncate">{t(`section_${next.slug}`)}</span>
          </span>
          <ChevronRight size={16} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
