import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { FitFinderInput, FitFinderResult, LoyaltyRank, SizeMeasurement } from '@/types';

// ─────────────────────────────────────────────
// Tailwind class merger
// ─────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─────────────────────────────────────────────
// Formateo de precios en Guaraníes
// ─────────────────────────────────────────────
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceShort(amount: number): string {
  if (amount >= 1_000_000) {
    return `Gs. ${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `Gs. ${(amount / 1_000).toFixed(0)}k`;
  }
  return `Gs. ${amount.toLocaleString('es-PY')}`;
}

export function discountPercent(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

// ─────────────────────────────────────────────
// FitFinder — Lógica de recomendación
// ─────────────────────────────────────────────
const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export function calcFitRecommendation(
  input: FitFinderInput,
  measurements: SizeMeasurement[]
): FitFinderResult {
  if (!measurements.length) {
    return { recommendedSize: input.usualSize, confidence: 70, notes: 'Basado en tu talle habitual.' };
  }

  const sizeIndex = SIZE_ORDER.indexOf(input.usualSize);

  // Ajuste por calce preferido
  let adjustedIndex = sizeIndex;
  if (input.fitPreference === 'ajustado') adjustedIndex = Math.max(0, sizeIndex - 1);
  if (input.fitPreference === 'suelto') adjustedIndex = Math.min(SIZE_ORDER.length - 1, sizeIndex + 1);

  // Ajuste por altura
  const heightAdjust = input.heightCm < 158 ? -1 : input.heightCm > 172 ? 0 : 0;
  adjustedIndex = Math.max(0, adjustedIndex + heightAdjust);

  // Buscar talle disponible en medidas
  const availableSizes = measurements.map((m) => m.size);
  let recommended = SIZE_ORDER[adjustedIndex];

  // Si el talle ajustado no existe en las medidas, buscar el más cercano
  if (!availableSizes.includes(recommended)) {
    // Buscar el más cercano disponible
    for (let delta = 1; delta <= 3; delta++) {
      const up = SIZE_ORDER[adjustedIndex + delta];
      const down = SIZE_ORDER[adjustedIndex - delta];
      if (up && availableSizes.includes(up)) { recommended = up; break; }
      if (down && availableSizes.includes(down)) { recommended = down; break; }
    }
  }

  // Calcular confianza
  let confidence = 85;
  if (input.fitPreference !== 'estandar') confidence -= 5;
  if (input.heightCm < 155 || input.heightCm > 178) confidence -= 5;
  if (recommended !== SIZE_ORDER[sizeIndex]) confidence -= 3;
  confidence = Math.min(97, Math.max(65, confidence));

  // Notas
  const notes = input.fitPreference === 'ajustado'
    ? 'Ajustado al cuerpo, resalta la silueta.'
    : input.fitPreference === 'suelto'
    ? 'Corte cómodo con amplitud extra.'
    : 'Corte estándar, fiel a la tabla de talles.';

  return { recommendedSize: recommended, confidence, notes };
}

// ─────────────────────────────────────────────
// Loyalty helpers
// ─────────────────────────────────────────────
export const RANK_THRESHOLDS: Record<LoyaltyRank, number> = {
  bronce: 0,
  plata:  1000,
  oro:    2000,
};

export const RANK_LABELS: Record<LoyaltyRank, string> = {
  bronce: 'Bronce',
  plata:  'Plata',
  oro:    'Oro',
};

export const RANK_COLORS: Record<LoyaltyRank, string> = {
  bronce: '#CD7F32',
  plata:  '#C0C0C0',
  oro:    '#D4AF37',
};

export function rankProgressPercent(points: number, rank: LoyaltyRank): number {
  if (rank === 'oro') return 100;
  const thresholds: Record<LoyaltyRank, [number, number]> = {
    bronce: [0, RANK_THRESHOLDS.plata],
    plata:  [RANK_THRESHOLDS.plata, RANK_THRESHOLDS.oro],
    oro:    [RANK_THRESHOLDS.oro, RANK_THRESHOLDS.oro],
  };
  const [min, max] = thresholds[rank];
  return Math.round(((points - min) / (max - min)) * 100);
}

// ─────────────────────────────────────────────
// Formato de fechas
// ─────────────────────────────────────────────
export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('es-PY', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).format(new Date(dateStr));
}

// ─────────────────────────────────────────────
// Stock helpers
// ─────────────────────────────────────────────
export function stockLabel(stock: number): { label: string; level: 'out' | 'low' | 'ok' } {
  if (stock === 0) return { label: 'Sin stock', level: 'out' };
  if (stock <= 3) return { label: `¡Quedan ${stock}!`, level: 'low' };
  return { label: `${stock} disponibles`, level: 'ok' };
}

// ─────────────────────────────────────────────
// WhatsApp message builder
// ─────────────────────────────────────────────
export function buildWhatsAppMessage(
  items: { name: string; size: string; color: string; price: number; qty: number }[],
  subtotal: number,
  shipping: number,
  shippingLabel: string
): string {
  const lines = items.map(
    (i) => `• ${i.name} (${i.size} / ${i.color}) x${i.qty} — Gs. ${i.price.toLocaleString('es-PY')}`
  );
  return [
    '🛍️ *Pedido La regalería*',
    '',
    ...lines,
    '',
    `📦 Envío (${shippingLabel}): Gs. ${shipping.toLocaleString('es-PY')}`,
    `💳 *Total: Gs. ${(subtotal + shipping).toLocaleString('es-PY')}*`,
    '',
    '¿Me pueden confirmar disponibilidad y coordinar el pago? ¡Gracias! 🙏',
  ].join('\n');
}

// ─────────────────────────────────────────────
// Countdown helpers
// ─────────────────────────────────────────────
export function getTimeRemaining(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, total: 0 };
  const total = diff;
  const hours   = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, total };
}

// ─────────────────────────────────────────────
// Generate unique ID
// ─────────────────────────────────────────────
export function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}
