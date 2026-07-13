"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Hotel,
  UtensilsCrossed,
  Compass,
  Map,
  Package,
  MessageSquare,
  BookOpen,
} from "lucide-react";

export type DestinationTab =
  | "overview"
  | "stay"
  | "eat"
  | "things-to-do"
  | "itinerary"
  | "map"
  | "packages"
  | "reviews";

const tabs: { id: DestinationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "stay", label: "Stay", icon: Hotel },
  { id: "eat", label: "Eat", icon: UtensilsCrossed },
  { id: "things-to-do", label: "Things To Do", icon: Compass },
  { id: "itinerary", label: "Itinerary", icon: BookOpen },
  { id: "map", label: "Map", icon: Map },
  { id: "packages", label: "Packages", icon: Package },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
];

interface DestinationTabNavProps {
  active: DestinationTab;
  onChange: (tab: DestinationTab) => void;
}

export function DestinationTabNav({ active, onChange }: DestinationTabNavProps) {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#0B3D2E]/95 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={cn(
                  "relative flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:text-sm",
                  isActive
                    ? "text-[#F6C453]"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                )}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="whitespace-nowrap">{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#F6C453]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
