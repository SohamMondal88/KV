"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "attractions", label: "Attractions" },
  { id: "food", label: "Food" },
  { id: "activities", label: "Activities" },
  { id: "itinerary", label: "Itinerary" },
  { id: "transport", label: "Transport" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

export function DestinationNav() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const offsets = tabs.map((t) => {
        const el = document.getElementById(t.id);
        if (!el) return { id: t.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: t.id, top: rect.top };
      });
      const visible = offsets.filter((o) => o.top <= 160);
      if (visible.length > 0) {
        const last = visible[visible.length - 1];
        setActive(last.id);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={cn(
                "relative shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                active === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {active === tab.id && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
