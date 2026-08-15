'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data) {
        const config: Record<string, string> = {};
        data.forEach(row => { config[row.setting_key] = row.setting_value; });
        setSettings(config);
      }
      setLoading(false);
    });
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    
    // Update all changed settings
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from('site_settings').update({ setting_value: value }).eq('setting_key', key);
    }
    
    setSaving(false);
    alert('Settings saved successfully!');
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold font-heading text-charcoal">Site Settings</h1>
          <p className="text-sm text-body-text font-body mt-1">Manage global website configuration</p>
        </div>
        <Button onClick={handleSave} loading={saving}>Save Changes</Button>
      </div>

      <div className="bg-white rounded-lg shadow-tech-soft border border-border-subtle p-6 space-y-6">
        <h2 className="text-lg font-semibold font-heading text-teal border-b border-border-subtle pb-2">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Company Name" value={settings['company_name'] || ''} onChange={e => handleChange('company_name', e.target.value)} />
          <Input label="Tagline" value={settings['company_tagline'] || ''} onChange={e => handleChange('company_tagline', e.target.value)} />
          <Input label="Phone" value={settings['contact_phone'] || ''} onChange={e => handleChange('contact_phone', e.target.value)} />
          <Input label="Email" value={settings['contact_email'] || ''} onChange={e => handleChange('contact_email', e.target.value)} />
        </div>
        
        <Input label="Address" value={settings['contact_address'] || ''} onChange={e => handleChange('contact_address', e.target.value)} />

        <h2 className="text-lg font-semibold font-heading text-teal border-b border-border-subtle pb-2 mt-8">Social & SEO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="LinkedIn URL" value={settings['social_linkedin'] || ''} onChange={e => handleChange('social_linkedin', e.target.value)} />
          <Input label="Website URL" value={settings['website_url'] || ''} onChange={e => handleChange('website_url', e.target.value)} />
        </div>
      </div>
    </div>
  );
}
