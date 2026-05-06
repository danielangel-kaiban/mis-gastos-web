import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, id }) => (
      <h1
        id={id}
        className="scroll-mt-20 text-3xl font-bold tracking-tight text-foreground mb-4 mt-8 first:mt-0"
      >
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2
        id={id}
        className="scroll-mt-20 text-2xl font-semibold tracking-tight text-foreground mb-3 mt-10 border-b border-border pb-2"
      >
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3
        id={id}
        className="scroll-mt-20 text-lg font-semibold text-foreground mb-2 mt-7"
      >
        {children}
      </h3>
    ),
    h4: ({ children, id }) => (
      <h4
        id={id}
        className="scroll-mt-20 text-base font-semibold text-foreground mb-2 mt-5"
      >
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-base leading-7 text-muted-foreground mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-4 ml-6 space-y-1.5 list-disc [&>li]:text-muted-foreground [&>li]:leading-7">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 ml-6 space-y-1.5 list-decimal [&>li]:text-muted-foreground [&>li]:leading-7">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      // Block code (has language class) vs inline code
      if (className) {
        return (
          <code className={`${className} text-sm`}>{children}</code>
        );
      }
      return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-foreground">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm text-zinc-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-zinc-100">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="my-4 w-full overflow-auto rounded-lg border border-border">
        <table className="w-full text-sm caption-bottom">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted/50 [&_tr]:border-b">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-border transition-colors hover:bg-muted/30">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 align-middle text-muted-foreground">{children}</td>
    ),
    hr: () => <hr className="my-8 border-border" />,
    a: ({ href, children }) => {
      if (href?.startsWith('/') || href?.startsWith('#')) {
        return (
          <Link
            href={href}
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    ...components,
  };
}
