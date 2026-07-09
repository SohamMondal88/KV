"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Calculator,
  Plane,
  Train,
  Bus,
  Car,
  Bike,
  Hotel,
  Utensils,
  Camera,
  Tent,
  MapPin,
  Save,
  Share,
  RotateCcw,
  Check,
  AlertTriangle,
  Mountain,
  Users,
  CalendarDays,
  Compass,
  BusFront,
  Landmark,
  Sparkles,
  Wallet,
} from "lucide-react";
import { destinations } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

/* ───────── Types ───────── */

type TravelStyle = "Budget" | "Mid-Range" | "Luxury";
type TransportMode = "Train" | "Flight" | "Bus" | "Car" | "Bike";
type AccommodationType = "Homestay" | "Budget Hotel" | "3-Star" | "4-Star" | "Luxury Resort";
type FoodPreference = "Local Only" | "Mix" | "Fine Dining";

type ActivityKey =
  | "Trekking"
  | "Boating"
  | "Paragliding"
  | "Camping"
  | "Wildlife Safari"
  | "Cultural Tour"
  | "Photography Tour";

type ExtrasKey = "Guide" | "Camera Permit" | "Insurance" | "Tips";

interface BudgetForm {
  destination: string;
  people: number;
  days: number;
  travelStyle: TravelStyle;
  transport: TransportMode;
  accommodation: AccommodationType;
  food: FoodPreference;
  activities: ActivityKey[];
  extras: ExtrasKey[];
  userBudget: string;
}

interface BudgetBreakdown {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  miscellaneous: number;
}

interface SavedCalc {
  id: string;
  timestamp: number;
  destination: string;
  people: number;
  days: number;
  total: number;
}

/* ───────── Constants ───────── */

const TRANSPORT_COSTS: Record<TransportMode, { cost: number; perPerson: boolean; perDay?: boolean }> = {
  Train: { cost: 500, perPerson: true },
  Flight: { cost: 5000, perPerson: true },
  Bus: { cost: 300, perPerson: true },
  Car: { cost: 3000, perPerson: false },
  Bike: { cost: 600, perPerson: false, perDay: true },
};

const ACCOMMODATION_COSTS: Record<AccommodationType, number> = {
  Homestay: 1200,
  "Budget Hotel": 2000,
  "3-Star": 3500,
  "4-Star": 6000,
  "Luxury Resort": 12000,
};

const FOOD_COSTS: Record<FoodPreference, number> = {
  "Local Only": 600,
  Mix: 1000,
  "Fine Dining": 2000,
};

const ACTIVITY_COSTS: Record<ActivityKey, number> = {
  Trekking: 1500,
  Boating: 500,
  Paragliding: 3000,
  Camping: 2000,
  "Wildlife Safari": 1000,
  "Cultural Tour": 800,
  "Photography Tour": 2500,
};

const EXTRAS_COSTS: Record<ExtrasKey, { cost: number; perPerson: boolean; perDay?: boolean }> = {
  Guide: { cost: 2000, perPerson: false, perDay: true },
  "Camera Permit": { cost: 500, perPerson: false },
  Insurance: { cost: 500, perPerson: true },
  Tips: { cost: 200, perPerson: false, perDay: true },
};

const ACTIVITY_LIST: ActivityKey[] = [
  "Trekking",
  "Boating",
  "Paragliding",
  "Camping",
  "Wildlife Safari",
  "Cultural Tour",
  "Photography Tour",
];

const EXTRAS_LIST: ExtrasKey[] = ["Guide", "Camera Permit", "Insurance", "Tips"];

const DEFAULT_FORM: BudgetForm = {
  destination: destinations[0]?.name || "",
  people: 2,
  days: 3,
  travelStyle: "Mid-Range",
  transport: "Train",
  accommodation: "Budget Hotel",
  food: "Mix",
  activities: [],
  extras: [],
  userBudget: "",
};

/* ───────── Helpers ───────── */

function formatCurrency(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

function calcBreakdown(form: BudgetForm): BudgetBreakdown {
  const { people, days, transport, accommodation, food, activities, extras } = form;

  const t = TRANSPORT_COSTS[transport];
  const transportCost = t.perDay ? t.cost * days : t.perPerson ? t.cost * people : t.cost;

  const accommodationCost = ACCOMMODATION_COSTS[accommodation] * days;

  const foodCost = FOOD_COSTS[food] * people * days;

  const activitiesCost = activities.reduce((sum, a) => sum + ACTIVITY_COSTS[a] * people, 0);

  const miscCost = extras.reduce((sum, e) => {
    const ec = EXTRAS_COSTS[e];
    let c = ec.cost;
    if (ec.perPerson) c *= people;
    if (ec.perDay) c *= days;
    return sum + c;
  }, 0);

  return {
    transport: transportCost,
    accommodation: accommodationCost,
    food: foodCost,
    activities: activitiesCost,
    miscellaneous: miscCost,
  };
}

function calcTotal(b: BudgetBreakdown): number {
  return b.transport + b.accommodation + b.food + b.activities + b.miscellaneous;
}

/* ───────── Animated Number ───────── */

function AnimatedNumber({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = display;
    const diff = value - from;

    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + diff * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <span>{formatCurrency(display)}</span>;
}

/* ───────── Breakdown Bar ───────── */

function BreakdownBar({
  label,
  amount,
  max,
  color,
}: {
  label: string;
  amount: number;
  max: number;
  color: string;
}) {
  const pct = max > 0 ? (amount / max) * 100 : 0;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{formatCurrency(amount)}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={color}
        />
      </div>
    </div>
  );
}

/* ───────── Main Page ───────── */

export default function TripCalculatorPage() {
  const [form, setForm] = useState<BudgetForm>(DEFAULT_FORM);
  const [showResults, setShowResults] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareDestinations, setCompareDestinations] = useState<string[]>([]);

  const destinationNames = useMemo(() => destinations.map((d) => d.name), []);

  const breakdown = useMemo(() => calcBreakdown(form), [form]);
  const total = useMemo(() => calcTotal(breakdown), [breakdown]);
  const perPerson = useMemo(() => (form.people > 0 ? Math.round(total / form.people) : 0), [total, form.people]);
  const dailyAvg = useMemo(() => (form.days > 0 ? Math.round(total / form.days) : 0), [total, form.days]);
  const userBudgetNum = useMemo(() => {
    const n = Number(form.userBudget);
    return isNaN(n) || n <= 0 ? null : n;
  }, [form.userBudget]);

  const maxCategory = useMemo(
    () =>
      Math.max(
        breakdown.transport,
        breakdown.accommodation,
        breakdown.food,
        breakdown.activities,
        breakdown.miscellaneous
      ),
    [breakdown]
  );

  const toggleActivity = (a: ActivityKey) => {
    setForm((prev) => ({
      ...prev,
      activities: prev.activities.includes(a) ? prev.activities.filter((x) => x !== a) : [...prev.activities, a],
    }));
  };

  const toggleExtra = (e: ExtrasKey) => {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(e) ? prev.extras.filter((x) => x !== e) : [...prev.extras, e],
    }));
  };

  const handleReset = () => {
    setForm(DEFAULT_FORM);
    setShowResults(false);
    setCompareMode(false);
    setCompareDestinations([]);
  };

  const handleSave = () => {
    try {
      const existing: SavedCalc[] = JSON.parse(localStorage.getItem("hg-budget-calcs") || "[]");
      const entry: SavedCalc = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        destination: form.destination,
        people: form.people,
        days: form.days,
        total,
      };
      localStorage.setItem("hg-budget-calcs", JSON.stringify([entry, ...existing].slice(0, 50)));
      setSavedMsg("Saved!");
      setTimeout(() => setSavedMsg(null), 2500);
    } catch {
      setSavedMsg("Failed to save");
      setTimeout(() => setSavedMsg(null), 2500);
    }
  };

  const handleShare = async () => {
    const lines = [
      `Trip Budget Calculation — Hidden Gems`,
      ``,
      `Destination: ${form.destination}`,
      `People: ${form.people} | Days: ${form.days} | Style: ${form.travelStyle}`,
      `Transport: ${form.transport}`,
      `Accommodation: ${form.accommodation}`,
      `Food: ${form.food}`,
      `Activities: ${form.activities.join(", ") || "None"}`,
      `Extras: ${form.extras.join(", ") || "None"}`,
      ``,
      `Total Estimated Cost: ${formatCurrency(total)}`,
      `Per Person: ${formatCurrency(perPerson)}`,
      `Daily Average: ${formatCurrency(dailyAvg)}`,
      userBudgetNum
        ? total <= userBudgetNum
          ? `Budget Status: Within Budget ✅`
          : `Budget Status: Over Budget by ${formatCurrency(total - userBudgetNum)} ⚠️`
        : "",
    ];
    const text = lines.filter(Boolean).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setShareMsg("Copied to clipboard!");
      setTimeout(() => setShareMsg(null), 2500);
    } catch {
      setShareMsg("Failed to copy");
      setTimeout(() => setShareMsg(null), 2500);
    }
  };

  const handleCompare = () => {
    if (!compareMode) {
      const others = destinationNames.filter((n) => n !== form.destination);
      const pick = others.sort(() => 0.5 - Math.random()).slice(0, 3);
      setCompareDestinations(pick);
      setCompareMode(true);
      setShowResults(true);
    } else {
      setCompareMode(false);
    }
  };

  /* Build comparison results using current form parameters but swapping destination name */
  const comparisonResults = useMemo(() => {
    if (!compareMode) return [];
    return compareDestinations.map((destName) => {
      const b = calcBreakdown({ ...form, destination: destName });
      return {
        name: destName,
        total: calcTotal(b),
        breakdown: b,
      };
    });
  }, [compareMode, compareDestinations, form]);

  const transportIcon = (mode: TransportMode) => {
    switch (mode) {
      case "Flight":
        return <Plane className="h-4 w-4" />;
      case "Train":
        return <Train className="h-4 w-4" />;
      case "Bus":
        return <Bus className="h-4 w-4" />;
      case "Car":
        return <Car className="h-4 w-4" />;
      case "Bike":
        return <Bike className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
            alt="Mountain landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
              <Calculator className="h-4 w-4" />
              Plan your trip budget
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Trip Budget Calculator
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Estimate costs for your Himalayan adventure across 17 hidden destinations.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* ── Form ── */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8" hoverLift={false}>
              <div className="mb-6 flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Trip Details</h2>
              </div>

              <div className="flex flex-col gap-5">
                {/* Destination */}
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    Destination
                  </label>
                  <select
                    value={form.destination}
                    onChange={(e) => setForm((p) => ({ ...p, destination: e.target.value }))}
                    className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
                  >
                    {destinationNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* People & Days */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      Number of People
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={form.people}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          people: Math.min(20, Math.max(1, Number(e.target.value) || 1)),
                        }))
                      }
                      className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                      Number of Days
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={14}
                      value={form.days}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          days: Math.min(14, Math.max(1, Number(e.target.value) || 1)),
                        }))
                      }
                      className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                {/* Travel Style */}
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Compass className="h-3.5 w-3.5 text-muted-foreground" />
                    Travel Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Budget", "Mid-Range", "Luxury"] as TravelStyle[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, travelStyle: s }))}
                        className={`h-11 rounded-lg border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                          form.travelStyle === s
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transport */}
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <BusFront className="h-3.5 w-3.5 text-muted-foreground" />
                    Transport Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {(["Train", "Flight", "Bus", "Car", "Bike"] as TransportMode[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, transport: m }))}
                        className={`flex h-11 items-center justify-center gap-1.5 rounded-lg border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                          form.transport === m
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {transportIcon(m)}
                        {m}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {form.transport === "Car"
                      ? "₹3,000 total"
                      : form.transport === "Bike"
                      ? "₹600/day"
                      : form.transport === "Flight"
                      ? "₹5,000/person"
                      : form.transport === "Train"
                      ? "₹500/person"
                      : "₹300/person"}
                  </p>
                </div>

                {/* Accommodation */}
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Hotel className="h-3.5 w-3.5 text-muted-foreground" />
                    Accommodation
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {(
                      [
                        "Homestay",
                        "Budget Hotel",
                        "3-Star",
                        "4-Star",
                        "Luxury Resort",
                      ] as AccommodationType[]
                    ).map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, accommodation: a }))}
                        className={`flex h-auto min-h-[3rem] items-center justify-center rounded-lg border px-2 py-2 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/40 sm:text-sm ${
                          form.accommodation === a
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(ACCOMMODATION_COSTS[form.accommodation])}/night
                  </p>
                </div>

                {/* Food */}
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Utensils className="h-3.5 w-3.5 text-muted-foreground" />
                    Food Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Local Only", "Mix", "Fine Dining"] as FoodPreference[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, food: f }))}
                        className={`h-11 rounded-lg border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                          form.food === f
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(FOOD_COSTS[form.food])}/day/person
                  </p>
                </div>

                {/* Activities */}
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                    Activities
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {ACTIVITY_LIST.map((a) => (
                      <label
                        key={a}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition focus-within:ring-2 focus-within:ring-primary/40 ${
                          form.activities.includes(a)
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          checked={form.activities.includes(a)}
                          onChange={() => toggleActivity(a)}
                        />
                        <span className="text-xs font-medium sm:text-sm">{a}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Extras */}
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Landmark className="h-3.5 w-3.5 text-muted-foreground" />
                    Extras
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {EXTRAS_LIST.map((e) => (
                      <label
                        key={e}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition focus-within:ring-2 focus-within:ring-primary/40 ${
                          form.extras.includes(e)
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          checked={form.extras.includes(e)}
                          onChange={() => toggleExtra(e)}
                        />
                        <span className="text-xs font-medium sm:text-sm">{e}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* User Budget */}
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
                    Your Budget (optional)
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="Enter amount in ₹"
                    value={form.userBudget}
                    onChange={(e) => setForm((p) => ({ ...p, userBudget: e.target.value }))}
                    className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button onClick={() => setShowResults(true)}>
                    <Calculator className="h-4 w-4" />
                    Calculate Budget
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                  <Button variant="secondary" onClick={handleCompare}>
                    <Compass className="h-4 w-4" />
                    {compareMode ? "Hide Comparison" : "Compare Destinations"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {showResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-6"
                >
                  {/* Summary Card */}
                  <Card className="overflow-hidden" hoverLift={false}>
                    <div className="bg-primary px-6 py-5 text-primary-foreground">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                          <MapPin className="h-4 w-4" />
                          {form.destination}
                        </div>
                        <div className="flex items-center gap-2 text-sm opacity-90">
                          <Users className="h-4 w-4" />
                          {form.people} people · {form.days} days
                        </div>
                      </div>
                      <div className="mt-4 text-4xl font-bold">
                        <AnimatedNumber value={total} />
                      </div>
                      <p className="mt-1 text-sm opacity-90">Total Estimated Cost</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 px-6 py-5">
                      <div>
                        <p className="text-xs text-muted-foreground">Per Person</p>
                        <p className="mt-0.5 text-lg font-semibold text-foreground">
                          <AnimatedNumber value={perPerson} />
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Daily Average</p>
                        <p className="mt-0.5 text-lg font-semibold text-foreground">
                          <AnimatedNumber value={dailyAvg} />
                        </p>
                      </div>
                    </div>

                    {userBudgetNum !== null && (
                      <div className="mx-6 mb-5 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium">
                        {total <= userBudgetNum ? (
                          <>
                            <Check className="h-5 w-5 text-success" />
                            <span className="text-success">Within Budget</span>
                            <span className="ml-auto text-muted-foreground">
                              Saved {formatCurrency(userBudgetNum - total)}
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-5 w-5 text-danger" />
                            <span className="text-danger">Over Budget by {formatCurrency(total - userBudgetNum)}</span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Breakdown Bars */}
                    <div className="border-t border-border px-6 py-5">
                      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Cost Breakdown
                      </h3>
                      <div className="flex flex-col gap-4">
                        <BreakdownBar
                          label="Transport"
                          amount={breakdown.transport}
                          max={maxCategory}
                          color="bg-emerald-500"
                        />
                        <BreakdownBar
                          label="Accommodation"
                          amount={breakdown.accommodation}
                          max={maxCategory}
                          color="bg-blue-500"
                        />
                        <BreakdownBar
                          label="Food"
                          amount={breakdown.food}
                          max={maxCategory}
                          color="bg-orange-500"
                        />
                        <BreakdownBar
                          label="Activities"
                          amount={breakdown.activities}
                          max={maxCategory}
                          color="bg-purple-500"
                        />
                        <BreakdownBar
                          label="Miscellaneous"
                          amount={breakdown.miscellaneous}
                          max={maxCategory}
                          color="bg-gray-500"
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 border-t border-border px-6 py-4">
                      <Button variant="outline" size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4" />
                        Save Calculation
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share className="h-4 w-4" />
                        Share
                      </Button>
                    </div>

                    {/* Messages */}
                    <AnimatePresence>
                      {savedMsg && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mx-6 mb-4 flex items-center gap-2 rounded-lg bg-success/10 px-4 py-2 text-sm font-medium text-success">
                            <Check className="h-4 w-4" />
                            {savedMsg}
                          </div>
                        </motion.div>
                      )}
                      {shareMsg && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mx-6 mb-4 flex items-center gap-2 rounded-lg bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                            <Check className="h-4 w-4" />
                            {shareMsg}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {!showResults && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
                <Mountain className="mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">
                  Fill in your trip details and click Calculate Budget to see estimates.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Comparison Section ── */}
        <AnimatePresence>
          {compareMode && showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-12"
            >
              <SectionHeading
                title="Compare Destinations"
                subtitle="See how the same trip parameters cost across different hidden gems."
                align="left"
              />
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {comparisonResults.map((result, idx) => {
                  const b = result.breakdown;
                  const compMax = Math.max(
                    b.transport,
                    b.accommodation,
                    b.food,
                    b.activities,
                    b.miscellaneous
                  );
                  return (
                    <motion.div
                      key={result.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="flex h-full flex-col p-5" hoverLift={true}>
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-foreground">{result.name}</h3>
                          <span className="text-xs font-medium text-muted-foreground">
                            {form.people}p · {form.days}d
                          </span>
                        </div>
                        <div className="mb-4 text-3xl font-bold text-primary">
                          <AnimatedNumber value={result.total} />
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                          <BreakdownBar
                            label="Transport"
                            amount={b.transport}
                            max={compMax}
                            color="bg-emerald-500"
                          />
                          <BreakdownBar
                            label="Accommodation"
                            amount={b.accommodation}
                            max={compMax}
                            color="bg-blue-500"
                          />
                          <BreakdownBar
                            label="Food"
                            amount={b.food}
                            max={compMax}
                            color="bg-orange-500"
                          />
                          <BreakdownBar
                            label="Activities"
                            amount={b.activities}
                            max={compMax}
                            color="bg-purple-500"
                          />
                          <BreakdownBar
                            label="Miscellaneous"
                            amount={b.miscellaneous}
                            max={compMax}
                            color="bg-gray-500"
                          />
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
