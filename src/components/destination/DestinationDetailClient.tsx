"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { destinations } from "@/lib/data";
import { DestinationHero } from "@/components/destination/DestinationHero";
import { DestinationTabNav, DestinationTab } from "@/components/destination/DestinationTabNav";
import { TabOverview } from "@/components/destination/TabOverview";
import { TabStay } from "@/components/destination/TabStay";
import { TabEat } from "@/components/destination/TabEat";
import { TabThingsToDo } from "@/components/destination/TabThingsToDo";
import { TabItinerary } from "@/components/destination/TabItinerary";
import { TabMap } from "@/components/destination/TabMap";
import { TabPackages } from "@/components/destination/TabPackages";
import { TabReviews } from "@/components/destination/TabReviews";

interface Props {
  slug: string;
}

export default function DestinationDetailClient({ slug }: Props) {
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) return notFound();

  const [activeTab, setActiveTab] = useState<DestinationTab>("overview");

  const handleTabChange = (tab: DestinationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      <DestinationHero destination={destination} />
      <DestinationTabNav active={activeTab} onChange={handleTabChange} />

      <div className="py-8">
        {activeTab === "overview" && <TabOverview destination={destination} onTabChange={(tab) => handleTabChange(tab as DestinationTab)} />}
        {activeTab === "stay" && <TabStay destination={destination} />}
        {activeTab === "eat" && <TabEat destination={destination} />}
        {activeTab === "things-to-do" && <TabThingsToDo destination={destination} />}
        {activeTab === "itinerary" && <TabItinerary destination={destination} />}
        {activeTab === "map" && <TabMap destination={destination} />}
        {activeTab === "packages" && <TabPackages destination={destination} />}
        {activeTab === "reviews" && <TabReviews destination={destination} />}
      </div>
    </div>
  );
}
