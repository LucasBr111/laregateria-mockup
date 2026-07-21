'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/mock-data';
import { ExcelUploader } from '@/components/admin/ExcelUploader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Search, Filter } from 'lucide-react';

export default function InventoryAdminPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-dvh pt-24 pb-16">
      <div className="container-app space-y-8">

        {/* Top Header */}
        <div className="border-b border-[var(--glass-border)] pb-6 flex items-center justify-between">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-2"
            >
              <ArrowLeft size={14} /> Volver al Dashboard
            </Link>
            <h1 className="text-display-lg text-[var(--text-cream)]">Gestión de Inventario</h1>
            <p className="text-sm text-[var(--text-muted)]">Matriz de variantes, stock en vivo e importación de planilla</p>
          </div>
        </div>

        {/* Excel / CSV Uploader Component */}
        <ExcelUploader />

        {/* Product Variant Matrix */}
        <GlassCard hover={false} className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="font-display text-xl text-[var(--text-cream)]">Matriz de Variantes & Stock</h2>

            {/* Filters */}
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                <input
                  type="text"
                  placeholder="Buscar producto o SKU..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-glass pl-9"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-glass w-36 cursor-pointer"
              >
                <option value="all" className="bg-[var(--bg-surface)]">Todas</option>
                <option value="vestidos" className="bg-[var(--bg-surface)]">Vestidos</option>
                <option value="gym" className="bg-[var(--bg-surface)]">Gym</option>
                <option value="new" className="bg-[var(--bg-surface)]">New</option>
                <option value="clientes" className="bg-[var(--bg-surface)]">Clientas</option>
              </select>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto rounded-xl border border-[var(--glass-border)] bg-[var(--bg-surface)]">
            <table className="w-full text-xs text-left text-[var(--text-muted)]">
              <thead className="bg-[var(--glass-bg)] text-[var(--text-cream)] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Producto</th>
                  <th className="p-3">Categoría</th>
                  <th className="p-3">Precio</th>
                  <th className="p-3">Variantes & Stock</th>
                  <th className="p-3 text-right">Total Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--glass-border)]">
                {filteredProducts.map((product) => {
                  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
                  return (
                    <tr key={product.id} className="hover:bg-[var(--glass-bg-hover)]">
                      <td className="p-3 font-medium text-[var(--text-cream)]">{product.name}</td>
                      <td className="p-3 uppercase text-[10px] text-[var(--primary)] font-semibold">{product.category}</td>
                      <td className="p-3 font-semibold text-[var(--text-cream)]">
                        Gs. {product.price.toLocaleString('es-PY')}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1.5">
                          {product.variants.map((v) => (
                            <span
                              key={v.id}
                              className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                                v.stock === 0
                                  ? 'bg-red-950/40 border-red-800/40 text-red-400'
                                  : v.stock <= 3
                                  ? 'bg-amber-950/40 border-amber-800/40 text-amber-300'
                                  : 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-cream)]'
                              }`}
                            >
                              {v.size} / {v.color} ({v.stock})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-right font-bold">
                        {totalStock === 0 ? (
                          <Badge variant="stock-out">0 (Agotado)</Badge>
                        ) : totalStock <= 5 ? (
                          <Badge variant="stock-low">{totalStock} un.</Badge>
                        ) : (
                          <span className="text-[var(--accent-success)]">{totalStock} un.</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
