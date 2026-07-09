"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sparkles, ArrowLeft, ArrowRight, Save, Share2, SlidersHorizontal, PackageOpen } from "lucide-react";
import { destinations, packages, homestays, hotels } from "@/lib/data";
import {
  PlannerInputs,
  getTopMatches,
  generateItinerary,
  GeneratedItinerary,
  MatchResult,
} from "@/lib/ai-engine";
import { StepIndicator } from "@/components/ai/StepIndicator";
import { StepBasics } from "@/components/ai/StepBasics";
import { StepPreferences } from "@/components/ai/StepPreferences";
import { StepGenerate } from "@/components/ai/StepGenerate";
import { MatchedDestinations } from "@/components/ai/MatchedDestinations";
import { ItineraryView } from "@/components/ai/ItineraryView";
import { AccommodationRecommendations } from "@/components/ai/AccommodationRecommendations";
import { FoodRecommendations } from "@/components/ai/FoodRecommendations";
import { TransportRecommendations } from "@/components/ai/TransportRecommendations";
import { PackingListPreview } from "@/components/ai/PackingListPreview";
import { BudgetBreakdown } from "@/components/ai/BudgetBreakdown";
import { CelebrationOverlay } from "@/components/ai/CelebrationOverlay";

const STORAGE_KEY = "hg-itineraries";

const defaultInputs: PlannerInputs = {
  budget: 15000,
  people: 2,
  days: 3,
  travelDates: "",
  hasKids: false,
  hasPets: false,
  travelStyle: "Mid-Range Explorer",
  vehiclePreference: "Private Taxi",
  weatherPreference: "Pleasant/Mild",
  foodPreferences: ["Local Cuisine"],
  adventureLevel: "Moderate",
  mustHaves: ["Mountains"],
};

export default function TravelPlannerPage() {
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<PlannerInputs>(defaultInputs);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const updateInputs = useCallback((patch: Partial<PlannerInputs>) => {
    setInputs((prev) => ({ ...prev, ...patch }));
  }, []);

  const matches = useMemo(() => {
    return results.length > 0 ? results : null;
  }, [results]);

  const selectedMatch = matches?.[selectedIndex] ?? null;

  useEffect(() => {
    if (selectedMatch) {
      const gen = generateItinerary(selectedMatch.destination, inputs, homestays, hotels);
      setItinerary(gen);
    }
  }, [selectedMatch, inputs]);

  const handleGenerate = async () => {
    setLoading(true);
    setShowCelebration(false);
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1800));
    const top = getTopMatches(destinations, inputs, 3);
    setResults(top);
    setSelectedIndex(0);
    setLoading(false);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2500);
    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const handleSave = () => {
    if (!itinerary) return;
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const record = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      inputs,
      destinationName: itinerary.destination.name,
      totalCost: itinerary.budgetBreakdown.total,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing]));
    alert("Itinerary saved to My Trips!");
  };

  const handleShare = () => {
    if (!itinerary) return;
    const text = [
      `🗻 AI Trip Plan — ${itinerary.destination.name}`,
      ``,
      `📅 Dates: ${inputs.travelDates || "TBD"}`,
      `👥 People: ${inputs.people}`,
      `🌤️ Style: ${inputs.travelStyle}`,
      ``,
      `🗓️ Day-by-Day:`,
      ...itinerary.days.map(
        (d) =>
          `Day ${d.day}: ${d.morning.join(", ")} | ${d.afternoon.join(", ")} | ${d.evening.join(", ")}`
      ),
      ``,
      `💰 Total Estimated: ₹${itinerary.budgetBreakdown.total.toLocaleString("en-IN")}`,
      ``,
      `Plan your trip at HiddenGems!`,
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      alert("Itinerary copied to clipboard!");
    });
  };

  const steps = ["Basics", "Preferences", "Generate"];

  const canNext =
    step === 1
      ? inputs.budget >= 5000 && inputs.people >= 1 && inputs.days >= 1
      : step === 2
      ? inputs.travelStyle && inputs.adventureLevel
      : true;

  return (
    <div className="flex flex-col">
      {showCelebration && <CelebrationOverlay />}

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest to-emerald-900 py-20 text-white">
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Powered
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            AI Trip Planner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            The smartest way to plan your Himalayan adventure. Personalized itineraries, budget intelligence, and local recommendations — all powered by AI.
          </motion.p>
        </Container>
      </section>

      {/* Wizard */}
      <section className="py-12">
        <Container className="max-w-4xl">
          <Card className="overflow-hidden backdrop-blur-xl bg-white/80">
            <div className="border-b border-border bg-muted/60 px-6 py-5">
              <StepIndicator currentStep={step} steps={steps} />
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && <StepBasics key="basics" inputs={inputs} updateInputs={updateInputs} />}
                {step === 2 && <StepPreferences key="prefs" inputs={inputs} updateInputs={updateInputs} />}
                {step === 3 && <StepGenerate key="gen" onGenerate={handleGenerate} loading={loading} />}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between border-t border-border bg-muted/40 px-6 py-4">
              <Button
                variant="ghost"
                size="md"
                disabled={step === 1}
                onClick={() => setStep((s) => s - 1)}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {step < 3 && (
                <Button size="md" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </Container>
      </section>

      {/* Results */}
      <AnimatePresence>
        {matches && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="border-t border-border bg-muted/30 py-12"
          >
            <Container className="max-w-5xl space-y-10">
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-2xl font-extrabold text-foreground sm:text-3xl"
                >
                  Your Personalized Trip Plan
                </motion.h2>
                <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
                  Crafted by our AI based on your preferences, budget, and travel style.
                </p>
              </div>

              {/* Matched Destinations */}
              <MatchedDestinations
                results={matches}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
              />

              {itinerary && (
                <div className="space-y-10">
                  {/* Itinerary */}
                  <ItineraryView
                    days={itinerary.days}
                    destinationName={itinerary.destination.name}
                  />

                  {/* Accommodation */}
                  <AccommodationRecommendations
                    stays={itinerary.accommodation}
                    nights={Math.max(1, inputs.days - 1)}
                    people={inputs.people}
                  />

                  {/* Food */}
                  <FoodRecommendations
                    localDishes={itinerary.food.localDishes}
                    restaurants={itinerary.food.restaurants}
                    cafes={itinerary.food.cafes}
                  />

                  {/* Transport */}
                  <TransportRecommendations
                    howToReach={itinerary.transport.howToReach}
                    localTransport={itinerary.transport.localTransport}
                    estimatedCost={itinerary.transport.estimatedCost}
                  />

                  {/* Packing List */}
                  <PackingListPreview items={itinerary.packingList} />

                  {/* Budget */}
                  <BudgetBreakdown
                    transport={itinerary.budgetBreakdown.transport}
                    accommodation={itinerary.budgetBreakdown.accommodation}
                    food={itinerary.budgetBreakdown.food}
                    activities={itinerary.budgetBreakdown.activities}
                    miscellaneous={itinerary.budgetBreakdown.miscellaneous}
                    total={itinerary.budgetBreakdown.total}
                    userBudget={inputs.budget}
                  />

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Button variant="primary" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                      Save Itinerary
                    </Button>
                    <Button variant="outline" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setResults([]);
                        setItinerary(null);
                        setStep(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Modify Preferences
                    </Button>
                    <Button
                      variant="accent"
                      onClick={() => router.push("/packages")}
                    >
                      <PackageOpen className="h-4 w-4" />
                      Book Package
                    </Button>
                  </div>
                </div>
              )}
            </Container>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
