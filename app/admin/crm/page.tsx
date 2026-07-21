'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CUSTOMERS } from '@/lib/mock-data';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { GlassButton } from '@/components/ui/GlassButton';
import { ArrowLeft, MessageCircle, ShoppingBag, Crown, Phone, Mail } from 'lucide-react';
import { RANK_COLORS, RANK_LABELS } from '@/lib/utils';
import type { Customer } from '@/types';

export default function CrmAdminPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(CUSTOMERS[0]);

  return (
    <div className="min-h-dvh pt-24 pb-16">
      <div className="container-app space-y-8">

        {/* Top Header */}
        <div className="border-b border-[var(--glass-border)] pb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Volver al Dashboard
          </Link>
          <h1 className="text-display-lg text-[var(--text-cream)]">CRM — Ficha 360° de Clientas</h1>
          <p className="text-sm text-[var(--text-muted)]">Historial de compras, nivel de fidelización y recuperación de carritos por WhatsApp</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Customer List */}
          <div className="space-y-3">
            <h2 className="font-display text-xl text-[var(--text-cream)]">Clientas Registradas</h2>
            {CUSTOMERS.map((cust) => {
              const active = cust.id === selectedCustomer.id;
              const rankColor = RANK_COLORS[cust.rank];
              return (
                <GlassCard
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className={`p-4 transition-all cursor-pointer ${
                    active ? 'border-[var(--primary)] bg-[var(--primary-muted)]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cust.avatarUrl}
                      alt={cust.name}
                      className="w-12 h-12 rounded-full object-cover border border-[var(--glass-border)]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[var(--text-cream)] truncate">{cust.name}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{cust.email}</p>
                    </div>
                    <Badge variant="rank" style={{ borderColor: rankColor, color: rankColor }}>
                      {RANK_LABELS[cust.rank]}
                    </Badge>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Right Column: Customer 360 Detail View */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard hover={false} className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--glass-border)] pb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedCustomer.avatarUrl}
                    alt={selectedCustomer.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[var(--primary)]"
                  />
                  <div>
                    <h3 className="font-display text-2xl text-[var(--text-cream)]">{selectedCustomer.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-1">
                      <span className="flex items-center gap-1"><Mail size={12} /> {selectedCustomer.email}</span>
                      <span className="flex items-center gap-1"><Phone size={12} /> {selectedCustomer.phone}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${selectedCustomer.name}! Te escribimos de La Regatería ✨`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlassButton size="sm">
                    <MessageCircle size={14} /> WhatsApp Directo
                  </GlassButton>
                </a>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-center">
                  <p className="text-[10px] uppercase text-[var(--text-muted)]">Nivel Rango</p>
                  <p className="font-display text-lg text-[var(--primary)] capitalize font-semibold">{selectedCustomer.rank}</p>
                </div>
                <div className="p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-center">
                  <p className="text-[10px] uppercase text-[var(--text-muted)]">Puntos Acumulados</p>
                  <p className="font-display text-lg text-[var(--text-cream)] font-semibold">{selectedCustomer.loyalty.points} pts</p>
                </div>
                <div className="p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-center">
                  <p className="text-[10px] uppercase text-[var(--text-muted)]">Pedidos Totales</p>
                  <p className="font-display text-lg text-[var(--text-cream)] font-semibold">{selectedCustomer.totalOrders}</p>
                </div>
                <div className="p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-center">
                  <p className="text-[10px] uppercase text-[var(--text-muted)]">Total Invertido</p>
                  <p className="font-display text-lg text-[var(--primary)] font-semibold">Gs. {selectedCustomer.totalSpent.toLocaleString('es-PY')}</p>
                </div>
              </div>

              {/* Abandoned Cart Recovery Widget Simulation */}
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                    <ShoppingBag size={16} />
                    <span>Carrito Abandonado Pendiente (Hace 2h)</span>
                  </div>
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono font-bold">
                    Gs. 320.000
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  La clienta dejó 1 variante en su carrito (Vestido Midi Satén Negro - Talle S).
                </p>
                <div className="flex justify-end gap-2">
                  <a
                    href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${selectedCustomer.name}! Notamos que dejaste tu Vestido Midi Satén en el carrito 🛍️. ¡Usá el cupón ${selectedCustomer.coupons[0]?.code ?? 'VIP10'} para tener 10% OFF hoy!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GlassButton size="sm" variant="ghost">
                      <MessageCircle size={14} /> Recuperar vía WhatsApp con Cupón
                    </GlassButton>
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

        </div>

      </div>
    </div>
  );
}
