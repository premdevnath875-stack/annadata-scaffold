/* ═══════════════════════════════════════════════════════════════
   Annadata — Global Constants
   Single source of truth for brand assets and config
   ═══════════════════════════════════════════════════════════════ */

// Logo paths — reference these constants, never hardcode paths
export const LOGO_PATH = '/logo/annadata-logo.png';
export const LOGO_ALT = 'Annadata — अन्नदाता — Fertilizer Brand by Ostwal Group of Industries';

// Brand
export const BRAND_NAME = 'Annadata';
export const PARENT_COMPANY = 'Ostwal Group of Industries';
export const TAGLINE = 'Rooted in Agriculture. Built for Tomorrow.';
export const SUB_TAGLINE = 'Pioneer in Phosphatic Fertilizers Since 1989';
export const ESTABLISHED_YEAR = 1989;

// Contact
export const CONTACT_EMAIL = 'info@ostwal.in';
export const WEBSITE_URL = 'https://www.ostwal.in';
export const LINKEDIN_URL = 'https://in.linkedin.com/company/ostwal-group-of-industries';
export const GOOGLE_MAPS_DIRECTIONS = 'https://share.google/Ji1JUGv8QZ59DnaPq';
export const GOOGLE_MAPS_EMBED = 'https://maps.google.com/maps?q=Ostwal+Group+Bhilwara+Rajasthan&output=embed';

export const OFFICE_ADDRESS = {
  line1: 'Plot No. 5-O-20/21, R.C. Vyas Colony',
  line2: 'Near Sita Ram Ji Ki Bawdi',
  city: 'Bhilwara',
  state: 'Rajasthan',
  pincode: '311001',
  country: 'India',
  full: 'Plot No. 5-O-20/21, R.C. Vyas Colony, Near Sita Ram Ji Ki Bawdi, Bhilwara, Rajasthan — 311001, India',
};

// Stats (real data)
export const STATS = [
  { label: 'Years of Excellence', value: 35, suffix: '+', prefix: '' },
  { label: 'Group Companies', value: 5, suffix: '', prefix: '' },
  { label: 'States Served', value: 5, suffix: '', prefix: '' },
  { label: 'MT Annual Capacity', value: 138000, suffix: '', prefix: '' },
  { label: 'Products Under Annadata', value: 37, suffix: '+', prefix: '' },
  { label: 'Certified', value: 0, suffix: '', prefix: 'ISO 9001:2015', isText: true },
] as const;

// States served
export const STATES_SERVED = [
  'Rajasthan',
  'Madhya Pradesh',
  'Gujarat',
  'Uttar Pradesh',
  'Maharashtra',
] as const;

// Group Companies
export const GROUP_COMPANIES = [
  {
    name: 'Ostwal Phoschem (India) Ltd (OPIL)',
    shortName: 'OPIL',
    description: 'Oldest group company — SSP fertilizer under the Annadata brand. Plant at Hamirgarh, Bhilwara. Capacity: 1,38,000 MTPA. Raw materials from Jordan Phosphate Mines Co. (import) and RSMM Rajasthan (domestic).',
    capacity: '1,38,000 MTPA',
    location: 'Hamirgarh, Bhilwara, Rajasthan',
  },
  {
    name: 'Madhya Bharat Agro Products Ltd (MBAPL)',
    shortName: 'MBAPL',
    description: 'NSE Main Board listed since 2019. CIN: L24121RJ1997PLC029126. Incorporated October 22, 1997. ISO 9001:2015 certified. Capacity: 9,63,000 MTPA.',
    capacity: '9,63,000 MTPA',
    location: 'Vill. Rajoua, Dist. Sagar, Madhya Pradesh',
  },
  {
    name: 'Seasons Agrochem India Pvt Ltd',
    shortName: 'Seasons Agrochem',
    description: 'Agro chemicals division of the Ostwal Group. Incorporated 1st June 2004. Engaged in the manufacture and distribution of agrochemical products.',
    capacity: '',
    location: 'India',
  },
  {
    name: 'SGFL (Subsidiary of OPIL)',
    shortName: 'SGFL',
    description: 'SSP & GSSP fertilizers division. Plant at Gora Ji Ka Nimbahera, Kapasan, Rajasthan. Capacity: 1,05,000 MTPA.',
    capacity: '1,05,000 MTPA',
    location: 'Kapasan, Rajasthan',
  },
  {
    name: 'Krishna Phoschem Ltd',
    shortName: 'Krishna Phoschem',
    description: 'Phosphatic fertilizers division of the Ostwal Group. Manufacturing phosphate-based fertilizer products.',
    capacity: '',
    location: 'India',
  },
] as const;

// Leadership
export const LEADERSHIP = [
  {
    name: 'Mr. M.K. Ostwal',
    role: 'Founder & Chairman',
    description: 'First-generation technocrat entrepreneur and industry pioneer in SSP & BRP manufacturing.',
  },
  {
    name: 'Mr. Praveen Ostwal',
    role: 'Managing Director',
    description: 'Director, Krishna Phoschem Ltd & Director, Ostwal Group of Industries.',
  },
  {
    name: 'Mr. Pankaj Ostwal',
    role: 'Managing Director (MBAPL)',
    description: 'Led turnaround of multiple fertilizer units within the Ostwal Group.',
  },
] as const;

// Product forms (for admin dropdown)
export const PRODUCT_FORMS: string[] = [
  'Granular',
  'Powder',
  'Liquid',
  'Prill',
  'Crystalline Solid',
  'Fine Granular',
  'Various',
];

// Business interest options (for contact form)
export const BUSINESS_INTERESTS = [
  'Farming Enquiry',
  'Product Enquiry',
  'Dealer/Distributor Enquiry',
  'Business Partnership',
  'Chemical Products',
  'Agri-Food Export/Import',
  'General Information',
  'Support',
] as const;

// Languages
export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
] as const;

// Navigation
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/crops', label: 'Crops' },
  { href: '/dose-calculator', label: 'Dose Calculator' },
  { href: '/dealer-locator', label: 'Dealer Locator' },
  { href: '/contact', label: 'Contact' },
] as const;

// Admin nav
export const ADMIN_NAV_LINKS = [
  { href: '/admin-hd-x92/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin-hd-x92/products', label: 'Products', icon: '📦' },
  { href: '/admin-hd-x92/crops', label: 'Crops', icon: '🌾' },
  { href: '/admin-hd-x92/dose-rules', label: 'Dose Rules', icon: '💊' },
  { href: '/admin-hd-x92/dealers', label: 'Dealers', icon: '📍' },
  { href: '/admin-hd-x92/enquiries', label: 'Enquiries', icon: '📩' },
  { href: '/admin-hd-x92/settings', label: 'Settings', icon: '⚙️' },
] as const;

// Product image mapping (local workspace images → product slugs)
export const PRODUCT_IMAGE_MAP: Record<string, string> = {
  'single-super-phosphate-ssp-g': '/images/products/ssp-g.png',
  'single-super-phosphate-ssp-p': '/images/products/ssp-p.png',
  'boronated-ssp-boss-g': '/images/products/boss-g.png',
  'boronated-ssp-boss-p': '/images/products/boss-p.png',
  'annadata-zibo': '/images/products/zibo.png',
  'ammonium-sulphate': '/images/products/ammonium-sulphate.png',
  'super-6-zincated-boronated-magnesium-ssp': '/images/products/super-6.png',
  'sop-00-00-50': '/images/products/sop.png',
  'mkp-00-52-34': '/images/products/mkp.png',
  'map-12-61-00': '/images/products/map.png',
  'nop-13-00-45': '/images/products/nop.png',
  'npk-19-19-19': '/images/products/npk.png',
  'vriddhi-calcium-nitrate': '/images/products/vriddhi.png',
  'vridhi-boronated-calcium-nitrate': '/images/products/vriddhi-b.png',
  'casma': '/images/products/casma.png',
  'sulphur-bentonite': '/images/products/sulphur-bentonite.jpg',
  'sanjivani-boron-14-5': '/images/products/sanjivani-boron.png',
  'sanjivani-boron-20': '/images/products/sanjivani-boron.png',
  'ferrous-12-edta': '/images/products/ferrous-edta.png',
  'zinc-12-edta': '/images/products/zinc-edta.png',
  'mono-zinc-33': '/images/products/mono-zinc.png',
  'zinc-39-5-suspension-concentrate': '/images/products/zinc-sc.png',
  'magnesium-sulphate-epsom-salt': '/images/products/magnesium-sulphate.png',
  'manganese-sulphate': '/images/products/manganese-sulphate.png',
  'srishti-zinc-5': '/images/products/srishti-zinc.png',
  'ferrous-sulphate-feso4': '/images/products/ferrous-sulphate.png',
  'potash-14-5': '/images/products/potash.png',
  'magic-phos-prom': '/images/products/magic-phos.png',
  'vermicompost': '/images/products/vermicompost.png',
  'samriddhi-g': '/images/products/samriddhi-g.png',
  'samriddhi-p': '/images/products/samriddhi-p.png',
  'doctor-g': '/images/products/doctor-g-plus.png',
  'bhumi-rakshak-soil-conditioner': '/images/products/bhumi-rakshak.png',
  'green-genius-5-in-1': '/images/products/green-genius.png',
  'sampurna-kit-multi-nutrient-kit': '/images/products/sampurna-kit.png',
  'doctor-g-2': '/images/products/doctor-g.png',
  'doctor-p': '/images/products/doctor-p.png',
};
