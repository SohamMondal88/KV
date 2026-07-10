"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Share2, Bookmark, ChevronRight, CloudSun } from "lucide-react";
import { Destination } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { getThemeBySlug } from "@/lib/destination-themes";
import { AtmosphereEffects } from "./AtmosphereEffects";

interface DestinationHeroProps {
  destination: Destination;
}

function AnimatedTitle({ text, color }: { text: string; color: string }) {
  const letters = text.split("");
  return (
    <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ textShadow: `0 4px 30px ${color}40` }}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3 + i * 0.04,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
}

function WeatherWidget({ destination, accentColor }: { destination: Destination; accentColor: string }) {
  const temp = useMemo(() => {
    const alt = parseInt(destination.altitude?.replace(/\D/g, "") || "1500");
    const base = alt ? Math.max(5, 25 - Math.floor(alt / 300)) : 18;
    return base;
  }, [destination.altitude]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <CloudSun className="h-6 w-6" style={{ color: accentColor }} />
      </motion.div>
      <div>
        <div className="text-lg font-bold text-white">{temp}°C</div>
        <div className="text-xs text-white/60">Partly Cloudy</div>
      </div>
    </motion.div>
  );
}

function ScrollIndicator({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase">
          Explore
        </span>
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  const theme = getThemeBySlug(destination.slug);
  const colors = theme.colorPalette;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full">
      {/* Breadcrumb */}
      <div className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
          <nav className="flex items-center gap-2 text-sm text-white/70">
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => window.location.href = "/"}>Home</span>
            <ChevronRight size={14} />
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => window.location.href = "/destinations"}>Destinations</span>
            <ChevronRight size={14} />
            <span className="text-white font-medium">{destination.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Image with Ken Burns */}
      <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden md:h-[70vh] lg:h-[75vh]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src={destination.heroImage}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Theme Overlay Gradient */}
        <motion.div
          className="absolute inset-0"
          style={{ background: theme.effects.overlayGradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Atmospheric Particles */}
        <AtmosphereEffects theme={theme} />

        {/* Extra effects for specific destinations */}
        {destination.slug === "kalimpong" && (
          <div className="absolute inset-0">
            {(() => {
              const GoldenRays = React.lazy(() => import("./AtmosphereEffects").then(m => ({ default: m.KalimpongGoldenRays })));
              return (
                <React.Suspense fallback={null}>
                  <GoldenRays />
                </React.Suspense>
              );
            })()}
          </div>
        )}
        {destination.slug === "kolakham" && (
          <div className="absolute inset-0">
            {(() => {
              const StarSparkles = React.lazy(() => import("./AtmosphereEffects").then(m => ({ default: m.KolakhamSparkles })));
              return (
                <React.Suspense fallback={null}>
                  <StarSparkles />
                </React.Suspense>
              );
            })()}
          </div>
        )}

        {/* Gradient shift overlay for depth */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(ellipse at 30% 20%, ${colors.primary}20 0%, transparent 50%)`,
              `radial-gradient(ellipse at 70% 30%, ${colors.accent}15 0%, transparent 50%)`,
              `radial-gradient(ellipse at 30% 20%, ${colors.primary}20 0%, transparent 50%)`,
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bottom fade for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 pb-10 md:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Location Badge */}
              <Badge variant="accent" className="mb-4 backdrop-blur-md bg-white/10 border-white/20">
                <MapPin size={12} className="mr-1" />
                {destination.state}
              </Badge>

              {/* Animated Title */}
              <AnimatedTitle text={destination.name} color={colors.accent} />

              {/* Tagline in italic */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-3 max-w-2xl text-lg italic text-white/85 sm:text-xl md:text-2xl font-body"
              >
                {destination.tagline}
              </motion.p>

              {/* Mood text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="mt-2 max-w-xl text-sm text-white/50 font-body hidden sm:block"
              >
                {theme.mood}
              </motion.p>

              {/* Rating + Location */}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                  <StarRating rating={destination.rating} size={16} showValue />
                  <span className="text-sm text-white/70">({destination.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/10 text-sm text-white/80">
                  <MapPin size={14} />
                  {destination.district}, {destination.state}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {destination.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="outline" className="border-white/20 text-white bg-white/5 backdrop-blur-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* CTA Buttons + Weather */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  variant="accent"
                  size="md"
                  onClick={() => scrollToSection("overview")}
                >
                  Explore Details
                </Button>
                <Button variant="outline" size="md" className="border-white/20 text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="md" className="border-white/20 text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm">
                  <Bookmark size={16} className="mr-2" />
                  Save
                </Button>
                <div className="hidden md:block ml-auto">
                  <WeatherWidget destination={destination} accentColor={colors.accent} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator color={colors.accent} />
      </div>
    </section>
  );
}
