'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import type { Product } from '@/lib/supabase/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('products')
      .select('*, category:product_categories(name)')
      .order('name');
      
    if (data) setProducts(data as any[]);
    setLoading(false);
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const supabase = createClient();
    
    // Optimistic update
    setProducts(products.map(p => p.id === id ? { ...p, status: newStatus } : p));
    
    await supabase
      .from('products')
      .update({ status: newStatus })
      .eq('id', id);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-heading text-charcoal">Products</h1>
          <p className="text-sm text-body-text font-body mt-1">Manage your fertilizer portfolio</p>
        </div>
        <Link href="/admin-hd-x92/products/new">
          <Button>+ Add New Product</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-tech-soft border border-border-subtle overflow-hidden">
        <div className="p-4 border-b border-border-subtle">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 px-4 w-full md:w-80 bg-white border border-border-subtle rounded text-sm focus:outline-none focus:border-teal"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-section-bg border-b border-border-subtle text-charcoal font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Form</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-body-text">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-body-text">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-section-bg/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-charcoal">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 text-body-text">
                      {(product as any).category?.name}
                    </td>
                    <td className="px-6 py-4">
                      <Chip size="sm" variant="neutral">{product.form}</Chip>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleStatus(product.id, product.status)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          product.status === 'published' 
                            ? 'bg-teal/10 text-teal hover:bg-teal/20' 
                            : 'bg-body-text/10 text-body-text hover:bg-body-text/20'
                        }`}
                      >
                        {product.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin-hd-x92/products/${product.id}/edit`}>
                        <button className="text-teal hover:underline font-semibold">Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
