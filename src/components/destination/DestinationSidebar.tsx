"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mountain,
  Thermometer,
  Calendar,
  Phone,
  Backpack,
  MapPin,
  ExternalLink,
  Train,
  Plane,
  Wifi,
  Users,
  Baby,
  Heart,
  PawPrint,
} from "lucide-react";
import { Destination } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface DestinationSidebarProps {
  destination: Destination;
}

export function DestinationSidebar({ destination }: DestinationSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Booking CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Plan Your Trip</h3>
          <p className="text-sm text-muted-foreground">
            Get the best deals on packages and hotels for {destination.name}.
          </p>
          <div className="space-y-2">
            <Link href="/contact" className="block w-full">
              <Button variant="primary" size="md" className="w-full">
                Book Package
              </Button>
            </Link>
            <Link href="/contact" className="block w-full">
              <Button variant="outline" size="md" className="w-full">
                Book Hotel
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Quick Facts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Quick Facts</h3>
          <div className="space-y-3">
            <FactRow icon={<Mountain size={16} />} label="Altitude" value={destination.altitude} />
            <FactRow icon={<Thermometer size={16} />} label="Weather" value={destination.weather} />
            <FactRow icon={<Calendar size={16} />} label="Best Time" value={destination.bestTime} />
            <FactRow icon={<Train size={16} />} label="Railway" value={destination.transportation.nearbyRailway} />
            <FactRow icon={<Plane size={16} />} label="Airport" value={destination.transportation.nearbyAirport} />
            <FactRow icon={<Wifi size={16} />} label="Internet" value={destination.internetSpeed} />
          </div>
        </Card>
      </motion.div>

      {/* Traveler Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Card className="p-6 space-y-3">
          <h3 className="text-lg font-semibold">Traveler Friendly</h3>
          <div className="flex flex-wrap gap-2">
            {destination.soloFriendly && <Badge variant="secondary">Solo</Badge>}
            {destination.coupleFriendly && <Badge variant="secondary">Couple</Badge>}
            {destination.familyFriendly && <Badge variant="secondary">Family</Badge>}
            {destination.seniorFriendly && <Badge variant="secondary">Senior</Badge>}
            {destination.petFriendly && <Badge variant="secondary">Pet</Badge>}
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            {destination.workationFriendly && (
              <div className="flex items-center gap-2">
                <Wifi size={14} /> Workation Friendly
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Emergency Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-6 space-y-3">
          <h3 className="text-lg font-semibold">Emergency Contacts</h3>
          <div className="space-y-2">
            {destination.emergencyContacts?.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{c.name}</span>
                <span className="font-medium">{c.phone}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Packing List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Backpack size={18} className="text-primary" />
            <h3 className="text-lg font-semibold">Packing List</h3>
          </div>
          <ul className="space-y-1.5">
            {destination.packingList?.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* Nearby Places */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6 space-y-3">
          <h3 className="text-lg font-semibold">Nearby Places</h3>
          <div className="space-y-3">
            {destination.nearbyPlaces.map((place, i) => (
              <div key={i} className="rounded-lg bg-muted p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{place.name}</span>
                  <Badge variant="ghost" className="text-xs">{place.distance}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{place.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </aside>
  );
}

function FactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <span className="font-medium text-foreground max-w-[60%] text-right">{value}</span>
    </div>
  );
}
