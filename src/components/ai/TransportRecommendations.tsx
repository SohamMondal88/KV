"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bus, MapPin, IndianRupee } from "lucide-react";

interface TransportRecommendationsProps {
  howToReach: string;
  localTransport: string;
  estimatedCost: number;
}

export function TransportRecommendations({ howToReach, localTransport, estimatedCost }: TransportRecommendationsProps) {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Bus className="h-5 w-5 text-primary" />
        Getting There & Around
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-border bg-card p-4 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              How to Reach
            </div>
            <p className="text-sm text-muted-foreground">{howToReach}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Bus className="h-4 w-4 text-accent" />
              Local Transport
            </div>
            <p className="text-sm text-muted-foreground">{localTransport}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <IndianRupee className="h-4 w-4 text-accent" />
              Estimated Transport Cost
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">₹{estimatedCost.toLocaleString("en-IN")}</span> total
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
