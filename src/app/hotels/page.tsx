"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, Eye, SlidersHorizontal } from "lucide-react";

import { hotels } from "@/lib/data";
import type { Hotel } from "@/lib/types";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹3,000", min: 0, max: 3000 },
  { label: "₹3,000 - ₹5,000", min: 3000, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: Infinity },
];

export default function HotelsPage() {
  const [activeLocation, setActiveLocation] = useState<string>("all");
  const [activeStars, setActiveStars] = useState<number>(0);
  const [activePriceRange, setActivePriceRange] = useState<number>(0);

  const locations = useMemo(() => {
    const set = new Set(hotels.map((h) => h.location));
    return ["all", ...Array.from(set)];
  }, []);

  const starOptions = [0, 3, 4, 5];

  const filteredHotels = useMemo(() => {
    const range = priceRanges[activePriceRange];
    return hotels.filter((h) => {
      const matchLocation =
        activeLocation === "all" || h.location === activeLocation;
      const matchStars = activeStars === 0 || h.stars === activeStars;
      const matchPrice = h.pricePerNight >= range.min && h.pricePerNight < range.max;
      return matchLocation && matchStars && matchPrice;
    });
  }, [activeLocation, activeStars, activePriceRange]);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Premium Hotels
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
              Handpicked luxury and boutique hotels that offer world-class
              comfort amid breathtaking Himalayan landscapes.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card py-6">
        <Container>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
              {/* Location */}
              <div className="flex-1">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Location
                </span>
                <div className="flex flex-wrap gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setActiveLocation(loc)}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        activeLocation === loc
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {loc === "all" ? "All" : loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stars */}
              <div className="flex-1">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Star Rating
                </span>
                <div className="flex flex-wrap gap-2">
                  {starOptions.map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setActiveStars(stars)}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        activeStars === stars
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {stars === 0 ? (
                        "All"
                      ) : (
                        <>
                          {stars} <Star className="h-3 w-3 fill-current" />
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex-1">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Price Range
                </span>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range, idx) => (
                    <button
                      key={range.label}
                      onClick={() => setActivePriceRange(idx)}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        activePriceRange === idx
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Hotel Grid */}
      <section className="py-12 sm:py-16">
        <Container>
          {filteredHotels.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              No hotels match your filters.
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </div>
  );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="flex h-full flex-col overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden sm:h-52">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {hotel.featured && (
            <div className="absolute right-3 top-3">
              <Badge variant="primary">Featured</Badge>
            </div>
          )}
          <div className="absolute left-3 top-3 flex items-center gap-0.5 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold leading-snug text-foreground">
            {hotel.name}
          </h3>

          <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {hotel.location}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <StarRating rating={hotel.rating} size={16} showValue />
            <span className="text-xs text-muted-foreground">
              ({hotel.reviewCount} reviews)
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {hotel.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 5).map((amenity) => (
              <Badge key={amenity} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <div>
              <span className="text-xs text-muted-foreground">per night</span>
              <div className="text-xl font-bold text-foreground">
                ₹{hotel.pricePerNight.toLocaleString("en-IN")}
              </div>
            </div>
            <Button size="sm" variant="primary">
              <Eye className="mr-1 h-3.5 w-3.5" />
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
