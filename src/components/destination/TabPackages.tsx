"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/lib/types";
import { destinations, packages } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Package,
  MapPin,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";

interface TabPackagesProps {
  destination: Destination;
}

export function TabPackages({ destination }: TabPackagesProps) {
  // Find packages that include this destination
  const destPackages = packages.filter(
    (p) =>
      p.destinations.some(
        (d) => d.toLowerCase().includes(destination.name.toLowerCase()) || destination.name.toLowerCase().includes(d.toLowerCase())
      )
  );

  return (
    <Container className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Packages for {destination.name}</h2>
          <p className="mt-1 text-white/50">Curated trips that include this destination.</p>
        </div>
        <Link href="/packages">
          <Button variant="outline" size="sm">All Packages →</Button>
        </Link>
      </div>

      {destPackages.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destPackages.map((pkg) => (
            <Link key={pkg.id} href={`/packages/${pkg.slug}`}>
              <Card hoverLift className="group overflow-hidden">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3">
                    <Badge className="bg-black/50 text-white text-[10px] backdrop-blur-sm">{pkg.duration}</Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <h3 className="font-bold text-white">{pkg.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-white/50 line-clamp-2">{pkg.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-[#F6C453]">
                      <Star className="h-3 w-3" /> {pkg.rating}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">₹{pkg.price.toLocaleString()}</p>
                      {pkg.originalPrice > pkg.price && (
                        <p className="text-xs text-white/30 line-through">₹{pkg.originalPrice.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {pkg.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/40">{h}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <Package className="mx-auto mb-2 h-8 w-8 text-white/20" />
          <p className="text-white/40">No specific packages found for {destination.name}.</p>
          <Link href="/travel-planner">
            <Button variant="outline" className="mt-4">Plan a Custom Trip →</Button>
          </Link>
        </Card>
      )}
    </Container>
  );
}
