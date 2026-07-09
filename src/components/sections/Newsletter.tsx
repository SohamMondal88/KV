"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mail, Send, Mountain } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative overflow-hidden bg-forest py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -right-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
        />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Mountain className="h-7 w-7 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Join Our Journey
            </h2>
            <p className="mt-3 text-lg text-white/80">
              Get travel inspiration, hidden gem alerts, and exclusive deals delivered to your inbox.
            </p>

            <form
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-14 w-full rounded-xl border-0 bg-white pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="h-14 shrink-0"
              >
                <span className="flex items-center gap-2">
                  Subscribe
                  <Send className="h-4 w-4" />
                </span>
              </Button>
            </form>

            <p className="mt-4 text-xs text-white/60">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
