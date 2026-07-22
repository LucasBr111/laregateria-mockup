'use client';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useCartStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Vestidos',  href: '/catalog?cat=vestidos' },
  { label: 'Gym',       href: '/catalog?cat=gym'      },
  { label: 'New',       href: '/catalog?cat=new'      },
  { label: 'Clientas',  href: '/catalog?cat=clientes' },
];

export function Header() {
  const itemCount   = useCartStore((s) => s.itemCount());
  const openCart    = useUIStore((s) => s.openCart);
  const menuOpen    = useUIStore((s) => s.mobileMenuOpen);
  const toggleMenu  = useUIStore((s) => s.toggleMobileMenu);
  const closeMenu   = useUIStore((s) => s.closeMobileMenu);
  const theme       = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ensure DOM attribute matches current theme state on mount
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [mounted, theme]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
        )}
      >
        <div className="container-app flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="font-display text-2xl font-light tracking-widest text-gold-gradient select-none"
          >
            La regalería
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--primary)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors rounded-full hover:bg-[var(--glass-bg)]"
              aria-label="Cambiar tema"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {mounted && theme === 'light' ? (
                <Moon size={19} className="text-amber-600" />
              ) : (
                <Sun size={19} className="text-[var(--primary)]" />
              )}
            </button>

            <button
              className="w-9 h-9 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative w-9 h-9 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
              aria-label="Carrito"
            >
              <ShoppingBag size={20} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold text-black animate-gold-glow"
                  style={{ background: 'var(--primary)' }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
              onClick={toggleMenu}
              aria-label="Menú"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/80 backdrop-blur-md md:hidden"
          onClick={closeMenu}
        >
          <nav
            className="absolute top-0 right-0 h-full w-72 glass-drawer flex flex-col pt-24 pb-8 px-8 gap-2 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs tracking-widest uppercase text-[var(--text-dim)]">Categorías</p>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 text-xs text-[var(--primary)] font-medium"
              >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-xl font-display font-light text-[var(--text-cream)] hover:text-[var(--primary)] transition-colors py-2 border-b border-[var(--glass-border)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8 space-y-2">
              <Link
                href="/profile"
                onClick={closeMenu}
                className="block text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors py-2"
              >
                Mi Perfil & Beneficios
              </Link>
              <Link
                href="/admin"
                onClick={closeMenu}
                className="block text-sm text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors py-2"
              >
                Panel Admin
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
