"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

function EqualizerBars() {
  return (
    <div className="flex items-end gap-[3px] h-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-white/80"
          animate={{
            height: [4, 14, 6, 16, 8, 12, 4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export default function AmbientSound() {
  const [isOn, setIsOn] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-white/10 bg-black/80 px-4 py-2 text-xs text-white/80 backdrop-blur-md shadow-xl whitespace-nowrap"
          >
            Immersive soundscapes coming soon
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOn((prev) => !prev)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md shadow-lg transition-colors ${
          isOn
            ? "border-accent/40 bg-accent/20 text-accent"
            : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
        }`}
        aria-label={isOn ? "Turn sound off" : "Turn sound on"}
      >
        {isOn ? (
          <div className="flex items-center gap-1">
            <Volume2 className="h-4 w-4" />
          </div>
        ) : (
          <VolumeX className="h-4 w-4" />
        )}

        {/* Pulse ring when on */}
        {isOn && (
          <motion.div
            className="absolute inset-0 rounded-full border border-accent/30"
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md"
          >
            <EqualizerBars />
            <span className="text-[10px] font-medium tracking-wider text-white/60 uppercase">
              Sound On
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
