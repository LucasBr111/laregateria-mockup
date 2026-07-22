'use client';
import { useState } from 'react';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { EditorialInput } from '@/components/ui/EditorialInput';
import { Check } from 'lucide-react';

export function EditorialNewsletter() {
  const [email, setEmail]   = useState('');
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  };

  return (
    <section className="py-24 lg:py-36 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <div className="container-app max-w-xl text-center space-y-6">

        <p className="editorial-label">ACCESO PRIVADO</p>

        <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--text-primary)]">
          Únete a Nuestro Círculo Exclusivo
        </h2>

        <p className="text-xs md:text-sm text-[var(--text-secondary)] font-sans font-light leading-relaxed max-w-md mx-auto">
          Recibe invitaciones anticipadas a nuestros Drops, acceso a colecciones y ventas privadas.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="pt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <EditorialInput
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <EditorialButton type="submit" loading={loading} className="shrink-0">
              Suscribirse
            </EditorialButton>
          </form>
        ) : (
          <div className="p-4 bg-[var(--accent-gold-muted)] border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 animate-fade-in">
            <Check size={16} /> Te has registrado exitosamente.
          </div>
        )}

      </div>
    </section>
  );
}
