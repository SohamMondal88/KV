"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Zap,
  BadgePercent,
  Mountain,
} from "lucide-react";

import { useCart, type BookingItem, type BookingItemType } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const typeLabels: Record<BookingItemType, string> = {
  package: "Package",
  hotel: "Hotel",
  homestay: "Homestay",
  taxi: "Taxi",
  guide: "Guide",
  trek: "Trek",
  activity: "Activity",
};

const typeBadgeVariant: Record<BookingItemType, "primary" | "secondary" | "accent" | "default" | "outline"> = {
  package: "primary",
  hotel: "secondary",
  homestay: "accent",
  taxi: "outline",
  guide: "default",
  trek: "primary",
  activity: "accent",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CartPage() {
  const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity } = useCart();
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  useEffect(() => {
    if (toast.visible) {
      const t = setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 2500);
      return () => clearTimeout(t);
    }
  }, [toast.visible]);

  const handleRemove = (item: BookingItem) => {
    removeFromCart(item.id);
    setToast({ message: `${item.name} removed from cart`, visible: true });
  };

  const discount = 0;
  const gst = cartTotal * 0.05;
  const total = cartTotal - discount + gst;

  return (
    <div className="min-h-full">
      {/* Toast */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed right-4 top-20 z-50 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground shadow-lg"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-8 sm:py-12">
        <Container>
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Your Cart
            </h1>
            {cartCount > 0 && (
              <Badge variant="accent" className="text-sm">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </Badge>
            )}
          </div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                Your cart is empty
              </h2>
              <p className="mb-8 max-w-md text-muted-foreground">
                Explore our destinations and curated packages to start planning
                your Himalayan adventure.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/packages">
                  <Button variant="primary">Browse Packages</Button>
                </Link>
                <Link href="/destinations">
                  <Button variant="outline">Browse Destinations</Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="lg:col-span-2 space-y-4"
              >
                {cartItems.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <CartItemCard
                      item={item}
                      onRemove={handleRemove}
                      onUpdateQuantity={updateQuantity}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <Card hoverLift={false} className="p-5">
                    <h2 className="mb-4 text-lg font-semibold text-foreground">
                      Order Summary
                    </h2>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span className="font-medium text-foreground">
                          {formatINR(cartTotal)}
                        </span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-success">
                          <span>Discount</span>
                          <span className="font-medium">
                            -{formatINR(discount)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between text-muted-foreground">
                        <span>Taxes (5% GST)</span>
                        <span className="font-medium text-foreground">
                          {formatINR(gst)}
                        </span>
                      </div>

                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between text-base font-bold text-foreground">
                          <span>Total</span>
                          <span>{formatINR(total)}</span>
                        </div>
                      </div>
                    </div>

                    <Link href="/checkout" className="mt-5 block">
                      <Button className="w-full" size="lg">
                        Proceed to Checkout
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>

                    <Link
                      href="/packages"
                      className="mt-3 block text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Continue Shopping
                    </Link>

                    {/* Trust badges */}
                    <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <span className="text-[11px] font-medium text-muted-foreground">
                          Secure Checkout
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <Zap className="h-5 w-5 text-primary" />
                        <span className="text-[11px] font-medium text-muted-foreground">
                          Instant Confirmation
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <BadgePercent className="h-5 w-5 text-primary" />
                        <span className="text-[11px] font-medium text-muted-foreground">
                          Free Cancellation
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Mobile sticky bottom summary bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="text-lg font-bold text-foreground">
                {formatINR(total)}
              </div>
            </div>
            <Link href="/checkout">
              <Button size="md" className="px-6">
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function CartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: BookingItem;
  onRemove: (item: BookingItem) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
}) {
  const subtotal = item.pricePerUnit * item.quantity;

  return (
    <Card hoverLift={false} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
      {/* Thumbnail */}
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 160px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Mountain className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground">{item.name}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant={typeBadgeVariant[item.type]}>
                {typeLabels[item.type]}
              </Badge>
            </div>
          </div>
          <button
            onClick={() => onRemove(item)}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>{item.location}</span>
          <span>{item.date}</span>
          <span>{item.guests} guest{item.guests > 1 ? "s" : ""}</span>
          {item.duration && <span>{item.duration}</span>}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Quantity Stepper */}
          <div className="inline-flex items-center rounded-lg border border-border bg-muted">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="inline-flex h-8 w-8 items-center justify-center text-sm font-medium text-foreground">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {formatINR(item.pricePerUnit)} × {item.quantity}
            </div>
            <div className="font-semibold text-foreground">
              {formatINR(subtotal)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
