"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, MapPin } from "lucide-react";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

interface DestinationAttractionsProps {
  destination: Destination;
}

export function DestinationAttractions({ destination }: DestinationAttractionsProps) {
  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading title="Nearby Attractions" align="left" className="mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destination.nearbyAttractions.map((attr, i) => (
            <motion.div
              key={attr.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden">
                <div className="h-40 w-full bg-muted flex items-center justify-center">
                  <MapPin size={32} className="text-muted-foreground/40" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary">{attr.category}</span>
                  <h3 className="mt-1 text-lg font-semibold">{attr.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{attr.description}</p>
                  {attr.distance && (
                    <p className="mt-2 text-xs text-muted-foreground">Distance: {attr.distance}</p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <SectionHeading title="KuboVista" align="left" className="mb-8 mt-14" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destination.KuboVista.map((gem, i) => (
            <motion.div
              key={gem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden border-primary/20">
                <div className="h-40 w-full bg-muted flex items-center justify-center">
                  <Camera size={32} className="text-muted-foreground/40" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{gem.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{gem.description}</p>
                  <p className="mt-2 text-sm font-medium text-primary">Why visit: {gem.whyVisit}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <SectionHeading title="Viewpoints" align="left" className="mb-8 mt-14" />
        <div className="grid gap-6 sm:grid-cols-2">
          {destination.viewpoints.map((vp, i) => (
            <motion.div
              key={vp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden">
                <div className="h-40 w-full bg-muted flex items-center justify-center">
                  <Camera size={32} className="text-muted-foreground/40" />
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    {vp.type}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{vp.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{vp.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
}
