'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { OFFICE_ADDRESS, CONTACT_EMAIL, GOOGLE_MAPS_EMBED, GOOGLE_MAPS_DIRECTIONS, BUSINESS_INTERESTS, LANGUAGES } from '@/lib/constants';
import type { Crop } from '@/lib/supabase/types';

export default function ContactPage() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    crop: '',
    preferred_language: 'English',
    business_interest: '',
    message: '',
    honeypot: '', // Anti-spam
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('crops')
      .select('id, name, slug')
      .eq('status', 'published')
      .order('name')
      .then(({ data }) => {
        if (data) setCrops(data as Crop[]);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Bot detected
    if (submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const supabase = createClient();
      const { data, error: dbError } = await supabase
        .from('enquiries')
        .insert({
          name: formData.name,
          email: formData.email || null,
          mobile: formData.mobile,
          crop: formData.crop || null,
          preferred_language: formData.preferred_language,
          business_interest: formData.business_interest || null,
          message: formData.message,
          source: 'website-contact-form',
          status: 'new',
          is_read: false,
        })
        .select('id')
        .single();

      if (dbError) throw dbError;

      setSubmitted(true);
      setRefId(`ENQ-${data.id.slice(0, 8).toUpperCase()}`);
    } catch {
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Contact Info + Map */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <ScrollReveal>
            <SectionLabel>Get in Touch</SectionLabel>
            <SectionHeading className="mt-2 mb-6" as="h1">Contact Us</SectionHeading>

            <div className="space-y-4 font-body text-body-text">
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Registered Office</h3>
                <address className="not-italic leading-relaxed">
                  Annadata (Ostwal Group of Industries)<br />
                  {OFFICE_ADDRESS.line1},<br />
                  {OFFICE_ADDRESS.line2},<br />
                  {OFFICE_ADDRESS.city}, {OFFICE_ADDRESS.state} — {OFFICE_ADDRESS.pincode}
                </address>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">{CONTACT_EMAIL}</a>
              </div>
              <div>
                <a
                  href={GOOGLE_MAPS_DIRECTIONS}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="mt-4">
                    📍 Get Directions
                  </Button>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Map */}
          <ScrollReveal delay={0.2}>
            <div className="rounded-lg overflow-hidden border border-border-subtle h-[400px]">
              <iframe
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Annadata Office Location — Bhilwara, Rajasthan"
              />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Enquiry Form */}
      <SectionWrapper bg="section">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel>Enquiry Form</SectionLabel>
            <SectionHeading className="mt-2">Send Us an Enquiry</SectionHeading>
          </div>

          {submitted ? (
            <ScrollReveal>
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-semibold font-heading text-charcoal mb-2">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-body-text font-body mb-2">
                  Your reference number: <span className="font-semibold text-coral">{refId}</span>
                </p>
                <p className="text-sm text-body-text/70 font-body">
                  Our team will get back to you within 24 hours.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 md:p-8 shadow-tech-soft">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Name"
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Your full name"
                />
                <Select
                  label="Crop"
                  options={crops.map((c) => ({ value: c.name, label: c.name }))}
                  value={formData.crop}
                  onChange={(e) => updateField('crop', e.target.value)}
                  placeholder="Select your crop"
                />
                <Input
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="your@email.com"
                />
                <Input
                  label="Mobile"
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => updateField('mobile', e.target.value)}
                  placeholder="+91 XXXXXXXXXX"
                />
                <Select
                  label="Preferred Language"
                  options={LANGUAGES.map((l) => ({ value: l.label, label: l.native }))}
                  value={formData.preferred_language}
                  onChange={(e) => updateField('preferred_language', e.target.value)}
                />
                <Select
                  label="Business Interest"
                  options={BUSINESS_INTERESTS.map((b) => ({ value: b, label: b }))}
                  value={formData.business_interest}
                  onChange={(e) => updateField('business_interest', e.target.value)}
                  placeholder="Select interest area"
                />
              </div>

              <div className="mb-6">
                <Textarea
                  label="Message"
                  required
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Tell us about your requirement..."
                  rows={4}
                />
              </div>

              {/* Honeypot - hidden from real users */}
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) => updateField('honeypot', e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="absolute opacity-0 w-0 h-0 overflow-hidden"
                aria-hidden="true"
              />

              {error && (
                <p className="text-coral text-sm font-body mb-4">{error}</p>
              )}

              <Button type="submit" size="lg" fullWidth loading={submitting}>
                {submitting ? 'Sending...' : 'SEND ENQUIRY'}
              </Button>
            </form>
          )}
        </div>
      </SectionWrapper>
    </>
  );
}
