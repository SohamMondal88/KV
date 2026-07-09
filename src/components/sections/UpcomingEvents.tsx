"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { events } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CalendarDays, MapPin } from "lucide-react";

const typeLabel: Record<string, string> = {
  festival: "Festival",
  cultural: "Cultural",
  adventure: "Adventure",
  seasonal: "Seasonal",
};

const typeVariant: Record<
  string,
  "default" | "primary" | "secondary" | "accent" | "outline" | "ghost"
> = {
  festival: "accent",
  cultural: "primary",
  adventure: "secondary",
  seasonal: "outline",
};

export function UpcomingEvents() {
  return (
    <section className="py-20 bg-background">
      <Container>
        <SectionHeading
          title="Festivals & Events"
          subtitle="Immerse yourself in the vibrant culture and seasonal celebrations of the Himalayas."
          align="center"
          accentColor="bg-accent"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((evt, index) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden rounded-2xl border-0 bg-card shadow-md h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={evt.image}
                    alt={evt.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant={typeVariant[evt.type] || "default"}>
                      {typeLabel[evt.type] || evt.type}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground">{evt.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {evt.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {evt.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {evt.location}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
