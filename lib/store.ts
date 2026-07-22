import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant, ShippingZone, PaymentMethod, UIState } from '@/types';

// ─────────────────────────────────────────────
// Cart Store
// ─────────────────────────────────────────────
interface CartStore {
  items: CartItem[];
  shippingZone: ShippingZone | null;

  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  setShippingZone: (zone: ShippingZone) => void;

  // Computed
  itemCount: () => number;
  subtotal: () => number;
  shippingCost: () => number;
  total: () => number;
}

import { SHIPPING_COSTS } from '@/types';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      shippingZone: null,

      addItem: (product, variant, quantity = 1) => {
        const existing = get().items.find((i) => i.variant.id === variant.id);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.variant.id === variant.id
                ? { ...i, quantity: Math.min(i.quantity + quantity, variant.stock) }
                : i
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { product, variant, quantity }],
          }));
        }
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.variant.id !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variant.id === variantId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], shippingZone: null }),

      setShippingZone: (zone) => set({ shippingZone: zone }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      shippingCost: () => {
        const zone = get().shippingZone;
        return zone ? SHIPPING_COSTS[zone] : 0;
      },

      total: () => get().subtotal() + get().shippingCost(),
    }),
    { name: 'la-regaleria-cart' }
  )
);

// ─────────────────────────────────────────────
// UI Store (drawers, modales, estados)
// ─────────────────────────────────────────────
interface UIStore extends UIState {
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  openFitFinder: (productId: string) => void;
  closeFitFinder: () => void;

  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  setCheckoutStep: (step: UIState['checkoutStep']) => void;
  setPaymentMethod: (method: PaymentMethod) => void;

  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      cartOpen: false,
      fitFinderOpen: false,
      selectedProductId: null,
      mobileMenuOpen: false,
      checkoutStep: 'cart',
      paymentMethod: null,
      theme: 'dark',

      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),
      toggleCart: () => set((s) => ({ cartOpen: !s.cartOpen })),

      openFitFinder: (productId) => set({ fitFinderOpen: true, selectedProductId: productId }),
      closeFitFinder: () => set({ fitFinderOpen: false, selectedProductId: null }),

      toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
      closeMobileMenu: () => set({ mobileMenuOpen: false }),

      setCheckoutStep: (step) => set({ checkoutStep: step }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),

      toggleTheme: () => {
        const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', nextTheme);
        }
        set({ theme: nextTheme });
      },

      setTheme: (theme) => {
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
        }
        set({ theme });
      },
    }),
    {
      name: 'la-regaleria-ui',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

// ─────────────────────────────────────────────
// Notify me store (wishlist de stock)
// ─────────────────────────────────────────────
interface NotifyStore {
  notifyList: { productId: string; variantId: string }[];
  addNotify: (productId: string, variantId: string) => void;
  hasNotify: (variantId: string) => boolean;
}

export const useNotifyStore = create<NotifyStore>()(
  persist(
    (set, get) => ({
      notifyList: [],
      addNotify: (productId, variantId) => {
        const exists = get().notifyList.some((n) => n.variantId === variantId);
        if (!exists) {
          set((s) => ({
            notifyList: [...s.notifyList, { productId, variantId }],
          }));
        }
      },
      hasNotify: (variantId) =>
        get().notifyList.some((n) => n.variantId === variantId),
    }),
    { name: 'la-regaleria-notify' }
  )
);
