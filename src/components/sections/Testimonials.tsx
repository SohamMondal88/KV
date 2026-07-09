"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { destinations } from "@/lib/data";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const allReviews = destinations.flatMap((d) =>
  d.reviews.map((r) => ({
    ...r,
    destination: d.name,
  }))
);

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % allReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);
  const goNext = () => setIndex((prev) => (prev + 1) % allReviews.length);

  const review = allReviews[index];

  return (
    <section className="py-20 bg-background">
      <Container>
        <SectionHeading
          title="What Travelers Say"
          subtitle="Real stories from real travelers who explored the Himalayas with us."
          align="center"
          accentColor="bg-accent"
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id + index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {getInitials(review.name)}
                </div>
                <div className="mt-4">
                  <StarRating rating={review.rating} size={18} />
                </div>
                <div className="mt-6">
                  <Quote className="mx-auto h-8 w-8 text-accent/40" />
                </div>
                <p className="mt-4 text-lg leading-relaxed text-foreground">
                  {review.comment}
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Visited {review.destination}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={goPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {allReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-accent"
                      : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
