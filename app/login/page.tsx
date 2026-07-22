'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EditorialNavbar } from '@/components/editorial/EditorialNavbar';
import { EditorialFooter } from '@/components/editorial/EditorialFooter';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { EditorialInput } from '@/components/ui/EditorialInput';
import { Check } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
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
              <p className="editorial-label">CLUB PRIVADO</p>
              <h1 className="font-serif text-3xl font-light text-[var(--text-primary)]">
                Iniciar Sesión
              </h1>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Accede a tu perfil de clienta, beneficios y seguimiento de pedidos.
              </p>
            </div>

            {success ? (
              <div className="p-4 bg-[var(--accent-gold-muted)] border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 animate-fade-in">
                <Check size={16} /> ¡Sesión iniciada! Redirigiendo...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <EditorialInput
                  label="Correo Electrónico"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--text-secondary)]">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="accent-[var(--accent-gold)]"
                    />
                    <span>Recordarme</span>
                  </label>
                  <a href="#" className="text-[var(--accent-gold)] hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <EditorialButton type="submit" fullWidth loading={loading} className="mt-4">
                  Ingresar a mi cuenta
                </EditorialButton>
              </form>
            )}

            {/* Switch to Register */}
            <div className="border-t border-[var(--border-subtle)] pt-6 text-center text-xs text-[var(--text-secondary)]">
              <p>¿Aún no tienes cuenta de clienta?</p>
              <Link href="/register" className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent-gold)] underline inline-block mt-1">
                Crear una cuenta en LA REGALERÍA
              </Link>
            </div>

          </div>
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}
