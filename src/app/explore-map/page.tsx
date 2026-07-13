"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { destinations } from "@/lib/data";
import {
  MapPin,
  Mountain,
  ChevronLeft,
  Search,
  Navigation,
  TreePine,
  Waves,
  Snowflake,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ViewLevel = "india" | "state" | "destination";

const stateGroups: Record<string, { name: string; destinations: typeof destinations }> = {
  "west-bengal": {
    name: "West Bengal",
    destinations: destinations.filter((d) => d.state === "West Bengal"),
  },
  sikkim: {
    name: "Sikkim",
    destinations: destinations.filter((d) => d.state === "Sikkim"),
  },
};

export default function ExploreMapPage() {
  const [view, setView] = useState<ViewLevel>("india");
  const [activeState, setActiveState] = useState<string | null>(null);
  const [activeDestination, setActiveDestination] = useState<typeof destinations[0] | null>(null);
  const [filter, setFilter] = useState("all");

  const currentDestinations = activeState
    ? stateGroups[activeState].destinations
    : destinations;

  const filtered = filter === "all"
    ? currentDestinations
    : currentDestinations.filter((d) => d.tags.includes(filter));

  const selectState = (key: string) => {
    setActiveState(key);
    setView("state");
  };

  const selectDestination = (dest: typeof destinations[0]) => {
    setActiveDestination(dest);
    setView("destination");
  };

  const goBack = () => {
    if (view === "destination") {
      setView("state");
      setActiveDestination(null);
    } else if (view === "state") {
      setView("india");
      setActiveState(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      {/* Header */}
      <section className="border-b border-white/10 py-12">
        <Container className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            Explore the Himalayas
          </motion.h1>
          <p className="mt-2 text-white/60">
            Click on the map to discover hidden destinations
          </p>
        </Container>
      </section>

      <Container className="py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-white/50">
          {view !== "india" && (
            <button onClick={goBack} className="flex items-center gap-1 hover:text-[#F6C453]">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          )}
          <span className={cn(view === "india" && "text-[#F6C453]")}>India</span>
          {activeState && <> <span>/</span> <span className={cn(view === "state" && "text-[#F6C453]")}>{stateGroups[activeState]?.name}</span></>}
          {activeDestination && <> <span>/</span> <span className="text-[#F6C453]">{activeDestination.name}</span></>}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {view === "india" && (
                <IndiaView key="india" onSelectState={selectState} />
              )}
              {view === "state" && activeState && (
                <StateView
                  key="state"
                  state={stateGroups[activeState]}
                  onSelectDestination={selectDestination}
                />
              )}
              {view === "destination" && activeDestination && (
                <DestinationView key="dest" destination={activeDestination} />
              )}
            </AnimatePresence>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">
                {activeState ? stateGroups[activeState].name : "All Destinations"}
              </h3>
              <div className="mb-3 flex flex-wrap gap-1">
                {["all", "mountains", "nature", "culture", "photography", "trekking"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "rounded-md px-2 py-1 text-xs transition-colors",
                      filter === f
                        ? "bg-[#F6C453]/20 text-[#F6C453]"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {filtered.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => selectDestination(d)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors",
                      activeDestination?.id === d.id
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    )}
                  >
                    <Image
                      src={d.heroImage}
                      alt={d.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{d.name}</p>
                      <p className="text-xs text-white/40">{d.state} &bull; {d.rating}⭐</p>
                    </div>
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-white/30" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ─── India SVG Map ─── */
function IndiaView({ onSelectState }: { onSelectState: (s: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 min-h-[500px]"
    >
      <svg viewBox="0 0 400 500" className="w-full max-w-md">
        {/* India silhouette */}
        <path
          d="M120,450 C100,420 80,380 85,340 C90,300 70,260 75,220 C80,180 60,140 70,100 C75,80 90,60 120,50 C150,40 180,45 200,55 C220,65 240,60 260,70 C280,80 300,90 310,110 C320,130 315,150 310,170 C305,190 315,210 310,230 C305,250 315,270 310,290 C305,310 315,330 310,350 C305,370 310,390 300,410 C290,430 280,450 270,470"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
        <path
          d="M120,450 C100,420 80,380 85,340 C90,300 70,260 75,220 C80,180 60,140 70,100 C75,80 90,60 120,50 C150,40 180,45 200,55 C220,65 240,60 260,70 C280,80 300,90 310,110 C320,130 315,150 310,170 C305,190 315,210 310,230 C305,250 315,270 310,290 C305,310 315,330 310,350 C305,370 310,390 300,410 C290,430 280,450 270,470 L120,450Z"
          fill="rgba(255,255,255,0.03)"
        />

        {/* West Bengal */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectState("west-bengal")}
        >
          <circle cx="280" cy="220" r="24" fill="rgba(246,196,83,0.15)">
            <animate attributeName="r" values="24;28;24" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="280" cy="220" r="8" fill="#F6C453"/>
          <text x="280" y="255" textAnchor="middle" fill="#F6C453" fontSize="12" fontFamily="General Sans">West Bengal</text>
          <text x="280" y="270" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">15 Destinations</text>
        </g>

        {/* Sikkim */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectState("sikkim")}
        >
          <circle cx="300" cy="180" r="20" fill="rgba(246,196,83,0.15)">
            <animate attributeName="r" values="20;24;20" dur="3s" repeatCount="indefinite" begin="1.5s"/>
          </circle>
          <circle cx="300" cy="180" r="6" fill="#F6C453"/>
          <text x="300" y="215" textAnchor="middle" fill="#F6C453" fontSize="12" fontFamily="General Sans">Sikkim</text>
          <text x="300" y="230" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">2 Destinations</text>
        </g>
      </svg>

      <p className="mt-4 text-sm text-white/40">Click a highlighted region to explore</p>
    </motion.div>
  );
}

/* ─── State View with Destination Dots ─── */
function StateView({
  state,
  onSelectDestination,
}: {
  state: { name: string; destinations: typeof destinations };
  onSelectDestination: (d: typeof destinations[0]) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 min-h-[500px]"
    >
      <h2 className="mb-6 text-xl font-bold text-white">{state.name}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.destinations.map((d, i) => (
          <motion.button
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelectDestination(d)}
            className="group relative overflow-hidden rounded-xl border border-white/10 text-left transition-all hover:border-[#F6C453]/30"
          >
            <div className="relative h-32">
              <Image src={d.heroImage} alt={d.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-2 left-2">
                <p className="font-bold text-white">{d.name}</p>
                <p className="text-xs text-white/70">{d.altitude}</p>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs text-white/50 line-clamp-2">{d.tagline}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-[#F6C453]">{d.rating} ⭐</span>
                <span className="text-xs text-white/30">{d.reviewCount} reviews</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Destination Detail in Map View ─── */
function DestinationView({ destination }: { destination: typeof destinations[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
    >
      <div className="relative h-64">
        <Image src={destination.heroImage} alt={destination.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-2xl font-bold text-white">{destination.name}</h2>
          <p className="text-sm text-white/70">{destination.tagline}</p>
        </div>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
          <Mountain className="mx-auto h-5 w-5 text-[#F6C453]" />
          <p className="mt-1 text-lg font-bold text-white">{destination.altitude}</p>
          <p className="text-xs text-white/40">Altitude</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
          <Camera className="mx-auto h-5 w-5 text-[#F6C453]" />
          <p className="mt-1 text-lg font-bold text-white">{destination.rating}</p>
          <p className="text-xs text-white/40">Rating</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
          <TreePine className="mx-auto h-5 w-5 text-[#F6C453]" />
          <p className="mt-1 text-lg font-bold text-white">{destination.bestTime}</p>
          <p className="text-xs text-white/40">Best Time</p>
        </div>
      </div>

      <div className="flex gap-3 p-6 pt-0">
        <Link href={`/destinations/${destination.slug}`} className="flex-1">
          <Button className="w-full">View Details</Button>
        </Link>
        <Link href={`/packages?destination=${destination.slug}`} className="flex-1">
          <Button variant="outline" className="w-full">View Packages</Button>
        </Link>
      </div>
    </motion.div>
  );
}
