"use client";

import React, { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Backpack,
  Check,
  Shirt,
  Footprints,
  Camera,
  Pill,
  FileText,
  Zap,
  Utensils,
  Coffee,
  Printer,
  Copy,
  RotateCcw,
  Mountain,
  CalendarDays,
  Timer,
  Compass,
  User,
  Briefcase,
  Info,
  CheckSquare,
  Square,
} from "lucide-react";
import { destinations } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

/* ─── Types ─── */
type CategoryKey =
  | "clothing"
  | "toiletries"
  | "electronics"
  | "documents"
  | "health"
  | "food"
  | "accessories"
  | "activity";

type ActivityKey =
  | "Trekking"
  | "Camping"
  | "Photography"
  | "Water Activities"
  | "Cultural Tours";

type Gender = "Male" | "Female" | "Unisex";
type TravelStyle = "Budget" | "Mid-Range" | "Luxury";

interface PackingItem {
  id: string;
  name: string;
  category: CategoryKey;
  weightGrams: number;
  qty?: number; // optional multiplier hint (for display only)
}

/* ─── Helpers ─── */
const parseAltitude = (alt: string): number => {
  const num = parseInt(alt.replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 0 : num;
};

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

const categoryMeta: Record<
  CategoryKey,
  { label: string; icon: React.ElementType }
> = {
  clothing: { label: "Clothing & Footwear", icon: Shirt },
  toiletries: { label: "Toiletries & Personal Care", icon: Coffee },
  electronics: { label: "Electronics & Gadgets", icon: Zap },
  documents: { label: "Documents & Money", icon: FileText },
  health: { label: "Health & First Aid", icon: Pill },
  food: { label: "Food & Snacks", icon: Utensils },
  accessories: { label: "Accessories", icon: Backpack },
  activity: { label: "Activity Gear", icon: Camera },
};

/* ─── Base List ─── */
const BASE_ITEMS: PackingItem[] = [
  // Clothing
  { id: "underwear", name: "Underwear", category: "clothing", weightGrams: 80 },
  { id: "socks", name: "Socks", category: "clothing", weightGrams: 60 },
  { id: "tshirts", name: "T-shirts", category: "clothing", weightGrams: 250 },
  { id: "light-jacket", name: "Light jacket", category: "clothing", weightGrams: 600 },
  { id: "comfy-pants", name: "Comfortable pants", category: "clothing", weightGrams: 400 },
  { id: "sleepwear", name: "Sleepwear", category: "clothing", weightGrams: 300 },
  // Footwear
  { id: "walking-shoes", name: "Comfortable walking shoes", category: "clothing", weightGrams: 900 },
  { id: "flip-flops", name: "Flip-flops", category: "clothing", weightGrams: 250 },
  // Toiletries
  { id: "toothbrush", name: "Toothbrush", category: "toiletries", weightGrams: 30 },
  { id: "toothpaste", name: "Toothpaste", category: "toiletries", weightGrams: 100 },
  { id: "soap", name: "Soap", category: "toiletries", weightGrams: 100 },
  { id: "shampoo", name: "Shampoo", category: "toiletries", weightGrams: 150 },
  { id: "towel", name: "Towel", category: "toiletries", weightGrams: 300 },
  { id: "sunscreen", name: "Sunscreen", category: "toiletries", weightGrams: 120 },
  { id: "moisturizer", name: "Moisturizer", category: "toiletries", weightGrams: 100 },
  // Electronics
  { id: "phone", name: "Phone", category: "electronics", weightGrams: 200 },
  { id: "charger", name: "Charger", category: "electronics", weightGrams: 80 },
  { id: "power-bank", name: "Power bank", category: "electronics", weightGrams: 250 },
  { id: "headphones", name: "Headphones", category: "electronics", weightGrams: 180 },
  // Documents
  { id: "id-proof", name: "ID proof", category: "documents", weightGrams: 20 },
  { id: "hotel-bookings", name: "Hotel bookings", category: "documents", weightGrams: 10 },
  { id: "cash", name: "Cash", category: "documents", weightGrams: 50 },
  { id: "cards", name: "Cards", category: "documents", weightGrams: 20 },
  // Health
  { id: "prescription-meds", name: "Prescription medicines", category: "health", weightGrams: 200 },
  { id: "pain-relievers", name: "Pain relievers", category: "health", weightGrams: 50 },
  { id: "band-aids", name: "Band-aids", category: "health", weightGrams: 30 },
  // Accessories
  { id: "sunglasses", name: "Sunglasses", category: "accessories", weightGrams: 40 },
  { id: "hat-cap", name: "Hat / Cap", category: "accessories", weightGrams: 80 },
  { id: "day-backpack", name: "Day backpack", category: "accessories", weightGrams: 700 },
  { id: "water-bottle", name: "Water bottle", category: "accessories", weightGrams: 300 },
];

/* ─── Conditional Additions ─── */
const COLD_WEATHER: PackingItem[] = [
  { id: "heavy-jacket", name: "Heavy jacket", category: "clothing", weightGrams: 1200 },
  { id: "thermal-inner", name: "Thermal innerwear", category: "clothing", weightGrams: 400 },
  { id: "woolen-cap", name: "Woolen cap", category: "clothing", weightGrams: 100 },
  { id: "gloves", name: "Gloves", category: "clothing", weightGrams: 100 },
  { id: "woolen-socks", name: "Woolen socks", category: "clothing", weightGrams: 100 },
  { id: "scarves", name: "Scarves", category: "clothing", weightGrams: 150 },
];

const MONSOON: PackingItem[] = [
  { id: "rain-jacket", name: "Rain jacket / poncho", category: "clothing", weightGrams: 400 },
  { id: "waterproof-cover", name: "Waterproof bag cover", category: "accessories", weightGrams: 150 },
  { id: "umbrella", name: "Umbrella", category: "accessories", weightGrams: 350 },
  { id: "quick-dry-clothes", name: "Quick-dry clothes", category: "clothing", weightGrams: 300 },
  { id: "extra-socks", name: "Extra socks", category: "clothing", weightGrams: 60 },
  { id: "waterproof-footwear", name: "Waterproof footwear", category: "clothing", weightGrams: 800 },
];

const SUMMER: PackingItem[] = [
  { id: "light-cotton", name: "Light cotton clothes", category: "clothing", weightGrams: 250 },
  { id: "sun-hat", name: "Sun hat", category: "accessories", weightGrams: 100 },
  { id: "extra-sunscreen", name: "Extra sunscreen", category: "toiletries", weightGrams: 120 },
  { id: "cooling-towel", name: "Cooling towel", category: "toiletries", weightGrams: 100 },
];

const TREKKING: PackingItem[] = [
  { id: "trekking-shoes", name: "Trekking shoes", category: "activity", weightGrams: 1100 },
  { id: "trekking-poles", name: "Trekking poles", category: "activity", weightGrams: 500 },
  { id: "headlamp", name: "Headlamp", category: "activity", weightGrams: 120 },
  { id: "whistle", name: "Whistle", category: "activity", weightGrams: 20 },
  { id: "hydration-pack", name: "Hydration pack", category: "activity", weightGrams: 400 },
  { id: "energy-bars", name: "Energy bars", category: "food", weightGrams: 300 },
  { id: "blister-pads", name: "Blister pads", category: "health", weightGrams: 30 },
  { id: "gaiters", name: "Gaiters", category: "activity", weightGrams: 150 },
];

const CAMPING: PackingItem[] = [
  { id: "sleeping-bag-liner", name: "Sleeping bag liner", category: "activity", weightGrams: 500 },
  { id: "insect-repellent", name: "Insect repellent", category: "toiletries", weightGrams: 100 },
  { id: "swiss-knife", name: "Swiss knife", category: "activity", weightGrams: 150 },
  { id: "rope", name: "Rope", category: "activity", weightGrams: 300 },
  { id: "portable-stove", name: "Portable stove (if not provided)", category: "activity", weightGrams: 600 },
];

const PHOTOGRAPHY: PackingItem[] = [
  { id: "camera-lenses", name: "Camera + lenses", category: "activity", weightGrams: 1200 },
  { id: "tripod", name: "Tripod", category: "activity", weightGrams: 900 },
  { id: "extra-batteries", name: "Extra batteries", category: "electronics", weightGrams: 200 },
  { id: "memory-cards", name: "Memory cards", category: "electronics", weightGrams: 20 },
  { id: "lens-cloth", name: "Lens cloth", category: "toiletries", weightGrams: 10 },
  { id: "dry-bag", name: "Dry bag for gear", category: "activity", weightGrams: 200 },
];

const WATER: PackingItem[] = [
  { id: "swimwear", name: "Swimwear", category: "clothing", weightGrams: 150 },
  { id: "quick-dry-towel", name: "Quick-dry towel", category: "toiletries", weightGrams: 200 },
  { id: "waterproof-phone-case", name: "Waterproof phone case", category: "electronics", weightGrams: 80 },
  { id: "aqua-shoes", name: "Aqua shoes", category: "clothing", weightGrams: 400 },
];

const BUDGET: PackingItem[] = [
  { id: "instant-noodles", name: "Instant noodles / snacks", category: "food", weightGrams: 400 },
  { id: "reusable-bottle", name: "Reusable water bottle", category: "accessories", weightGrams: 150 },
  { id: "basic-first-aid", name: "Basic first aid kit", category: "health", weightGrams: 200 },
];

const LUXURY: PackingItem[] = [
  { id: "formal-wear", name: "Formal wear", category: "clothing", weightGrams: 800 },
  { id: "nice-shoes-jewelry", name: "Nice shoes / jewelry", category: "clothing", weightGrams: 600 },
  { id: "portable-iron", name: "Portable iron", category: "electronics", weightGrams: 700 },
  { id: "travel-perfume", name: "Travel perfume", category: "toiletries", weightGrams: 60 },
  { id: "shoe-care", name: "Shoe care kit", category: "toiletries", weightGrams: 200 },
];

const FEMALE: PackingItem[] = [
  { id: "sanitary-supplies", name: "Sanitary supplies", category: "toiletries", weightGrams: 200 },
  { id: "hair-ties", name: "Hair ties", category: "toiletries", weightGrams: 20 },
  { id: "light-makeup", name: "Light makeup kit", category: "toiletries", weightGrams: 250 },
];

const MALE: PackingItem[] = [
  { id: "shaving-kit", name: "Shaving kit", category: "toiletries", weightGrams: 150 },
  { id: "aftershave", name: "Aftershave", category: "toiletries", weightGrams: 100 },
];

/* ─── Page Component ─── */
export default function PackingListPage() {
  const [destinationSlug, setDestinationSlug] = useState<string>("");
  const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth());
  const [duration, setDuration] = useState<number>(3);
  const [activities, setActivities] = useState<ActivityKey[]>([]);
  const [gender, setGender] = useState<Gender>("Unisex");
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("Mid-Range");
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const destination = useMemo(
    () => destinations.find((d) => d.slug === destinationSlug) || null,
    [destinationSlug]
  );

  const altitude = useMemo(() => {
    if (!destination) return 0;
    return parseAltitude(destination.altitude);
  }, [destination]);

  const month = monthIndex + 1; // 1-12

  /* Generate items */
  const items = useMemo(() => {
    let list = [...BASE_ITEMS];

    // Cold weather: altitude > 1500 OR month Nov-Feb
    if (altitude > 1500 || month === 11 || month === 12 || month === 1 || month === 2) {
      list = [...list, ...COLD_WEATHER];
    }

    // Monsoon: Jun-Sep
    if (month >= 6 && month <= 9) {
      list = [...list, ...MONSOON];
    }

    // Summer: Apr-Jun AND altitude < 1500
    if ((month >= 4 && month <= 6) && altitude < 1500) {
      list = [...list, ...SUMMER];
    }

    // Activities
    if (activities.includes("Trekking")) list = [...list, ...TREKKING];
    if (activities.includes("Camping")) list = [...list, ...CAMPING];
    if (activities.includes("Photography")) list = [...list, ...PHOTOGRAPHY];
    if (activities.includes("Water Activities")) list = [...list, ...WATER];

    // Budget
    if (travelStyle === "Budget") list = [...list, ...BUDGET];

    // Luxury
    if (travelStyle === "Luxury") list = [...list, ...LUXURY];

    // Gender
    if (gender === "Female") list = [...list, ...FEMALE];
    if (gender === "Male") list = [...list, ...MALE];

    return list;
  }, [altitude, month, activities, travelStyle, gender]);

  /* Apply duration multiplier for select clothing items */
  const displayedItems = useMemo(() => {
    const multiplier = Math.max(1, Math.min(duration, 10));
    return items.map((item) => {
      if (["underwear", "socks", "tshirts"].includes(item.id)) {
        return { ...item, qty: multiplier };
      }
      return item;
    });
  }, [items, duration]);

  const grouped = useMemo(() => {
    const map: Record<CategoryKey, PackingItem[]> = {
      clothing: [],
      toiletries: [],
      electronics: [],
      documents: [],
      health: [],
      food: [],
      accessories: [],
      activity: [],
    };
    displayedItems.forEach((it) => {
      map[it.category].push(it);
    });
    return map;
  }, [displayedItems]);

  const totalItems = displayedItems.length;
  const packedItems = checkedIds.size;
  const percentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  const totalWeight = useMemo(() => {
    return displayedItems.reduce((sum, it) => {
      const qty = it.qty ?? 1;
      return sum + it.weightGrams * qty;
    }, 0);
  }, [displayedItems]);

  const toggleItem = useCallback((id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const markAll = useCallback(
    (category: CategoryKey) => {
      setCheckedIds((prev) => {
        const next = new Set(prev);
        grouped[category].forEach((it) => next.add(it.id));
        return next;
      });
    },
    [grouped]
  );

  const unmarkAll = useCallback(
    (category: CategoryKey) => {
      setCheckedIds((prev) => {
        const next = new Set(prev);
        grouped[category].forEach((it) => next.delete(it.id));
        return next;
      });
    },
    [grouped]
  );

  const resetAll = useCallback(() => {
    setCheckedIds(new Set());
  }, []);

  const handleCopy = useCallback(() => {
    const lines: string[] = [];
    lines.push(`Packing List for ${destination?.name || "Trip"} — ${MONTHS[monthIndex]} (${duration} days)`);
    lines.push("");
    (Object.keys(grouped) as CategoryKey[]).forEach((cat) => {
      const list = grouped[cat];
      if (list.length === 0) return;
      lines.push(`${categoryMeta[cat].label}:`);
      list.forEach((it) => {
        const qty = it.qty ?? 1;
        const prefix = checkedIds.has(it.id) ? "[x]" : "[ ]";
        lines.push(`  ${prefix} ${it.name}${qty > 1 ? ` (x${qty})` : ""}`);
      });
      lines.push("");
    });
    lines.push(`Estimated weight: ${(totalWeight / 1000).toFixed(1)} kg`);
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      alert("Packing list copied to clipboard!");
    });
  }, [grouped, destination, monthIndex, duration, checkedIds, totalWeight]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const toggleActivity = (act: ActivityKey) => {
    setActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  /* Dynamic Tips */
  const tips = useMemo(() => {
    const t: string[] = [];
    if (travelStyle === "Budget") {
      t.push("Pack light! Most homestays provide blankets.");
    }
    if (altitude > 1500) {
      t.push("High altitude means colder nights — layer up!");
    }
    if (month >= 6 && month <= 9) {
      t.push("Monsoon season: waterproof your electronics and documents.");
    }
    if (activities.includes("Trekking")) {
      t.push("Break in your trekking shoes before the trip to avoid blisters.");
    }
    if (activities.includes("Camping")) {
      t.push("Check if your campsite provides tents / sleeping bags to save luggage space.");
    }
    if (activities.includes("Photography")) {
      t.push("Bring extra batteries — cold weather drains them faster.");
    }
    if (gender === "Female") {
      t.push("Carry sanitary supplies even if not expected — remote areas may not have shops.");
    }
    if (duration > 7) {
      t.push("Long trip? Plan to do laundry instead of over-packing clothes.");
    }
    if (destinationSlug === "rishikhola" || destinationSlug === "mirik") {
      t.push("Water activities spot — keep a quick-dry towel handy at all times.");
    }
    if (travelStyle === "Luxury") {
      t.push("Luxury hotels often provide toiletries and ironing services — double-check to avoid duplicates.");
    }
    return t;
  }, [travelStyle, altitude, month, activities, gender, duration, destinationSlug]);

  const activityOptions: { key: ActivityKey; label: string }[] = [
    { key: "Trekking", label: "Trekking" },
    { key: "Camping", label: "Camping" },
    { key: "Photography", label: "Photography" },
    { key: "Water Activities", label: "Water Activities" },
    { key: "Cultural Tours", label: "Cultural Tours" },
  ];

  return (
    <div className="flex flex-col">
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white; color: black; }
          .print-card { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
        .print-only { display: none; }
      `}</style>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest to-emerald-900 py-20 text-white">
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur"
          >
            <Backpack className="h-3.5 w-3.5" />
            Travel Ready
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Packing List Generator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Smart, personalized packing lists for every Hidden Gems adventure.
            Select your trip details and we'll build the perfect checklist.
          </motion.p>
        </Container>
      </section>

      <Container className="max-w-6xl py-12">
        {/* Inputs */}
        <section className="no-print mb-10">
          <Card className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
              <Compass className="h-5 w-5 text-primary" />
              Trip Details
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Destination */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Mountain className="h-4 w-4" />
                  Destination
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                  value={destinationSlug}
                  onChange={(e) => setDestinationSlug(e.target.value)}
                >
                  <option value="">Select destination</option>
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Month of Travel
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                  value={monthIndex}
                  onChange={(e) => setMonthIndex(Number(e.target.value))}
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  Duration (days)
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={duration}
                  onChange={(e) =>
                    setDuration(
                      Math.max(1, Math.min(30, Number(e.target.value) || 1))
                    )
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <User className="h-4 w-4" />
                  Gender
                </label>
                <div className="flex gap-3">
                  {(["Male", "Female", "Unisex"] as Gender[]).map((g) => (
                    <label
                      key={g}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        gender === g
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={gender === g}
                        onChange={() => setGender(g)}
                        className="hidden"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  Travel Style
                </label>
                <div className="flex gap-3">
                  {(["Budget", "Mid-Range", "Luxury"] as TravelStyle[]).map(
                    (s) => (
                      <label
                        key={s}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          travelStyle === s
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <input
                          type="radio"
                          name="style"
                          value={s}
                          checked={travelStyle === s}
                          onChange={() => setTravelStyle(s)}
                          className="hidden"
                        />
                        <span>{s}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Activities */}
              <div className="space-y-2 sm:col-span-2 lg:col-span-3">
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Footprints className="h-4 w-4" />
                  Activities
                </label>
                <div className="flex flex-wrap gap-3">
                  {activityOptions.map((act) => {
                    const active = activities.includes(act.key);
                    return (
                      <label
                        key={act.key}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={active}
                          onChange={() => toggleActivity(act.key)}
                        />
                        {active ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                        <span>{act.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Progress Bar */}
        <section className="mb-6">
          <div className="flex items-center justify-between text-sm font-medium text-foreground">
            <span>
              {packedItems}/{totalItems} items packed
            </span>
            <span className="text-primary">{percentage}% complete</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Estimated luggage weight:{" "}
            <span className="font-semibold text-foreground">
              {(totalWeight / 1000).toFixed(1)} kg
            </span>
          </div>
        </section>

        {/* Category Actions */}
        <div className="no-print mb-6 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            Copy List
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={resetAll}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Checklist */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {(Object.keys(grouped) as CategoryKey[]).map((cat) => {
              const list = grouped[cat];
              if (list.length === 0) return null;
              const Icon = categoryMeta[cat].icon;
              const allChecked = list.every((it) => checkedIds.has(it.id));
              return (
                <motion.div
                  key={cat}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="print-card overflow-hidden">
                    <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-4">
                      <div className="flex items-center gap-2 font-semibold text-foreground">
                        <Icon className="h-5 w-5 text-primary" />
                        {categoryMeta[cat].label}
                        <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {list.length}
                        </span>
                      </div>
                      <div className="no-print flex gap-2">
                        <button
                          onClick={() => markAll(cat)}
                          className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                        >
                          Mark All
                        </button>
                        <button
                          onClick={() => unmarkAll(cat)}
                          className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted"
                        >
                          Unmark All
                        </button>
                      </div>
                    </div>
                    <ul className="divide-y divide-border">
                      {list.map((item) => {
                        const checked = checkedIds.has(item.id);
                        const qty = item.qty ?? 1;
                        return (
                          <li
                            key={item.id}
                            className={`flex cursor-pointer items-center gap-3 px-5 py-3 transition-colors hover:bg-muted/40 ${
                              checked ? "bg-muted/30" : ""
                            }`}
                            onClick={() => toggleItem(item.id)}
                          >
                            <div
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                                checked
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-background"
                              }`}
                            >
                              {checked && <Check className="h-3.5 w-3.5" />}
                            </div>
                            <span
                              className={`flex-1 text-sm transition-all ${
                                checked
                                  ? "text-muted-foreground line-through opacity-60"
                                  : "text-foreground"
                              }`}
                            >
                              {item.name}
                              {qty > 1 && (
                                <span className="ml-1 text-xs text-muted-foreground">
                                  (x{qty})
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.weightGrams * qty}g
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Tips */}
        {tips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Card className="p-5">
              <div className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                <Info className="h-5 w-5 text-secondary" />
                Smart Tips
              </div>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}

        {/* Print-only summary */}
        <div className="print-only mt-8">
          <p className="text-sm text-muted-foreground">
            Generated by Hidden Gems Packing List Generator
          </p>
          <p className="text-sm text-muted-foreground">
            {destination?.name || "Trip"} &middot; {MONTHS[monthIndex]} &middot;{" "}
            {duration} days &middot; {travelStyle} &middot; {gender}
          </p>
          <p className="text-sm text-muted-foreground">
            Activities: {activities.join(", ") || "None selected"}
          </p>
        </div>
      </Container>
    </div>
  );
}
