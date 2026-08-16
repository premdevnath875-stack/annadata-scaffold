'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { Crop, DoseRule } from '@/lib/supabase/types';
import { useTranslation } from '@/components/LanguageProvider';

// Stable singleton client â€” created once, not on every render/effect.
const supabase = createClient();

export default function DoseCalculatorPage() {
  const { t } = useTranslation();

  // â”€â”€â”€ Crop list â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [crops, setCrops] = useState<Crop[]>([]);
  const [cropsLoading, setCropsLoading] = useState(true);

  // â”€â”€â”€ Form state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [selectedCrop, setSelectedCrop] = useState('');
  const [applicationType, setApplicationType] = useState('');
  const [cropStage, setCropStage] = useState('');
  const [landArea, setLandArea] = useState('');
  const [areaUnit, setAreaUnit] = useState<'acre' | 'hectare'>('acre');

  // â”€â”€â”€ Derived options â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [typesLoading, setTypesLoading] = useState(false);
  const [availableStages, setAvailableStages] = useState<string[]>([]);
  const [stagesLoading, setStagesLoading] = useState(false);

  // â”€â”€â”€ Results â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [results, setResults] = useState<DoseRule[]>([]);
  const [calculated, setCalculated] = useState(false);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState('');

  // â”€â”€â”€ Stale-request protection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Incrementing counters: if the counter has changed by the time a response
  // arrives, we discard it â€” preventing old fetches from overwriting new state.
  const typesReqId = useRef(0);
  const stagesReqId = useRef(0);

  // â”€â”€â”€ Derived helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const hasStages = availableStages.length > 0;
  const selectedCropName = crops.find((c) => c.id === selectedCrop)?.name || '';

  // Progress 0-4
  const currentStep = selectedCrop
    ? applicationType
      ? hasStages
        ? cropStage ? (landArea ? 4 : 3) : 2
        : (landArea ? 4 : 3)
      : 1
    : 0;
  const progressPercent = (currentStep / 4) * 100;

  // â”€â”€â”€ 1. Load crops once on mount â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    let cancelled = false;
    setCropsLoading(true);

    supabase
      .from('crops')
      .select('*')
      .eq('status', 'published')
      .order('name')
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error('[DoseCalculator] crops fetch error:', error);
        } else if (data) {
          setCrops(data as Crop[]);
        }
        setCropsLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  // â”€â”€â”€ 2. Load application types whenever selectedCrop changes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // CRITICAL: Clear all stale downstream state IMMEDIATELY (synchronously)
  // before the async fetch begins.
  useEffect(() => {
    // Clear everything downstream synchronously.
    setApplicationType('');
    setCropStage('');
    setLandArea('');
    setAvailableTypes([]);
    setAvailableStages([]);
    setResults([]);
    setCalculated(false);
    setCalcError('');
    setTypesLoading(false);
    setStagesLoading(false);

    if (!selectedCrop) return;

    // Stamp this request.
    const reqId = ++typesReqId.current;
    setTypesLoading(true);

    supabase
      .from('dose_rules')
      .select('application_type')
      .eq('crop_id', selectedCrop)
      .eq('status', 'active')
      .then(({ data, error }) => {
        // Discard stale response.
        if (reqId !== typesReqId.current) return;

        if (error) {
          console.error('[DoseCalculator] application_type fetch error:', error);
        } else if (data) {
          const types = [...new Set(data.map((d) => d.application_type))].filter(Boolean) as string[];
          setAvailableTypes(types);
        }
        setTypesLoading(false);
      });
  }, [selectedCrop]); // eslint-disable-line react-hooks/exhaustive-deps

  // â”€â”€â”€ 3. Load crop stages whenever applicationType changes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // CRITICAL: Clear stale stages and results IMMEDIATELY.
  useEffect(() => {
    // Clear downstream synchronously.
    setCropStage('');
    setAvailableStages([]);
    setResults([]);
    setCalculated(false);
    setCalcError('');
    setStagesLoading(false);

    if (!selectedCrop || !applicationType) return;

    // Stamp this request.
    const reqId = ++stagesReqId.current;
    setStagesLoading(true);

    supabase
      .from('dose_rules')
      .select('crop_stage')
      .eq('crop_id', selectedCrop)
      .eq('application_type', applicationType)
      .eq('status', 'active')
      .then(({ data, error }) => {
        // Discard stale response.
        if (reqId !== stagesReqId.current) return;

        if (error) {
          console.error('[DoseCalculator] crop_stage fetch error:', error);
        } else if (data) {
          const stages = [...new Set(data.map((d) => d.crop_stage))].filter(Boolean) as string[];
          setAvailableStages(stages);
        }
        setStagesLoading(false);
      });
  }, [selectedCrop, applicationType]); // eslint-disable-line react-hooks/exhaustive-deps

  // â”€â”€â”€ 4. Calculate â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const calculate = useCallback(async () => {
    const area = parseFloat(landArea);
    if (!selectedCrop || !applicationType) return;
    if (!area || area <= 0) {
      alert(t('calc.enter_area'));
      return;
    }

    setCalcLoading(true);
    setCalcError('');
    setResults([]);
    setCalculated(false);

    try {
      let query = supabase
        .from('dose_rules')
        .select('*, product:products(*)')
        .eq('crop_id', selectedCrop)
        .eq('application_type', applicationType)
        .eq('status', 'active');

      // Filter by stage only when stages exist and one is selected.
      if (hasStages && cropStage) {
        query = query.eq('crop_stage', cropStage);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data && data.length > 0) {
        // 1 hectare = 2.47 acres
        const multiplier = areaUnit === 'hectare' ? area * 2.47 : area;
        const adjusted = data.map((rule) => ({
          ...rule,
          _base_quantity: rule.recommended_quantity, // keep original for display
          recommended_quantity: rule.recommended_quantity * multiplier,
        }));
        setResults(adjusted as DoseRule[]);
      } else {
        setResults([]);
      }
    } catch (e) {
      console.error('[DoseCalculator] calculation error:', e);
      setCalcError(t('calc.no_rec'));
    } finally {
      setCalculated(true);
      setCalcLoading(false);
    }
  }, [selectedCrop, applicationType, cropStage, landArea, areaUnit, hasStages, t]);

  // â”€â”€â”€ 5. Full reset â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const reset = useCallback(() => {
    // Invalidate any in-flight fetches.
    typesReqId.current++;
    stagesReqId.current++;

    setSelectedCrop('');
    setApplicationType('');
    setCropStage('');
    setLandArea('');
    setAreaUnit('acre');
    setAvailableTypes([]);
    setAvailableStages([]);
    setResults([]);
    setCalculated(false);
    setCalcError('');
    setTypesLoading(false);
    setStagesLoading(false);
    setCalcLoading(false);
  }, []);

  // â”€â”€â”€ Render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
                placeholder={cropsLoading ? 'Loading crops...' : t('calc.choose_crop')}
                disabled={cropsLoading}
              />
            </motion.div>

            {/* Step 2: Application Type */}
            <AnimatePresence>
              {selectedCrop && (
                <motion.div key="app-type" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Select
                    label={t('calc.step2')}
                    required
                    options={availableTypes.map((type) => ({ value: type, label: type }))}
                    value={applicationType}
                    onChange={(e) => setApplicationType(e.target.value)}
                    placeholder={
                      typesLoading
                        ? 'Loading...'
                        : availableTypes.length === 0
                          ? 'No options for this crop'
                          : t('calc.select_app')
                    }
                    disabled={typesLoading}
                  />
                  {!typesLoading && availableTypes.length === 0 && (
                    <p className="text-xs text-body-text/60 font-body mt-1">
                      No dose rules configured for this crop. Please contact support.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Crop Stage (only when stages exist) */}
            <AnimatePresence>
              {applicationType && hasStages && (
                <motion.div key="crop-stage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Select
                    label={t('calc.step3')}
                    required
                    options={availableStages.map((s) => ({ value: s, label: s }))}
                    value={cropStage}
                    onChange={(e) => setCropStage(e.target.value)}
                    placeholder={stagesLoading ? 'Loading...' : t('calc.select_stage')}
                    disabled={stagesLoading}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Land Area */}
            <AnimatePresence>
              {applicationType && !typesLoading && !stagesLoading && (!hasStages || cropStage) && (
                <motion.div key="land-area" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
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
              {landArea && applicationType && (!hasStages || cropStage) && (
                <motion.div
                  key="buttons"
                  className="flex gap-3 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button onClick={calculate} size="lg" disabled={calcLoading}>
                    {calcLoading ? 'Calculating...' : t('calc.btn_calc')}
                  </Button>
                  <Button variant="outline" onClick={reset} size="lg" disabled={calcLoading}>
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

            {calcLoading ? (
              <p className="text-sm text-body-text/60 font-body animate-pulse">
                Calculating recommendations...
              </p>
            ) : !calculated ? (
              <p className="text-sm text-body-text/60 font-body">
                {t('calc.complete_steps')}
              </p>
            ) : calcError ? (
              <div className="text-center py-8">
                <p className="text-body-text font-body mb-4">{calcError}</p>
                <p className="text-sm text-body-text/60 font-body">{t('calc.contact_support')}</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-body-text font-body mb-4">{t('calc.no_rec')}</p>
                <p className="text-sm text-body-text/60 font-body">{t('calc.contact_support')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((rule, i) => (
                  <motion.div
                    key={`${rule.id}-${i}`}
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
                      {hasStages && cropStage && (
                        <div>
                          <span className="block text-body-text/60 text-xs">{t('calc.lbl_stage')}</span>
                          <span className="font-semibold text-charcoal">{cropStage}</span>
                        </div>
                      )}
                      <div>
                        <span className="block text-body-text/60 text-xs">{t('calc.lbl_area')}</span>
                        <span className="font-semibold text-charcoal">
                          {landArea} {areaUnit === 'acre' ? t('calc.acre') : t('calc.hectare')}
                        </span>
                      </div>

                      <div className="col-span-2 pt-3 border-t border-border-subtle mt-1">
                        <span className="block text-body-text/60 text-xs">{t('calc.th_fert')}</span>
                        <span className="font-bold text-lg text-teal">{rule.fertilizer_name}</span>
                        {rule.product && (
                          <span className="block text-xs text-charcoal mt-0.5">{rule.product.form}</span>
                        )}
                      </div>

                      <div>
                        <span className="block text-body-text/60 text-xs">Recommended Dose</span>
                        <span className="font-semibold text-charcoal">
                          {/* _base_quantity holds the original per-unit rate before multiplication */}
                          {(rule as any)._base_quantity ?? rule.recommended_quantity} {rule.quantity_unit} / {rule.per_unit || areaUnit}
                        </span>
                      </div>

                      <div className="col-span-2">
                        <span className="block text-body-text/60 text-xs">Total Required Quantity</span>
                        <span className="font-bold text-xl text-coral">
                          {rule.recommended_quantity.toFixed(1)} {rule.quantity_unit}
                        </span>
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

