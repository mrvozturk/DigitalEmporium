import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Variant, Sku } from '@/lib/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: Variant;
  sku?: Sku;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isCartOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; variant?: Variant; sku?: Sku }>
    ) => {
      const { product, variant, sku } = action.payload;

      const existingItem = state.items.find(
        item =>
          item.product?.id === product.id &&
          item.variant?.id === variant?.id &&
          item.sku?.id === sku?.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product,
          variant,
          sku,
          quantity: 1
        });
      }

      state.isCartOpen = true;
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: number;
        variantId?: number;
        skuId?: number;
      }>
    ) => {
      state.items = state.items.filter(
        item =>
          !(
            item.product.id === action.payload.productId &&
            (action.payload.variantId === undefined || item.variant?.id === action.payload.variantId) &&
            (action.payload.skuId === undefined || item.sku?.id === action.payload.skuId)
          )
      );
    },

    clearCart: state => {
      state.items = [];
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        variantId?: number;
        skuId?: number;
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        item =>
          item.product.id === action.payload.productId &&
          (action.payload.variantId === undefined || item.variant?.id === action.payload.variantId) &&
          (action.payload.skuId === undefined || item.sku?.id === action.payload.skuId)
      );

      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },

    toggleCart: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  toggleCart
} = cartSlice.actions;

export default cartSlice.reducer;
