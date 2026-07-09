"use client";

import React from "react";
import { motion } from "framer-motion";
import { Train, Plane, Bus as BusIcon, Car, Bike, MapPin, Wallet } from "lucide-react";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

interface DestinationTransportProps {
  destination: Destination;
}

export function DestinationTransport({ destination }: DestinationTransportProps) {
  const modeIcon = (mode: string) => {
    switch (mode) {
      case "train": return <Train size={20} />;
      case "flight": return <Plane size={20} />;
      case "bus": return <BusIcon size={20} />;
      case "car": return <Car size={20} />;
      case "bike": return <Bike size={20} />;
      default: return <MapPin size={20} />;
    }
  };

  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading title="How to Reach" align="left" className="mb-8" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destination.transportation.howToReach.map((opt, i) => (
            <motion.div
              key={opt.mode}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    {modeIcon(opt.mode)}
                  </div>
                  <h3 className="text-base font-semibold capitalize">{opt.mode}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{opt.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {opt.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wallet size={14} />
                    {opt.cost}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon={<Train size={18} />} label="Nearby Railway" value={destination.transportation.nearbyRailway} />
          <InfoCard icon={<Plane size={18} />} label="Nearby Airport" value={destination.transportation.nearbyAirport} />
          <InfoCard icon={<Car size={18} />} label="Taxi Fare" value={destination.transportation.taxiFare} />
          <InfoCard icon={<Bike size={18} />} label="Bike Rental" value={destination.transportation.bikeRental} />
        </div>
      </motion.div>
    </Container>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-lg bg-secondary/10 p-2 text-secondary">{icon}</div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </Card>
  );
}
