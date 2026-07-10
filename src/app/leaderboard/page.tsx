"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Medal,
  Trophy,
  HelpCircle,
  MapPin,
  BadgeCheck,
  Plane,
  Star,
  ChevronUp,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Tab = "week" | "month" | "alltime";

interface LeaderboardUser {
  name: string;
  avatar: string;
  level: string;
  points: number;
  trips: number;
  badges: number;
  destinations: number;
}

const sampleUsers: LeaderboardUser[] = [
  { name: "Rahul S.", avatar: "", level: "Mountain Master", points: 2450, trips: 12, badges: 9, destinations: 8 },
  { name: "Priya D.", avatar: "", level: "Trail Blazer", points: 1980, trips: 9, badges: 7, destinations: 6 },
  { name: "Ankit R.", avatar: "", level: "Peak Climber", points: 1560, trips: 7, badges: 6, destinations: 5 },
  { name: "Sneha M.", avatar: "", level: "Valley Walker", points: 1340, trips: 6, badges: 5, destinations: 4 },
  { name: "Vikram K.", avatar: "", level: "Summit Seeker", points: 1200, trips: 5, badges: 5, destinations: 4 },
  { name: "Neha P.", avatar: "", level: "Hill Hopper", points: 980, trips: 4, badges: 4, destinations: 3 },
  { name: "Arjun T.", avatar: "", level: "Forest Ranger", points: 890, trips: 4, badges: 3, destinations: 3 },
  { name: "Divya L.", avatar: "", level: "Cloud Chaser", points: 760, trips: 3, badges: 3, destinations: 2 },
  { name: "Rohan B.", avatar: "", level: "River Rider", points: 650, trips: 3, badges: 2, destinations: 2 },
  { name: "Meera G.", avatar: "", level: "Sunrise Spotter", points: 540, trips: 2, badges: 2, destinations: 2 },
];

function getRankIcon(rank: number) {
  if (rank === 1)
    return <Crown className="h-5 w-5 text-yellow-500" />;
  if (rank === 2)
    return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3)
    return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="inline-flex h-5 w-5 items-center justify-center text-xs font-bold text-muted-foreground">{rank}</span>;
}

function getRankStyle(rank: number) {
  if (rank === 1)
    return "bg-yellow-500/10 border-yellow-500/20";
  if (rank === 2)
    return "bg-gray-400/10 border-gray-400/20";
  if (rank === 3)
    return "bg-amber-600/10 border-amber-600/20";
  return "bg-card border-border";
}

function generateTabData(tab: Tab): LeaderboardUser[] {
  const multiplier = tab === "week" ? 0.25 : tab === "month" ? 0.6 : 1;
  return sampleUsers.map((u) => ({
    ...u,
    points: Math.round(u.points * multiplier),
    trips: Math.max(1, Math.round(u.trips * multiplier)),
    destinations: Math.max(1, Math.round(u.destinations * multiplier)),
  }));
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>("alltime");
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(() => generateTabData(tab), [tab]);

  // Simulate current user rank
  const currentUser = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("kv-user");
      if (raw) {
        const parsed = JSON.parse(raw);
        const points =
          (parseInt(localStorage.getItem("kv-quiz-count") || "0", 10) * 200) +
          (parseInt(localStorage.getItem("kv-share-count") || "0", 10) * 25);
        return {
          name: parsed.name || "You",
          level: "Explorer",
          points: points + 120,
          trips: parseInt(localStorage.getItem("kv-trips") || "2", 10),
          badges: parseInt(localStorage.getItem("kv-badges-count") || "1", 10),
          destinations: parseInt(localStorage.getItem("kv-destinations") || "2", 10),
        };
      }
    } catch { /* ignore */ }
    return {
      name: "You",
      level: "Explorer",
      points: 120,
      trips: 1,
      badges: 0,
      destinations: 1,
    };
  }, [tab]);

  const userRank = 47; // Simulated

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 via-background to-background">
      <Container className="py-8 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center md:mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Trophy className="h-4 w-4" />
            Community Rankings
          </div>
          <h1 className="text-3xl font-bold text-foreground md:text-5xl">
            Traveler Leaderboard
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            See who is exploring the Himalayas the most. Earn points by booking trips, completing quizzes, and sharing your adventures.
          </p>
        </motion.div>

        {/* Tabs + How Points Work */}
        <div className="mx-auto mb-6 flex max-w-4xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex rounded-lg border border-border bg-card p-1">
            {[
              { id: "week" as Tab, label: "This Week" },
              { id: "month" as Tab, label: "This Month" },
              { id: "alltime" as Tab, label: "All Time" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  tab === t.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTooltip((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <HelpCircle className="h-4 w-4" />
              How points work
            </button>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-card p-4 shadow-lg"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">
                  How Points Work
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-primary" /> Booking = 100 pts
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" /> Review = 50 pts
                  </li>
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-success" /> Quiz completion = 200 pts
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronUp className="h-4 w-4 text-secondary" /> Share = 25 pts
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-danger" /> Destination visited = 150 pts
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => setShowTooltip(false)}
                  className="mt-3 w-full rounded-md bg-muted py-1.5 text-xs font-medium text-foreground"
                >
                  Got it
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Leaderboard Table */}
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-4xl"
        >
          <Card className="overflow-hidden" hoverLift={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Rank</th>
                    <th className="px-4 py-3">Traveler</th>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3 text-right">XP</th>
                    <th className="px-4 py-3 text-right hidden sm:table-cell">Trips</th>
                    <th className="px-4 py-3 text-right hidden sm:table-cell">Badges</th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">Destinations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.map((user, i) => {
                    const rank = i + 1;
                    const isTop3 = rank <= 3;
                    return (
                      <motion.tr
                        key={`${tab}-${i}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className={cn(
                          "transition-colors hover:bg-muted/30",
                          isTop3 && getRankStyle(rank)
                        )}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">{getRankIcon(rank)}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {getInitials(user.name)}
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                            {user.level}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="font-bold text-primary">
                            {user.points.toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right hidden sm:table-cell text-sm text-muted-foreground">
                          {user.trips}
                        </td>
                        <td className="px-4 py-4 text-right hidden sm:table-cell text-sm text-muted-foreground">
                          {user.badges}
                        </td>
                        <td className="px-4 py-4 text-right hidden md:table-cell text-sm text-muted-foreground">
                          {user.destinations}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Current User Row */}
        {currentUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-6 max-w-4xl"
          >
            <Card className="border-primary/20 bg-primary/5" hoverLift={false}>
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {getInitials(currentUser.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your Rank:{" "}
                      <span className="font-bold text-primary">#{userRank}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-primary">
                      {currentUser.points.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground">Points</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground">{currentUser.trips}</p>
                    <p className="text-xs text-muted-foreground">Trips</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground">{currentUser.badges}</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground">
                      {currentUser.destinations}
                    </p>
                    <p className="text-xs text-muted-foreground">Destinations</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-primary/10 px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Keep exploring to climb up! Complete the quiz, book trips,
                  and leave reviews to earn more points.
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </Container>
    </div>
  );
}
