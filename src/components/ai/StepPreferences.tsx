"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Car, CloudSun, UtensilsCrossed, Mountain, Check } from "lucide-react";
import { PlannerInputs } from "@/lib/ai-engine";
import { cn } from "@/lib/utils";

interface StepPreferencesProps {
  inputs: PlannerInputs;
  updateInputs: (patch: Partial<PlannerInputs>) => void;
}

export function StepPreferences({ inputs, updateInputs }: StepPreferencesProps) {
  const travelStyles = [
    { label: "Budget Backpacker", icon: Compass },
    { label: "Mid-Range Explorer", icon: Mountain },
    { label: "Luxury Seeker", icon: Check },
  ] as const;

  const vehicles = [
    { label: "Public Transport", icon: Car },
    { label: "Private Taxi", icon: Car },
    { label: "Self-Drive", icon: Car },
    { label: "Bike", icon: Mountain },
  ] as const;

  const weathers = [
    { label: "Cold/Snow", icon: CloudSun },
    { label: "Pleasant/Mild", icon: CloudSun },
    { label: "Warm", icon: CloudSun },
    { label: "Any", icon: CloudSun },
  ] as const;

  const adventures = [
    { label: "Relaxed", desc: "Sightseeing & leisure" },
    { label: "Moderate", desc: "Light treks & walks" },
    { label: "High", desc: "Adventure sports" },
  ] as const;

  const foodOptions = ["Veg", "Non-Veg", "Local Cuisine", "Continental"];
  const mustHaves = ["Mountains", "Culture", "Food", "Photography", "Wildlife", "Rivers", "Camping"];

  const toggleMulti = (key: "foodPreferences" | "mustHaves", value: string) => {
    const current = inputs[key];
    if (current.includes(value)) {
      updateInputs({ [key]: current.filter((v) => v !== value) });
    } else {
      updateInputs({ [key]: [...current, value] });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-bold text-foreground">Preferences</h3>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Travel Style */}
        <div className="space-y-2 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Compass className="h-4 w-4 text-primary" />
            Travel Style
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {travelStyles.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() =>
                  updateInputs({ travelStyle: s.label as PlannerInputs["travelStyle"] })
                }
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition",
                  inputs.travelStyle === s.label
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                <s.icon className="h-4 w-4" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Preference */}
        <div className="space-y-2 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Car className="h-4 w-4 text-primary" />
            Vehicle Preference
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {vehicles.map((v) => (
              <button
                key={v.label}
                type="button"
                onClick={() =>
                  updateInputs({ vehiclePreference: v.label as PlannerInputs["vehiclePreference"] })
                }
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition",
                  inputs.vehiclePreference === v.label
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                <v.icon className="h-4 w-4" />
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Weather Preference */}
        <div className="space-y-2 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <CloudSun className="h-4 w-4 text-primary" />
            Weather Preference
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {weathers.map((w) => (
              <button
                key={w.label}
                type="button"
                onClick={() =>
                  updateInputs({ weatherPreference: w.label as PlannerInputs["weatherPreference"] })
                }
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition",
                  inputs.weatherPreference === w.label
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                <w.icon className="h-4 w-4" />
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Adventure Level */}
        <div className="space-y-2 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Mountain className="h-4 w-4 text-primary" />
            Adventure Level
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {adventures.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() =>
                  updateInputs({ adventureLevel: a.label as PlannerInputs["adventureLevel"] })
                }
                className={cn(
                  "rounded-lg border px-4 py-3 text-sm font-medium transition",
                  inputs.adventureLevel === a.label
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                <div className="font-semibold">{a.label}</div>
                <div className="text-xs opacity-70">{a.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Food Preference */}
        <div className="space-y-2 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <UtensilsCrossed className="h-4 w-4 text-primary" />
            Food Preference
          </label>
          <div className="flex flex-wrap gap-2">
            {foodOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleMulti("foodPreferences", opt)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  inputs.foodPreferences.includes(opt)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Must-haves */}
        <div className="space-y-2 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Check className="h-4 w-4 text-primary" />
            Must-haves
          </label>
          <div className="flex flex-wrap gap-2">
            {mustHaves.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleMulti("mustHaves", opt)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  inputs.mustHaves.includes(opt)
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
