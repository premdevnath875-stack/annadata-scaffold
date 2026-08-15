'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

interface Dealer {
  id: string;
  dealer_name: string;
  city: string;
  state: string;
  mobile: string | null;
  status: 'active' | 'inactive';
}

export default function AdminDealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('dealer_locations')
      .select('*')
      .order('state')
      .order('city');
      
    if (data) setDealers(data as Dealer[]);
    setLoading(false);
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const supabase = createClient();
    
    setDealers(dealers.map(d => d.id === id ? { ...d, status: newStatus } : d));
    
    await supabase
      .from('dealer_locations')
      .update({ status: newStatus })
      .eq('id', id);
  };

  const filteredDealers = dealers.filter(d => 
    d.dealer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-heading text-charcoal">Dealers</h1>
          <p className="text-sm text-body-text font-body mt-1">Manage dealer network locations</p>
        </div>
        <Button>+ Add New Dealer</Button>
      </div>

      <div className="bg-white rounded-lg shadow-tech-soft border border-border-subtle overflow-hidden">
        <div className="p-4 border-b border-border-subtle">
          <input
            type="text"
            placeholder="Search dealers by name, city, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 px-4 w-full md:w-96 bg-white border border-border-subtle rounded text-sm focus:outline-none focus:border-teal"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-section-bg border-b border-border-subtle text-charcoal font-semibold">
              <tr>
                <th className="px-6 py-4">Dealer Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-body-text">
                    Loading dealers...
                  </td>
                </tr>
              ) : filteredDealers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-body-text">
                    No dealers found.
                  </td>
                </tr>
              ) : (
                filteredDealers.map((dealer) => (
                  <tr key={dealer.id} className="hover:bg-section-bg/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-charcoal">
                      {dealer.dealer_name}
                    </td>
                    <td className="px-6 py-4 text-body-text">
                      {dealer.city}, {dealer.state}
                    </td>
                    <td className="px-6 py-4 text-teal">
                      {dealer.mobile || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleStatus(dealer.id, dealer.status)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          dealer.status === 'active' 
                            ? 'bg-teal/10 text-teal hover:bg-teal/20' 
                            : 'bg-coral/10 text-coral hover:bg-coral/20'
                        }`}
                      >
                        {dealer.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-teal hover:underline font-semibold">Edit</button>
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
