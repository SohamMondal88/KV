"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, Users, CalendarDays, Baby, PawPrint } from "lucide-react";
import { PlannerInputs } from "@/lib/ai-engine";

interface StepBasicsProps {
  inputs: PlannerInputs;
  updateInputs: (patch: Partial<PlannerInputs>) => void;
}

export function StepBasics({ inputs, updateInputs }: StepBasicsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-bold text-foreground">Trip Basics</h3>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Budget */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Wallet className="h-4 w-4 text-primary" />
            Total Budget (INR)
          </label>
          <input
            type="number"
            min={5000}
            step={500}
            value={inputs.budget || ""}
            onChange={(e) => updateInputs({ budget: Math.max(5000, Number(e.target.value)) })}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="e.g. 25000"
          />
          <p className="text-xs text-muted-foreground">
            Total budget for the entire trip
          </p>
        </div>

        {/* Travel Dates */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <CalendarDays className="h-4 w-4 text-primary" />
            Travel Dates
          </label>
          <input
            type="text"
            value={inputs.travelDates}
            onChange={(e) => updateInputs({ travelDates: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="e.g., October 15-20, 2024"
          />
        </div>

        {/* Number of People */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Users className="h-4 w-4 text-primary" />
            Number of People
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={10}
              value={inputs.people}
              onChange={(e) => updateInputs({ people: Number(e.target.value) })}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
            />
            <span className="min-w-[2rem] text-center text-sm font-semibold text-foreground">
              {inputs.people}
            </span>
          </div>
        </div>

        {/* Number of Days */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <CalendarDays className="h-4 w-4 text-primary" />
            Number of Days
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={7}
              value={inputs.days}
              onChange={(e) => updateInputs({ days: Number(e.target.value) })}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
            />
            <span className="min-w-[2rem] text-center text-sm font-semibold text-foreground">
              {inputs.days}
            </span>
          </div>
        </div>

        {/* Kids Toggle */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Baby className="h-4 w-4 text-primary" />
            Kids traveling?
          </label>
          <div className="flex gap-2">
            {([false, true] as const).map((val) => (
              <button
                key={val ? "yes" : "no"}
                type="button"
                onClick={() => updateInputs({ hasKids: val })}
                className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                  inputs.hasKids === val
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                {val ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Toggle */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <PawPrint className="h-4 w-4 text-primary" />
            Traveling with pet?
          </label>
          <div className="flex gap-2">
            {([false, true] as const).map((val) => (
              <button
                key={val ? "yes" : "no"}
                type="button"
                onClick={() => updateInputs({ hasPets: val })}
                className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                  inputs.hasPets === val
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                {val ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
