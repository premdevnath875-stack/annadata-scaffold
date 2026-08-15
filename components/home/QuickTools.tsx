'use client';

import Link from 'next/link';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const TOOLS = [
  {
    icon: '🧪',
    label: 'Dose Calculator',
    description: 'Calculate exact fertilizer dosage for your crop',
    href: '/dose-calculator',
  },
  {
    icon: '🌾',
    label: 'Crop Guide',
    description: 'Detailed crop-wise nutrition and management',
    href: '/crops',
  },
  {
    icon: '🔍',
    label: 'Product Finder',
    description: 'Explore our complete fertilizer catalogue',
    href: '/products',
  },
  {
    icon: '📍',
    label: 'Find Dealer',
    description: 'Locate Annadata dealers near you',
    href: '/dealer-locator',
  },
];

export function QuickTools() {
  return (
    <SectionWrapper bg="section" id="quick-tools">
      <ScrollReveal>
        <SectionLabel>Farmer Tools</SectionLabel>
        <SectionHeading className="mt-2 mb-10">Quick Access Tools</SectionHeading>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOOLS.map((tool) => (
          <StaggerItem key={tool.href}>
            <Link href={tool.href} className="block h-full">
              <Card interactive className="h-full flex flex-col items-start gap-4 bg-white hover:bg-white">
                <span className="text-4xl">{tool.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-charcoal mb-1">
                    {tool.label}
                  </h3>
                  <p className="text-sm text-body-text font-body">{tool.description}</p>
                </div>
                <span className="mt-auto text-coral font-semibold text-sm font-body flex items-center gap-1">
                  Explore →
                </span>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
