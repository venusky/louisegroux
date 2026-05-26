"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Charger le panier depuis localStorage lors du montage
  useEffect(() => {
    const storedCart = localStorage.getItem("louise-groux-cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Erreur lors de la lecture du panier local :", error);
      }
    }
  }, []);

  // Persister le panier dans localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("louise-groux-cart", JSON.stringify(newCart));
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const existingItem = cart.find((i) => i.id === item.id);
    let newCart: CartItem[];

    if (existingItem) {
      newCart = cart.map((i) =>
        i.id === item.id
          ? { ...i, quantity: Math.min(i.stock, i.quantity + 1) }
          : i
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    saveCart(newCart);
    setIsOpen(true); // Ouvrir automatiquement le Drawer au moment de l'ajout
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter((i) => i.id !== id);
    saveCart(newCart);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const newCart = cart.map((i) =>
      i.id === id ? { ...i, quantity: Math.min(i.stock, quantity) } : i
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const toggleCart = () => setIsOpen((prev) => !prev);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
}
