"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hotel, Star, Users, BedDouble, IndianRupee } from "lucide-react";
import { Homestay, Hotel as HotelType } from "@/lib/types";

interface AccommodationRecommendationsProps {
  stays: (Homestay | HotelType)[];
  nights: number;
  people: number;
}

export function AccommodationRecommendations({ stays, nights, people }: AccommodationRecommendationsProps) {
  const totalCost = stays.length > 0
    ? stays.reduce((sum, stay) => sum + ("pricePerNight" in stay ? stay.pricePerNight : 0), 0) / stays.length * nights * Math.ceil(people / 2)
    : 0;

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Hotel className="h-5 w-5 text-primary" />
        Where to Stay
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        {stays.map((stay, i) => (
          <motion.div
            key={stay.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            className="flex gap-3 rounded-xl border border-border bg-card p-3 shadow-sm"
          >
            <img
              src={stay.image}
              alt={stay.name}
              className="h-24 w-24 shrink-0 rounded-lg object-cover"
            />
            <div className="flex flex-1 flex-col justify-between py-0.5">
              <div>
                <h4 className="text-sm font-bold text-foreground">{stay.name}</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">{stay.location}</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-amber-500">
                  <Star className="h-3 w-3 fill-current" />
                  {stay.rating}
                </div>
                {("stars" in stay) && (
                  <div className="mt-0.5 text-xs text-muted-foreground">{"⭐".repeat(stay.stars)}</div>
                )}
                {("hostName" in stay) && (
                  <p className="mt-0.5 text-xs text-muted-foreground">Host: {stay.hostName}</p>
                )}
                {("maxGuests" in stay) && (
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    Up to {stay.maxGuests} guests
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm font-bold text-primary">
                <IndianRupee className="h-3.5 w-3.5" />
                {"pricePerNight" in stay ? stay.pricePerNight.toLocaleString("en-IN") : 0}/night
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3">
        <span className="text-sm font-medium text-muted-foreground">Estimated total ({nights} nights, {Math.ceil(people / 2)} room(s))</span>
        <span className="flex items-center gap-1 text-base font-bold text-foreground">
          <IndianRupee className="h-4 w-4" />
          {Math.round(totalCost).toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}
