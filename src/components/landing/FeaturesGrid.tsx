'use client';

import {
  Wallet,
  ArrowLeftRight,
  Tag,
  BarChart3,
  TrendingUp,
  WifiOff,
  Globe,
  Archive,
  CreditCard,
} from 'lucide-react';
import FeatureCard from './FeatureCard';

interface FeaturesGridProps {
  title: string;
  subtitle: string;
  features: {
    accounts_title: string;
    accounts_desc: string;
    transactions_title: string;
    transactions_desc: string;
    categories_title: string;
    categories_desc: string;
    reports_title: string;
    reports_desc: string;
    debts_title: string;
    debts_desc: string;
    investments_title: string;
    investments_desc: string;
    offline_title: string;
    offline_desc: string;
    currencies_title: string;
    currencies_desc: string;
    backup_title: string;
    backup_desc: string;
  };
}

export default function FeaturesGrid({ title, subtitle, features }: FeaturesGridProps) {
  const items = [
    { icon: Wallet, title: features.accounts_title, description: features.accounts_desc },
    { icon: ArrowLeftRight, title: features.transactions_title, description: features.transactions_desc },
    { icon: Tag, title: features.categories_title, description: features.categories_desc },
    { icon: BarChart3, title: features.reports_title, description: features.reports_desc },
    { icon: CreditCard, title: features.debts_title, description: features.debts_desc },
    { icon: TrendingUp, title: features.investments_title, description: features.investments_desc },
    { icon: WifiOff, title: features.offline_title, description: features.offline_desc },
    { icon: Globe, title: features.currencies_title, description: features.currencies_desc },
    { icon: Archive, title: features.backup_title, description: features.backup_desc },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
