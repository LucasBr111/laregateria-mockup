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
    <section className="py-16 md:py-24 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
      <div className="container-app space-y-10">

        {/* Header matching exact reference design */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
            <EditorialHeading
              label="EDICIONES DE LEGADO"
              title="CÁPSULA RETRO"
              subtitle="Colección exclusiva con textiles de alta densidad y cortes emblemáticos."
            />
            <Link href="/catalog" className="btn-editorial-link shrink-0">
              EXPLORAR TODO EL CATÁLOGO →
            </Link>
          </div>
        </ScrollReveal>

        {/* 3-Item Side-by-Side Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 120}>
              <EditorialProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
