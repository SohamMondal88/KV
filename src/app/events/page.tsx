"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Snowflake,
  Flower2,
  CloudRain,
  Leaf,
} from "lucide-react";
import { destinations, events as baseEvents } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/* ─── Types ─── */
interface CalendarEvent {
  id: string;
  name: string;
  description: string;
  months: number[];
  location: string;
  image: string;
  type: "festival" | "cultural" | "adventure" | "seasonal";
  dayLabel?: string;
}

/* ─── Additional Events ─── */
const additionalEvents: CalendarEvent[] = [
  {
    id: "evt-add-1",
    name: "Losar",
    description: "Tibetan New Year celebration with prayers, traditional dances, and festive feasts across monasteries.",
    months: [2, 3],
    location: "Kalimpong, Pelling",
    image: "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=800&auto=format&fit=crop",
    type: "festival",
    dayLabel: "Feb-Mar",
  },
  {
    id: "evt-add-2",
    name: "Buddha Jayanti",
    description: "Sacred celebrations at Buddhist monasteries marking the birth, enlightenment, and parinirvana of Buddha.",
    months: [5],
    location: "All Buddhist destinations",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    type: "cultural",
    dayLabel: "May",
  },
  {
    id: "evt-add-3",
    name: "Dashain",
    description: "The biggest Nepali festival celebrated with rituals, feasts, and community gatherings across the hills.",
    months: [10],
    location: "All WB destinations",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    type: "festival",
    dayLabel: "Oct",
  },
  {
    id: "evt-add-4",
    name: "Tihar",
    description: "Festival of lights where homes are decorated with oil lamps, candles, and colorful rangoli.",
    months: [11],
    location: "All destinations",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    type: "festival",
    dayLabel: "Nov",
  },
  {
    id: "evt-add-5",
    name: "Cherry Blossom Festival",
    description: "Witness the hills turn pink with stunning cherry blossoms in full bloom.",
    months: [11],
    location: "Sittong, Ahaldhara",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop",
    type: "seasonal",
    dayLabel: "Nov",
  },
  {
    id: "evt-add-6",
    name: "Tea Tourism Festival",
    description: "Celebrate the rich tea heritage with estate tours, tastings, and cultural performances.",
    months: [11],
    location: "Darjeeling, Mirik, Peshok",
    image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=800&auto=format&fit=crop",
    type: "cultural",
    dayLabel: "Nov",
  },
  {
    id: "evt-add-7",
    name: "Orange Harvest",
    description: "Walk through fragrant orange orchards and taste freshly picked organic citrus fruits.",
    months: [12, 1],
    location: "Sittong",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop",
    type: "seasonal",
    dayLabel: "Dec-Jan",
  },
  {
    id: "evt-add-8",
    name: "Rhododendron Bloom",
    description: "The hills explode in crimson and pink as ancient rhododendron forests come alive.",
    months: [3, 4],
    location: "Chatakpur, Kolakham",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
    type: "seasonal",
    dayLabel: "Mar-Apr",
  },
  {
    id: "evt-add-9",
    name: "Snow Festival",
    description: "Experience snowfall, snowmen, and winter sports in high-altitude Himalayan destinations.",
    months: [1],
    location: "High altitude destinations",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
    type: "adventure",
    dayLabel: "Jan",
  },
  {
    id: "evt-add-10",
    name: "River Festival",
    description: "Celebrate riverside life with camping, fishing, and water activities along pristine Himalayan rivers.",
    months: [6],
    location: "Rishikhola, Bijanbari",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    type: "adventure",
    dayLabel: "Jun",
  },
  {
    id: "evt-add-11",
    name: "Monsoon Photography",
    description: "Capture misty mountains, roaring waterfalls, and lush green valleys during the monsoon.",
    months: [7, 8],
    location: "All green destinations",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    type: "seasonal",
    dayLabel: "Jul-Aug",
  },
  {
    id: "evt-add-12",
    name: "Independence Day Trek",
    description: "A patriotic trekking event to Sandakphu with flag hoisting at the summit.",
    months: [8],
    location: "Sandakphu",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    type: "adventure",
    dayLabel: "Aug",
  },
];

/* ─── Merge with base events ─── */
function mapBaseEvent(e: (typeof baseEvents)[number]): CalendarEvent {
  const monthMap: Record<string, number[]> = {
    "February - March": [2, 3],
    November: [11],
  };
  return {
    id: e.id,
    name: e.name,
    description: e.description,
    months: monthMap[e.date] || [1],
    location: e.location,
    image: e.image,
    type: e.type,
    dayLabel: e.date,
  };
}

const allEvents: CalendarEvent[] = [...baseEvents.map(mapBaseEvent), ...additionalEvents];

const monthNames = [
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

const typeLabel: Record<string, string> = {
  festival: "Festival",
  cultural: "Cultural",
  adventure: "Adventure",
  seasonal: "Seasonal",
};

const typeVariant: Record<string, "default" | "primary" | "secondary" | "accent" | "outline" | "ghost"> = {
  festival: "accent",
  cultural: "primary",
  adventure: "secondary",
  seasonal: "outline",
};

const seasonalHighlights = [
  {
    season: "Winter",
    months: "Dec – Feb",
    icon: Snowflake,
    color: "text-sky-300",
    bg: "bg-sky-500/10 border-sky-500/20",
    points: ["Snow-covered peaks", "Crystal clear mountain views", "Fewer crowds, peaceful stays"],
  },
  {
    season: "Spring",
    months: "Mar – May",
    icon: Flower2,
    color: "text-pink-300",
    bg: "bg-pink-500/10 border-pink-500/20",
    points: ["Rhododendron blooms", "Pleasant weather", "Best season for trekking"],
  },
  {
    season: "Summer",
    months: "Jun – Aug",
    icon: CloudRain,
    color: "text-emerald-300",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    points: ["Lush green valleys", "Misty mountain trails", "Roaring waterfalls"],
  },
  {
    season: "Autumn",
    months: "Sep – Nov",
    icon: Leaf,
    color: "text-amber-300",
    bg: "bg-amber-500/10 border-amber-500/20",
    points: ["Clear skies", "Harvest festivals", "Best photography light"],
  },
];

/* ─── Components ─── */
function MonthSelector({
  selected,
  onSelect,
  eventCounts,
}: {
  selected: number;
  onSelect: (m: number) => void;
  eventCounts: number[];
}) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {monthNames.map((name, idx) => {
        const active = idx === selected;
        return (
          <button
            key={name}
            onClick={() => onSelect(idx)}
            className={`relative flex shrink-0 flex-col items-center rounded-xl border px-4 py-3 text-sm transition-all ${
              active
                ? "border-accent-gold/50 bg-accent/15 text-accent-gold shadow-[0_0_20px_rgba(246,196,83,0.15)]"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span className="text-[10px] font-medium uppercase tracking-wider">{name.slice(0, 3)}</span>
            <span className="mt-0.5 text-lg font-bold">{eventCounts[idx]}</span>
            <span className="text-[10px]">events</span>
            {active && (
              <motion.div
                layoutId="month-dot"
                className="absolute -bottom-1 h-1 w-6 rounded-full bg-accent-gold"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function EventCard({ evt, index }: { evt: CalendarEvent; index: number }) {
  const [copied, setCopied] = useState(false);

  const destSlug = destinations.find(
    (d) =>
      evt.location.toLowerCase().includes(d.name.toLowerCase()) ||
      d.name.toLowerCase().includes(evt.location.split(",")[0].toLowerCase())
  )?.slug;

  const handleCopy = () => {
    const text = `${evt.name} — ${evt.location} (${evt.dayLabel})\n${evt.description}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-glass shadow-lg backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row">
          {/* Date Badge */}
          <div className="relative flex shrink-0 flex-col items-center justify-center border-b border-white/10 bg-white/5 p-5 text-center sm:w-28 sm:border-b-0 sm:border-r">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {evt.months.length === 1 ? monthNames[evt.months[0]].slice(0, 3) : "Multi"}
            </span>
            <span className="mt-1 text-3xl font-bold text-accent-gold">{evt.dayLabel}</span>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-foreground">{evt.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {evt.location}
                  </span>
                </div>
              </div>
              <Badge variant={typeVariant[evt.type] || "default"}>{typeLabel[evt.type] || evt.type}</Badge>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{evt.description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {destSlug && (
                <Link href={`/destinations/${destSlug}`}>
                  <Badge variant="outline" className="cursor-pointer gap-1 text-xs hover:bg-white/5">
                    <ExternalLink className="h-3 w-3" />
                    View Destination
                  </Badge>
                </Link>
              )}
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Add to Calendar"}
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden h-auto w-48 shrink-0 overflow-hidden lg:block">
            <Image
              src={evt.image}
              alt={evt.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-glass to-transparent" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function EventsPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const eventCounts = useMemo(() => {
    return monthNames.map((_, idx) => allEvents.filter((e) => e.months.includes(idx)).length);
  }, []);

  const filteredEvents = useMemo(
    () => allEvents.filter((e) => e.months.includes(selectedMonth)),
    [selectedMonth]
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <Container className="py-20">
          <div className="h-8 w-56 animate-pulse rounded-lg bg-muted" />
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Events & Festivals</h1>
            <p className="mt-3 text-lg text-primary-foreground/80">
              Celebrate the Himalayas — season by season
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-10">
        {/* Month Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <MonthSelector selected={selectedMonth} onSelect={setSelectedMonth} eventCounts={eventCounts} />
        </motion.div>

        {/* Events List */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMonth}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16 text-center">
                  <CalendarDays className="mb-3 h-10 w-10 text-muted-foreground/40" />
                  <h3 className="text-lg font-semibold text-foreground">No events this month</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Check another month for celebrations.</p>
                </div>
              ) : (
                filteredEvents.map((evt, i) => <EventCard key={evt.id} evt={evt} index={i} />)
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Seasonal Highlights */}
        <div className="mt-16">
          <SectionHeading
            title="Seasonal Highlights"
            subtitle="What to expect across the year in the Himalayas"
            align="center"
            accentColor="bg-accent"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {seasonalHighlights.map((s, i) => (
              <motion.div
                key={s.season}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-5 ${s.bg}`}
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold text-foreground">{s.season}</h4>
                <p className="text-xs font-medium text-muted-foreground">{s.months}</p>
                <ul className="mt-3 space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
