'use client';
import Image from 'next/image';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { getProducts } from '@/lib/mock-data';
import { EditorialNavbar } from '@/components/editorial/EditorialNavbar';
import { EditorialFooter } from '@/components/editorial/EditorialFooter';
import { EditorialProductCard } from '@/components/editorial/EditorialProductCard';
import type { ProductCategory } from '@/types';

const CATEGORIES: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all',      label: 'TODOS'     },
  { value: 'vestidos', label: 'VESTIDOS'  },
  { value: 'gym',      label: 'GYM & ACTIVEWEAR' },
  { value: 'new',      label: 'NOVEDADES' },
  { value: 'clientes', label: 'CÁPSULA'   },
];

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Más nuevos' },
  { value: 'price-asc',  label: 'Precio ↑'   },
  { value: 'price-desc', label: 'Precio ↓'   },
  { value: 'rating',     label: 'Populares'  },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCat   = (searchParams.get('cat') ?? 'all') as ProductCategory | 'all';

  const [activeCat, setActiveCat] = useState<ProductCategory | 'all'>(initialCat);
  const [sort, setSort]           = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  const allProducts = getProducts();

  const filtered = useMemo(() => {
    let list = activeCat === 'all' ? allProducts : allProducts.filter((p) => p.category === activeCat);

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
    }

    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCat, sort, searchTerm, allProducts]);

  return (
    <div className="min-h-dvh bg-[var(--bg-base)] text-[var(--text-primary)]">
      <EditorialNavbar />

      {/* ── 1. HERO HEADER CATALOG (REFERENCE DESIGN) ── */}
      <section className="relative min-h-[380px] lg:min-h-[460px] flex items-center justify-center text-center overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85"
            alt="Catálogo LA REGALERÍA"
            fill
            className="object-cover opacity-40"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-black/50 to-black/70" />
        </div>

        <div className="container-app relative z-10 space-y-4 py-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--accent-gold)] font-semibold">
            TEMPORADA 2026
          </p>
          <h1 className="text-display-giant text-white font-serif font-light tracking-widest uppercase">
            CATÁLOGO
          </h1>
          <p className="text-sm text-neutral-300 font-sans font-light max-w-md mx-auto">
            Explorá la colección completa de alta costura y activewear.
          </p>
        </div>
      </section>

      {/* ── 2. CONTROL BAR (PRODUCT COUNT, SEARCH & DROPDOWNS) ── */}
      <section className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-4">
        <div className="container-app flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Title & Count */}
          <div>
            <h2 className="font-serif text-2xl font-light tracking-wider text-[var(--text-primary)]">
              PRODUCTOS
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              {filtered.length} artículo{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Right: Search, Category & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-editorial pl-9 py-2 text-xs"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={activeCat}
              onChange={(e) => setActiveCat(e.target.value as ProductCategory | 'all')}
              className="input-editorial py-2 text-xs w-36 cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                  {c.label}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-editorial py-2 text-xs w-36 cursor-pointer"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ── 3. PRODUCT GRID ── */}
      <section className="py-12 lg:py-20">
        <div className="container-app">
          {filtered.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="font-serif text-2xl text-[var(--text-muted)]">No se encontraron artículos.</p>
              <button
                onClick={() => { setActiveCat('all'); setSearchTerm(''); }}
                className="btn-editorial-link"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product) => (
                <EditorialProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[var(--bg-base)]" />}>
      <CatalogContent />
    </Suspense>
  );
}
