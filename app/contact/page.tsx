'use client';
import { useState } from 'react';
import { EditorialNavbar } from '@/components/editorial/EditorialNavbar';
import { EditorialFooter } from '@/components/editorial/EditorialFooter';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { EditorialInput } from '@/components/ui/EditorialInput';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Mail, Phone, Camera, MapPin, Check, MessageCircle } from 'lucide-react';

const TEAM = [
  { initials: 'MB', name: 'Matias Britez',     role: 'CONTACTO DE VENTAS',      phone: '+595981000001' },
  { initials: 'AC', name: 'Alejandro Chamorro', role: 'OPERACIONES Y LOGÍSTICA', phone: '+595981000002' },
  { initials: 'SB', name: 'Santiago Benitez',  role: 'COMUNIDAD Y SOPORTE',    phone: '+595981000003' },
];

export function ContactPage() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [reason, setReason]   = useState('Consulta sobre pedido / Cambios y Devoluciones');
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  };

  return (
    <div className="min-h-dvh bg-[var(--bg-base)] text-[var(--text-primary)]">
      <EditorialNavbar />

      {/* ── 1. HEADER CONTACTO (EXACT REFERENCE DESIGN) ── */}
      <section className="py-16 lg:py-24 text-center border-b border-[var(--border-subtle)]">
        <div className="container-app max-w-2xl space-y-3">
          <p className="editorial-label">HABLEMOS</p>
          <h1 className="text-display-giant font-serif font-light uppercase">
            CONTACTO
          </h1>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] font-sans">
            Escribinos directo o dejá tu mensaje acá. Respondemos en menos de 24 horas.
          </p>
        </div>
      </section>

      {/* ── 2. INFO ROW CARDS ── */}
      <section className="py-8 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-base)] space-y-1">
              <Mail size={16} className="mx-auto text-[var(--accent-gold)] mb-1" />
              <p className="editorial-label">EMAIL</p>
              <p className="font-mono text-[11px] truncate">comunidad@laregaleria.com.py</p>
            </div>

            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-base)] space-y-1">
              <Phone size={16} className="mx-auto text-[var(--accent-gold)] mb-1" />
              <p className="editorial-label">WHATSAPP</p>
              <p className="font-mono text-[11px]">+595 975 875 210</p>
            </div>

            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-base)] space-y-1">
              <Camera size={16} className="mx-auto text-[var(--accent-gold)] mb-1" />
              <p className="editorial-label">INSTAGRAM</p>
              <p className="font-mono text-[11px]">@laregaleria.py</p>
            </div>

            <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-base)] space-y-1">
              <MapPin size={16} className="mx-auto text-[var(--accent-gold)] mb-1" />
              <p className="editorial-label">CIUDAD</p>
              <p className="font-mono text-[11px]">Asunción / Ciudad del Este, Paraguay</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FORM & DIRECT CONTACT (2-COL) ── */}
      <section className="py-16 md:py-24 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Left: Message Form */}
            <ScrollReveal className="editorial-card p-8 space-y-6">
              <h3 className="font-serif text-2xl font-light text-[var(--text-primary)]">
                Envíanos un mensaje
              </h3>

              {sent ? (
                <div className="p-4 bg-[var(--accent-gold-muted)] border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                  <Check size={16} /> ¡Mensaje enviado! Respondemos pronto.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <EditorialInput
                    label="NOMBRE COMPLETO"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <EditorialInput
                    label="CORREO ELECTRÓNICO"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                      MOTIVO DE CONTACTO
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="input-editorial cursor-pointer"
                    >
                      <option value="Consulta sobre pedido / Cambios y Devoluciones">Consulta sobre pedido / Cambios y Devoluciones</option>
                      <option value="Asesoría de Talles (FitFinder)">Asesoría de Talles (FitFinder)</option>
                      <option value="Colaboraciones & Prensa">Colaboraciones & Prensa</option>
                      <option value="Ventas Mayoristas">Ventas Mayoristas</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                      MENSAJE
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Indícanos los detalles de tu consulta, reserva o talle deseado..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="input-editorial resize-none"
                    />
                  </div>

                  <EditorialButton type="submit" fullWidth loading={loading}>
                    Enviar Mensaje
                  </EditorialButton>
                </form>
              )}
            </ScrollReveal>

            {/* Right: Direct Channels */}
            <ScrollReveal delay={150} className="editorial-card p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-light text-[var(--text-primary)]">
                  O escribinos directo
                </h3>

                <div className="space-y-4 text-xs font-sans">
                  <div className="space-y-1 border-b border-[var(--border-subtle)] pb-3">
                    <p className="editorial-label">EMAIL</p>
                    <a href="mailto:comunidad@laregaleria.com.py" className="font-mono text-sm text-[var(--text-primary)] hover:text-[var(--accent-gold)]">
                      comunidad@laregaleria.com.py
                    </a>
                  </div>

                  <div className="space-y-1 border-b border-[var(--border-subtle)] pb-3">
                    <p className="editorial-label">WHATSAPP</p>
                    <a href="https://wa.me/595975875210" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-[var(--text-primary)] hover:text-[var(--accent-gold)]">
                      +595 975 875 210
                    </a>
                  </div>

                  <div className="space-y-1 pb-3">
                    <p className="editorial-label">INSTAGRAM</p>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-[var(--text-primary)] hover:text-[var(--accent-gold)]">
                      @laregaleria.py
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <a href="https://wa.me/595975875210" target="_blank" rel="noopener noreferrer">
                  <EditorialButton variant="primary" fullWidth>
                    <MessageCircle size={16} /> Abrir WhatsApp Directo
                  </EditorialButton>
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>



      {/* ── 5. MAP BANNER (EXACT REFERENCE DESIGN) ── */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)]">
        <iframe
          title="Ubicación La Regalería"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.24584288764!2d-57.63625345000001!3d-25.282197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da7cd8380fb77%3A0x8e830e1f743c396e!2sAsuncion%2C%20Paraguay!5e0!3m2!1sen!2spy!4v1700000000000!5m2!1sen!2spy"
          className="w-full h-full grayscale opacity-75 contrast-125 border-0"
          loading="lazy"
        />
      </section>

      <EditorialFooter />
    </div>
  );
}

export default ContactPage;
