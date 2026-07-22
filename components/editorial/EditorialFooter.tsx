'use client';
import Link from 'next/link';

export function EditorialFooter() {
  return (
    <footer className="bg-[var(--bg-base)] border-t border-[var(--border-subtle)] text-[var(--text-secondary)] pt-16 pb-12">
      <div className="container-app space-y-16">

        {/* Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
            <span className="font-serif text-2xl md:text-3xl text-[var(--text-primary)] font-light tracking-[0.15em] block">
              LA REGALERÍA
            </span>
            <p className="text-xs text-[var(--text-secondary)] font-sans font-light leading-relaxed max-w-sm">
              Plataforma de moda femenina concebida bajo principios editoriales. Confección exclusiva en Paraguay con envíos protegidos a todo el país.
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] pt-2">
              CDE • PARAGUAY
            </p>
          </div>

          {/* Col 3: Colecciones */}
          <div className="space-y-4">
            <p className="editorial-label">COLECCIONES</p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/catalog?cat=vestidos" className="hover:text-[var(--text-primary)] transition-colors">
                  Vestidos de Noche
                </Link>
              </li>
              <li>
                <Link href="/catalog?cat=gym" className="hover:text-[var(--text-primary)] transition-colors">
                  Gym & Activewear Sculpt
                </Link>
              </li>
              <li>
                <Link href="/catalog?cat=new" className="hover:text-[var(--text-primary)] transition-colors">
                  Novedades de Temporada
                </Link>
              </li>
              <li>
                <Link href="/catalog?cat=clientes" className="hover:text-[var(--text-primary)] transition-colors">
                  Looks Curados
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Empresa & Ayuda */}
          <div className="space-y-4">
            <p className="editorial-label">EXPERIENCIA</p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/profile" className="hover:text-[var(--text-primary)] transition-colors">
                  Mi Perfil & Beneficios
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[var(--text-primary)] transition-colors">
                  Envíos & Zonas
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-[var(--text-primary)] transition-colors">
                  Nuestra Historia & Filosofía
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">
                  Contacto Directo & Equipo
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[var(--text-primary)] transition-colors text-[var(--text-muted)]">
                  Acceso ERP Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Ateliers & Contacto */}
          <div className="space-y-4">
            <p className="editorial-label">CONTACTO ATELIER</p>
            <div className="space-y-2 text-xs">
              <p className="text-[var(--text-primary)] font-medium">WhatsApp Atelier</p>
              <p className="text-[var(--text-muted)]">+595 981 000 000</p>
              <p className="text-[var(--text-muted)]">Atención personalizada Lunes a Sábado de 09:00 a 19:00 hs.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="border-t border-[var(--border-subtle)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} LA REGALERÍA S.A. TODOS LOS DERECHOS RESERVADOS.</p>
          <div className="flex items-center gap-4">
            <span>BANCARD</span>
            <span>·</span>
            <span>PAGOPAR</span>
            <span>·</span>  
            <span>TRANSFERENCIA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
