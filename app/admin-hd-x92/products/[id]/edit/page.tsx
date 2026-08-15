'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';

export default function AdminEditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      router.push('/admin-hd-x92/products');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold font-heading text-charcoal">Edit Product</h1>
        <Link href="/admin-hd-x92/products">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-tech-soft border border-border-subtle p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Product Name" defaultValue={`Product ${params.id}`} required />
            <Input label="Slug (URL)" defaultValue={`product-${params.id}`} required />
            <Select 
              label="Status" 
              required 
              options={[{ value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }]}
            />
            <Select 
              label="Form" 
              required 
              options={[{ value: 'Granular', label: 'Granular' }, { value: 'Powder', label: 'Powder' }]}
            />
          </div>
          
          <Textarea label="Short Description" rows={2} defaultValue="Existing description..." required />
          <Textarea label="Long Description" rows={5} defaultValue="Detailed product information..." required />
          
          <div className="pt-4 border-t border-border-subtle flex justify-end">
            <Button type="submit" loading={loading} size="lg">Update Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
