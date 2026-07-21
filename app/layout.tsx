import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/shop/Header';
import { BottomNav } from '@/components/shop/BottomNav';
import { CartDrawer } from '@/components/shop/CartDrawer';

export const metadata: Metadata = {
  title: 'La Regatería — Moda Femenina',
  description:
    'Plataforma de moda femenina premium. Vestidos, ropa de gym y novedades. Entrega en Asunción y todo Paraguay.',
  keywords: ['moda femenina', 'vestidos', 'ropa gym', 'Paraguay', 'Asunción'],
  openGraph: {
    title: 'La Regatería — Moda Femenina',
    description: 'Moda femenina premium. Vestidos, Gym, Novedades.',
    siteName: 'La Regatería',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <CartDrawer />
        <main className="min-h-dvh">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
