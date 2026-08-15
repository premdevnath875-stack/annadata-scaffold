'use client';

import Link from 'next/link';
import { SectionWrapper } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { StatsCounter } from '@/components/animations/StatsCounter';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { STATS } from '@/lib/constants';

export function VisionStats() {
  return (
    <SectionWrapper bg="gradient" id="vision">
      <div className="text-center">
        <ScrollReveal>
          <span className="text-xs font-bold font-body tracking-[0.1em] uppercase text-white/60 mb-2 block">
            Our Journey
          </span>
          <h2 className="text-2xl md:text-[32px] font-semibold font-heading leading-[1.2] text-white mb-6">
            A Pioneer in Fertilizer Manufacturing
          </h2>
          <p className="text-white/90 text-base md:text-lg font-body leading-relaxed max-w-3xl mx-auto mb-12">
            A leading pioneer in the fertilizer and agro-products sector,
            Ostwal Group of Industries has completely revolutionized the way of
            manufacturing beneficiated rock phosphate and single super phosphate
            fertilizers in India — delivered to farmers under the trusted
            Annadata brand.
          </p>
        </ScrollReveal>

        <StatsCounter stats={STATS} className="mb-12" />

        <ScrollReveal delay={0.5}>
          <Link href="/about">
            <Button variant="white-outline" size="lg">
              Read More About Us
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
