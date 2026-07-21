'use client';
import { STOCK_ALERTS } from '@/lib/mock-data';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';

export function StockAlerts() {
  return (
    <GlassCard hover={false} className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={18} className="text-[var(--accent-sale)]" />
        <h3 className="font-display text-lg text-[var(--text-cream)]">Alertas de Stock Bajo</h3>
      </div>
      <div className="space-y-3">
        {STOCK_ALERTS.map((alert, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]"
          >
            <div>
              <p className="text-sm font-medium text-[var(--text-cream)]">{alert.productName}</p>
              <p className="text-xs text-[var(--text-muted)]">Variante: {alert.variant}</p>
            </div>
            <Badge variant={alert.currentStock === 0 ? 'stock-out' : 'stock-low'}>
              {alert.currentStock === 0 ? 'Agotado' : `Quedan ${alert.currentStock}`}
            </Badge>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
