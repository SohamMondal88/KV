"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { MapPin } from "lucide-react";
import { StaggerList } from "@/components/animations/GSAPScroll";
import { TextReveal, FloatingElement, HoverGlow } from "@/components/animations/MicroInteractions";

export function FeaturedDestinations() {
  const featured = destinations.filter((d) => d.featured).slice(0, 4);

  return (
    <section className="py-20 bg-background">
      <Container>
        <SectionHeading
          title={<TextReveal>Popular Destinations</TextReveal>}
          subtitle="Handpicked offbeat Himalayan destinations that promise authentic experiences and breathtaking views."
          align="center"
          accentColor="bg-accent"
        />

        <StaggerList
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          childClassName=""
          stagger={0.1}
          y={30}
        >
          {featured.map((destination, i) => (
            <FloatingElement key={destination.id} delay={i * 0.2} amplitude={6} duration={5}>
              <Card className="group overflow-hidden rounded-2xl border-0 bg-card shadow-md h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={destination.heroImage}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <MapPin className="h-3 w-3" />
                    {destination.state}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground">
                    {destination.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {destination.tagline}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <StarRating rating={destination.rating} size={16} />
                    <span className="text-xs text-muted-foreground">
                      ({destination.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="mt-4">
                    <Link href={`/destinations/${destination.slug}`}>
                      <HoverGlow glowColor="rgba(255,138,0,0.2)" glowSize={100}>
                        <Button variant="accent" size="sm" className="w-full">
                          Explore
                        </Button>
                      </HoverGlow>
                    </Link>
                  </div>
                </div>
              </Card>
            </FloatingElement>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}
