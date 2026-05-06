import { Link } from '@/i18n/navigation';
import AppMockup from './AppMockup';

interface HeroAnimatedProps {
  badge: string;
  title: string;
  subtitle: string;
  ctaDownload: string;
  ctaFeatures: string;
}

export default function HeroAnimated({
  badge,
  title,
  subtitle,
  ctaDownload,
  ctaFeatures,
}: HeroAnimatedProps) {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
      {/* Background gradient blob */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[700px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, #00897B 0%, transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-center lg:gap-16">
          {/* Left: text */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                {badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground mb-5">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-start justify-center">
              <Link
                href="/descargas"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {ctaDownload}
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {ctaFeatures}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </div>

          {/* Right: mockups stacked */}
          <div className="mt-16 lg:mt-0 flex-shrink-0 flex items-center justify-center gap-4">
            {/* Secondary mockup (offset, smaller, behind) */}
            <div className="hidden sm:block translate-y-8 opacity-60 scale-90 origin-bottom">
              <AppMockup variant="transactions" className="w-[160px]" />
            </div>
            {/* Primary mockup */}
            <AppMockup variant="home" className="w-[220px] sm:w-[260px]" priority />
            {/* Third mockup (offset) */}
            <div className="hidden sm:block -translate-y-8 opacity-60 scale-90 origin-top">
              <AppMockup variant="reports" className="w-[160px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
