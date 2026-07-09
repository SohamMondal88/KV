"use client";

import React from "react";
import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, TrendingDown } from "lucide-react";

interface BudgetBreakdownProps {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  miscellaneous: number;
  total: number;
  userBudget: number;
}

const COLORS = [
  "bg-sky-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-400",
];

export function BudgetBreakdown({
  transport,
  accommodation,
  food,
  activities,
  miscellaneous,
  total,
  userBudget,
}: BudgetBreakdownProps) {
  const items = [
    { label: "Transport", value: transport },
    { label: "Accommodation", value: accommodation },
    { label: "Food", value: food },
    { label: "Activities", value: activities },
    { label: "Misc", value: miscellaneous },
  ];

  const maxVal = Math.max(...items.map((i) => i.value), userBudget);

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <IndianRupee className="h-5 w-5 text-primary" />
        Budget Breakdown
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-border bg-card p-5 shadow-sm"
      >
        <div className="space-y-4">
          {items.map((item, i) => {
            const pct = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
            return (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-sm font-semibold text-foreground">
                    ₹{item.value.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full rounded-full ${COLORS[i]}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3">
          <span className="text-sm font-semibold text-foreground">Estimated Total</span>
          <span className="flex items-center gap-1 text-lg font-bold text-foreground">
            <IndianRupee className="h-5 w-5" />
            {total.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium">
          {total <= userBudget ? (
            <>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                <TrendingDown className="h-4 w-4" />
              </div>
              <span className="text-success">
                Within budget! You save approximately ₹{(userBudget - total).toLocaleString("en-IN")}
              </span>
            </>
          ) : (
            <>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-danger">
                Over budget by approximately ₹{(total - userBudget).toLocaleString("en-IN")}
              </span>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
