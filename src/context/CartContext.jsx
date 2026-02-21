import React, { createContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addToCart(product, quantity = 1) {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
        return copy;
      }
      return [...prev, { ...product, quantity }];
    });
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  function getItemCount() {
    return items.reduce((s, it) => s + (it.quantity || 0), 0);
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, getItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
