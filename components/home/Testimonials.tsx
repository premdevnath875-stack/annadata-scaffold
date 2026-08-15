'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const TESTIMONIALS = [
  {
    name: 'Ramesh Patel',
    location: 'Mehsana, Gujarat',
    crop: 'Groundnut & Cotton',
    text: 'Annadata SSP has been our family\'s choice for 15 years. The granular form dissolves evenly, and we\'ve seen 20% better yield since switching to Boronated SSP for our cotton crop.',
  },
  {
    name: 'Suresh Kumar Meena',
    location: 'Bhilwara, Rajasthan',
    crop: 'Wheat & Mustard',
    text: 'I use Annadata ZIBO for my wheat fields. The combination of zinc and boron in SSP is exactly what our Rajasthan soils need. My mustard oil content improved after using Sulphur Bentonite.',
  },
  {
    name: 'Dinesh Yadav',
    location: 'Sagar, Madhya Pradesh',
    crop: 'Soybean & Gram',
    text: 'The Sampurna Kit is a game-changer — one kit per acre covers all micro and macro nutrients. Very convenient, and the crop response is visible within 2 weeks of application.',
  },
  {
    name: 'Prakash Sharma',
    location: 'Lucknow, Uttar Pradesh',
    crop: 'Rice & Sugarcane',
    text: 'Vriddhi Calcium Nitrate solved our blossom end rot problem in tomatoes completely. For rice, Mono Zinc 33 at transplanting has become a standard practice in our village now.',
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <SectionWrapper bg="white" id="testimonials">
      <div className="text-center">
        <ScrollReveal>
          <SectionLabel>Farmer Voices</SectionLabel>
          <SectionHeading className="mt-2 mb-10">What Farmers Say About Annadata</SectionHeading>
        </ScrollReveal>
      </div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-section-bg rounded-lg p-8 text-center"
          >
            {/* Quote mark */}
            <div className="text-5xl text-teal/30 font-serif mb-4">&ldquo;</div>

            <p className="text-base md:text-lg text-body-text font-body leading-relaxed italic mb-6">
              {TESTIMONIALS[active].text}
            </p>

            <div>
              <p className="font-semibold font-heading text-charcoal">
                {TESTIMONIALS[active].name}
              </p>
              <p className="text-sm text-teal font-body">{TESTIMONIALS[active].location}</p>
              <p className="text-xs text-body-text/60 font-body mt-1">
                Grows: {TESTIMONIALS[active].crop}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); if (intervalRef.current) clearInterval(intervalRef.current); }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === active ? 'bg-coral w-8' : 'bg-body-text/20'
              }`}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
