'use client';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ChevronRight, Truck } from 'lucide-react';
import { useCartStore, useUIStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { EditorialButton } from '@/components/ui/EditorialButton';
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
      {/* Dark Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 animate-fade-in"
        onClick={closeCart}
      />

      {/* 100% OPAQUE SOLID DRAWER (Non-transparent) */}
      <div className="relative w-full max-w-md h-full bg-[var(--bg-base)] text-[var(--text-primary)] border-l border-[var(--border-medium)] shadow-2xl flex flex-col z-10 animate-slide-in-right opacity-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[var(--accent-gold)]" />
            <h2 className="font-serif text-xl font-light text-[var(--text-primary)] tracking-wide">
              Tu Carrito
            </h2>
            {items.length > 0 && (
              <span className="text-xs font-mono text-[var(--text-muted)]">({items.length})</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items Container */}
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-3 bg-[var(--bg-base)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <ShoppingBag size={28} className="text-[var(--text-muted)]" />
              </div>
              <p className="text-[var(--text-primary)] font-serif text-lg">Tu carrito está vacío</p>
              <p className="text-xs text-[var(--text-muted)] font-sans">Explorá nuestras colecciones exclusivas</p>
              <Link href="/catalog" onClick={closeCart}>
                <EditorialButton variant="ghost" size="sm">Ver catálogo</EditorialButton>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variant.id}
                className="flex gap-3 p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] transition-all"
              >
                {/* Image */}
                <div className="relative w-20 h-24 overflow-hidden shrink-0 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-serif font-medium text-[var(--text-primary)] leading-snug line-clamp-2">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">
                      {item.variant.size} / {item.variant.color}
                    </p>
                    <p className="text-xs font-semibold text-[var(--accent-gold)] mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.variant.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-xs w-5 text-center font-mono text-[var(--text-primary)]">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.variant.id, item.quantity + 1)}
                      disabled={item.quantity >= item.variant.stock}
                      className="w-6 h-6 flex items-center justify-center border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all disabled:opacity-40"
                    >
                      <Plus size={10} />
                    </button>

                    <button
                      onClick={() => removeItem(item.variant.id)}
                      className="ml-auto text-[var(--text-muted)] hover:text-[var(--accent-sale)] transition-colors p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-4">
            {/* Zona de envío */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)] font-semibold mb-2">
                <Truck size={12} /> Zona de envío
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ZONES.map((z) => (
                  <button
                    key={z}
                    onClick={() => setZone(z)}
                    className="text-left px-3 py-2 text-xs transition-all border"
                    style={{
                      background: zone === z ? 'var(--bg-base)' : 'var(--bg-surface-elevated)',
                      borderColor: zone === z ? 'var(--accent-gold)' : 'var(--border-subtle)',
                      color: zone === z ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    }}
                  >
                    <span className="font-semibold block">{SHIPPING_LABELS[z].split(' (')[0]}</span>
                    {z !== 'retiro' && (
                      <span className="block text-[10px] opacity-75">
                        Gs. {SHIPPING_COSTS[z].toLocaleString('es-PY')}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Totales */}
            <div className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {zone && (
                <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
                </div>
              )}
              <div className="flex justify-between font-serif text-xl font-light text-[var(--text-primary)] pt-1">
                <span>Total</span>
                <span className="text-[var(--accent-gold)]">{formatPrice(total)}</span>
              </div>
            </div>

            {/* CTA */}
            <Link href="/checkout" onClick={closeCart} className="block pt-1">
              <EditorialButton fullWidth size="lg">
                Ir al Checkout <ChevronRight size={14} />
              </EditorialButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
