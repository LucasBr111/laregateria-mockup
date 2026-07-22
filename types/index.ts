export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;          // en Gs.
  originalPrice?: number; // para mostrar descuento
  category: ProductCategory;
  images: string[];       // URLs de placeholder
  variants: ProductVariant[];
  tags: string[];
  isNew: boolean;
  isFeatured: boolean;
  isSale: boolean;
  rating: number;
  reviewCount: number;
  measurements: SizeMeasurement[]; // para FitFinder
}

export interface SizeMeasurement {
  size: string;
  bustCm: number;
  waistCm: number;
  hipCm: number;
  lengthCm: number;
}

export type ProductCategory = 'vestidos' | 'gym' | 'new' | 'clientes';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  shippingZone: ShippingZone | null;
}

export type ShippingZone = 'asuncion' | 'gran-asuncion' | 'interior' | 'retiro';

export const SHIPPING_COSTS: Record<ShippingZone, number> = {
  'asuncion':       15000,
  'gran-asuncion':  20000,
  'interior':       35000,
  'retiro':         0,
};

export const SHIPPING_LABELS: Record<ShippingZone, string> = {
  'asuncion':       'cde (1-2 días)',
  'gran-asuncion':  'Gran cde (2-3 días)',
  'interior':       'Interior del país (3-5 días)',
  'retiro':         'Retiro en local (gratis)',
};

export type LoyaltyRank = 'bronce' | 'plata' | 'oro';

export interface LoyaltyInfo {
  rank: LoyaltyRank;
  points: number;
  pointsToNextRank: number;
  nextRank: LoyaltyRank | null;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  expiresAt: string;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  loyalty: LoyaltyInfo;
  coupons: Coupon[];
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  rank: LoyaltyRank;
  wishlist: string[]; // product IDs
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  shippingZone: ShippingZone;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'whatsapp' | 'transfer' | 'card' | 'qr';

export interface KPI {
  label: string;
  value: string;
  change: number;     // porcentaje de cambio vs período anterior
  isPositive: boolean;
}

export interface StockAlert {
  productId: string;
  productName: string;
  variant: string;
  currentStock: number;
  threshold: number;
}

// FitFinder
export interface FitFinderInput {
  usualSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  fitPreference: 'ajustado' | 'suelto' | 'estandar';
  heightCm: number;
  weightKg?: number;
}

export interface FitFinderResult {
  recommendedSize: string;
  confidence: number; // 0-100
  notes: string;
}

// CSV Import
export interface CsvProductRow {
  sku: string;
  name: string;
  category: string;
  size: string;
  color: string;
  stock: string;
  price: string;
}

export interface CsvImportPreview {
  rows: CsvProductRow[];
  validCount: number;
  errorCount: number;
  errors: string[];
}

// UI State
export interface UIState {
  cartOpen: boolean;
  fitFinderOpen: boolean;
  selectedProductId: string | null;
  mobileMenuOpen: boolean;
  checkoutStep: CheckoutStep;
  paymentMethod: PaymentMethod | null;
  theme: 'dark' | 'light';
}

export type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirm';

// Notify when back in stock
export interface NotifyMeRequest {
  productId: string;
  variantId: string;
  email: string;
  phone?: string;
}
