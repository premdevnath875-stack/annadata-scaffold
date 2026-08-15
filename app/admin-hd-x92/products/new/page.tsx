'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';

export default function AdminNewProductPage() {
  const router = useRouter();
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
        <h1 className="text-2xl font-semibold font-heading text-charcoal">Add New Product</h1>
        <Link href="/admin-hd-x92/products">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-tech-soft border border-border-subtle p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Product Name" required placeholder="e.g. Annadata SSP" />
            <Input label="Slug (URL)" required placeholder="e.g. annadata-ssp" />
            <Select 
              label="Category" 
              required 
              options={[{ value: '1', label: 'Phosphatic Fertilizers' }, { value: '2', label: 'Water Soluble' }]}
            />
            <Select 
              label="Form" 
              required 
              options={[{ value: 'Granular', label: 'Granular' }, { value: 'Powder', label: 'Powder' }, { value: 'Liquid', label: 'Liquid' }]}
            />
          </div>
          
          <Textarea label="Short Description" rows={2} required />
          <Textarea label="Long Description" rows={5} required />
          
          <div className="pt-4 border-t border-border-subtle flex justify-end">
            <Button type="submit" loading={loading} size="lg">Save Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
