"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Share2, Bookmark, ChevronRight } from "lucide-react";
import { Destination } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";

interface DestinationHeroProps {
  destination: Destination;
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full">
      {/* Breadcrumb */}
      <div className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
          <nav className="flex items-center gap-2 text-sm text-white/80">
            <span className="cursor-pointer hover:text-white" onClick={() => window.location.href = "/"}>Home</span>
            <ChevronRight size={14} />
            <span className="cursor-pointer hover:text-white" onClick={() => window.location.href = "/destinations"}>Destinations</span>
            <ChevronRight size={14} />
            <span className="text-white font-medium">{destination.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden md:h-[60vh]">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 pb-8 md:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-3">
                <MapPin size={12} className="mr-1" />
                {destination.state}
              </Badge>
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {destination.name}
              </h1>
              <p className="mt-2 max-w-2xl text-base text-white/90 sm:text-lg md:text-xl">
                {destination.tagline}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                  <StarRating rating={destination.rating} size={16} showValue />
                  <span className="text-sm text-white/80">({destination.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm text-sm text-white/90">
                  <MapPin size={14} />
                  {destination.district}, {destination.state}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {destination.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="outline" className="border-white/30 text-white bg-white/10">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  variant="accent"
                  size="md"
                  onClick={() => scrollToSection("overview")}
                >
                  Explore Details
                </Button>
                <Button variant="outline" size="md" className="border-white/30 text-white bg-white/10 hover:bg-white/20">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="md" className="border-white/30 text-white bg-white/10 hover:bg-white/20">
                  <Bookmark size={16} className="mr-2" />
                  Save
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
