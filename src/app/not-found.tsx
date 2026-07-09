"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mountain, Compass, Map, Home, MapPin } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          {/* Animated Illustration */}
          <div className="mb-8 flex items-center justify-center gap-6">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
            >
              <Mountain className="h-8 w-8" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, -8, 8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 text-accent"
            >
              <Compass className="h-10 w-10" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary"
            >
              <Map className="h-8 w-8" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-4 text-2xl font-bold text-foreground sm:text-3xl"
          >
            Lost in the Mountains?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-3 text-lg text-muted-foreground"
          >
            The page you&apos;re looking for doesn&apos;t exist. It might have
            been moved, deleted, or never existed in the first place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/">
              <Button variant="primary" size="md">
                <Home className="mr-1.5 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/destinations">
              <Button variant="outline" size="md">
                <MapPin className="mr-1.5 h-4 w-4" />
                Explore Destinations
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
