'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getFlashSale, getFeaturedProducts, getNewProducts, getSaleProducts } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { CountdownTimer } from '@/components/shop/CountdownTimer';
import { ProductCard } from '@/components/shop/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { GlassButton } from '@/components/ui/GlassButton';

// ── Scroll Reveal Hook ──────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ── Section Wrapper ─────────────────────────────────
function RevealSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────
function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative h-[100dvh] min-h-[600px] flex items-end overflow-hidden">
      {/* Parallax BG */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=85"
          alt="La Regatería — Colección"
          fill
          className="object-cover object-top"
          priority
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-app pb-16 md:pb-24 mb-nav md:mb-0">
        <div className="max-w-xl">
          {/* Pre-tag */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full backdrop-blur-sm"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid var(--glass-border)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--primary)' }}>
              Nueva Colección
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-display-xl text-[var(--text-cream)] mb-4 animate-fade-in-up">
            Tu estilo,<br />
            <em className="not-italic text-gold-gradient">sin límites.</em>
          </h1>

          {/* Subtext */}
          <p className="text-base text-[var(--text-muted)] mb-8 max-w-sm animate-fade-in-up delay-100">
            Vestidos, línea deportiva y novedades. Envíos a todo Paraguay.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 animate-fade-in-up delay-200">
            <Link href="/catalog">
              <GlassButton size="lg">
                Ver colección
                <ArrowRight size={16} />
              </GlassButton>
            </Link>
            <Link href="/catalog?cat=new">
              <GlassButton variant="ghost" size="lg">
                Novedades
              </GlassButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-fade-in delay-500">
        <span className="text-[10px] tracking-widest uppercase text-[var(--text-dim)]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--primary)] to-transparent" />
      </div>
    </section>
  );
}

// ── Category Pills ───────────────────────────────────
function CategoryPills() {
  const cats = [
    { label: 'Vestidos',  href: '/catalog?cat=vestidos', emoji: '👗' },
    { label: 'Gym',       href: '/catalog?cat=gym',      emoji: '🏋️' },
    { label: 'New',       href: '/catalog?cat=new',      emoji: '✨' },
    { label: 'Clientas',  href: '/catalog?cat=clientes', emoji: '💫' },
    { label: 'Ofertas',   href: '/catalog?cat=sale',     emoji: '🔥' },
  ];

  return (
    <RevealSection className="container-app py-8">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {cats.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 hover:scale-105"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
              (e.currentTarget as HTMLElement).style.color = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
            }}
          >
            <span>{c.emoji}</span>
            {c.label}
          </Link>
        ))}
      </div>
    </RevealSection>
  );
}

// ── Flash Sale Banner ────────────────────────────────
function FlashSaleBanner() {
  const sale = getFlashSale();
  return (
    <RevealSection className="container-app">
      <div className="relative overflow-hidden rounded-2xl p-0.5"
        style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary), var(--primary-light), var(--primary-dark))' }}>
        <div className="rounded-[14px] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-6"
          style={{ background: 'var(--bg-surface)' }}>
          <div className="flex-1 text-center sm:text-left">
            <Badge variant="sale" className="mb-2">Liquidación de temporada</Badge>
            <h2 className="text-display-md text-[var(--text-cream)] mt-2">{sale.title}</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">{sale.subtitle}</p>
          </div>
          <div className="shrink-0">
            <CountdownTimer targetDate={sale.targetDate} />
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

// ── Products Section ─────────────────────────────────
function ProductsSection({
  title, icon, products, viewAllHref, delay = 0
}: {
  title: string;
  icon: React.ReactNode;
  products: ReturnType<typeof getFeaturedProducts>;
  viewAllHref: string;
  delay?: number;
}) {
  return (
    <RevealSection className="container-app" delay={delay}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-display-md text-[var(--text-cream)]">{title}</h2>
        </div>
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-xs tracking-widest uppercase text-[var(--primary)] hover:opacity-80 transition-opacity"
        >
          Ver todo <ChevronRight size={12} />
        </Link>
      </div>

      {/* Grid scroll en móvil, grid en desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.slice(0, 4).map((p, i) => (
          <div
            key={p.id}
            style={{
              animationDelay: `${i * 80}ms`,
            }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </RevealSection>
  );
}

// ── Social Proof ─────────────────────────────────────
function SocialProof() {
  const testimonials = [
    { name: 'Valentina R.',  rank: 'Oro',    text: '"El vestido llegó perfecto, tal como lo mostraban. Calidad increíble!"',       avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80' },
    { name: 'Camila F.',     rank: 'Plata',  text: '"La guía de talles fue exacta. Ya es mi tienda favorita en Asunción."',       avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80' },
    { name: 'Lucía M.',      rank: 'Bronce', text: '"Super rápido y el packaging es hermoso. Lo recomiendo a todas mis amigas."', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80' },
  ];

  return (
    <RevealSection className="container-app">
      <div className="text-center mb-6">
        <p className="text-xs tracking-widest uppercase text-[var(--primary)] mb-2">Opiniones</p>
        <h2 className="text-display-md text-[var(--text-cream)]">Nuestras Clientas</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <RevealSection key={i} delay={i * 100}>
            <div className="glass-card p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={12} className="fill-[var(--primary)] text-[var(--primary)]" />
                ))}
              </div>
              <p className="text-sm text-[var(--text-muted)] italic leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" unoptimized />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-cream)]">{t.name}</p>
                  <p className="text-[10px] text-[var(--primary)]">Clienta {t.rank}</p>
                </div>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </RevealSection>
  );
}

// ── Banner de Beneficios ─────────────────────────────
function BenefitsBanner() {
  const benefits = [
    { icon: '🚚', title: 'Envíos rápidos',        desc: 'Asunción y todo Paraguay' },
    { icon: '💎', title: 'Programa de Beneficios', desc: 'Acumulá puntos con cada compra' },
    { icon: '📱', title: 'Pedí por WhatsApp',      desc: 'Atención personalizada 24/7' },
    { icon: '↩️', title: 'Cambios sencillos',      desc: 'Sin complicaciones en 7 días' },
  ];

  return (
    <RevealSection className="container-app pb-8">
      <div className="divider-gold" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
        {benefits.map((b, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <span className="text-2xl">{b.icon}</span>
            <p className="text-sm font-medium text-[var(--text-cream)]">{b.title}</p>
            <p className="text-xs text-[var(--text-dim)]">{b.desc}</p>
          </div>
        ))}
      </div>
      <div className="divider-gold" />
    </RevealSection>
  );
}

// ── Page ─────────────────────────────────────────────
export default function HomePage() {
  const featured = getFeaturedProducts();
  const newItems = getNewProducts();
  const saleItems = getSaleProducts();

  return (
    <div className="space-y-12 pb-nav md:pb-16">
      <Hero />
      <CategoryPills />
      <FlashSaleBanner />
      <ProductsSection
        title="Lo Más Vendido"
        icon={<TrendingUp size={20} style={{ color: 'var(--primary)' }} />}
        products={featured}
        viewAllHref="/catalog"
      />
      <ProductsSection
        title="Novedades"
        icon={<span className="text-lg">✨</span>}
        products={newItems}
        viewAllHref="/catalog?cat=new"
        delay={100}
      />
      {saleItems.length > 0 && (
        <ProductsSection
          title="Ofertas Especiales"
          icon={<span className="text-lg">🔥</span>}
          products={saleItems}
          viewAllHref="/catalog?cat=sale"
          delay={200}
        />
      )}
      <SocialProof />
      <BenefitsBanner />
    </div>
  );
}
