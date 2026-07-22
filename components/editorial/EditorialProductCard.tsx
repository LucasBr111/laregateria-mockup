'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { formatPrice, discountPercent } from '@/lib/utils';
import { EditorialBadge } from '@/components/ui/EditorialBadge';
import { cn } from '@/lib/utils';

interface EditorialProductCardProps {
  product: Product;
  className?: string;
}

export function EditorialProductCard({ product, className }: EditorialProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [liked, setLiked]   = useState(false);
  const [adding, setAdding] = useState(false);

  const firstAvailableVariant = product.variants.find((v) => v.stock > 0);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstAvailableVariant) return;
    setAdding(true);
    addItem(product, firstAvailableVariant, 1);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <Link href={`/product/${product.id}`} className={cn('block group', className)}>
      <article className="editorial-card overflow-hidden h-full flex flex-col bg-[var(--bg-surface)] border border-[var(--border-subtle)] group-hover:border-[var(--border-medium)] transition-all">
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full bg-[var(--bg-surface-elevated)] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            unoptimized
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top Badges (Rectangular, e.g. RESTOCK PRONTO, RESERVA, NUEVO, SALE) */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 items-end">
            {product.isNew && <EditorialBadge variant="new">NUEVO</EditorialBadge>}
            {product.isSale && hasDiscount && (
              <EditorialBadge variant="sale">
                -{discountPercent(product.originalPrice!, product.price)}%
              </EditorialBadge>
            )}
            {!product.isNew && !product.isSale && (
              <EditorialBadge variant="gold">
                {product.variants.every(v => v.stock === 0) ? 'RESERVA' : 'RESTOCK PRONTO'}
              </EditorialBadge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-black/40 border border-white/20 text-white hover:border-[var(--accent-gold)] transition-all"
            aria-label="Wishlist"
          >
            <Heart size={14} className={cn(liked && 'fill-[var(--accent-gold)] text-[var(--accent-gold)]')} />
          </button>

          {/* Quick Add CTA on Hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              onClick={handleQuickAdd}
              disabled={!firstAvailableVariant || adding}
              className="w-full btn-editorial-primary py-2.5 text-[10px] tracking-[0.2em]"
            >
              {adding ? 'AGREGADO' : firstAvailableVariant ? 'AGREGAR AL CARRITO' : 'SIN STOCK'}
            </button>
          </div>
        </div>

        {/* Card Info */}
        <div className="p-4 flex flex-col justify-between flex-1 space-y-2 text-left">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent-gold)] font-semibold">
              {product.category}
            </p>
            <h3 className="font-serif text-lg font-light text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1 border-t border-[var(--border-subtle)]">
            <span className="font-sans font-semibold text-sm text-[var(--text-primary)]">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="font-sans text-xs text-[var(--text-muted)] line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
