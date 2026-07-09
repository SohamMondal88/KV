"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Search,
  X,
  SlidersHorizontal,
  Leaf,
  Drumstick,
  Wheat,
  Coffee,
  MapPin,
  Utensils,
  Clock,
  Star,
  ArrowRight,
  Heart,
  Share2,
  Sparkles,
  Route,
  Check,
  Landmark,
} from "lucide-react";
import { destinations } from "@/lib/data";
import type { Destination, Restaurant, Cafe, StreetFood } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type FoodPreference = "Veg" | "Non-Veg" | "Vegan" | "Jain" | "Any";
type CuisineType =
  | "Local Himalayan"
  | "Tibetan"
  | "Nepali"
  | "Continental"
  | "Chinese"
  | "Indian"
  | "Bakery";
type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "Coffee";
type BudgetRange = "Street Food" | "Casual" | "Fine Dining";
type VibeType =
  | "Quick Bite"
  | "Cozy Cafe"
  | "Local Dhaba"
  | "Fine Dining"
  | "Rooftop"
  | "Riverside";

interface DishMeta {
  name: string;
  veg: boolean;
  cuisine: string;
  meal: MealType;
  price: number;
  description: string;
  whereToTry: string;
}

const dishMetaMap: Record<string, DishMeta> = {
  Momos: {
    name: "Momos",
    veg: true,
    cuisine: "Tibetan",
    meal: "Snacks",
    price: 80,
    description:
      "Steamed or fried dumplings stuffed with vegetables or meat, served with fiery tomato chutney.",
    whereToTry: "Local momo stalls near Main Market",
  },
  Thukpa: {
    name: "Thukpa",
    veg: true,
    cuisine: "Tibetan",
    meal: "Lunch",
    price: 120,
    description:
      "A hearty noodle soup with fresh vegetables, meat optional, perfect for chilly evenings.",
    whereToTry: "Thukpa Corner at the market",
  },
  "Aloo Dum": {
    name: "Aloo Dum",
    veg: true,
    cuisine: "Indian",
    meal: "Lunch",
    price: 100,
    description:
      "Spicy baby potatoes cooked in a rich tomato gravy with Himalayan spices.",
    whereToTry: "Hillside Kitchen",
  },
  "Sel Roti": {
    name: "Sel Roti",
    veg: true,
    cuisine: "Nepali",
    meal: "Breakfast",
    price: 60,
    description:
      "Traditional Nepali rice doughnut, crispy outside and soft inside, served with yogurt.",
    whereToTry: "Heritage Kitchen",
  },
  "Chhurpi Soup": {
    name: "Chhurpi Soup",
    veg: true,
    cuisine: "Local Himalayan",
    meal: "Dinner",
    price: 150,
    description:
      "Warm soup made with dried yak cheese and local herbs — a true Himalayan comfort food.",
    whereToTry: "Pabong Kitchen",
  },
  "Thenthuk": {
    name: "Thenthuk",
    veg: true,
    cuisine: "Tibetan",
    meal: "Lunch",
    price: 130,
    description:
      "Hand-pulled flat noodle soup with seasonal vegetables and a warming broth.",
    whereToTry: "Gompas Restaurant",
  },
  "Shaphaley": {
    name: "Shaphaley",
    veg: false,
    cuisine: "Tibetan",
    meal: "Snacks",
    price: 100,
    description:
      "Deep-fried meat pies with a crispy crust and juicy filling.",
    whereToTry: "Local Tibetan eateries",
  },
  "Gundruk": {
    name: "Gundruk",
    veg: true,
    cuisine: "Nepali",
    meal: "Lunch",
    price: 90,
    description:
      "Fermented leafy green vegetable soup, rich in probiotics and earthy flavor.",
    whereToTry: "Heritage Kitchen",
  },
  "Sinki": {
    name: "Sinki",
    veg: true,
    cuisine: "Nepali",
    meal: "Lunch",
    price: 100,
    description:
      "Fermented radish soup with a tangy kick, a traditional winter staple.",
    whereToTry: "Hillside Kitchen",
  },
  "Butter Tea": {
    name: "Butter Tea",
    veg: true,
    cuisine: "Tibetan",
    meal: "Snacks",
    price: 40,
    description:
      "Traditional salted tea blended with yak butter — an acquired taste worth trying.",
    whereToTry: "Mountain Brew",
  },
  "Phagshapa": {
    name: "Phagshapa",
    veg: false,
    cuisine: "Local Himalayan",
    meal: "Dinner",
    price: 250,
    description:
      "Dried pork strips stir-fried with radishes and chilies — a Sikkimese delicacy.",
    whereToTry: "Taste of Sikkim",
  },
  "Darjeeling Tea": {
    name: "Darjeeling Tea",
    veg: true,
    cuisine: "Local Himalayan",
    meal: "Coffee",
    price: 50,
    description:
      "The Champagne of Teas — light, floral, and utterly refreshing.",
    whereToTry: "Tea Lounge",
  },
};

const cuisineOptions: CuisineType[] = [
  "Local Himalayan",
  "Tibetan",
  "Nepali",
  "Continental",
  "Chinese",
  "Indian",
  "Bakery",
];

const mealOptions: MealType[] = ["Breakfast", "Lunch", "Dinner", "Snacks", "Coffee"];

const budgetOptions: { label: BudgetRange; min: number; max: number }[] = [
  { label: "Street Food", min: 0, max: 200 },
  { label: "Casual", min: 200, max: 500 },
  { label: "Fine Dining", min: 500, max: Infinity },
];

const vibeOptions: VibeType[] = [
  "Quick Bite",
  "Cozy Cafe",
  "Local Dhaba",
  "Fine Dining",
  "Rooftop",
  "Riverside",
];

function getDishMeta(name: string): DishMeta {
  return (
    dishMetaMap[name] || {
      name,
      veg: true,
      cuisine: "Local Himalayan",
      meal: "Snacks",
      price: 100,
      description: `A beloved local delicacy in the Himalayan region.`,
      whereToTry: "Local restaurants and street stalls",
    }
  );
}

function parsePriceRange(range: string): number {
  const nums = range.match(/\d+/g);
  if (!nums) return 300;
  return Math.round(nums.map(Number).reduce((a, b) => a + b, 0) / nums.length);
}

function getRestaurantVibe(name: string, cuisine: string): VibeType[] {
  const vibes: VibeType[] = [];
  if (cuisine.toLowerCase().includes("tibetan")) vibes.push("Local Dhaba");
  if (cuisine.toLowerCase().includes("continental")) vibes.push("Cozy Cafe", "Fine Dining");
  if (cuisine.toLowerCase().includes("multi")) vibes.push("Fine Dining", "Rooftop");
  if (name.toLowerCase().includes("cafe")) vibes.push("Cozy Cafe");
  if (name.toLowerCase().includes("garden")) vibes.push("Rooftop");
  if (name.toLowerCase().includes("view")) vibes.push("Rooftop");
  if (name.toLowerCase().includes("lounge")) vibes.push("Cozy Cafe");
  if (name.toLowerCase().includes("kitchen")) vibes.push("Local Dhaba");
  if (vibes.length === 0) vibes.push("Quick Bite");
  return vibes;
}

function getCafeVibe(name: string, specialty: string): VibeType[] {
  const vibes: VibeType[] = [];
  if (specialty.toLowerCase().includes("coffee")) vibes.push("Cozy Cafe");
  if (specialty.toLowerCase().includes("tea")) vibes.push("Cozy Cafe");
  if (specialty.toLowerCase().includes("chocolate")) vibes.push("Cozy Cafe");
  if (specialty.toLowerCase().includes("juice")) vibes.push("Quick Bite");
  if (name.toLowerCase().includes("lounge")) vibes.push("Cozy Cafe");
  if (vibes.length === 0) vibes.push("Quick Bite");
  return vibes;
}

function computeRestaurantMatch(
  r: Restaurant,
  pref: FoodPreference,
  cuisines: string[],
  meal: MealType[],
  budget: BudgetRange[],
  vibe: VibeType[],
  destName: string,
  localPref: boolean
): number {
  let score = 60;
  const price = parsePriceRange(r.priceRange);

  // Budget
  if (
    budget.some((b) => {
      const opt = budgetOptions.find((o) => o.label === b)!;
      return price >= opt.min && price < opt.max;
    })
  )
    score += 15;
  else score -= 15;

  // Cuisine
  if (
    cuisines.length === 0 ||
    cuisines.some((c) => r.cuisine.toLowerCase().includes(c.toLowerCase()))
  )
    score += 10;
  else score -= 5;

  // Vibe
  const vibes = getRestaurantVibe(r.name, r.cuisine);
  if (vibe.length === 0 || vibe.some((v) => vibes.includes(v))) score += 10;

  // Local preference
  if (localPref) {
    if (
      r.cuisine.toLowerCase().includes("local") ||
      r.cuisine.toLowerCase().includes("himalayan") ||
      r.cuisine.toLowerCase().includes("sikkimese") ||
      r.cuisine.toLowerCase().includes("nepali") ||
      r.cuisine.toLowerCase().includes("tibetan")
    )
      score += 15;
  }

  // Rating
  score += r.rating * 3;

  return Math.min(100, Math.round(score));
}

function computeCafeMatch(
  c: Cafe,
  cuisines: string[],
  meal: MealType[],
  vibe: VibeType[],
  localPref: boolean
): number {
  let score = 60;

  // Meal type (Coffee)
  if (meal.length === 0 || meal.includes("Coffee") || meal.includes("Snacks"))
    score += 10;

  // Vibe
  const vibes = getCafeVibe(c.name, c.specialty);
  if (vibe.length === 0 || vibe.some((v) => vibes.includes(v))) score += 10;

  // Local preference
  if (localPref && c.specialty.toLowerCase().includes("organic")) score += 10;

  // Rating
  score += c.rating * 4;

  return Math.min(100, Math.round(score));
}

function getFoodTipForDestination(dest: Destination): string[] {
  const tips: string[] = [];
  if (dest.localFood.includes("Momos"))
    tips.push("Best momos are found at local stalls after 4 PM in " + dest.name);
  if (dest.name.toLowerCase().includes("sittong"))
    tips.push("Try the homemade peach wine in Sittong");
  if (dest.localFood.includes("Butter Tea"))
    tips.push("Butter tea is an acquired taste — try the sweet version first");
  if (dest.streetFood.length)
    tips.push(`Explore ${dest.name}'s street food trail for authentic flavors`);
  if (dest.name.toLowerCase().includes("mirik"))
    tips.push("Don't miss fresh orange juice by Sumendu Lake in Mirik");
  if (dest.name.toLowerCase().includes("darjeeling"))
    tips.push("First Flush tea tasting is a must in the tea gardens");
  return tips;
}

export default function FoodRecommendationsPage() {
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("Any");
  const [foodPref, setFoodPref] = useState<FoodPreference>("Any");
  const [selectedCuisines, setSelectedCuisines] = useState<CuisineType[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<MealType[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<BudgetRange[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<VibeType[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showTrail, setShowTrail] = useState(false);
  const [trailStops, setTrailStops] = useState<
    { name: string; type: string; description: string }[]
  >([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("savedFoodItems");
      if (raw) setSavedIds(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("savedFoodItems", JSON.stringify(savedIds));
  }, [savedIds]);

  const destinationOptions = useMemo(
    () => ["Any", ...destinations.map((d) => d.name)],
    []
  );

  const selectedDestinations = useMemo(() => {
    if (destination === "Any") return destinations;
    return destinations.filter((d) => d.name === destination);
  }, [destination]);

  const isVegOk = (dishName: string) => {
    const meta = getDishMeta(dishName);
    if (foodPref === "Any") return true;
    if (foodPref === "Veg") return meta.veg;
    if (foodPref === "Vegan")
      return meta.veg && !meta.name.toLowerCase().includes("butter");
    if (foodPref === "Jain")
      return meta.veg && !meta.name.toLowerCase().includes("potato");
    if (foodPref === "Non-Veg") return !meta.veg;
    return true;
  };

  const dishes = useMemo(() => {
    const results: (DishMeta & { destName: string })[] = [];
    selectedDestinations.forEach((dest) => {
      dest.localFood.forEach((name) => {
        if (!isVegOk(name)) return;
        const meta = getDishMeta(name);
        if (
          selectedCuisines.length > 0 &&
          !selectedCuisines.some((c) =>
            meta.cuisine.toLowerCase().includes(c.toLowerCase())
          )
        )
          return;
        if (
          selectedMeals.length > 0 &&
          !selectedMeals.includes(meta.meal)
        )
          return;
        if (
          selectedBudgets.length > 0 &&
          !selectedBudgets.some((b) => {
            const opt = budgetOptions.find((o) => o.label === b)!;
            return meta.price >= opt.min && meta.price < opt.max;
          })
        )
          return;
        if (search && !meta.name.toLowerCase().includes(search.toLowerCase()))
          return;
        results.push({ ...meta, destName: dest.name });
      });
    });
    return results;
  }, [
    selectedDestinations,
    foodPref,
    selectedCuisines,
    selectedMeals,
    selectedBudgets,
    search,
  ]);

  const restaurants = useMemo(() => {
    const results: (Restaurant & {
      destName: string;
      matchScore: number;
      vibes: VibeType[];
    })[] = [];
    selectedDestinations.forEach((dest) => {
      dest.restaurants.forEach((r) => {
        const score = computeRestaurantMatch(
          r,
          foodPref,
          selectedCuisines,
          selectedMeals,
          selectedBudgets,
          selectedVibes,
          dest.name,
          selectedCuisines.includes("Local Himalayan")
        );
        if (
          search &&
          !r.name.toLowerCase().includes(search.toLowerCase()) &&
          !r.cuisine.toLowerCase().includes(search.toLowerCase())
        )
          return;
        results.push({
          ...r,
          destName: dest.name,
          matchScore: score,
          vibes: getRestaurantVibe(r.name, r.cuisine),
        });
      });
    });
    results.sort((a, b) => b.matchScore - a.matchScore);
    return results;
  }, [
    selectedDestinations,
    foodPref,
    selectedCuisines,
    selectedMeals,
    selectedBudgets,
    selectedVibes,
    search,
  ]);

  const cafes = useMemo(() => {
    const results: (Cafe & {
      destName: string;
      matchScore: number;
      vibes: VibeType[];
    })[] = [];
    selectedDestinations.forEach((dest) => {
      dest.cafes.forEach((c) => {
        const score = computeCafeMatch(
          c,
          selectedCuisines,
          selectedMeals,
          selectedVibes,
          selectedCuisines.includes("Local Himalayan")
        );
        if (
          search &&
          !c.name.toLowerCase().includes(search.toLowerCase()) &&
          !c.specialty.toLowerCase().includes(search.toLowerCase())
        )
          return;
        results.push({
          ...c,
          destName: dest.name,
          matchScore: score,
          vibes: getCafeVibe(c.name, c.specialty),
        });
      });
    });
    results.sort((a, b) => b.matchScore - a.matchScore);
    return results;
  }, [selectedDestinations, selectedCuisines, selectedMeals, selectedVibes, search]);

  const streetFoodItems = useMemo(() => {
    const results: (StreetFood & { destName: string })[] = [];
    selectedDestinations.forEach((dest) => {
      dest.streetFood.forEach((sf) => {
        if (
          search &&
          !sf.name.toLowerCase().includes(search.toLowerCase())
        )
          return;
        results.push({ ...sf, destName: dest.name });
      });
    });
    return results;
  }, [selectedDestinations, search]);

  const foodTips = useMemo(() => {
    let tips: string[] = [];
    selectedDestinations.forEach((dest) => {
      tips = tips.concat(getFoodTipForDestination(dest));
    });
    // Deduplicate
    return Array.from(new Set(tips));
  }, [selectedDestinations]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Hidden Gems Food Recommendation", text });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
      } catch {}
    }
  };

  const generateFoodTrail = () => {
    const stops: { name: string; type: string; description: string }[] = [];
    const dest = selectedDestinations[0] || destinations[0];

    if (dest.cafes.length) {
      const cafe = dest.cafes[0];
      stops.push({
        name: cafe.name,
        type: "Cafe",
        description: `Start your trail with ${cafe.specialty}`,
      });
    }
    if (dest.restaurants.length) {
      const rest = dest.restaurants[0];
      stops.push({
        name: rest.name,
        type: "Restaurant",
        description: `Enjoy ${rest.cuisine} cuisine`,
      });
    }
    if (dest.cafes.length > 1) {
      const cafe = dest.cafes[1];
      stops.push({
        name: cafe.name,
        type: "Cafe",
        description: `End with ${cafe.specialty}`,
      });
    }
    if (stops.length < 2 && dest.localFood.length) {
      stops.push({
        name: `Try ${dest.localFood[0]}`,
        type: "Must-Try",
        description: "A local specialty you can't miss",
      });
    }
    setTrailStops(stops);
    setShowTrail(true);
  };

  const clearFilters = () => {
    setSearch("");
    setDestination("Any");
    setFoodPref("Any");
    setSelectedCuisines([]);
    setSelectedMeals([]);
    setSelectedBudgets([]);
    setSelectedVibes([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
      {children}
    </h2>
  );

  const toggleArray = <T extends string>(
    val: T,
    arr: T[],
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    setter((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Taste the Himalayas
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              AI-curated food trails based on your palate
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-10">
        {/* Filter Panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <SlidersHorizontal size={18} className="text-primary" />
            Smart Filters
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Destination */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              >
                {destinationOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Food Preference */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Food Preference
              </label>
              <select
                value={foodPref}
                onChange={(e) => setFoodPref(e.target.value as FoodPreference)}
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              >
                {["Any", "Veg", "Non-Veg", "Vegan", "Jain"].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine Type */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Cuisine Type
              </label>
              <div className="flex flex-wrap gap-2">
                {cuisineOptions.map((c) => {
                  const active = selectedCuisines.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() =>
                        toggleArray(c, selectedCuisines, setSelectedCuisines)
                      }
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {active && <Check size={12} />}
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Meal Type */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Meal Type
              </label>
              <div className="flex flex-wrap gap-2">
                {mealOptions.map((m) => {
                  const active = selectedMeals.includes(m);
                  return (
                    <button
                      key={m}
                      onClick={() => toggleArray(m, selectedMeals, setSelectedMeals)}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {active && <Check size={12} />}
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Budget
              </label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((b) => {
                  const active = selectedBudgets.includes(b.label);
                  return (
                    <button
                      key={b.label}
                      onClick={() =>
                        toggleArray(b.label, selectedBudgets, setSelectedBudgets)
                      }
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {active && <Check size={12} />}
                      {b.label} ({b.min === 0 ? "₹0" : `₹${b.min}`}
                      {b.max === Infinity ? "+" : `-₹${b.max}`})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vibe */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-4">
              <label className="text-xs font-medium text-muted-foreground">
                Vibe
              </label>
              <div className="flex flex-wrap gap-2">
                {vibeOptions.map((v) => {
                  const active = selectedVibes.includes(v);
                  return (
                    <button
                      key={v}
                      onClick={() => toggleArray(v, selectedVibes, setSelectedVibes)}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {active && <Check size={12} />}
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X size={14} className="mr-1" /> Reset
            </Button>
            <Button variant="accent" size="sm" onClick={generateFoodTrail}>
              <Route size={14} className="mr-1" /> Create Food Trail
            </Button>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 space-y-14"
        >
          {/* A. Must-Try Dishes */}
          <section>
            <SectionTitle>Must-Try Dishes</SectionTitle>
            {dishes.length === 0 ? (
              <p className="text-muted-foreground">No dishes match your filters.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {dishes.map((d, i) => (
                  <motion.div key={`${d.name}-${d.destName}-${i}`} variants={itemVariants}>
                    <Card className="group h-full overflow-hidden">
                      <div className="flex flex-col p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-semibold">{d.name}</h3>
                          <Badge
                            variant={d.veg ? "primary" : "accent"}
                            className="text-[10px]"
                          >
                            {d.veg ? "Veg" : "Non-Veg"}
                          </Badge>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {d.cuisine} • {d.meal}
                        </div>
                        <p className="mt-2 text-sm text-foreground/80">
                          {d.description}
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                          <Utensils size={13} />
                          Where: {d.whereToTry}
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                          <span className="text-sm font-semibold text-primary">
                            Est. ₹{d.price}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleShare(
                                  `Try ${d.name} in ${d.destName}! ${d.description}`
                                )
                              }
                              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
                            >
                              <Share2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* B. Restaurant Recommendations */}
          <section>
            <SectionTitle>Restaurant Recommendations</SectionTitle>
            {restaurants.length === 0 ? (
              <p className="text-muted-foreground">
                No restaurants match your filters.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {restaurants.map((r) => {
                  const isSaved = savedIds.includes(r.id);
                  return (
                    <motion.div key={r.id} variants={itemVariants}>
                      <Card className="group h-full overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                          {r.image ? (
                            <Image
                              src={r.image}
                              alt={r.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                              <Utensils size={40} />
                            </div>
                          )}
                          <div className="absolute left-3 top-3 flex gap-2">
                            <Badge variant="accent">
                              {r.matchScore}% Match
                            </Badge>
                          </div>
                          <button
                            onClick={() => toggleSave(r.id)}
                            className={`absolute right-3 top-3 rounded-full p-2 backdrop-blur transition-colors ${
                              isSaved
                                ? "bg-danger text-white"
                                : "bg-card/80 text-foreground hover:bg-card"
                            }`}
                          >
                            <Heart size={14} fill={isSaved ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <div className="flex flex-col p-5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold">{r.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-accent" fill="currentColor" />
                              <span className="text-sm font-medium">{r.rating}</span>
                            </div>
                          </div>
                          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin size={13} />
                            {r.destName} • {r.cuisine}
                          </div>
                          <p className="mt-2 text-sm text-foreground/80">
                            {r.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {r.vibes.map((v) => (
                              <Badge key={v} variant="outline" className="text-[10px]">
                                {v}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                            <div>
                              <span className="text-sm font-semibold text-primary">
                                {r.priceRange}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Directions
                              </Button>
                              <Button size="sm">Menu</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>

          {/* C. Cafe Recommendations */}
          <section>
            <SectionTitle>Cafe Recommendations</SectionTitle>
            {cafes.length === 0 ? (
              <p className="text-muted-foreground">No cafes match your filters.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cafes.map((c) => {
                  const isSaved = savedIds.includes(c.id);
                  return (
                    <motion.div key={c.id} variants={itemVariants}>
                      <Card className="group h-full overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                          {c.image ? (
                            <Image
                              src={c.image}
                              alt={c.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                              <Coffee size={40} />
                            </div>
                          )}
                          <div className="absolute left-3 top-3">
                            <Badge variant="accent">
                              {c.matchScore}% Match
                            </Badge>
                          </div>
                          <button
                            onClick={() => toggleSave(c.id)}
                            className={`absolute right-3 top-3 rounded-full p-2 backdrop-blur transition-colors ${
                              isSaved
                                ? "bg-danger text-white"
                                : "bg-card/80 text-foreground hover:bg-card"
                            }`}
                          >
                            <Heart size={14} fill={isSaved ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <div className="flex flex-col p-5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold">{c.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-accent" fill="currentColor" />
                              <span className="text-sm font-medium">{c.rating}</span>
                            </div>
                          </div>
                          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin size={13} />
                            {c.destName} • {c.specialty}
                          </div>
                          <p className="mt-2 text-sm text-foreground/80">
                            {c.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {c.vibes.map((v) => (
                              <Badge key={v} variant="outline" className="text-[10px]">
                                {v}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Directions
                              </Button>
                              <Button size="sm">Menu</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>

          {/* D. Street Food Trail */}
          <section>
            <SectionTitle>Street Food Trail</SectionTitle>
            {streetFoodItems.length === 0 ? (
              <p className="text-muted-foreground">No street food found.</p>
            ) : (
              <div className="space-y-4">
                {streetFoodItems.map((sf, i) => (
                  <motion.div
                    key={`${sf.name}-${i}`}
                    variants={itemVariants}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Sparkles size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{sf.name}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {sf.description}
                      </p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        📍 {sf.destName}
                      </div>
                    </div>
                    {i < streetFoodItems.length - 1 && (
                      <div className="hidden shrink-0 items-center text-muted-foreground sm:flex">
                        <ArrowRight size={18} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* E. Food Tips */}
          <section>
            <SectionTitle>Food Tips</SectionTitle>
            {foodTips.length === 0 ? (
              <p className="text-muted-foreground">No tips available.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {foodTips.map((tip, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"
                  >
                    <div className="mt-0.5 shrink-0 text-accent">
                      <Landmark size={18} />
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {tip}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </motion.div>
      </Container>

      {/* Food Trail Modal */}
      <AnimatePresence>
        {showTrail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowTrail(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Food Trail</h3>
                <button
                  onClick={() => setShowTrail(false)}
                  className="rounded-full p-1 hover:bg-muted"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {trailStops.map((stop, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{stop.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {stop.type} — {stop.description}
                      </div>
                    </div>
                  </div>
                ))}
                {trailStops.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Select a destination to generate a food trail.
                  </p>
                )}
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleShare(
                      `My Hidden Gems Food Trail: ${trailStops
                        .map((s) => s.name)
                        .join(" → ")}`
                    )
                  }
                >
                  <Share2 size={14} className="mr-1" /> Share Trail
                </Button>
                <Button size="sm" onClick={() => setShowTrail(false)}>
                  Done
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
