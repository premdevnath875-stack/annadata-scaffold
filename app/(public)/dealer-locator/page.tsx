'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { STATES_SERVED } from '@/lib/constants';

interface Dealer {
  id: string;
  dealer_name: string;
  address: string | null;
  city: string;
  district: string | null;
  state: string;
  pincode: string | null;
  phone: string | null;
  mobile: string | null;
}

export default function DealerLocatorPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState('');
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('dealer_locations')
      .select('*')
      .eq('status', 'active')
      .order('state')
      .order('city')
      .then(({ data }) => {
        if (data) setDealers(data as Dealer[]);
        setLoading(false);
      });
  }, []);

  const filteredDealers = dealers.filter((d) => {
    const matchState = !selectedState || d.state === selectedState;
    const matchCity = !searchCity || d.city.toLowerCase().includes(searchCity.toLowerCase());
    return matchState && matchCity;
  });

  const stateOptions = [...new Set(dealers.map((d) => d.state))].sort();

  return (
    <>
      <SectionWrapper bg="white" noPadding className="pt-8 pb-4">
        <ScrollReveal>
          <SectionLabel>Find Us Near You</SectionLabel>
          <SectionHeading className="mt-2" as="h1" size="lg">
            Dealer & Retailer Locator
          </SectionHeading>
          <p className="text-body-text font-body mt-3 max-w-2xl">
            Annadata products are available through our network of authorized dealers and
            retailers across {STATES_SERVED.length} states. Find one near you.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper bg="white" noPadding className="pb-16">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Select
            label="Filter by State"
            options={stateOptions.map((s) => ({ value: s, label: s }))}
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            placeholder="All States"
          />
          <div className="flex-1">
            <label className="text-sm font-semibold text-charcoal font-body block mb-1.5">
              Search City
            </label>
            <input
              type="text"
              placeholder="Type city name..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="h-10 px-4 w-full bg-white border border-border-subtle rounded text-body-text font-body text-sm focus:outline-none focus:border-teal"
            />
          </div>
          {(selectedState || searchCity) && (
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => { setSelectedState(''); setSearchCity(''); }}
              >
                Clear
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-section-bg rounded-lg p-6 animate-pulse">
                <div className="h-5 bg-surface-container-high rounded w-3/4 mb-3" />
                <div className="h-4 bg-surface-container-high rounded w-1/2 mb-2" />
                <div className="h-3 bg-surface-container-high rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredDealers.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">📍</span>
            <p className="text-body-text font-body text-lg mb-4">No dealers found for your search.</p>
            <Button variant="outline" onClick={() => { setSelectedState(''); setSearchCity(''); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDealers.map((dealer) => (
              <StaggerItem key={dealer.id}>
                <div className="bg-section-bg rounded-lg p-6 hover:shadow-tech-soft transition-shadow h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                      <span className="text-teal text-lg">📍</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-charcoal text-base mb-1">
                        {dealer.dealer_name}
                      </h3>
                      <p className="text-sm text-body-text font-body mb-2">
                        {dealer.city}, {dealer.state}
                        {dealer.pincode && ` — ${dealer.pincode}`}
                      </p>
                      {dealer.address && (
                        <p className="text-xs text-body-text/70 font-body mb-3">{dealer.address}</p>
                      )}
                      {dealer.mobile && (
                        <a
                          href={`tel:${dealer.mobile}`}
                          className="inline-flex items-center gap-1.5 text-teal text-sm font-semibold font-body hover:underline"
                        >
                          📞 {dealer.mobile}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Map section */}
        <div className="mt-12">
          <h2 className="font-heading font-semibold text-charcoal text-xl mb-4">Our Presence</h2>
          <div className="bg-section-bg rounded-lg p-8">
            <div className="flex flex-wrap justify-center gap-6">
              {STATES_SERVED.map((state) => {
                const count = dealers.filter((d) => d.state === state).length;
                return (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                      selectedState === state
                        ? 'bg-coral text-white shadow-tech-soft'
                        : 'bg-white text-charcoal hover:shadow-tech-soft'
                    }`}
                  >
                    <span className="text-lg">📍</span>
                    <span className="font-heading font-semibold text-sm">{state}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      selectedState === state ? 'bg-white/20' : 'bg-teal/10 text-teal'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
