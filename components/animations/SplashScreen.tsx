'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { LOGO_PATH, LOGO_ALT, TAGLINE } from '@/lib/constants';

export function SplashScreen() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    // Only show once per session
    if (typeof window !== 'undefined') {
      const shown = sessionStorage.getItem('annadata_splash_shown');
      if (shown) {
        setShow(false);
        return;
      }
      setShow(true);
      document.body.style.overflow = 'hidden';

      // Sequence timings
      const timers: ReturnType<typeof setTimeout>[] = [];
      timers.push(setTimeout(() => setStep(1), 0));        // Logo
      timers.push(setTimeout(() => setStep(2), 500));       // Letters
      timers.push(setTimeout(() => setStep(3), 1300));      // Tagline
      timers.push(setTimeout(() => setStep(4), 1700));      // ISO badge
      timers.push(setTimeout(() => setStep(5), 2000));      // Sub-line

      // Auto-dismiss at 4s
      timerRef.current = setTimeout(() => dismiss(), 4000);

      return () => {
        timers.forEach(clearTimeout);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('annadata_splash_shown', 'true');
    document.body.style.overflow = 'auto';
  };

  const letters = 'ANNADATA'.split('');

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer"
          onClick={dismiss}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Background — dark with gradient overlay */}
          <div className="absolute inset-0 bg-[#2A2A2A]">
            <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-teal/20" />
            {/* Particle dots (CSS-only lightweight version) */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 6 + 2,
                    height: Math.random() * 6 + 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: i % 3 === 0 ? '#E15959' : i % 3 === 1 ? '#3288A5' : 'rgba(255,255,255,0.5)',
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Step 1: Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={step >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Image
                src={LOGO_PATH}
                alt={LOGO_ALT}
                width={120}
                height={120}
                className="drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Step 2: Letter-by-letter ANNADATA */}
            <div className="flex gap-1 md:gap-2">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.04, duration: 0.3, ease: 'easeOut' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Step 3: Tagline */}
            <motion.p
              className="text-white/90 text-lg md:text-xl font-body text-center max-w-md"
              initial={{ opacity: 0 }}
              animate={step >= 3 ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              {TAGLINE}
            </motion.p>

            {/* Step 4: ISO Badge */}
            <motion.div
              className="bg-coral text-white text-xs md:text-sm font-bold font-body px-4 py-1.5 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={step >= 4 ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              ISO 9001:2015 Certified
            </motion.div>

            {/* Step 5: Sub-line */}
            <motion.p
              className="text-white/70 text-sm font-body text-center"
              initial={{ opacity: 0 }}
              animate={step >= 5 ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              A Brand of Ostwal Group of Industries · Pioneer Since 1989
            </motion.p>
          </div>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-8 text-white/40 text-xs font-body"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap anywhere to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
