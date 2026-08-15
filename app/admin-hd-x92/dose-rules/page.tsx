'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

export default function AdminDoseRulesPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('dose_rules')
      .select('*, crop:crops(name)')
      .order('crop_id');
      
    if (data) setRules(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold font-heading text-charcoal">Dose Rules</h1>
          <p className="text-sm text-body-text font-body mt-1">Manage fertilizer dose calculator logic</p>
        </div>
        <Button>+ Add New Rule</Button>
      </div>

      <div className="bg-white rounded-lg shadow-tech-soft border border-border-subtle overflow-hidden">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-section-bg border-b border-border-subtle text-charcoal font-semibold">
            <tr>
              <th className="px-6 py-4">Crop</th>
              <th className="px-6 py-4">Application Type</th>
              <th className="px-6 py-4">Stage</th>
              <th className="px-6 py-4">Fertilizer</th>
              <th className="px-6 py-4">Quantity / Acre</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center">Loading...</td></tr>
            ) : rules.map((rule) => (
              <tr key={rule.id} className="hover:bg-section-bg/50">
                <td className="px-6 py-4 font-semibold text-charcoal">{rule.crop?.name}</td>
                <td className="px-6 py-4 text-body-text">{rule.application_type}</td>
                <td className="px-6 py-4 text-body-text">{rule.crop_stage}</td>
                <td className="px-6 py-4 text-teal font-medium">{rule.fertilizer_name}</td>
                <td className="px-6 py-4">{rule.recommended_quantity} {rule.quantity_unit}</td>
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
