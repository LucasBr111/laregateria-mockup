'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, ShoppingBag, User } from 'lucide-react';
import { useCartStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Inicio',    href: '/',         icon: Home        },
  { label: 'Catálogo',  href: '/catalog',  icon: Grid3X3     },
  { label: 'Mi Perfil', href: '/profile',  icon: User        },
];

export function BottomNav() {
  const pathname  = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart  = useUIStore((s) => s.openCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // No mostrar en admin
  if (pathname.startsWith('/admin')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-[var(--glass-border)] md:hidden">
      <div className="flex items-center justify-around px-2 py-2 pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all duration-200"
            >
              <Icon
                size={22}
                className={cn(
                  'transition-colors duration-200',
                  active ? 'text-[var(--primary)]' : 'text-[var(--text-dim)]'
                )}
              />
              <span
                className={cn(
                  'text-[10px] tracking-wider font-medium transition-colors duration-200',
                  active ? 'text-[var(--primary)]' : 'text-[var(--text-dim)]'
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}

        {/* Cart button */}
        <button
          onClick={openCart}
          className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl relative"
        >
          <div className="relative">
            <ShoppingBag size={22} className="text-[var(--text-dim)]" />
            {mounted && itemCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold text-black"
                style={{ background: 'var(--primary)' }}
              >
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wider font-medium text-[var(--text-dim)]">Carrito</span>
        </button>
      </div>
    </nav>
  );
}
