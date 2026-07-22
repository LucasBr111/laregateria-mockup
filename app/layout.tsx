import type { Metadata } from 'next';
import './globals.css';
import { CartDrawer } from '@/components/shop/CartDrawer';

export const metadata: Metadata = {
  title: 'LA regalerÍA — Alta Moda Femenina',
  description:
    'Ecosistema editorial de moda femenina premium. Colecciones exclusivas, ropa de gym sculpt y novedades. Entrega en cde y todo Paraguay.',
  keywords: ['moda femenina', 'vestidos', 'ropa gym', 'Paraguay', 'cde', 'alta costura'],
  openGraph: {
    title: 'LA regalerÍA — Alta Moda Femenina',
    description: 'Moda femenina premium. Vestidos, Gym Sculpt, Novedades.',
    siteName: 'La regalería',
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
        <CartDrawer />
        <main className="min-h-dvh">
          {children}
        </main>
      </body>
    </html>
  );
}
