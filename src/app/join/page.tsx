"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Map,
  Car,
  CheckCircle,
  ChevronRight,
  BadgePercent,
  ShieldCheck,
  Zap,
  Headphones,
  ClipboardList,
  UserCheck,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const providerCards = [
  {
    icon: Home,
    title: "List Your Homestay",
    benefits: [
      "Reach 10,000+ travelers",
      "Verified bookings",
      "Instant payments",
      "Guest reviews",
    ],
    cta: "Register as Homestay Owner",
    href: "/join/homestay",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Map,
    title: "Become a Local Guide",
    benefits: [
      "Set your own schedule",
      "Earn per tour",
      "Build your reputation",
      "Meet travelers worldwide",
    ],
    cta: "Register as Guide",
    href: "/join/guide",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Car,
    title: "Offer Transport Services",
    benefits: [
      "Steady bookings",
      "GPS tracking",
      "Transparent pricing",
      "Cashless payments",
    ],
    cta: "Register as Driver",
    href: "/join/taxi",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const trustProps = [
  {
    icon: BadgePercent,
    title: "Zero commission for first 3 months",
    desc: "Keep 100% of your earnings while you grow",
  },
  {
    icon: ShieldCheck,
    title: "Verified traveler profiles",
    desc: "Every guest is identity-verified for safety",
  },
  {
    icon: Zap,
    title: "Instant payout system",
    desc: "Get paid directly to your bank within 24 hours",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    desc: "Dedicated provider helpline anytime you need",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Register your business",
    desc: "Fill out a simple application with your details and documents.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Complete verification",
    desc: "We verify your identity and property within 48 hours.",
    icon: UserCheck,
  },
  {
    step: "03",
    title: "Start receiving bookings",
    desc: "Go live and start accepting bookings from travelers.",
    icon: CalendarCheck,
  },
  {
    step: "04",
    title: "Grow your business",
    desc: "Build reviews, earn more, and scale with KuboVista.",
    icon: TrendingUp,
  },
];

const faqs = [
  {
    question: "Who can become a provider on KuboVista?",
    answer:
      "Anyone who owns a homestay, has a licensed vehicle for transport, or is a certified local guide can apply. We welcome individuals and small businesses across all 17 Himalayan destinations.",
  },
  {
    question: "How long does verification take?",
    answer:
      "Most applications are reviewed within 48 hours. You'll receive an email with next steps or additional document requests if needed.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Homestay owners need ID proof and property documents. Guides need a guide license and ID proof. Taxi owners need a driver's license, vehicle registration, and insurance.",
  },
  {
    question: "Is there a commission fee?",
    answer:
      "We charge zero commission for the first 3 months. After that, a competitive commission applies only on confirmed bookings.",
  },
  {
    question: "Can I set my own prices?",
    answer:
      "Absolutely. You have full control over your pricing, availability, and cancellation policies. We only ask for fair and transparent rates.",
  },
];

export default function JoinPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-primary pb-20 pt-32 text-white">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-4 border-white/30 bg-white/10 text-white">
              Partner with KuboVista
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Join the KuboVista Marketplace
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              List your homestay, offer guided tours, or provide taxi services to thousands of travelers
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Provider Cards */}
      <section className="-mt-12 pb-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {providerCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} ${card.color}`}
                  >
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {card.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link href={card.href} className="block">
                      <Button variant="primary" className="w-full">
                        {card.cta}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="bg-muted/40 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why KuboVista?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Built for local providers who want to grow without the hassle.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustProps.map((prop, i) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <prop.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {prop.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Four simple steps to start earning with KuboVista.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Step {item.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] w-[80%]">
                    <div className="h-0.5 bg-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Provider FAQs
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Common questions from our provider community.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-xl border border-border bg-card"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="text-base font-semibold text-foreground sm:text-lg">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronRight className="h-5 w-5 rotate-90 text-muted-foreground" />
                    </motion.span>
                  </button>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-muted-foreground sm:px-6 sm:pb-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary py-16 text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to grow?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Join 500+ local providers on KuboVista and turn your passion into income.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/join/homestay">
                <Button variant="accent" size="lg">
                  List Your Homestay
                </Button>
              </Link>
              <Link href="/join/guide">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Become a Guide
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
