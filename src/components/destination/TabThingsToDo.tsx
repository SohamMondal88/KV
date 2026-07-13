"use client";

import React from "react";
import Image from "next/image";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Compass,
  Mountain,
  Eye,
  TreePine,
  Droplets,
  Footprints,
} from "lucide-react";

interface TabThingsToDoProps {
  destination: Destination;
}

export function TabThingsToDo({ destination }: TabThingsToDoProps) {
  const attractions = destination.nearbyAttractions || [];
  const hiddenGems = destination.KuboVista || [];
  const viewpoints = destination.viewpoints || [];
  const activities = destination.adventureActivities || [];

  return (
    <Container className="space-y-10">
      {/* Attractions */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-white">Attractions</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {attractions.map((a) => (
            <Card key={a.id} className="overflow-hidden">
              <div className="relative h-40 w-full">
                <Image src={a.image || destination.heroImage} alt={a.name} fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-3 top-3">
                  <Badge className="bg-black/50 text-white text-[10px] backdrop-blur-sm">{a.category}</Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-bold text-white">{a.name}</h3>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-white/50">{a.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Hidden Gems */}
      {hiddenGems.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Hidden Gems</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {hiddenGems.map((g) => (
              <Card key={g.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F6C453]/10">
                    <Eye className="h-4 w-4 text-[#F6C453]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{g.name}</h3>
                    <p className="mt-1 text-sm text-white/50">{g.description}</p>
                    <p className="mt-1 text-xs text-[#F6C453]">Why visit: {g.whyVisit}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Viewpoints */}
      {viewpoints.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Viewpoints</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {viewpoints.map((v) => (
              <Card key={v.id} className="p-4">
                <div className="flex items-center gap-2">
                  <Mountain className="h-4 w-4 text-[#F6C453]" />
                  <h3 className="font-semibold text-white">{v.name}</h3>
                  <Badge variant="outline" className="text-[10px] capitalize">{v.type}</Badge>
                </div>
                <p className="mt-2 text-sm text-white/50">{v.description}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Adventure */}
      {activities.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Adventure Activities</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {activities.map((a) => (
              <Card key={a.id} className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{a.name}</h3>
                  <Badge className="bg-[#F6C453]/10 text-[#F6C453] text-[10px]">{a.price}</Badge>
                </div>
                <p className="mt-1 text-sm text-white/50">{a.description}</p>
                <div className="mt-2 flex gap-3 text-xs text-white/40">
                  <span>Difficulty: {a.difficulty}</span>
                  <span>Duration: {a.duration}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
