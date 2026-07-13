"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  UtensilsCrossed,
  MapPin,
  Star,
  Coffee,
} from "lucide-react";

interface TabEatProps {
  destination: Destination;
}

export function TabEat({ destination }: TabEatProps) {
  const restaurants = destination.restaurants || [];
  const cafes = destination.cafes || [];
  const streetFood = destination.streetFood || [];

  return (
    <Container className="space-y-10">
      {/* Restaurants */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-white">Restaurants</h2>
        {restaurants.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {restaurants.map((r) => (
              <Card key={r.id} className="flex gap-4 p-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image src={r.image || destination.heroImage} alt={r.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white truncate">{r.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[#F6C453]">
                      <Star className="h-3 w-3" /> {r.rating}
                    </div>
                  </div>
                  <p className="text-xs text-white/40">{r.cuisine} • {r.priceRange}</p>
                  <p className="mt-1 text-xs text-white/50 line-clamp-2">{r.description}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-white/40">Local restaurant listings coming soon.</Card>
        )}
      </section>

      {/* Cafes */}
      {cafes.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Cafes & Bakeries</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {cafes.map((c) => (
              <Card key={c.id} className="flex gap-4 p-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image src={c.image || destination.heroImage} alt={c.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white truncate">{c.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[#F6C453]">
                      <Star className="h-3 w-3" /> {c.rating}
                    </div>
                  </div>
                  <p className="text-xs text-white/40">Specialty: {c.specialty}</p>
                  <p className="mt-1 text-xs text-white/50">{c.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Street Food */}
      {streetFood.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Street Food & Local Eats</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {streetFood.map((s, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-[#F6C453]" />
                  <h3 className="font-semibold text-white">{s.name}</h3>
                </div>
                <p className="mt-1 text-sm text-white/50">{s.description}</p>
              </Card>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
