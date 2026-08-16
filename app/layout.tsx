import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Annadata | SSP, Water Soluble & Speciality Fertilizers | Ostwal Group',
    template: '%s | Annadata — Ostwal Group',
  },
  description:
    'Annadata — India\'s trusted fertilizer brand from Ostwal Group of Industries. SSP, boronated & zincated SSP, water soluble fertilizers, micronutrients and speciality crop nutrition products since 1989.',
  keywords:
    'Annadata fertilizer, Ostwal Group, SSP fertilizer, boronated SSP, water soluble fertilizer, micronutrients India, fertilizer manufacturer, Bhilwara',
  metadataBase: new URL('https://www.ostwal.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Annadata — Ostwal Group of Industries',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo/annadata-logo.png',
  },
};

import { LanguageProvider } from '@/components/LanguageProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-body-text font-body antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
