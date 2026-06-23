import { createSlice } from "@reduxjs/toolkit";

function loadCartFromSession() {
  if (typeof window === "undefined") return [];

  try {
    const raw = sessionStorage.getItem("cartItems");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCartToSession(items) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("cartItems", JSON.stringify(items));
}

function clearCartFromSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem("cartItems");
}

const initialState = {
  items: loadCartFromSession(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      saveCartToSession(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      saveCartToSession(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((x) => x.id === id);
      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((x) => x.id !== id);
      } else {
        item.quantity = quantity;
      }

      saveCartToSession(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      clearCartFromSession();
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;