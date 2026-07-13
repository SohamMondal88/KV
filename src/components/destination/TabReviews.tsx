"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Star,
  ThumbsUp,
  Send,
} from "lucide-react";

interface TabReviewsProps {
  destination: Destination;
}

export function TabReviews({ destination }: TabReviewsProps) {
  const reviews = destination.reviews || [];
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    setSubmitted(true);
    setComment("");
    setRating(0);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Container className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Reviews</h2>
        <p className="mt-1 text-white/50">{destination.rating} out of 5 from {destination.reviewCount} travelers.</p>
      </div>

      {/* Rating breakdown */}
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-white">{destination.rating}</p>
            <div className="flex items-center justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(destination.rating) ? "text-[#F6C453]" : "text-white/10"
                  )}
                />
              ))}
            </div>
            <p className="mt-1 text-xs text-white/40">{destination.reviewCount} reviews</p>
          </div>
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="w-3 text-xs text-white/40">{star}</span>
                <Star className="h-3 w-3 text-[#F6C453]" />
                <div className="h-1.5 flex-1 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-[#F6C453]"
                    style={{ width: `${Math.random() * 60 + 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Review List */}
      <div className="space-y-3">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{review.name}</p>
                    <p className="text-[10px] text-white/30">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < review.rating ? "text-[#F6C453]" : "text-white/10"
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-white/60">{review.comment}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Write Review */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-white">Write a Review</h3>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button key={i} onClick={() => setRating(i + 1)}>
              <Star
                className={cn(
                  "h-5 w-5 transition-colors",
                  i < rating ? "text-[#F6C453]" : "text-white/10 hover:text-white/30"
                )}
              />
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows={3}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#F6C453]/30"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-white/30">Reviews are moderated before publishing.</span>
          <Button size="sm" onClick={handleSubmit}>
            <Send className="mr-1 h-3.5 w-3.5" /> Submit
          </Button>
        </div>
        {submitted && <p className="mt-2 text-xs text-emerald-400">Thanks for your review!</p>}
      </Card>
    </Container>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
