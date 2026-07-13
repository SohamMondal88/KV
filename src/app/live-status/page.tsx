"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { destinations } from "@/lib/data";
import {
  CloudSun,
  Droplets,
  Wind,
  Eye,
  MapPin,
  Users,
  Music,
  Sun,
  Moon,
  Thermometer,
  Navigation,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Simulated live data for each destination ─── */
interface LiveData {
  destinationId: string;
  temp: number;
  condition: "Sunny" | "Cloudy" | "Rain" | "Snow" | "Fog";
  humidity: number;
  windSpeed: number; // km/h
  visibility: string;
  aqi: number; // 0-500
  rainChance: number; // %
  roadStatus: "Clear" | "Slippery" | "Closed" | "Under Repair";
  crowdLevel: "Low" | "Moderate" | "High" | "Very High";
  activeFestival?: string;
  sunrise: string;
  sunset: string;
  moonPhase: string;
}

function generateLiveData(destId: string): LiveData {
  const seed = destId.charCodeAt(destId.length - 1);
  const conditions: LiveData["condition"][] = ["Sunny", "Cloudy", "Rain", "Snow", "Fog"];
  const roads: LiveData["roadStatus"][] = ["Clear", "Slippery", "Closed", "Under Repair"];
  const crowds: LiveData["crowdLevel"][] = ["Low", "Moderate", "High", "Very High"];

  return {
    destinationId: destId,
    temp: 8 + (seed % 18), // 8-25°C
    condition: conditions[seed % conditions.length],
    humidity: 40 + (seed % 50),
    windSpeed: 5 + (seed % 20),
    visibility: ["Excellent", "Good", "Moderate", "Poor"][seed % 4],
    aqi: 20 + (seed % 80),
    rainChance: (seed % 80),
    roadStatus: roads[seed % roads.length],
    crowdLevel: crowds[seed % crowds.length],
    activeFestival: seed % 3 === 0 ? "Local Festival" : undefined,
    sunrise: `${5 + (seed % 2)}:${10 + (seed % 30)} AM`,
    sunset: `${4 + (seed % 2)}:${20 + (seed % 30)} PM`,
    moonPhase: ["Waxing Crescent", "First Quarter", "Full Moon", "Waning Gibbous", "New Moon"][seed % 5],
  };
}

const aqiColor = (aqi: number) => {
  if (aqi <= 50) return "text-emerald-400 bg-emerald-500/10";
  if (aqi <= 100) return "text-yellow-400 bg-yellow-500/10";
  if (aqi <= 150) return "text-orange-400 bg-orange-500/10";
  return "text-red-400 bg-red-500/10";
};

const crowdColor: Record<string, string> = {
  Low: "text-emerald-400 bg-emerald-500/10",
  Moderate: "text-yellow-400 bg-yellow-500/10",
  High: "text-orange-400 bg-orange-500/10",
  "Very High": "text-red-400 bg-red-500/10",
};

const roadColor: Record<string, string> = {
  Clear: "text-emerald-400 bg-emerald-500/10",
  Slippery: "text-yellow-400 bg-yellow-500/10",
  "Under Repair": "text-orange-400 bg-orange-500/10",
  Closed: "text-red-400 bg-red-500/10",
};

const weatherIcons: Record<string, React.ReactNode> = {
  Sunny: <Sun className="h-5 w-5 text-yellow-400" />,
  Cloudy: <CloudSun className="h-5 w-5 text-gray-300" />,
  Rain: <Droplets className="h-5 w-5 text-blue-400" />,
  Snow: <Wind className="h-5 w-5 text-sky-200" />,
  Fog: <Eye className="h-5 w-5 text-gray-400" />,
};

export default function LiveStatusPage() {
  const [liveData, setLiveData] = useState<Record<string, LiveData>>({});
  const [selectedDest, setSelectedDest] = useState(destinations[0]);
  const [now] = useState(new Date());

  useEffect(() => {
    const data: Record<string, LiveData> = {};
    destinations.forEach((d) => {
      data[d.id] = generateLiveData(d.id);
    });
    setLiveData(data);
  }, []);

  const current = liveData[selectedDest.id];

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      <section className="border-b border-white/10 py-12">
        <Container className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <CloudSun className="mx-auto mb-3 h-10 w-10 text-[#F6C453]" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Live Destination Status</h1>
            <p className="mt-2 text-white/60">Real-time weather, crowd levels, road status &amp; events</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Destination Selector */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/40">Select Destination</h2>
            <div className="space-y-1.5">
              {destinations.map((d) => {
                const data = liveData[d.id];
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDest(d)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                      selectedDest.id === d.id
                        ? "border-[#F6C453]/30 bg-[#F6C453]/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    )}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg">
                      {data && weatherIcons[data.condition]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{d.name}</p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-white/40">
                        <span>{data?.temp}°C</span>
                        <span>{data?.condition}</span>
                      </div>
                    </div>
                    {data?.activeFestival && (
                      <Music className="h-3.5 w-3.5 shrink-0 text-[#F6C453]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Dashboard */}
          <div className="lg:col-span-2">
            {current && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={selectedDest.id}>
                <Card className="overflow-hidden">
                  {/* Header */}
                  <div className="border-b border-white/10 bg-white/5 p-5 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedDest.name}</h2>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/50">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{selectedDest.state}</span>
                          <span className="text-white/20">•</span>
                          <span>{selectedDest.altitude}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-white">{current.temp}°C</p>
                          <p className="text-sm text-white/50">{current.condition}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                          {weatherIcons[current.condition]}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4 sm:p-6">
                    <MetricCard label="Humidity" value={`${current.humidity}%`} icon={Droplets} color="text-blue-400" />
                    <MetricCard label="Wind" value={`${current.windSpeed} km/h`} icon={Wind} color="text-sky-300" />
                    <MetricCard label="Visibility" value={current.visibility} icon={Eye} color="text-emerald-400" />
                    <MetricCard label="Rain Chance" value={`${current.rainChance}%`} icon={CloudSun} color="text-amber-400" />
                  </div>

                  {/* Status Row */}
                  <div className="grid gap-3 px-5 pb-5 sm:grid-cols-3 sm:px-6">
                    <div className={cn("flex items-center gap-2 rounded-xl border p-3", aqiColor(current.aqi))}>
                      <Thermometer className="h-4 w-4" />
                      <div>
                        <p className="text-xs opacity-70">AQI</p>
                        <p className="text-sm font-bold">{current.aqi}</p>
                      </div>
                    </div>
                    <div className={cn("flex items-center gap-2 rounded-xl border p-3", crowdColor[current.crowdLevel])}>
                      <Users className="h-4 w-4" />
                      <div>
                        <p className="text-xs opacity-70">Crowd Level</p>
                        <p className="text-sm font-bold">{current.crowdLevel}</p>
                      </div>
                    </div>
                    <div className={cn("flex items-center gap-2 rounded-xl border p-3", roadColor[current.roadStatus])}>
                      <Navigation className="h-4 w-4" />
                      <div>
                        <p className="text-xs opacity-70">Roads</p>
                        <p className="text-sm font-bold">{current.roadStatus}</p>
                      </div>
                    </div>
                  </div>

                  {/* Extra info */}
                  <div className="flex flex-wrap items-center gap-4 border-t border-white/10 px-5 py-4 text-xs text-white/40 sm:px-6">
                    <span className="flex items-center gap-1">
                      <Sun className="h-3.5 w-3.5 text-amber-400" /> Sunrise: {current.sunrise}
                    </span>
                    <span className="flex items-center gap-1">
                      <Moon className="h-3.5 w-3.5 text-indigo-300" /> Sunset: {current.sunset}
                    </span>
                    <span className="flex items-center gap-1">
                      <Moon className="h-3.5 w-3.5 text-slate-300" /> Moon: {current.moonPhase}
                    </span>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        {/* All destinations summary table */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-white">All Destinations Overview</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-wider text-white/40">
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Temp</th>
                  <th className="px-4 py-3">Weather</th>
                  <th className="px-4 py-3">AQI</th>
                  <th className="px-4 py-3">Roads</th>
                  <th className="px-4 py-3">Crowd</th>
                  <th className="px-4 py-3">Rain%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {destinations.map((d) => {
                  const data = liveData[d.id];
                  if (!data) return null;
                  return (
                    <tr
                      key={d.id}
                      onClick={() => setSelectedDest(d)}
                      className="cursor-pointer transition-colors hover:bg-white/5"
                    >
                      <td className="px-4 py-3 font-medium text-white">{d.name}</td>
                      <td className="px-4 py-3 text-white/70">{data.temp}°C</td>
                      <td className="px-4 py-3"><span className="flex items-center gap-1">{weatherIcons[data.condition]} {data.condition}</span></td>
                      <td className="px-4 py-3"><span className={cn("rounded-md px-2 py-0.5 text-xs", aqiColor(data.aqi))}>{data.aqi}</span></td>
                      <td className="px-4 py-3"><span className={cn("rounded-md px-2 py-0.5 text-xs", roadColor[data.roadStatus])}>{data.roadStatus}</span></td>
                      <td className="px-4 py-3"><span className={cn("rounded-md px-2 py-0.5 text-xs", crowdColor[data.crowdLevel])}>{data.crowdLevel}</span></td>
                      <td className="px-4 py-3 text-white/70">{data.rainChance}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-white/30">
            * Data is simulated for demonstration. Real-time feeds from IMD, BRO, and local sensors will be integrated.
          </p>
        </div>
      </Container>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
      <Icon className={cn("mx-auto mb-1 h-5 w-5", color)} />
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-white/40">{label}</p>
    </div>
  );
}
