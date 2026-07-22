'use client';

const MARQUEE_ITEMS = [
  'ENVÍOS A TODO EL PAÍS',
  'DROP 01 DISPONIBLE',
  'CAMBIOS SIN COSTO EN 7 DÍAS',
  'EDICIÓN LIMITADA 2026',
  'CONFECCIÓN ARTESANAL PARAGUAYA',
  'HASTA 6 CUOTAS SIN INTERÉS',
];

export function EditorialMarqueePromo() {
  return (
    <div className="bg-[var(--text-primary)] text-[var(--bg-base)] py-3 overflow-hidden border-y border-[var(--border-strong)]">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-[11px] font-semibold tracking-[0.25em] uppercase select-none">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span>{item}</span>
            <span className="text-[var(--accent-gold)] font-serif text-sm">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
