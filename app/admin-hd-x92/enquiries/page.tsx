'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Chip } from '@/components/ui/Chip';

interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  crop: string | null;
  business_interest: string | null;
  preferred_language: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved' | 'spam';
  is_read: boolean;
  created_at: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setEnquiries(data as Enquiry[]);
    setLoading(false);
  };

  const markAsRead = async (id: string, currentReadStatus: boolean) => {
    if (currentReadStatus) return;
    
    const supabase = createClient();
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, is_read: true } : e));
    
    await supabase
      .from('enquiries')
      .update({ is_read: true })
      .eq('id', id);
  };

  const updateStatus = async (id: string, status: Enquiry['status']) => {
    const supabase = createClient();
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status } : e));
    
    await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-heading text-charcoal">Enquiries</h1>
        <p className="text-sm text-body-text font-body mt-1">Manage customer and dealer enquiries</p>
      </div>

      <div className="bg-white rounded-lg shadow-tech-soft border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-section-bg border-b border-border-subtle text-charcoal font-semibold">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Interest / Crop</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-body-text">
                    Loading enquiries...
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-body-text">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr 
                    key={enq.id} 
                    className={`transition-colors ${enq.is_read ? 'hover:bg-section-bg/50' : 'bg-coral/5 hover:bg-coral/10 font-medium'}`}
                    onClick={() => markAsRead(enq.id, enq.is_read)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-body-text align-top">
                      {new Date(enq.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                      {!enq.is_read && (
                        <span className="ml-2 inline-block w-2 h-2 rounded-full bg-coral"></span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="font-semibold text-charcoal">{enq.name}</div>
                      <div className="text-teal text-xs mt-1">{enq.mobile}</div>
                      {enq.email && <div className="text-body-text/70 text-xs mt-0.5">{enq.email}</div>}
                      <div className="text-body-text/50 text-[10px] mt-1 uppercase tracking-wider">{enq.preferred_language}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      {enq.business_interest && <Chip size="sm" variant="coral" className="mb-1 block w-fit">{enq.business_interest}</Chip>}
                      {enq.crop && <Chip size="sm" variant="teal" className="block w-fit">Crop: {enq.crop}</Chip>}
                    </td>
                    <td className="px-6 py-4 align-top max-w-xs">
                      <p className="text-body-text line-clamp-3 hover:line-clamp-none cursor-pointer">
                        {enq.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <select
                        value={enq.status}
                        onChange={(e) => updateStatus(enq.id, e.target.value as Enquiry['status'])}
                        className={`text-xs font-semibold px-2 py-1 rounded border focus:outline-none focus:ring-1 focus:ring-teal ${
                          enq.status === 'new' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          enq.status === 'contacted' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          enq.status === 'resolved' ? 'bg-green-100 text-green-800 border-green-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                        <option value="spam">Spam</option>
                      </select>
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
