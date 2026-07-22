'use client';
import Image from 'next/image';
import { Crown, Gift, Star, Package, ChevronRight, Clock } from 'lucide-react';
import { CURRENT_CUSTOMER } from '@/lib/mock-data';
import { getOrdersByCustomer } from '@/lib/mock-data';
import { formatPrice, formatDate, RANK_COLORS, RANK_LABELS, rankProgressPercent } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { GlassButton } from '@/components/ui/GlassButton';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { EditorialNavbar } from '@/components/editorial/EditorialNavbar';
import { EditorialFooter } from '@/components/editorial/EditorialFooter';

const RANK_ICONS: Record<string, string> = {
  bronce: '🥉',
  plata:  '🥈',
  oro:    '🥇',
};

const ORDER_STATUS_LABELS: Record<string, string> = {
  pending:   'Pendiente',
  confirmed: 'Confirmado',
  shipped:   'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

export default function ProfilePage() {
  const customer = CURRENT_CUSTOMER;
  const orders   = getOrdersByCustomer(customer.id);
  const [claimedCoupons, setClaimedCoupons] = useState<string[]>([]);

  const rankColor  = RANK_COLORS[customer.loyalty.rank];
  const rankLabel  = RANK_LABELS[customer.loyalty.rank];
  const progress   = rankProgressPercent(customer.loyalty.points, customer.loyalty.rank);

  return (
    <div className="min-h-dvh bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col justify-between">
      <EditorialNavbar />
      <div className="container-app max-w-2xl py-12 space-y-6 flex-1">

        {/* ── Header de perfil ── */}
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2"
              style={{ borderColor: rankColor }}>
              <Image src={customer.avatarUrl} alt={customer.name} width={80} height={80} className="object-cover" unoptimized />
            </div>
            <span className="absolute -bottom-1 -right-1 text-xl">{RANK_ICONS[customer.rank]}</span>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-display-md text-[var(--text-cream)]">{customer.name}</h1>
            <p className="text-sm text-[var(--text-muted)] mb-3">{customer.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-[var(--text-muted)]">
              <span>{customer.totalOrders} compras</span>
              <span>·</span>
              <span>{formatPrice(customer.totalSpent)} gastados</span>
            </div>
          </div>
        </div>

        {/* ── Rank & Puntos ── */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown size={18} style={{ color: rankColor }} />
              <h2 className="font-display text-xl" style={{ color: rankColor }}>
                Clienta {rankLabel}
              </h2>
            </div>
            <Badge variant="rank">{rankLabel}</Badge>
          </div>

          {/* Points */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--text-muted)]">Puntos acumulados</span>
              <span className="font-bold" style={{ color: rankColor }}>
                {customer.loyalty.points.toLocaleString('es-PY')} pts
              </span>
            </div>
            <ProgressBar
              value={progress}
              color={rankColor}
              height="thick"
              animated
            />
            {customer.loyalty.nextRank && (
              <p className="text-xs text-[var(--text-muted)] mt-1.5">
                Te faltan <span className="text-[var(--text-cream)] font-semibold">{customer.loyalty.pointsToNextRank} puntos</span> para alcanzar {RANK_LABELS[customer.loyalty.nextRank]}
              </p>
            )}
            {!customer.loyalty.nextRank && (
              <p className="text-xs mt-1.5" style={{ color: rankColor }}>
                ¡Sos nuestra clienta más exclusiva! 🌟
              </p>
            )}
          </div>

          {/* Rank benefits */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { rank: 'Bronce', pts: '0–999', benefits: '5% off' },
              { rank: 'Plata',  pts: '1000–1999', benefits: '10% off + envío' },
              { rank: 'Oro',    pts: '2000+', benefits: '15% off + VIP' },
            ].map((r) => (
              <div
                key={r.rank}
                className={cn(
                  'p-2.5 rounded-xl text-center transition-all',
                  r.rank.toLowerCase() === customer.rank ? 'ring-1' : 'opacity-50'
                )}
                style={{
                  background: 'var(--glass-bg)',
                  border: `1px solid ${r.rank.toLowerCase() === customer.rank ? rankColor : 'var(--glass-border)'}`,
                }}
              >
                <p className="text-xs font-semibold text-[var(--text-cream)]">{RANK_ICONS[r.rank.toLowerCase()]} {r.rank}</p>
                <p className="text-[10px] text-[var(--text-dim)] mt-0.5">{r.pts} pts</p>
                <p className="text-[10px] font-medium mt-1" style={{ color: r.rank.toLowerCase() === customer.rank ? rankColor : 'var(--text-dim)' }}>{r.benefits}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cupones ── */}
        {customer.coupons.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Gift size={16} style={{ color: 'var(--primary)' }} />
              <h2 className="font-display text-xl text-[var(--text-cream)]">Mis Beneficios</h2>
            </div>
            {customer.coupons.map((coupon) => {
              const claimed = claimedCoupons.includes(coupon.id);
              return (
                <div
                  key={coupon.id}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{
                    background: claimed ? 'var(--bg-surface)' : 'var(--primary-muted)',
                    border: `1px solid ${claimed ? 'var(--glass-border)' : 'var(--primary)'}`,
                    opacity: claimed ? 0.6 : 1,
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-bold tracking-wider" style={{ color: 'var(--primary)' }}>
                        {coupon.code}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-cream)]">{coupon.description}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 flex items-center gap-1">
                      <Clock size={10} /> Vence: {formatDate(coupon.expiresAt)}
                    </p>
                  </div>
                  <GlassButton
                    size="sm"
                    variant={claimed ? 'ghost' : 'primary'}
                    disabled={claimed}
                    onClick={() => setClaimedCoupons((p) => [...p, coupon.id])}
                  >
                    {claimed ? 'Usado' : 'Reclamar'}
                  </GlassButton>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Historial de compras ── */}
        {orders.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Package size={16} style={{ color: 'var(--primary)' }} />
              <h2 className="font-display text-xl text-[var(--text-cream)]">Mis Compras</h2>
            </div>
            {orders.map((order) => (
              <GlassCard key={order.id} hover={false} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-cream)]">Pedido #{order.id.toUpperCase()}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{formatDate(order.createdAt)}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {order.items.length} producto{order.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                      {formatPrice(order.total)}
                    </p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                      style={{
                        background: order.status === 'delivered'
                          ? 'rgba(76,175,116,0.15)'
                          : order.status === 'shipped'
                          ? 'var(--primary-muted)'
                          : 'var(--glass-bg)',
                        color: order.status === 'delivered'
                          ? 'var(--accent-success)'
                          : order.status === 'shipped'
                          ? 'var(--primary)'
                          : 'var(--text-muted)',
                        border: '1px solid currentColor',
                      }}
                    >
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Star size={16} />, label: 'Puntos totales', value: `${customer.loyalty.points.toLocaleString('es-PY')} pts` },
            { icon: <Package size={16} />, label: 'Compras', value: customer.totalOrders },
            { icon: <Crown size={16} />, label: 'Nivel', value: rankLabel },
            { icon: <Gift size={16} />, label: 'Cupones activos', value: customer.coupons.filter((c) => c.isActive).length },
          ].map((stat, i) => (
            <GlassCard key={i} hover={false} className="p-4 flex items-center gap-3">
              <div style={{ color: 'var(--primary)' }}>{stat.icon}</div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                <p className="text-base font-semibold text-[var(--text-cream)]">{stat.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      <EditorialFooter />
    </div>
  );
}
