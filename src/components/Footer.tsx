import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 text-sm text-muted-foreground">
        <p>{t('copyright', { year })}</p>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-muted-foreground/60">v1.1.1</span>
          <a
            href="https://github.com/dukagin/mis-gastos"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            {t('privacy')}
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            {t('contact')}
          </a>
        </div>
      </div>
    </footer>
  );
}
