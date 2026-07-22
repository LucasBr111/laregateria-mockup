'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useCartStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'La Cápsula',      href: '/catalog?cat=vestidos' },
  { label: 'Catálogo',        href: '/catalog'             },
  { label: 'Nuestra Historia', href: '/#heritage'           },
  { label: 'Contactar',       href: '/#contact'            },
];

export function EditorialNavbar() {
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

  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [mounted, theme]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 editorial-nav transition-all duration-300',
        scrolled ? 'py-3 shadow-[var(--shadow-subtle)]' : 'py-5'
      )}
    >
      <div className="container-app flex items-center justify-between">

        {/* Brand Logo (Serif) */}
        <Link
          href="/"
          onClick={closeMenu}
          className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-[var(--text-primary)] select-none hover:opacity-80 transition-opacity"
        >
          LA REGALERÍA
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
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

        {/* Right: Action Controls (Theme, Search, User Auth, Wishlist, Cart) */}
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
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            title="Buscar"
          >
            <Search size={18} />
          </Link>

          {/* Dedicated Login / Profile Page Link */}
          <Link
            href="/login"
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            title="Mi Cuenta / Iniciar Sesión"
          >
            <User size={18} />
          </Link>

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

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-1 text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors ml-1"
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden animate-fade-in"
          onClick={closeMenu}
        >
          <div
            className="absolute top-0 right-0 h-full w-80 bg-[var(--bg-base)] border-l border-[var(--border-subtle)] p-8 flex flex-col justify-between animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <span className="font-serif text-xl tracking-[0.1em]">LA REGALERÍA</span>
                <button onClick={closeMenu} className="p-1 text-[var(--text-secondary)]">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                <p className="editorial-label">Navegación</p>
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
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <User size={16} /> Iniciar Sesión / Crear Cuenta
              </Link>
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
    </header>
  );
}
