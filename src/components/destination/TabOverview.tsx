"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Destination } from "@/lib/types";
import { destinations } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Mountain,
  MapPin,
  Thermometer,
  Clock,
  Star,
  Users,
  Eye,
  Camera,
  ArrowRight,
  Hotel,
  UtensilsCrossed,
  Compass,
  Map,
} from "lucide-react";

interface TabOverviewProps {
  destination: Destination;
  onTabChange: (tab: string) => void;
}

export function TabOverview({ destination, onTabChange }: TabOverviewProps) {
  const related = destinations
    .filter((d) => d.id !== destination.id && d.state === destination.state)
    .slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Introduction */}
      <section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-white">About {destination.name}</h2>
              <p className="leading-relaxed text-white/70">{destination.introduction}</p>
              <p className="leading-relaxed text-white/50 text-sm">{destination.history}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {destination.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs capitalize">{tag}</Badge>
                ))}
              </div>
            </div>
            <Card className="p-5 space-y-3">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Quick Facts</h3>
              <Fact icon={Mountain} label="Altitude" value={destination.altitude} />
              <Fact icon={Thermometer} label="Weather" value={destination.weather} />
              <Fact icon={Clock} label="Best Time" value={destination.bestTime} />
              <Fact icon={Star} label="Rating" value={`${destination.rating} (${destination.reviewCount} reviews)`} />
              <Fact icon={Users} label="Ideal For" value={getIdealFor(destination)} />
            </Card>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section>
        <Container>
          <h3 className="mb-4 text-lg font-bold text-white">Gallery</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-2xl sm:aspect-auto">
              <Image src={destination.heroImage} alt={destination.name} fill className="object-cover" sizes="50vw" />
            </div>
            {destination.galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={img} alt={`${destination.name} ${i + 1}`} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quick Access Cards */}
      <section>
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickCard
              icon={Hotel}
              title="Where to Stay"
              subtitle={`${destination.name} hotels & homestays`}
              onClick={() => onTabChange("stay")}
            />
            <QuickCard
              icon={UtensilsCrossed}
              title="Where to Eat"
              subtitle="Restaurants, cafes & street food"
              onClick={() => onTabChange("eat")}
            />
            <QuickCard
              icon={Compass}
              title="Things to Do"
              subtitle="Attractions, activities & KuboVista"
              onClick={() => onTabChange("things-to-do")}
            />
            <QuickCard
              icon={Map}
              title="Map"
              subtitle="Explore on the interactive map"
              onClick={() => onTabChange("map")}
            />
          </div>
        </Container>
      </section>

      {/* Nearby */}
      <section>
        <Container>
          <h3 className="mb-4 text-lg font-bold text-white">Nearby Places</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {destination.nearbyPlaces.map((place, i) => (
              <Card key={i} className="p-4">
                <h4 className="font-semibold text-white">{place.name}</h4>
                <Badge variant="ghost" className="mt-1 text-[10px]">{place.distance}</Badge>
                <p className="mt-2 text-sm text-white/50">{place.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Related in State */}
      {related.length > 0 && (
        <section>
          <Container>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">More in {destination.state}</h3>
              <Link href="/destinations" className="text-xs text-[#F6C453] hover:underline">View all →</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((d) => (
                <Link key={d.id} href={`/destinations/${d.slug}`}>
                  <Card hoverLift className="group overflow-hidden">
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image src={d.heroImage} alt={d.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <h4 className="font-bold text-white">{d.name}</h4>
                        <p className="text-xs text-white/70">{d.tagline}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}

/* ─── Sub-components ─── */

function Fact({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-white/40">
        <Icon className="h-4 w-4 text-[#F6C453]" />
        {label}
      </div>
      <span className="text-white text-right max-w-[55%]">{value}</span>
    </div>
  );
}

function QuickCard({
  icon: Icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F6C453]/10">
        <Icon className="h-5 w-5 text-[#F6C453]" />
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/40">{subtitle}</p>
      </div>
      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-white/20" />
    </button>
  );
}

function getIdealFor(dest: Destination): string {
  const types: string[] = [];
  if (dest.soloFriendly) types.push("Solo");
  if (dest.coupleFriendly) types.push("Couples");
  if (dest.familyFriendly) types.push("Families");
  if (dest.seniorFriendly) types.push("Seniors");
  return types.join(", ") || "All travelers";
}
