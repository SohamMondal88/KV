"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MapPin,
  Clock,
  Users,
  Home,
  Building2,
  X,
  Compass,
  Star,
} from "lucide-react";

import { destinations, packages, homestays, hotels } from "@/lib/data";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const tabs = [
  { key: "destinations", label: "Destinations", icon: MapPin },
  { key: "packages", label: "Packages", icon: Compass },
  { key: "homestays", label: "Homestays", icon: Home },
  { key: "hotels", label: "Hotels", icon: Building2 },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function WishlistPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("destinations");

  const [savedDestinations, setSavedDestinations] = useState(() =>
    destinations.slice(0, 2)
  );
  const [savedPackages, setSavedPackages] = useState(() =>
    packages.slice(0, 2)
  );
  const [savedHomestays, setSavedHomestays] = useState(() =>
    homestays.slice(0, 2)
  );
  const [savedHotels, setSavedHotels] = useState(() => hotels.slice(0, 2));

  const empty = useMemo(() => {
    switch (activeTab) {
      case "destinations":
        return savedDestinations.length === 0;
      case "packages":
        return savedPackages.length === 0;
      case "homestays":
        return savedHomestays.length === 0;
      case "hotels":
        return savedHotels.length === 0;
    }
  }, [
    activeTab,
    savedDestinations,
    savedPackages,
    savedHomestays,
    savedHotels,
  ]);

  const removeItem = (id: string) => {
    switch (activeTab) {
      case "destinations":
        setSavedDestinations((prev) => prev.filter((d) => d.id !== id));
        break;
      case "packages":
        setSavedPackages((prev) => prev.filter((p) => p.id !== id));
        break;
      case "homestays":
        setSavedHomestays((prev) => prev.filter((h) => h.id !== id));
        break;
      case "hotels":
        setSavedHotels((prev) => prev.filter((h) => h.id !== id));
        break;
    }
  };

  const resetTab = () => {
    switch (activeTab) {
      case "destinations":
        setSavedDestinations(destinations.slice(0, 2));
        break;
      case "packages":
        setSavedPackages(packages.slice(0, 2));
        break;
      case "homestays":
        setSavedHomestays(homestays.slice(0, 2));
        break;
      case "hotels":
        setSavedHotels(hotels.slice(0, 2));
        break;
    }
  };

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-24">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              My Wishlist
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
              Your curated collection of dream destinations, packages, and stays.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Tabs */}
      <section className="border-b border-border bg-card py-6">
        <Container>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <Container>
          <AnimatePresence mode="wait">
            {empty ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                  <Heart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Your {tabs.find((t) => t.key === activeTab)?.label} wishlist is empty
                </h3>
                <p className="mt-2 max-w-md text-muted-foreground">
                  Start exploring and save your favorite{" "}
                  {tabs.find((t) => t.key === activeTab)?.label.toLowerCase()} to
                  plan your perfect Himalayan getaway.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Button onClick={resetTab} variant="primary">
                    Explore
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {activeTab === "destinations" &&
                  savedDestinations.map((item) => (
                    <motion.div key={item.id} variants={itemVariants}>
                      <Card className="flex h-full flex-col overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden sm:h-52">
                          <Image
                            src={item.heroImage}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                            aria-label="Remove from wishlist"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {item.name}
                            </h3>
                          </div>
                          <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {item.state}
                          </div>
                          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                            {item.tagline}
                          </p>
                          <div className="mt-auto flex items-center gap-2 pt-5">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-foreground">
                              {item.rating}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({item.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}

                {activeTab === "packages" &&
                  savedPackages.map((item) => (
                    <motion.div key={item.id} variants={itemVariants}>
                      <Card className="flex h-full flex-col overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden sm:h-52">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                            aria-label="Remove from wishlist"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-lg font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {item.duration}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {item.destinations.join(", ")}
                            </span>
                          </div>
                          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                            <div>
                              <div className="text-xs text-muted-foreground line-through">
                                ₹{item.originalPrice.toLocaleString("en-IN")}
                              </div>
                              <div className="text-xl font-bold text-foreground">
                                ₹{item.price.toLocaleString("en-IN")}
                              </div>
                            </div>
                            <Button size="sm" variant="primary">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}

                {activeTab === "homestays" &&
                  savedHomestays.map((item) => (
                    <motion.div key={item.id} variants={itemVariants}>
                      <Card className="flex h-full flex-col overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden sm:h-52">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                            aria-label="Remove from wishlist"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-lg font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {item.location}
                          </div>
                          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.amenities.slice(0, 3).map((a) => (
                              <Badge key={a} variant="outline" className="text-xs">
                                {a}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            Max {item.maxGuests} guests
                          </div>
                          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                            <div>
                              <span className="text-xs text-muted-foreground">
                                per night
                              </span>
                              <div className="text-xl font-bold text-foreground">
                                ₹{item.pricePerNight.toLocaleString("en-IN")}
                              </div>
                            </div>
                            <Button size="sm" variant="primary">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}

                {activeTab === "hotels" &&
                  savedHotels.map((item) => (
                    <motion.div key={item.id} variants={itemVariants}>
                      <Card className="flex h-full flex-col overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden sm:h-52">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                            aria-label="Remove from wishlist"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-lg font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {item.location}
                          </div>
                          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.amenities.slice(0, 3).map((a) => (
                              <Badge key={a} variant="outline" className="text-xs">
                                {a}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            {item.stars} Star
                          </div>
                          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                            <div>
                              <span className="text-xs text-muted-foreground">
                                per night
                              </span>
                              <div className="text-xl font-bold text-foreground">
                                ₹{item.pricePerNight.toLocaleString("en-IN")}
                              </div>
                            </div>
                            <Button size="sm" variant="primary">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>
    </div>
  );
}
