'use client';

import { motion } from 'framer-motion';
import { Download, Settings, TrendingUp } from 'lucide-react';

interface HowItWorksProps {
  title: string;
  subtitle: string;
  steps: Array<{
    title: string;
    desc: string;
  }>;
}

const STEP_ICONS = [Download, Settings, TrendingUp];

export default function HowItWorks({ title, subtitle, steps }: HowItWorksProps) {
  return (
    <section className="py-20 sm:py-28 bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.666%+1.5rem)] right-[calc(16.666%+1.5rem)] h-px bg-border" />

          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="relative flex flex-col items-center text-center md:items-center"
              >
                {/* Step number + icon */}
                <div className="relative mb-5">
                  <div className="flex size-20 items-center justify-center rounded-2xl bg-card border border-border shadow-sm relative z-10">
                    <Icon size={28} className="text-primary" strokeWidth={1.6} />
                  </div>
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold z-20">
                    {i + 1}
                  </span>
                </div>

                {/* Text */}
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
