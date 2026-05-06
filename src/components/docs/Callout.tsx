'use client';

import { Info, AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'warning' | 'tip' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, {
  icon: React.ElementType;
  wrapper: string;
  iconClass: string;
  border: string;
}> = {
  info: {
    icon: Info,
    wrapper: 'bg-primary/5 dark:bg-primary/10',
    iconClass: 'text-primary',
    border: 'border-primary/30',
  },
  warning: {
    icon: AlertTriangle,
    wrapper: 'bg-amber-50 dark:bg-amber-950/30',
    iconClass: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-300 dark:border-amber-700',
  },
  tip: {
    icon: Lightbulb,
    wrapper: 'bg-emerald-50 dark:bg-emerald-950/30',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-300 dark:border-emerald-700',
  },
  danger: {
    icon: AlertCircle,
    wrapper: 'bg-red-50 dark:bg-red-950/30',
    iconClass: 'text-red-600 dark:text-red-400',
    border: 'border-red-300 dark:border-red-700',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon: Icon, wrapper, iconClass, border } = config[type];

  return (
    <div
      className={cn(
        'my-5 flex gap-3 rounded-lg border px-4 py-3.5',
        wrapper,
        border
      )}
    >
      <Icon className={cn('mt-0.5 size-4 shrink-0', iconClass)} />
      <div className="flex-1 text-sm leading-6">
        {title && (
          <p className="mb-0.5 font-semibold text-foreground">{title}</p>
        )}
        <div className="text-muted-foreground [&>p]:mb-0 [&>p]:leading-6">
          {children}
        </div>
      </div>
    </div>
  );
}
