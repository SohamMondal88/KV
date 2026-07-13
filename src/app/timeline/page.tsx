"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Sunrise,
  Hotel,
  Utensils,
  Footprints,
  Camera,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Plane,
  Train,
  Bus,
  Car,
  Sun,
  CloudSun,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  Cloud,
  Clock,
  CheckCircle2,
  Circle,
  X,
  Star,
  History,
  Plus,
  Luggage,
  Thermometer,
} from "lucide-react";

import { destinations } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TripItem {
  id: string;
  name: string;
  image: string;
  location: string;
  date: string;
  guests: number;
  pricePerUnit: number;
  quantity: number;
  type: string;
}

interface BookingTrip {
  id: string;
  items: TripItem[];
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalAmount: number;
  bookingDate: string;
}

interface SavedItinerary {
  id: string;
  name: string;
  destinationSlug: string;
  days: ItineraryDay[];
  createdAt: string;
  startDate: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: ActivityItem[];
}

interface ActivityItem {
  time: string;
  name: string;
  icon: ActivityIcon;
  location: string;
}

type ActivityIcon =
  | "sunrise"
  | "hotel"
  | "food"
  | "trek"
  | "camera"
  | "bus"
  | "plane"
  | "train"
  | "checkin"
  | "checkout"
  | "market"
  | "campfire"
  | "sunset";

interface TimelineTrip {
  id: string;
  name: string;
  slug: string;
  image: string;
  location: string;
  startDate: string;
  endDate: string;
  days: ItineraryDay[];
  hotel?: {
    name: string;
    image: string;
    checkIn: string;
    checkOut: string;
  };
  transport?: {
    type: "flight" | "train" | "bus" | "car";
    number: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
  };
  weather: WeatherDay[];
  packingPreview: string[];
  status: "upcoming" | "past";
  source: "booking" | "itinerary" | "demo";
}

interface WeatherDay {
  date: string;
  condition: WeatherCondition;
  high: number;
  low: number;
}

type WeatherCondition =
  | "sunny"
  | "cloudy"
  | "partly"
  | "rain"
  | "storm"
  | "snow"
  | "fog";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseDate(input: string): Date {
  const d = new Date(input);
  if (!isNaN(d.getTime())) return d;
  // fallback for "Oct 15, 2025"
  const cleaned = input.replace(/,/g, "");
  const parts = cleaned.split(" ");
  if (parts.length >= 3) {
    const tryDate = new Date(`${parts[0]} ${parts[1]}, ${parts[2]}`);
    if (!isNaN(tryDate.getTime())) return tryDate;
  }
  return new Date();
}

function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? parseDate(date) : date;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function daysBetween(a: Date | string, b: Date | string): number {
  const da = typeof a === "string" ? parseDate(a) : a;
  const db = typeof b === "string" ? parseDate(b) : b;
  const ms = db.getTime() - da.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function addDays(date: Date | string, n: number): Date {
  const d = typeof date === "string" ? parseDate(date) : new Date(date);
  const res = new Date(d);
  res.setDate(res.getDate() + n);
  return res;
}

function countdownText(start: Date | string): string {
  const days = daysBetween(new Date(), start);
  if (days < 0) return "Trip completed";
  if (days === 0) return "Leaving today!";
  if (days === 1) return "1 day to go!";
  return `${days} days to go!`;
}

const activityIcons: Record<ActivityIcon, React.ReactNode> = {
  sunrise: <Sunrise className="h-4 w-4" />,
  hotel: <Hotel className="h-4 w-4" />,
  food: <Utensils className="h-4 w-4" />,
  trek: <Footprints className="h-4 w-4" />,
  camera: <Camera className="h-4 w-4" />,
  bus: <Bus className="h-4 w-4" />,
  plane: <Plane className="h-4 w-4" />,
  train: <Train className="h-4 w-4" />,
  checkin: <Hotel className="h-4 w-4" />,
  checkout: <Hotel className="h-4 w-4" />,
  market: <MapPin className="h-4 w-4" />,
  campfire: <Sun className="h-4 w-4" />,
  sunset: <SunsetIcon />,
};

function SunsetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M12 10V2" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M22 22H2" />
      <path d="m16 6-4 4-4-4" />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </svg>
  );
}

const weatherIcons: Record<WeatherCondition, React.ReactNode> = {
  sunny: <Sun className="h-4 w-4 text-yellow-400" />,
  cloudy: <Cloud className="h-4 w-4 text-muted-foreground" />,
  partly: <CloudSun className="h-4 w-4 text-sky-400" />,
  rain: <CloudRain className="h-4 w-4 text-blue-400" />,
  storm: <CloudLightning className="h-4 w-4 text-warning" />,
  snow: <Snowflake className="h-4 w-4 text-sky-200" />,
  fog: <CloudFog className="h-4 w-4 text-muted-foreground" />,
};

/* ------------------------------------------------------------------ */
/*  Demo trip builder                                                  */
/* ------------------------------------------------------------------ */

const buildDemoTrip = (): TimelineTrip => {
  const start = new Date(2025, 9, 15); // Oct 15, 2025
  const end = new Date(2025, 9, 18); // Oct 18, 2025
  const kalimpong = destinations.find((d) => d.slug === "kalimpong");

  return {
    id: "demo-kalimpong-weekend",
    name: "Kalimpong Weekend Retreat",
    slug: "kalimpong",
    image:
      kalimpong?.heroImage ??
      "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=800&auto=format&fit=crop",
    location: "Kalimpong, West Bengal",
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    days: [
      {
        day: 1,
        title: "Arrival & Exploration",
        activities: [
          { time: "10:00 AM", name: "Arrive in Kalimpong", icon: "bus", location: "Kalimpong Bus Stand" },
          { time: "11:30 AM", name: "Hotel Check-in", icon: "checkin", location: "Mountain View Homestay" },
          { time: "04:00 PM", name: "Sunset at Deolo Hill", icon: "sunset", location: "Deolo Hill" },
          { time: "07:30 PM", name: "Dinner at Local Restaurant", icon: "food", location: "Gompas Restaurant" },
        ],
      },
      {
        day: 2,
        title: "Nature & Culture",
        activities: [
          { time: "05:30 AM", name: "Sunrise at Durpin Monastery", icon: "sunrise", location: "Durpin Monastery" },
          { time: "08:00 AM", name: "Breakfast at Cafe", icon: "food", location: "Art Cafe" },
          { time: "10:00 AM", name: "Waterfall Trek", icon: "trek", location: "Neora Valley Trail" },
          { time: "01:00 PM", name: "Lunch & Rest", icon: "food", location: "Homestay" },
          { time: "03:30 PM", name: "Local Market Tour", icon: "market", location: "Kalimpong Haat" },
          { time: "07:00 PM", name: "Campfire Evening", icon: "campfire", location: "Homestay Garden" },
        ],
      },
      {
        day: 3,
        title: "Departure",
        activities: [
          { time: "08:00 AM", name: "Breakfast & Packing", icon: "food", location: "Homestay" },
          { time: "10:00 AM", name: "Check-out", icon: "checkout", location: "Mountain View Homestay" },
          { time: "11:00 AM", name: "Souvenir Shopping", icon: "market", location: "Main Market" },
          { time: "02:00 PM", name: "Departure", icon: "bus", location: "Kalimpong Bus Stand" },
        ],
      },
    ],
    hotel: {
      name: "Mountain View Homestay",
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=800&auto=format&fit=crop",
      checkIn: "11:30 AM",
      checkOut: "10:00 AM",
    },
    transport: {
      type: "bus",
      number: "SBSTC-2847",
      from: "Siliguri",
      to: "Kalimpong",
      departure: "07:00 AM",
      arrival: "10:00 AM",
    },
    weather: [
      { date: addDays(start, 0).toISOString(), condition: "sunny", high: 22, low: 14 },
      { date: addDays(start, 1).toISOString(), condition: "partly", high: 20, low: 13 },
      { date: addDays(start, 2).toISOString(), condition: "cloudy", high: 19, low: 12 },
    ],
    packingPreview: [
      "Warm clothes",
      "Trekking shoes",
      "Rain jacket",
      "Sunscreen",
      "Power bank",
      "Camera",
    ],
    status: "upcoming",
    source: "demo",
  };
};

/* ------------------------------------------------------------------ */
/*  Data loaders                                                       */
/* ------------------------------------------------------------------ */

function loadBookings(): BookingTrip[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("kv-bookings");
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return [];
}

function loadItineraries(): SavedItinerary[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("hg-itineraries");
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return [];
}

function convertBookingToTrip(b: BookingTrip): TimelineTrip | null {
  const first = b.items[0];
  if (!first) return null;
  const dest = destinations.find(
    (d) =>
      d.name.toLowerCase() === first.location.toLowerCase() ||
      d.slug === first.location.toLowerCase().replace(/\s+/g, "-")
  );
  const image = first.image || dest?.heroImage || "";
  const start = parseDate(first.date);
  const end = addDays(start, 2);

  return {
    id: b.id,
    name: first.name,
    slug: dest?.slug || "unknown",
    image,
    location: first.location,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    days: [
      {
        day: 1,
        title: "Day 1",
        activities: [
          { time: "10:00 AM", name: "Arrive", icon: "bus", location: first.location },
          { time: "12:00 PM", name: "Check-in", icon: "checkin", location: "Hotel" },
          { time: "04:00 PM", name: "Local Exploration", icon: "camera", location: "City Center" },
        ],
      },
      {
        day: 2,
        title: "Day 2",
        activities: [
          { time: "09:00 AM", name: "Breakfast", icon: "food", location: "Hotel" },
          { time: "11:00 AM", name: "Sightseeing", icon: "camera", location: "Main Attraction" },
          { time: "02:00 PM", name: "Check-out", icon: "checkout", location: "Hotel" },
          { time: "04:00 PM", name: "Departure", icon: "bus", location: first.location },
        ],
      },
    ],
    weather: [
      { date: start.toISOString(), condition: "partly", high: 21, low: 13 },
      { date: addDays(start, 1).toISOString(), condition: "sunny", high: 23, low: 14 },
    ],
    packingPreview: ["Warm clothes", "Camera", "Power bank"],
    status: b.status === "completed" || b.status === "cancelled" ? "past" : "upcoming",
    source: "booking",
  };
}

function convertItineraryToTrip(i: SavedItinerary): TimelineTrip | null {
  const dest = destinations.find((d) => d.slug === i.destinationSlug);
  if (!dest) return null;
  const start = parseDate(i.startDate);
  const end = addDays(start, i.days.length);

  return {
    id: i.id,
    name: i.name,
    slug: dest.slug,
    image: dest.heroImage,
    location: dest.name,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    days: i.days.map((d) => ({
      day: d.day,
      title: d.title,
      activities: d.activities.map((a) => ({
        time: a.time || "10:00 AM",
        name: a.name,
        icon: a.icon || "camera",
        location: a.location || dest.name,
      })),
    })),
    weather: i.days.map((_, idx) => ({
      date: addDays(start, idx).toISOString(),
      condition: (["partly", "sunny", "cloudy", "rain"][idx % 4] || "partly") as WeatherCondition,
      high: 20 + Math.floor(Math.random() * 5),
      low: 12 + Math.floor(Math.random() * 4),
    })),
    packingPreview: dest.packingList.slice(0, 6),
    status: start > new Date() ? "upcoming" : "past",
    source: "itinerary",
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TimelinePage() {
  const [mounted, setMounted] = useState(false);
  const [trips, setTrips] = useState<TimelineTrip[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showPast, setShowPast] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);

  useEffect(() => {
    const bookings = loadBookings();
    const itineraries = loadItineraries();

    const built: TimelineTrip[] = [];

    bookings.forEach((b) => {
      const t = convertBookingToTrip(b);
      if (t) built.push(t);
    });

    itineraries.forEach((i) => {
      const t = convertItineraryToTrip(i);
      if (t) built.push(t);
    });

    if (built.length === 0) {
      built.push(buildDemoTrip());
    }

    setTrips(built);
    setMounted(true);
  }, []);

  const upcoming = trips.filter((t) => t.status === "upcoming");
  const past = trips.filter((t) => t.status === "past");

  const handleCancel = (id: string) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "past" as const } : t))
    );
    setCancelConfirm(null);
    setExpandedId(null);
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              My Trip Timeline
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
              Your upcoming adventures, beautifully organized
            </p>
            <div className="mt-8">
              <Link href="/travel-planner">
                <Button variant="accent" size="md">
                  <Plus className="mr-2 h-4 w-4" />
                  Plan New Trip
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Timeline Content */}
      <section className="py-12 sm:py-16">
        <Container>
          {!mounted ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          ) : upcoming.length === 0 && past.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <CalendarDays className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                No upcoming trips
              </h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Plan your next adventure across the Himalayas.
              </p>
              <div className="mt-6">
                <Link href="/travel-planner">
                  <Button variant="primary">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Plan a Trip
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-10">
              {/* Upcoming */}
              {upcoming.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-foreground">
                    Upcoming Trips
                  </h2>
                  <div className="space-y-6">
                    {upcoming.map((trip, idx) => (
                      <TripCard
                        key={trip.id}
                        trip={trip}
                        index={idx}
                        expanded={expandedId === trip.id}
                        onToggle={() =>
                          setExpandedId((prev) =>
                            prev === trip.id ? null : trip.id
                          )
                        }
                        onCancel={() => setCancelConfirm(trip.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Past */}
              {past.length > 0 && (
                <div>
                  <button
                    onClick={() => setShowPast((p) => !p)}
                    className="mb-6 inline-flex items-center gap-2 text-lg font-bold text-foreground transition-colors hover:text-accent"
                  >
                    <History className="h-5 w-5" />
                    Your Travel History
                    {showPast ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {showPast && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 overflow-hidden"
                      >
                        {past.map((trip, idx) => (
                          <TripCard
                            key={trip.id}
                            trip={trip}
                            index={idx}
                            expanded={expandedId === trip.id}
                            onToggle={() =>
                              setExpandedId((prev) =>
                                prev === trip.id ? null : trip.id
                              )
                            }
                            onCancel={() => {}}
                            isPast
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* Cancel Confirmation */}
      <AnimatePresence>
        {cancelConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setCancelConfirm(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
            >
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Cancel Trip?
              </h3>
              <p className="mb-5 text-sm text-muted-foreground">
                This will mark the trip as cancelled. You can still view it in
                your travel history.
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCancelConfirm(null)}
                >
                  Keep Trip
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleCancel(cancelConfirm)}
                >
                  Confirm Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Trip Card                                                          */
/* ------------------------------------------------------------------ */

function TripCard({
  trip,
  index,
  expanded,
  onToggle,
  onCancel,
  isPast = false,
}: {
  trip: TimelineTrip;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onCancel: () => void;
  isPast?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Card
        hoverLift={!expanded}
        className={`overflow-hidden transition-all ${
          expanded ? "ring-1 ring-accent/30" : ""
        }`}
      >
        {/* Summary */}
        <div
          className="cursor-pointer"
          onClick={onToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onToggle();
          }}
        >
          <div className="relative h-48 w-full overflow-hidden sm:h-56">
            <Image
              src={trip.image}
              alt={trip.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {trip.name}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-white/80">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {trip.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(trip.startDate)} -{" "}
                      {formatDate(trip.endDate)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isPast && (
                    <Badge variant="accent" className="text-xs">
                      {countdownText(trip.startDate)}
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-white/30 text-white text-xs">
                    {trip.days.length} day{trip.days.length !== 1 ? "s" : ""}
                  </Badge>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    {expanded ? (
                      <ChevronUp className="h-4 w-4 text-white" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-border p-5 sm:p-6">
                {/* Day-by-day timeline */}
                <div className="mb-8">
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Day-by-Day Itinerary
                  </h4>
                  <div className="space-y-6">
                    {trip.days.map((day) => (
                      <DayTimeline
                        key={day.day}
                        day={day}
                        isLast={day.day === trip.days.length}
                      />
                    ))}
                  </div>
                </div>

                {/* Hotel + Transport + Weather + Packing */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {trip.hotel && <HotelCard hotel={trip.hotel} />}
                  {trip.transport && <TransportCard transport={trip.transport} />}
                  {trip.weather.length > 0 && <WeatherCard weather={trip.weather} />}
                  {trip.packingPreview.length > 0 && (
                    <PackingCard items={trip.packingPreview} />
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/destinations/${trip.slug}`}>
                      <Button size="sm" variant="primary">
                        <ArrowRight className="mr-1 h-3.5 w-3.5" />
                        View Full Itinerary
                      </Button>
                    </Link>
                  </div>
                  {!isPast && (
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        Modify
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCancel();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                  {isPast && (
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Star className="mr-1 h-3.5 w-3.5" />
                        Add Review
                      </Button>
                      <Button size="sm" variant="outline">
                        <Camera className="mr-1 h-3.5 w-3.5" />
                        View Photos
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Day Timeline                                                       */
/* ------------------------------------------------------------------ */

function DayTimeline({
  day,
  isLast,
}: {
  day: ItineraryDay;
  isLast: boolean;
}) {
  return (
    <div className="relative pl-8 sm:pl-10">
      {/* Vertical connector line */}
      {!isLast && (
        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border sm:left-[17px]" />
      )}

      {/* Day header dot */}
      <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent sm:h-9 sm:w-9">
        <span className="text-xs font-bold">{day.day}</span>
      </div>

      <div className="pb-2">
        <h5 className="text-sm font-semibold text-foreground">
          Day {day.day}: {day.title}
        </h5>
      </div>

      {/* Activities */}
      <div className="space-y-3 pt-1">
        {day.activities.map((act, i) => (
          <div
            key={i}
            className="relative flex items-start gap-3 rounded-lg bg-muted/30 p-3"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              {activityIcons[act.icon] ?? <MapPin className="h-3.5 w-3.5" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {act.time}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {act.name}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {act.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-cards                                                          */
/* ------------------------------------------------------------------ */

function HotelCard({
  hotel,
}: {
  hotel: { name: string; image: string; checkIn: string; checkOut: string };
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Hotel className="h-4 w-4 text-accent" />
        Stay
      </div>
      <div className="relative mb-2 h-24 w-full overflow-hidden rounded-lg">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="200px"
        />
      </div>
      <p className="text-sm font-medium text-foreground">{hotel.name}</p>
      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> In {hotel.checkIn}
        </span>
        <span className="inline-flex items-center gap-1">
          <X className="h-3 w-3" /> Out {hotel.checkOut}
        </span>
      </div>
    </div>
  );
}

function TransportCard({
  transport,
}: {
  transport: {
    type: "flight" | "train" | "bus" | "car";
    number: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
  };
}) {
  const TypeIcon =
    {
      flight: Plane,
      train: Train,
      bus: Bus,
      car: Car,
    }[transport.type] || Bus;

  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
        <TypeIcon className="h-4 w-4 text-accent" />
        Transport
      </div>
      <p className="text-sm font-medium text-foreground">{transport.number}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <span>{transport.from}</span>
        <ArrowRight className="h-3 w-3" />
        <span>{transport.to}</span>
      </div>
      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" /> Dep {transport.departure}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" /> Arr {transport.arrival}
        </span>
      </div>
    </div>
  );
}

function WeatherCard({ weather }: { weather: WeatherDay[] }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Thermometer className="h-4 w-4 text-accent" />
        Weather
      </div>
      <div className="space-y-2">
        {weather.slice(0, 3).map((w, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {new Date(w.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </span>
            <div className="flex items-center gap-2">
              {weatherIcons[w.condition]}
              <span className="text-foreground">
                {w.high}° / {w.low}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PackingCard({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Luggage className="h-4 w-4 text-accent" />
        Packing
      </div>
      <div className="space-y-1.5">
        {items.slice(0, 5).map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Circle className="h-2 w-2 shrink-0 fill-muted-foreground" />
            <span className="line-clamp-1">{item}</span>
          </div>
        ))}
        {items.length > 5 && (
          <p className="text-xs text-accent">+{items.length - 5} more</p>
        )}
      </div>
    </div>
  );
}
