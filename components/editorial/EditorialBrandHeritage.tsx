'use client';
import Image from 'next/image';
import Link from 'next/link';
import { EditorialButton } from '@/components/ui/EditorialButton';

export function EditorialBrandHeritage() {
  return (
    <section id="heritage" className="py-20 lg:py-32 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Campaign Image */}
          <div className="relative aspect-[3/4] w-full border border-[var(--border-subtle)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=85"
              alt="Atelier La Regatería"
              fill
              className="object-cover"
              unoptimized
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/40 via-transparent to-transparent" />
          </div>

          {/* Right: Story & Editorial Metrics */}
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="editorial-label">NUESTRO HERITAGE</p>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-[var(--text-primary)] leading-tight">
                Diseño textil concebido con rigor artesanal.
              </h2>
            </div>

            <p className="text-sm md:text-base text-[var(--text-secondary)] font-sans font-light leading-relaxed">
              La Regatería nace como una respuesta a la producción masiva indiferenciada. Diseñamos cápsulas limitadas trabajando con sastres y confeccionistas locales en Paraguay, cuidando la tensión de cada costura y la fluidez natural de cada caída.
            </p>

            {/* Editorial Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[var(--border-subtle)]">
              <div>
                <span className="font-serif text-4xl lg:text-5xl font-light text-[var(--accent-gold)] block">
                  03
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] font-medium mt-1 block">
                  Colecciones Exclusivas
                </span>
              </div>

              <div>
                <span className="font-serif text-4xl lg:text-5xl font-light text-[var(--accent-gold)] block">
                  100%
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] font-medium mt-1 block">
                  Diseño Nacional
                </span>
              </div>

              <div>
                <span className="font-serif text-3xl lg:text-4xl font-light text-[var(--accent-gold)] block pt-1">
                  2024
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] font-medium mt-1 block">
                  Fundación Atelier
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link href="/catalog">
                <EditorialButton variant="ghost">
                  Conocer la Filosofía de Confección
                </EditorialButton>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
