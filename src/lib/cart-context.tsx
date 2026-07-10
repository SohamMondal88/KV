"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type BookingItemType =
  | "package"
  | "hotel"
  | "homestay"
  | "taxi"
  | "guide"
  | "trek"
  | "activity";

export interface BookingItem {
  id: string;
  type: BookingItemType;
  name: string;
  image: string;
  location: string;
  date: string;
  guests: number;
  pricePerUnit: number;
  quantity: number;
  duration?: string;
  details?: string;
  addedAt: string;
}

export interface Booking {
  id: string;
  items: BookingItem[];
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  paymentMethod?: string;
  paymentId?: string;
}

interface CartContextType {
  cartItems: BookingItem[];
  bookings: Booking[];
  addToCart: (item: Omit<BookingItem, "id" | "addedAt">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  createBooking: (customerInfo: { name: string; email: string; phone: string }, paymentId?: string) => Booking | null;
  cancelBooking: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<BookingItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("kv-cart");
    const savedBookings = localStorage.getItem("kv-bookings");
    if (savedCart) {
      try { setCartItems(JSON.parse(savedCart)); } catch { /* ignore */ }
    }
    if (savedBookings) {
      try { setBookings(JSON.parse(savedBookings)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kv-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("kv-bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addToCart = useCallback((item: Omit<BookingItem, "id" | "addedAt">) => {
    const newItem: BookingItem = {
      ...item,
      id: `${item.type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      addedAt: new Date().toISOString(),
    };
    setCartItems((prev) => [...prev, newItem]);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const createBooking = useCallback(
    (customerInfo: { name: string; email: string; phone: string }, paymentId?: string): Booking | null => {
      if (cartItems.length === 0) return null;
      const booking: Booking = {
        id: `BK-${Date.now()}`,
        items: [...cartItems],
        status: paymentId ? "confirmed" : "pending",
        totalAmount: cartTotal,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        bookingDate: new Date().toISOString(),
        paymentMethod: paymentId ? "Razorpay" : undefined,
        paymentId,
      };
      setBookings((prev) => [booking, ...prev]);
      clearCart();
      return booking;
    },
    [cartItems, cartTotal, clearCart]
  );

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
    );
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        bookings,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        createBooking,
        cancelBooking,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
