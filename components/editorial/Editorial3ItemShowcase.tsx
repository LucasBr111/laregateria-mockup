'use client';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/mock-data';
import { EditorialProductCard } from '@/components/editorial/EditorialProductCard';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function Editorial3ItemShowcase() {
  // Take exactly 3 featured products
  const products = getFeaturedProducts().slice(0, 3);

  return (
    <section className="py-12 md:py-24 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
      <div className="container-app max-w-6xl mx-auto space-y-8 md:space-y-10">

        {/* Header Layout */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
            <EditorialHeading
              label="COLECCIÓN EXCLUSIVA"
              title="NUEVA TEMPORADA"
              subtitle="Colección exclusiva con textiles de alta densidad y cortes emblemáticos."
            />
            <Link href="/catalog" className="btn-editorial-link shrink-0">
              EXPLORAR TODO EL CATÁLOGO →
            </Link>
          </div>
        </ScrollReveal>

        {/* 3-Item Layout: Mobile 2 top + 1 centered bottom | Desktop 3 in a row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {products.map((product, idx) => {
            const isThirdOnMobile = idx === 2;
            return (
              <ScrollReveal
                key={product.id}
                delay={idx * 120}
                className={isThirdOnMobile ? 'col-span-2 md:col-span-1 max-w-[260px] md:max-w-none mx-auto w-full' : 'col-span-1'}
              >
                <EditorialProductCard product={product} />
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
