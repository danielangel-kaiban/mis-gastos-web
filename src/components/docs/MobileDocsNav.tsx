'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { DocsSidebar } from './DocsSidebar';
import { useTranslations } from 'next-intl';

interface MobileDocsNavProps {
  locale: string;
}

export function MobileDocsNav({ locale }: MobileDocsNavProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('docs');

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
        aria-label={t('mobile_menu_open')}
      >
        <Menu size={16} />
        <span>{t('mobile_menu_label')}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-border shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-foreground">{t('sidebar_label')}</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 hover:bg-muted transition-colors"
                aria-label={t('mobile_menu_close')}
              >
                <X size={18} />
              </button>
            </div>
            <div onClick={() => setOpen(false)}>
              <DocsSidebar locale={locale} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
