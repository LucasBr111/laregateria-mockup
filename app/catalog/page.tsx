'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { getProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/shop/ProductCard';
import type { ProductCategory } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORIES: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all',      label: 'Todo'     },
  { value: 'vestidos', label: 'Vestidos' },
  { value: 'gym',      label: 'Gym'      },
  { value: 'new',      label: 'New'      },
  { value: 'clientes', label: 'Clientas' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Destacados'    },
  { value: 'price-asc', label: 'Precio ↑'    },
  { value: 'price-desc', label: 'Precio ↓'   },
  { value: 'rating', label: 'Mejor valorados' },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get('cat') ?? 'all') as ProductCategory | 'all';

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(initialCat);
  const [sort, setSort]                     = useState('featured');
  const [showSale, setShowSale]             = useState(false);
  const [showNew, setShowNew]               = useState(false);
  const [filterOpen, setFilterOpen]         = useState(false);

  const all = getProducts();

  const filtered = useMemo(() => {
    let list = activeCategory === 'all' ? all : all.filter((p) => p.category === activeCategory);
    if (showSale) list = list.filter((p) => p.isSale);
    if (showNew)  list = list.filter((p) => p.isNew);

    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'featured')   list = [...list].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

    return list;
  }, [activeCategory, sort, showSale, showNew, all]);

  return (
    <div className="min-h-dvh pt-20 pb-nav md:pb-12">
      <div className="container-app">
        {/* Page header */}
        <div className="py-8 text-center">
          <p className="text-xs tracking-widest uppercase text-[var(--primary)] mb-2">Explorar</p>
          <h1 className="text-display-lg text-[var(--text-cream)]">Colección</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{filtered.length} productos</p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                'shrink-0 px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200',
                activeCategory === cat.value
                  ? 'text-black'
                  : 'border border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
              )}
              style={activeCategory === cat.value
                ? { background: 'var(--primary)' }
                : { background: 'var(--glass-bg)' }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-glass max-w-[160px] cursor-pointer"
            style={{ background: 'var(--glass-bg)' }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} style={{ background: 'var(--bg-surface)' }}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Toggle filters */}
          <button
            onClick={() => setFilterOpen((f) => !f)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-all',
              filterOpen
                ? 'text-[var(--primary)] border-[var(--primary)]'
                : 'text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[var(--primary)]'
            )}
            style={{ background: 'var(--glass-bg)' }}
          >
            <SlidersHorizontal size={14} /> Filtros
          </button>

          {/* Active filter chips */}
          {showSale && (
            <button
              onClick={() => setShowSale(false)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'var(--accent-sale)', color: 'white' }}
            >
              Ofertas <X size={11} />
            </button>
          )}
          {showNew && (
            <button
              onClick={() => setShowNew(false)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium badge-new"
            >
              Nuevos <X size={11} />
            </button>
          )}
        </div>

        {/* Extended filter panel */}
        {filterOpen && (
          <div className="glass-card p-4 mb-6 flex flex-wrap gap-3 animate-fade-in-up">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showSale}
                onChange={(e) => setShowSale(e.target.checked)}
                className="accent-[var(--primary)] w-4 h-4"
              />
              <span className="text-sm text-[var(--text-cream)]">Solo ofertas</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showNew}
                onChange={(e) => setShowNew(e.target.checked)}
                className="accent-[var(--primary)] w-4 h-4"
              />
              <span className="text-sm text-[var(--text-cream)]">Solo novedades</span>
            </label>
          </div>
        )}

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[var(--text-muted)] text-lg font-display">No hay productos con estos filtros.</p>
            <button
              onClick={() => { setActiveCategory('all'); setShowSale(false); setShowNew(false); }}
              className="mt-4 text-sm text-[var(--primary)] hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh pt-20 flex items-center justify-center">
      <div className="skeleton w-32 h-8" />
    </div>}>
      <CatalogContent />
    </Suspense>
  );
}
