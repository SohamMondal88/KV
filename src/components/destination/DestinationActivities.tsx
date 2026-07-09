"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Clock, Wallet } from "lucide-react";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface DestinationActivitiesProps {
  destination: Destination;
}

export function DestinationActivities({ destination }: DestinationActivitiesProps) {
  const difficultyColor = (d: string) => {
    switch (d) {
      case "Easy": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Moderate": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Hard": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading title="Adventure Activities" align="left" className="mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destination.adventureActivities.map((act, i) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden">
                <div className="h-40 w-full bg-muted flex items-center justify-center">
                  <Activity size={32} className="text-muted-foreground/40" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{act.name}</h3>
                    <Badge className={difficultyColor(act.difficulty)}>
                      {act.difficulty}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{act.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {act.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wallet size={14} />
                      {act.price}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
}
