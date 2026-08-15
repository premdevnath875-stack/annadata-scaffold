'use client';

import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const SERVICES = [
  {
    icon: '🌱',
    title: 'Agri-Inputs',
    description: 'SSP, water soluble fertilizers, micronutrients, calcium nitrate, and specialty crop nutrition products under the trusted Annadata brand.',
  },
  {
    icon: '🏗️',
    title: 'Real Estate',
    description: 'Strategic real estate development and investment projects contributing to regional growth and infrastructure.',
  },
  {
    icon: '🤝',
    title: 'CSR Activity',
    description: 'Smt. Nirmala Devi Ostwal Seva Sansthan — community welfare, education support, and philanthropic initiatives for the underprivileged.',
  },
  {
    icon: '🌐',
    title: 'Global Trade',
    description: 'Export & import of agricultural food commodities — connecting Indian agriculture to global markets.',
  },
];

export function WhatWeDo() {
  return (
    <SectionWrapper bg="white">
      <SectionLabel>What We Do</SectionLabel>
      <SectionHeading className="mt-2 mb-10">Our Business Verticals</SectionHeading>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service) => (
          <StaggerItem key={service.title}>
            <Card className="h-full">
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-body-text font-body leading-relaxed">
                {service.description}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
