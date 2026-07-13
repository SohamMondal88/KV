"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Hotel,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Mountain,
} from "lucide-react";

interface TabStayProps {
  destination: Destination;
}

export function TabStay({ destination }: TabStayProps) {
  // Mock hotels for this destination
  const hotels = [
    {
      name: `${destination.name} Heritage Resort`,
      type: "Resort",
      price: "₹3,500/night",
      rating: 4.5,
      image: destination.heroImage,
      amenities: ["WiFi", "Restaurant", "Parking", "View"],
    },
    {
      name: `Mountain View Homestay`,
      type: "Homestay",
      price: "₹1,800/night",
      rating: 4.7,
      image: destination.galleryImages[0] || destination.heroImage,
      amenities: ["Home-cooked meals", "Bonfire", "Garden"],
    },
    {
      name: `The ${destination.name} Retreat`,
      type: "Boutique Hotel",
      price: "₹5,200/night",
      rating: 4.8,
      image: destination.galleryImages[1] || destination.heroImage,
      amenities: ["Spa", "Restaurant", "Bar", "WiFi"],
    },
  ];

  return (
    <Container className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Where to Stay in {destination.name}</h2>
          <p className="mt-1 text-white/50">From luxury resorts to cozy homestays — find your perfect stay.</p>
        </div>
        <Link href="/hotels">
          <Button variant="outline" size="sm">View All Hotels →</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {hotels.map((h, i) => (
          <Card key={i} className="flex flex-col gap-4 overflow-hidden p-0 sm:flex-row">
            <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-64">
              <Image src={h.image} alt={h.name} fill className="object-cover" sizes="300px" />
            </div>
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">{h.type}</Badge>
                    <div className="flex items-center gap-1 text-xs text-[#F6C453]">
                      <Star className="h-3 w-3" /> {h.rating}
                    </div>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white">{h.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{h.price}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {h.amenities.map((a) => (
                  <span key={a} className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-white/50">{a}</span>
                ))}
              </div>
              <div className="mt-auto flex gap-2 pt-4">
                <Link href="/hotels" className="flex-1">
                  <Button size="sm" className="w-full">Check Availability</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5 text-center">
        <Mountain className="mx-auto mb-2 h-6 w-6 text-[#F6C453]" />
        <p className="text-sm text-white/60">
          Want to list your property? <Link href="/join/homestay" className="text-[#F6C453] hover:underline">Join as a host →</Link>
        </p>
      </Card>
    </Container>
  );
}
