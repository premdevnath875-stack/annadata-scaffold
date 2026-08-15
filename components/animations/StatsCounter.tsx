'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  isText?: boolean;
}

interface StatsCounterProps {
  stats: readonly StatItem[];
  className?: string;
}

function AnimatedNumber({ value, isInView }: { value: number; isInView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    startRef.current = null;

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, value]);

  return <>{displayValue.toLocaleString('en-IN')}</>;
}

export function StatsCounter({ stats, className = '' }: StatsCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15, duration: 0.6 }}
        >
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-2">
            {stat.isText ? (
              <span>{stat.prefix}</span>
            ) : (
              <>
                {stat.prefix}
                <AnimatedNumber value={stat.value} isInView={isInView} />
                {stat.suffix}
              </>
            )}
          </div>
          <div className="text-sm md:text-base opacity-80 font-body">
            {stat.label}
          </div>
          {/* Animated underline */}
          <motion.div
            className="h-0.5 bg-white/30 mx-auto mt-3"
            initial={{ width: 0 }}
            animate={isInView ? { width: '60%' } : {}}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
