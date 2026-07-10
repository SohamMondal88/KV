"use client";

import React from "react";
import Link from "next/link";
import { Mountain, Mail, Phone, MapPin, Camera, Globe, MessageCircle, Video } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Travel Packages" },
  { href: "/homestays", label: "Homestays" },
  { href: "/book-taxi", label: "Book Taxi" },
  { href: "/book-guide", label: "Book Guide" },
  { href: "/blog", label: "Travel Blog" },
  { href: "/contact", label: "Contact" },
];

const destinations = [
  { href: "/destinations/kalimpong", label: "Kalimpong" },
  { href: "/destinations/pelling", label: "Pelling" },
  { href: "/destinations/mirik", label: "Mirik" },
  { href: "/destinations/sittong", label: "Sittong" },
  { href: "/destinations/ramdhura", label: "Ramdhura" },
];

const socials = [
  { href: "#", label: "Instagram", icon: Camera },
  { href: "#", label: "Twitter", icon: MessageCircle },
  { href: "#", label: "Facebook", icon: Globe },
  { href: "#", label: "YouTube", icon: Video },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About / Logo */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Mountain className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold tracking-tight">KuboVista</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Travel For Premium Memories. KuboVista curates extraordinary journeys to the Himalayas most untouched
              corners. Experience authentic culture, serene landscapes, and
              memories that last a lifetime.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border",
                    "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  )}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Top Destinations
            </h3>
            <ul className="flex flex-col gap-2">
              {destinations.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Stay in Touch
            </h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>hello@KuboVista.travel</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>Leh, Ladakh, India</span>
              </div>
            </div>

            <form
              className="mt-2 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className={cn(
                  "flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground",
                  "placeholder:text-muted-foreground",
                  "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                )}
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>

      {/* Copyright bar */}
      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} KuboVista. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
