'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EditorialNavbar } from '@/components/editorial/EditorialNavbar';
import { EditorialFooter } from '@/components/editorial/EditorialFooter';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { EditorialInput } from '@/components/ui/EditorialInput';
import { Check } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/profile');
      }, 700);
    }, 900);
  };

  return (
    <div className="min-h-dvh bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col justify-between">
      <EditorialNavbar />

      <main className="py-16 lg:py-24">
        <div className="container-app max-w-md mx-auto">
          <div className="editorial-card p-8 md:p-10 space-y-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)]">

            {/* Header */}
            <div className="text-center space-y-2">
              <p className="editorial-label">REGISTRO DE CLIENTA</p>
              <h1 className="font-serif text-3xl font-light text-[var(--text-primary)]">
                Crear Cuenta
              </h1>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Únete a nuestro programa de fidelización y recibe cupones exclusivos.
              </p>
            </div>

            {success ? (
              <div className="p-4 bg-[var(--accent-gold-muted)] border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 animate-fade-in">
                <Check size={16} /> ¡Cuenta registrada! Bienvenido...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <EditorialInput
                  label="Nombre Completo"
                  placeholder="Tu Nombre y Apellido"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <EditorialInput
                  label="Correo Electrónico"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <EditorialInput
                  label="Teléfono / WhatsApp"
                  placeholder="+595 981 000 000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <EditorialInput
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <p className="text-[10px] text-[var(--text-muted)] pt-1">
                  Al registrarte aceptas los Términos y Condiciones y la Política de Privacidad de LA REGALERÍA.
                </p>

                <EditorialButton type="submit" fullWidth loading={loading} className="mt-2">
                  Crear mi cuenta
                </EditorialButton>
              </form>
            )}

            {/* Switch to Login */}
            <div className="border-t border-[var(--border-subtle)] pt-6 text-center text-xs text-[var(--text-secondary)]">
              <p>¿Ya tienes una cuenta registrada?</p>
              <Link href="/login" className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent-gold)] underline inline-block mt-1">
                Iniciar Sesión en LA REGALERÍA
              </Link>
            </div>

          </div>
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}
