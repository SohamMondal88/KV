"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, IndianRupee, Star } from "lucide-react";
import { Destination } from "@/lib/types";
import { MatchResult } from "@/lib/ai-engine";

interface MatchCardProps {
  result: MatchResult;
  index: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function MatchCard({ result, index, isSelected, onSelect }: MatchCardProps) {
  const { destination, score, whyMatch, estimatedCostPerPerson } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      onClick={onSelect}
      className={`group cursor-pointer overflow-hidden rounded-xl border transition-all ${
        isSelected
          ? "border-primary ring-2 ring-primary/30"
          : "border-border hover:border-primary/40"
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">
            <TrendingUp className="h-3 w-3" />
            {score}% Match
          </div>
          <div className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white">
            <Star className="h-3 w-3 fill-current" />
            {destination.rating}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {destination.state}
        </div>
        <h4 className="mt-1 text-lg font-bold text-foreground">{destination.name}</h4>
        <p className="text-sm text-muted-foreground">{destination.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {whyMatch.slice(0, 3).map((reason, i) => (
            <span
              key={i}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {reason}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <IndianRupee className="h-3.5 w-3.5" />
          ~{estimatedCostPerPerson.toLocaleString("en-IN")} / person
        </div>
      </div>
    </motion.div>
  );
}

interface MatchedDestinationsProps {
  results: MatchResult[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function MatchedDestinations({ results, selectedIndex, onSelect }: MatchedDestinationsProps) {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <TrendingUp className="h-5 w-5 text-primary" />
        Matched Destinations
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result, i) => (
          <MatchCard
            key={result.destination.id}
            result={result}
            index={i}
            isSelected={i === selectedIndex}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}
