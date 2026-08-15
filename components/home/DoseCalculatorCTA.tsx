'use client';

import Link from 'next/link';
import { SectionWrapper } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function DoseCalculatorCTA() {
  return (
    <SectionWrapper bg="dark" className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #E15959 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, #3288A5 0%, transparent 50%)`,
        }} />
      </div>

      <div className="relative z-10 text-center">
        <ScrollReveal>
          <span className="text-xs font-bold font-body tracking-[0.1em] uppercase text-white/50 mb-2 block">
            Smart Farming
          </span>
          <h2 className="text-2xl md:text-[32px] font-semibold font-heading leading-[1.2] text-white mb-4">
            Calculate Exact Fertilizer Dosage for Your Crop
          </h2>
          <p className="text-white/70 text-base font-body max-w-xl mx-auto mb-8">
            Use our intelligent dose calculator to get precise Annadata product
            recommendations based on your crop, growth stage, and land area.
          </p>
          <Link href="/dose-calculator">
            <Button size="lg">
              Use Calculator
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
