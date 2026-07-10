"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Footprints,
  Compass,
  Mountain,
  UtensilsCrossed,
  Map,
  Camera,
  Wallet,
  Moon,
  Heart,
  Tent,
  Sun,
  Star,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface BadgeDef {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  howToEarn: string;
}

export const badgeDefinitions: BadgeDef[] = [
  {
    id: "first-steps",
    name: "First Steps",
    icon: Footprints,
    description: "You took your first step into adventure!",
    howToEarn: "Create your first booking on KuboVista.",
  },
  {
    id: "explorer",
    name: "Explorer",
    icon: Compass,
    description: "A true wanderer of the Himalayas.",
    howToEarn: "Visit 3 different destinations on the platform.",
  },
  {
    id: "mountain-goat",
    name: "Mountain Goat",
    icon: Mountain,
    description: "Conquered the trails like a pro.",
    howToEarn: "Book a trek through KuboVista.",
  },
  {
    id: "foodie",
    name: "Foodie",
    icon: UtensilsCrossed,
    description: "A culinary journey through the hills.",
    howToEarn: "Visit 3 food guides on the platform.",
  },
  {
    id: "planner",
    name: "Planner",
    icon: Map,
    description: "You plan like a travel genius.",
    howToEarn: "Use the AI Trip Planner at least once.",
  },
  {
    id: "photographer",
    name: "Photographer",
    icon: Camera,
    description: "Collector of beautiful memories.",
    howToEarn: "Save 5 trips to your profile.",
  },
  {
    id: "budget-boss",
    name: "Budget Boss",
    icon: Wallet,
    description: "Master of travel finances.",
    howToEarn: "Use the Budget Calculator tool.",
  },
  {
    id: "night-owl",
    name: "Night Owl",
    icon: Moon,
    description: "Nocturnal adventurer.",
    howToEarn: "Book a night stay at any accommodation.",
  },
  {
    id: "local-hero",
    name: "Local Hero",
    icon: Heart,
    description: "Supporting local communities.",
    howToEarn: "Book a homestay stay.",
  },
  {
    id: "adventurer",
    name: "Adventurer",
    icon: Tent,
    description: "Thriving in the great outdoors.",
    howToEarn: "Book camping or any adventure activity.",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    icon: Sun,
    description: "The early planner catches the best views.",
    howToEarn: "Book a trip at least 30 days in advance.",
  },
  {
    id: "reviewer",
    name: "Reviewer",
    icon: Star,
    description: "Your voice shapes the community.",
    howToEarn: "Leave a review for a destination or experience.",
  },
];

export function getEarnedBadges(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("kv-badges");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveEarnedBadges(badges: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("kv-badges", JSON.stringify(badges));
  } catch {
    // ignore
  }
}

export function checkAndAwardBadges(): string[] {
  if (typeof window === "undefined") return [];
  const earned = new Set(getEarnedBadges());
  let changed = false;

  // First Steps: any booking exists
  const bookingsRaw = localStorage.getItem("kv-bookings");
  if (bookingsRaw) {
    try {
      const bookings = JSON.parse(bookingsRaw);
      if (Array.isArray(bookings) && bookings.length > 0 && !earned.has("first-steps")) {
        earned.add("first-steps");
        changed = true;
      }
    } catch { /* ignore */ }
  }

  // Also check cart-context bookings
  const cartRaw = localStorage.getItem("kv-cart");
  if (cartRaw) {
    try {
      const cart = JSON.parse(cartRaw);
      if (Array.isArray(cart) && cart.length > 0 && !earned.has("first-steps")) {
        earned.add("first-steps");
        changed = true;
      }
    } catch { /* ignore */ }
  }

  // Explorer: 3 different destinations visited
  const visitedRaw = localStorage.getItem("kv-visited-destinations");
  if (visitedRaw) {
    try {
      const visited = JSON.parse(visitedRaw);
      if (Array.isArray(visited) && visited.length >= 3 && !earned.has("explorer")) {
        earned.add("explorer");
        changed = true;
      }
    } catch { /* ignore */ }
  }

  // Mountain Goat: trek booked
  const trekRaw = localStorage.getItem("kv-trek-bookings");
  if (trekRaw) {
    try {
      const treks = JSON.parse(trekRaw);
      if (Array.isArray(treks) && treks.length > 0 && !earned.has("mountain-goat")) {
        earned.add("mountain-goat");
        changed = true;
      }
    } catch { /* ignore */ }
  }

  // Foodie: 3 food guides visited
  const foodRaw = localStorage.getItem("kv-food-guides-visited");
  if (foodRaw) {
    try {
      const food = JSON.parse(foodRaw);
      if (Array.isArray(food) && food.length >= 3 && !earned.has("foodie")) {
        earned.add("foodie");
        changed = true;
      }
    } catch { /* ignore */ }
  }

  // Planner: AI trip planner used
  const plannerRaw = localStorage.getItem("kv-planner-used");
  if (plannerRaw === "true" && !earned.has("planner")) {
    earned.add("planner");
    changed = true;
  }

  // Photographer: 5 saved trips
  const savedTripsRaw = localStorage.getItem("hg-itineraries");
  if (savedTripsRaw) {
    try {
      const trips = JSON.parse(savedTripsRaw);
      if (Array.isArray(trips) && trips.length >= 5 && !earned.has("photographer")) {
        earned.add("photographer");
        changed = true;
      }
    } catch { /* ignore */ }
  }

  // Budget Boss: calculator used
  const budgetRaw = localStorage.getItem("kv-budget-calculator-used");
  if (budgetRaw === "true" && !earned.has("budget-boss")) {
    earned.add("budget-boss");
    changed = true;
  }

  // Night Owl: night stay booked
  const nightRaw = localStorage.getItem("kv-night-stay-booked");
  if (nightRaw === "true" && !earned.has("night-owl")) {
    earned.add("night-owl");
    changed = true;
  }

  // Local Hero: homestay booked
  const homestayRaw = localStorage.getItem("kv-homestay-booked");
  if (homestayRaw === "true" && !earned.has("local-hero")) {
    earned.add("local-hero");
    changed = true;
  }

  // Adventurer: camping or activity booked
  const activityRaw = localStorage.getItem("kv-activity-booked");
  if (activityRaw === "true" && !earned.has("adventurer")) {
    earned.add("adventurer");
    changed = true;
  }

  // Early Bird: booked 30 days in advance
  const earlyRaw = localStorage.getItem("kv-early-bird");
  if (earlyRaw === "true" && !earned.has("early-bird")) {
    earned.add("early-bird");
    changed = true;
  }

  // Reviewer: left a review
  const reviewRaw = localStorage.getItem("kv-review-left");
  if (reviewRaw === "true" && !earned.has("reviewer")) {
    earned.add("reviewer");
    changed = true;
  }

  const result = Array.from(earned);
  if (changed) {
    saveEarnedBadges(result);
  }
  return result;
}

interface BadgeSystemProps {
  compact?: boolean;
}

export function BadgeSystem({ compact = false }: BadgeSystemProps) {
  const [earnedIds, setEarnedIds] = useState<string[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<BadgeDef | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const earned = checkAndAwardBadges();
    setEarnedIds(earned);
  }, []);

  const earnedSet = useMemo(() => new Set(earnedIds), [earnedIds]);
  const earnedCount = earnedIds.length;
  const totalCount = badgeDefinitions.length;
  const progress = Math.round((earnedCount / totalCount) * 100);

  if (!mounted) return null;

  return (
    <div className={compact ? "" : "space-y-6"}>
      {!compact && (
        <div>
          <h2 className="text-xl font-bold text-foreground">Your Badges</h2>
          <p className="text-sm text-muted-foreground">
            Collect achievements as you explore
          </p>
        </div>
      )}

      {/* Progress */}
      <div className={cn("space-y-2", compact && "mb-4")}>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            {earnedCount}/{totalCount} badges earned
          </span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {badgeDefinitions.map((badge, i) => {
          const earned = earnedSet.has(badge.id);
          const Icon = badge.icon;
          return (
            <motion.button
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              onClick={() => setSelectedBadge(badge)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all",
                earned
                  ? "border-primary/20 bg-primary/5 hover:bg-primary/10"
                  : "border-border bg-muted/30 hover:bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  earned
                    ? "bg-primary/10 text-primary shadow-[0_0_12px_rgba(11,93,59,0.25)]"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {earned ? (
                  <Icon className="h-6 w-6" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium leading-tight",
                  earned ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {badge.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedBadge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedBadge(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl"
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={cn(
                  "mb-4 flex h-16 w-16 items-center justify-center rounded-full",
                  earnedSet.has(selectedBadge.id)
                    ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(11,93,59,0.3)]"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {earnedSet.has(selectedBadge.id) ? (
                  <selectedBadge.icon className="h-8 w-8" />
                ) : (
                  <Lock className="h-6 w-6" />
                )}
              </div>
              <h3 className="mb-1 text-lg font-bold text-foreground">
                {selectedBadge.name}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {selectedBadge.description}
              </p>
              <div className="w-full rounded-lg bg-muted p-3 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  How to Earn
                </p>
                <p className="mt-1 text-sm text-foreground">
                  {selectedBadge.howToEarn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
