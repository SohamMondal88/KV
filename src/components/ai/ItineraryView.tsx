"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sunrise, Sun, Sunset, Moon, UtensilsCrossed, IndianRupee, Bus } from "lucide-react";
import { GeneratedItineraryDay } from "@/lib/ai-engine";

interface ItineraryViewProps {
  days: GeneratedItineraryDay[];
  destinationName: string;
}

function TimeBlock({ icon: Icon, title, items, color }: { icon: any; title: string; items: string[]; color: string }) {
  return (
    <div className="flex gap-3">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${color}`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
        <ul className="mt-1 space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-foreground">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ItineraryView({ days, destinationName }: ItineraryViewProps) {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Sun className="h-5 w-5 text-primary" />
        Your Itinerary — {destinationName}
      </h3>

      <div className="space-y-4">
        {days.map((day, i) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {day.day}
                </div>
                <h4 className="font-semibold text-foreground">{day.title}</h4>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-primary">
                <IndianRupee className="h-3.5 w-3.5" />
                {day.dailyBudget.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <TimeBlock
                icon={Sunrise}
                title="Morning"
                items={day.morning}
                color="bg-orange-500"
              />
              <TimeBlock
                icon={Sun}
                title="Afternoon"
                items={day.afternoon}
                color="bg-yellow-500"
              />
              <TimeBlock
                icon={Sunset}
                title="Evening"
                items={day.evening}
                color="bg-indigo-500"
              />
              <TimeBlock
                icon={UtensilsCrossed}
                title="Meals"
                items={day.meals}
                color="bg-emerald-500"
              />
              <TimeBlock
                icon={Bus}
                title="Transport"
                items={[day.transport, `Stay: ${day.accommodation}`]}
                color="bg-sky-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
