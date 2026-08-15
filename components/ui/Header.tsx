'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_PATH, LOGO_ALT, NAV_LINKS, LANGUAGES, LINKEDIN_URL } from '@/lib/constants';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-tech-soft'
            : 'bg-white'
        }`}
      >
        {/* Top bar */}
        <div className="border-b border-border-subtle">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between h-10 text-xs font-body text-body-text">
            <span className="hidden md:block">Pioneer in Phosphatic Fertilizers Since 1989 · ISO 9001:2015</span>
            <div className="flex items-center gap-4 ml-auto">
              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 hover:text-teal transition-colors"
                  aria-label="Select language"
                >
                  <span>🌐</span>
                  <span>{LANGUAGES.find(l => l.code === currentLang)?.native || 'English'}</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute right-0 top-full mt-1 bg-white shadow-tech-soft rounded-lg border border-border-subtle py-1 min-w-[120px] z-50"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }}
                          className={`w-full text-left px-3 py-1.5 hover:bg-section-bg transition-colors ${
                            currentLang === lang.code ? 'text-coral font-semibold' : ''
                          }`}
                        >
                          {lang.native}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/careers" className="hidden sm:block hover:text-teal transition-colors">
                Careers
              </Link>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src={LOGO_PATH}
              alt={LOGO_ALT}
              width={48}
              height={48}
              className="h-10 w-auto md:h-12"
              priority
            />
            <div className="hidden sm:block">
              <span className="text-lg font-bold font-heading text-coral">ANNADATA</span>
              <span className="block text-[10px] text-body-text font-body -mt-0.5">by Ostwal Group of Industries</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium font-body transition-colors hover:text-teal ${
                  isActive(link.href)
                    ? 'text-coral'
                    : 'text-charcoal'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-coral"
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.span
              className="block w-6 h-0.5 bg-charcoal"
              animate={mobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-charcoal"
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-charcoal"
              animate={mobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
            <motion.nav
              className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="pt-24 pb-8 px-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-3 text-base font-medium font-body border-l-4 pl-4 transition-colors ${
                      isActive(link.href)
                        ? 'text-coral border-teal bg-section-bg'
                        : 'text-charcoal border-transparent hover:border-teal/30'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/careers"
                  className="block py-3 text-base font-medium font-body border-l-4 pl-4 text-charcoal border-transparent hover:border-teal/30 mt-2 pt-5 border-t border-border-subtle"
                >
                  Careers
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-[104px]" />
    </>
  );
}
