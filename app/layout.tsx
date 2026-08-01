import type { Metadata } from 'next';
import './globals.css';


// TODO: Remove CheckoutProvider import once cart/checkout/wishlist features are implemented
// For now, using a no-op provider for the menu-only version
const NoOpCheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const metadata: Metadata = {
  title: 'Café Central - Especialidad y Vanguardia en Chiloé',
  description: 'Descubre el mundo del café de especialidad en la Isla de Chiloé. Una experiencia gastronómica única con nuestros cafés, pasteles de autor y opciones los productos veganos más innovadores de la región.',
  keywords: ['café', 'especialidad', 'chiloe', 'cafeteria', 'menu', 'pasteleria', 'vegan', 'nextjs'],
  authors: [{ name: 'Café Central' }],
  openGraph: {
    title: 'Café Central - Especialidad y Vanguardia en Chiloé',
    description: 'Una experiencia gastronómica única en la Isla de Chiloé',
    type: 'website',
    locale: 'es_CL',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark antialiased">
      <body className="bg-black text-white antialiased font-display">
        <NoOpCheckoutProvider>
          {children}
        </NoOpCheckoutProvider>
      </body>
    </html>
  );
}