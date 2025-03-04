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
    // Add item to the cart (increase quantity if item exists)
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already in cart
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }

      state.isCartOpen = true; // Open cart when adding item
    },

    // Remove item from the cart by ID
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // Clear all items in the cart
    clearCart: state => {
      state.items = [];
    },

    // Update quantity of an item in the cart
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);

      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity; // Set new quantity if valid
      }
    },

    // Toggle the visibility of the cart
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
