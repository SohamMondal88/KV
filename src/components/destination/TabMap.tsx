"use client";

import React from "react";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  MapPin,
  Train,
  Plane,
  Bus,
  Car,
  Wallet,
  Clock,
} from "lucide-react";

interface TabMapProps {
  destination: Destination;
}

export function TabMap({ destination }: TabMapProps) {
  const { coordinates, transportation } = destination;

  const transportIcons: Record<string, React.ReactNode> = {
    train: <Train className="h-4 w-4 text-blue-400" />,
    flight: <Plane className="h-4 w-4 text-sky-400" />,
    bus: <Bus className="h-4 w-4 text-emerald-400" />,
    car: <Car className="h-4 w-4 text-amber-400" />,
  };

  return (
    <Container className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Map & Getting There</h2>
        <p className="mt-1 text-white/50">How to reach {destination.name} and get around.</p>
      </div>

      {/* Static Map Placeholder (since we can't render dynamic Leaflet in static export easily) */}
      <Card className="relative aspect-[16/9] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#1a3a2e]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <MapPin className="mb-2 h-10 w-10 text-[#F6C453]" />
          <p className="text-lg font-bold text-white">{destination.name}</p>
          <p className="text-sm text-white/50">Lat: {coordinates.lat}, Lng: {coordinates.lng}</p>
          <p className="mt-3 text-xs text-white/30">Interactive Leaflet map loads in production with API key.</p>
        </div>
        <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/50 p-3 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
            <span>{destination.altitude}</span>
            <span>•</span>
            <span>{destination.state}</span>
            <span>•</span>
            <span>{destination.district}</span>
          </div>
        </div>
      </Card>

      {/* How To Reach */}
      <section>
        <h3 className="mb-4 text-lg font-bold text-white">How to Reach</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {transportation.howToReach.map((opt, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  {transportIcons[opt.mode] || <Car className="h-4 w-4 text-white/40" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white capitalize">{opt.mode}</p>
                  <p className="mt-0.5 text-xs text-white/50">{opt.description}</p>
                  <div className="mt-1 flex gap-3 text-[10px] text-white/30">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {opt.duration}</span>
                    <span className="flex items-center gap-1"><Wallet className="h-3 w-3" /> {opt.cost}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Nearby Transport */}
      <section>
        <h3 className="mb-4 text-lg font-bold text-white">Nearby Transport Hubs</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Train className="h-4 w-4 text-[#F6C453]" />
              <span className="text-sm font-medium text-white">Railway Station</span>
            </div>
            <p className="mt-1 text-sm text-white/60">{transportation.nearbyRailway}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-[#F6C453]" />
              <span className="text-sm font-medium text-white">Airport</span>
            </div>
            <p className="mt-1 text-sm text-white/60">{transportation.nearbyAirport}</p>
          </Card>
        </div>
      </section>
    </Container>
  );
}
