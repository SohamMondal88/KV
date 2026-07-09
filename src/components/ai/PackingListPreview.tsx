"use client";

import React from "react";
import { motion } from "framer-motion";
import { Backpack, ChevronRight } from "lucide-react";

interface PackingListPreviewProps {
  items: string[];
}

export function PackingListPreview({ items }: PackingListPreviewProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Backpack className="h-5 w-5 text-primary" />
        Packing List Preview
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-border bg-card p-4 shadow-sm"
      >
        <ul className="grid gap-2 sm:grid-cols-2">
          {(expanded ? items : items.slice(0, 4)).map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </motion.li>
          ))}
        </ul>

        {!expanded && items.length > 4 && (
          <button
            onClick={() => setExpanded(true)}
            className="mt-3 flex items-center gap-1 text-sm font-medium text-primary transition hover:underline"
          >
            View Full Packing List
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
