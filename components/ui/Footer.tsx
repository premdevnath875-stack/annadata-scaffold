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
