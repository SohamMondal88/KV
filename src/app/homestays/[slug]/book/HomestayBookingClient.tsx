"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  BedDouble,
  MessageSquare,
  ShoppingCart,
  CreditCard,
  CheckCircle2,
  Phone,
  Mail,
  HelpCircle,
  ArrowLeft,
  HeartHandshake,
} from "lucide-react";

import { homestays } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { TrustBadges } from "@/components/booking/TrustBadges";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const ms = new Date(b).getTime() - new Date(a).getTime();
  const n = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Math.max(0, n);
}

const mealOptions = [
  { key: "breakfast", label: "Breakfast only", cost: 150 },
  { key: "half", label: "Half board", cost: 400 },
  { key: "full", label: "Full board", cost: 700 },
];

export default function HomestayBookingClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const homestay = useMemo(() => homestays.find((h) => h.slug === slug), [slug]);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(today);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [meal, setMeal] = useState<"breakfast" | "half" | "full">("breakfast");
  const [requests, setRequests] = useState("");
  const [adding, setAdding] = useState(false);

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);

  const dateError = useMemo(() => {
    if (!checkIn || !checkOut) return "";
    if (new Date(checkOut) <= new Date(checkIn))
      return "Check-out must be after check-in";
    return "";
  }, [checkIn, checkOut]);

  const mealCostPerPersonPerDay = useMemo(
    () => mealOptions.find((m) => m.key === meal)?.cost || 0,
    [meal]
  );

  const roomTotal = (homestay?.pricePerNight || 0) * nights * rooms;
  const mealTotal = mealCostPerPersonPerDay * guests * nights;
  const subtotal = roomTotal + mealTotal;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const canSubmit =
    !!homestay && !dateError && nights > 0 && guests <= homestay.maxGuests;

  const handleAddToCart = useCallback(() => {
    if (!canSubmit || !homestay) return;
    setAdding(true);
    addToCart({
      type: "homestay",
      name: homestay.name,
      image: homestay.image,
      location: homestay.location,
      date: `${checkIn} to ${checkOut}`,
      guests,
      pricePerUnit: total,
      quantity: 1,
      duration: `${nights} night${nights > 1 ? "s" : ""}`,
      details: `${rooms} room${rooms > 1 ? "s" : ""}, ${
        mealOptions.find((m) => m.key === meal)?.label
      }`,
    });
    setTimeout(() => setAdding(false), 600);
  }, [
    canSubmit,
    homestay,
    addToCart,
    checkIn,
    checkOut,
    guests,
    rooms,
    meal,
    total,
    nights,
  ]);

  const handleBookNow = useCallback(() => {
    if (!canSubmit || !homestay) return;
    addToCart({
      type: "homestay",
      name: homestay.name,
      image: homestay.image,
      location: homestay.location,
      date: `${checkIn} to ${checkOut}`,
      guests,
      pricePerUnit: total,
      quantity: 1,
      duration: `${nights} night${nights > 1 ? "s" : ""}`,
      details: `${rooms} room${rooms > 1 ? "s" : ""}, ${
        mealOptions.find((m) => m.key === meal)?.label
      }`,
    });
    router.push("/checkout");
  }, [
    canSubmit,
    homestay,
    addToCart,
    router,
    checkIn,
    checkOut,
    guests,
    rooms,
    meal,
    total,
    nights,
  ]);

  if (!homestay) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-bold">Homestay not found</h1>
        <p className="mt-2 text-muted-foreground">
          The homestay you are looking for does not exist.
        </p>
        <Button className="mt-6" onClick={() => router.push("/homestays")}>
          Browse Homestays
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
            src={homestay.image}
            alt={homestay.name}
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
                onClick={() => router.push("/homestays")}
                className="mb-3 inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Homestays
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="accent" className="mb-2">
                  Homestay
                </Badge>
                <h1 className="text-2xl font-bold text-white sm:text-4xl">
                  {homestay.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/80">
                  <span className="inline-flex items-center gap-1">
                    <BedDouble className="h-4 w-4" />
                    {homestay.bedrooms} bedroom{homestay.bedrooms > 1 ? "s" : ""}
                  </span>
                  <span>·</span>
                  <span>{homestay.location}</span>
                </div>
              </motion.div>
            </Container>
          </div>
        </div>
      </section>

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
                Plan your authentic stay.
              </p>

              <div className="mt-6 space-y-5">
                {/* Dates */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="date"
                        min={today}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="date"
                        min={checkIn}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    {dateError && (
                      <p className="mt-1.5 text-xs text-danger">{dateError}</p>
                    )}
                  </div>
                </div>

                {/* Guests + Rooms */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:bg-muted/80"
                        aria-label="Decrease guests"
                      >
                        −
                      </button>
                      <div className="flex min-w-[3rem] items-center justify-center gap-2 text-base font-semibold text-foreground">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {guests}
                      </div>
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.min(homestay.maxGuests, g + 1))}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:bg-muted/80"
                        aria-label="Increase guests"
                      >
                        +
                      </button>
                    </div>
                    {guests > homestay.maxGuests && (
                      <p className="mt-1.5 text-xs text-danger">
                        Max {homestay.maxGuests} guests allowed.
                      </p>
                    )}
                  </div>
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
                </div>

                {/* Meal Preference */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Meal Preference
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {mealOptions.map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => setMeal(m.key as typeof meal)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          meal === m.key
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {m.label} (₹{m.cost}/person/day)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Special Requests
                  </label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      placeholder="Dietary needs, celebration setup, preferred room..."
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
                    Please select valid dates with at least 1 night and stay within guest limit.
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
                    src={homestay.image}
                    alt={homestay.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-base font-semibold">{homestay.name}</h3>
                  <div className="mt-2">
                    <StarRating rating={homestay.rating} size={16} showValue />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {homestay.location} · Hosted by {homestay.hostName}
                  </p>

                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
                    <HeartHandshake className="h-4 w-4 shrink-0" />
                    <span className="font-medium">
                      Experience authentic local hospitality
                    </span>
                  </div>

                  <div className="mt-5 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Price per night</span>
                      <span className="font-medium text-foreground">
                        {formatINR(homestay.pricePerNight)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Stay ({nights} night{nights > 1 ? "s" : ""} × {rooms} room{rooms > 1 ? "s" : ""})
                      </span>
                      <span className="font-medium text-foreground">
                        {formatINR(roomTotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {mealOptions.find((m) => m.key === meal)?.label}
                      </span>
                      <span className="font-medium text-foreground">
                        {formatINR(mealTotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">GST (5%)</span>
                      <span className="font-medium text-foreground">
                        {formatINR(gst)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-base font-semibold text-foreground">Total</span>
                      <span className="text-lg font-bold text-primary">
                        {formatINR(total)}
                      </span>
                    </div>
                  </div>

                  {/* Amenities */}
                  {homestay.amenities.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-sm font-semibold text-foreground">
                        Amenities
                      </h4>
                      <ul className="mt-2 grid grid-cols-2 gap-2">
                        {homestay.amenities.map((a) => (
                          <li
                            key={a}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Host contact placeholder */}
                  <div className="mt-5 rounded-lg bg-muted p-4">
                    <div className="text-sm font-semibold text-foreground">
                      Host contact
                    </div>
                    <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5" />
                        <span>+91 9XXXX XXXXX</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" />
                        <span>host@kubovista.travel</span>
                      </div>
                    </div>
                  </div>

                  {/* Need help */}
                  <div className="mt-5 rounded-lg bg-muted p-4">
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
