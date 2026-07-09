"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is the best time to visit the Eastern Himalayas?",
    answer:
      "October to May is ideal, with clear skies and pleasant weather. Spring (March–May) offers blooming rhododendrons, while autumn (October–November) provides the clearest mountain views. Avoid monsoon (June–September) due to landslide risks.",
  },
  {
    question: "Are these destinations safe for solo travelers?",
    answer:
      "Yes, the offbeat Himalayan destinations we feature are generally very safe for solo travelers. Locals are welcoming, homestay hosts look after guests like family, and network connectivity is decent in most towns.",
  },
  {
    question: "Do I need any special permits?",
    answer:
      "Indian citizens usually do not need permits for most areas in North Bengal and Sikkim. Foreign nationals may require an Inner Line Permit (ILP) for certain regions of Sikkim, which can be arranged in advance.",
  },
  {
    question: "How do I reach these offbeat destinations?",
    answer:
      "The nearest railway station is New Jalpaiguri (NJP) and the nearest airport is Bagdogra (IXB). From there, you can hire private taxis or take shared jeeps to reach most destinations within 2–5 hours.",
  },
  {
    question: "What kind of accommodation is available?",
    answer:
      "We specialize in authentic homestays that offer home-cooked meals, warm hospitality, and immersive cultural experiences. A few destinations also have boutique resorts and eco-lodges for those seeking more comfort.",
  },
  {
    question: "Is there mobile network and internet connectivity?",
    answer:
      "Jio and Airtel work well in most town centers with 4G coverage. Remote villages may have patchy signals, but most homestays offer WiFi. We recommend carrying a power bank and downloading offline maps.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <span className="text-base font-semibold text-foreground sm:text-lg">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-muted-foreground sm:px-6 sm:pb-6">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-muted/50">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before planning your Himalayan getaway."
          align="center"
          accentColor="bg-accent"
        />

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <AccordionItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
