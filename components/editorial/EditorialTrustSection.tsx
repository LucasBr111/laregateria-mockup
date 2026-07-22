'use client';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface TrustPillar {
  title: string;
  subtitle: string;
  iconSvg: React.ReactNode;
}

const TRUST_PILLARS: TrustPillar[] = [
  {
    title: 'Pago Seguro',
    subtitle: 'Transferencias verificadas & pasarela encriptada.',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square">
        <rect x="2" y="5" width="20" height="14" rx="0" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Envío Protegido',
    subtitle: 'Asunción y cobertura a todo el país.',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Atención 24/7',
    subtitle: 'Asesoría de imagen por WhatsApp.',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Calidad Premium',
    subtitle: 'Control de calidad prenda por prenda.',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'Diseño Nacional',
    subtitle: 'Patronaje y confección local.',
    iconSvg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export function EditorialTrustSection() {
  const row1 = TRUST_PILLARS.slice(0, 3);
  const row2 = TRUST_PILLARS.slice(3, 5);

  return (
    <section className="py-16 md:py-24 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
      <div className="container-app space-y-8">

        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <p className="editorial-label">COMPROMISO & GARANTÍA</p>
            <h2 className="font-serif text-2xl md:text-4xl font-light text-[var(--text-primary)]">
              Sellos de Confianza LA REGALERÍA
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile: 3 top, 2 bottom centered layout | Desktop: 5 in a row */}
        <div className="space-y-3 md:space-y-0">
          
          {/* Mobile Row 1 (3 items) / Desktop Grid (5 items) */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2.5 md:gap-4">
            {row1.map((pillar, idx) => (
              <ScrollReveal key={idx} delay={idx * 80}>
                <div className="card-cut-corners p-3.5 md:p-5 flex flex-col justify-between space-y-2 text-center items-center h-full">
                  <div className="p-2.5 bg-[var(--accent-gold-muted)] text-[var(--accent-gold)] inline-flex items-center justify-center">
                    {pillar.iconSvg}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm md:text-lg font-light text-[var(--text-primary)] leading-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-[10px] md:text-xs text-[var(--text-secondary)] font-sans font-light leading-snug line-clamp-2">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Desktop Row 2 Items (Rendered inline on md+) */}
            {row2.map((pillar, idx) => (
              <ScrollReveal key={idx + 3} delay={(idx + 3) * 80} className="hidden md:block">
                <div className="card-cut-corners p-3.5 md:p-5 flex flex-col justify-between space-y-2 text-center items-center h-full">
                  <div className="p-2.5 bg-[var(--accent-gold-muted)] text-[var(--accent-gold)] inline-flex items-center justify-center">
                    {pillar.iconSvg}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm md:text-lg font-light text-[var(--text-primary)] leading-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-[10px] md:text-xs text-[var(--text-secondary)] font-sans font-light leading-snug line-clamp-2">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile Row 2 (2 items centered) */}
          <div className="grid grid-cols-2 gap-2.5 max-w-xs mx-auto md:hidden">
            {row2.map((pillar, idx) => (
              <ScrollReveal key={idx + 3} delay={(idx + 3) * 80}>
                <div className="card-cut-corners p-3.5 flex flex-col justify-between space-y-2 text-center items-center h-full">
                  <div className="p-2.5 bg-[var(--accent-gold-muted)] text-[var(--accent-gold)] inline-flex items-center justify-center">
                    {pillar.iconSvg}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-light text-[var(--text-primary)] leading-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-[10px] text-[var(--text-secondary)] font-sans font-light leading-snug line-clamp-2">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
