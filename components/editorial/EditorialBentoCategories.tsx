'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface BentoItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  gridClass: string;
}

const BENTO_CATEGORIES: BentoItem[] = [
  {
    id: 'vestidos',
    title: 'Vestidos de Noche',
    subtitle: 'Satén fluido & alta elegancia.',
    href: '/catalog?cat=vestidos',
    image: 'img/dress.png',
    gridClass: 'col-span-2 md:col-span-2 row-span-2 min-h-[360px] md:min-h-[520px]',
  },
  {
    id: 'gym',
    title: 'Gym Sculpt',
    subtitle: 'Alta compresión.',
    href: '/catalog?cat=gym',
    image: 'img/gym.png',
    gridClass: 'col-span-1 row-span-1 min-h-[220px] md:min-h-[250px]',
  },
  {
    id: 'new',
    title: 'Novedades',
    subtitle: 'Lanzamientos.',
    href: '/catalog?cat=new',
    image: '/img/new.png',
    gridClass: 'col-span-1 row-span-1 min-h-[220px] md:min-h-[250px]',
  },
  {
    id: 'clientes',
    title: 'Colección Cápsula',
    subtitle: 'Looks curados.',
    href: '/catalog?cat=clientes',
    image: '/img/collection.png',
    gridClass: 'col-span-2 md:col-span-2 row-span-1 min-h-[220px] md:min-h-[250px]',
  },
];

export function EditorialBentoCategories() {
  return (
    <section className="py-20 lg:py-32 bg-[var(--bg-base)]">
      <div className="container-app space-y-10">

        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="editorial-label">EXPLORAR UNIVERSOS</p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[var(--text-primary)]">
            Colecciones Curadas
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] font-sans font-light max-w-md mx-auto">
            Cada universo responde a una intención estética y textil particular.
          </p>
        </div>

        {/* Bento Grid Layout (Mobile-first 2 cols to 4 cols) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {BENTO_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`relative overflow-hidden group border border-[var(--border-subtle)] ${cat.gridClass}`}
            >
              {/* Category Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                unoptimized
              />

              {/* Subtle Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-300" />

              {/* Card Content */}
              <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between z-10">
                <div className="flex justify-end">
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-none border border-white/20 bg-black/40 text-white flex items-center justify-center group-hover:bg-[var(--accent-gold)] group-hover:text-black group-hover:border-[var(--accent-gold)] transition-all">
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-light">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-neutral-300 font-sans font-light max-w-sm">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
