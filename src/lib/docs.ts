import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface DocFrontmatter {
  title: string;
  description: string;
  slug: string;
  order: number;
  icon: string;
}

export interface DocMeta extends DocFrontmatter {
  locale: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'docs');

export const DOC_SLUGS = [
  '01-introduccion',
  '02-cuentas',
  '03-transacciones',
  '04-categorias',
  '05-monedas',
  '06-informes',
  '07-deudas',
  '08-inversiones',
  '09-backup',
  '10-actualizaciones',
  '11-faq',
] as const;

export type DocSlug = (typeof DOC_SLUGS)[number];

export function getDocMeta(locale: string, slug: string): DocMeta | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);

  return {
    locale,
    title: data.title ?? slug,
    description: data.description ?? '',
    slug: data.slug ?? slug,
    order: data.order ?? 0,
    icon: data.icon ?? 'BookOpen',
  };
}

export function getAllDocsMeta(locale: string): DocMeta[] {
  return DOC_SLUGS.map((slug) => getDocMeta(locale, slug)).filter(
    (d): d is DocMeta => d !== null
  );
}
