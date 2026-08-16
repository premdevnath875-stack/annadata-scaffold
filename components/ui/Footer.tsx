import Link from 'next/link';
import Image from 'next/image';
import {
  LOGO_PATH,
  LOGO_ALT,
  BRAND_NAME,
  TAGLINE,
  OFFICE_ADDRESS,
  CONTACT_EMAIL,
  WEBSITE_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  X_URL,
  YOUTUBE_URL,
  NAV_LINKS,
} from '@/lib/constants';

const PRODUCT_LINKS = [
  { href: '/products?category=ssp-fertilizers', label: 'SSP Fertilizers' },
  { href: '/products?category=water-soluble-fertilizers', label: 'Water Soluble' },
  { href: '/products?category=calcium-nitrate-range', label: 'Calcium Nitrate' },
  { href: '/products?category=micronutrients', label: 'Micronutrients' },
  { href: '/products?category=speciality-combination-products', label: 'Speciality Products' },
  { href: '/products?category=bio-organic', label: 'Bio / Organic' },
];

export function Footer() {
  return (
    <footer className="bg-footer-bg text-white" role="contentinfo">
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src={LOGO_PATH}
                alt={LOGO_ALT}
                width={56}
                height={56}
                className="h-14 w-auto brightness-110"
              />
              <div>
                <span className="text-xl font-bold font-heading text-coral">{BRAND_NAME}</span>
                <span className="block text-xs text-white/60 font-body">by Ostwal Group</span>
              </div>
            </Link>
            <p className="text-sm text-white/70 font-body leading-relaxed mb-4">
              {TAGLINE}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-coral/20 text-coral text-xs font-bold px-3 py-1 rounded-full font-body">
                ISO 9001:2015
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-coral transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-coral transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-coral transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-coral transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-coral transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h3 className="text-sm font-bold font-body tracking-[0.1em] uppercase text-white/50 mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-coral transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h3 className="text-sm font-bold font-body tracking-[0.1em] uppercase text-white/50 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.filter(l => l.href !== '/').map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-coral transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/careers" className="text-sm text-white/70 hover:text-coral transition-colors font-body">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-sm font-bold font-body tracking-[0.1em] uppercase text-white/50 mb-4">
              Registered Office
            </h3>
            <address className="not-italic text-sm text-white/70 font-body leading-relaxed space-y-2">
              <p>
                {BRAND_NAME} (Ostwal Group of Industries)<br />
                {OFFICE_ADDRESS.line1},<br />
                {OFFICE_ADDRESS.line2},<br />
                {OFFICE_ADDRESS.city}, {OFFICE_ADDRESS.state} — {OFFICE_ADDRESS.pincode}
              </p>
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-coral transition-colors">
                  ✉ {CONTACT_EMAIL}
                </a>
              </p>
              <p>
                <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors">
                  🌐 {WEBSITE_URL.replace('https://', '')}
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/50 font-body">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME} — A Brand of Ostwal Group of Industries. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-coral transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-coral transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
