'use client';

import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function CSRSection() {
  return (
    <SectionWrapper bg="section" id="csr">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <SectionLabel>Social Responsibility</SectionLabel>
          <SectionHeading className="mt-2 mb-6">
            Smt. Nirmala Devi Ostwal Seva Sansthan
          </SectionHeading>
          <p className="text-body-text font-body leading-relaxed mb-4">
            The Ostwal family established the Smt. Nirmala Devi Ostwal Seva Sansthan,
            a non-profit trust dedicated to serving the underprivileged. Through education
            initiatives, healthcare support, and community welfare programs, the trust
            reflects the group&apos;s deep commitment to social upliftment — because
            Annadata believes that nourishing the community is as important as nourishing
            the soil.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-teal font-body font-semibold">
            <span>🎓 Education</span>
            <span>·</span>
            <span>🏥 Healthcare</span>
            <span>·</span>
            <span>🤝 Community Welfare</span>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
