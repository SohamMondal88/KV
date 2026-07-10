"use client";

import React, { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Cloud,
  Sun,
  Snowflake,
  CloudRain,
  Wind,
  Thermometer,
  Flower2,
  Mountain,
  Calendar,
  Compass,
  Share2,
  Sparkles,
  MapPin,
  ChevronRight,
  PartyPopper,
  Leaf,
  Droplets,
} from "lucide-react";
import { destinations } from "@/lib/data";
import type { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEATHER_OPTIONS = [
  { value: "cold", label: "Cold / Snow", icon: Snowflake },
  { value: "pleasant", label: "Pleasant / Cool", icon: Wind },
  { value: "warm", label: "Warm", icon: Sun },
  { value: "rainy", label: "Rainy / Monsoon", icon: CloudRain },
  { value: "any", label: "Any", icon: Cloud },
];

const EXPERIENCE_OPTIONS = [
  { value: "snow", label: "Snow", icon: Snowflake },
  { value: "flowers", label: "Flowers / Blooms", icon: Flower2 },
  { value: "clear_views", label: "Clear Mountain Views", icon: Mountain },
  { value: "greenery", label: "Greenery / Waterfalls", icon: Leaf },
  { value: "autumn", label: "Autumn Colors", icon: Droplets },
  { value: "festivals", label: "Festival Season", icon: PartyPopper },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseAltitude(altitude: string): number {
  const num = altitude.replace(/[^0-9]/g, "");
  return num ? parseInt(num, 10) : 1200;
}

function monthIndexToShort(index: number): string {
  return MONTH_SHORT[index];
}

function getSeasonForMonth(index: number): "summer" | "winter" | "monsoon" | "autumn" {
  if ([2, 3, 4].includes(index)) return "summer";
  if ([11, 0, 1].includes(index)) return "winter";
  if ([5, 6, 7, 8].includes(index)) return "monsoon";
  return "autumn"; // Oct, Nov
}

function getTemperatureForMonth(dest: Destination, monthIndex: number): string {
  const season = getSeasonForMonth(monthIndex);
  const t = dest.temperature;
  switch (season) {
    case "summer":
      return t.summer;
    case "winter":
      return t.winter;
    case "monsoon":
      return t.monsoon;
    default:
      // autumn uses a blend: if they have an autumn range we could infer,
      // but fallback to summer or winter based on altitude
      return monthIndex <= 4 ? t.summer : t.winter;
  }
}

function hasFestivalInMonth(dest: Destination, monthIndex: number): boolean {
  // Rough mapping of festival names to months
  const festivalMonths: Record<string, number[]> = {
    Losar: [1, 2], // Feb-Mar
    "Buddha Jayanti": [4], // May
    Dashain: [9], // Oct
    Tihar: [10], // Nov
    Diwali: [10], // Nov
    Holi: [2], // Mar
    Christmas: [11], // Dec
  };
  return dest.festivals.some((f) => {
    const months = festivalMonths[f];
    return months ? months.includes(monthIndex) : false;
  });
}

function getWeatherBadge(dest: Destination, monthIndex: number): { badge: string; icon: React.ReactNode } {
  const alt = parseAltitude(dest.altitude);
  const season = getSeasonForMonth(monthIndex);

  if (season === "winter" && alt > 1800) {
    return { badge: "❄️ Snow Likely", icon: <Snowflake className="h-4 w-4" /> };
  }
  if ([2, 3, 4].includes(monthIndex) && alt > 1500 && dest.tags.includes("nature")) {
    return { badge: "🌸 Rhododendron Season", icon: <Flower2 className="h-4 w-4" /> };
  }
  if (season === "autumn" || (season === "winter" && alt <= 2200)) {
    return { badge: "🌤️ Clear Views", icon: <Sun className="h-4 w-4" /> };
  }
  if (season === "monsoon") {
    return { badge: "🌧️ Monsoon Greenery", icon: <CloudRain className="h-4 w-4" /> };
  }
  return { badge: "🌿 Pleasant Weather", icon: <Cloud className="h-4 w-4" /> };
}

function getSeasonalActivities(dest: Destination, monthIndex: number): string[] {
  const alt = parseAltitude(dest.altitude);
  const season = getSeasonForMonth(monthIndex);
  const acts: string[] = [];

  if (season === "winter") {
    acts.push("Snow viewing", "Bonfire evenings");
    if (alt > 1800) acts.push("High-altitude trekking");
  } else if (season === "summer") {
    acts.push("Nature walks", "Photography");
    if (dest.tags.includes("trekking")) acts.push("Trekking");
  } else if (season === "monsoon") {
    acts.push("Waterfall visits", "Greenery walks");
    if (dest.adventureActivities.some((a) => a.name.toLowerCase().includes("river"))) {
      acts.push("River trekking");
    }
  } else {
    acts.push("Sunrise viewpoints", "Local village walks");
    if (hasFestivalInMonth(dest, monthIndex)) acts.push("Festival exploration");
  }

  // Add a few generic ones from adventure activities
  const generic = dest.adventureActivities.slice(0, 2).map((a) => a.name);
  return [...new Set([...acts, ...generic])].slice(0, 4);
}

/* ------------------------------------------------------------------ */
/*  Scoring                                                            */
/* ------------------------------------------------------------------ */

interface ScoredDestination {
  dest: Destination;
  score: number;
  badge: string;
  badgeIcon: React.ReactNode;
  temperature: string;
  activities: string[];
}

function scoreDestinations(
  monthIndex: number,
  weatherPref: string,
  experiences: string[]
): ScoredDestination[] {
  const monthShort = monthIndexToShort(monthIndex);
  const season = getSeasonForMonth(monthIndex);

  return destinations.map((dest) => {
    let score = 0;
    const alt = parseAltitude(dest.altitude);
    const isBestMonth = dest.bestTimeMonths.includes(monthShort);

    // Base score for being in best-time months
    if (isBestMonth) score += 30;
    else score -= 15;

    // Weather preference scoring
    switch (weatherPref) {
      case "cold": {
        if (alt > 1800) score += 35;
        else if (alt > 1500) score += 15;
        else score -= 20;
        const winterMonths = ["Nov", "Dec", "Jan", "Feb"];
        if (winterMonths.includes(monthShort)) score += 25;
        break;
      }
      case "pleasant": {
        if (alt >= 1200 && alt <= 1800) score += 35;
        else if (alt > 1800) score += 10;
        else score += 5;
        const pleasantMonths = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
        if (pleasantMonths.includes(monthShort)) score += 20;
        break;
      }
      case "warm": {
        if (alt < 1200) score += 35;
        else if (alt < 1500) score += 10;
        else score -= 20;
        const warmMonths = ["Apr", "May", "Jun"];
        if (warmMonths.includes(monthShort)) score += 20;
        break;
      }
      case "rainy": {
        const rainyMonths = ["Jun", "Jul", "Aug", "Sep"];
        if (rainyMonths.includes(monthShort)) score += 30;
        if (
          dest.name === "Samsing" ||
          dest.name === "Sittong" ||
          dest.name === "Mirik" ||
          dest.name === "Lamahatta" ||
          dest.tags.includes("nature")
        ) {
          score += 20;
        }
        break;
      }
      case "any":
      default: {
        score += 15;
        break;
      }
    }

    // Experience scoring
    for (const exp of experiences) {
      switch (exp) {
        case "snow": {
          if (alt > 1800 && season === "winter") score += 25;
          else if (alt > 1500 && season === "winter") score += 10;
          break;
        }
        case "flowers": {
          if ([2, 3, 4].includes(monthIndex) && alt > 1500) score += 25;
          else if ([2, 3, 4].includes(monthIndex)) score += 10;
          break;
        }
        case "clear_views": {
          if ([9, 10, 11, 0, 1].includes(monthIndex)) score += 25;
          else if (alt > 1500) score += 10;
          break;
        }
        case "greenery": {
          if ([5, 6, 7, 8].includes(monthIndex)) score += 25;
          if (dest.tags.includes("nature")) score += 10;
          break;
        }
        case "autumn": {
          if ([9, 10].includes(monthIndex)) score += 25;
          if (dest.name === "Sittong" || dest.name === "Ahaldhara") score += 10;
          break;
        }
        case "festivals": {
          if (hasFestivalInMonth(dest, monthIndex)) score += 25;
          break;
        }
      }
    }

    // Penalize monsoon for non-rainy preferences unless it's explicitly requested
    if (season === "monsoon" && weatherPref !== "rainy" && weatherPref !== "any") {
      if (dest.weatherAlerts.some((a) => a.toLowerCase().includes("landslide") || a.toLowerCase().includes("monsoon"))) {
        score -= 10;
      }
    }

    // Altitude bonus for mountain lovers
    if (experiences.includes("clear_views") && alt > 1500) score += 10;

    const { badge, icon } = getWeatherBadge(dest, monthIndex);
    return {
      dest,
      score,
      badge,
      badgeIcon: icon,
      temperature: getTemperatureForMonth(dest, monthIndex),
      activities: getSeasonalActivities(dest, monthIndex),
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Seasonal Tips                                                      */
/* ------------------------------------------------------------------ */

function getSeasonalTips(monthIndex: number, topDestinations: ScoredDestination[]): string[] {
  const tips: string[] = [];

  if (monthIndex === 9) {
    tips.push("October is perfect for clear Kanchenjunga views! Pack a warm jacket for evenings.");
    tips.push("Dashain festival celebrations bring vibrant energy to villages.");
  }
  if (monthIndex === 10) {
    tips.push("November offers crisp skies — ideal for photography and long treks.");
    tips.push("Tihar lights up the villages; homestays often host traditional feasts.");
  }
  if (monthIndex === 2 || monthIndex === 3) {
    tips.push("March-April brings rhododendron blooms to Chatakpur and Kolakham.");
  }
  if (monthIndex === 5 || monthIndex === 6 || monthIndex === 7) {
    tips.push("Avoid Samsing during peak monsoon — roads can be slippery.");
    tips.push("Pack waterproof gear and leech socks if trekking in the rain.");
  }
  if (monthIndex === 11 || monthIndex === 0) {
    tips.push("December-January offers the best snow views from high-altitude destinations.");
    tips.push("Book homestays early; heaters may not be available everywhere.");
  }
  if (monthIndex === 4) {
    tips.push("May is warm and pleasant in low-altitude spots like Rishikhola.");
  }

  // Dynamic tip based on top pick
  const top = topDestinations[0];
  if (top) {
    const alt = parseAltitude(top.dest.altitude);
    if (alt > 2000) {
      tips.push(`${top.dest.name} sits at ${top.dest.altitude} — bring layers!`);
    }
    if (top.dest.festivals.length > 0) {
      tips.push(`Local festivals in ${top.dest.name}: ${top.dest.festivals.slice(0, 2).join(", ")}.`);
    }
  }

  if (tips.length === 0) {
    tips.push("Carry layers — Himalayan weather changes quickly!");
    tips.push("Always check road conditions before heading to remote villages.");
  }

  return tips.slice(0, 3);
}

/* ------------------------------------------------------------------ */
/*  Weather Calendar Helpers                                           */
/* ------------------------------------------------------------------ */

function getTopDestinationsForMonth(monthIndex: number): ScoredDestination[] {
  const scored = scoreDestinations(monthIndex, "any", []);
  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}

function monthCardIcon(monthIndex: number): React.ReactNode {
  const season = getSeasonForMonth(monthIndex);
  if (season === "winter") return <Snowflake className="h-5 w-5 text-blue-500" />;
  if (season === "summer") return <Sun className="h-5 w-5 text-amber-500" />;
  if (season === "monsoon") return <CloudRain className="h-5 w-5 text-sky-500" />;
  return <Leaf className="h-5 w-5 text-emerald-500" />;
}

function monthCardSummary(monthIndex: number, top: ScoredDestination[]): string {
  const season = getSeasonForMonth(monthIndex);
  const names = top.map((t) => t.dest.name).join(", ");
  if (season === "winter") return `${names} — Snowy peaks and crisp air`;
  if (season === "summer") return `${names} — Blooms and pleasant days`;
  if (season === "monsoon") return `${names} — Lush greens and flowing streams`;
  return `${names} — Clear skies and golden light`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function WeatherSuggestPage() {
  const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth());
  const [weatherPref, setWeatherPref] = useState<string>("pleasant");
  const [experiences, setExperiences] = useState<string[]>([]);
  const [surprise, setSurprise] = useState<ScoredDestination | null>(null);
  const [shareToast, setShareToast] = useState(false);

  const scored = useMemo(
    () => scoreDestinations(monthIndex, weatherPref, experiences),
    [monthIndex, weatherPref, experiences]
  );

  const topRecommendations = useMemo(
    () => scored.sort((a, b) => b.score - a.score).slice(0, 5),
    [scored]
  );

  const tips = useMemo(
    () => getSeasonalTips(monthIndex, topRecommendations),
    [monthIndex, topRecommendations]
  );

  const toggleExperience = useCallback((value: string) => {
    setExperiences((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }, []);

  const handleSurpriseMe = useCallback(() => {
    if (topRecommendations.length === 0) return;
    const random = topRecommendations[Math.floor(Math.random() * topRecommendations.length)];
    setSurprise(random);
    setTimeout(() => setSurprise(null), 4000);
  }, [topRecommendations]);

  const handleShare = useCallback(async () => {
    const text = `My KuboVista weather pick for ${MONTHS[monthIndex]}:\n${topRecommendations
      .slice(0, 3)
      .map((r) => `• ${r.dest.name} — ${r.badge}`)
      .join("\n")}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "KuboVista Weather Picks", text });
      } catch {
        // ignore
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2000);
      } catch {
        // ignore
      }
    }
  }, [monthIndex, topRecommendations]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen">
      {/* Toast */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 rounded-lg bg-forest px-4 py-2 text-sm font-medium text-white shadow-lg"
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Surprise Toast */}
      <AnimatePresence>
        {surprise && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          >
            <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl">
              <div className="flex items-center gap-2 text-amber-500">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Surprise Pick</span>
              </div>
              <div className="mt-4">
                <Image
                  src={surprise.dest.heroImage}
                  alt={surprise.dest.name}
                  width={600}
                  height={300}
                  className="h-48 w-full rounded-xl object-cover"
                />
                <h3 className="mt-4 text-xl font-bold">{surprise.dest.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{surprise.dest.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="accent">{surprise.badge}</Badge>
                  <Badge variant="outline">{surprise.temperature}</Badge>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => setSurprise(null)}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-400 via-sky-300 to-emerald-700 py-20 text-white">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Compass className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Where to Go Based on Weather
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Let the seasons guide your next adventure
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Inputs */}
      <Container className="py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Month Selector */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                When are you traveling?
              </label>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6">
                {MONTHS.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => setMonthIndex(i)}
                    className={`rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
                      i === monthIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {m.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Preference */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Thermometer className="h-4 w-4 text-primary" />
                Preferred weather
              </label>
              <div className="flex flex-wrap gap-2">
                {WEATHER_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setWeatherPref(opt.value)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        weatherPref === opt.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Experience Multi-select */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                What do you want to experience?
              </label>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const active = experiences.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleExperience(opt.value)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="accent" size="sm" onClick={handleSurpriseMe}>
              <Sparkles className="h-4 w-4" /> Surprise Me
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Top Recommendations */}
      <Container className="pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Top Recommendations</h2>
          <span className="text-sm text-muted-foreground">
            {MONTHS[monthIndex]} • {WEATHER_OPTIONS.find((w) => w.value === weatherPref)?.label}
          </span>
        </div>

        {topRecommendations.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            No destinations match your criteria. Try selecting "Any" weather or a different month.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {topRecommendations.map((item) => {
              const matchPct = Math.min(98, Math.max(60, Math.round(50 + item.score * 0.6)));
              return (
                <motion.div key={item.dest.id} variants={itemVariants}>
                  <Card className="group h-full overflow-hidden" hoverLift>
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={item.dest.heroImage}
                        alt={item.dest.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3 flex gap-2">
                        <Badge variant="primary" className="gap-1">
                          {item.badgeIcon}
                          {item.badge}
                        </Badge>
                      </div>
                      <div className="absolute right-3 top-3">
                        <Badge variant="accent">{matchPct}% Match</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold">{item.dest.name}</h3>
                        <span className="shrink-0 text-xs font-medium text-muted-foreground">
                          {item.temperature}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{item.dest.tagline}</p>
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.dest.state}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.activities.slice(0, 3).map((act) => (
                          <Badge key={act} variant="outline" className="text-[10px]">
                            {act}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Link href={`/destinations/${item.dest.slug}`} className="block w-full">
                          <Button variant="primary" size="sm" className="w-full">
                            View Details
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </Container>

      {/* Weather Calendar */}
      <section className="border-t border-border bg-muted/40 py-12">
        <Container>
          <div className="mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Weather Calendar</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {MONTHS.map((monthName, i) => {
              const top = getTopDestinationsForMonth(i);
              return (
                <motion.div
                  key={monthName}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`min-w-[260px] max-w-[260px] flex-shrink-0 rounded-xl border p-4 transition-colors ${
                    i === monthIndex
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {monthCardIcon(i)}
                    <span className="font-semibold">{monthName}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {monthCardSummary(i, top)}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {top.map((t) => (
                      <Link
                        key={t.dest.id}
                        href={`/destinations/${t.dest.slug}`}
                        className="flex items-center gap-2 rounded-lg bg-muted/60 px-2 py-1.5 text-sm hover:bg-muted"
                      >
                        <Image
                          src={t.dest.heroImage}
                          alt={t.dest.name}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-md object-cover"
                        />
                        <span className="font-medium">{t.dest.name}</span>
                        <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Seasonal Tips */}
      <Container className="py-12">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Seasonal Tips</h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tips.map((tip, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card hoverLift={false} className="p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">{tip}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
