import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({ icon: Icon, title, description, index: _index }: FeatureCardProps) {
  return (
    <div
      className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
    >
      {/* Icon */}
      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-1.5">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
    </div>
  );
}
