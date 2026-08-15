'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { PRODUCT_IMAGE_MAP } from '@/lib/constants';
import type { Product, ProductCategory } from '@/lib/supabase/types';

import { Suspense } from 'react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(categoryFilter || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchData = async () => {
      setLoading(true);

      const [productsRes, categoriesRes] = await Promise.all([
        supabase
          .from('products')
          .select('*, category:product_categories(*)')
          .eq('status', 'published')
          .order('name'),
        supabase
          .from('product_categories')
          .select('*')
          .eq('status', 'active')
          .order('display_order'),
      ]);

      if (productsRes.data) setProducts(productsRes.data as Product[]);
      if (categoriesRes.data) setCategories(categoriesRes.data as ProductCategory[]);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (categoryFilter) setActiveCategory(categoryFilter);
  }, [categoryFilter]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = !activeCategory || p.category?.slug === activeCategory;
    const matchesSearch = !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.form.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SectionWrapper bg="white" noPadding className="pt-8 pb-4">
        <ScrollReveal>
          <SectionLabel>Product Catalogue</SectionLabel>
          <SectionHeading className="mt-2" as="h1" size="lg">
            Annadata Fertilizers & Agri-Inputs
          </SectionHeading>
          <p className="text-body-text font-body mt-3 max-w-2xl">
            Explore our complete range of 37+ fertilizer products — SSP, water soluble,
            micronutrients, calcium nitrate, and specialty crop nutrition solutions.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper bg="white" noPadding className="pb-4">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 px-4 bg-white border border-border-subtle rounded text-body-text font-body text-sm w-full md:w-72 focus:outline-none focus:border-teal"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-colors ${!activeCategory ? 'bg-coral text-white' : 'bg-section-bg text-body-text hover:bg-teal/10'
                }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(activeCategory === cat.slug ? '' : cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-colors ${activeCategory === cat.slug ? 'bg-teal text-white' : 'bg-section-bg text-body-text hover:bg-teal/10'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-section-bg rounded-lg p-6 animate-pulse">
                <div className="w-full h-48 bg-surface-container-high rounded mb-4" />
                <div className="h-4 bg-surface-container-high rounded w-3/4 mb-2" />
                <div className="h-3 bg-surface-container-high rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-body-text font-body text-lg mb-4">No products found</p>
            <Button variant="outline" onClick={() => { setActiveCategory(''); setSearchTerm(''); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <Link href={`/products/${product.slug}`}>
                  <div
                    className="group bg-white rounded-lg border border-transparent overflow-hidden transition-all duration-[400ms] hover:border-teal hover:shadow-tech-soft"
                    style={{
                      perspective: '1000px',
                    }}
                  >
                    <div
                      className="transition-transform duration-[400ms] group-hover:[transform:rotateY(4deg)_translateZ(10px)]"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Image */}
                      <div className="relative w-full h-48 bg-section-bg overflow-hidden">
                        {product.image_url || PRODUCT_IMAGE_MAP[product.slug] ? (
                          <Image
                            src={product.image_url || PRODUCT_IMAGE_MAP[product.slug] || ''}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-coral/10 to-teal/10 flex items-center justify-center">
                            <span className="text-4xl">📦</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-sm font-semibold font-heading text-charcoal mb-1 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <Chip size="sm" variant="teal">{product.form}</Chip>
                          {product.packaging.slice(0, 2).map((pkg) => (
                            <Chip key={pkg} size="sm" variant="neutral">{pkg}</Chip>
                          ))}
                          {product.packaging.length > 2 && (
                            <Chip size="sm" variant="neutral">+{product.packaging.length - 2}</Chip>
                          )}
                        </div>
                        {product.short_description && (
                          <p className="text-xs text-body-text font-body line-clamp-2">
                            {product.short_description}
                          </p>
                        )}
                        <span className="inline-block mt-3 text-coral font-semibold text-xs font-body group-hover:bg-coral group-hover:text-white px-3 py-1 rounded-full transition-colors">
                          View Details
                        </span>
                      </div>
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductsContent />
    </Suspense>
  );
}
