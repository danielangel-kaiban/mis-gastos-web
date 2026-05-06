import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { MobileDocsNav } from '@/components/docs/MobileDocsNav';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DocsLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <div className="relative min-h-screen">
      {/* Mobile top bar */}
      <div className="sticky top-16 z-40 flex h-12 items-center gap-3 border-b border-border bg-background/95 backdrop-blur px-4 lg:hidden">
        <MobileDocsNav locale={locale} />
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        <div className="flex gap-8 lg:gap-12">
          {/* Desktop sidebar — sticky */}
          <aside className="hidden lg:flex w-56 xl:w-64 shrink-0 flex-col py-10">
            <div className="sticky top-24">
              <DocsSidebar locale={locale} />
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1 py-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
