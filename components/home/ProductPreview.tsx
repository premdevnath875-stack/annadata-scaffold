'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { createClient } from '@/lib/supabase/client';
import type { ProductCategory } from '@/lib/supabase/types';

const CATEGORY_ICONS: Record<string, string> = {
  'ssp-fertilizers': '🧪',
  'water-soluble-fertilizers': '💧',
  'calcium-nitrate-range': '🧬',
  'micronutrients': '🔬',
  'speciality-combination-products': '⚗️',
  'bio-organic': '🌿',
  'soil-conditioners-kits': '🌍',
};

export function ProductPreview() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('product_categories')
      .select('*')
      .eq('status', 'active')
      .order('display_order')
      .then(({ data }) => {
        if (data) setCategories(data as ProductCategory[]);
      });
  }, []);

  // Fallback data if Supabase not connected
  const displayCategories = categories.length > 0 ? categories : [
    { id: '1', name: 'SSP Fertilizers', slug: 'ssp-fertilizers', description: 'Single Super Phosphate — Powder & Granulated', display_order: 1, status: 'active', created_at: '', image_url: null },
    { id: '2', name: 'Water Soluble Fertilizers', slug: 'water-soluble-fertilizers', description: 'SOP, MKP, MAP, NOP, NPK range', display_order: 2, status: 'active', created_at: '', image_url: null },
    { id: '3', name: 'Calcium Nitrate Range', slug: 'calcium-nitrate-range', description: 'Vriddhi series calcium nitrate products', display_order: 3, status: 'active', created_at: '', image_url: null },
    { id: '4', name: 'Micronutrients', slug: 'micronutrients', description: 'Zinc, Ferrous, Manganese, Boron formulations', display_order: 4, status: 'active', created_at: '', image_url: null },
    { id: '5', name: 'Speciality & Combination', slug: 'speciality-combination-products', description: 'Doctor series, Samriddhi, Green Genius', display_order: 5, status: 'active', created_at: '', image_url: null },
    { id: '6', name: 'Bio / Organic Products', slug: 'bio-organic', description: 'Vermicompost, soil conditioners, biofertilizers', display_order: 6, status: 'active', created_at: '', image_url: null },
    { id: '7', name: 'Soil Conditioners & Kits', slug: 'soil-conditioners-kits', description: 'Complete nutrient kits and soil health products', display_order: 7, status: 'active', created_at: '', image_url: null },
  ];

  return (
    <SectionWrapper bg="white" id="product-preview">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <SectionLabel>Product Portfolio</SectionLabel>
          <SectionHeading className="mt-2">Our Product Categories</SectionHeading>
        </div>
        <Link href="/products">
          <Button variant="outline" size="md">View All Products</Button>
        </Link>
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayCategories.map((cat) => (
          <StaggerItem key={cat.id}>
            <Link href={`/products?category=${cat.slug}`}>
              <Card interactive className="h-full bg-white hover:bg-white">
                <div className="text-3xl mb-3">
                  {CATEGORY_ICONS[cat.slug] || '📦'}
                </div>
                <h3 className="text-base font-semibold font-heading text-charcoal mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-body-text font-body">
                  {cat.description}
                </p>
                <span className="inline-block mt-3 text-coral font-semibold text-sm font-body">
                  View →
                </span>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
