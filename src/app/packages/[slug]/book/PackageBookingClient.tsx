"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  BedDouble,
  MapPin,
  MessageSquare,
  ShoppingCart,
  CreditCard,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";

import { packages } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TrustBadges } from "@/components/booking/TrustBadges";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PackageBookingClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const pkg = useMemo(() => packages.find((p) => p.slug === slug), [slug]);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [travelers, setTravelers] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [requests, setRequests] = useState("");
  const [pickup, setPickup] = useState("");
  const [adding, setAdding] = useState(false);

  const dateError = useMemo(() => {
    if (!startDate || !endDate) return "";
    if (new Date(endDate) <= new Date(startDate))
      return "End date must be after start date";
    return "";
  }, [startDate, endDate]);

  const basePrice = pkg ? pkg.price * travelers : 0;
  const groupDiscount = travelers > 4 ? Math.round(basePrice * 0.1) : 0;
  const subtotal = basePrice - groupDiscount;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  const pricePerPerson = pkg ? pkg.price : 0;

  const canSubmit = !!pkg && !dateError && startDate && endDate;

  const handleAddToCart = useCallback(() => {
    if (!canSubmit || !pkg) return;
    setAdding(true);
    addToCart({
      type: "package",
      name: pkg.name,
      image: pkg.image,
      location: pkg.destinations.join(", "),
      date: `${startDate} to ${endDate}`,
      guests: travelers,
      pricePerUnit: total,
      quantity: 1,
      duration: pkg.duration,
      details: `${travelers} travelers, ${rooms} rooms`,
    });
    setTimeout(() => setAdding(false), 600);
  }, [canSubmit, pkg, addToCart, startDate, endDate, travelers, rooms, total]);

  const handleBookNow = useCallback(() => {
    if (!canSubmit || !pkg) return;
    addToCart({
      type: "package",
      name: pkg.name,
      image: pkg.image,
      location: pkg.destinations.join(", "),
      date: `${startDate} to ${endDate}`,
      guests: travelers,
      pricePerUnit: total,
      quantity: 1,
      duration: pkg.duration,
      details: `${travelers} travelers, ${rooms} rooms`,
    });
    router.push("/checkout");
  }, [canSubmit, pkg, addToCart, router, startDate, endDate, travelers, rooms, total]);

  if (!pkg) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-bold">Package not found</h1>
        <p className="mt-2 text-muted-foreground">
          The package you are looking for does not exist.
        </p>
        <Button className="mt-6" onClick={() => router.push("/packages")}>
          Browse Packages
        </Button>
      </Container>
    );
  }

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-56 sm:h-72">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <Container className="relative z-10 pb-6 sm:pb-8">
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.push("/packages")}
                className="mb-3 inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Packages
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="accent" className="mb-2">
                  {pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
                </Badge>
                <h1 className="text-2xl font-bold text-white sm:text-4xl">
                  {pkg.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/80">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {pkg.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {pkg.destinations.join(", ")}
                  </span>
                </div>
              </motion.div>
            </Container>
          </div>
        </div>
      </section>

      {/* Content */}
      <Container className="py-8 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left: Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1"
          >
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
              <h2 className="text-lg font-semibold">Booking Details</h2>
              <p className="text-sm text-muted-foreground">
                Fill in your travel preferences below.
              </p>

              <div className="mt-6 space-y-5">
                {/* Dates */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Start Date
                    </label>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="date"
                        min={today}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      End Date
                    </label>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="date"
                        min={startDate}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    {dateError && (
                      <p className="mt-1.5 text-xs text-danger">{dateError}</p>
                    )}
                  </div>
                </div>

                {/* Travelers */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Number of Travelers
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:bg-muted/80"
                      aria-label="Decrease travelers"
                    >
                      −
                    </button>
                    <div className="flex min-w-[3rem] items-center justify-center gap-2 text-base font-semibold text-foreground">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {travelers}
                    </div>
                    <button
                      type="button"
                      onClick={() => setTravelers((t) => Math.min(20, t + 1))}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:bg-muted/80"
                      aria-label="Increase travelers"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Number of Rooms
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setRooms((r) => Math.max(1, r - 1))}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:bg-muted/80"
                      aria-label="Decrease rooms"
                    >
                      −
                    </button>
                    <div className="flex min-w-[3rem] items-center justify-center gap-2 text-base font-semibold text-foreground">
                      <BedDouble className="h-4 w-4 text-muted-foreground" />
                      {rooms}
                    </div>
                    <button
                      type="button"
                      onClick={() => setRooms((r) => Math.min(5, r + 1))}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:bg-muted/80"
                      aria-label="Increase rooms"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pickup */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="e.g. NJP Railway Station, Bagdogra Airport"
                      className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {/* Requests */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Special Requests
                  </label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      placeholder="Dietary preferences, accessibility needs, surprises..."
                      rows={3}
                      className="w-full resize-y rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button
                    variant="outline"
                    className="flex-1"
                    disabled={!canSubmit || adding}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {adding ? "Added!" : "Add to Cart"}
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!canSubmit}
                    onClick={handleBookNow}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </div>

                {!canSubmit && (
                  <p className="text-xs text-muted-foreground">
                    Please select valid dates to proceed.
                  </p>
                )}
              </div>
            </div>

            <TrustBadges />
          </motion.div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full shrink-0 lg:w-96 xl:w-[26rem]"
          >
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="relative h-40 w-full">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-base font-semibold">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {pkg.duration} · {pkg.destinations.join(", ")}
                  </p>

                  <div className="mt-5 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Price per person
                      </span>
                      <span className="font-medium text-foreground">
                        {formatINR(pricePerPerson)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Travelers ({travelers})
                      </span>
                      <span className="font-medium text-foreground">
                        {formatINR(basePrice)}
                      </span>
                    </div>
                    {groupDiscount > 0 && (
                      <div className="flex items-center justify-between text-success">
                        <span className="inline-flex items-center gap-1">
                          Group discount (10%)
                        </span>
                        <span className="font-medium">
                          − {formatINR(groupDiscount)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">GST (5%)</span>
                      <span className="font-medium text-foreground">
                        {formatINR(gst)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-base font-semibold text-foreground">
                        Total
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {formatINR(total)}
                      </span>
                    </div>
                  </div>

                  {groupDiscount > 0 && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      You saved {formatINR(groupDiscount + Math.round((basePrice - groupDiscount) * 0.05))}
                    </div>
                  )}

                  {/* Inclusions */}
                  {pkg.inclusions.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-sm font-semibold text-foreground">
                        Inclusions
                      </h4>
                      <ul className="mt-2 space-y-1.5">
                        {pkg.inclusions.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Exclusions */}
                  {pkg.exclusions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-foreground">
                        Exclusions
                      </h4>
                      <ul className="mt-2 space-y-1.5">
                        {pkg.exclusions.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Need help */}
                  <div className="mt-6 rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      Need help?
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5" />
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" />
                        <span>support@kubovista.travel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
