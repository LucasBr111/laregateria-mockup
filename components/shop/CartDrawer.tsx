'use client';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ChevronRight, Truck } from 'lucide-react';
import { useCartStore, useUIStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { GlassButton } from '@/components/ui/GlassButton';
import { useEffect } from 'react';
import type { ShippingZone } from '@/types';
import { SHIPPING_LABELS, SHIPPING_COSTS } from '@/types';

const ZONES: ShippingZone[] = ['asuncion', 'gran-asuncion', 'interior', 'retiro'];

export function CartDrawer() {
  const cartOpen   = useUIStore((s) => s.cartOpen);
  const closeCart  = useUIStore((s) => s.closeCart);
  const items      = useCartStore((s) => s.items);
  const updateQty  = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal   = useCartStore((s) => s.subtotal());
  const shipping   = useCartStore((s) => s.shippingCost());
  const total      = useCartStore((s) => s.total());
  const zone       = useCartStore((s) => s.shippingZone);
  const setZone    = useCartStore((s) => s.setShippingZone);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full glass-drawer flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--glass-border)]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} style={{ color: 'var(--primary)' }} />
            <h2 className="font-display text-xl font-light text-[var(--text-cream)]">
              Tu Carrito
            </h2>
            {items.length > 0 && (
              <span className="text-xs text-[var(--text-muted)]">({items.length})</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--glass-border)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                <ShoppingBag size={28} style={{ color: 'var(--text-dim)' }} />
              </div>
              <p className="text-[var(--text-muted)] font-display text-lg">Tu carrito está vacío</p>
              <p className="text-sm text-[var(--text-dim)]">Explorá nuestras colecciones</p>
              <Link href="/catalog" onClick={closeCart}>
                <GlassButton variant="ghost" size="sm">Ver catálogo</GlassButton>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variant.id}
                className="flex gap-3 p-3 rounded-xl transition-all"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
              >
                {/* Image */}
                <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-[var(--bg-surface)]">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[var(--text-cream)] leading-snug line-clamp-2">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {item.variant.size} / {item.variant.color}
                  </p>
                  <p className="text-sm font-semibold mt-1" style={{ color: 'var(--primary)' }}>
                    {formatPrice(item.product.price * item.quantity)}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.variant.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-sm w-5 text-center text-[var(--text-cream)]">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.variant.id, item.quantity + 1)}
                      disabled={item.quantity >= item.variant.stock}
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all disabled:opacity-40"
                    >
                      <Plus size={10} />
                    </button>

                    <button
                      onClick={() => removeItem(item.variant.id)}
                      className="ml-auto text-[var(--text-dim)] hover:text-[var(--accent-sale)] transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--glass-border)] p-5 space-y-4">
            {/* Zona de envío */}
            <div>
              <label className="flex items-center gap-1.5 text-xs tracking-wider uppercase text-[var(--text-muted)] mb-2">
                <Truck size={12} />
                Zona de envío
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {ZONES.map((z) => (
                  <button
                    key={z}
                    onClick={() => setZone(z)}
                    className="text-left px-2.5 py-1.5 rounded-lg text-xs transition-all"
                    style={{
                      background: zone === z ? 'var(--primary-muted)' : 'var(--glass-bg)',
                      border: `1px solid ${zone === z ? 'var(--primary)' : 'var(--glass-border)'}`,
                      color: zone === z ? 'var(--primary)' : 'var(--text-muted)',
                    }}
                  >
                    {SHIPPING_LABELS[z].split(' (')[0]}
                    {z !== 'retiro' && (
                      <span className="block text-[10px] opacity-60">
                        Gs. {SHIPPING_COSTS[z].toLocaleString('es-PY')}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Totales */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-[var(--text-muted)]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {zone && (
                <div className="flex justify-between text-sm text-[var(--text-muted)]">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
                </div>
              )}
              <div className="divider-gold" />
              <div className="flex justify-between font-semibold text-base text-[var(--text-cream)]">
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>{formatPrice(total)}</span>
              </div>
            </div>

            {/* CTA */}
            <Link href="/checkout" onClick={closeCart}>
              <GlassButton fullWidth size="lg">
                Ir al checkout
                <ChevronRight size={16} />
              </GlassButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
