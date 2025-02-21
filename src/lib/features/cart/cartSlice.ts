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
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );
      existingItem
        ? existingItem.quantity++
        : state.items.push({ ...action.payload, quantity: 1 });
      state.isCartOpen = true;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0)
        item.quantity = action.payload.quantity;
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
