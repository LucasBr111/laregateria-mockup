'use client';
import Image from 'next/image';
import Link from 'next/link';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { ArrowRight } from 'lucide-react';

export function EditorialHero() {
  return (
    <section className="relative min-h-[85dvh] lg:min-h-[92dvh] flex items-center justify-center text-center overflow-hidden bg-[var(--bg-base)]">
      {/* Background Image with Campaign Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/la-regaleria-hero2.png"
          alt="Campaña LA REGALERÍA"
          fill
          className="object-cover object-top opacity-80 transition-transform duration-1000"
          priority
          unoptimized
        />
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-black/40 to-black/30" />
      </div>

      {/* Hero Content Container (Centered) */}
      <div className="container-app relative z-10 py-20 lg:py-32 flex flex-col items-center">
        <div className="max-w-3xl space-y-6 flex flex-col items-center">

          {/* Season Tag */}
          <div className="inline-block px-3.5 py-1 bg-black/50 backdrop-blur-xs border border-white/20 text-white text-[10px] uppercase tracking-[0.25em] font-semibold">
            TEMPORADA 2026 • LA REGALERÍA
          </div>

          {/* Centered Giant Serif Headline */}
          <h1 className="text-display-giant text-white font-serif font-light leading-[1.05] tracking-tight">
            La elegancia pertenece a quienes la habitan.
          </h1>

          {/* Centered Subtitle */}
          <p className="text-sm md:text-base text-neutral-200 font-sans font-light max-w-xl leading-relaxed">
            Diseños estructurados con satén fluido, lino puro y textiles técnicos de alta compresión. Confección exclusiva en Paraguay.
          </p>

          {/* Centered CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Link href="/catalog">
              <EditorialButton variant="primary" size="lg">
                Explorar Catálogo <ArrowRight size={14} />
              </EditorialButton>
            </Link>

            <Link href="/#heritage">
              <EditorialButton variant="ghost" size="lg" className="border-white/40 text-white hover:bg-white/10">
                Nuestra Historia
              </EditorialButton>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
