"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { destinations } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { DestinationsOverviewMap } from "@/components/maps/DestinationsOverviewMap";

export default function DestinationsPage() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);

  const states = useMemo(() => {
    const set = new Set(destinations.map((d) => d.state));
    return ["All", ...Array.from(set)];
  }, []);

  const tags = useMemo(() => {
    const set = new Set(destinations.flatMap((d) => d.tags));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.tagline.toLowerCase().includes(search.toLowerCase()) ||
        d.state.toLowerCase().includes(search.toLowerCase());
      const matchesState = stateFilter === "All" || d.state === stateFilter;
      const matchesTag = tagFilter === "All" || d.tags.includes(tagFilter);
      const matchesRating = d.rating >= ratingFilter;
      return matchesSearch && matchesState && matchesTag && matchesRating;
    });
  }, [search, stateFilter, tagFilter, ratingFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
  };

  const clearFilters = () => {
    setSearch("");
    setStateFilter("All");
    setTagFilter("All");
    setRatingFilter(0);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Discover 17 Hidden Destinations
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Explore offbeat Himalayan gems curated for the curious traveler.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Overview Map */}
      <section className="border-b border-border bg-muted/30 py-12">
        <Container>
          <h2 className="mb-4 text-center text-xl font-semibold text-foreground">
            Explore Destinations on the Map
          </h2>
          <DestinationsOverviewMap />
        </Container>
      </section>

      {/* Filters + Grid */}
      <Container className="py-12">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              >
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All States" : s}
                  </option>
                ))}
              </select>

              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              >
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t === "All" ? "All Tags" : t}
                  </option>
                ))}
              </select>

              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(Number(e.target.value))}
                className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>
          </div>

          {(search || stateFilter !== "All" || tagFilter !== "All" || ratingFilter > 0) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X size={14} className="mr-1" /> Clear
            </Button>
          )}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          Showing {filtered.length} of {destinations.length} destinations
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SlidersHorizontal className="mb-4 h-10 w-10 text-muted-foreground/40" />
            <h3 className="text-lg font-semibold">No destinations found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
            <Button variant="outline" size="md" className="mt-4" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((d) => (
              <motion.div key={d.id} variants={itemVariants}>
                <Card className="group h-full overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={d.heroImage}
                      alt={d.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge variant="accent">{d.state}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold">{d.name}</h3>
                      <span className="shrink-0 text-xs font-medium text-muted-foreground">
                        {d.budgetPlanner.midRange}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{d.tagline}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {d.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <StarRating rating={d.rating} size={14} showValue />
                      <span className="text-xs text-muted-foreground">{d.reviewCount} reviews</span>
                    </div>
                    <div className="mt-4">
                      <Link href={`/destinations/${d.slug}`} className="block w-full">
                        <Button variant="primary" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </div>
  );
}
