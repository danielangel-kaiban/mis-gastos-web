'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { Moon, Sun, Languages } from 'lucide-react';

export default function Header() {
  const t = useTranslations('nav');
  const tLocale = useTranslations('locale');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'dark' || (!stored && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  function switchLocale() {
    const next = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-lg">
          Mis Gastos
        </Link>

        {/* Nav */}
        <nav aria-label="Navegación principal" className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
            {t('home')}
          </Link>
          <Link href="/features" className="text-foreground/70 hover:text-foreground transition-colors">
            {t('features')}
          </Link>
          <Link href="/docs" className="text-foreground/70 hover:text-foreground transition-colors">
            {t('docs')}
          </Link>
          <Link href="/descargas" className="text-foreground/70 hover:text-foreground transition-colors">
            {t('downloads')}
          </Link>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Locale switch */}
          <button
            onClick={switchLocale}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
            aria-label={tLocale('switch_to')}
          >
            <Languages className="h-4 w-4" />
            <span>{tLocale('switch_to')}</span>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="rounded-md p-2 text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
