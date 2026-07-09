"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";

interface DestinationReviewsProps {
  destination: Destination;
}

export function DestinationReviews({ destination }: DestinationReviewsProps) {
  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading title="Reviews" align="left" className="mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destination.reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} size={14} showValue={false} />
                <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
}
