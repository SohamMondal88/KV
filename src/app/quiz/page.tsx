"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Snowflake,
  Flower2,
  Sun,
  CloudRain,
  User,
  Heart,
  Users,
  Group,
  Backpack,
  Banknote,
  Gem,
  Mountain,
  UtensilsCrossed,
  Coffee,
  Camera,
  CalendarDays,
  Clock,
  RotateCcw,
  Share2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { destinations } from "@/lib/data";

// --- Types ---
interface Option {
  id: string;
  label: string;
  sublabel?: string;
  icon: LucideIcon;
  scores: Record<string, number>;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

interface ResultDestination {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  score: number;
  maxPossible: number;
  matchPercent: number;
  why: string[];
}

// --- Questions ---
const questions: Question[] = [
  {
    id: 1,
    question: "What's your ideal weather?",
    options: [
      {
        id: "cold",
        label: "Cold & Snowy",
        icon: Snowflake,
        scores: {
          pabong: 10, pelling: 10, kolakham: 9, chatakpur: 9, lepchajagat: 9,
          lebong: 7, kalimpong: 6, ramdhura: 6, mirik: 5, lamahatta: 6,
          samsing: 6, sittong: 5, ahaldhara: 6, bijanbari: 6, kolbong: 7,
          peshok: 6, rishikhola: 5,
        },
      },
      {
        id: "pleasant",
        label: "Pleasant & Blooming",
        icon: Flower2,
        scores: {
          kalimpong: 10, ramdhura: 10, sittong: 10, samsing: 10, lamahatta: 9,
          mirik: 9, peshok: 9, rishikhola: 8, ahaldhara: 8, lebong: 8,
          bijanbari: 8, kolbong: 8, lepchajagat: 7, chatakpur: 7, pelling: 7,
          pabong: 6, kolakham: 6,
        },
      },
      {
        id: "warm",
        label: "Warm & Sunny",
        icon: Sun,
        scores: {
          rishikhola: 10, bijanbari: 9, mirik: 9, peshok: 8, sittong: 8,
          ahaldhara: 8, kalimpong: 7, lebong: 7, ramdhura: 7, samsing: 7,
          kolbong: 7, lamahatta: 6, pabong: 5, pelling: 5, lepchajagat: 5,
          chatakpur: 5, kolakham: 5,
        },
      },
      {
        id: "rainy",
        label: "Rainy & Lush",
        icon: CloudRain,
        scores: {
          samsing: 10, rishikhola: 10, kalimpong: 9, ramdhura: 9, lamahatta: 9,
          pabong: 8, kolakham: 8, chatakpur: 8, lepchajagat: 8, sittong: 7,
          mirik: 7, ahaldhara: 7, bijanbari: 7, kolbong: 7, peshok: 6,
          lebong: 6, pelling: 6,
        },
      },
    ],
  },
  {
    id: 2,
    question: "Who are you traveling with?",
    options: [
      {
        id: "solo",
        label: "Solo",
        icon: User,
        scores: {
          lepchajagat: 10, chatakpur: 10, lamahatta: 9, pabong: 9, kolakham: 9,
          ahaldhara: 8, ramdhura: 8, sittong: 7, samsing: 7, lebong: 7,
          kalimpong: 7, pelling: 7, mirik: 6, kolbong: 6, bijanbari: 6,
          peshok: 6, rishikhola: 6,
        },
      },
      {
        id: "couple",
        label: "Couple",
        icon: Heart,
        scores: {
          pelling: 10, mirik: 10, sittong: 9, rishikhola: 9, ramdhura: 9,
          kolakham: 9, lepchajagat: 8, chatakpur: 8, lamahatta: 8, ahaldhara: 8,
          peshok: 7, lebong: 7, kalimpong: 7, pabong: 7, bijanbari: 7,
          samsing: 6, kolbong: 6,
        },
      },
      {
        id: "family",
        label: "Family",
        icon: Users,
        scores: {
          kalimpong: 10, mirik: 10, pelling: 9, sittong: 9, lebong: 9,
          lamahatta: 8, ahaldhara: 8, peshok: 8, ramdhura: 8, bijanbari: 8,
          rishikhola: 7, samsing: 7, kolbong: 7, lepchajagat: 6, chatakpur: 6,
          pabong: 6, kolakham: 6,
        },
      },
      {
        id: "friends",
        label: "Friends Group",
        icon: Group,
        scores: {
          rishikhola: 10, samsing: 10, kalimpong: 9, pelling: 9, kolakham: 9,
          ramdhura: 8, sittong: 8, ahaldhara: 8, lebong: 8, mirik: 8,
          lamahatta: 7, peshok: 7, bijanbari: 7, chatakpur: 7, pabong: 7,
          lepchajagat: 7, kolbong: 6,
        },
      },
    ],
  },
  {
    id: 3,
    question: "What's your budget?",
    options: [
      {
        id: "backpacker",
        label: "Backpacker",
        sublabel: "₹1,500/day",
        icon: Backpack,
        scores: {
          ahaldhara: 10, kolbong: 10, bijanbari: 10, rishikhola: 9, sittong: 9,
          lebong: 9, peshok: 9, ramdhura: 8, lamahatta: 8, samsing: 8,
          kalimpong: 7, lepchajagat: 7, pabong: 7, chatakpur: 6, kolakham: 6,
          pelling: 5, mirik: 5,
        },
      },
      {
        id: "midrange",
        label: "Mid-range",
        sublabel: "₹3,500/day",
        icon: Banknote,
        scores: {
          kalimpong: 10, ramdhura: 10, lamahatta: 10, samsing: 10, lepchajagat: 9,
          chatakpur: 9, sittong: 9, mirik: 9, pelling: 9, pabong: 8,
          kolakham: 8, lebong: 8, peshok: 8, ahaldhara: 7, bijanbari: 7,
          kolbong: 7, rishikhola: 7,
        },
      },
      {
        id: "luxury",
        label: "Luxury",
        sublabel: "₹8,000+/day",
        icon: Gem,
        scores: {
          pelling: 10, mirik: 10, kalimpong: 9, pelling_dup: 9,
          rishikhola: 8, sittong: 8, ramdhura: 7, lebong: 7, peshok: 7,
          lamahatta: 6, samsing: 6, chatakpur: 6, kolakham: 6, pabong: 5,
          lepchajagat: 5, ahaldhara: 4, bijanbari: 4, kolbong: 4,
        },
      },
    ],
  },
  {
    id: 4,
    question: "What activity excites you most?",
    options: [
      {
        id: "trekking",
        label: "Trekking & Adventure",
        icon: Mountain,
        scores: {
          kolakham: 10, pabong: 10, chatakpur: 10, samsing: 9, kolbong: 9,
          rishikhola: 9, pelling: 9, lepchajagat: 8, ahaldhara: 8, lamahatta: 8,
          ramdhura: 7, sittong: 7, kalimpong: 7, bijanbari: 7, lebong: 6,
          peshok: 6, mirik: 5,
        },
      },
      {
        id: "culture",
        label: "Culture & Food",
        icon: UtensilsCrossed,
        scores: {
          kalimpong: 10, pelling: 10, lepchajagat: 9, sittong: 9, lebong: 9,
          pabong: 8, mirik: 8, peshok: 8, ramdhura: 8, lamahatta: 7,
          samsing: 7, kolbong: 7, ahaldhara: 6, bijanbari: 6, chatakpur: 6,
          kolakham: 6, rishikhola: 5,
        },
      },
      {
        id: "relaxation",
        label: "Relaxation & Views",
        icon: Coffee,
        scores: {
          mirik: 10, rishikhola: 10, ramdhura: 10, kolakham: 9, lepchajagat: 9,
          pelling: 9, chatakpur: 9, sittong: 8, ahaldhara: 8, lamahatta: 8,
          peshok: 8, kalimpong: 7, lebong: 7, bijanbari: 7, samsing: 6,
          pabong: 6, kolbong: 6,
        },
      },
      {
        id: "photography",
        label: "Photography",
        icon: Camera,
        scores: {
          kolakham: 10, pelling: 10, lepchajagat: 10, chatakpur: 10, kolbong: 9,
          pabong: 9, ramdhura: 9, samsing: 9, sittong: 8, ahaldhara: 8,
          lamahatta: 8, mirik: 8, rishikhola: 7, kalimpong: 7, peshok: 7,
          lebong: 6, bijanbari: 6,
        },
      },
    ],
  },
  {
    id: 5,
    question: "How many days do you have?",
    options: [
      {
        id: "weekend",
        label: "Weekend",
        sublabel: "2 days",
        icon: CalendarDays,
        scores: {
          ahaldhara: 10, lebong: 10, peshok: 10, lamahatta: 9, kolbong: 9,
          ramdhura: 8, sittong: 8, mirik: 8, kalimpong: 8, lepchajagat: 7,
          bijanbari: 7, chatakpur: 6, pabong: 5, rishikhola: 5, samsing: 5,
          kolakham: 5, pelling: 5,
        },
      },
      {
        id: "short",
        label: "Short Trip",
        sublabel: "3-4 days",
        icon: Clock,
        scores: {
          kalimpong: 10, ramdhura: 10, sittong: 10, mirik: 10, peshok: 9,
          lepchajagat: 9, lamahatta: 9, kolbong: 9, ahaldhara: 8, lebong: 8,
          bijanbari: 8, chatakpur: 8, rishikhola: 7, samsing: 7, kolakham: 7,
          pabong: 6, pelling: 6,
        },
      },
      {
        id: "weeklong",
        label: "Week-long",
        sublabel: "5-7 days",
        icon: CalendarDays,
        scores: {
          pelling: 10, samsing: 10, rishikhola: 10, kolakham: 10, pabong: 10,
          chatakpur: 9, kalimpong: 9, mirik: 9, lepchajagat: 9, sittong: 8,
          ramdhura: 8, lamahatta: 8, bijanbari: 7, peshok: 7, kolbong: 6,
          ahaldhara: 5, lebong: 5,
        },
      },
    ],
  },
];

function slugToDest(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

function computeResults(answers: string[]): ResultDestination[] {
  const totals: Record<string, number> = {};
  const maxPerQ = 10;

  answers.forEach((ansId, qi) => {
    const question = questions[qi];
    const option = question.options.find((o) => o.id === ansId);
    if (!option) return;
    Object.entries(option.scores).forEach(([slug, score]) => {
      totals[slug] = (totals[slug] || 0) + score;
    });
  });

  const maxPossible = questions.length * maxPerQ;

  const results: ResultDestination[] = Object.entries(totals)
    .map(([slug, score]) => {
      const dest = slugToDest(slug);
      if (!dest) return null;
      const matchPercent = Math.round((score / maxPossible) * 100);
      const whys: string[] = [];
      if (score >= 40) whys.push("Top match for your preferences");
      if (dest.coupleFriendly && answers[1] === "couple")
        whys.push("Perfect for couples");
      if (dest.familyFriendly && answers[1] === "family")
        whys.push("Family-friendly destination");
      if (dest.soloFriendly && answers[1] === "solo")
        whys.push("Great for solo travelers");
      if (dest.adventureActivities && dest.adventureActivities.length > 0 && answers[3] === "trekking")
        whys.push(`Adventure activities: ${dest.adventureActivities[0].name}`);
      if (answers[3] === "culture" && dest.localFood.length > 0)
        whys.push(`Rich local cuisine`);
      if (answers[3] === "relaxation" && dest.viewpoints.length > 0)
        whys.push(`Scenic viewpoints: ${dest.viewpoints[0].name}`);
      if (answers[2] === "backpacker")
        whys.push(`Budget: ${dest.budgetPlanner.backpacker}`);
      if (answers[2] === "luxury")
        whys.push(`Luxury options available`);
      if (whys.length === 0) whys.push("Beautiful Himalayan destination");

      return {
        slug: dest.slug,
        name: dest.name,
        tagline: dest.tagline,
        image: dest.heroImage,
        score,
        maxPossible,
        matchPercent: Math.min(matchPercent, 99),
        why: whys.slice(0, 3),
      };
    })
    .filter(Boolean) as ResultDestination[];

  return results.sort((a, b) => b.score - a.score).slice(0, 3);
}

// --- Confetti Effect ---
function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: ["#FF8A00", "#0B5D3B", "#1D4ED8", "#DC2626", "#F59E0B", "#16A34A"][
        Math.floor(Math.random() * 6)
      ],
      size: 6 + Math.random() * 8,
    }))
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute"
          style={{
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}

export default function QuizPage() {
  const [step, setStep] = useState(0); // 0 = intro, 1-5 = questions, 6 = results
  const [answers, setAnswers] = useState<string[]>([]);
  const [direction, setDirection] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const progress = step > 0 && step <= 5 ? (step / 5) * 100 : 0;

  const handleAnswer = useCallback(
    (optionId: string) => {
      const newAnswers = [...answers, optionId];
      setAnswers(newAnswers);
      if (step < 5) {
        setDirection(1);
        setStep(step + 1);
      } else {
        setStep(6);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        // Save quiz completion for leaderboard points
        try {
          localStorage.setItem("kv-quiz-completed", "true");
          const completedCount = parseInt(localStorage.getItem("kv-quiz-count") || "0", 10);
          localStorage.setItem("kv-quiz-count", String(completedCount + 1));
        } catch { /* ignore */ }
      }
    },
    [answers, step]
  );

  const handleRetake = () => {
    setAnswers([]);
    setStep(0);
    setDirection(1);
    setShowConfetti(false);
  };

  const results = useMemo(() => {
    if (step !== 6) return [];
    return computeResults(answers);
  }, [answers, step]);

  const handleShare = async () => {
    const top = results[0];
    const text = top
      ? `I got ${top.name} as my perfect Himalayan destination on KuboVista! Find yours too.`
      : "I found my perfect Himalayan destination on KuboVista!";
    if (navigator.share) {
      try {
        await navigator.share({ title: "My KuboVista Quiz Result", text });
      } catch {
        // ignore cancellation
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert("Result copied to clipboard!");
      } catch {
        // ignore
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 via-background to-background">
      {showConfetti && <Confetti />}
      <Container className="py-8 md:py-16">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground md:text-5xl">
                Find Your Perfect
                <br />
                Himalayan Destination
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Answer 5 quick questions and we will match you with the
                offbeat Himalayan destination that fits your travel style.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" onClick={() => setStep(1)}>
                  Start Quiz
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Takes about 1 minute
              </p>
            </motion.div>
          )}

          {step >= 1 && step <= 5 && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.35 }}
              className="mx-auto max-w-2xl"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    Question {step} of 5
                  </span>
                  <span className="text-muted-foreground">{progress.toFixed(0)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Question */}
              <Card className="p-6 md:p-10">
                <h2 className="mb-8 text-xl font-bold text-foreground md:text-2xl">
                  {questions[step - 1].question}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {questions[step - 1].options.map((opt, i) => {
                    const Icon = opt.icon;
                    return (
                      <motion.button
                        key={opt.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(opt.id)}
                        className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md active:bg-primary/10"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {opt.label}
                          </p>
                          {"sublabel" in opt && (
                            <p className="text-xs text-muted-foreground">
                              {(opt as any).sublabel}
                            </p>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-4xl"
            >
              <div className="mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                >
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </motion.div>
                <h2 className="text-3xl font-bold text-foreground">
                  Your Perfect Match
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Based on your answers, here are your top Himalayan
                  destinations
                </p>
              </div>

              {/* Top Result */}
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="overflow-hidden border-2 border-primary/20">
                    <div className="relative h-56 w-full overflow-hidden md:h-72">
                      <img
                        src={results[0].image}
                        alt={results[0].name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                          <Sparkles className="h-3 w-3" />
                          Best Match
                        </div>
                        <h3 className="text-2xl font-bold md:text-3xl">
                          {results[0].name}
                        </h3>
                        <p className="text-sm opacity-90">{results[0].tagline}</p>
                      </div>
                      <div className="absolute right-4 top-4 rounded-xl bg-white/90 px-4 py-2 text-center backdrop-blur-sm">
                        <p className="text-2xl font-bold text-primary">
                          {results[0].matchPercent}%
                        </p>
                        <p className="text-[10px] font-medium text-muted-foreground">
                          MATCH
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="mb-3 text-sm font-semibold text-foreground">
                        Why it fits you:
                      </p>
                      <ul className="mb-6 space-y-2">
                        {results[0].why.map((w, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {w}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-3">
                        <Link href={`/destinations/${results[0].slug}`}>
                          <Button>
                            <MapPin className="h-4 w-4" />
                            View Destination
                          </Button>
                        </Link>
                        <Link href="/travel-planner">
                          <Button variant="outline">
                            Plan Trip
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Other Recommendations */}
              {results.length > 1 && (
                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    Also Great For You
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {results.slice(1).map((dest, i) => (
                      <motion.div
                        key={dest.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                      >
                        <Card className="overflow-hidden">
                          <div className="relative h-40 w-full overflow-hidden">
                            <img
                              src={dest.image}
                              alt={dest.name}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-3 text-white">
                              <h4 className="text-lg font-bold">{dest.name}</h4>
                              <p className="text-xs opacity-90">{dest.tagline}</p>
                            </div>
                            <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-center backdrop-blur-sm">
                              <p className="text-lg font-bold text-primary">
                                {dest.matchPercent}%
                              </p>
                            </div>
                          </div>
                          <div className="p-4">
                            <ul className="mb-4 space-y-1">
                              {dest.why.slice(0, 2).map((w, j) => (
                                <li
                                  key={j}
                                  className="flex items-start gap-1.5 text-xs text-muted-foreground"
                                >
                                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                                  {w}
                                </li>
                              ))}
                            </ul>
                            <Link href={`/destinations/${dest.slug}`}>
                              <Button size="sm" variant="outline" className="w-full">
                                View Destination
                              </Button>
                            </Link>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
              >
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                  Share Result
                </Button>
                <Button variant="ghost" onClick={handleRetake}>
                  <RotateCcw className="h-4 w-4" />
                  Retake Quiz
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
