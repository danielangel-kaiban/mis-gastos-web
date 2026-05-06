interface StepsProps {
  children: React.ReactNode;
}

interface StepProps {
  number?: number;
  title: string;
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="my-6 ml-2 space-y-0 border-l-2 border-border pl-6">
      {children}
    </div>
  );
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="relative pb-8 last:pb-0">
      {/* Dot on the timeline */}
      <div className="absolute -left-[30px] flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-background">
        {number ?? ''}
      </div>
      <div className="pt-0.5">
        <h4 className="mb-2 font-semibold text-foreground">{title}</h4>
        <div className="text-sm text-muted-foreground leading-6 [&>p]:mb-2">
          {children}
        </div>
      </div>
    </div>
  );
}
