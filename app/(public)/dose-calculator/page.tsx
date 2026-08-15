'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { Crop, CropStage, DoseRule, ApplicationType } from '@/lib/supabase/types';

export default function DoseCalculatorPage() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [stages, setStages] = useState<CropStage[]>([]);
  const [rules, setRules] = useState<DoseRule[]>([]);

  // Form state
  const [selectedCrop, setSelectedCrop] = useState('');
  const [applicationType, setApplicationType] = useState('');
  const [cropStage, setCropStage] = useState('');
  const [landArea, setLandArea] = useState('');
  const [areaUnit, setAreaUnit] = useState<'acre' | 'hectare'>('acre');
  const [results, setResults] = useState<DoseRule[]>([]);
  const [calculated, setCalculated] = useState(false);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [availableStages, setAvailableStages] = useState<string[]>([]);

  // Progress
  const currentStep = selectedCrop ? (applicationType ? (cropStage ? (landArea ? 4 : 3) : 2) : 1) : 0;
  const progressPercent = (currentStep / 4) * 100;

  useEffect(() => {
    const supabase = createClient();
    supabase.from('crops').select('*').eq('status', 'published').order('name')
      .then(({ data }) => { if (data) setCrops(data as Crop[]); });
  }, []);

  // Fetch stages and available application types when crop changes
  useEffect(() => {
    if (!selectedCrop) return;

    const supabase = createClient();

    // Fetch crop stages
    supabase.from('crop_stages').select('*').eq('crop_id', selectedCrop).order('display_order')
      .then(({ data }) => { if (data) setStages(data as CropStage[]); });

    // Fetch available application types for this crop
    supabase.from('dose_rules').select('application_type').eq('crop_id', selectedCrop).eq('status', 'active')
      .then(({ data }) => {
        if (data) {
          const types = [...new Set(data.map((d) => d.application_type))];
          setAvailableTypes(types);
        }
      });

    setApplicationType('');
    setCropStage('');
    setResults([]);
    setCalculated(false);
  }, [selectedCrop]);

  // Fetch available stages when application type changes
  useEffect(() => {
    if (!selectedCrop || !applicationType) return;

    const supabase = createClient();
    supabase.from('dose_rules').select('crop_stage')
      .eq('crop_id', selectedCrop)
      .eq('application_type', applicationType)
      .eq('status', 'active')
      .then(({ data }) => {
        if (data) {
          const stageNames = [...new Set(data.map((d) => d.crop_stage))];
          setAvailableStages(stageNames);
        }
      });

    setCropStage('');
    setResults([]);
    setCalculated(false);
  }, [selectedCrop, applicationType]);

  const calculate = async () => {
    const supabase = createClient();
    const area = parseFloat(landArea);
    if (!area || area <= 0) return;

    const { data } = await supabase
      .from('dose_rules')
      .select('*, product:products(*)')
      .eq('crop_id', selectedCrop)
      .eq('application_type', applicationType)
      .eq('crop_stage', cropStage)
      .eq('status', 'active');

    if (data) {
      // Adjust for hectare (1 hectare = 2.47 acres)
      const multiplier = areaUnit === 'hectare' ? area * 2.47 : area;
      const adjusted = data.map((rule) => ({
        ...rule,
        recommended_quantity: rule.recommended_quantity * multiplier,
      }));
      setResults(adjusted as DoseRule[]);
    }
    setCalculated(true);
  };

  const reset = () => {
    setSelectedCrop('');
    setApplicationType('');
    setCropStage('');
    setLandArea('');
    setAreaUnit('acre');
    setResults([]);
    setCalculated(false);
  };

  const selectedCropName = crops.find((c) => c.id === selectedCrop)?.name || '';

  return (
    <SectionWrapper bg="white">
      <ScrollReveal>
        <SectionLabel>Smart Farming</SectionLabel>
        <SectionHeading className="mt-2 mb-2" as="h1" size="lg">
          Fertilizer Dose Calculator
        </SectionHeading>
        <p className="text-body-text font-body mb-8 max-w-2xl">
          Get precise Annadata fertilizer recommendations based on your crop,
          growth stage, and land area.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Steps */}
        <div className="lg:col-span-3">
          {/* Progress bar */}
          <div className="h-2 bg-section-bg rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-brand-gradient rounded-full"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="space-y-6">
            {/* Step 1: Crop */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Select
                label="Step 1: Select Crop"
                required
                options={crops.map((c) => ({ value: c.id, label: c.name }))}
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                placeholder="Choose your crop"
              />
            </motion.div>

            {/* Step 2: Application Type */}
            <AnimatePresence>
              {selectedCrop && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Select
                    label="Step 2: Calculate Dosage For"
                    required
                    options={availableTypes.map((t) => ({ value: t, label: t }))}
                    value={applicationType}
                    onChange={(e) => setApplicationType(e.target.value)}
                    placeholder="Select application type"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Crop Stage */}
            <AnimatePresence>
              {applicationType && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Select
                    label="Step 3: Crop Stage"
                    required
                    options={availableStages.map((s) => ({ value: s, label: s }))}
                    value={cropStage}
                    onChange={(e) => setCropStage(e.target.value)}
                    placeholder="Select growth stage"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Land Area */}
            <AnimatePresence>
              {cropStage && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <label className="text-sm font-semibold text-charcoal font-body block mb-1.5">
                    Step 4: Land Area<span className="text-coral ml-0.5">*</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={landArea}
                      onChange={(e) => setLandArea(e.target.value)}
                      placeholder="Enter area"
                      className="flex-1 h-10 px-4 bg-white border border-border-subtle rounded text-body-text font-body text-sm focus:outline-none focus:border-teal"
                    />
                    <select
                      value={areaUnit}
                      onChange={(e) => setAreaUnit(e.target.value as 'acre' | 'hectare')}
                      className="h-10 px-4 bg-white border border-border-subtle rounded text-body-text font-body text-sm focus:outline-none focus:border-teal"
                    >
                      <option value="acre">Acre</option>
                      <option value="hectare">Hectare</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <AnimatePresence>
              {landArea && (
                <motion.div
                  className="flex gap-3 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button onClick={calculate} size="lg">CALCULATE DOSAGE</Button>
                  <Button variant="outline" onClick={reset} size="lg">RESET</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2">
          <div className="bg-section-bg rounded-lg p-6 sticky top-28">
            <h3 className="text-lg font-semibold font-heading text-teal mb-4">
              Recommendations
            </h3>

            {!calculated ? (
              <p className="text-sm text-body-text/60 font-body">
                Complete all steps and click &ldquo;Calculate Dosage&rdquo; to see recommendations.
              </p>
            ) : results.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-body-text font-body mb-4">
                  No recommendation available for this combination.
                </p>
                <p className="text-sm text-body-text/60 font-body">
                  Contact our agro-support team for assistance.
                </p>
              </div>
            ) : (
              <>
                {/* Results table */}
                <div className="border border-border-subtle rounded-lg overflow-hidden mb-4">
                  <table className="w-full text-sm font-body">
                    <thead>
                      <tr className="bg-white">
                        <th className="px-3 py-2 text-left font-semibold text-charcoal">Fertilizer</th>
                        <th className="px-3 py-2 text-right font-semibold text-charcoal">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((rule, i) => (
                        <motion.tr
                          key={rule.id}
                          className="border-t border-border-subtle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <td className="px-3 py-2.5 text-body-text">
                            <div className="font-semibold text-charcoal">{rule.fertilizer_name}</div>
                            {rule.product && (
                              <div className="text-xs text-teal">{rule.product.form} · {(rule.product.packaging as string[]).join(', ')}</div>
                            )}
                          </td>
                          <td className="px-3 py-2.5 text-right font-semibold text-coral">
                            {rule.recommended_quantity.toFixed(1)} {rule.quantity_unit}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="text-xs text-body-text/70 font-body space-y-1">
                  <p><strong>Crop:</strong> {selectedCropName}</p>
                  <p><strong>Application:</strong> {applicationType}</p>
                  <p><strong>Stage:</strong> {cropStage}</p>
                  <p><strong>Land Area:</strong> {landArea} {areaUnit}(s)</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
