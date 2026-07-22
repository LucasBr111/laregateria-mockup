'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { formatPrice, cn } from '@/lib/utils';
import { EditorialBadge } from '@/components/ui/EditorialBadge';

interface EditorialProductCardProps {
  product: Product;
  className?: string;
}

export function EditorialProductCard({ product, className }: EditorialProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [liked, setLiked]   = useState(false);
  const [adding, setAdding] = useState(false);

  const firstAvailableVariant = product.variants.find((v) => v.stock > 0);
  const availableSizes = [...new Set(product.variants.map((v) => v.size))];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstAvailableVariant) return;
    setAdding(true);
    addItem(product, firstAvailableVariant, 1);
    setTimeout(() => setAdding(false), 900);
  };

  const statusLabel = !firstAvailableVariant
    ? 'RESTOCK PRONTO'
    : product.isNew
    ? 'NUEVO'
    : 'RESERVA';

  return (
    <Link href={`/product/${product.id}`} className={cn('block group', className)}>
      <article className="editorial-card overflow-hidden h-full flex flex-col bg-[var(--bg-surface)] border border-[var(--border-subtle)] group-hover:border-[var(--accent-gold)] transition-all duration-300">
        
        {/* Image Container with Badges */}
        <div className="relative aspect-[3/4] w-full bg-[var(--bg-surface-elevated)] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            unoptimized
          />

          {/* Top Right Gold Rectangular Badge */}
          <div className="absolute top-3 right-3 z-10">
            <EditorialBadge variant="gold">
              {statusLabel}
            </EditorialBadge>
          </div>

          {/* Wishlist Button Top Left */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-[var(--bg-base)]/70 border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-all z-10"
            aria-label="Wishlist"
          >
            <Heart size={14} className={cn(liked && 'fill-[var(--accent-gold)] text-[var(--accent-gold)]')} />
          </button>
        </div>

        {/* Info Box (Matching Theme Tokens 100%) */}
        <div className="p-4 flex flex-col justify-between flex-1 space-y-3 text-left bg-[var(--bg-surface)] text-[var(--text-primary)]">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[9px] tracking-[0.2em] uppercase text-[var(--accent-gold)] font-bold">
              <span>{statusLabel}</span>
              <span className="opacity-70">{statusLabel}</span>
            </div>
            <h3 className="font-serif text-lg font-light text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="font-sans font-semibold text-sm text-[var(--text-primary)] pt-0.5">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Sizes Row */}
          <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-[var(--text-secondary)] pt-1">
            <span className="font-bold text-[var(--text-muted)]">TALLES:</span>
            <div className="flex gap-1 flex-wrap">
              {availableSizes.map((s) => (
                <span key={s} className="px-1.5 py-0.5 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Oval Action Button (Theme-aware) */}
          <div className="pt-2">
            <button
              onClick={handleQuickAdd}
              disabled={!firstAvailableVariant || adding}
              className="w-full py-2.5 px-4 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--accent-gold)] hover:text-black hover:border-[var(--accent-gold)] transition-all duration-300"
            >
              {adding ? 'AGREGADO' : firstAvailableVariant ? 'ADQUIRIR PIEZA' : 'RESTOCK PRONTO'}
            </button>
          </div>

        </div>

      </article>
    </Link>
  );
}
