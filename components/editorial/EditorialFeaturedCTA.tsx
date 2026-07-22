'use client';
import Image from 'next/image';
import Link from 'next/link';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { ArrowRight } from 'lucide-react';

export function EditorialFeaturedCTA() {
  return (
    <section className="py-20 lg:py-32 bg-[var(--bg-base)]">
      <div className="container-app">
        <div className="relative overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Left: Editorial Photo */}
            <div className="relative aspect-[4/3] lg:aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/img/collection2.png"
                alt="Edición Limitada La regalería"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Right: Editorial Content */}
            <div className="p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="space-y-2">
                <p className="editorial-label">CURADURÍA EXCLUSIVA</p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[var(--text-primary)] leading-tight">
                  Edición Limitada — Invierno / Otoño
                </h2>
              </div>

              <p className="text-sm text-[var(--text-secondary)] font-sans font-light leading-relaxed">
                Selección reducida de vestidos en satén y conjuntos de lino puro diseñados para eventos de etiqueta y ocasiones especiales.
              </p>

              <div className="pt-4">
                <Link href="/catalog">
                  <EditorialButton variant="primary" size="lg">
                    Ver Catálogo Completo <ArrowRight size={14} />
                  </EditorialButton>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
