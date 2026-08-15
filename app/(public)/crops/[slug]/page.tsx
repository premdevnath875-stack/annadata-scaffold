'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import type { Crop } from '@/lib/supabase/types';

export default function CropDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('crops')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
      .then(({ data }) => {
        if (data) setCrop(data as Crop);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <SectionWrapper bg="white">
        <div className="animate-pulse space-y-6 max-w-3xl">
          <div className="h-8 bg-section-bg rounded w-1/3" />
          <div className="h-64 bg-section-bg rounded" />
          <div className="h-4 bg-section-bg rounded w-2/3" />
          <div className="h-4 bg-section-bg rounded w-1/2" />
        </div>
      </SectionWrapper>
    );
  }

  if (!crop) {
    return (
      <SectionWrapper bg="white">
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">🌾</span>
          <h1 className="text-2xl font-heading font-semibold text-charcoal mb-3">Crop Not Found</h1>
          <p className="text-body-text font-body mb-6">The crop you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/crops"><Button>Browse All Crops</Button></Link>
        </div>
      </SectionWrapper>
    );
  }

  const sections = [
    { title: 'Climate Requirements', content: crop.climate, icon: '🌤️' },
    { title: 'Soil Requirements', content: crop.soil, icon: '🌍' },
    { title: 'Nutrition Management', content: crop.nutrition_management, icon: '🧪' },
    { title: 'Harvesting', content: crop.harvesting, icon: '🌾' },
    { title: 'Common Diseases', content: crop.diseases, icon: '🦠' },
    { title: 'Expert Tips', content: crop.tips, icon: '💡' },
  ].filter((s) => s.content);

  return (
    <>
      {/* Breadcrumb */}
      <SectionWrapper bg="white" noPadding className="pt-4 pb-2">
        <nav className="text-xs font-body text-body-text flex items-center gap-2">
          <Link href="/" className="hover:text-teal transition-colors">Home</Link>
          <span>›</span>
          <Link href="/crops" className="hover:text-teal transition-colors">Crops</Link>
          <span>›</span>
          <span className="text-coral font-semibold">{crop.name}</span>
        </nav>
      </SectionWrapper>

      {/* Crop header */}
      <SectionWrapper bg="white" noPadding className="pt-4 pb-8">
        <ScrollReveal>
          <SectionLabel>Crop Guide</SectionLabel>
          <SectionHeading className="mt-2" as="h1" size="lg">
            {crop.name}
          </SectionHeading>
          {crop.short_description && (
            <p className="text-body-text font-body text-lg mt-3 max-w-2xl">
              {crop.short_description}
            </p>
          )}
        </ScrollReveal>
      </SectionWrapper>

      {/* Content sections */}
      <SectionWrapper bg="section">
        <div className="max-w-3xl mx-auto space-y-8">
          {sections.length > 0 ? (
            sections.map((section, i) => (
              <ScrollReveal key={section.title} delay={i * 0.1}>
                <div className="bg-white rounded-lg p-6 md:p-8 shadow-tech-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{section.icon}</span>
                    <h2 className="font-heading font-semibold text-charcoal text-lg">{section.title}</h2>
                  </div>
                  <div className="text-body-text font-body leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <span className="text-4xl block mb-4">📝</span>
              <p className="text-body-text font-body">
                Detailed crop information is being prepared by our agronomists.
                Please check back soon or contact our support team.
              </p>
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper bg="white">
        <div className="text-center">
          <h2 className="font-heading font-semibold text-charcoal text-2xl mb-4">
            Need fertilizer recommendations for {crop.name}?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dose-calculator">
              <Button size="lg">Calculate Dose</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Talk to Expert</Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
