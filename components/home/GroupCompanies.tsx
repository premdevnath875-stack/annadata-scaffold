'use client';

import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { CardWhite } from '@/components/ui/Card';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { GROUP_COMPANIES } from '@/lib/constants';

export function GroupCompanies() {
  return (
    <SectionWrapper bg="section">
      <SectionLabel>Our Group</SectionLabel>
      <SectionHeading className="mt-2 mb-10">Ostwal Group of Industries</SectionHeading>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GROUP_COMPANIES.map((company) => (
          <StaggerItem key={company.shortName}>
            <CardWhite className="h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal font-bold font-heading text-sm shrink-0">
                  {company.shortName.slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-semibold font-heading text-charcoal leading-tight">
                    {company.name}
                  </h3>
                  {company.location && (
                    <p className="text-xs text-teal font-body mt-0.5">📍 {company.location}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-body-text font-body leading-relaxed">
                {company.description}
              </p>
              {company.capacity && (
                <div className="mt-3 inline-flex items-center gap-1.5 bg-teal/10 text-teal text-xs font-bold px-3 py-1 rounded-full font-body">
                  ⚡ Capacity: {company.capacity}
                </div>
              )}
            </CardWhite>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
