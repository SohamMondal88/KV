"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { destinations } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

const categoryTabs = ["General", "Booking", "Destinations", "Safety", "Payments"];

const generalFaqs = [
  {
    question: "What is Hidden Gems?",
    answer:
      "Hidden Gems is a luxury travel platform specializing in offbeat Himalayan destinations, curated homestays, and authentic local experiences.",
  },
  {
    question: "How do I book a trip?",
    answer:
      "You can browse destinations and packages on our website. Once you find what you like, add it to your itinerary and proceed to checkout. Our team will confirm your booking within 24 hours.",
  },
  {
    question: "Can I customize my itinerary?",
    answer:
      "Absolutely! Contact our team with your preferences and we will craft a personalized itinerary tailored to your travel style, budget, and interests.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes, we offer discounts for groups of 6 or more. Reach out to us via the contact page for a custom quote.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made 14 days before departure receive a full refund. Cancellations within 7-14 days receive a 50% refund. Cancellations within 7 days are non-refundable.",
  },
];

const bookingFaqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-4 weeks in advance, especially during peak season (October-May).",
  },
  {
    question: "Do I need to pay the full amount upfront?",
    answer:
      "We require a 50% advance to confirm your booking. The remaining balance is due 7 days before departure.",
  },
  {
    question: "Can I modify my booking after confirmation?",
    answer:
      "Yes, modifications are allowed up to 7 days before departure, subject to availability and any fare differences.",
  },
];

const paymentsFaqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, credit/debit cards, net banking, and select wallets. International travelers can pay via major credit cards.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "No. The price you see includes accommodation, meals (as specified), transport, and guide fees. Personal expenses and optional activities are extra.",
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const destinationFaqs = destinations
    .flatMap((d) => d.faqs)
    .slice(0, 6)
    .map((f) => ({ ...f, category: "Destinations" }));

  const safetyFaqs = destinations
    .flatMap((d) => [
      ...d.travelTips.map((t) => ({
        question: `Tip: ${t}`,
        answer: "This is a recommended practice for travelers visiting our destinations.",
        category: "Safety",
      })),
      ...d.weatherAlerts.map((a) => ({
        question: `Alert: ${a}`,
        answer: "Please take necessary precautions and follow local advisories.",
        category: "Safety",
      })),
    ])
    .slice(0, 6);

  const allFaqs: Record<
    string,
    { question: string; answer: string }[]
  > = {
    General: generalFaqs,
    Booking: bookingFaqs,
    Destinations: destinationFaqs,
    Safety: safetyFaqs,
    Payments: paymentsFaqs,
  };

  const currentFaqs = allFaqs[activeTab] || [];

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
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Everything you need to know before embarking on your Himalayan journey.
          </motion.p>
        </Container>
      </section>

      {/* Tabs + Accordion */}
      <section className="py-16">
        <Container className="max-w-3xl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setOpenIndex(0);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="mt-8 flex flex-col gap-3">
            {currentFaqs.map((faq, i) => (
              <div
                key={`${activeTab}-${i}`}
                className="rounded-xl border border-border bg-card"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="pr-4 text-sm font-semibold text-foreground sm:text-base">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/40 py-16">
        <Container className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-foreground">
            Still have questions?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Our team is happy to help. Reach out and we will get back to you within 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact">
              <Button>
                <MessageCircle className="h-4 w-4" />
                Contact Us
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
