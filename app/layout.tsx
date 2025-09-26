import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipLinks from "@/components/ui/SkipLinks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Konfort Total - Tienda en Línea de Muebles",
    template: "%s | Konfort Total"
  },
  description: "Tienda en línea especializada en muebles para el hogar en Cuba. Encuentra la mejor calidad en muebles modernos y tradicionales con entrega a domicilio.",
  keywords: ["muebles", "tienda en línea", "Cuba", "hogar", "decoración", "muebles modernos"],
  authors: [{ name: "Konfort Total" }],
  creator: "Konfort Total",
  publisher: "Konfort Total",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CU',
    url: 'http://localhost:3000',
    title: 'Konfort Total - Tienda en Línea de Muebles',
    description: 'Tienda en línea especializada en muebles para el hogar en Cuba.',
    siteName: 'Konfort Total',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konfort Total - Tienda en Línea de Muebles',
    description: 'Tienda en línea especializada en muebles para el hogar en Cuba.',
    creator: '@konforttotal',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SkipLinks />
        <AuthProvider>
          <Header />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
