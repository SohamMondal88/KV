"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { destinations } from "@/lib/data";
import {
  Camera,
  MapPin,
  Sunrise,
  Sunset,
  Mountain,
  Eye,
  Aperture,
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  Compass,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoSpot {
  id: string;
  destinationSlug: string;
  name: string;
  description: string;
  type: "sunrise" | "sunset" | "panoramic" | "close-up" | "waterfall" | "tea-garden" | "village" | "wildlife";
  image: string;
  bestTime: string;
  cameraSettings: string;
  directions: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  altitude?: string;
}

/* ─── Curated photography spots from all destinations ─── */
const photoSpots: PhotoSpot[] = [
  {
    id: "ps-1",
    destinationSlug: "kalimpong",
    name: "Deolo Hill Sunrise Point",
    description: "Capture the first rays of sun painting the Kanchenjunga massif in golden light. The panoramic view spans from Sikkim to Bhutan.",
    type: "sunrise",
    image: "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=1200&auto=format&fit=crop",
    bestTime: "5:15 AM – 6:30 AM (winter); 4:45 AM – 5:45 AM (summer)",
    cameraSettings: "ISO 100-200, f/8-f/11, 1/60s, 24-70mm wide angle",
    directions: "Take the upper Deolo road past the observatory. The viewpoint is a 5-minute walk from the main gate.",
    difficulty: "Easy",
    altitude: "1,704m",
  },
  {
    id: "ps-2",
    destinationSlug: "pelling",
    name: "Sangachoeling Monastery Viewpoint",
    description: "Dramatic monastery silhouettes against the Himalayan ridge. Best during golden hour with prayer flags in the foreground.",
    type: "sunset",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    bestTime: "4:30 PM – 6:00 PM",
    cameraSettings: "ISO 400, f/5.6, 1/125s, 70-200mm telephoto for compression",
    directions: "Trek up from Pelling town (45 mins). The monastery is perched on a ridge with unobstructed western views.",
    difficulty: "Moderate",
    altitude: "2,150m",
  },
  {
    id: "ps-3",
    destinationSlug: "sandakphu",
    name: "Sleeping Buddha Panorama",
    description: "The only place on earth where you can see four of the five highest peaks in a single frame. The 'Sleeping Buddha' formation is legendary.",
    type: "panoramic",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    bestTime: "5:00 AM – 7:00 AM (clear mornings after overnight trek)",
    cameraSettings: "ISO 100, f/8-f/16, 1/30s, 14-24mm ultra-wide, tripod essential",
    directions: "Summit of Sandakphu trek. Reach by 4:30 AM to set up before sunrise.",
    difficulty: "Hard",
    altitude: "3,636m",
  },
  {
    id: "ps-4",
    destinationSlug: "chatakpur",
    name: "Rhododendron Forest Trail",
    description: "Ancient rhododendron trees create a tunnel of crimson and pink. Macro opportunities with forest floor details.",
    type: "close-up",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    bestTime: "March – April during bloom; 9:00 AM – 11:00 AM for diffused light",
    cameraSettings: "ISO 200-400, f/2.8-f/4, 1/250s, 50mm or 100mm macro",
    directions: "Follow the main trail from Chatakpur village into the Singalila National Park buffer zone.",
    difficulty: "Easy",
    altitude: "2,400m",
  },
  {
    id: "ps-5",
    destinationSlug: "ahaldhara",
    name: "Teesta River Gorge from Above",
    description: "Bird's-eye view of the Teesta River snaking through deep green gorges. Cloud formations add drama.",
    type: "panoramic",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    bestTime: "Post-monsoon (Oct-Nov) for clearest air; 6:00 AM – 8:00 AM",
    cameraSettings: "ISO 100, f/8, 1/125s, 24-70mm or drone (check permit rules)",
    directions: "Ahaldhara main viewpoint — accessible by road. Walk 200m to the cliff edge for the best angle.",
    difficulty: "Easy",
    altitude: "1,200m",
  },
  {
    id: "ps-6",
    destinationSlug: "mirik",
    name: "Sumendu Lake Reflections",
    description: "Mirror-perfect reflections of pine forests on the lake surface. Best on windless mornings.",
    type: "close-up",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    bestTime: "6:00 AM – 7:30 AM (calm water, golden light)",
    cameraSettings: "ISO 100, f/11, 1/60s, CPL filter recommended, 24-70mm",
    directions: "Walk the lake's eastern shore. The wooden bridge area offers the best reflection angles.",
    difficulty: "Easy",
    altitude: "1,495m",
  },
  {
    id: "ps-7",
    destinationSlug: "sittong",
    name: "Orange Orchard Backlight",
    description: "Sunlight streaming through orange trees laden with fruit. Ethereal backlighting with bokeh opportunities.",
    type: "close-up",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200&auto=format&fit=crop",
    bestTime: "December – January (harvest season); 7:00 AM – 9:00 AM",
    cameraSettings: "ISO 200, f/2.8-f/4, 1/500s, 85mm for creamy bokeh",
    directions: "Walk through the village orchards. Ask locals for the best trees in bloom/fruit.",
    difficulty: "Easy",
    altitude: "1,400m",
  },
  {
    id: "ps-8",
    destinationSlug: "kolakham",
    name: "Changey Falls Long Exposure",
    description: "A 300ft waterfall cascading through dense forest. Long exposure transforms water into silk.",
    type: "waterfall",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    bestTime: "Post-monsoon (Sep-Nov) for maximum flow; overcast days for even lighting",
    cameraSettings: "ISO 50-100, f/16, 1-4s, ND filter, tripod essential, 16-35mm",
    directions: "Trek from Kolakham village (45 mins). The trail is marked but can be slippery.",
    difficulty: "Moderate",
    altitude: "1,800m",
  },
  {
    id: "ps-9",
    destinationSlug: "lebong",
    name: "Tea Estate Aerial Layers",
    description: "Rolling tea gardens create hypnotic geometric patterns. Mist between hills adds depth.",
    type: "tea-garden",
    image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=1200&auto=format&fit=crop",
    bestTime: "Sunrise (5:30 AM – 7:00 AM) for side-lighting on the rows",
    cameraSettings: "ISO 200, f/8, 1/250s, 70-200mm for compressed layers, drone if permitted",
    directions: "Take the Lebong Cart Road. Stop at any elevated point overlooking the Happy Valley Estate.",
    difficulty: "Easy",
    altitude: "1,800m",
  },
  {
    id: "ps-10",
    destinationSlug: "rishikhola",
    name: "Riverside Camping at Blue Hour",
    description: "Tent lights reflecting on the river at dusk. The confluence of Rishi and Rangeet rivers creates a Y-shaped composition.",
    type: "panoramic",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
    bestTime: "Blue hour (6:00 PM – 6:45 PM) and golden hour (5:00 PM – 5:45 PM)",
    cameraSettings: "ISO 400-800, f/2.8-f/4, 1/30s-2s, 24-70mm, bring a headlamp for focus assist",
    directions: "Camp at the riverside ground near the confluence. The best angle is from the small rocky outcrop upstream.",
    difficulty: "Moderate",
    altitude: "600m",
  },
  {
    id: "ps-11",
    destinationSlug: "tinchuley",
    name: "Tinchuley Village Life",
    description: "Authentic village scenes: women carrying firewood, children walking to school, terraced farming. Documentary photography gold.",
    type: "village",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
    bestTime: "Early morning (6:00 AM – 8:00 AM) and late afternoon (4:00 PM – 5:30 PM)",
    cameraSettings: "ISO 400-800, f/2.8-f/5.6, 1/250s, 35mm or 50mm for natural perspective",
    directions: "Walk the village lanes. Be respectful — always ask before photographing people.",
    difficulty: "Easy",
    altitude: "1,800m",
  },
  {
    id: "ps-12",
    destinationSlug: "bijanbari",
    name: "Bijanbari Stream Cascades",
    description: "Multiple small cascades in a shaded ravine. Moss-covered rocks and ferns frame the water.",
    type: "waterfall",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    bestTime: "Monsoon (Jul-Aug) for volume; morning for soft light filtering through trees",
    cameraSettings: "ISO 400, f/5.6, 1/125s-1/30s, polarizer to cut glare on water, 24-70mm",
    directions: "Follow the stream from Bijanbari bazaar downstream for 15 minutes.",
    difficulty: "Easy",
    altitude: "760m",
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  sunrise: <Sunrise className="h-4 w-4" />,
  sunset: <Sunset className="h-4 w-4" />,
  panoramic: <Mountain className="h-4 w-4" />,
  "close-up": <Aperture className="h-4 w-4" />,
  waterfall: <Camera className="h-4 w-4" />,
  "tea-garden": <ImageIcon className="h-4 w-4" />,
  village: <Compass className="h-4 w-4" />,
  wildlife: <Eye className="h-4 w-4" />,
};

const typeLabels: Record<string, string> = {
  sunrise: "Sunrise",
  sunset: "Sunset",
  panoramic: "Panoramic",
  "close-up": "Close-Up / Macro",
  waterfall: "Waterfall",
  "tea-garden": "Tea Garden",
  village: "Village Life",
  wildlife: "Wildlife",
};

const difficultyColor: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-500/10",
  Moderate: "text-amber-400 bg-amber-500/10",
  Hard: "text-red-400 bg-red-500/10",
};

export default function PhotographySpotsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedSpot, setSelectedSpot] = useState<PhotoSpot | null>(null);

  const filters = ["all", ...Array.from(new Set(photoSpots.map((s) => s.type)))];

  const filtered = useMemo(() => {
    if (activeFilter === "all") return photoSpots;
    return photoSpots.filter((s) => s.type === activeFilter);
  }, [activeFilter]);

  const destMap = useMemo(() => {
    const map: Record<string, typeof destinations[0]> = {};
    destinations.forEach((d) => (map[d.slug] = d));
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <Container className="relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Camera className="mx-auto mb-4 h-10 w-10 text-[#F6C453]" />
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Photography Spots</h1>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-white/60">
              12 frame-worthy locations across the Himalayas — with exact camera settings, best times, and how to get there.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-10">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors",
                activeFilter === f
                  ? "border-[#F6C453]/50 bg-[#F6C453]/15 text-[#F6C453]"
                  : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              {f !== "all" && typeIcons[f]}
              {f === "all" ? "All Spots" : typeLabels[f] || f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((spot, i) => {
              const dest = destMap[spot.destinationSlug];
              return (
                <motion.div
                  key={spot.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Card
                    hoverLift
                    className="group cursor-pointer overflow-hidden"
                    onClick={() => setSelectedSpot(spot)}
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={spot.image}
                        alt={spot.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute left-3 top-3">
                        <Badge className="bg-black/50 text-white backdrop-blur-sm">
                          {typeIcons[spot.type]} <span className="ml-1">{typeLabels[spot.type]}</span>
                        </Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-white">{spot.name}</h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-white/70">
                          <MapPin className="h-3.5 w-3.5" />
                          {dest?.name || spot.destinationSlug}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Clock className="h-3.5 w-3.5" />
                        {spot.bestTime.split(";")[0]}
                      </div>
                      <Badge className={cn("text-xs", difficultyColor[spot.difficulty])}>
                        {spot.difficulty}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Container>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSpot && (
          <SpotModal spot={selectedSpot} onClose={() => setSelectedSpot(null)} destMap={destMap} />
        )}
      </AnimatePresence>
    </div>
  );
}

function SpotModal({
  spot,
  onClose,
  destMap,
}: {
  spot: PhotoSpot;
  onClose: () => void;
  destMap: Record<string, typeof destinations[0]>;
}) {
  const dest = destMap[spot.destinationSlug];
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-8 sm:items-center sm:pt-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
        {/* Image */}
        <div className="relative h-64 w-full sm:h-72">
          <Image src={spot.image} alt={spot.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <h2 className="text-2xl font-bold text-white">{spot.name}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {dest?.name}
              </span>
              {spot.altitude && (
                <span className="flex items-center gap-1">
                  <Mountain className="h-3.5 w-3.5" />
                  {spot.altitude}
                </span>
              )}
              <Badge className={cn("text-xs", difficultyColor[spot.difficulty])}>{spot.difficulty}</Badge>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-5 p-5 sm:p-6">
          <div>
            <p className="text-sm leading-relaxed text-white/70">{spot.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#F6C453]">
                <Sunrise className="h-4 w-4" /> Best Time
              </div>
              <p className="text-sm text-white/70">{spot.bestTime}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#F6C453]">
                <Aperture className="h-4 w-4" /> Camera Settings
              </div>
              <p className="text-sm text-white/70">{spot.cameraSettings}</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#F6C453]">
              <Compass className="h-4 w-4" /> How to Get There
            </div>
            <p className="text-sm text-white/70">{spot.directions}</p>
          </div>

          {dest && (
            <div className="flex gap-3">
              <Link href={`/destinations/${dest.slug}`} className="flex-1">
                <button className="w-full rounded-full bg-[#F6C453] px-4 py-2.5 text-sm font-semibold text-[#0B3D2E] transition-opacity hover:opacity-90">
                  View Destination
                </button>
              </Link>
              <Link href={`/packages?destination=${dest.slug}`} className="flex-1">
                <button className="w-full rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5">
                  View Packages
                </button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
