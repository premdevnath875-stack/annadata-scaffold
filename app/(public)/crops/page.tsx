'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import type { Crop } from '@/lib/supabase/types';

/* Fallback crop images from Unsplash */
const CROP_IMAGES: Record<string, string> = {
  wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
  rice: 'https://images.unsplash.com/photo-1536304993881-460e4e2f8e0c?w=400&h=300&fit=crop',
  cotton: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=400&h=300&fit=crop',
  soybean: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400&h=300&fit=crop',
  sugarcane: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop',
  groundnut: 'https://images.unsplash.com/photo-1567892737941-30e56e59ce07?w=400&h=300&fit=crop',
  mustard: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=300&fit=crop',
  maize: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop',
  onion: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop',
  tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
  chilli: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=300&fit=crop',
  chickpea: 'https://images.unsplash.com/photo-1585015603788-0854b5e78de3?w=400&h=300&fit=crop',
};

export default function CropsPage() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('crops')
      .select('*')
      .eq('status', 'published')
      .order('name')
      .then(({ data }) => {
        if (data) setCrops(data as Crop[]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Page header */}
      <SectionWrapper bg="white" noPadding className="pt-8 pb-4">
        <ScrollReveal>
          <SectionLabel>Crop Portfolio</SectionLabel>
          <SectionHeading className="mt-2" as="h1" size="lg">
            Crop Nutrition Guide
          </SectionHeading>
          <p className="text-body-text font-body mt-3 max-w-2xl">
            Explore our comprehensive crop-wise fertilizer recommendations. Select a crop
            to see detailed nutrition management, recommended Annadata products, and dosage schedules.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper bg="white" noPadding className="pb-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-section-bg rounded-lg p-4 animate-pulse">
                <div className="w-full h-48 bg-surface-container-high rounded mb-4" />
                <div className="h-4 bg-surface-container-high rounded w-3/4 mb-2" />
                <div className="h-3 bg-surface-container-high rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crops.map((crop) => (
              <StaggerItem key={crop.id}>
                <Link href={`/crops/${crop.slug}`}>
                  <div className="group bg-white rounded-lg border border-transparent overflow-hidden transition-all duration-[400ms] hover:border-teal hover:shadow-tech-soft">
                    <div className="relative w-full h-48 bg-section-bg overflow-hidden">
                      <Image
                        src={crop.image_url || CROP_IMAGES[crop.slug] || CROP_IMAGES.wheat}
                        alt={crop.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                      <h3 className="absolute bottom-3 left-4 text-lg font-semibold font-heading text-white">
                        {crop.name}
                      </h3>
                    </div>
                    <div className="p-4">
                      {crop.short_description && (
                        <p className="text-sm text-body-text font-body line-clamp-2 mb-3">
                          {crop.short_description}
                        </p>
                      )}
                      <span className="inline-block text-coral font-semibold text-xs font-body group-hover:bg-coral group-hover:text-white px-3 py-1 rounded-full transition-colors">
                        View Guide →
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </SectionWrapper>
    </>
  );
}
