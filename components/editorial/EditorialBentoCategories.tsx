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
    title: 'Vestidos de Noche & Gala',
    subtitle: 'Satén fluido, cortes midi y siluetas de alta elegancia.',
    href: '/catalog?cat=vestidos',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=85',
    gridClass: 'col-span-1 md:col-span-2 row-span-2 min-h-[420px] md:min-h-[560px]',
  },
  {
    id: 'gym',
    title: 'Gym & Activewear',
    subtitle: 'Línea Sculpt de alta compresión.',
    href: '/catalog?cat=gym',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=700&q=85',
    gridClass: 'col-span-1 row-span-1 min-h-[260px] md:min-h-[270px]',
  },
  {
    id: 'new',
    title: 'Lanzamientos Recientes',
    subtitle: 'Novedades de la semana.',
    href: '/catalog?cat=new',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=85',
    gridClass: 'col-span-1 row-span-1 min-h-[260px] md:min-h-[270px]',
  },
  {
    id: 'clientes',
    title: 'Colección Cápsula',
    subtitle: 'Looks curados por estilistas.',
    href: '/catalog?cat=clientes',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=85',
    gridClass: 'col-span-1 md:col-span-2 row-span-1 min-h-[240px] md:min-h-[270px]',
  },
];

export function EditorialBentoCategories() {
  return (
    <section className="py-20 lg:py-32 bg-[var(--bg-base)]">
      <div className="container-app space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="editorial-label">EXPLORAR UNIVERSOS</p>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[var(--text-primary)]">
              Colecciones Curadas
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-sans max-w-xs uppercase tracking-wider">
            Cada línea responde a una intención estética particular.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                <div className="flex justify-end">
                  <span className="w-8 h-8 rounded-none border border-white/20 bg-black/30 text-white flex items-center justify-center group-hover:bg-[var(--accent-gold)] group-hover:text-black group-hover:border-[var(--accent-gold)] transition-all">
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-light">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans font-light max-w-sm">
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
