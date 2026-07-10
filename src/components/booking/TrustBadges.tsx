"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Headphones } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Secure Booking", sub: "256-bit SSL encryption" },
  { icon: BadgeCheck, label: "Verified", sub: "Handpicked stays" },
  { icon: Headphones, label: "24/7 Support", sub: "Call or chat anytime" },
];

export function TrustBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      {badges.map((b) => (
        <div key={b.label} className="flex flex-col items-center gap-2 text-center">
          <b.icon className="h-5 w-5 text-primary" />
          <div>
            <div className="text-xs font-semibold text-foreground">{b.label}</div>
            <div className="text-[10px] text-muted-foreground">{b.sub}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
