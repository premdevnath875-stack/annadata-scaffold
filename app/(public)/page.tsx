import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickTools } from '@/components/home/QuickTools';
import { WhatWeDo } from '@/components/home/WhatWeDo';
import { VisionStats } from '@/components/home/VisionStats';
import { GroupCompanies } from '@/components/home/GroupCompanies';
import { ProductPreview } from '@/components/home/ProductPreview';
import { CropPreview } from '@/components/home/CropPreview';
import { DoseCalculatorCTA } from '@/components/home/DoseCalculatorCTA';
import { Testimonials } from '@/components/home/Testimonials';
import { CSRSection } from '@/components/home/CSRSection';

export const metadata: Metadata = {
  title: 'Annadata | SSP, Water Soluble & Speciality Fertilizers | Ostwal Group of Industries, Bhilwara',
  description:
    'Annadata — India\'s trusted fertilizer brand from Ostwal Group of Industries. SSP, boronated & zincated SSP, water soluble fertilizers, micronutrients and speciality crop nutrition products since 1989. ISO 9001:2015 certified. Serving Rajasthan, MP, Gujarat, UP & Maharashtra.',
  keywords:
    'Annadata fertilizer, Ostwal Group, SSP fertilizer, boronated SSP, water soluble fertilizer, micronutrients India, fertilizer manufacturer India, Bhilwara fertilizer',
  openGraph: {
    title: 'Annadata | Pioneer Fertilizer Brand by Ostwal Group',
    description: 'SSP, Water Soluble & Speciality Fertilizers — Trusted Since 1989',
    url: '/',
    siteName: 'Annadata',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickTools />
      <WhatWeDo />
      <VisionStats />
      <GroupCompanies />
      <ProductPreview />
      <CropPreview />
      <DoseCalculatorCTA />
      <Testimonials />
      <CSRSection />

      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Annadata',
            alternateName: 'Ostwal Group of Industries',
            url: 'https://www.ostwal.in',
            logo: '/logo/annadata-logo.png',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Plot No. 5-O-20/21, R.C. Vyas Colony',
              addressLocality: 'Bhilwara',
              addressRegion: 'Rajasthan',
              postalCode: '311001',
              addressCountry: 'IN',
            },
            foundingDate: '1989',
            description:
              'Annadata — pioneer fertilizer brand offering SSP, water soluble fertilizers and micronutrients',
            sameAs: ['https://in.linkedin.com/company/ostwal-group-of-industries'],
          }),
        }}
      />
    </>
  );
}
