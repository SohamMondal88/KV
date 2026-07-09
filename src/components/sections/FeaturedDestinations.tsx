"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { MapPin } from "lucide-react";

export function FeaturedDestinations() {
  const featured = destinations.filter((d) => d.featured).slice(0, 4);

  return (
    <section className="py-20 bg-background">
      <Container>
        <SectionHeading
          title="Popular Destinations"
          subtitle="Handpicked offbeat Himalayan destinations that promise authentic experiences and breathtaking views."
          align="center"
          accentColor="bg-accent"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden rounded-2xl border-0 bg-card shadow-md">
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
                      <Button variant="accent" size="sm" className="w-full">
                        Explore
                      </Button>
                    </Link>
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
