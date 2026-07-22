'use client';
import Image from 'next/image';
import Link from 'next/link';
import { EditorialNavbar } from '@/components/editorial/EditorialNavbar';
import { EditorialFooter } from '@/components/editorial/EditorialFooter';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const CHAPTERS = [
  { num: '01', title: 'EL ORIGEN',        img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85' },
  { num: '02', title: 'MATERIA PRIMA',    img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85' },
  { num: '03', title: 'HORA DORADA',      img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85' },
  { num: '04', title: 'EL TEMPLO',        img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85' },
  { num: '05', title: 'IDENTIDAD',        img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=85' },
  { num: '06', title: 'EL MOVIMIENTO',   img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=85' },
];

export function HistoryPage() {
  return (
    <div className="min-h-dvh bg-[var(--bg-base)] text-[var(--text-primary)]">
      <EditorialNavbar />

      {/* ── 1. HERO HISTORIA ── */}
      <section className="relative min-h-[50dvh] lg:min-h-[60dvh] flex items-center justify-center text-center overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=85"
            alt="Atelier LA REGALERÍA"
            fill
            className="object-cover opacity-35"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-black/40 to-black/60" />
        </div>

        <div className="container-app relative z-10 space-y-4 py-20 max-w-3xl">
          <p className="editorial-label">CONFECCIÓN & MÍSTICA</p>
          <h1 className="text-display-giant text-white font-serif font-light tracking-widest uppercase">
            NUESTRA HISTORIA
          </h1>
          <p className="text-sm md:text-base text-neutral-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Desde Asunción, reimaginamos la mística del diseño clásico como lujo silencioso a través de siluetas depuradas, texturas reales y una confección atemporal.
          </p>
        </div>
      </section>

      {/* ── 2. CAPÍTULOS CON MÚLTIPLES FOTOGRAFÍAS ── */}
      <section className="py-20 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="container-app space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <p className="editorial-label">CAPÍTULOS EDITORIALES</p>
            <h2 className="font-serif text-3xl font-light">Seis Capítulos de Herencia</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHAPTERS.map((chap, idx) => (
              <ScrollReveal key={chap.num} delay={idx * 80}>
                <div className="group relative aspect-[3/4] overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
                  <Image
                    src={chap.img}
                    alt={chap.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    <span className="font-mono text-xs tracking-widest text-[var(--accent-gold)]">{chap.num} /</span>
                    <h3 className="font-serif text-2xl font-light tracking-wider uppercase">
                      {chap.title}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MANIFIESTO ── */}
      <section className="py-20 md:py-32 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
        <div className="container-app max-w-3xl text-center space-y-6">
          <ScrollReveal>
            <p className="editorial-label">MANIFIESTO</p>
            <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight">
              El rendimiento no grita. Demuestra con autoridad.
            </h2>
            <p className="text-sm md:text-base text-[var(--text-secondary)] font-sans font-light leading-relaxed pt-2">
              En un mundo saturado de logotipos y excesos, LA REGALERÍA elige el camino de la disciplina silenciosa. Desarrollamos piezas de alta sofisticación técnica y estética que hablan por sí solas.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. ORÍGENES ── */}
      <section className="py-20 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <ScrollReveal className="relative aspect-[3/4] w-full border border-[var(--border-subtle)] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85"
                alt="Orígenes de La Regalería"
                fill
                className="object-cover"
                unoptimized
              />
            </ScrollReveal>

            <ScrollReveal className="space-y-6">
              <p className="editorial-label">ORÍGENES</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-light">
                Diseño que nace del movimiento
              </h2>
              <blockquote className="font-serif text-xl italic text-[var(--accent-gold)] border-l-2 border-[var(--accent-gold)] pl-4">
                “La indumentaria no es una prenda pasajera. Es la herencia viva de una identidad en constante evolución.”
              </blockquote>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] font-sans font-light leading-relaxed">
                Comenzó con una obsesión por las siluetas atemporales y los tejidos nobles. Escudos cosidos a mano, cuellos estructurados y colores puros que resisten el paso del tiempo.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 5. TRES PILARES (MISIÓN, VISIÓN, VALORES) ── */}
      <section className="py-20 md:py-28 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
        <div className="container-app max-w-5xl space-y-12">
          <div className="text-center space-y-2">
            <p className="editorial-label">FILOSOFÍA DE MARCA</p>
            <h2 className="font-serif text-3xl font-light">Nuestros Pilares</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'MISIÓN', text: 'Crear indumentaria y piezas estéticas de alto valor que celebren el diseño nacional y potencien la presencia diaria de nuestra comunidad.' },
              { num: '02', title: 'VISIÓN', text: 'Convertirnos en la marca de moda de comunidad de referencia en el país, uniendo a las personas a través del diseño y el orgullo cultural.' },
              { num: '03', title: 'VALORES', text: 'Disciplina inquebrantable, Estética Sophisticated e Identidad de Comunidad.' },
            ].map((p, i) => (
              <ScrollReveal key={p.num} delay={i * 100}>
                <div className="card-cut-corners p-8 space-y-4 text-center h-full flex flex-col justify-between">
                  <span className="font-serif text-4xl font-light text-[var(--accent-gold)]">{p.num}</span>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-light tracking-wider">{p.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{p.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PRÓXIMO PASO / CTA ── */}
      <section className="py-20 bg-[var(--bg-surface)] text-center">
        <div className="container-app max-w-xl space-y-6">
          <ScrollReveal>
            <p className="editorial-label">PRÓXIMO PASO</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Hablemos de diseño</h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Consultas, colaboraciones o simplemente querés conocer más. Estamos acá para vos.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/contact">
                <EditorialButton variant="primary">CONTACTAR</EditorialButton>
              </Link>
              <Link href="/catalog">
                <EditorialButton variant="ghost">VER COLECCIÓN</EditorialButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}

export default HistoryPage;
