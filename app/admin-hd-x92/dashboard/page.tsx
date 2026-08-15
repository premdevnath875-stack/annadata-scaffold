'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardWhite } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Chip';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import Link from 'next/link';

interface DashboardStats {
  totalProducts: number;
  publishedProducts: number;
  totalCrops: number;
  totalDealers: number;
  totalEnquiries: number;
  newEnquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    publishedProducts: 0,
    totalCrops: 0,
    totalDealers: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<{
    id: string; name: string; mobile: string; business_interest: string | null;
    status: string; created_at: string;
  }[]>([]);

  useEffect(() => {
    const supabase = createClient();

    const fetchStats = async () => {
      const [products, published, crops, dealers, enquiries, newEnq] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('crops').select('*', { count: 'exact', head: true }),
        supabase.from('dealer_locations').select('*', { count: 'exact', head: true }),
        supabase.from('enquiries').select('*', { count: 'exact', head: true }),
        supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      ]);

      setStats({
        totalProducts: products.count ?? 0,
        publishedProducts: published.count ?? 0,
        totalCrops: crops.count ?? 0,
        totalDealers: dealers.count ?? 0,
        totalEnquiries: enquiries.count ?? 0,
        newEnquiries: newEnq.count ?? 0,
      });
    };

    const fetchRecent = async () => {
      const { data } = await supabase
        .from('enquiries')
        .select('id, name, mobile, business_interest, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setRecentEnquiries(data);
    };

    fetchStats();
    fetchRecent();
  }, []);

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: '📦', color: 'text-teal', href: '/admin-hd-x92/products' },
    { label: 'Published', value: stats.publishedProducts, icon: '✅', color: 'text-green-600', href: '/admin-hd-x92/products' },
    { label: 'Crops Covered', value: stats.totalCrops, icon: '🌾', color: 'text-amber-600', href: '/admin-hd-x92/crops' },
    { label: 'Dealer Locations', value: stats.totalDealers, icon: '📍', color: 'text-teal', href: '/admin-hd-x92/dealers' },
    { label: 'Total Enquiries', value: stats.totalEnquiries, icon: '📩', color: 'text-coral', href: '/admin-hd-x92/enquiries' },
    { label: 'New (Unread)', value: stats.newEnquiries, icon: '🔔', color: 'text-coral', href: '/admin-hd-x92/enquiries' },
  ];

  return (
    <div>
      <ScrollReveal>
        <h2 className="text-xl font-semibold font-heading text-charcoal mb-1">Dashboard</h2>
        <p className="text-sm text-body-text font-body mb-6">
          Welcome to the Annadata admin panel. Manage products, enquiries, and more.
        </p>
      </ScrollReveal>

      {/* Stat Cards */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((stat) => (
          <StaggerItem key={stat.label}>
            <Link href={stat.href}>
              <CardWhite className="hover:border-teal transition-colors cursor-pointer" padding="sm">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`text-2xl font-bold font-heading ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-body-text font-body">{stat.label}</div>
              </CardWhite>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Recent Enquiries */}
      <CardWhite>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold font-heading text-charcoal">Recent Enquiries</h3>
          <Link href="/admin-hd-x92/enquiries" className="text-xs text-coral font-semibold font-body hover:underline">
            View All →
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <p className="text-sm text-body-text/60 font-body py-4 text-center">No enquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="px-3 py-2 text-left font-semibold text-charcoal">Name</th>
                  <th className="px-3 py-2 text-left font-semibold text-charcoal">Mobile</th>
                  <th className="px-3 py-2 text-left font-semibold text-charcoal">Interest</th>
                  <th className="px-3 py-2 text-left font-semibold text-charcoal">Status</th>
                  <th className="px-3 py-2 text-left font-semibold text-charcoal">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="border-b border-border-subtle last:border-0">
                    <td className="px-3 py-2.5 font-medium text-charcoal">{enq.name}</td>
                    <td className="px-3 py-2.5 text-body-text">{enq.mobile}</td>
                    <td className="px-3 py-2.5 text-body-text">{enq.business_interest || '—'}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={enq.status} /></td>
                    <td className="px-3 py-2.5 text-body-text/60">
                      {new Date(enq.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardWhite>
    </div>
  );
}
