'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { formatPrice, discountPercent, stockLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem    = useCartStore((s) => s.addItem);
  const [liked, setLiked]       = useState(false);
  const [adding, setAdding]     = useState(false);

  // Primer variante disponible
  const firstAvailableVariant = product.variants.find((v) => v.stock > 0);
  const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
  const { label: stockLbl, level: stockLevel } = stockLabel(totalStock);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstAvailableVariant) return;
    setAdding(true);
    addItem(product, firstAvailableVariant, 1);
    setTimeout(() => setAdding(false), 1000);
  };

  return (
    <Link href={`/product/${product.id}`} className={cn('block group', className)}>
      <article className="glass-card overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[3/4] img-zoom-wrap bg-[var(--bg-surface)] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-108"
            unoptimized
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges top */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew   && <Badge variant="new">Nuevo</Badge>}
            {product.isSale  && product.originalPrice && (
              <Badge variant="sale">-{discountPercent(product.originalPrice, product.price)}%</Badge>
            )}
            {stockLevel === 'low' && (
              <Badge variant="stock-low">{stockLbl}</Badge>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked((l) => !l); }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-[var(--glass-border)] backdrop-blur-sm transition-all hover:border-[var(--primary)] hover:scale-110"
            aria-label="Guardar"
          >
            <Heart
              size={14}
              className={cn('transition-colors', liked ? 'fill-[var(--primary)] text-[var(--primary)]' : 'text-white')}
            />
          </button>

          {/* Quick add button — aparece en hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!firstAvailableVariant || adding}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-200',
                firstAvailableVariant
                  ? 'btn-primary'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed',
                adding && 'scale-95'
              )}
            >
              {adding ? (
                <>
                  <span className="w-3.5 h-3.5 border border-black border-t-transparent rounded-full animate-spin" />
                  Agregado
                </>
              ) : firstAvailableVariant ? (
                <>
                  <ShoppingBag size={13} />
                  Agregar
                </>
              ) : (
                'Sin stock'
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3.5 flex flex-col gap-1 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[var(--primary)] font-medium">
            {product.category === 'vestidos' ? 'Vestidos'
              : product.category === 'gym' ? 'Gym'
              : product.category === 'new' ? 'Novedades'
              : 'Clientas'}
          </p>
          <h3 className="font-display text-base font-light text-[var(--text-cream)] leading-tight line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={11} className="fill-[var(--primary)] text-[var(--primary)]" />
            <span className="text-xs text-[var(--text-muted)]">{product.rating}</span>
            <span className="text-xs text-[var(--text-dim)]">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto pt-2">
            <span className="font-semibold text-sm text-[var(--text-cream)]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[var(--text-dim)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
