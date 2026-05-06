import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// JavaScript MDX compiler (not mdxRs) to support remark plugins.
// mdxRs (Rust compiler) cannot run JS remark/rehype plugins, so we keep it off.
// remark-frontmatter strips YAML frontmatter from MDX output.
// remark-mdx-frontmatter exports frontmatter fields as named ESM exports.
// remark-gfm adds GFM tables, strikethrough, and task lists.
const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkGfm,
    ],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

export default withNextIntl(withMDX(nextConfig));
