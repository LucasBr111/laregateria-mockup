'use client';
import { KPIS } from '@/lib/mock-data';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export function MetricsOverview() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {KPIS.map((kpi, idx) => (
        <GlassCard key={idx} hover={false} className="p-4 flex flex-col justify-between">
          <p className="text-xs text-[var(--text-muted)] tracking-wider uppercase">{kpi.label}</p>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-display text-2xl font-light text-[var(--text-cream)]">
              {kpi.value}
            </span>
            <span
              className={`inline-flex items-center text-xs font-semibold ${
                kpi.isPositive ? 'text-[var(--accent-success)]' : 'text-[var(--accent-sale)]'
              }`}
            >
              {kpi.isPositive ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
              {kpi.change > 0 ? `+${kpi.change}%` : `${kpi.change}%`}
            </span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
