"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarDays,
  BedDouble,
  Users,
  MessageSquare,
  ShoppingCart,
  CreditCard,
  Star,
  CheckCircle2,
  Phone,
  Mail,
  HelpCircle,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import { hotels } from "@/lib/data";
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

const roomTypes = ["Standard", "Deluxe", "Suite"];

const roomMultiplier: Record<string, number> = {
  Standard: 1,
  Deluxe: 1.4,
  Suite: 2,
};

export default function HotelBookingClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const hotel = useMemo(() => hotels.find((h) => h.slug === slug), [slug]);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(today);
  const [rooms, setRooms] = useState(1);
  const [guestsPerRoom, setGuestsPerRoom] = useState(2);
  const [roomType, setRoomType] = useState("Standard");
  const [requests, setRequests] = useState("");
  const [adding, setAdding] = useState(false);

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);

  const dateError = useMemo(() => {
    if (!checkIn || !checkOut) return "";
    if (new Date(checkOut) <= new Date(checkIn))
      return "Check-out must be after check-in";
    return "";
  }, [checkIn, checkOut]);

  const pricePerNight = useMemo(() => {
    if (!hotel) return 0;
    return Math.round(hotel.pricePerNight * roomMultiplier[roomType]);
  }, [hotel, roomType]);

  const roomTotal = pricePerNight * nights * rooms;
  const gst = Math.round(roomTotal * 0.05);
  const total = roomTotal + gst;

  const canSubmit = !!hotel && !dateError && nights > 0;

  const handleAddToCart = useCallback(() => {
    if (!canSubmit || !hotel) return;
    setAdding(true);
    addToCart({
      type: "hotel",
      name: hotel.name,
      image: hotel.image,
      location: hotel.location,
      date: `${checkIn} to ${checkOut}`,
      guests: guestsPerRoom * rooms,
      pricePerUnit: total,
      quantity: 1,
      duration: `${nights} night${nights > 1 ? "s" : ""}`,
      details: `${rooms} ${roomType} room${rooms > 1 ? "s" : ""}`,
    });
    setTimeout(() => setAdding(false), 600);
  }, [
    canSubmit,
    hotel,
    addToCart,
    checkIn,
    checkOut,
    guestsPerRoom,
    rooms,
    roomType,
    total,
    nights,
  ]);

  const handleBookNow = useCallback(() => {
    if (!canSubmit || !hotel) return;
    addToCart({
      type: "hotel",
      name: hotel.name,
      image: hotel.image,
      location: hotel.location,
      date: `${checkIn} to ${checkOut}`,
      guests: guestsPerRoom * rooms,
      pricePerUnit: total,
      quantity: 1,
      duration: `${nights} night${nights > 1 ? "s" : ""}`,
      details: `${rooms} ${roomType} room${rooms > 1 ? "s" : ""}`,
    });
    router.push("/checkout");
  }, [
    canSubmit,
    hotel,
    addToCart,
    router,
    checkIn,
    checkOut,
    guestsPerRoom,
    rooms,
    roomType,
    total,
    nights,
  ]);

  if (!hotel) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-bold">Hotel not found</h1>
        <p className="mt-2 text-muted-foreground">
          The hotel you are looking for does not exist.
        </p>
        <Button className="mt-6" onClick={() => router.push("/hotels")}>
          Browse Hotels
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
            src={hotel.image}
            alt={hotel.name}
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
                onClick={() => router.push("/hotels")}
                className="mb-3 inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Hotels
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                  ))}
                </div>
                <h1 className="text-2xl font-bold text-white sm:text-4xl">
                  {hotel.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/80">
                  <span className="inline-flex items-center gap-1">
                    <BedDouble className="h-4 w-4" />
                    {hotel.stars}-star hotel
                  </span>
                  <span>·</span>
                  <span>{hotel.location}</span>
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
                Select your stay preferences.
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

                {/* Rooms + Guests */}
                <div className="grid gap-4 sm:grid-cols-2">
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
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Guests per Room
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuestsPerRoom((g) => Math.max(1, g - 1))}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:bg-muted/80"
                        aria-label="Decrease guests"
                      >
                        −
                      </button>
                      <div className="flex min-w-[3rem] items-center justify-center gap-2 text-base font-semibold text-foreground">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {guestsPerRoom}
                      </div>
                      <button
                        type="button"
                        onClick={() => setGuestsPerRoom((g) => Math.min(6, g + 1))}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:bg-muted/80"
                        aria-label="Increase guests"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Room Type */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Room Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {roomTypes.map((rt) => (
                      <button
                        key={rt}
                        type="button"
                        onClick={() => setRoomType(rt)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          roomType === rt
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {rt}
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
                      placeholder="Early check-in, extra bed, anniversary setup..."
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
                    Please select valid dates with at least 1 night to proceed.
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
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">{hotel.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {hotel.stars} Star
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <StarRating rating={hotel.rating} size={16} showValue />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {hotel.location}
                  </p>

                  <div className="mt-5 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Price per night</span>
                      <span className="font-medium text-foreground">
                        {formatINR(pricePerNight)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {nights} night{nights > 1 ? "s" : ""} × {rooms} room{rooms > 1 ? "s" : ""}
                      </span>
                      <span className="font-medium text-foreground">
                        {formatINR(roomTotal)}
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
                  {hotel.amenities.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-sm font-semibold text-foreground">
                        Amenities
                      </h4>
                      <ul className="mt-2 grid grid-cols-2 gap-2">
                        {hotel.amenities.map((a) => (
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

                  {/* Cancellation */}
                  <div className="mt-5 flex items-start gap-2 rounded-lg bg-success/10 p-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <div className="text-sm text-success">
                      <span className="font-semibold">Free cancellation</span>
                      <span className="text-success/80">
                        {" "}until 24 hours before check-in
                      </span>
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
