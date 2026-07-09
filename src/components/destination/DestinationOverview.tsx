"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Thermometer, Calendar, Mountain } from "lucide-react";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface DestinationOverviewProps {
  destination: Destination;
}

export function DestinationOverview({ destination }: DestinationOverviewProps) {
  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading title="Overview" align="left" className="mb-8" />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
              <h3 className="text-lg font-semibold mb-3">Introduction</h3>
              <p className="text-muted-foreground leading-relaxed">{destination.introduction}</p>
            </div>
            <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
              <h3 className="text-lg font-semibold mb-3">History</h3>
              <p className="text-muted-foreground leading-relaxed">{destination.history}</p>
            </div>
          </div>

          <div className="space-y-4">
            <QuickFactCard
              icon={<Mountain size={20} />}
              label="Altitude"
              value={destination.altitude}
            />
            <QuickFactCard
              icon={<Calendar size={20} />}
              label="Best Time"
              value={destination.bestTime}
            />
            <QuickFactCard
              icon={<Thermometer size={20} />}
              label="Temperature"
              value={`Summer: ${destination.temperature.summer} | Winter: ${destination.temperature.winter}`}
            />
            <QuickFactCard
              icon={<MapPin size={20} />}
              label="Location"
              value={`${destination.district}, ${destination.state}`}
            />

            <div className="rounded-xl bg-card p-5 shadow-sm border border-border">
              <h4 className="text-sm font-semibold mb-3">Weather</h4>
              <p className="text-sm text-muted-foreground mb-3">{destination.weather}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <WeatherBadge label="Summer" value={destination.temperature.summer} />
                <WeatherBadge label="Winter" value={destination.temperature.winter} />
                <WeatherBadge label="Monsoon" value={destination.temperature.monsoon} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}

function QuickFactCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-sm border border-border">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

function WeatherBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-2 py-2">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-xs font-semibold text-foreground">{value}</p>
    </div>
  );
}
