'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { useState } from 'react';
import { ShoppingBag, Bell, Ruler, Star, ChevronLeft, Heart, Share2, MessageCircle, ChevronDown, Check, ShieldCheck, Truck } from 'lucide-react';
import { getProductById, getFeaturedProducts, WHATSAPP_NUMBER } from '@/lib/mock-data';
import { useCartStore, useUIStore } from '@/lib/store';
import { formatPrice, discountPercent, stockLabel, cn } from '@/lib/utils';
import { EditorialNavbar } from '@/components/editorial/EditorialNavbar';
import { EditorialFooter } from '@/components/editorial/EditorialFooter';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { EditorialBadge } from '@/components/ui/EditorialBadge';
import { EditorialProductCard } from '@/components/editorial/EditorialProductCard';
import { FitFinderModal } from '@/components/shop/FitFinderModal';
import type { ProductVariant } from '@/types';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);

  if (!product) notFound();

  const addItem  = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);

  const [selectedColor, setSelectedColor] = useState<string>(product.variants[0]?.color ?? '');
  const [selectedSize, setSelectedSize]   = useState<string>(product.variants[0]?.size ?? '');
  const [fitFinderOpen, setFitFinderOpen] = useState(false);
  const [activeImage, setActiveImage]     = useState(0);
  const [notifyEmail, setNotifyEmail]     = useState('');
  const [notifySent, setNotifySent]       = useState(false);
  const [addedToCart, setAddedToCart]     = useState(false);
  const [liked, setLiked]                 = useState(false);

  // Accordion open states
  const [detailsOpen, setDetailsOpen]   = useState(true);
  const [careOpen, setCareOpen]         = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const colors = [...new Set(product.variants.map((v) => v.color))];
  const sizesForColor = product.variants.filter((v) => v.color === selectedColor);
  const selectedVariant: ProductVariant | undefined = sizesForColor.find((v) => v.size === selectedSize);

  const { label: stkLabel, level: stkLevel } = selectedVariant
    ? stockLabel(selectedVariant.stock)
    : { label: '', level: 'ok' as const };

  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.stock === 0) return;
    addItem(product, selectedVariant, 1);
    setAddedToCart(true);
    setTimeout(() => { setAddedToCart(false); openCart(); }, 600);
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola La Regalería! Me interesa consultar por el producto: ${product.name} (${selectedSize || 'Talle'} / ${selectedColor}).`
  )}`;

  const relatedProducts = getFeaturedProducts().filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-dvh bg-[var(--bg-base)] text-[var(--text-primary)]">
      <EditorialNavbar />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3">
        <div className="container-app flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">INICIO</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-[var(--text-primary)] transition-colors">CATÁLOGO</Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-medium truncate">{product.name}</span>
        </div>
      </div>

      {/* Product Detail Main Section */}
      <section className="py-10 lg:py-16">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left: Gallery (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Image View */}
              <div className="relative aspect-[3/4] w-full border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] overflow-hidden">
                <Image
                  src={product.images[activeImage] ?? product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.isNew && <EditorialBadge variant="new">NUEVO</EditorialBadge>}
                  {product.isSale && product.originalPrice && (
                    <EditorialBadge variant="sale">
                      -{discountPercent(product.originalPrice, product.price)}%
                    </EditorialBadge>
                  )}
                </div>

                {/* Wishlist & Share */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button
                    onClick={() => setLiked(!liked)}
                    className="w-9 h-9 flex items-center justify-center bg-black/50 border border-white/20 text-white hover:border-[var(--accent-gold)] transition-all"
                  >
                    <Heart size={16} className={cn(liked && 'fill-[var(--accent-gold)] text-[var(--accent-gold)]')} />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center bg-black/50 border border-white/20 text-white hover:border-[var(--accent-gold)] transition-all">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Thumbnails Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        'relative w-20 h-24 border overflow-hidden transition-all shrink-0',
                        activeImage === i ? 'border-[var(--text-primary)] opacity-100' : 'border-[var(--border-subtle)] opacity-50 hover:opacity-100'
                      )}
                    >
                      <Image src={img} alt={`Vista ${i + 1}`} fill className="object-cover" unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Controls (5 Cols Sticky) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="space-y-2">
                <p className="editorial-label">{product.category}</p>
                <h1 className="font-serif text-3xl lg:text-4xl font-light text-[var(--text-primary)] leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between border-y border-[var(--border-subtle)] py-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-2xl font-semibold text-[var(--text-primary)]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-sans text-base text-[var(--text-muted)] line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                  <Star size={14} className="fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                  <span>{product.rating}</span>
                  <span className="text-[var(--text-muted)]">({product.reviewCount} opiniones)</span>
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-secondary)]">
                  COLOR: <span className="text-[var(--text-primary)]">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {colors.map((color) => {
                    const variant = product.variants.find((v) => v.color === color);
                    return (
                      <button
                        key={color}
                        onClick={() => { setSelectedColor(color); setSelectedSize(''); }}
                        className={cn(
                          'w-8 h-8 rounded-none border-2 transition-all',
                          selectedColor === color ? 'border-[var(--text-primary)] scale-105' : 'border-[var(--border-subtle)] hover:border-[var(--border-medium)]'
                        )}
                        style={{ background: variant?.colorHex ?? '#888' }}
                        title={color}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Size Selector & FitFinder */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-secondary)]">
                    TALLE: <span className="text-[var(--text-primary)]">{selectedSize || '—'}</span>
                  </p>
                  <button
                    onClick={() => setFitFinderOpen(true)}
                    className="flex items-center gap-1 text-xs font-semibold text-[var(--accent-gold)] hover:underline uppercase tracking-wider"
                  >
                    <Ruler size={13} /> Probador de Talles
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {sizesForColor.map((v) => {
                    const noStock = v.stock === 0;
                    return (
                      <button
                        key={v.id}
                        onClick={() => !noStock && setSelectedSize(v.size)}
                        disabled={noStock}
                        className={cn(
                          'w-12 h-11 border text-xs font-semibold uppercase tracking-wider transition-all',
                          selectedSize === v.size
                            ? 'bg-[var(--text-primary)] text-[var(--bg-base)] border-[var(--text-primary)]'
                            : noStock
                            ? 'border-[var(--border-subtle)] text-[var(--text-dim)] opacity-40 cursor-not-allowed line-through'
                            : 'border-[var(--border-medium)] text-[var(--text-primary)] hover:border-[var(--text-primary)]'
                        )}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stock Status Badge */}
              {selectedVariant && (
                <div>
                  {stkLevel === 'low' && <EditorialBadge variant="sale">{stkLabel}</EditorialBadge>}
                  {stkLevel === 'out' && <EditorialBadge variant="outline">SIN STOCK DISPONIBLE</EditorialBadge>}
                  {stkLevel === 'ok' && (
                    <p className="text-xs text-[var(--accent-success)] font-semibold flex items-center gap-1">
                      <Check size={14} /> Stock disponible en atelier
                    </p>
                  )}
                </div>
              )}

              {/* Actions: Add to Cart / WhatsApp */}
              {selectedVariant?.stock === 0 ? (
                <div className="space-y-3 pt-2">
                  {!notifySent ? (
                    <>
                      <p className="text-xs text-[var(--text-muted)]">
                        Déjanos tu email y te notificaremos apenas regrese este talle.
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="tu@email.com"
                          value={notifyEmail}
                          onChange={(e) => setNotifyEmail(e.target.value)}
                          className="input-editorial flex-1 py-2.5 text-xs"
                        />
                        <EditorialButton
                          variant="ghost"
                          size="sm"
                          onClick={() => { if (notifyEmail) setNotifySent(true); }}
                        >
                          <Bell size={14} /> Avisar
                        </EditorialButton>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 bg-[var(--accent-gold-muted)] border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                      <Check size={16} /> ¡Notificación registrada!
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <EditorialButton
                    fullWidth
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !selectedVariant}
                    loading={addedToCart}
                  >
                    <ShoppingBag size={16} />
                    {!selectedSize ? 'SELECCIONA UN TALLE' : addedToCart ? '¡AGREGADO!' : 'AGREGAR AL CARRITO'}
                  </EditorialButton>

                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                    <EditorialButton variant="ghost" fullWidth size="md">
                      <MessageCircle size={16} /> Consulta Directa por WhatsApp
                    </EditorialButton>
                  </a>
                </div>
              )}

              {/* Accordion Info Sections */}
              <div className="border-t border-[var(--border-subtle)] pt-4 space-y-3">
                {/* Details */}
                <div className="border-b border-[var(--border-subtle)] pb-3">
                  <button
                    onClick={() => setDetailsOpen(!detailsOpen)}
                    className="w-full flex items-center justify-between text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-primary)]"
                  >
                    <span>Confección & Textiles</span>
                    <ChevronDown size={14} className={cn('transition-transform', detailsOpen && 'rotate-180')} />
                  </button>
                  {detailsOpen && (
                    <p className="text-xs text-[var(--text-secondary)] font-sans font-light leading-relaxed pt-3">
                      {product.description} Confeccionado artesanalmente en nuestro taller en Asunción con patrones de alta precisión.
                    </p>
                  )}
                </div>

                {/* Care */}
                <div className="border-b border-[var(--border-subtle)] pb-3">
                  <button
                    onClick={() => setCareOpen(!careOpen)}
                    className="w-full flex items-center justify-between text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-primary)]"
                  >
                    <span>Guía de Cuidados</span>
                    <ChevronDown size={14} className={cn('transition-transform', careOpen && 'rotate-180')} />
                  </button>
                  {careOpen && (
                    <ul className="text-xs text-[var(--text-secondary)] font-sans font-light leading-relaxed pt-3 space-y-1 list-disc pl-4">
                      <li>Lavar a mano con agua fría y jabón neutro.</li>
                      <li>No usar blanqueador ni secadora.</li>
                      <li>Planchar a baja temperatura con paño protector.</li>
                    </ul>
                  )}
                </div>

                {/* Shipping */}
                <div className="pb-3">
                  <button
                    onClick={() => setShippingOpen(!shippingOpen)}
                    className="w-full flex items-center justify-between text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-primary)]"
                  >
                    <span>Envíos & Devoluciones</span>
                    <ChevronDown size={14} className={cn('transition-transform', shippingOpen && 'rotate-180')} />
                  </button>
                  {shippingOpen && (
                    <p className="text-xs text-[var(--text-secondary)] font-sans font-light leading-relaxed pt-3">
                      Envíos express en Asunción (1-2 días). Cobertura a todo Paraguay. Cambios y devoluciones sin complicaciones dentro de los 7 días posteriores a la entrega.
                    </p>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Recommended Products Carousel */}
      <section className="py-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
        <div className="container-app space-y-8">
          <div className="text-center space-y-1">
            <p className="editorial-label">COMPLETA TU ESTILO</p>
            <h3 className="font-serif text-3xl font-light text-[var(--text-primary)]">
              Piezas Complementarias
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {relatedProducts.map((p) => (
              <EditorialProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FitFinder Modal */}
      <FitFinderModal
        isOpen={fitFinderOpen}
        onClose={() => setFitFinderOpen(false)}
        productName={product.name}
        measurements={product.measurements}
      />

      <EditorialFooter />
    </div>
  );
}
