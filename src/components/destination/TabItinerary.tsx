"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Bus,
  Hotel,
  Utensils,
  Wallet,
} from "lucide-react";

interface TabItineraryProps {
  destination: Destination;
}

export function TabItinerary({ destination }: TabItineraryProps) {
  const itineraries = destination.suggestedItineraries || [];
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  return (
    <Container className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Suggested Itineraries</h2>
        <p className="mt-1 text-white/50">Ready-made plans for your {destination.name} trip.</p>
      </div>

      <div className="space-y-3">
        {itineraries.map((it, idx) => {
          const isOpen = expandedIdx === idx;
          return (
            <Card key={idx} className="overflow-hidden">
              <button
                onClick={() => setExpandedIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#F6C453]/10 text-[#F6C453] text-[10px]">{it.days} Day{it.days > 1 ? "s" : ""}</Badge>
                    <h3 className="font-semibold text-white">{it.title}</h3>
                  </div>
                  <p className="mt-1 text-xs text-white/40">{it.overview}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{it.estimatedBudget}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-white/40" /> : <ChevronDown className="h-4 w-4 text-white/40" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 px-4 pb-4">
                      <div className="mt-4 space-y-4">
                        {it.daysPlan.map((day) => (
                          <div key={day.day} className="rounded-lg border border-white/5 bg-white/5 p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6C453]/20 text-[10px] font-bold text-[#F6C453]">
                                {day.day}
                              </div>
                              <span className="text-sm font-semibold text-white">{day.title}</span>
                            </div>
                            <ul className="mt-2 space-y-1">
                              {day.activities.map((act, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-white/50">
                                  <span className="h-1 w-1 rounded-full bg-white/20" /> {act}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-white/30">
                              <span className="flex items-center gap-1"><Utensils className="h-3 w-3" /> {day.meals.join(", ")}</span>
                              <span className="flex items-center gap-1"><Bus className="h-3 w-3" /> {day.transport}</span>
                              <span className="flex items-center gap-1"><Hotel className="h-3 w-3" /> {day.accommodation}</span>
                              <span className="flex items-center gap-1"><Wallet className="h-3 w-3" /> {day.budget}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
