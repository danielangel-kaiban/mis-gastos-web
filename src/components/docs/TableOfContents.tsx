'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const t = useTranslations('docs');

  useEffect(() => {
    // Collect headings from the prose area
    const article = document.getElementById('doc-content');
    if (!article) return;

    const els = article.querySelectorAll('h2, h3');
    const items: Heading[] = Array.from(els)
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent ?? '',
        level: el.tagName === 'H2' ? 2 : 3,
      }));
    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="flex flex-col gap-0.5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {t('toc_label')}
      </p>
      {headings.map(({ id, text, level }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            'block rounded py-1 text-sm leading-5 transition-colors',
            level === 3 && 'pl-3',
            activeId === id
              ? 'text-primary font-medium'
              : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            setActiveId(id);
          }}
        >
          {text}
        </a>
      ))}
    </nav>
  );
}
