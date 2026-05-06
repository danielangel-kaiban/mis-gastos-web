'use client';

import Image from 'next/image';

type MockupVariant = 'home' | 'transactions' | 'reports';

interface AppMockupProps {
  variant?: MockupVariant;
  className?: string;
  priority?: boolean;
}

const MOCKUP_CONFIG: Record<MockupVariant, { src: string; alt: string }> = {
  home: {
    src: '/mockups/home.svg',
    alt: 'Pantalla principal de Mis Gastos con patrimonio total y cuentas',
  },
  transactions: {
    src: '/mockups/transactions.svg',
    alt: 'Lista de transacciones con categorías y montos',
  },
  reports: {
    src: '/mockups/reports.svg',
    alt: 'Informes con gráficos de categorías y patrimonio',
  },
};

export default function AppMockup({
  variant = 'home',
  className = '',
  priority = false,
}: AppMockupProps) {
  const config = MOCKUP_CONFIG[variant];

  return (
    <div
      className={`relative mx-auto drop-shadow-2xl ${className}`}
      style={{ maxWidth: 280 }}
    >
      {/* Phone frame glow */}
      <div
        className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-30"
        style={{ background: 'radial-gradient(ellipse at center, #00897B 0%, transparent 70%)' }}
      />
      {/* Screen */}
      <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
        <Image
          src={config.src}
          alt={config.alt}
          width={390}
          height={844}
          className="w-full h-auto"
          priority={priority}
          preload={priority}
          unoptimized
        />
      </div>
    </div>
  );
}
