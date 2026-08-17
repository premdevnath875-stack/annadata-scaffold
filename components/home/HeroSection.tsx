'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TAGLINE, STATES_SERVED } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/banners/heropage.png"
          alt="Annadata Product Range — Complete fertilizer portfolio by Ostwal Group"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-4 md:px-8 lg:px-16 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-[#1F4E5F]/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-[#1F4E5F]/90 text-xs font-body font-semibold tracking-wide">
              Pioneer Since 1989 · ISO 9001:2015
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="font-heading font-bold text-[#1F4E5F] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transforming Agriculture
            <br />
            with <span className="text-coral">Annadata</span>
          </motion.h1>

          {/* H2 */}
          <motion.h2
            className="text-xl md:text-2xl font-heading font-semibold text-teal mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {TAGLINE}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-[#1F4E5F]/80 font-body leading-relaxed mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            India&apos;s trusted Annadata brand of SSP, water soluble fertilizers,
            micronutrients and speciality crop-nutrition products, from Ostwal
            Group of Industries. Serving farmers across 5 states.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link href="/products">
              <Button size="lg">Explore Products</Button>
            </Link>
            <Link href="/dose-calculator">
              <Button variant="outline" size="lg" className="border-[#3288A5] text-[#3288A5] hover:bg-[#3288A5]/10 hover:text-[#3288A5]">
                Dose Calculator
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#1F4E5F]/5 backdrop-blur-sm border-t border-[#1F4E5F]/10">
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-8 py-3 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...STATES_SERVED, ...STATES_SERVED, ...STATES_SERVED].map((state, i) => (
              <span key={i} className="flex items-center gap-2 text-[#1F4E5F]/60 text-sm font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                {state}
              </span>
            ))}
            <span className="flex items-center gap-2 text-[#1F4E5F]/60 text-sm font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              ISO 9001:2015 Certified
            </span>
            <span className="flex items-center gap-2 text-[#1F4E5F]/60 text-sm font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              37+ Products
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
