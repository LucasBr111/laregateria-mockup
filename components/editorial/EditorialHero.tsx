'use client';
import Image from 'next/image';
import Link from 'next/link';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { ArrowRight } from 'lucide-react';

export function EditorialHero() {
  return (
    <section className="relative min-h-[85dvh] lg:min-h-[92dvh] flex items-center justify-start overflow-hidden bg-[var(--bg-base)]">
      {/* Background Image with Campaign Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85"
          alt="Campaña La Regatería"
          fill
          className="object-cover object-top opacity-85 scale-102 transition-transform duration-1000"
          priority
          unoptimized
        />
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent opacity-90" />
      </div>

      {/* Hero Content Container */}
      <div className="container-app relative z-10 py-20 lg:py-32">
        <div className="max-w-2xl space-y-6">

          {/* Season Tag */}
          <div className="inline-block px-3 py-1 bg-black/40 backdrop-blur-xs border border-white/15 text-white text-[10px] uppercase tracking-[0.25em] font-semibold">
            COLECCIÓN 01 / 2025
          </div>

          {/* Giant Serif Headline */}
          <h1 className="text-display-giant text-white font-serif font-light leading-[1.05] tracking-tight">
            La elegancia pertenece a quienes la habitan.
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-neutral-300 font-sans font-light max-w-lg leading-relaxed pt-2">
            Diseños estructurados con satén fluido, lino puro y textiles técnicos de alta compresión. Confección exclusiva en Paraguay.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <Link href="/catalog">
              <EditorialButton variant="primary" size="lg">
                Explorar Colección <ArrowRight size={14} />
              </EditorialButton>
            </Link>

            <Link href="/#heritage">
              <EditorialButton variant="ghost" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Conocer la Marca
              </EditorialButton>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
