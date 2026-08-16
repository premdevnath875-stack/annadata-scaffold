'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { Crop, CropStage, DoseRule } from '@/lib/supabase/types';
import { useTranslation } from '@/components/LanguageProvider';

export default function DoseCalculatorPage() {
  const { t } = useTranslation();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [stages, setStages] = useState<CropStage[]>([]);
  
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
  const [loading, setLoading] = useState(false);

  // Progress
  const hasStages = availableStages.length > 0;
  const currentStep = selectedCrop ? (applicationType ? (hasStages ? (cropStage ? (landArea ? 4 : 3) : 2) : (landArea ? 4 : 3)) : 1) : 0;
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

    // Fetch available application types for this crop
    supabase.from('dose_rules').select('application_type').eq('crop_id', selectedCrop).eq('status', 'active')
      .then(({ data }) => {
        if (data) {
          const types = [...new Set(data.map((d) => d.application_type))];
          setAvailableTypes(types.filter(Boolean));
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
          setAvailableStages(stageNames.filter(Boolean));
        }
      });

    setCropStage('');
    setResults([]);
    setCalculated(false);
  }, [selectedCrop, applicationType]);

  const calculate = async () => {
    const area = parseFloat(landArea);
    if (!area || area <= 0) {
      alert(t('calc.enter_area'));
      return;
    }
    
    setLoading(true);
    const supabase = createClient();
    
    try {
      let query = supabase
        .from('dose_rules')
        .select('*, product:products(*)')
        .eq('crop_id', selectedCrop)
        .eq('application_type', applicationType)
        .eq('status', 'active');
        
      if (hasStages) {
        query = query.eq('crop_stage', cropStage);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data) {
        // Adjust for hectare (1 hectare = 2.47 acres)
        const multiplier = areaUnit === 'hectare' ? area * 2.47 : area;
        const adjusted = data.map((rule) => ({
          ...rule,
          recommended_quantity: rule.recommended_quantity * multiplier,
        }));
        setResults(adjusted as DoseRule[]);
      }
    } catch (e) {
      console.error(e);
      alert(t('calc.no_rec'));
    } finally {
      setCalculated(true);
      setLoading(false);
    }
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
        <SectionLabel>{t('calc.smart_farming')}</SectionLabel>
        <SectionHeading className="mt-2 mb-2" as="h1" size="lg">
          {t('calc.title')}
        </SectionHeading>
        <p className="text-body-text font-body mb-8 max-w-2xl">
          {t('calc.subtitle')}
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
                label={t('calc.step1')}
                required
                options={crops.map((c) => ({ value: c.id, label: c.name }))}
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                placeholder={t('calc.choose_crop')}
              />
            </motion.div>

            {/* Step 2: Application Type */}
            <AnimatePresence>
              {selectedCrop && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Select
                    label={t('calc.step2')}
                    required
                    options={availableTypes.map((t) => ({ value: t, label: t }))}
                    value={applicationType}
                    onChange={(e) => setApplicationType(e.target.value)}
                    placeholder={t('calc.select_app')}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Crop Stage */}
            <AnimatePresence>
              {applicationType && hasStages && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Select
                    label={t('calc.step3')}
                    required
                    options={availableStages.map((s) => ({ value: s, label: s }))}
                    value={cropStage}
                    onChange={(e) => setCropStage(e.target.value)}
                    placeholder={t('calc.select_stage')}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Land Area */}
            <AnimatePresence>
              {applicationType && (!hasStages || cropStage) && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <label className="text-sm font-semibold text-charcoal font-body block mb-1.5">
                    {t('calc.step4')}<span className="text-coral ml-0.5">*</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={landArea}
                      onChange={(e) => setLandArea(e.target.value)}
                      placeholder={t('calc.enter_area')}
                      className="flex-1 h-10 px-4 bg-white border border-border-subtle rounded text-body-text font-body text-sm focus:outline-none focus:border-teal"
                    />
                    <select
                      value={areaUnit}
                      onChange={(e) => setAreaUnit(e.target.value as 'acre' | 'hectare')}
                      className="h-10 px-4 bg-white border border-border-subtle rounded text-body-text font-body text-sm focus:outline-none focus:border-teal"
                    >
                      <option value="acre">{t('calc.acre')}</option>
                      <option value="hectare">{t('calc.hectare')}</option>
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
                  <Button onClick={calculate} size="lg" disabled={loading}>
                    {loading ? '...' : t('calc.btn_calc')}
                  </Button>
                  <Button variant="outline" onClick={reset} size="lg" disabled={loading}>
                    {t('calc.btn_reset')}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2">
          <div className="bg-section-bg rounded-lg p-6 sticky top-28">
            <h3 className="text-lg font-semibold font-heading text-teal mb-4">
              {t('calc.rec_title')}
            </h3>

            {!calculated ? (
              <p className="text-sm text-body-text/60 font-body">
                {t('calc.complete_steps')}
              </p>
            ) : results.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-body-text font-body mb-4">
                  {t('calc.no_rec')}
                </p>
                <p className="text-sm text-body-text/60 font-body">
                  {t('calc.contact_support')}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((rule, i) => (
                  <motion.div
                    key={rule.id}
                    className="bg-white border border-border-subtle rounded-lg p-5 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm font-body">
                      <div>
                        <span className="block text-body-text/60 text-xs">{t('calc.lbl_crop')}</span>
                        <span className="font-semibold text-charcoal">{selectedCropName}</span>
                      </div>
                      <div>
                        <span className="block text-body-text/60 text-xs">{t('calc.lbl_app')}</span>
                        <span className="font-semibold text-charcoal">{applicationType}</span>
                      </div>
                      {hasStages && (
                        <div>
                          <span className="block text-body-text/60 text-xs">{t('calc.lbl_stage')}</span>
                          <span className="font-semibold text-charcoal">{cropStage || '-'}</span>
                        </div>
                      )}
                      <div>
                        <span className="block text-body-text/60 text-xs">{t('calc.lbl_area')}</span>
                        <span className="font-semibold text-charcoal">{landArea} {areaUnit === 'acre' ? t('calc.acre') : t('calc.hectare')}</span>
                      </div>
                      
                      <div className="col-span-2 pt-3 border-t border-border-subtle mt-1">
                        <span className="block text-body-text/60 text-xs">{t('calc.th_fert')}</span>
                        <span className="font-bold text-lg text-teal">{rule.fertilizer_name}</span>
                        {rule.product && (
                           <span className="block text-xs text-charcoal mt-0.5">{rule.product.form}</span>
                        )}
                      </div>
                      
                      <div className="col-span-2">
                        <span className="block text-body-text/60 text-xs">Total Required Quantity</span>
                        <span className="font-bold text-xl text-coral">{rule.recommended_quantity.toFixed(1)} {rule.quantity_unit}</span>
                      </div>
                      
                      {rule.notes && (
                        <div className="col-span-2 mt-2 bg-section-bg p-3 rounded text-xs text-charcoal">
                          <span className="font-semibold block mb-1">Notes:</span>
                          {rule.notes}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
