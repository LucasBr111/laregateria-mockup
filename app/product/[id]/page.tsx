'use client';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { useState } from 'react';
import { ShoppingBag, Bell, Ruler, Star, ChevronLeft, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { getProductById } from '@/lib/mock-data';
import { useCartStore, useUIStore } from '@/lib/store';
import { formatPrice, discountPercent, stockLabel, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { GlassButton } from '@/components/ui/GlassButton';
import { FitFinderModal } from '@/components/shop/FitFinderModal';
import type { ProductVariant } from '@/types';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);

  if (!product) notFound();

  const addItem    = useCartStore((s) => s.addItem);
  const openCart   = useUIStore((s) => s.openCart);
  const [selectedColor,   setSelectedColor]   = useState<string>(product.variants[0]?.color ?? '');
  const [selectedSize,    setSelectedSize]    = useState<string>('');
  const [fitFinderOpen,   setFitFinderOpen]   = useState(false);
  const [activeImage,     setActiveImage]     = useState(0);
  const [notifyEmail,     setNotifyEmail]     = useState('');
  const [notifySent,      setNotifySent]      = useState(false);
  const [addedToCart,     setAddedToCart]     = useState(false);
  const [liked,           setLiked]           = useState(false);

  // Colors únicos
  const colors = [...new Set(product.variants.map((v) => v.color))];

  // Sizes para el color seleccionado
  const sizesForColor = product.variants.filter((v) => v.color === selectedColor);

  // Variante seleccionada
  const selectedVariant: ProductVariant | undefined = sizesForColor.find(
    (v) => v.size === selectedSize
  );

  const { label: stkLabel, level: stkLevel } = selectedVariant
    ? stockLabel(selectedVariant.stock)
    : { label: '', level: 'ok' as const };

  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.stock === 0) return;
    addItem(product, selectedVariant, 1);
    setAddedToCart(true);
    setTimeout(() => { setAddedToCart(false); openCart(); }, 600);
  };

  const handleFitFinderResult = (size: string) => {
    setSelectedSize(size);
    setFitFinderOpen(false);
  };

  return (
    <div className="min-h-dvh pt-20 pb-nav md:pb-12">
      {/* Back link */}
      <div className="container-app mb-4">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
        >
          <ChevronLeft size={15} /> Volver al catálogo
        </Link>
      </div>

      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Galería ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--bg-surface)] img-zoom-wrap">
              <Image
                src={product.images[activeImage] ?? product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge variant="new">Nuevo</Badge>}
                {product.isSale && product.originalPrice && (
                  <Badge variant="sale">-{discountPercent(product.originalPrice, product.price)}%</Badge>
                )}
              </div>
              {/* Wishlist & Share */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => setLiked((l) => !l)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-black/50 border border-[var(--glass-border)] backdrop-blur-sm transition-all hover:border-[var(--primary)]"
                >
                  <Heart size={16} className={cn(liked ? 'fill-[var(--primary)] text-[var(--primary)]' : 'text-white')} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-black/50 border border-[var(--glass-border)] backdrop-blur-sm transition-all hover:border-[var(--primary)]">
                  <Share2 size={15} className="text-white" />
                </button>
              </div>
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'relative w-16 h-20 rounded-xl overflow-hidden transition-all',
                      activeImage === i
                        ? 'ring-2 ring-[var(--primary)]'
                        : 'opacity-60 hover:opacity-100'
                    )}
                  >
                    <Image src={img} alt={`Vista ${i + 1}`} fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info & Selección ── */}
          <div className="space-y-5">
            {/* Categoría */}
            <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--primary)' }}>
              {product.category === 'vestidos' ? 'Vestidos'
                : product.category === 'gym' ? 'Línea Gym'
                : product.category === 'new' ? 'Novedades'
                : 'Looks de Clientas'}
            </p>

            {/* Nombre */}
            <h1 className="text-display-lg text-[var(--text-cream)]">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14}
                    className={cn(s <= Math.round(product.rating)
                      ? 'fill-[var(--primary)] text-[var(--primary)]'
                      : 'text-[var(--text-dim)]')} />
                ))}
              </div>
              <span className="text-sm text-[var(--text-muted)]">{product.rating}</span>
              <span className="text-sm text-[var(--text-dim)]">({product.reviewCount} reseñas)</span>
            </div>

            {/* Precio */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold" style={{ color: 'var(--primary)' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[var(--text-dim)] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="divider-gold" />

            {/* Color selector */}
            <div>
              <p className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-3">
                Color: <span className="text-[var(--text-cream)] font-medium">{selectedColor}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => {
                  const variant = product.variants.find((v) => v.color === color);
                  return (
                    <button
                      key={color}
                      onClick={() => { setSelectedColor(color); setSelectedSize(''); }}
                      title={color}
                      className={cn(
                        'w-8 h-8 rounded-full border-2 transition-all hover:scale-110',
                        selectedColor === color
                          ? 'border-[var(--primary)] scale-110 ring-2 ring-[var(--primary)]/30'
                          : 'border-[var(--glass-border)]'
                      )}
                      style={{ background: variant?.colorHex ?? '#888' }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-widest uppercase text-[var(--text-muted)]">
                  Talle: <span className="text-[var(--text-cream)] font-medium">{selectedSize || '—'}</span>
                </p>
                <button
                  onClick={() => setFitFinderOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
                  style={{ color: 'var(--primary)' }}
                >
                  <Ruler size={13} />
                  Probador inteligente
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {sizesForColor.map((v) => {
                  const noStock = v.stock === 0;
                  return (
                    <button
                      key={v.id}
                      onClick={() => !noStock && setSelectedSize(v.size)}
                      disabled={noStock}
                      className={cn(
                        'w-12 h-10 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200',
                        selectedSize === v.size
                          ? 'text-black border-transparent'
                          : noStock
                          ? 'border-[var(--glass-border)] text-[var(--text-dim)] opacity-40 cursor-not-allowed line-through'
                          : 'border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                      )}
                      style={selectedSize === v.id ? {}
                        : selectedSize === v.size
                        ? { background: 'var(--primary)' }
                        : { background: 'var(--glass-bg)' }
                      }
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock badge */}
            {selectedVariant && (
              <div>
                {stkLevel === 'low' && <Badge variant="stock-low" pulse>{stkLabel}</Badge>}
                {stkLevel === 'out' && <Badge variant="stock-out">Sin stock en este talle</Badge>}
                {stkLevel === 'ok' && (
                  <p className="text-xs text-[var(--accent-success)]">✓ {stkLabel}</p>
                )}
              </div>
            )}

            {/* Notify me / Add to cart */}
            {selectedVariant?.stock === 0 ? (
              <div className="space-y-3">
                {!notifySent ? (
                  <>
                    <p className="text-sm text-[var(--text-muted)]">
                      Dejá tu email y te avisamos cuando vuelva.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={notifyEmail}
                        onChange={(e) => setNotifyEmail(e.target.value)}
                        className="input-glass flex-1"
                      />
                      <GlassButton
                        variant="ghost"
                        onClick={() => { if (notifyEmail) setNotifySent(true); }}
                        disabled={!notifyEmail}
                      >
                        <Bell size={15} /> Avisar
                      </GlassButton>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-[var(--accent-success)] text-sm p-3 rounded-xl"
                    style={{ background: 'rgba(76,175,116,0.1)', border: '1px solid rgba(76,175,116,0.3)' }}>
                    ✓ ¡Listo! Te avisamos cuando llegue.
                  </div>
                )}
              </div>
            ) : (
              <GlassButton
                fullWidth
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedVariant}
                loading={addedToCart}
              >
                <ShoppingBag size={17} />
                {!selectedSize ? 'Seleccioná un talle' : addedToCart ? '¡Agregado!' : 'Agregar al carrito'}
              </GlassButton>
            )}

            {/* Descripción */}
            <div className="divider-gold" />
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-cream)] mb-2 tracking-wider uppercase">Descripción</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{product.description}</p>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-dim)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FitFinder Modal */}
      <FitFinderModal
        isOpen={fitFinderOpen}
        onClose={() => setFitFinderOpen(false)}
        productName={product.name}
        measurements={product.measurements}
      />
    </div>
  );
}
