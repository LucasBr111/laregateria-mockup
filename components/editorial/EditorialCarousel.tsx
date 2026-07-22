'use client';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { EditorialBadge } from '@/components/ui/EditorialBadge';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { ChevronRight, ArrowRight } from 'lucide-react';

export function EditorialCarousel() {
  const products = getFeaturedProducts();

  return (
    <section className="py-20 lg:py-32 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
      <div className="container-app space-y-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <EditorialHeading
            label="CURADURÍA DESTACADA"
            title="Piezas Emblemáticas"
            subtitle="Las prendas más codiciadas de nuestra colección actual."
          />
          <Link href="/catalog" className="btn-editorial-link shrink-0">
            Ver Catálogo <ArrowRight size={14} />
          </Link>
        </div>

        {/* Horizontal Snap Scroll Carousel */}
        <div className="flex gap-6 overflow-x-auto scroll-snap-x scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {products.map((product) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;
            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="shrink-0 w-[240px] sm:w-[280px] lg:w-[320px] group flex flex-col space-y-3"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[3/4] w-full bg-[var(--bg-surface)] overflow-hidden border border-[var(--border-subtle)] group-hover:border-[var(--border-medium)] transition-colors">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    unoptimized
                  />

                  {/* Top Rectangular Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.isNew && <EditorialBadge variant="new">NUEVO</EditorialBadge>}
                    {product.isSale && <EditorialBadge variant="sale">OFERTA</EditorialBadge>}
                    {!product.isNew && !product.isSale && (
                      <EditorialBadge variant="gold">RESTOCK PRONTO</EditorialBadge>
                    )}
                  </div>
                </div>

                {/* Info Container */}
                <div className="space-y-1 text-left">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent-gold)] font-semibold">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-xl font-light text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 pt-0.5">
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
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
