'use client';

import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { CONTACT_EMAIL, LINKEDIN_URL } from '@/lib/constants';

const WHY_JOIN = [
  { icon: '🌱', title: 'Growth Industry', description: 'Be part of the agriculture sector that feeds 1.4 billion people. Our products directly impact farmer livelihoods.' },
  { icon: '🏭', title: 'Manufacturing Scale', description: '5 group companies, multiple plants across Rajasthan and MP. Work with large-scale industrial operations.' },
  { icon: '📈', title: 'Career Growth', description: 'Fast-growing organization with opportunities across R&D, operations, sales, marketing, and corporate functions.' },
  { icon: '🤝', title: 'Family Values', description: 'A first-generation entrepreneurial culture that values integrity, hard work, and innovation since 1989.' },
  { icon: '🎓', title: 'Learning & Development', description: 'Exposure to phosphate chemistry, fertilizer manufacturing, quality control, and agri-business operations.' },
  { icon: '🌍', title: 'Social Impact', description: 'Our work directly contributes to food security and farmer prosperity across 5 Indian states.' },
];

const DEPARTMENTS = [
  { title: 'Manufacturing & Operations', roles: 'Plant Engineers, Production Supervisors, Quality Control, Maintenance' },
  { title: 'Sales & Marketing', roles: 'Area Sales Managers, Marketing Executives, Product Managers' },
  { title: 'R&D & Agronomics', roles: 'Agronomists, Soil Scientists, Product Development Engineers' },
  { title: 'Finance & Accounts', roles: 'Accountants, Financial Analysts, Audit Associates' },
  { title: 'Supply Chain & Logistics', roles: 'Supply Chain Managers, Logistics Coordinators, Warehouse Supervisors' },
  { title: 'Human Resources', roles: 'HR Business Partners, Recruitment Specialists, Training Coordinators' },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-gradient py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <ScrollReveal>
            <span className="text-xs font-bold font-body tracking-[0.1em] uppercase text-white/60 mb-3 block">
              Careers at Annadata
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-heading text-white mb-4">
              Build Your Career<br />with Ostwal Group
            </h1>
            <p className="text-white/90 font-body text-lg max-w-2xl mx-auto mb-8">
              Join one of India&apos;s pioneering fertilizer manufacturing groups. Help us transform
              agriculture and empower farmers across the nation.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Career Enquiry — Ostwal Group`}>
              <Button variant="white-outline" size="lg">
                📧 Send Your Resume
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Join Us */}
      <SectionWrapper bg="white">
        <div className="text-center mb-12">
          <SectionLabel>Why Join Us</SectionLabel>
          <SectionHeading className="mt-2">Why Work with the Ostwal Group?</SectionHeading>
        </div>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {WHY_JOIN.map((item) => (
            <StaggerItem key={item.title}>
              <div className="bg-section-bg rounded-lg p-6 hover:shadow-tech-soft transition-shadow h-full">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-heading font-semibold text-charcoal text-base mb-2">{item.title}</h3>
                <p className="text-body-text text-sm font-body leading-relaxed">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Departments */}
      <SectionWrapper bg="section">
        <div className="text-center mb-12">
          <SectionLabel>Departments</SectionLabel>
          <SectionHeading className="mt-2">Explore Opportunities</SectionHeading>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {DEPARTMENTS.map((dept) => (
            <StaggerItem key={dept.title}>
              <div className="bg-white rounded-lg p-6 shadow-tech-soft h-full">
                <h3 className="font-heading font-semibold text-coral text-base mb-2">{dept.title}</h3>
                <p className="text-body-text text-sm font-body leading-relaxed">
                  <span className="font-semibold text-charcoal">Typical roles:</span> {dept.roles}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* How to Apply */}
      <SectionWrapper bg="white">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel>How to Apply</SectionLabel>
          <SectionHeading className="mt-2 mb-6">Interested in Joining Us?</SectionHeading>
          <div className="bg-section-bg rounded-lg p-8">
            <p className="text-body-text font-body mb-6 leading-relaxed">
              Send your resume with a cover letter to our HR department. Please mention
              the position/department you&apos;re interested in and your location preference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`mailto:${CONTACT_EMAIL}?subject=Career Application — Ostwal Group`}>
                <Button size="lg">
                  📧 Email Your Resume
                </Button>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  🔗 Connect on LinkedIn
                </Button>
              </a>
            </div>
            <p className="text-xs text-body-text/60 font-body mt-4">
              Email: {CONTACT_EMAIL} · {' '}
              We are an equal opportunity employer.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
