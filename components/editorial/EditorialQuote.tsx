'use client';
import Link from 'next/link';
import { EditorialButton } from '@/components/ui/EditorialButton';

export function EditorialQuote() {
  return (
    <section className="py-24 md:py-36 bg-[var(--bg-base)] border-y border-[var(--border-subtle)]">
      <div className="container-app max-w-4xl text-center space-y-8">

        {/* Small Editorial Label */}
        <p className="editorial-label tracking-[0.3em]">
          MANIFESTO DE MARCA
        </p>

        {/* Giant Serif Quote */}
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-[var(--text-primary)] leading-[1.18] tracking-tight">
          «No diseñamos para una sola temporada. Creamos siluetas atemporales que trascienden el tiempo y afirman tu propia presencia.»
        </h2>

        {/* Short Text */}
        <p className="text-sm md:text-base text-[var(--text-secondary)] font-sans font-light max-w-xl mx-auto leading-relaxed">
          Cada patrón es concebido en nuestro atelier en Asunción con un estándar de exigencia artesanal.
        </p>

        {/* CTA Link */}
        <div className="pt-4">
          <Link href="/catalog">
            <EditorialButton variant="link">
              Descubrir el Proceso Creativo
            </EditorialButton>
          </Link>
        </div>

      </div>
    </section>
  );
}
