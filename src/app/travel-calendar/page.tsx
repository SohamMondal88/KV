"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { destinations } from "@/lib/data";
import {
  CalendarDays,
  Sun,
  CloudRain,
  Snowflake,
  Flower2,
  Leaf,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Thermometer,
  Mountain,
} from "lucide-react";
import { cn } from "@/lib/utils";

const monthData = [
  {
    month: "January",
    short: "Jan",
    season: "Winter",
    icon: Snowflake,
    color: "text-sky-300",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    highlights: ["Clear mountain views", "Snow at high altitude", "Fewer crowds"],
  },
  {
    month: "February",
    short: "Feb",
    season: "Winter",
    icon: Snowflake,
    color: "text-sky-300",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    highlights: ["Losar festival (Tibetan New Year)", "Rhododendron buds appear", "Cold but dry"],
  },
  {
    month: "March",
    short: "Mar",
    season: "Spring",
    icon: Flower2,
    color: "text-pink-300",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    highlights: ["Rhododendron blooms begin", "Pleasant weather returns", "Best for trekking"],
  },
  {
    month: "April",
    short: "Apr",
    season: "Spring",
    icon: Flower2,
    color: "text-pink-300",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    highlights: ["Full bloom season", "Sandakphu trek opens", "Clear skies"],
  },
  {
    month: "May",
    short: "May",
    season: "Spring",
    icon: Flower2,
    color: "text-pink-300",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    highlights: ["Buddha Jayanti celebrations", "Warm days, cool nights", "Pre-monsoon clarity"],
  },
  {
    month: "June",
    short: "Jun",
    season: "Summer",
    icon: CloudRain,
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    highlights: ["Monsoon begins", "Lush green valleys", "Waterfalls at full force"],
  },
  {
    month: "July",
    short: "Jul",
    season: "Summer",
    icon: CloudRain,
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    highlights: ["Peak monsoon", "Misty mountain trails", "Off-season prices"],
  },
  {
    month: "August",
    short: "Aug",
    season: "Summer",
    icon: CloudRain,
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    highlights: ["Independence Day trek events", "Tea plucking season", "Moss-covered forests"],
  },
  {
    month: "September",
    short: "Sep",
    season: "Autumn",
    icon: Leaf,
    color: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    highlights: ["Monsoon recedes", "First clear views return", "Dashain preparations"],
  },
  {
    month: "October",
    short: "Oct",
    season: "Autumn",
    icon: Leaf,
    color: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    highlights: ["Dashain festival", "Best photography light", "Post-monsoon clarity"],
  },
  {
    month: "November",
    short: "Nov",
    season: "Autumn",
    icon: Leaf,
    color: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    highlights: ["Cherry blossoms in Sittong", "Tea Tourism Festival", "Tihar (festival of lights)"],
  },
  {
    month: "December",
    short: "Dec",
    season: "Winter",
    icon: Snowflake,
    color: "text-sky-300",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    highlights: ["Orange harvest in Sittong", "Orange Grove Camp season", "End-of-year retreats"],
  },
];

/* ─── Map destinations to their best months ─── */
function getDestinationsForMonth(monthIdx: number): typeof destinations {
  return destinations.filter((d) => {
    const months = d.bestTimeMonths || [];
    // Simple month matching using first 3 letters
    const targetShort = monthData[monthIdx].short;
    return months.some((m) => m.toLowerCase().includes(targetShort.toLowerCase()));
  });
}

export default function TravelCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [view, setView] = useState<"grid" | "list">("grid");

  const currentMonth = monthData[selectedMonth];
  const currentDestinations = getDestinationsForMonth(selectedMonth);
  const CurrentIcon = currentMonth.icon;

  const goPrev = () => setSelectedMonth((m) => (m === 0 ? 11 : m - 1));
  const goNext = () => setSelectedMonth((m) => (m === 11 ? 0 : m + 1));

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      <section className="border-b border-white/10 py-12">
        <Container className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <CalendarDays className="mx-auto mb-3 h-10 w-10 text-[#F6C453]" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Travel Calendar</h1>
            <p className="mx-auto mt-2 max-w-xl text-white/60">
              Plan your Himalayan adventures month by month. See which destinations shine, what festivals happen, and when to go.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-8">
        {/* Month Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <CurrentIcon className={cn("h-6 w-6", currentMonth.color)} />
              <h2 className="text-2xl font-bold text-white">{currentMonth.month}</h2>
            </div>
            <p className={cn("text-sm font-medium", currentMonth.color)}>{currentMonth.season}</p>
          </div>
          <button
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Month strip */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {monthData.map((m, idx) => {
            const active = idx === selectedMonth;
            const Icon = m.icon;
            return (
              <button
                key={m.month}
                onClick={() => setSelectedMonth(idx)}
                className={cn(
                  "flex shrink-0 flex-col items-center rounded-xl border px-4 py-2 text-xs transition-all",
                  active
                    ? `${m.border} ${m.bg} ${m.color} shadow-[0_0_20px_rgba(255,255,255,0.05)]`
                    : "border-white/10 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
                )}
              >
                <Icon className="mb-1 h-4 w-4" />
                <span className="font-semibold">{m.short}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Month Info */}
          <div className="space-y-4">
            <Card className={cn("p-5", currentMonth.bg.replace("bg-", ""), "bg-opacity-10")}>
              <h3 className={cn("mb-3 text-sm font-semibold uppercase tracking-wider", currentMonth.color)}>
                {currentMonth.month} Highlights
              </h3>
              <ul className="space-y-2">
                {currentMonth.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-white/70">
                    <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", currentMonth.color.replace("text-", "bg-"))} />
                    {h}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">
                Weather Outlook
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-white/60">
                    <Thermometer className="h-4 w-4 text-[#F6C453]" /> Temperature
                  </span>
                  <span className="text-white">{getTempRange(selectedMonth)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-white/60">
                    <CloudRain className="h-4 w-4 text-blue-400" /> Rainfall
                  </span>
                  <span className="text-white">{getRainfall(selectedMonth)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-white/60">
                    <Mountain className="h-4 w-4 text-emerald-400" /> Trekking
                  </span>
                  <span className="text-white">{getTrekkingGrade(selectedMonth)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Destinations for this month */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-bold text-white">
              Best Destinations in {currentMonth.month}
            </h3>
            {currentDestinations.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 py-12 text-center">
                <MapPin className="mb-3 h-10 w-10 text-white/20" />
                <p className="text-white/50">No destinations specifically listed for this month.</p>
                <p className="mt-1 text-sm text-white/30">Most Himalayan destinations are year-round friendly.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {currentDestinations.map((d, i) => (
                    <motion.div
                      key={d.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link href={`/destinations/${d.slug}`}>
                        <Card hoverLift className="group overflow-hidden">
                          <div className="relative h-40 w-full overflow-hidden">
                            <Image
                              src={d.heroImage}
                              alt={d.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3">
                              <h4 className="text-lg font-bold text-white">{d.name}</h4>
                              <div className="flex items-center gap-2 text-xs text-white/70">
                                <MapPin className="h-3 w-3" /> {d.state} • {d.altitude}
                              </div>
                            </div>
                            <div className="absolute right-3 top-3">
                              <Badge className="bg-black/50 text-white text-[10px] backdrop-blur-sm">
                                {d.rating} ⭐
                              </Badge>
                            </div>
                          </div>
                          <div className="p-3">
                            <p className="line-clamp-2 text-xs text-white/50">{d.tagline}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {d.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ─── Helpers ─── */
function getTempRange(monthIdx: number): string {
  const ranges = ["2–12°C", "3–14°C", "8–18°C", "12–22°C", "15–25°C", "18–28°C", "20–28°C", "20–28°C", "18–26°C", "12–22°C", "8–18°C", "3–14°C"];
  return ranges[monthIdx];
}

function getRainfall(monthIdx: number): string {
  const rain = ["Minimal", "Minimal", "Low", "Low", "Moderate", "Heavy", "Very Heavy", "Heavy", "Moderate", "Low", "Minimal", "Minimal"];
  return rain[monthIdx];
}

function getTrekkingGrade(monthIdx: number): string {
  const grades = ["Hard (snow)", "Hard", "Excellent", "Excellent", "Excellent", "Caution (slippery)", "Avoid", "Avoid", "Good", "Excellent", "Excellent", "Good"];
  return grades[monthIdx];
}
