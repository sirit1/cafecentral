import type { Metadata } from "next/dist/types";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Café Central | La Experiencia del Buen Café en Chiloé",
  description:
    "Café de especialidad en la Isla de Chiloé. Descubre el mejor grano de nuestra tierra. De la sierra a tu taza.",
  keywords: [
    "café",
    "café de especialidad",
    "Chiloé",
    "cafetería",
    "café gourmet",
    "granos de especialidad",
    "pastelería",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Café Central | La Experiencia del Buen Café en Chiloé",
    description:
      "Café de especialidad en la Isla de Chiloé. Descubre el mejor grano de nuestra tierra.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<React.PropsWithChildren<{}>>): React.JSX.Element {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}