'use client';
import Link from 'next/link';
import { MetricsOverview } from '@/components/admin/MetricsOverview';
import { StockAlerts } from '@/components/admin/StockAlerts';
import { ExcelUploader } from '@/components/admin/ExcelUploader';
import { Package, Users, ShoppingCart, ArrowLeft, RefreshCw } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-dvh pt-24 pb-16">
      <div className="container-app space-y-8">

        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--glass-border)] pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-2"
            >
              <ArrowLeft size={14} /> Volver a la tienda
            </Link>
            <h1 className="text-display-lg text-[var(--text-cream)]">Panel ERP / Dashboard</h1>
            <p className="text-sm text-[var(--text-muted)]">Resumen comercial y gestión omnicanal en tiempo real</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/inventory">
              <GlassButton variant="ghost" size="sm">
                <Package size={14} /> Inventario
              </GlassButton>
            </Link>
            <Link href="/admin/crm">
              <GlassButton variant="ghost" size="sm">
                <Users size={14} /> CRM Clientas
              </GlassButton>
            </Link>
          </div>
        </div>

        {/* KPIs */}
        <section className="space-y-3">
          <h2 className="font-display text-xl text-[var(--text-cream)]">Métricas clave del día</h2>
          <MetricsOverview />
        </section>

        {/* Main Grid: Stock Alerts & Fast CSV Sync */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StockAlerts />
          <ExcelUploader />
        </div>

      </div>
    </div>
  );
}
