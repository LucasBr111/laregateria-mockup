'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, Sun, Moon, LogIn, UserPlus, LogOut, ChevronRight } from 'lucide-react';
import { useCartStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { EditorialInput } from '@/components/ui/EditorialInput';

const PROMO_MESSAGES = [
  'ENVÍOS NACIONES A TODO PARAGUAY',
  'DROP 01 YA DISPONIBLE — EDICIÓN LIMITADA',
  'CAMBIOS Y DEVOLUCIONES SIN COSTO',
  'HASTA 6 CUOTAS SIN INTERÉS CON TARJETAS',
];

const NAV_LINKS = [
  { label: 'Vestidos',  href: '/catalog?cat=vestidos' },
  { label: 'Gym',       href: '/catalog?cat=gym'      },
  { label: 'New',       href: '/catalog?cat=new'      },
  { label: 'Clientas',  href: '/catalog?cat=clientes' },
];

export function EditorialNavbar() {
  const itemCount   = useCartStore((s) => s.itemCount());
  const openCart    = useUIStore((s) => s.openCart);
  const menuOpen    = useUIStore((s) => s.mobileMenuOpen);
  const toggleMenu  = useUIStore((s) => s.toggleMobileMenu);
  const closeMenu   = useUIStore((s) => s.closeMobileMenu);
  const theme       = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  const [promoIdx, setPromoIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted]   = useState(false);

  // Auth modal simulation state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode]           = useState<'login' | 'register' | 'profile'>('login');
  const [isLoggedIn, setIsLoggedIn]       = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setPromoIdx((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4500);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [mounted, theme]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setAuthModalOpen(false);
  };

  return (
    <>
      {/* ── 1. PROMO BAR SUPERIOR ── */}
      <div className="bg-[var(--text-primary)] text-[var(--bg-base)] py-2 text-[10px] tracking-[0.25em] font-semibold uppercase text-center overflow-hidden transition-colors duration-300">
        <div className="container-app flex items-center justify-center">
          <span key={promoIdx} className="animate-fade-in truncate">
            {PROMO_MESSAGES[promoIdx]}
          </span>
        </div>
      </div>

      {/* ── 2. NAVBAR STICKY EDITORIAL ── */}
      <header
        className={cn(
          'sticky top-0 z-40 editorial-nav transition-all duration-300',
          scrolled ? 'py-3 shadow-[var(--shadow-subtle)]' : 'py-5'
        )}
      >
        <div className="container-app flex items-center justify-between">

          {/* Left: Mobile Menu Toggle & Desktop Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleMenu}
              className="md:hidden p-1 text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors"
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--accent-gold)] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Brand Logo (Serif) */}
          <Link
            href="/"
            onClick={closeMenu}
            className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-[var(--text-primary)] select-none hover:opacity-80 transition-opacity"
          >
            LA REGATERÍA
          </Link>

          {/* Right: Actions (Theme, Search, Profile, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {mounted && theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Search */}
            <Link
              href="/catalog"
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:flex"
              title="Buscar"
            >
              <Search size={18} />
            </Link>

            {/* Profile / Auth Button */}
            <button
              onClick={() => {
                if (isLoggedIn) setAuthMode('profile');
                else setAuthMode('login');
                setAuthModalOpen(true);
              }}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title="Cuenta"
            >
              <User size={18} />
            </button>

            {/* Wishlist */}
            <Link
              href="/profile"
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:flex"
              title="Wishlist"
            >
              <Heart size={18} />
            </Link>

            {/* Cart Drawer Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors"
              aria-label="Ver carrito"
            >
              <ShoppingBag size={19} />
              {mounted && itemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[var(--text-primary)] text-[var(--bg-base)] text-[9px] font-bold flex items-center justify-center rounded-none">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden animate-fade-in"
          onClick={closeMenu}
        >
          <div
            className="absolute top-0 left-0 h-full w-80 bg-[var(--bg-base)] border-r border-[var(--border-subtle)] p-8 flex flex-col justify-between animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <span className="font-serif text-xl tracking-[0.1em]">LA REGATERÍA</span>
                <button onClick={closeMenu} className="p-1 text-[var(--text-secondary)]">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                <p className="editorial-label">Categorías</p>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="font-serif text-2xl text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-4 border-t border-[var(--border-subtle)] pt-6">
              <button
                onClick={() => { closeMenu(); setAuthModalOpen(true); }}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <User size={16} /> {isLoggedIn ? 'Mi Perfil' : 'Iniciar Sesión'}
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── AUTH SIMULATION MODAL (Login / Register / Profile) ── */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title={authMode === 'login' ? 'Iniciar Sesión' : authMode === 'register' ? 'Crear Cuenta' : 'Mi Cuenta'}
        size="sm"
      >
        {authMode === 'profile' ? (
          <div className="space-y-4 text-center py-2">
            <p className="text-sm font-medium text-[var(--text-primary)]">Valentina Riquelme</p>
            <p className="text-xs text-[var(--text-secondary)]">vale.riquelme@gmail.com</p>
            <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-col gap-2">
              <Link href="/profile" onClick={() => setAuthModalOpen(false)}>
                <EditorialButton variant="ghost" fullWidth size="sm">
                  Ver Panel de Clienta
                </EditorialButton>
              </Link>
              <EditorialButton
                variant="ghost"
                fullWidth
                size="sm"
                onClick={() => { setIsLoggedIn(false); setAuthModalOpen(false); }}
              >
                <LogOut size={14} /> Cerrar Sesión
              </EditorialButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAuthSubmit} className="space-y-4 pt-1">
            <EditorialInput
              label="Correo Electrónico"
              type="email"
              placeholder="tu@email.com"
              required
            />
            <EditorialInput
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              required
            />
            {authMode === 'register' && (
              <EditorialInput
                label="Nombre Completo"
                placeholder="Nombre y Apellido"
                required
              />
            )}

            <EditorialButton type="submit" fullWidth className="mt-2">
              {authMode === 'login' ? 'Ingresar' : 'Registrarse'}
            </EditorialButton>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline"
              >
                {authMode === 'login' ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
