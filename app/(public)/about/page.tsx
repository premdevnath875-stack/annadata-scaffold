'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { StatsCounter } from '@/components/animations/StatsCounter';
import {
  BRAND_NAME,
  TAGLINE,
  SUB_TAGLINE,
  ESTABLISHED_YEAR,
  GROUP_COMPANIES,
  LEADERSHIP,
  STATES_SERVED,
  STATS,
  OFFICE_ADDRESS,
} from '@/lib/constants';

const MILESTONES = [
  { year: '1989', title: 'Foundation', description: 'Ostwal Phoschem (India) Ltd established — the first entity of what would become the Ostwal Group.' },
  { year: '1997', title: 'Expansion', description: 'Madhya Bharat Agro Products Ltd (MBAPL) incorporated, expanding into Madhya Pradesh.' },
  { year: '2004', title: 'Diversification', description: 'Seasons Agrochem India Pvt Ltd incorporated — entry into agrochemicals.' },
  { year: '2015', title: 'ISO Certified', description: 'Obtained ISO 9001:2015 certification, reinforcing commitment to quality.' },
  { year: '2019', title: 'NSE Listing', description: 'MBAPL listed on NSE Main Board, marking a milestone in corporate governance.' },
  { year: 'Present', title: '37+ Products', description: 'Annadata brand now serves 5 states with 37+ products across 7 categories.' },
];

const VERTICALS = [
  { icon: '🧪', title: 'Fertilizers & Agri-Inputs', description: 'SSP, Water Soluble, Micronutrients, Speciality Products' },
  { icon: '⚗️', title: 'Chemicals', description: 'Oleum, LBASA, H Acid, Sulphuric Acid, Phosphoric Acid' },
  { icon: '🌾', title: 'Export & Import', description: 'Agri-Food Commodities — Global trade partnerships' },
  { icon: '🏗️', title: 'Real Estate', description: 'Property development and infrastructure' },
  { icon: '🏨', title: 'Hospitality', description: 'Hotel and hospitality ventures' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banners/silder1.png"
            alt="Ostwal Group industrial operations"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/60" />
        </div>
        <div className="relative max-w-container mx-auto px-4 md:px-8 lg:px-16 py-24 md:py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-xs font-bold font-body tracking-[0.1em] uppercase text-teal mb-3 block">
              About Us
            </span>
            <h1 className="font-heading font-bold text-white text-3xl md:text-5xl leading-tight mb-4">
              The Ostwal Group<br />
              <span className="text-coral">of Industries</span>
            </h1>
            <p className="text-white/80 font-body text-lg max-w-xl leading-relaxed">
              {TAGLINE} — {SUB_TAGLINE}. From a single SSP plant in 1989 to a multi-company
              industrial conglomerate serving five Indian states.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <SectionLabel>Our Story</SectionLabel>
            <SectionHeading className="mt-2 mb-6">
              Pioneer in Phosphatic Fertilizers Since {ESTABLISHED_YEAR}
            </SectionHeading>
            <div className="space-y-4 text-body-text font-body leading-relaxed">
              <p>
                The journey of the Ostwal Group began in <strong>1989</strong> with the founding of{' '}
                <strong>Ostwal Phoschem (India) Ltd</strong> in Bhilwara, Rajasthan — a vision by
                <strong> Mr. M.K. Ostwal</strong>, a first-generation technocrat entrepreneur who
                saw immense potential in phosphatic fertilizer manufacturing.
              </p>
              <p>
                Under the brand name <strong>&quot;Annadata&quot;</strong> (meaning &quot;provider of food grain&quot;),
                the company started producing Single Super Phosphate (SSP) and quickly became
                one of the most trusted fertilizer brands in the region.
              </p>
              <p>
                Over three decades, the group expanded into multiple verticals — from fertilizers
                and agrochemicals to chemicals, agri-food exports, real estate, and hospitality
                — establishing <strong>5 group companies</strong> with a combined annual capacity
                of over <strong>12 lakh MTPA</strong>.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="relative rounded-lg overflow-hidden shadow-tech-soft">
              <Image
                src="/images/banners/slider2.png"
                alt="Ostwal Group facility"
                width={640}
                height={420}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <span className="bg-coral/20 text-coral text-xs font-bold px-3 py-1 rounded-full font-body">
                  ISO 9001:2015 Certified
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Stats */}
      <section className="bg-brand-gradient py-16 md:py-20">
        <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
          <StatsCounter stats={STATS} />
        </div>
      </section>

      {/* Leadership */}
      <SectionWrapper bg="section">
        <div className="text-center mb-12">
          <SectionLabel>Leadership</SectionLabel>
          <SectionHeading className="mt-2">Visionary Leadership</SectionHeading>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {LEADERSHIP.map((leader) => (
            <StaggerItem key={leader.name}>
              <div className="bg-white rounded-lg p-6 text-center shadow-tech-soft h-full">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-coral/10 to-teal/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="font-heading font-semibold text-charcoal text-lg mb-1">{leader.name}</h3>
                <p className="text-teal text-sm font-semibold font-body mb-3">{leader.role}</p>
                <p className="text-body-text text-sm font-body leading-relaxed">{leader.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Group Companies */}
      <SectionWrapper bg="white">
        <div className="text-center mb-12">
          <SectionLabel>Group Companies</SectionLabel>
          <SectionHeading className="mt-2">Our Companies</SectionHeading>
        </div>
        <StaggerContainer className="space-y-6 max-w-4xl mx-auto">
          {GROUP_COMPANIES.map((company, index) => (
            <StaggerItem key={company.shortName}>
              <div className="bg-section-bg rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-white shadow-tech-soft shrink-0">
                  <span className="text-2xl font-bold font-heading text-coral">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-charcoal text-lg mb-1">{company.name}</h3>
                  <p className="text-body-text text-sm font-body leading-relaxed mb-3">{company.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs font-body">
                    {company.capacity && (
                      <span className="bg-teal/10 text-teal px-3 py-1 rounded-full font-semibold">
                        {company.capacity}
                      </span>
                    )}
                    <span className="bg-coral/10 text-coral px-3 py-1 rounded-full font-semibold">
                      📍 {company.location}
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper bg="section">
        <div className="text-center mb-12">
          <SectionLabel>Our Journey</SectionLabel>
          <SectionHeading className="mt-2">Milestones</SectionHeading>
        </div>
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border-subtle md:-translate-x-0.5" />
          {MILESTONES.map((milestone, i) => (
            <ScrollReveal key={milestone.year} delay={i * 0.1}>
              <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-coral rounded-full border-4 border-white shadow-tech-soft -translate-x-1/2 z-10 mt-1.5" />
                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8 md:ml-auto'}`}>
                  <span className="text-coral font-bold font-heading text-lg">{milestone.year}</span>
                  <h3 className="font-heading font-semibold text-charcoal text-base mt-1">{milestone.title}</h3>
                  <p className="text-body-text text-sm font-body mt-1 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Business Verticals */}
      <SectionWrapper bg="white">
        <div className="text-center mb-12">
          <SectionLabel>Diversified Businesses</SectionLabel>
          <SectionHeading className="mt-2">Our Business Verticals</SectionHeading>
        </div>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {VERTICALS.map((v) => (
            <StaggerItem key={v.title}>
              <div className="bg-section-bg rounded-lg p-6 text-center hover:shadow-tech-soft transition-shadow h-full">
                <span className="text-3xl block mb-3">{v.icon}</span>
                <h3 className="font-heading font-semibold text-charcoal text-sm mb-2">{v.title}</h3>
                <p className="text-body-text text-xs font-body leading-relaxed">{v.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Markets Served */}
      <SectionWrapper bg="section">
        <div className="text-center mb-10">
          <SectionLabel>Our Presence</SectionLabel>
          <SectionHeading className="mt-2">Markets Served</SectionHeading>
        </div>
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {STATES_SERVED.map((state) => (
            <ScrollReveal key={state}>
              <div className="bg-white rounded-lg px-6 py-4 shadow-tech-soft flex items-center gap-3">
                <span className="text-xl">📍</span>
                <span className="font-heading font-semibold text-charcoal">{state}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CSR */}
      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>Corporate Social Responsibility</SectionLabel>
          <SectionHeading className="mt-2 mb-6">Giving Back to Society</SectionHeading>
          <div className="bg-section-bg rounded-lg p-8">
            <span className="text-4xl block mb-4">🤝</span>
            <h3 className="font-heading font-semibold text-charcoal text-xl mb-3">
              Smt. Nirmala Devi Ostwal Seva Sansthan
            </h3>
            <p className="text-body-text font-body leading-relaxed">
              A non-profit trust established by the Ostwal family, focused on helping the needy and poor
              through philanthropic works. The Sansthan carries forward the family&apos;s commitment to
              social welfare and community upliftment alongside their industrial endeavors.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
