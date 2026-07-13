"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { destinations, packages, hotels } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  Compass,
  Mountain,
  Camera,
  Flame,
  Sun,
  Snowflake,
  Coffee,
  Heart,
  MapPin,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── AI Memory / Preference Engine ─── */
interface UserPreferences {
  tags: string[]; // e.g. ["photography", "snow", "luxury"]
  visited: string[]; // destination slugs
  savedTrips: string[];
  budgetTier: "backpacker" | "mid" | "luxury";
}

const STORAGE_KEY = "kv-ai-memory";

function loadPrefs(): UserPreferences {
  if (typeof window === "undefined") return { tags: [], visited: [], savedTrips: [], budgetTier: "mid" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { tags: [], visited: [], savedTrips: [], budgetTier: "mid" };
}

function savePrefs(p: UserPreferences) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

/* ─── Scoring function ─── */
function scoreDestination(dest: typeof destinations[0], prefs: UserPreferences): number {
  let score = 0;
  // Tag match
  prefs.tags.forEach((tag) => {
    if (dest.tags.includes(tag)) score += 3;
  });
  // Not visited bonus
  if (!prefs.visited.includes(dest.slug)) score += 2;
  // Featured bonus
  if (dest.featured) score += 1;
  // Budget alignment (very rough)
  if (prefs.budgetTier === "backpacker" && dest.tags.includes("budget")) score += 2;
  if (prefs.budgetTier === "luxury" && dest.tags.includes("luxury")) score += 2;
  return score;
}

export default function PersonalizedHomepage() {
  const [prefs, setPrefs] = useState<UserPreferences>({ tags: [], visited: [], savedTrips: [], budgetTier: "mid" });
  const [mounted, setMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const p = loadPrefs();
    setPrefs(p);
    setMounted(true);
    // Show onboarding if no tags set
    if (p.tags.length === 0) setShowOnboarding(true);
  }, []);

  useEffect(() => {
    if (mounted) savePrefs(prefs);
  }, [prefs, mounted]);

  const toggleTag = (tag: string) => {
    setPrefs((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  const setBudget = (tier: UserPreferences["budgetTier"]) => {
    setPrefs((prev) => ({ ...prev, budgetTier: tier }));
  };

  // Score and sort destinations
  const scored = useMemo(() => {
    return destinations
      .map((d) => ({ ...d, score: scoreDestination(d, prefs) }))
      .sort((a, b) => b.score - a.score);
  }, [prefs]);

  const topPicks = scored.slice(0, 6);
  const becauseYouLiked = prefs.tags.length > 0 ? scored.filter((d) => d.score > 0 && !topPicks.includes(d)).slice(0, 4) : [];

  const tagOptions = [
    { label: "Photography", icon: Camera, value: "photography" },
    { label: "Snow & Cold", icon: Snowflake, value: "snow" },
    { label: "Trekking", icon: Mountain, value: "trekking" },
    { label: "Luxury", icon: Sparkles, value: "luxury" },
    { label: "Tea Gardens", icon: Coffee, value: "tea" },
    { label: "Camping", icon: Flame, value: "camping" },
    { label: "Adventure", icon: Compass, value: "adventure" },
    { label: "Sunrise Views", icon: Sun, value: "sunrise" },
  ];

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      {/* Hero with personal greeting */}
      <section className="border-b border-white/10 py-12 sm:py-16">
        <Container className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Sparkles className="mx-auto mb-3 h-10 w-10 text-[#F6C453]" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Made For You</h1>
            <p className="mx-auto mt-3 max-w-xl text-lg text-white/60">
              {prefs.tags.length > 0
                ? "Your homepage, reimagined based on what you love."
                : "Tell us what you love, and we'll curate your perfect Himalayan escape."}
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-8">
        {/* Preference Bar */}
        <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="mb-3 text-sm font-semibold text-white/40">What are you into?</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {tagOptions.map((opt) => {
              const active = prefs.tags.includes(opt.value);
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleTag(opt.value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all",
                    active
                      ? "border-[#F6C453]/50 bg-[#F6C453]/15 text-[#F6C453]"
                      : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="h-3 w-3" /> {opt.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">Budget:</span>
            {(["backpacker", "mid", "luxury"] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setBudget(tier)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs transition-colors",
                  prefs.budgetTier === tier
                    ? "bg-[#F6C453]/15 text-[#F6C453]"
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                )}
              >
                {tier === "backpacker" ? "₹1,500/day" : tier === "mid" ? "₹3,500/day" : "₹8,000+/day"}
              </button>
            ))}
          </div>
        </div>

        {/* Top Picks Row */}
        <div className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Top Picks For You</h2>
            <Link href="/destinations" className="flex items-center gap-1 text-xs text-[#F6C453] hover:underline">
              Explore all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topPicks.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={`/destinations/${dest.slug}`}>
                  <Card hoverLift className="group overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={dest.heroImage}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute left-3 top-3">
                        <Badge className="bg-black/50 text-white text-[10px] backdrop-blur-sm">
                          {dest.rating} ⭐
                        </Badge>
                      </div>
                      {dest.score >= 5 && (
                        <div className="absolute right-3 top-3">
                          <Badge className="bg-[#F6C453]/20 text-[#F6C453] text-[10px] border-[#F6C453]/20">
                            <Sparkles className="mr-1 h-2.5 w-2.5" /> AI Pick
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-white/70">
                          <MapPin className="h-3 w-3" /> {dest.state} • {dest.altitude}
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-2 text-xs text-white/50">{dest.tagline}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {dest.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/40">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Because You Liked... */}
        {becauseYouLiked.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-white">Because You Like {prefs.tags.slice(0, 2).join(" &amp; ")}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {becauseYouLiked.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link href={`/destinations/${dest.slug}`}>
                    <Card hoverLift className="group overflow-hidden">
                      <div className="relative h-36 w-full overflow-hidden">
                        <Image
                          src={dest.heroImage}
                          alt={dest.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2">
                          <h4 className="font-bold text-white">{dest.name}</h4>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Packages tailored */}
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-white">Packages That Fit Your Style</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
              >
                <Link href={`/packages/${pkg.slug}`}>
                  <Card hoverLift className="group overflow-hidden">
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute left-3 top-3">
                        <Badge className="bg-black/50 text-white text-[10px] backdrop-blur-sm">{pkg.duration}</Badge>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <h4 className="font-bold text-white">{pkg.name}</h4>
                        <p className="text-xs text-white/70">{pkg.price}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
