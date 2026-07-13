"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Tent,
  MapPin,
  Thermometer,
  Shield,
  Flame,
  Mountain,
  Backpack,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  AlertTriangle,
  Droplets,
  Sun,
  Moon,
  Wind,
  TreePine,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface CampingSpot {
  id: string;
  name: string;
  destination: string;
  description: string;
  image: string;
  altitude: string;
  bestSeason: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  permitRequired: boolean;
  amenities: string[];
  safetyNotes: string[];
  nearbyAttractions: string[];
}

/* ─── Data ─── */
const campingSpots: CampingSpot[] = [
  {
    id: "cs-1",
    name: "Rishikhola Riverside Camp",
    destination: "Rishikhola",
    description: "Camp right by the confluence of Rishi and Rangeet rivers. The sound of flowing water, starlit skies, and riverside bonfires make this a soul-stirring experience.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
    altitude: "600m",
    bestSeason: "Oct – Mar",
    difficulty: "Easy",
    permitRequired: false,
    amenities: ["Bonfire pits", "Tent rental", "Basic toilets", "Filtered water"],
    safetyNotes: ["Keep food sealed — monkeys active", "River can swell during monsoon", "Carry insect repellent"],
    nearbyAttractions: ["River confluence", "Forest trails", "Village homestays"],
  },
  {
    id: "cs-2",
    name: "Kolakham Forest Camp",
    destination: "Kolakham",
    description: "Camp in an oak-rhododendron forest with uninterrupted views of Kanchenjunga. Wake up to birdsong and the golden glow of the world's third-highest peak.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    altitude: "1,800m",
    bestSeason: "Mar – May, Oct – Nov",
    difficulty: "Moderate",
    permitRequired: false,
    amenities: ["Guided treks", "Meals available", "First-aid kit", "Solar charging"],
    safetyNotes: ["Cold nights — bring sleeping bag rated 0°C", "Leeches in monsoon", "No phone signal"],
    nearbyAttractions: ["Changey Falls", "Kanchenjunga viewpoint", "Birdwatching trails"],
  },
  {
    id: "cs-3",
    name: "Sandakphu Summit Camp",
    destination: "Sandakphu",
    description: "The ultimate high-altitude camping experience. Sleep at 3,636m under a blanket of stars with four of the five highest peaks visible at sunrise.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    altitude: "3,636m",
    bestSeason: "Apr – May, Oct – Nov",
    difficulty: "Hard",
    permitRequired: true,
    amenities: ["Tea huts nearby", "Shared dormitories", "Guides mandatory", "Oxygen cylinders on request"],
    safetyNotes: ["Altitude sickness risk — acclimatize", "Temperature drops to -10°C", "Carry extra batteries (cold drains power)", "No firewood at altitude — use stove"],
    nearbyAttractions: ["Sleeping Buddha viewpoint", "Phalut trek", "Singalila National Park"],
  },
  {
    id: "cs-4",
    name: "Chatakpur Eco-Camp",
    destination: "Chatakpur",
    description: "A community-run eco-camp inside a rhododendron sanctuary. Zero-waste philosophy with compost toilets and solar everything.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    altitude: "2,400m",
    bestSeason: "Mar – May, Sep – Nov",
    difficulty: "Easy",
    permitRequired: false,
    amenities: ["Solar showers", "Compost toilets", "Organic meals", "Nature walks"],
    safetyNotes: ["Respect wildlife — do not feed animals", "No loud music", "Pack out all waste"],
    nearbyAttractions: ["Singalila trail", "Rhododendron forest", "Dawaipani village"],
  },
  {
    id: "cs-5",
    name: "Mirik Pine Camp",
    destination: "Mirik",
    description: "Relaxed lakeside camping under dense pine cover. Perfect for families and first-time campers who want comfort with nature.",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200&auto=format&fit=crop",
    altitude: "1,495m",
    bestSeason: "Year-round",
    difficulty: "Easy",
    permitRequired: false,
    amenities: ["Family tents", "Hot meals", "Clean toilets", "Boating access", "Parking"],
    safetyNotes: ["Lake is cold — no swimming without guide", "Secure food at night", "Weather can change quickly"],
    nearbyAttractions: ["Sumendu Lake", "Pashupati Market", "Tea gardens"],
  },
  {
    id: "cs-6",
    name: "Sittong Orange Grove Camp",
    destination: "Sittong",
    description: "Camp amidst orange orchards where the air smells of citrus. A unique low-altitude camping experience with village hospitality.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    altitude: "1,400m",
    bestSeason: "Dec – Jan (orange season)",
    difficulty: "Easy",
    permitRequired: false,
    amenities: ["Orange orchard access", "Village meals", "Bonfire", "Local storytelling"],
    safetyNotes: ["Slippery paths in dew", "Respect private orchards — ask before picking", "Mosquitoes near water"],
    nearbyAttractions: ["Orange orchards", "Namthing Pokhari", "Ahaldhara viewpoint"],
  },
];

const difficultyConfig: Record<string, { color: string; bg: string } > = {
  Easy: { color: "text-emerald-400", bg: "bg-emerald-500/10" },
  Moderate: { color: "text-amber-400", bg: "bg-amber-500/10" },
  Hard: { color: "text-red-400", bg: "bg-red-500/10" },
};

export default function CampingGuidePage() {
  const [selectedSpot, setSelectedSpot] = useState<CampingSpot | null>(null);
  const [filter, setFilter] = useState<"all" | "Easy" | "Moderate" | "Hard">("all");

  const filtered = filter === "all" ? campingSpots : campingSpots.filter((s) => s.difficulty === filter);

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <Container className="relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Tent className="mx-auto mb-4 h-10 w-10 text-[#F6C453]" />
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Camping Guide</h1>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-white/60">
              Sleep under the stars in the Himalayas. Curated campsites with safety tips, gear lists, and everything you need to know.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-10">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(["all", "Easy", "Moderate", "Hard"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                filter === f
                  ? "border-[#F6C453]/50 bg-[#F6C453]/15 text-[#F6C453]"
                  : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              {f === "all" ? "All Campsites" : f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((spot, i) => {
              const cfg = difficultyConfig[spot.difficulty];
              return (
                <motion.div
                  key={spot.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    hoverLift
                    className="group cursor-pointer overflow-hidden"
                    onClick={() => setSelectedSpot(spot)}
                  >
                    <div className="relative h-52 w-full overflow-hidden">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute left-3 top-3">
                        <Badge className={cn("border-0", cfg.bg, cfg.color)}>{spot.difficulty}</Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-white">{spot.name}</h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-white/70">
                          <MapPin className="h-3.5 w-3.5" />
                          {spot.destination} <span className="text-white/40">•</span> {spot.altitude}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="line-clamp-2 text-sm text-white/50">{spot.description}</p>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="flex items-center gap-1 text-xs text-white/40">
                          <Sun className="h-3 w-3" /> {spot.bestSeason}
                        </span>
                        {spot.permitRequired && (
                          <Badge variant="outline" className="text-[10px] text-red-300 border-red-300/20">
                            Permit Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Essential Gear Section */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Essential Camping Gear</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Tent,
                title: "Shelter",
                items: ["4-season tent (for high altitude)", "Groundsheet", "Tent pegs & guy lines", "Footprint"],
              },
              {
                icon: Thermometer,
                title: "Sleep System",
                items: ["Sleeping bag (rated -5°C to 0°C)", "Insulated sleeping pad", "Inflatable pillow", "Thermal liner"],
              },
              {
                icon: Flame,
                title: "Cooking",
                items: ["Portable stove + fuel", "Lightweight cookware", "Spork & mug", "Water filter/purifier"],
              },
              {
                icon: Backpack,
                title: "Safety & Misc",
                items: ["First-aid kit", "Headlamp + batteries", "Multi-tool", "Whistle + mirror"],
              },
            ].map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.title} className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6C453]/10">
                      <Icon className="h-4 w-4 text-[#F6C453]" />
                    </div>
                    <h3 className="font-semibold text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Safety Rules */}
        <div className="mt-12 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h2 className="text-lg font-bold text-red-300">Himalayan Camping Safety Rules</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Always inform someone of your camping location and expected return.",
              "Never camp alone above 3,000m without a guide.",
              "Store food in sealed containers — away from your tent.",
              "Check weather forecasts 24 hours before departure.",
              "Carry extra layers — mountain weather changes in minutes.",
              "Leave no trace. Pack out everything you pack in.",
              "Respect local customs — ask before camping near villages.",
              "If you feel altitude sickness symptoms, descend immediately.",
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                {rule}
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-xs text-red-300">
            <Phone className="h-3.5 w-3.5" />
            Emergency Helpline: Dial 108 (Ambulance) or 1070 (Disaster Management) — available 24/7 across the region.
          </div>
        </div>
      </Container>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSpot && (
          <SpotDetailModal spot={selectedSpot} onClose={() => setSelectedSpot(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function SpotDetailModal({ spot, onClose }: { spot: CampingSpot; onClose: () => void }) {
  const cfg = difficultyConfig[spot.difficulty];
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-8 sm:items-center sm:pt-0">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B3D2E] shadow-2xl"
      >
        <div className="relative h-56 sm:h-64">
          <img src={spot.image} alt={spot.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white">
            <XCircle className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-5">
            <h2 className="text-2xl font-bold text-white">{spot.name}</h2>
            <div className="mt-1 flex items-center gap-2 text-sm text-white/70">
              <MapPin className="h-3.5 w-3.5" /> {spot.destination}
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-white/70">{spot.description}</p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <Mountain className="mx-auto mb-1 h-4 w-4 text-[#F6C453]" />
              <p className="text-sm font-bold text-white">{spot.altitude}</p>
              <p className="text-[10px] text-white/40">Altitude</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <Sun className="mx-auto mb-1 h-4 w-4 text-[#F6C453]" />
              <p className="text-sm font-bold text-white">{spot.bestSeason}</p>
              <p className="text-[10px] text-white/40">Best Season</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <Shield className="mx-auto mb-1 h-4 w-4 text-[#F6C453]" />
              <p className="text-sm font-bold text-white">{spot.difficulty}</p>
              <p className="text-[10px] text-white/40">Difficulty</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <CheckCircle2 className={cn("mx-auto mb-1 h-4 w-4", spot.permitRequired ? "text-red-400" : "text-emerald-400")} />
              <p className="text-sm font-bold text-white">{spot.permitRequired ? "Required" : "Not Required"}</p>
              <p className="text-[10px] text-white/40">Permit</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#F6C453]">
                <Backpack className="h-4 w-4" /> Amenities
              </div>
              <ul className="space-y-1">
                {spot.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-1.5 text-xs text-white/60">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" /> {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-300">
                <AlertTriangle className="h-4 w-4" /> Safety Notes
              </div>
              <ul className="space-y-1">
                {spot.safetyNotes.map((s) => (
                  <li key={s} className="flex items-center gap-1.5 text-xs text-white/60">
                    <Shield className="h-3 w-3 text-red-400" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#F6C453]">
              <TreePine className="h-4 w-4" /> Nearby Attractions
            </div>
            <div className="flex flex-wrap gap-2">
              {spot.nearbyAttractions.map((a) => (
                <Badge key={a} variant="outline" className="text-xs">{a}</Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
