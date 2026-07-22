'use client';

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
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
        <rect x="2" y="5" width="20" height="14" rx="0" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Envío Protegido',
    subtitle: 'Asunción y cobertura a todo el país.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Atención Personalizada',
    subtitle: 'Asesoría de imagen vía WhatsApp 24/7.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Calidad Garantizada',
    subtitle: 'Control de calidad prenda por prenda.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'Diseño Nacional',
    subtitle: 'Patronaje y confección local.',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export function EditorialTrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
      <div className="container-app space-y-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="editorial-label">COMPROMISO & GARANTÍA</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--text-primary)]">
            Sellos de Confianza LA REGALERÍA
          </h2>
        </div>

        {/* Grid of Cut-Corner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TRUST_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="card-cut-corners p-6 flex flex-col justify-between space-y-4 text-center items-center"
            >
              <div className="p-3 bg-[var(--accent-gold-muted)] text-[var(--accent-gold)] inline-flex items-center justify-center">
                {pillar.iconSvg}
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-xl font-light text-[var(--text-primary)] leading-tight">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-sans font-light leading-relaxed">
                  {pillar.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
