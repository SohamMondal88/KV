"use client";

import React from "react";
import Image from "next/image";
import { packages } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Clock, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/animations/GSAPScroll";

export function FeaturedPackages() {
  const featured = packages.filter((p) => p.featured);

  return (
    <section className="py-20 bg-muted/50">
      <Container>
        <SectionHeading
          title="Curated Travel Packages"
          subtitle="Thoughtfully designed itineraries that combine adventure, culture, and relaxation."
          align="center"
          accentColor="bg-accent"
        />

        <ScrollReveal y={30} duration={0.8}>
          <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {featured.map((pkg) => (
              <div
                key={pkg.id}
                className="w-[300px] shrink-0 snap-start sm:w-[340px]"
              >
                <Card className="group overflow-hidden rounded-2xl border-0 bg-card shadow-md h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="340px"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="accent">{pkg.type}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col p-5">
                    <h3 className="text-lg font-bold text-foreground">
                      {pkg.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {pkg.destinations.join(", ")}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {pkg.highlights.slice(0, 3).map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-end gap-2">
                      <span className="text-2xl font-bold text-foreground">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{pkg.originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <StarRating rating={pkg.rating} size={14} />
                      <span className="text-xs text-muted-foreground">
                        ({pkg.reviewCount})
                      </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <Button variant="accent" size="sm" className="w-full">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
