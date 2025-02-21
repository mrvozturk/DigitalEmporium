import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  src: string;
  title: string;
  price: string;
  quantity: number;
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
    /** Ürünü sepete ekleme */
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.isCartOpen = true;
    },

    /** Ürünü sepetten çıkarma */
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    /** Sepeti tamamen boşaltma */
    clearCart: state => {
      state.items = [];
    },

    /** Ürün miktarını güncelleme */
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },

    /** Ürün miktarını azaltma */
    reduceQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    /** Sepet pop-up aç/kapat */
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
  reduceQuantity,
  toggleCart
} = cartSlice.actions;
export default cartSlice.reducer;
