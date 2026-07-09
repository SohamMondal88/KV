"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  Wifi,
  Mountain,
  Waves,
  Flame,
  Flower2,
  Car,
  PawPrint,
  Briefcase,
  SlidersHorizontal,
  Check,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Users,
  CalendarDays,
  BedDouble,
  Star,
  MapPin,
  Shuffle,
} from "lucide-react";
import { destinations, homestays, hotels } from "@/lib/data";
import type { Destination, Homestay, Hotel } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";

type TravelStyle =
  | "Budget Backpacker"
  | "Couple Retreat"
  | "Family Vacation"
  | "Solo Adventure"
  | "Luxury Escape"
  | "Workation";

type SortOption = "bestMatch" | "priceAsc" | "priceDesc" | "rating";

type StayItem =
  | (Hotel & { type: "hotel"; destination: Destination })
  | (Homestay & { type: "homestay"; destination: Destination });

type StayItemWithScore = StayItem & { matchScore: number };

const travelStyles: TravelStyle[] = [
  "Budget Backpacker",
  "Couple Retreat",
  "Family Vacation",
  "Solo Adventure",
  "Luxury Escape",
  "Workation",
];

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={14} />,
  "Mountain View": <Mountain size={14} />,
  "River View": <Waves size={14} />,
  Fireplace: <Flame size={14} />,
  Garden: <Flower2 size={14} />,
  Parking: <Car size={14} />,
  "Pet Friendly": <PawPrint size={14} />,
  "Work Desk": <Briefcase size={14} />,
};

const mustHaveOptions = [
  "WiFi",
  "Mountain View",
  "River View",
  "Fireplace",
  "Garden",
  "Parking",
  "Pet Friendly",
  "Work Desk",
];

function getDestinationByName(name: string): Destination | undefined {
  return destinations.find(
    (d) => d.name.toLowerCase() === name.toLowerCase()
  );
}

function buildStayItems(): StayItem[] {
  const items: StayItem[] = [];
  hotels.forEach((h) => {
    const dest = getDestinationByName(h.location);
    if (dest) items.push({ ...h, type: "hotel", destination: dest });
  });
  homestays.forEach((hs) => {
    const dest = getDestinationByName(hs.location);
    if (dest) items.push({ ...hs, type: "homestay", destination: dest });
  });
  return items;
}

function computeMatchScore(
  item: StayItem,
  style: TravelStyle | "",
  budgetMax: number,
  mustHaves: string[],
  guests: number
): number {
  let score = 50;
  const dest = item.destination;

  // Budget fit
  if (item.pricePerNight <= budgetMax) {
    const ratio = item.pricePerNight / Math.max(budgetMax, 1);
    score += (1 - ratio) * 20;
  } else {
    score -= 30;
  }

  // Guest fit
  const maxGuests =
    item.type === "homestay" ? item.maxGuests : item.stars * 2 + 1;
  if (guests <= maxGuests) score += 10;
  else score -= 10;

  // Must-haves
  mustHaves.forEach((mh) => {
    if (item.amenities.includes(mh)) score += 8;
    else score -= 5;
  });

  // Travel style logic
  switch (style) {
    case "Budget Backpacker":
      if (item.pricePerNight <= 1500) score += 20;
      if (
        item.amenities.some((a) =>
          ["WiFi", "Free WiFi"].includes(a)
        )
      )
        score += 5;
      break;
    case "Couple Retreat":
      if (dest.coupleFriendly) score += 15;
      if (
        item.amenities.some((a) =>
          ["Mountain View", "Garden", "Fireplace", "Lake View"].includes(a)
        )
      )
        score += 10;
      if (item.type === "homestay" && item.bedrooms <= 2) score += 5;
      break;
    case "Family Vacation":
      if (dest.familyFriendly) score += 15;
      if (
        item.amenities.some((a) =>
          ["Garden", "Parking", "WiFi", "Free WiFi"].includes(a)
        )
      )
        score += 10;
      if (maxGuests >= 4) score += 10;
      break;
    case "Solo Adventure":
      if (dest.soloFriendly) score += 15;
      if (item.pricePerNight <= 2000) score += 10;
      if (item.amenities.some((a) => ["WiFi", "Free WiFi"].includes(a)))
        score += 5;
      break;
    case "Luxury Escape":
      if (item.pricePerNight >= 3000) score += 20;
      if (item.type === "hotel" && item.stars >= 4) score += 15;
      if (item.amenities.some((a) => ["Spa", "Gym", "Restaurant"].includes(a)))
        score += 10;
      break;
    case "Workation":
      if (dest.workationFriendly) score += 15;
      if (
        item.amenities.some((a) =>
          ["WiFi", "Free WiFi", "Work Desk"].includes(a)
        )
      )
        score += 15;
      break;
    default:
      break;
  }

  // Rating boost
  score += item.rating * 2;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function getRecommendationReason(
  item: StayItem,
  style: TravelStyle | ""
): string {
  const dest = item.destination;
  if (style === "Budget Backpacker")
    return `Great value stay in ${dest.name} with essentials covered.`;
  if (style === "Couple Retreat")
    return `Perfect for couples seeking ${item.amenities.some((a) => a.includes("Mountain")) ? "mountain views" : "a peaceful retreat"} in ${dest.name}.`;
  if (style === "Family Vacation")
    return `Family-friendly stay with space for everyone in ${dest.name}.`;
  if (style === "Solo Adventure")
    return `Safe, welcoming, and budget-friendly base for solo explorers.`;
  if (style === "Luxury Escape")
    return `Premium experience with top amenities in ${dest.name}.`;
  if (style === "Workation")
    return `Quiet, connected workspace with inspiring ${dest.name} views.`;
  return `A lovely stay in ${dest.name} matched to your preferences.`;
}

export default function HotelRecommendationsPage() {
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("Any");
  const [travelStyle, setTravelStyle] = useState<TravelStyle | "">("");
  const [budgetMax, setBudgetMax] = useState(5000);
  const [mustHaves, setMustHaves] = useState<string[]>([]);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("bestMatch");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const allItems = useMemo(() => buildStayItems(), []);

  const destinationOptions = useMemo(
    () => ["Any", ...destinations.map((d) => d.name)],
    []
  );

  const toggleMustHave = (m: string) => {
    setMustHaves((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const filtered = useMemo(() => {
    const baseItems = allItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());
      const matchesDest =
        destination === "Any" || item.location === destination;
      const matchesBudget = item.pricePerNight <= budgetMax;
      const matchesGuests =
        item.type === "homestay"
          ? guests <= item.maxGuests
          : guests <= item.stars * 2 + 1;
      const matchesMustHaves = mustHaves.every((mh) =>
        item.amenities.includes(mh)
      );
      return matchesSearch && matchesDest && matchesBudget && matchesGuests && matchesMustHaves;
    });

    let items: StayItemWithScore[] = baseItems.map((item) => ({
      ...item,
      matchScore: computeMatchScore(
        item,
        travelStyle,
        budgetMax,
        mustHaves,
        guests
      ),
    }));

    if (sortBy === "bestMatch") {
      items.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === "priceAsc") {
      items.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === "priceDesc") {
      items.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [
    allItems,
    search,
    destination,
    travelStyle,
    budgetMax,
    mustHaves,
    guests,
    sortBy,
  ]);

  const compareItems = useMemo(
    () => allItems.filter((i) => compareIds.includes(i.id)),
    [allItems, compareIds]
  );

  const clearFilters = () => {
    setSearch("");
    setDestination("Any");
    setTravelStyle("");
    setBudgetMax(15000);
    setMustHaves([]);
    setGuests(2);
    setCheckIn("");
    setCheckOut("");
    setSortBy("bestMatch");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find Your Perfect Stay
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              AI-matched accommodations based on your travel style
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-10">
        {/* Filter Panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <SlidersHorizontal size={18} className="text-primary" />
            Smart Filters
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Destination */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              >
                {destinationOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Style */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Travel Style
              </label>
              <select
                value={travelStyle}
                onChange={(e) =>
                  setTravelStyle(e.target.value as TravelStyle | "")
                }
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Select style...</option>
                {travelStyles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Guests
              </label>
              <div className="flex h-11 items-center rounded-lg border border-border bg-background px-3">
                <Users size={16} className="mr-2 text-muted-foreground" />
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-foreground outline-none"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Travel Dates (optional)
              </label>
              <div className="flex gap-2">
                <div className="flex h-11 flex-1 items-center rounded-lg border border-border bg-background px-3">
                  <CalendarDays size={16} className="mr-2 shrink-0 text-muted-foreground" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground outline-none"
                  />
                </div>
                <div className="flex h-11 flex-1 items-center rounded-lg border border-border bg-background px-3">
                  <CalendarDays size={16} className="mr-2 shrink-0 text-muted-foreground" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Budget Slider */}
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-medium text-muted-foreground">
                Budget per night
              </label>
              <span className="text-sm font-semibold text-primary">
                ₹500 — ₹{budgetMax.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={15000}
              step={500}
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>₹500</span>
              <span>₹7,500</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Must-haves */}
          <div className="mt-4">
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              Must-haves
            </label>
            <div className="flex flex-wrap gap-2">
              {mustHaveOptions.map((m) => {
                const active = mustHaves.includes(m);
                return (
                  <button
                    key={m}
                    onClick={() => toggleMustHave(m)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {active && <Check size={12} />}
                    {amenityIcons[m]}
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X size={14} className="mr-1" /> Reset
            </Button>
          </div>
        </motion.div>

        {/* Results Header */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Recommended Stays
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing {filtered.length} matches
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="bestMatch">Best Match</option>
              <option value="priceAsc">Price: Low - High</option>
              <option value="priceDesc">Price: High - Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center"
          >
            <Search className="mb-4 h-10 w-10 text-muted-foreground/40" />
            <h3 className="text-lg font-semibold">No results found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your budget or removing some filters.
            </p>
            <Button variant="outline" size="md" className="mt-4" onClick={clearFilters}>
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item: any) => {
              const isCompared = compareIds.includes(item.id);
              const matchScore = item.matchScore as number;
              const reason = getRecommendationReason(item, travelStyle);
              return (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card className="group h-full overflow-hidden">
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3 flex gap-2">
                        <Badge variant="accent">
                          {matchScore}% Match
                        </Badge>
                        <Badge variant="outline" className="bg-card/80 text-[10px] backdrop-blur">
                          {item.type === "hotel" ? "Hotel" : "Homestay"}
                        </Badge>
                      </div>
                      <div className="absolute right-3 top-3">
                        <button
                          onClick={() => toggleCompare(item.id)}
                          className={`rounded-full p-2 text-xs font-medium transition-colors backdrop-blur ${
                            isCompared
                              ? "bg-primary text-primary-foreground"
                              : "bg-card/80 text-foreground hover:bg-card"
                          }`}
                          title={isCompared ? "Remove from compare" : "Add to compare"}
                        >
                          <Shuffle size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-accent" fill="currentColor" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={13} />
                        {item.location}
                        {item.type === "hotel" && (
                          <span className="ml-1 text-xs">
                            {"★".repeat(item.stars)}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm text-foreground/80">
                        {reason}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.amenities.slice(0, 4).map((a: string) => (
                          <Badge key={a} variant="outline" className="text-[10px]">
                            {a}
                          </Badge>
                        ))}
                        {item.amenities.length > 4 && (
                          <Badge variant="ghost" className="text-[10px]">
                            +{item.amenities.length - 4}
                          </Badge>
                        )}
                      </div>

                      <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                        <div>
                          <span className="text-lg font-bold text-primary">
                            ₹{item.pricePerNight.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-muted-foreground"> / night</span>
                          <div className="text-xs text-muted-foreground">
                            {item.reviewCount} reviews
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={
                              item.type === "hotel"
                                ? `/hotels/${item.slug}`
                                : `/homestays/${item.slug}`
                            }
                          >
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          <Button size="sm">Book Now</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </Container>

      {/* Compare Bar */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card px-4 py-3 shadow-xl"
          >
            <Container>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    {compareIds.length} item{compareIds.length > 1 ? "s" : ""} selected
                  </span>
                  <div className="hidden gap-2 sm:flex">
                    {compareItems.map((i) => (
                      <Badge key={i.id} variant="primary" className="text-[10px]">
                        {i.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCompareIds([])}
                  >
                    Clear
                  </Button>
                  <Button size="sm" onClick={() => setShowCompare(true)}>
                    Compare
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowCompare(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-h-[80vh] w-full max-w-4xl overflow-auto rounded-2xl border border-border bg-card p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Compare Stays</h3>
                <button
                  onClick={() => setShowCompare(false)}
                  className="rounded-full p-1 hover:bg-muted"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {compareItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4"
                  >
                    <div className="relative h-32 w-full overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      {item.location}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price/night</span>
                        <span className="font-semibold">
                          ₹{item.pricePerNight.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating</span>
                        <span className="font-semibold">{item.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-semibold capitalize">{item.type}</span>
                      </div>
                      {item.type === "hotel" && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stars</span>
                          <span className="font-semibold">{item.stars}</span>
                        </div>
                      )}
                      {item.type === "homestay" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bedrooms</span>
                            <span className="font-semibold">{item.bedrooms}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Max Guests</span>
                            <span className="font-semibold">{item.maxGuests}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.amenities.slice(0, 5).map((a) => (
                        <Badge key={a} variant="outline" className="text-[10px]">
                          {a}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" className="mt-auto w-full">
                      Book Now
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
