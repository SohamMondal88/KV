"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, Utensils, Coffee, Soup, Lightbulb, ChevronRight } from "lucide-react";

import { destinations } from "@/lib/data";
import type { Restaurant, Cafe, StreetFood } from "@/lib/types";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const popularDishes = [
  {
    name: "Momos",
    description:
      "Steamed or fried dumplings filled with minced meat or vegetables, served with fiery tomato chutney and sesame sauce.",
    image: "https://images.unsplash.com/photo-1625220194771-7eb5d0b600b8?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Thukpa",
    description:
      "A hearty Tibetan noodle soup with local vegetables, meat, and warming spices — perfect for chilly Himalayan evenings.",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Sel Roti",
    description:
      "Traditional Nepali ring-shaped rice bread, slightly sweet and crispy, often enjoyed with yogurt or curry.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Chhurpi Soup",
    description:
      "A nutritious soup made from dried yak cheese, popular in high-altitude regions for its warmth and protein.",
    image: "https://images.unsplash.com/photo-1547592166-23acbe346499?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Aloo Dum",
    description:
      "Spicy Bengali-style potato curry with a Himalayan twist, slow-cooked with local herbs and served with rice.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Gundruk",
    description:
      "Fermented leafy greens with a tangy, earthy flavor — a staple in Nepali households across the Himalayas.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
  },
];

const foodTips = [
  {
    title: "Embrace Local Ingredients",
    description:
      "Himalayan cuisine relies on fresh, locally sourced ingredients. Try dishes made with wild herbs, organic vegetables, and free-range meats.",
    icon: Lightbulb,
  },
  {
    title: "Stay Hydrated with Butter Tea",
    description:
      "Butter tea (Po Cha) is a traditional Tibetan drink that helps with altitude acclimatization and keeps you warm.",
    icon: Coffee,
  },
  {
    title: "Try Fermented Foods",
    description:
      "Fermented foods like chhurpi and gundruk are not just delicious — they are packed with probiotics essential for mountain digestion.",
    icon: Soup,
  },
  {
    title: "Eat Seasonally",
    description:
      "Visit during orange season (winter) for fresh Sittong oranges, or during spring for wild edibles and rhododendron nectar.",
    icon: Utensils,
  },
];

export default function FoodGuidePage() {
  const allRestaurants = useMemo(() => {
    const list: (Restaurant & { destinationName: string })[] = [];
    destinations.forEach((dest) => {
      dest.restaurants.forEach((r) => {
        list.push({ ...r, destinationName: dest.name });
      });
    });
    return list;
  }, []);

  const allCafes = useMemo(() => {
    const list: (Cafe & { destinationName: string })[] = [];
    destinations.forEach((dest) => {
      dest.cafes.forEach((c) => {
        list.push({ ...c, destinationName: dest.name });
      });
    });
    return list;
  }, []);

  const allStreetFood = useMemo(() => {
    const list: (StreetFood & { destinationName: string })[] = [];
    destinations.forEach((dest) => {
      dest.streetFood.forEach((s) => {
        list.push({ ...s, destinationName: dest.name });
      });
    });
    return list;
  }, []);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Himalayan Food Guide
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
              Savor the flavors of the Eastern Himalayas — from steaming momos
              to fragrant Darjeeling tea, discover a culinary tradition shaped
              by mountains, monasteries, and age-old recipes.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Popular Dishes */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            title="Popular Dishes"
            subtitle="Must-try delicacies that define Himalayan cuisine"
            align="left"
            className="mb-10"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {popularDishes.map((dish) => (
              <motion.div key={dish.name} variants={itemVariants}>
                <Card className="overflow-hidden" hoverLift>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground">
                      {dish.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {dish.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Best Restaurants */}
      <section className="border-t border-border bg-muted/30 py-12 sm:py-16">
        <Container>
          <SectionHeading
            title="Best Restaurants"
            subtitle="Curated dining spots across all our destinations"
            align="left"
            className="mb-10"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {allRestaurants.map((restaurant, idx) => (
              <motion.div key={`${restaurant.id}-${idx}`} variants={itemVariants}>
                <Card className="flex h-full flex-col overflow-hidden" hoverLift>
                  <div className="relative h-44 w-full overflow-hidden bg-muted">
                    {restaurant.image ? (
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary">
                        <Utensils className="h-10 w-10 opacity-40" />
                      </div>
                    )}
                    <div className="absolute left-3 top-3">
                      <Badge variant="primary">{restaurant.destinationName}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-foreground">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-medium text-accent">
                        <Star className="h-3 w-3 fill-current" />
                        {restaurant.rating.toFixed(1)}
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {restaurant.cuisine} · {restaurant.priceRange}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {restaurant.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Best Cafes */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            title="Best Cafes"
            subtitle="Cozy corners for coffee, tea, and mountain views"
            align="left"
            className="mb-10"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {allCafes.map((cafe, idx) => (
              <motion.div key={`${cafe.id}-${idx}`} variants={itemVariants}>
                <Card className="flex h-full flex-col overflow-hidden" hoverLift>
                  <div className="relative h-44 w-full overflow-hidden bg-muted">
                    {cafe.image ? (
                      <Image
                        src={cafe.image}
                        alt={cafe.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary">
                        <Coffee className="h-10 w-10 opacity-40" />
                      </div>
                    )}
                    <div className="absolute left-3 top-3">
                      <Badge variant="secondary">{cafe.destinationName}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-foreground">
                        {cafe.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-medium text-accent">
                        <Star className="h-3 w-3 fill-current" />
                        {cafe.rating.toFixed(1)}
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Specialty: {cafe.specialty}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {cafe.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Street Food */}
      <section className="border-t border-border bg-muted/30 py-12 sm:py-16">
        <Container>
          <SectionHeading
            title="Street Food"
            subtitle="Quick bites and local flavors you will find in the markets"
            align="left"
            className="mb-10"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {allStreetFood.map((item, idx) => (
              <motion.div key={`${item.name}-${idx}`} variants={itemVariants}>
                <Card className="flex items-start gap-4 p-5" hoverLift={false}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Soup className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-foreground">
                        {item.name}
                      </h4>
                      <Badge variant="outline" className="text-[10px]">
                        {item.destinationName}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Food Tips */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            title="Food Tips"
            subtitle="Essential advice for eating in the Himalayas"
            align="left"
            className="mb-10"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {foodTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <motion.div key={tip.title} variants={itemVariants}>
                  <Card className="flex items-start gap-4 p-6" hoverLift>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">
                        {tip.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {tip.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
              Ready to taste the Himalayas?
            </h3>
            <p className="mt-3 text-muted-foreground">
              Explore our destinations and find the best local food experiences
              curated just for you.
            </p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
