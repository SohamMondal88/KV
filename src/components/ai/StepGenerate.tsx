"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface StepGenerateProps {
  onGenerate: () => void;
  loading: boolean;
}

export function StepGenerate({ onGenerate, loading }: StepGenerateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <Sparkles className="h-9 w-9" />
        </motion.div>
        {/* Decorative rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>

      <h3 className="text-xl font-bold text-foreground">Ready to Plan?</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Our AI will analyze your preferences and craft a personalized itinerary with destinations,
        stays, food, and budget breakdown.
      </p>

      <Button
        size="lg"
        className="mt-8 gap-2"
        onClick={onGenerate}
        loading={loading}
        disabled={loading}
      >
        {!loading && (
          <motion.span
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Sparkles className="h-5 w-5" />
          </motion.span>
        )}
        {loading ? "Analyzing preferences..." : "Generate My Itinerary"}
      </Button>

      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1">
            AI is analyzing your preferences
            <span className="inline-flex">
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
              >
                .
              </motion.span>
            </span>
          </span>
        </motion.p>
      )}
    </motion.div>
  );
}
