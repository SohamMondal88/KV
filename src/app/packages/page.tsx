"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, Eye, SlidersHorizontal } from "lucide-react";

import { packages } from "@/lib/data";
import type { Package } from "@/lib/types";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { TiltCard, CountUp, RippleButton, TextReveal, HoverGlow } from "@/components/animations/MicroInteractions";

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

const packageTypes = [
  "all",
  "weekend",
  "luxury",
  "budget",
  "family",
  "couple",
  "backpacking",
  "photography",
  "camping",
  "trekking",
  "honeymoon",
  "corporate",
  "college",
  "group",
];

export default function PackagesPage() {
  const [activeType, setActiveType] = useState<string>("all");

  const filteredPackages = useMemo(() => {
    if (activeType === "all") return packages;
    return packages.filter((pkg) => pkg.type === activeType);
  }, [activeType]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=2000&auto=format&fit=crop"
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
              <TextReveal>Curated Travel Packages</TextReveal>
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
              Handpicked experiences for every kind of traveler. Explore the
              Himalayas with our thoughtfully designed itineraries.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card py-6">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter by type</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {packageTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Package Grid */}
      <section className="py-12 sm:py-16">
        <Container>
          {filteredPackages.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              No packages found for the selected filter.
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} formatPrice={formatPrice} />
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </div>
  );
}

function PackageCard({
  pkg,
  formatPrice,
}: {
  pkg: Package;
  formatPrice: (price: number) => string;
}) {
  return (
    <motion.div variants={itemVariants}>
      <TiltCard maxTilt={6}>
        <Card className="flex h-full flex-col overflow-hidden">
          <div className="relative h-48 w-full overflow-hidden sm:h-52">
            <Image
              src={pkg.image}
              alt={pkg.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute left-3 top-3">
              <Badge variant="accent">
                {pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
              </Badge>
            </div>
            {pkg.featured && (
              <div className="absolute right-3 top-3">
                <Badge variant="primary">Featured</Badge>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold leading-snug text-foreground">
                {pkg.name}
              </h3>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {pkg.duration}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {pkg.destinations.join(", ")}
              </span>
            </div>

            <div className="mt-3">
              <StarRating rating={pkg.rating} size={16} showValue />
              <span className="ml-1 text-xs text-muted-foreground">
                ({pkg.reviewCount} reviews)
              </span>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
              {pkg.description}
            </p>

            {pkg.highlights.length > 0 && (
              <ul className="mt-3 space-y-1">
                {pkg.highlights.slice(0, 3).map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto flex items-end justify-between gap-3 pt-5">
              <div>
                <div className="text-xs text-muted-foreground line-through">
                  {formatPrice(pkg.originalPrice)}
                </div>
                <div className="text-xl font-bold text-foreground">
                  <CountUp target={pkg.price} prefix="₹" />
                </div>
              </div>
              <RippleButton className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600">
                <Eye className="mr-1 h-3.5 w-3.5" />
                Book Now
              </RippleButton>
            </div>
          </div>
        </Card>
      </TiltCard>
    </motion.div>
  );
}
