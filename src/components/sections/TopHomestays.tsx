"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { homestays } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { MapPin, Users, BedDouble, Bath } from "lucide-react";

export function TopHomestays() {
  return (
    <section className="py-20 bg-background">
      <Container>
        <div className="flex items-end justify-between">
          <SectionHeading
            title="Authentic Homestays"
            subtitle="Stay with local families and experience Himalayan hospitality at its finest."
            align="left"
            accentColor="bg-accent"
          />
          <Link
            href="/homestays"
            className="mb-1 hidden text-sm font-medium text-primary hover:underline sm:block"
          >
            View All
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homestays.map((homestay, index) => (
            <motion.div
              key={homestay.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden rounded-2xl border-0 bg-card shadow-md h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={homestay.image}
                    alt={homestay.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {homestay.name}
                    </h3>
                    <span className="shrink-0 text-lg font-bold text-primary">
                      ₹{homestay.pricePerNight}
                      <span className="text-xs font-normal text-muted-foreground">
                        /night
                      </span>
                    </span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {homestay.location}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <StarRating rating={homestay.rating} size={16} />
                    <span className="text-xs text-muted-foreground">
                      ({homestay.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {homestay.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {homestay.maxGuests} guests
                    </span>
                    <span className="flex items-center gap-1">
                      <BedDouble className="h-3.5 w-3.5" />
                      {homestay.bedrooms} BR
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5" />
                      {homestay.bathrooms} BA
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                    {homestay.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Host: <span className="font-medium text-foreground">{homestay.hostName}</span>
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/homestays"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All
          </Link>
        </div>
      </Container>
    </section>
  );
}
