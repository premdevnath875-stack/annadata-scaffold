'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

interface Crop {
  id: string;
  name: string;
  short_description: string;
  status: 'published' | 'draft';
}

export default function AdminCropsPage() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('crops')
      .select('id, name, short_description, status')
      .order('name');
      
    if (data) setCrops(data as Crop[]);
    setLoading(false);
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const supabase = createClient();
    
    setCrops(crops.map(c => c.id === id ? { ...c, status: newStatus } : c));
    
    await supabase
      .from('crops')
      .update({ status: newStatus })
      .eq('id', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold font-heading text-charcoal">Crops</h1>
          <p className="text-sm text-body-text font-body mt-1">Manage crop portfolio and guides</p>
        </div>
        <Button>+ Add New Crop</Button>
      </div>

      <div className="bg-white rounded-lg shadow-tech-soft border border-border-subtle overflow-hidden">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-section-bg border-b border-border-subtle text-charcoal font-semibold">
            <tr>
              <th className="px-6 py-4">Crop Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {loading ? (
              <tr><td colSpan={4} className="p-6 text-center">Loading...</td></tr>
            ) : crops.map((crop) => (
              <tr key={crop.id} className="hover:bg-section-bg/50">
                <td className="px-6 py-4 font-semibold text-charcoal">{crop.name}</td>
                <td className="px-6 py-4 text-body-text truncate max-w-xs">{crop.short_description}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleStatus(crop.id, crop.status)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      crop.status === 'published' ? 'bg-teal/10 text-teal' : 'bg-body-text/10 text-body-text'
                    }`}
                  >
                    {crop.status}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-teal hover:underline font-semibold">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
