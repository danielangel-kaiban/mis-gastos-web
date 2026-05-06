import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Use the Rust-based MDX compiler (mdxRs) which is Turbopack-compatible.
// remark-gfm tables/strikethrough are supported natively via the `development` flag.
// rehype-slug and heading anchor IDs are handled via a lightweight client-side
// TableOfContents component (DOM querySelectorAll) — no rehype plugin needed.
const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    // Empty options object — plain & serializable, Turbopack-compatible.
    // GFM (tables, strikethrough, task lists) is ON by default in @mdx-js/mdx v3+.
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    // Use the Rust MDX compiler for Turbopack compatibility
    mdxRs: true,
  },
};

export default withNextIntl(withMDX(nextConfig));
