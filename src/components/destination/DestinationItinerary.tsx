"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, Utensils, Bus, Hotel, Wallet } from "lucide-react";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface DestinationItineraryProps {
  destination: Destination;
}

export function DestinationItinerary({ destination }: DestinationItineraryProps) {
  const [openPlan, setOpenPlan] = useState<number | null>(0);
  const [openDay, setOpenDay] = useState<Record<string, boolean>>({});

  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading title="Suggested Itineraries" align="left" className="mb-8" />

        <div className="space-y-6">
          {destination.suggestedItineraries.map((itinerary, planIndex) => (
            <Card key={planIndex} className="overflow-hidden">
              <button
                onClick={() => setOpenPlan(openPlan === planIndex ? null : planIndex)}
                className="w-full flex items-center justify-between p-6 text-left">
                <div>
                  <div className="flex items-center gap-3">
                    <Badge variant="primary">{itinerary.days} Days</Badge>
                    <h3 className="text-lg font-semibold">{itinerary.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{itinerary.overview}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-primary">{itinerary.estimatedBudget}</span>
                  <ChevronDown
                    size={20}
                    className={`text-muted-foreground transition-transform ${openPlan === planIndex ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {openPlan === planIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {itinerary.daysPlan.map((day) => {
                        const dayKey = `${planIndex}-${day.day}`;
                        const isOpen = openDay[dayKey] ?? true;
                        return (
                          <div key={day.day} className="rounded-lg border border-border bg-background">
                            <button
                              onClick={() => setOpenDay((prev) => ({ ...prev, [dayKey]: !isOpen }))}
                              className="w-full flex items-center justify-between p-4 text-left"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                  {day.day}
                                </div>
                                <span className="font-medium">{day.title}</span>
                              </div>
                              <ChevronDown
                                size={16}
                                className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                              />
                            </button>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 space-y-3">
                                    <div>
                                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Activities</p>
                                      <ul className="mt-1 space-y-1">
                                        {day.activities.map((a, idx) => (
                                          <li key={idx} className="text-sm text-foreground">• {a}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <Utensils size={14} />
                                        {day.meals.join(", ")}
                                      </div>
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <Bus size={14} />
                                        {day.transport}
                                      </div>
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <Hotel size={14} />
                                        {day.accommodation}
                                      </div>
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <Wallet size={14} />
                                        {day.budget}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </motion.div>
    </Container>
  );
}
