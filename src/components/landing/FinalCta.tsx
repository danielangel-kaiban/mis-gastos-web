'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Download } from 'lucide-react';

interface FinalCtaProps {
  title: string;
  subtitle: string;
  btn: string;
}

export default function FinalCta({ title, subtitle, btn }: FinalCtaProps) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative overflow-hidden rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center"
          style={{
            background: 'linear-gradient(135deg, #00897B 0%, #005F56 60%, #003D38 100%)',
          }}
        >
          {/* Background decoration */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full opacity-20 blur-3xl"
            style={{ background: '#4DB6AC' }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 size-60 rounded-full opacity-15 blur-3xl"
            style={{ background: '#80CBC4' }}
          />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 max-w-2xl mx-auto">
              {title}
            </h2>
            <p className="text-lg text-white/75 mb-10 max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            <Link
              href="/descargas"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-[#00897B] shadow-xl hover:bg-white/90 transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              <Download size={18} strokeWidth={2.2} />
              {btn}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
