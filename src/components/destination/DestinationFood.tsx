"use client";

import React from "react";
import { motion } from "framer-motion";
import { Utensils, Coffee, ShoppingBag, Music } from "lucide-react";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";

interface DestinationFoodProps {
  destination: Destination;
}

export function DestinationFood({ destination }: DestinationFoodProps) {
  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading title="Local Cuisine" align="left" className="mb-8" />
        <div className="rounded-xl bg-card p-6 border border-border shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Utensils size={20} />
            </div>
            <h3 className="text-lg font-semibold">Must-Try Dishes</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {destination.localFood.map((item) => (
              <Badge key={item} variant="secondary">{item}</Badge>
            ))}
          </div>
        </div>

        <SectionHeading title="Restaurants" align="left" className="mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destination.restaurants.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden">
                <div className="h-40 w-full bg-muted flex items-center justify-center">
                  <Utensils size={32} className="text-muted-foreground/40" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{r.name}</h3>
                    <StarRating rating={r.rating} size={14} showValue />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.cuisine} • {r.priceRange}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <SectionHeading title="Cafes" align="left" className="mb-8 mt-14" />
        <div className="grid gap-6 sm:grid-cols-2">
          {destination.cafes.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden">
                <div className="h-40 w-full bg-muted flex items-center justify-center">
                  <Coffee size={32} className="text-muted-foreground/40" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{c.name}</h3>
                    <StarRating rating={c.rating} size={14} showValue />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Specialty: {c.specialty}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <SectionHeading title="Street Food" align="left" className="mb-8 mt-14" />
        <div className="grid gap-4">
          {destination.streetFood.map((sf, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-xl bg-card p-5 border border-border shadow-sm"
            >
              <div className="rounded-lg bg-accent/10 p-2 text-accent">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h4 className="text-base font-semibold">{sf.name}</h4>
                <p className="text-sm text-muted-foreground">{sf.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <SectionHeading title="Shopping" align="left" className="mb-8 mt-14" />
        <div className="grid gap-6 sm:grid-cols-2">
          {destination.shopping.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-secondary/10 p-2 text-secondary">
                    <ShoppingBag size={18} />
                  </div>
                  <h3 className="text-base font-semibold">{m.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{m.description}</p>
                <div className="flex flex-wrap gap-2">
                  {m.whatToBuy.map((item) => (
                    <Badge key={item} variant="outline">{item}</Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <SectionHeading title="Culture & Festivals" align="left" className="mb-8 mt-14" />
        <div className="rounded-xl bg-card p-6 border border-border shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary mt-0.5">
              <Music size={18} />
            </div>
            <div>
              <h4 className="text-base font-semibold">Culture</h4>
              <p className="text-sm text-muted-foreground">{destination.culture}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {destination.festivals.map((f) => (
              <Badge key={f} variant="accent">{f}</Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
