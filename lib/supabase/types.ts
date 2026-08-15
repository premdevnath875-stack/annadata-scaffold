/* ═══════════════════════════════════════════════════════════════
   Annadata — Database Types (matches Supabase schema exactly)
   ═══════════════════════════════════════════════════════════════ */

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'support';
export type UserStatus = 'active' | 'inactive';
export type ProductStatus = 'published' | 'draft' | 'archived';
export type EnquiryStatus = 'new' | 'in_progress' | 'resolved' | 'closed';
export type ApplicationType = 'Soil Application' | 'Fertigation' | 'Basal Dose' | 'Top Dressing';
export type ProductForm = 'Granular' | 'Powder' | 'Liquid' | 'Prill' | 'Crystalline Solid' | 'Fine Granular' | 'Various';

export interface Profile {
  id: string;
  auth_user_id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  status: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  brand: string;
  form: ProductForm;
  packaging: string[];
  short_description: string | null;
  description: string | null;
  nutrients: string | null;
  benefits: string | null;
  usage: string | null;
  suitable_crops: string | null;
  image_url: string | null;
  brochure_url: string | null;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: ProductCategory;
}

export interface Crop {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  short_description: string | null;
  climate: string | null;
  soil: string | null;
  nutrition_management: string | null;
  harvesting: string | null;
  diseases: string | null;
  tips: string | null;
  status: string;
  created_at: string;
  // Joined
  stages?: CropStage[];
}

export interface CropStage {
  id: string;
  crop_id: string;
  stage_name: string;
  display_order: number;
}

export interface DoseRule {
  id: string;
  crop_id: string;
  application_type: ApplicationType;
  crop_stage: string;
  application_stage: string;
  fertilizer_product_id: string | null;
  fertilizer_name: string;
  recommended_quantity: number;
  quantity_unit: string;
  per_unit: string;
  notes: string | null;
  status: string;
  created_at: string;
  // Joined
  crop?: Crop;
  product?: Product;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string | null;
  mobile: string;
  crop: string | null;
  preferred_language: string;
  subject: string | null;
  business_interest: string | null;
  message: string;
  source: string;
  status: EnquiryStatus;
  admin_note: string | null;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface DealerLocation {
  id: string;
  dealer_name: string;
  address: string | null;
  city: string;
  district: string | null;
  state: string;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  mobile: string | null;
  status: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  admin_id: string | null;
  action: string;
  entity: string;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  updated_at: string;
}

/* ═══════════════════════════════════════════════════════════════
   Form / Input types (for admin panel forms)
   ═══════════════════════════════════════════════════════════════ */

export interface ProductFormData {
  name: string;
  brand: string;
  form: ProductForm;
  packaging: string[];
  category_id: string | null;
  short_description: string;
  description: string;
  nutrients: string;
  benefits: string;
  usage: string;
  suitable_crops: string;
  image_url: string;
  brochure_url: string;
  status: ProductStatus;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  mobile: string;
  crop: string;
  preferred_language: string;
  business_interest: string;
  message: string;
  source: string;
  honeypot?: string; // Anti-spam
}

export interface DoseCalculatorInput {
  crop_id: string;
  application_type: ApplicationType;
  crop_stage: string;
  application_stage: string;
  land_area: number;
  area_unit: 'acre' | 'hectare';
}

export interface DoseResult {
  fertilizer_name: string;
  product?: Product;
  quantity: number;
  unit: string;
  per_unit: string;
  notes: string | null;
}
