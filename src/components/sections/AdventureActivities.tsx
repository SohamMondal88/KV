"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  Mountain,
  Tent,
  Wind,
  Bird,
  Waves,
  Camera,
} from "lucide-react";
import { StaggerList } from "@/components/animations/GSAPScroll";

const activities = [
  {
    icon: Mountain,
    title: "Trekking",
    description:
      "Explore scenic trails through rhododendron forests, alpine meadows, and remote villages with expert local guides.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Tent,
    title: "Camping",
    description:
      "Spend nights under starlit Himalayan skies at riverside campsites and mountain clearings.",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: Wind,
    title: "Paragliding",
    description:
      "Soar over the hills with stunning aerial views of the Eastern Himalayas and verdant valleys below.",
    color: "bg-sky-50 text-sky-700",
  },
  {
    icon: Bird,
    title: "Birdwatching",
    description:
      "Spot rare Himalayan birds in biodiversity hotspots like Neora Valley and Lava forests.",
    color: "bg-rose-50 text-rose-700",
  },
  {
    icon: Waves,
    title: "River Trekking",
    description:
      "Trek along crystal-clear riverbeds, crossing boulders and discovering hidden waterfalls.",
    color: "bg-cyan-50 text-cyan-700",
  },
  {
    icon: Camera,
    title: "Photography",
    description:
      "Capture golden sunrises, misty valleys, and the timeless beauty of Himalayan landscapes.",
    color: "bg-violet-50 text-violet-700",
  },
];

export function AdventureActivities() {
  return (
    <section className="py-20 bg-muted/50">
      <Container>
        <SectionHeading
          title="Adventure Awaits"
          subtitle="From gentle nature walks to adrenaline-pumping paragliding, find your perfect Himalayan adventure."
          align="center"
          accentColor="bg-accent"
        />

        <StaggerList
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          childClassName="group rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-card/80"
          stagger={0.08}
          y={30}
        >
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <React.Fragment key={activity.title}>
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${activity.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {activity.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {activity.description}
                </p>
                <div className="mt-4">
                  <Button variant="ghost" size="sm" className="px-0">
                    Explore →
                  </Button>
                </div>
              </React.Fragment>
            );
          })}
        </StaggerList>
      </Container>
    </section>
  );
}
