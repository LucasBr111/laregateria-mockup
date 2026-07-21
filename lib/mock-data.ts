import type {
  Product,
  Customer,
  Order,
  KPI,
  StockAlert,
} from '@/types';

// ─────────────────────────────────────────────
// Helpers de imagen placeholder (Unsplash fashion)
// ─────────────────────────────────────────────
const IMG = {
  vestido1:  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
  vestido2:  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
  vestido3:  'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80',
  vestido4:  'https://images.unsplash.com/photo-1566479179817-c0b9a37e1e27?w=600&q=80',
  vestido5:  'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80',
  gym1:      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
  gym2:      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
  gym3:      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80',
  new1:      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
  new2:      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
  new3:      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
  social1:   'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80',
  social2:   'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80',
  social3:   'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
  avatar1:   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  avatar2:   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  avatar3:   'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
  hero:      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=85',
  hero2:     'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85',
};

// ─────────────────────────────────────────────
// PRODUCTOS
// ─────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  // ── VESTIDOS ──
  {
    id: 'v001',
    name: 'Vestido Midi Satén Negro',
    slug: 'vestido-midi-saten-negro',
    description:
      'Corte midi elegante en satén fluido. Silueta ajustada al cuerpo con escote en V y tirantes finos. Ideal para salidas nocturnas o eventos especiales.',
    price: 320000,
    originalPrice: 420000,
    category: 'vestidos',
    images: [IMG.vestido1, IMG.vestido2],
    isNew: false,
    isFeatured: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 34,
    tags: ['noche', 'elegante', 'satén'],
    measurements: [
      { size: 'XS', bustCm: 80, waistCm: 62, hipCm: 88, lengthCm: 108 },
      { size: 'S',  bustCm: 84, waistCm: 66, hipCm: 92, lengthCm: 110 },
      { size: 'M',  bustCm: 88, waistCm: 70, hipCm: 96, lengthCm: 111 },
      { size: 'L',  bustCm: 94, waistCm: 76, hipCm: 102, lengthCm: 113 },
      { size: 'XL', bustCm: 100, waistCm: 82, hipCm: 108, lengthCm: 115 },
    ],
    variants: [
      { id: 'v001-xs-neg', size: 'XS', color: 'Negro', colorHex: '#0A0A0A', stock: 3, sku: 'VMS-NEG-XS' },
      { id: 'v001-s-neg',  size: 'S',  color: 'Negro', colorHex: '#0A0A0A', stock: 8, sku: 'VMS-NEG-S'  },
      { id: 'v001-m-neg',  size: 'M',  color: 'Negro', colorHex: '#0A0A0A', stock: 5, sku: 'VMS-NEG-M'  },
      { id: 'v001-l-neg',  size: 'L',  color: 'Negro', colorHex: '#0A0A0A', stock: 2, sku: 'VMS-NEG-L'  },
      { id: 'v001-xl-neg', size: 'XL', color: 'Negro', colorHex: '#0A0A0A', stock: 0, sku: 'VMS-NEG-XL' },
      { id: 'v001-xs-vin', size: 'XS', color: 'Vino',  colorHex: '#722F37', stock: 4, sku: 'VMS-VIN-XS' },
      { id: 'v001-s-vin',  size: 'S',  color: 'Vino',  colorHex: '#722F37', stock: 6, sku: 'VMS-VIN-S'  },
      { id: 'v001-m-vin',  size: 'M',  color: 'Vino',  colorHex: '#722F37', stock: 3, sku: 'VMS-VIN-M'  },
    ],
  },
  {
    id: 'v002',
    name: 'Vestido Floral Boho',
    slug: 'vestido-floral-boho',
    description:
      'Vestido largo de estampado floral con manga corta y cintura elástica. Tejido liviano, perfecto para el calor paraguayo.',
    price: 245000,
    category: 'vestidos',
    images: [IMG.vestido3, IMG.vestido4],
    isNew: true,
    isFeatured: true,
    isSale: false,
    rating: 4.6,
    reviewCount: 18,
    tags: ['verano', 'floral', 'boho'],
    measurements: [
      { size: 'S',  bustCm: 88, waistCm: 72, hipCm: 96,  lengthCm: 130 },
      { size: 'M',  bustCm: 92, waistCm: 76, hipCm: 100, lengthCm: 132 },
      { size: 'L',  bustCm: 98, waistCm: 82, hipCm: 106, lengthCm: 134 },
      { size: 'XL', bustCm: 104, waistCm: 88, hipCm: 112, lengthCm: 136 },
    ],
    variants: [
      { id: 'v002-s',  size: 'S',  color: 'Floral Multi', colorHex: '#E8C766', stock: 7, sku: 'VFB-S'  },
      { id: 'v002-m',  size: 'M',  color: 'Floral Multi', colorHex: '#E8C766', stock: 4, sku: 'VFB-M'  },
      { id: 'v002-l',  size: 'L',  color: 'Floral Multi', colorHex: '#E8C766', stock: 1, sku: 'VFB-L'  },
      { id: 'v002-xl', size: 'XL', color: 'Floral Multi', colorHex: '#E8C766', stock: 0, sku: 'VFB-XL' },
    ],
  },
  {
    id: 'v003',
    name: 'Vestido Mini Crochet',
    slug: 'vestido-mini-crochet',
    description:
      'Mini vestido tejido en crochet con transparencias sutiles y forro interior. Tendencia del momento para look playero o festival.',
    price: 185000,
    category: 'vestidos',
    images: [IMG.vestido5, IMG.vestido1],
    isNew: true,
    isFeatured: false,
    isSale: false,
    rating: 4.9,
    reviewCount: 7,
    tags: ['playa', 'tendencia', 'verano'],
    measurements: [
      { size: 'XS', bustCm: 80, waistCm: 64, hipCm: 88,  lengthCm: 75 },
      { size: 'S',  bustCm: 84, waistCm: 68, hipCm: 92,  lengthCm: 77 },
      { size: 'M',  bustCm: 90, waistCm: 74, hipCm: 98,  lengthCm: 78 },
      { size: 'L',  bustCm: 96, waistCm: 80, hipCm: 104, lengthCm: 80 },
    ],
    variants: [
      { id: 'v003-xs-bco', size: 'XS', color: 'Blanco',  colorHex: '#F5F0E8', stock: 5, sku: 'VMC-BCO-XS' },
      { id: 'v003-s-bco',  size: 'S',  color: 'Blanco',  colorHex: '#F5F0E8', stock: 3, sku: 'VMC-BCO-S'  },
      { id: 'v003-m-bco',  size: 'M',  color: 'Blanco',  colorHex: '#F5F0E8', stock: 2, sku: 'VMC-BCO-M'  },
      { id: 'v003-s-are',  size: 'S',  color: 'Arena',   colorHex: '#C8A882', stock: 6, sku: 'VMC-ARE-S'  },
      { id: 'v003-m-are',  size: 'M',  color: 'Arena',   colorHex: '#C8A882', stock: 4, sku: 'VMC-ARE-M'  },
    ],
  },
  {
    id: 'v004',
    name: 'Vestido Formal Asimétrico',
    slug: 'vestido-formal-asimetrico',
    description:
      'Vestido largo de fiesta con corte asimétrico en el dobladillo. Tela de georgette fluido, cremallera en espalda. Ideal para eventos de gala.',
    price: 490000,
    category: 'vestidos',
    images: [IMG.vestido2, IMG.vestido5],
    isNew: false,
    isFeatured: true,
    isSale: false,
    rating: 4.7,
    reviewCount: 12,
    tags: ['formal', 'gala', 'fiesta'],
    measurements: [
      { size: 'XS', bustCm: 80, waistCm: 62, hipCm: 88, lengthCm: 148 },
      { size: 'S',  bustCm: 84, waistCm: 66, hipCm: 92, lengthCm: 150 },
      { size: 'M',  bustCm: 88, waistCm: 70, hipCm: 96, lengthCm: 152 },
      { size: 'L',  bustCm: 94, waistCm: 76, hipCm: 102, lengthCm: 153 },
    ],
    variants: [
      { id: 'v004-xs-neg', size: 'XS', color: 'Negro',  colorHex: '#0A0A0A', stock: 2, sku: 'VFA-NEG-XS' },
      { id: 'v004-s-neg',  size: 'S',  color: 'Negro',  colorHex: '#0A0A0A', stock: 4, sku: 'VFA-NEG-S'  },
      { id: 'v004-m-neg',  size: 'M',  color: 'Negro',  colorHex: '#0A0A0A', stock: 3, sku: 'VFA-NEG-M'  },
      { id: 'v004-s-dor',  size: 'S',  color: 'Dorado', colorHex: '#D4AF37', stock: 1, sku: 'VFA-DOR-S'  },
      { id: 'v004-m-dor',  size: 'M',  color: 'Dorado', colorHex: '#D4AF37', stock: 0, sku: 'VFA-DOR-M'  },
    ],
  },

  // ── GYM ──
  {
    id: 'g001',
    name: 'Set Deportivo Sculpt',
    slug: 'set-deportivo-sculpt',
    description:
      'Top y calza de alto impacto en tejido técnico Dry-Fit. Costuras planas sin roce, cintura alta. Disponible en colores vibrantes.',
    price: 195000,
    category: 'gym',
    images: [IMG.gym1, IMG.gym2],
    isNew: true,
    isFeatured: true,
    isSale: false,
    rating: 4.9,
    reviewCount: 56,
    tags: ['gym', 'deportivo', 'sculpt'],
    measurements: [
      { size: 'XS', bustCm: 74, waistCm: 58, hipCm: 82, lengthCm: 90 },
      { size: 'S',  bustCm: 78, waistCm: 62, hipCm: 86, lengthCm: 92 },
      { size: 'M',  bustCm: 84, waistCm: 68, hipCm: 92, lengthCm: 94 },
      { size: 'L',  bustCm: 90, waistCm: 74, hipCm: 98, lengthCm: 96 },
    ],
    variants: [
      { id: 'g001-xs-neg', size: 'XS', color: 'Negro',   colorHex: '#0A0A0A', stock: 10, sku: 'SDS-NEG-XS' },
      { id: 'g001-s-neg',  size: 'S',  color: 'Negro',   colorHex: '#0A0A0A', stock: 12, sku: 'SDS-NEG-S'  },
      { id: 'g001-m-neg',  size: 'M',  color: 'Negro',   colorHex: '#0A0A0A', stock: 8,  sku: 'SDS-NEG-M'  },
      { id: 'g001-l-neg',  size: 'L',  color: 'Negro',   colorHex: '#0A0A0A', stock: 5,  sku: 'SDS-NEG-L'  },
      { id: 'g001-xs-ros', size: 'XS', color: 'Rosa Hot', colorHex: '#E91E8C', stock: 6, sku: 'SDS-ROS-XS' },
      { id: 'g001-s-ros',  size: 'S',  color: 'Rosa Hot', colorHex: '#E91E8C', stock: 7, sku: 'SDS-ROS-S'  },
      { id: 'g001-m-ros',  size: 'M',  color: 'Rosa Hot', colorHex: '#E91E8C', stock: 4, sku: 'SDS-ROS-M'  },
      { id: 'g001-xs-mor', size: 'XS', color: 'Morado',  colorHex: '#7B2D8B', stock: 3, sku: 'SDS-MOR-XS' },
      { id: 'g001-s-mor',  size: 'S',  color: 'Morado',  colorHex: '#7B2D8B', stock: 4, sku: 'SDS-MOR-S'  },
    ],
  },
  {
    id: 'g002',
    name: 'Calza Marble Pro',
    slug: 'calza-marble-pro',
    description:
      'Calza de 7/8 con estampado marmolado exclusivo. Bolsillo lateral, cintura alta con doble banda. Compresión media.',
    price: 135000,
    originalPrice: 165000,
    category: 'gym',
    images: [IMG.gym3, IMG.gym1],
    isNew: false,
    isFeatured: false,
    isSale: true,
    rating: 4.7,
    reviewCount: 29,
    tags: ['calza', 'gym', 'marmolado'],
    measurements: [
      { size: 'XS', bustCm: 0, waistCm: 58, hipCm: 82, lengthCm: 70 },
      { size: 'S',  bustCm: 0, waistCm: 62, hipCm: 86, lengthCm: 72 },
      { size: 'M',  bustCm: 0, waistCm: 68, hipCm: 92, lengthCm: 74 },
      { size: 'L',  bustCm: 0, waistCm: 74, hipCm: 98, lengthCm: 76 },
    ],
    variants: [
      { id: 'g002-xs', size: 'XS', color: 'Mármol Gris', colorHex: '#9E9E9E', stock: 5, sku: 'CMP-XS' },
      { id: 'g002-s',  size: 'S',  color: 'Mármol Gris', colorHex: '#9E9E9E', stock: 8, sku: 'CMP-S'  },
      { id: 'g002-m',  size: 'M',  color: 'Mármol Gris', colorHex: '#9E9E9E', stock: 6, sku: 'CMP-M'  },
      { id: 'g002-l',  size: 'L',  color: 'Mármol Gris', colorHex: '#9E9E9E', stock: 2, sku: 'CMP-L'  },
    ],
  },
  {
    id: 'g003',
    name: 'Crop Top Mesh Dorado',
    slug: 'crop-top-mesh-dorado',
    description:
      'Crop top deportivo con detalle de malla dorado en lateral. Top de alto impacto con relleno removible.',
    price: 89000,
    category: 'gym',
    images: [IMG.gym2, IMG.gym3],
    isNew: true,
    isFeatured: false,
    isSale: false,
    rating: 4.5,
    reviewCount: 14,
    tags: ['top', 'gym', 'dorado'],
    measurements: [
      { size: 'XS', bustCm: 74, waistCm: 58, hipCm: 80, lengthCm: 42 },
      { size: 'S',  bustCm: 78, waistCm: 62, hipCm: 84, lengthCm: 43 },
      { size: 'M',  bustCm: 84, waistCm: 68, hipCm: 90, lengthCm: 44 },
    ],
    variants: [
      { id: 'g003-xs', size: 'XS', color: 'Negro/Dorado', colorHex: '#D4AF37', stock: 4, sku: 'CTM-XS' },
      { id: 'g003-s',  size: 'S',  color: 'Negro/Dorado', colorHex: '#D4AF37', stock: 6, sku: 'CTM-S'  },
      { id: 'g003-m',  size: 'M',  color: 'Negro/Dorado', colorHex: '#D4AF37', stock: 3, sku: 'CTM-M'  },
    ],
  },

  // ── NEW / NOVEDADES ──
  {
    id: 'n001',
    name: 'Conjunto Lino Crudo',
    slug: 'conjunto-lino-crudo',
    description:
      'Conjunto de blusa y pantalón palazzo en lino puro. Tonalidad cruda neutra, perfecta para el verano. Diseño minimalista de alto impacto.',
    price: 285000,
    category: 'new',
    images: [IMG.new1, IMG.new2],
    isNew: true,
    isFeatured: true,
    isSale: false,
    rating: 4.8,
    reviewCount: 3,
    tags: ['lino', 'conjunto', 'verano', 'minimalista'],
    measurements: [
      { size: 'S',  bustCm: 88, waistCm: 72, hipCm: 96,  lengthCm: 110 },
      { size: 'M',  bustCm: 92, waistCm: 76, hipCm: 100, lengthCm: 112 },
      { size: 'L',  bustCm: 98, waistCm: 82, hipCm: 106, lengthCm: 114 },
    ],
    variants: [
      { id: 'n001-s',  size: 'S',  color: 'Crudo', colorHex: '#F5DEB3', stock: 4, sku: 'CLC-S'  },
      { id: 'n001-m',  size: 'M',  color: 'Crudo', colorHex: '#F5DEB3', stock: 3, sku: 'CLC-M'  },
      { id: 'n001-l',  size: 'L',  color: 'Crudo', colorHex: '#F5DEB3', stock: 2, sku: 'CLC-L'  },
    ],
  },
  {
    id: 'n002',
    name: 'Blazer Oversize Camel',
    slug: 'blazer-oversize-camel',
    description:
      'Blazer oversize en tonalidad camel con botones dorados. Corte recto, bolsillos funcionales. Versátil y trendy.',
    price: 340000,
    category: 'new',
    images: [IMG.new3, IMG.new1],
    isNew: true,
    isFeatured: true,
    isSale: false,
    rating: 5.0,
    reviewCount: 2,
    tags: ['blazer', 'oversize', 'camel', 'tendencia'],
    measurements: [
      { size: 'S',  bustCm: 96, waistCm: 80, hipCm: 100, lengthCm: 74 },
      { size: 'M',  bustCm: 102, waistCm: 86, hipCm: 106, lengthCm: 76 },
      { size: 'L',  bustCm: 108, waistCm: 92, hipCm: 112, lengthCm: 77 },
    ],
    variants: [
      { id: 'n002-s', size: 'S', color: 'Camel', colorHex: '#C19A6B', stock: 3, sku: 'BOC-S' },
      { id: 'n002-m', size: 'M', color: 'Camel', colorHex: '#C19A6B', stock: 2, sku: 'BOC-M' },
      { id: 'n002-l', size: 'L', color: 'Camel', colorHex: '#C19A6B', stock: 1, sku: 'BOC-L' },
    ],
  },

  // ── CLIENTES / LOOKS ──
  {
    id: 'c001',
    name: 'Look "Noche de Asunción"',
    slug: 'look-noche-de-asuncion',
    description:
      'El look favorito de nuestras clientas para salidas nocturnas. Incluye vestido midi satén + accesorios. Curado por el equipo de La Regatería.',
    price: 520000,
    category: 'clientes',
    images: [IMG.social1, IMG.social2],
    isNew: false,
    isFeatured: true,
    isSale: false,
    rating: 4.9,
    reviewCount: 21,
    tags: ['look completo', 'noche', 'asuncion'],
    measurements: [
      { size: 'S',  bustCm: 84, waistCm: 66, hipCm: 92, lengthCm: 110 },
      { size: 'M',  bustCm: 88, waistCm: 70, hipCm: 96, lengthCm: 111 },
      { size: 'L',  bustCm: 94, waistCm: 76, hipCm: 102, lengthCm: 113 },
    ],
    variants: [
      { id: 'c001-s', size: 'S', color: 'Negro', colorHex: '#0A0A0A', stock: 3, sku: 'LNA-S' },
      { id: 'c001-m', size: 'M', color: 'Negro', colorHex: '#0A0A0A', stock: 4, sku: 'LNA-M' },
      { id: 'c001-l', size: 'L', color: 'Negro', colorHex: '#0A0A0A', stock: 2, sku: 'LNA-L' },
    ],
  },
  {
    id: 'c002',
    name: 'Look "Día de Verano"',
    slug: 'look-dia-de-verano',
    description:
      'Curado para el calor de Asunción. Vestido floral + sandalias planas. Fresco, cómodo y de moda. Ideal para el shopping o un almuerzo al aire libre.',
    price: 310000,
    category: 'clientes',
    images: [IMG.social3, IMG.social1],
    isNew: true,
    isFeatured: false,
    isSale: false,
    rating: 4.7,
    reviewCount: 15,
    tags: ['look completo', 'día', 'verano'],
    measurements: [
      { size: 'S',  bustCm: 88, waistCm: 72, hipCm: 96, lengthCm: 130 },
      { size: 'M',  bustCm: 92, waistCm: 76, hipCm: 100, lengthCm: 132 },
      { size: 'L',  bustCm: 98, waistCm: 82, hipCm: 106, lengthCm: 134 },
    ],
    variants: [
      { id: 'c002-s', size: 'S', color: 'Floral', colorHex: '#E8C766', stock: 5, sku: 'LDV-S' },
      { id: 'c002-m', size: 'M', color: 'Floral', colorHex: '#E8C766', stock: 6, sku: 'LDV-M' },
      { id: 'c002-l', size: 'L', color: 'Floral', colorHex: '#E8C766', stock: 3, sku: 'LDV-L' },
    ],
  },
];

// ─────────────────────────────────────────────
// CLIENTAS MOCK
// ─────────────────────────────────────────────
export const CUSTOMERS: Customer[] = [
  {
    id: 'cust001',
    name: 'Valentina Riquelme',
    email: 'vale.riquelme@gmail.com',
    phone: '+595 981 234 567',
    avatarUrl: IMG.avatar1,
    rank: 'oro',
    loyalty: {
      rank: 'oro',
      points: 3850,
      pointsToNextRank: 0,
      nextRank: null,
    },
    coupons: [
      {
        id: 'cup001',
        code: 'VIP15',
        description: '15% de descuento en toda la tienda',
        discountType: 'percent',
        discountValue: 15,
        expiresAt: '2025-12-31',
        isActive: true,
      },
      {
        id: 'cup002',
        code: 'ENVIO-FREE',
        description: 'Envío gratis en tu próxima compra',
        discountType: 'fixed',
        discountValue: 20000,
        expiresAt: '2025-10-31',
        isActive: true,
      },
    ],
    totalOrders: 12,
    totalSpent: 4250000,
    lastOrderDate: '2025-07-15',
    wishlist: ['v001', 'n002'],
  },
  {
    id: 'cust002',
    name: 'Camila Fernández',
    email: 'cami.fer@hotmail.com',
    phone: '+595 971 456 789',
    avatarUrl: IMG.avatar2,
    rank: 'plata',
    loyalty: {
      rank: 'plata',
      points: 1240,
      pointsToNextRank: 760,
      nextRank: 'oro',
    },
    coupons: [
      {
        id: 'cup003',
        code: 'BIENVENIDA10',
        description: '10% off en tu próxima compra',
        discountType: 'percent',
        discountValue: 10,
        expiresAt: '2025-09-30',
        isActive: true,
      },
    ],
    totalOrders: 5,
    totalSpent: 1850000,
    lastOrderDate: '2025-07-10',
    wishlist: ['g001', 'v002'],
  },
  {
    id: 'cust003',
    name: 'Lucía Martínez',
    email: 'lucia.m@outlook.com',
    phone: '+595 991 789 012',
    avatarUrl: IMG.avatar3,
    rank: 'bronce',
    loyalty: {
      rank: 'bronce',
      points: 320,
      pointsToNextRank: 680,
      nextRank: 'plata',
    },
    coupons: [],
    totalOrders: 2,
    totalSpent: 480000,
    lastOrderDate: '2025-06-28',
    wishlist: ['n001'],
  },
];

// Cliente mock activo (sesión simulada)
export const CURRENT_CUSTOMER = CUSTOMERS[0];

// ─────────────────────────────────────────────
// PEDIDOS MOCK
// ─────────────────────────────────────────────
export const ORDERS: Order[] = [
  {
    id: 'ord001',
    customerId: 'cust001',
    items: [
      { product: PRODUCTS[0], variant: PRODUCTS[0].variants[1], quantity: 1 },
    ],
    total: 320000,
    status: 'delivered',
    paymentMethod: 'whatsapp',
    createdAt: '2025-07-15T14:30:00Z',
    shippingZone: 'asuncion',
  },
  {
    id: 'ord002',
    customerId: 'cust001',
    items: [
      { product: PRODUCTS[4], variant: PRODUCTS[4].variants[1], quantity: 1 },
      { product: PRODUCTS[5], variant: PRODUCTS[5].variants[1], quantity: 1 },
    ],
    total: 330000,
    status: 'shipped',
    paymentMethod: 'transfer',
    createdAt: '2025-07-10T11:00:00Z',
    shippingZone: 'gran-asuncion',
  },
  {
    id: 'ord003',
    customerId: 'cust002',
    items: [
      { product: PRODUCTS[2], variant: PRODUCTS[2].variants[0], quantity: 2 },
    ],
    total: 370000,
    status: 'confirmed',
    paymentMethod: 'card',
    createdAt: '2025-07-10T09:15:00Z',
    shippingZone: 'retiro',
  },
];

// ─────────────────────────────────────────────
// KPIs MOCK (Dashboard Admin)
// ─────────────────────────────────────────────
export const KPIS: KPI[] = [
  { label: 'Ventas del día',    value: 'Gs. 2.450.000', change: 12.5, isPositive: true  },
  { label: 'Ticket promedio',   value: 'Gs. 312.000',   change: -3.2, isPositive: false },
  { label: 'Pedidos nuevos',    value: '8',             change: 33.3, isPositive: true  },
  { label: 'Clientas activas',  value: '124',           change: 8.1,  isPositive: true  },
];

// ─────────────────────────────────────────────
// ALERTAS DE STOCK
// ─────────────────────────────────────────────
export const STOCK_ALERTS: StockAlert[] = [
  { productId: 'v001', productName: 'Vestido Midi Satén Negro', variant: 'Negro / XL', currentStock: 0, threshold: 3 },
  { productId: 'v002', productName: 'Vestido Floral Boho',       variant: 'Floral Multi / L', currentStock: 1, threshold: 3 },
  { productId: 'v004', productName: 'Vestido Formal Asimétrico', variant: 'Dorado / M', currentStock: 0, threshold: 3 },
  { productId: 'n002', productName: 'Blazer Oversize Camel',     variant: 'Camel / L', currentStock: 1, threshold: 2 },
];

// ─────────────────────────────────────────────
// Drop / Venta Relámpago (fecha target)
// ─────────────────────────────────────────────
export const FLASH_SALE = {
  title: 'Liquidación de Temporada',
  subtitle: 'Hasta 40% OFF en prendas seleccionadas',
  targetDate: new Date(Date.now() + 2 * 60 * 60 * 1000 + 34 * 60 * 1000).toISOString(),
  discountPercent: 40,
};

// ─────────────────────────────────────────────
// Funciones de acceso (API-ready)
// ─────────────────────────────────────────────
export function getProducts() { return PRODUCTS; }

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export function getProductsByCategory(category: string) {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return PRODUCTS.filter((p) => p.isFeatured);
}

export function getNewProducts() {
  return PRODUCTS.filter((p) => p.isNew);
}

export function getSaleProducts() {
  return PRODUCTS.filter((p) => p.isSale);
}

export function getCustomers() { return CUSTOMERS; }

export function getCustomerById(id: string) {
  return CUSTOMERS.find((c) => c.id === id) ?? null;
}

export function getOrdersByCustomer(customerId: string) {
  return ORDERS.filter((o) => o.customerId === customerId);
}

export function getKPIs() { return KPIS; }
export function getStockAlerts() { return STOCK_ALERTS; }
export function getFlashSale() { return FLASH_SALE; }

export const BANK_INFO = {
  bank:    'Banco Continental',
  account: '120-9840123-4',
  ruc:     '80061234-5',
  alias:   'LAREGATERIA',
  holder:  'La Regatería S.A.',
};

export const WHATSAPP_NUMBER = '595981000000'; // número de demo
