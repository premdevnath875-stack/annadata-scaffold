'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Card } from '@/components/ui/Card';
import { ProductRotator } from '@/components/3d/ProductRotator';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { PRODUCT_IMAGE_MAP } from '@/lib/constants';
import type { Product } from '@/lib/supabase/types';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const imageSrc = product.image_url || PRODUCT_IMAGE_MAP[product.slug] || '';

  return (
    <>
      {/* Breadcrumb */}
      <SectionWrapper bg="section" noPadding className="py-3">
        <nav className="text-sm font-body text-body-text flex items-center gap-2">
          <Link href="/" className="hover:text-teal">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-teal">Products</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link href={`/products?category=${product.category.slug}`} className="hover:text-teal">
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-charcoal font-semibold truncate">{product.name}</span>
        </nav>
      </SectionWrapper>

      {/* Product Detail */}
      <SectionWrapper bg="white" noPadding className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image */}
          <ScrollReveal>
            <div className="bg-section-bg rounded-lg p-8 flex items-center justify-center min-h-[400px]">
              {imageSrc ? (
                <ProductRotator
                  src={imageSrc}
                  alt={product.name}
                  width={400}
                  height={400}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-coral/10 to-teal/10 rounded-lg flex items-center justify-center min-h-[300px]">
                  <span className="text-6xl">📦</span>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Right: Info */}
          <ScrollReveal delay={0.2}>
            <div>
              {product.category && (
                <Chip variant="teal" className="mb-3">{product.category.name}</Chip>
              )}
              <h1 className="text-2xl md:text-3xl font-bold font-heading text-charcoal mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-teal font-body font-semibold mb-4">
                Brand: {product.brand} · Form: {product.form}
              </p>

              {product.short_description && (
                <p className="text-body-text font-body leading-relaxed mb-6">
                  {product.short_description}
                </p>
              )}

              {/* Packaging */}
              <div className="mb-6">
                <h3 className="text-xs font-bold font-body tracking-[0.1em] uppercase text-body-text/60 mb-2">
                  Available Packaging
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.packaging.map((pkg) => (
                    <Chip key={pkg} variant="neutral">{pkg}</Chip>
                  ))}
                </div>
              </div>

              {/* Specs Table */}
              <div className="border border-border-subtle rounded-lg overflow-hidden mb-6">
                <table className="w-full text-sm font-body">
                  <tbody>
                    <tr className="bg-section-bg">
                      <td className="px-4 py-2.5 font-semibold text-charcoal w-1/3">Form</td>
                      <td className="px-4 py-2.5 text-body-text">{product.form}</td>
                    </tr>
                    <tr className="border-t border-border-subtle">
                      <td className="px-4 py-2.5 font-semibold text-charcoal">Brand</td>
                      <td className="px-4 py-2.5 text-body-text">{product.brand}</td>
                    </tr>
                    {product.nutrients && (
                      <tr className="border-t border-border-subtle bg-section-bg">
                        <td className="px-4 py-2.5 font-semibold text-charcoal">Nutrients</td>
                        <td className="px-4 py-2.5 text-body-text">{product.nutrients}</td>
                      </tr>
                    )}
                    {product.suitable_crops && (
                      <tr className="border-t border-border-subtle">
                        <td className="px-4 py-2.5 font-semibold text-charcoal">Suitable Crops</td>
                        <td className="px-4 py-2.5 text-body-text">{product.suitable_crops}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button size="lg">Get a Quote</Button>
                </Link>
                <Link href="/dose-calculator">
                  <Button variant="outline" size="lg">Dose Calculator</Button>
                </Link>
                {product.brochure_url && (
                  <a href={product.brochure_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="lg">📄 Download Brochure</Button>
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Full Description */}
        {product.description && (
          <ScrollReveal className="mt-12">
            <div className="prose prose-sm max-w-none font-body text-body-text">
              <h2 className="text-xl font-semibold font-heading text-charcoal">Product Description</h2>
              <p className="whitespace-pre-wrap">{product.description}</p>
            </div>
          </ScrollReveal>
        )}
      </SectionWrapper>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <SectionWrapper bg="section">
          <SectionLabel>Related Products</SectionLabel>
          <SectionHeading className="mt-2 mb-8" size="sm">
            More in {product.category?.name}
          </SectionHeading>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <StaggerItem key={rp.id}>
                <Link href={`/products/${rp.slug}`}>
                  <Card interactive className="h-full bg-white hover:bg-white">
                    <div className="relative w-full h-32 bg-section-bg rounded mb-3 overflow-hidden">
                      {(rp.image_url || PRODUCT_IMAGE_MAP[rp.slug]) ? (
                        <Image
                          src={rp.image_url || PRODUCT_IMAGE_MAP[rp.slug] || ''}
                          alt={rp.name}
                          fill
                          className="object-contain p-2"
                          sizes="25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl">📦</span>
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold font-heading text-charcoal line-clamp-2">
                      {rp.name}
                    </h4>
                    <Chip size="sm" variant="teal" className="mt-2">{rp.form}</Chip>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SectionWrapper>
      )}
    </>
  );
}
