"use client";

import React from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Coffee, Soup } from "lucide-react";

interface FoodRecommendationsProps {
  localDishes: string[];
  restaurants: string[];
  cafes: string[];
}

export function FoodRecommendations({ localDishes, restaurants, cafes }: FoodRecommendationsProps) {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <UtensilsCrossed className="h-5 w-5 text-primary" />
        Food & Dining
      </h3>

      <div className="grid gap-3 sm:grid-cols-3">
        {localDishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.35 }}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Soup className="h-4 w-4 text-accent" />
              Local Dishes
            </div>
            <ul className="mt-2 space-y-1.5">
              {localDishes.map((dish, i) => (
                <li key={i} className="text-sm text-muted-foreground">{dish}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {restaurants.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <UtensilsCrossed className="h-4 w-4 text-accent" />
              Restaurants
            </div>
            <ul className="mt-2 space-y-1.5">
              {restaurants.map((r, i) => (
                <li key={i} className="text-sm text-muted-foreground">{r}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {cafes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Coffee className="h-4 w-4 text-accent" />
              Cafes
            </div>
            <ul className="mt-2 space-y-1.5">
              {cafes.map((c, i) => (
                <li key={i} className="text-sm text-muted-foreground">{c}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
