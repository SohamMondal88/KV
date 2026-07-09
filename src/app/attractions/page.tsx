"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";

import { destinations } from "@/lib/data";
import type { Attraction } from "@/lib/types";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface AttractionItem extends Attraction {
  destinationName: string;
  destinationSlug: string;
}

const categories = [
  "All",
  "Religious",
  "Nature",
  "Heritage",
  "Viewpoint",
  "Unique",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
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

export default function AttractionsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const allAttractions = useMemo<AttractionItem[]>(() => {
    const items: AttractionItem[] = [];
    destinations.forEach((dest) => {
      dest.nearbyAttractions.forEach((attr) => {
        items.push({
          ...attr,
          destinationName: dest.name,
          destinationSlug: dest.slug,
        });
      });
    });
    return items;
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return allAttractions;
    return allAttractions.filter((a) => a.category === activeCategory);
  }, [activeCategory, allAttractions]);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
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
              Must-Visit Places
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
              Discover iconic attractions, hidden viewpoints, and sacred sites
              across the Eastern Himalayas.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card py-6">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Filter by category</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            title="Top Attractions"
            subtitle="A curated collection of the most captivating places across our destinations."
            align="left"
            className="mb-10"
          />

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              No attractions found for the selected category.
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filtered.map((attr) => (
                <motion.div key={`${attr.destinationSlug}-${attr.id}`} variants={itemVariants}>
                  <Card className="flex h-full flex-col overflow-hidden">
                    <div className="relative h-44 w-full overflow-hidden sm:h-48">
                      <Image
                        src={
                          attr.image ||
                          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
                        }
                        alt={attr.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute left-3 top-3">
                        <Badge variant="accent">{attr.category}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-semibold text-foreground">
                        {attr.name}
                      </h3>
                      <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {attr.destinationName}
                      </div>
                      <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                        {attr.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </div>
  );
}
