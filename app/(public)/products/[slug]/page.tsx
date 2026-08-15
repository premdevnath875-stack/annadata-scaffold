import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { ProductDetailClient } from '@/components/products/ProductDetailClient';
import type { Product } from '@/lib/supabase/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!product) return { title: 'Product Not Found | Annadata' };

  return {
    title: `${product.name} | Annadata Fertilizers`,
    description: product.short_description || `${product.name} by Annadata — ${product.form} form, available in ${(product.packaging as string[]).join(', ')}`,
    openGraph: {
      title: `${product.name} | Annadata`,
      description: product.short_description || '',
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*, category:product_categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!product) notFound();

  // Fetch related products in same category
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('id, name, slug, form, packaging, image_url, short_description')
    .eq('category_id', product.category_id)
    .neq('id', product.id)
    .eq('status', 'published')
    .limit(4);

  return (
    <>
      <ProductDetailClient
        product={product as Product}
        relatedProducts={(relatedProducts as Product[]) || []}
      />
      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            brand: { '@type': 'Brand', name: 'Annadata' },
            description: product.short_description || product.description,
            image: product.image_url,
            category: product.category?.name,
            manufacturer: {
              '@type': 'Organization',
              name: 'Ostwal Group of Industries',
            },
          }),
        }}
      />
    </>
  );
}
