"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formState.name.trim()) nextErrors.name = "Name is required";
    if (!formState.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      nextErrors.email = "Invalid email address";
    }
    if (!formState.subject.trim()) nextErrors.subject = "Subject is required";
    if (!formState.message.trim()) nextErrors.message = "Message is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    }, 3000);
  };

  const infoCards = [
    {
      icon: Mail,
      title: "Email",
      lines: ["hello@hiddengems.com", "support@hiddengems.com"],
    },
    {
      icon: Phone,
      title: "Phone",
      lines: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: MapPin,
      title: "Address",
      lines: [
        "Hidden Gems Travel Pvt. Ltd.",
        "12 MG Marg, Gangtok, Sikkim",
        "India — 737101",
      ],
    },
    {
      icon: Clock,
      title: "Working Hours",
      lines: [
        "Mon - Sat: 9:00 AM - 7:00 PM",
        "Sunday: 10:00 AM - 4:00 PM",
        "Holidays: Limited support",
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-forest py-24 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        </div>
        <Container className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Have a question or want to plan your next Himalayan escape? We would love to hear from you.
          </motion.p>
        </Container>
      </section>

      {/* Contact Grid */}
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground">Send us a message</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in the details below and we will get back within 24 hours.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/40 ${
                        errors.name ? "border-danger" : "border-border"
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-danger">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, email: e.target.value }))
                        }
                        className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/40 ${
                          errors.email ? "border-danger" : "border-border"
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-danger">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, phone: e.target.value }))
                        }
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, subject: e.target.value }))
                      }
                      className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/40 ${
                        errors.subject ? "border-danger" : "border-border"
                      }`}
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-danger">
                        <AlertCircle className="h-3 w-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/40 ${
                        errors.message ? "border-danger" : "border-border"
                      }`}
                      placeholder="Tell us more about your trip plans..."
                    />
                    {errors.message && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-danger">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="mt-2 w-full sm:w-auto"
                    disabled={submitted}
                  >
                    {submitted ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Message Sent
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Right: Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              {infoCards.map((card) => (
                <Card
                  key={card.title}
                  hoverLift={false}
                  className="flex items-start gap-4 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <div className="mt-1 flex flex-col gap-0.5 text-sm text-muted-foreground">
                      {card.lines.map((line, i) => (
                        <span key={i}>{line}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}

              {/* Socials */}
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Follow us:
                </span>
                <div className="flex gap-2">
                  {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Map Placeholder */}
      <section className="border-t border-border bg-muted/40 py-16">
        <Container>
          <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card sm:h-96">
            <div className="text-center">
              <MapPin className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 text-lg font-semibold text-foreground">
                Interactive Map Coming Soon
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                We are working on a beautiful map experience for our travelers.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
