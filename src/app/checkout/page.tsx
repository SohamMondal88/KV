"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  CalendarDays,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Mountain,
  ShieldCheck,
  Zap,
  BadgePercent,
  AlertCircle,
} from "lucide-react";

import { useCart, type BookingItem } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const steps = [
  { id: 1, label: "Contact", icon: User },
  { id: 2, label: "Trip Details", icon: CalendarDays },
  { id: 3, label: "Payment", icon: CreditCard },
];

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart, createBooking } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saveDetails, setSaveDetails] = useState(false);

  const [tripDetails, setTripDetails] = useState<
    Record<string, { date: string; specialRequests: string; pickup: string }>
  >({});

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if cart empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems.length, router]);

  // Initialize trip details from cart items
  useEffect(() => {
    const init: typeof tripDetails = {};
    cartItems.forEach((item) => {
      init[item.id] = {
        date: item.date || "",
        specialRequests: "",
        pickup: "",
      };
    });
    setTripDetails(init);
  }, [cartItems]);

  // Load saved details
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("kv-contact");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setName(parsed.name || "");
        setEmail(parsed.email || "");
        setPhone(parsed.phone || "");
      } catch {
        /* ignore */
      }
    }
  }, []);

  const gst = cartTotal * 0.05;
  const total = cartTotal + gst;

  const validateStep1 = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email";
    }
    if (!phone.trim()) {
      errs.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      errs.phone = "Please enter a valid 10-digit phone number";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [name, email, phone]);

  const validateStep2 = useCallback(() => {
    const errs: Record<string, string> = {};
    cartItems.forEach((item, idx) => {
      const d = tripDetails[item.id]?.date;
      if (!d || !d.trim()) {
        errs[`date_${idx}`] = "Travel date is required";
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [cartItems, tripDetails]);

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (saveDetails && typeof window !== "undefined") {
      localStorage.setItem("kv-contact", JSON.stringify({ name, email, phone }));
    }
    setStep((s) => Math.min(s + 1, 3));
    setErrors({});
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    setErrors({});
  };

  const handlePayment = async () => {
    if (step !== 3) return;
    setLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    const orderData = {
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const options = {
      key: "rzp_test_YourTestKeyHere",
      amount: orderData.amount,
      currency: orderData.currency,
      name: "KuboVista",
      description: "Travel Booking",
      image: "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=200&auto=format&fit=crop",
      order_id: `order_${Date.now()}`,
      handler: function (response: any) {
        const booking = createBooking(
          { name, email, phone },
          response.razorpay_payment_id
        );
        if (booking) {
          router.push(`/booking-confirmation?id=${booking.id}`);
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#0B5D3B",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="min-h-full">
      <section className="py-8 sm:py-12">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/cart"
              className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Checkout
            </h1>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isDone = step > s.id;
                const isLast = idx === steps.length - 1;

                return (
                  <React.Fragment key={s.id}>
                    <button
                      onClick={() => {
                        if (isDone) setStep(s.id);
                      }}
                      className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isDone
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      } ${isDone ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                          isActive
                            ? "bg-primary-foreground text-primary"
                            : isDone
                            ? "bg-primary text-primary-foreground"
                            : "bg-border text-muted-foreground"
                        }`}
                      >
                        {isDone ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          s.id
                        )}
                      </span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                    {!isLast && (
                      <div className="hidden h-px w-6 bg-border sm:block" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card hoverLift={false} className="p-5 sm:p-6">
                      <h2 className="mb-5 text-lg font-semibold text-foreground">
                        Contact Information
                      </h2>

                      <div className="space-y-4">
                        <FormField
                          label="Full Name"
                          error={errors.name}
                          required
                        >
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                            }}
                            placeholder="John Doe"
                            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </FormField>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormField
                            label="Email"
                            error={errors.email}
                            required
                          >
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email)
                                  setErrors((p) => ({ ...p, email: "" }));
                              }}
                              placeholder="john@example.com"
                              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                          </FormField>

                          <FormField
                            label="Phone"
                            error={errors.phone}
                            required
                          >
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                                if (errors.phone)
                                  setErrors((p) => ({ ...p, phone: "" }));
                              }}
                              placeholder="9876543210"
                              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                          </FormField>
                        </div>

                        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                          <input
                            type="checkbox"
                            checked={saveDetails}
                            onChange={(e) => setSaveDetails(e.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          />
                          Save details for next time
                        </label>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button onClick={nextStep}>
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card hoverLift={false} className="p-5 sm:p-6">
                      <h2 className="mb-5 text-lg font-semibold text-foreground">
                        Trip Details
                      </h2>

                      <div className="space-y-6">
                        {cartItems.map((item, idx) => (
                          <TripDetailForm
                            key={item.id}
                            item={item}
                            idx={idx}
                            value={tripDetails[item.id] || { date: "", specialRequests: "", pickup: "" }}
                            onChange={(val) =>
                              setTripDetails((prev) => ({
                                ...prev,
                                [item.id]: val,
                              }))
                            }
                            errorDate={errors[`date_${idx}`]}
                            onClearError={() =>
                              setErrors((p) => ({ ...p, [`date_${idx}`]: "" }))
                            }
                          />
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-3">
                        <Button variant="outline" onClick={prevStep}>
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </Button>
                        <Button onClick={nextStep}>
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card hoverLift={false} className="p-5 sm:p-6">
                      <h2 className="mb-5 text-lg font-semibold text-foreground">
                        Payment
                      </h2>

                      <div className="mb-6 rounded-lg border border-border bg-muted p-4">
                        <h3 className="mb-3 text-sm font-medium text-foreground">
                          Razorpay Secure Checkout
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            <span>PCI DSS Compliant</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Zap className="h-4 w-4 text-primary" />
                            <span>Instant Payment</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Payable Amount</span>
                          <span className="font-semibold text-foreground">
                            {formatINR(total)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment Method</span>
                          <span>Razorpay (UPI / Card / Net Banking)</span>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-3">
                        <Button variant="outline" onClick={prevStep}>
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          onClick={handlePayment}
                          loading={loading}
                          size="lg"
                        >
                          Pay {formatINR(total)}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <Card hoverLift={false} className="p-5">
                  <h2 className="mb-4 text-base font-semibold text-foreground">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              <Mountain className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} × {formatINR(item.pricePerUnit)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="font-medium text-foreground">
                        {formatINR(cartTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>GST (5%)</span>
                      <span className="font-medium text-foreground">
                        {formatINR(gst)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-foreground">
                      <span>Total</span>
                      <span>{formatINR(total)}</span>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-medium text-muted-foreground">
                        Secure
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-medium text-muted-foreground">
                        Instant
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <BadgePercent className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-medium text-muted-foreground">
                        Free Cancel
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
      {children}
      {error && (
        <div className="mt-1 flex items-center gap-1 text-xs text-danger">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      )}
    </div>
  );
}

function TripDetailForm({
  item,
  idx,
  value,
  onChange,
  errorDate,
  onClearError,
}: {
  item: BookingItem;
  idx: number;
  value: { date: string; specialRequests: string; pickup: string };
  onChange: (v: { date: string; specialRequests: string; pickup: string }) => void;
  errorDate?: string;
  onClearError: () => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Mountain className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            {item.location} · {item.guests} guest{item.guests > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <FormField
          label="Travel Date"
          error={errorDate}
          required
        >
          <input
            type="date"
            value={value.date}
            onChange={(e) => {
              onChange({ ...value, date: e.target.value });
              onClearError();
            }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </FormField>

        <FormField label="Pickup Location (if applicable)">
          <input
            type="text"
            value={value.pickup}
            onChange={(e) => onChange({ ...value, pickup: e.target.value })}
            placeholder="e.g. NJP Railway Station"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </FormField>

        <FormField label="Special Requests">
          <textarea
            value={value.specialRequests}
            onChange={(e) =>
              onChange({ ...value, specialRequests: e.target.value })
            }
            placeholder="Any dietary requirements, accessibility needs, etc."
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </FormField>
      </div>
    </div>
  );
}
