import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'The Cabaret 3 Person 41 Jet Hot Tub',
      desc: '220 V/50 AMP – 4.5KW Heater 110 V/15 AMP – 1KW Heater!',
      price: 1979,
      qty: 1,
      img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=80&h=60&fit=crop',
    },
  ]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
