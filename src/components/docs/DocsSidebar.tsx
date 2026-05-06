'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Wallet,
  ArrowLeftRight,
  Tag,
  Globe,
  BarChart3,
  UserMinus,
  TrendingUp,
  Archive,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

export const DOC_SECTIONS = [
  { slug: '01-introduccion', icon: BookOpen },
  { slug: '02-cuentas', icon: Wallet },
  { slug: '03-transacciones', icon: ArrowLeftRight },
  { slug: '04-categorias', icon: Tag },
  { slug: '05-monedas', icon: Globe },
  { slug: '06-informes', icon: BarChart3 },
  { slug: '07-deudas', icon: UserMinus },
  { slug: '08-inversiones', icon: TrendingUp },
  { slug: '09-backup', icon: Archive },
  { slug: '10-actualizaciones', icon: RefreshCw },
  { slug: '11-faq', icon: HelpCircle },
] as const;

interface DocsSidebarProps {
  locale: string;
}

export function DocsSidebar({ locale }: DocsSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('docs');

  return (
    <nav className="flex flex-col gap-0.5">
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {t('sidebar_label')}
      </p>
      {DOC_SECTIONS.map(({ slug, icon: Icon }) => {
        const href = `/${locale}/docs/${slug}`;
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={slug}
            href={href}
            className={cn(
              'group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon
              size={15}
              className={cn(
                'shrink-0',
                isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              )}
            />
            {t(`section_${slug}`)}
          </Link>
        );
      })}
    </nav>
  );
}
