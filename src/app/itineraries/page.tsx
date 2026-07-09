"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, Wallet, MapPin, CalendarDays } from "lucide-react";

import { destinations } from "@/lib/data";
import type { Itinerary } from "@/lib/types";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface ItineraryItem extends Itinerary {
  destinationName: string;
  destinationSlug: string;
}

const durationFilters = [
  { label: "All", min: 0, max: Infinity },
  { label: "1-2 Days", min: 1, max: 2 },
  { label: "3-4 Days", min: 3, max: 4 },
  { label: "5+ Days", min: 5, max: Infinity },
];

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

export default function ItinerariesPage() {
  const [activeFilter, setActiveFilter] = useState(0);

  const allItineraries = useMemo<ItineraryItem[]>(() => {
    const items: ItineraryItem[] = [];
    destinations.forEach((dest) => {
      dest.suggestedItineraries.forEach((it) => {
        items.push({
          ...it,
          destinationName: dest.name,
          destinationSlug: dest.slug,
        });
      });
    });
    return items;
  }, []);

  const filtered = useMemo(() => {
    const range = durationFilters[activeFilter];
    return allItineraries.filter(
      (it) => it.days >= range.min && it.days <= range.max
    );
  }, [activeFilter, allItineraries]);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-28">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Plan Your Perfect Trip
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
              Handcrafted itineraries across the Himalayas. Choose a journey
              that matches your pace and passion.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card py-6">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>Filter by duration</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {durationFilters.map((filter, idx) => (
                <button
                  key={filter.label}
                  onClick={() => setActiveFilter(idx)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeFilter === idx
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {filter.label}
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
            title="Suggested Itineraries"
            subtitle="Explore curated day-by-day plans created by local experts."
            align="left"
            className="mb-10"
          />

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              No itineraries match the selected duration filter.
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((it, idx) => (
                <ItineraryCard key={`${it.destinationSlug}-${idx}`} itinerary={it} />
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </div>
  );
}

function ItineraryCard({ itinerary }: { itinerary: ItineraryItem }) {
  const daySummary = itinerary.daysPlan
    .map((d) => `${d.activities.slice(0, 2).join(", ")}`)
    .join("; ");

  return (
    <motion.div variants={itemVariants}>
      <Card className="flex h-full flex-col overflow-hidden p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="accent" className="mb-2">
              {itinerary.days} Day{itinerary.days > 1 ? "s" : ""}
            </Badge>
            <h3 className="text-lg font-semibold leading-snug text-foreground">
              {itinerary.title}
            </h3>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {itinerary.destinationName}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {itinerary.days} Day{itinerary.days > 1 ? "s" : ""}
          </span>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          {itinerary.overview}
        </p>

        <div className="mt-4 rounded-lg bg-muted p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Day Plan Summary
          </p>
          <p className="mt-1 line-clamp-3 text-sm text-foreground">
            {daySummary}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Wallet className="h-3.5 w-3.5" />
          <span>Est. budget:</span>
          <span className="font-medium text-foreground">
            {itinerary.estimatedBudget}
          </span>
        </div>

        <div className="mt-auto pt-5">
          <Button disabled variant="outline" className="w-full">
            View Full Itinerary
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
