'use client';

import Link from 'next/link';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const FEATURED_CROPS = [
  { name: 'Wheat', slug: 'wheat', emoji: '🌾', season: 'Rabi' },
  { name: 'Rice', slug: 'rice', emoji: '🌿', season: 'Kharif' },
  { name: 'Cotton', slug: 'cotton', emoji: '🤍', season: 'Kharif' },
  { name: 'Soybean', slug: 'soybean', emoji: '🫘', season: 'Kharif' },
  { name: 'Sugarcane', slug: 'sugarcane', emoji: '🎋', season: 'Annual' },
  { name: 'Groundnut', slug: 'groundnut', emoji: '🥜', season: 'Kharif' },
];

export function CropPreview() {
  return (
    <SectionWrapper bg="section">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <SectionLabel>Crop Solutions</SectionLabel>
          <SectionHeading className="mt-2">Crop-Wise Nutrition Guide</SectionHeading>
        </div>
        <Link href="/crops">
          <Button size="md">View All Crops</Button>
        </Link>
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_CROPS.map((crop) => (
          <StaggerItem key={crop.slug}>
            <Link href={`/crops/${crop.slug}`}>
              <Card
                interactive
                className="h-full bg-white hover:bg-white group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-teal/10 flex items-center justify-center text-3xl shrink-0 group-hover:bg-teal/20 transition-colors">
                    {crop.emoji}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold font-heading text-charcoal">
                      {crop.name}
                    </h3>
                    <span className="text-xs font-semibold text-teal font-body bg-teal/10 px-2 py-0.5 rounded-full">
                      {crop.season}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
