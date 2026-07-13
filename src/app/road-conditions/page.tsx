"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  CloudRain,
  Eye,
  MapPin,
  Mountain,
  Navigation,
  Phone,
  RefreshCw,
  Shield,
  Snowflake,
  Sun,
  TrafficCone,
  TrendingDown,
  TrendingUp,
  Wind,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface RoadSegment {
  id: string;
  from: string;
  to: string;
  distance: string;
  status: "open" | "caution" | "closed" | "under-repair";
  condition: string;
  lastUpdated: string;
  alerts: string[];
  weather: {
    temp: number;
    condition: "sunny" | "cloudy" | "rain" | "snow" | "fog";
    visibility: string;
  };
  landmarks: string[];
  altitudeGain: string;
  surface: "Asphalt" | "Gravel" | "Mixed" | "Unpaved";
}

/* ─── Demo data ─── */
const roadSegments: RoadSegment[] = [
  {
    id: "r1",
    from: "Siliguri (NJP)",
    to: "Kalimpong",
    distance: "70 km",
    status: "open",
    condition: "Good — recently maintained",
    lastUpdated: "2 hours ago",
    alerts: [],
    weather: { temp: 18, condition: "sunny", visibility: "Clear" },
    landmarks: ["Coronation Bridge", "Teesta River", "Deolo Hill approach"],
    altitudeGain: "+1,200m",
    surface: "Asphalt",
  },
  {
    id: "r2",
    from: "Kalimpong",
    to: "Pelling (Sikkim)",
    distance: "110 km",
    status: "caution",
    condition: "Narrow sections near Jorethang — drive slowly",
    lastUpdated: "30 mins ago",
    alerts: ["Landslide-prone zone at 12km mark", "Single-lane bridge after Reshi"],
    weather: { temp: 14, condition: "cloudy", visibility: "8 km" },
    landmarks: ["Jorethang", "Reshi Hot Springs", "Rimbi Falls"],
    altitudeGain: "+450m",
    surface: "Mixed",
  },
  {
    id: "r3",
    from: "Siliguri (NJP)",
    to: "Sandakphu (Trek Base)",
    distance: "85 km",
    status: "open",
    condition: "Good till Maneybhanjyang, then gravel",
    lastUpdated: "4 hours ago",
    alerts: [],
    weather: { temp: 12, condition: "sunny", visibility: "Clear" },
    landmarks: ["Maneybhanjyang", "Tonglu", "Gairibas"],
    altitudeGain: "+2,800m",
    surface: "Mixed",
  },
  {
    id: "r4",
    from: "Siliguri",
    to: "Mirik",
    distance: "50 km",
    status: "open",
    condition: "Excellent — scenic lake route",
    lastUpdated: "1 hour ago",
    alerts: [],
    weather: { temp: 20, condition: "sunny", visibility: "Clear" },
    landmarks: ["Pashupati Market (Nepal border)", "Sumendu Lake", "Tea gardens"],
    altitudeGain: "+1,100m",
    surface: "Asphalt",
  },
  {
    id: "r5",
    from: "Darjeeling",
    to: "Sandakphu",
    distance: "65 km",
    status: "closed",
    condition: "Heavy snowfall above Ghoom — road closed for winter",
    lastUpdated: "15 mins ago",
    alerts: ["Road closed until March", "Use Maneybhanjyang route instead"],
    weather: { temp: -2, condition: "snow", visibility: "< 500m" },
    landmarks: ["Ghoom Monastery", "Tonglu Viewpoint", "Kalipokhri"],
    altitudeGain: "+2,400m",
    surface: "Gravel",
  },
  {
    id: "r6",
    from: "Kalimpong",
    to: "Sittong",
    distance: "45 km",
    status: "caution",
    condition: "Muddy after rains — 4WD recommended",
    lastUpdated: "3 hours ago",
    alerts: ["Slippery patches after Ahaldhara turnoff"],
    weather: { temp: 16, condition: "rain", visibility: "5 km" },
    landmarks: ["Ahaldhara Viewpoint", "Orange orchards", "Namthing Pokhari"],
    altitudeGain: "+400m",
    surface: "Mixed",
  },
  {
    id: "r7",
    from: "Siliguri",
    to: "Rishikhola",
    distance: "60 km",
    status: "open",
    condition: "Good — riverside route with scenic bridges",
    lastUpdated: "5 hours ago",
    alerts: [],
    weather: { temp: 22, condition: "sunny", visibility: "Clear" },
    landmarks: ["Rishi River", "Rangeet confluence", "Camping grounds"],
    altitudeGain: "+300m",
    surface: "Asphalt",
  },
  {
    id: "r8",
    from: "Darjeeling",
    to: "Peshok",
    distance: "20 km",
    status: "open",
    condition: "Steep descent — use low gear",
    lastUpdated: "6 hours ago",
    alerts: ["Sharp hairpin bends", "Check brakes before descent"],
    weather: { temp: 17, condition: "cloudy", visibility: "6 km" },
    landmarks: ["Triveni viewpoint", "Tea estates", "River beach"],
    altitudeGain: "-800m",
    surface: "Asphalt",
  },
];

const statusConfig = {
  open: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: CheckCircle2 },
  caution: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: AlertTriangle },
  closed: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: XCircle },
  "under-repair": { color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", icon: Clock },
};

const weatherIcons = {
  sunny: <Sun className="h-4 w-4 text-yellow-400" />,
  cloudy: <CloudRain className="h-4 w-4 text-gray-400" />,
  rain: <CloudRain className="h-4 w-4 text-blue-400" />,
  snow: <Snowflake className="h-4 w-4 text-sky-200" />,
  fog: <Wind className="h-4 w-4 text-gray-400" />,
};

export default function RoadConditionsPage() {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [filter, setFilter] = useState<"all" | "open" | "caution" | "closed">("all");

  const filtered = filter === "all" ? roadSegments : roadSegments.filter((r) => r.status === filter);

  const counts = {
    open: roadSegments.filter((r) => r.status === "open").length,
    caution: roadSegments.filter((r) => r.status === "caution").length,
    closed: roadSegments.filter((r) => r.status === "closed").length,
  };

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      {/* Header */}
      <section className="border-b border-white/10 py-12">
        <Container className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Navigation className="mx-auto mb-3 h-10 w-10 text-[#F6C453]" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Road Conditions</h1>
            <p className="mt-2 text-white/60">Real-time mountain route status across North Bengal & Sikkim</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
              <Clock className="h-3.5 w-3.5" />
              Last updated: {lastRefreshed.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              <button onClick={() => setLastRefreshed(new Date())} className="ml-1 flex items-center gap-1 text-[#F6C453] hover:underline">
                <RefreshCw className="h-3 w-3" /> Refresh
              </button>
            </div>
          </motion.div>
        </Container>
      </section>

      <Container className="py-8">
        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-3">
          {(["open", "caution", "closed"] as const).map((key) => {
            const cfg = statusConfig[key];
            const Icon = cfg.icon;
            return (
              <button
                key={key}
                onClick={() => setFilter(filter === key ? "all" : key)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border p-4 text-center transition-all",
                  filter === key ? `${cfg.border} ${cfg.bg}` : "border-white/10 bg-white/5 hover:bg-white/10"
                )}
              >
                <Icon className={cn("h-5 w-5", cfg.color)} />
                <span className={cn("text-xl font-bold", cfg.color)}>{counts[key]}</span>
                <span className="text-xs capitalize text-white/50">{key}</span>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-white/40">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Open</span>
          <span className="flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5 text-amber-400" /> Caution</span>
          <span className="flex items-center gap-1"><XCircle className="h-3.5 w-3.5 text-red-400" /> Closed</span>
        </div>

        {/* Segments */}
        <div className="space-y-3">
          {filtered.map((segment, i) => {
            const cfg = statusConfig[segment.status];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={cn("overflow-hidden border-l-4", cfg.border.replace("border", "border-l"))}>
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      {/* Route */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-white">
                          <span className="font-semibold">{segment.from}</span>
                          <TrendingUp className="h-3.5 w-3.5 text-white/30" />
                          <span className="font-semibold">{segment.to}</span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/40">
                          <span className="flex items-center gap-1"><Navigation className="h-3 w-3" />{segment.distance}</span>
                          <span className="flex items-center gap-1"><Mountain className="h-3 w-3" />{segment.altitudeGain}</span>
                          <span className="flex items-center gap-1"><Shield className="h-3 w-3" />{segment.surface}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{segment.lastUpdated}</span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className={cn("flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium", cfg.border, cfg.bg, cfg.color)}>
                        <Icon className="h-3.5 w-3.5" />
                        {segment.status.replace("-", " ")}
                      </div>
                    </div>

                    {/* Condition */}
                    <p className="mt-3 text-sm text-white/60">{segment.condition}</p>

                    {/* Alerts */}
                    {segment.alerts.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {segment.alerts.map((alert, idx) => (
                          <div key={idx} className="flex items-start gap-2 rounded-lg bg-red-500/5 p-2 text-xs text-red-300">
                            <TrafficCone className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            {alert}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Weather + Landmarks */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/5 pt-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        {weatherIcons[segment.weather.condition]}
                        {segment.weather.temp}°C
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        Vis: {segment.weather.visibility}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {segment.landmarks.slice(0, 2).join(", ")}
                        {segment.landmarks.length > 2 && ` +${segment.landmarks.length - 2}`}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Emergency */}
        <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-center">
          <Phone className="mx-auto mb-2 h-5 w-5 text-red-400" />
          <p className="text-sm font-medium text-red-300">Road Emergency Helpline</p>
          <p className="mt-1 text-2xl font-bold text-white">1070</p>
          <p className="mt-1 text-xs text-white/40">Disaster Management — available 24/7</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/40">
            <span>Bro Road Control: 0354-255XXXX</span>
            <span className="text-white/20">|</span>
            <span>Sikkim Tourism: 03592-XXXXXX</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
